# AGENTS.md — Python Playground

Guidance for AI agents and contributors working in this repository. Read this before adding or changing any module.

## Project overview

An offline-capable static web platform for teaching Python through interactive modules. Each module is a split-screen lesson set: **code editor (left)** and **simulation + step-by-step trace (right)**. Plain HTML/CSS/JS with ES modules; no build step. Served from Netlify (or any static server); run locally with `npx serve .`.

```
core/                shared engine and UI (do not couple to one module's scene)
  engine.js          Python-like interpreter: parse/cond/exec/tr/py
  lessons.js         adaptLesson() + label/exprOf/used helpers
  ui-shell.js        module loading, lesson tabs, step-through runner, event wiring
  progress.js        per-module localStorage progress + badges + Learning Record modal
  hints.js           3-tier hint system
  vocabulary.js      Learn First 6-question guide + vocab pills
  teacher.js         teacher auth (SHA-256) + 5 classroom functions
  styles.css         shared layout/theme/components
modules/<id>/        one folder per module
  module.json        module metadata, commands, labels, legend, badges
  data.js            `export const LESSONS = [...]`
  scene.js           `export init/render/reset/play`
  scene.css          optional module-scene styles
modules/_template/   canonical example of a module (minimal)
modules.json         root manifest: array of module ids present on this branch
index.html           shell (module picker, lesson tab, code pane, output pane)
```

## Branch model (important)

- `main` = scaffolding + `modules/_template/` only. No real module content.
- **Each module is its own long-lived branch** named `module/<id>` (e.g. `module/loops`).
- A new module MUST branch from `main`, never from another module branch.
- Each branch deploys to its own Netlify site. `modules.json` should list only the module(s) that branch is about.
- `core/` must stay identical across branches. When `core/` changes on `main`, sync module branches with `git rebase origin/main` (or merge).

## Adding a new module

1. `git checkout main && git checkout -b module/<id>`
2. Copy `modules/_template/` → `modules/<id>/`
3. Fill in `module.json`, `data.js`, `scene.js` (and `scene.css` if needed) per the contracts below.
4. Add the module id to `modules.json` (array of ids).
5. Verify (see Verification). Commit and push the branch.

## `module.json` contract

```json
{
  "id": "traffic-light",
  "name": "Traffic Light Python",
  "icon": "🚦",
  "description": "Learn Python conditionals by programming a self-driving car.",
  "commands": ["stop", "slow", "crawl", "go"],
  "labels": { "stop": "brake now" },
  "legend": "HTML shown under the scene",
  "idleText": "Shown in the #vars row before any run",
  "css": "modules/<id>/scene.css",
  "badges": [ { "id": "unique", "title": "Name", "desc": "…", "levels": [0, 1], "badge": "🏅 Label" } ]
}
```

- `id` must match the folder name and be unique (it prefixes the localStorage key `plp_<id>_record`).
- `commands` = the exact function call names students may use. The interpreter rejects any other call.
- `labels` maps each command to a short caption used in the trace explanation.
- `badges[].levels` are 0-based lesson indices that must ALL be completed to earn the badge.

## `data.js` lesson schema

`export const LESSONS = [{ ... }, ...]`. One object per lesson:

| field | notes |
|---|---|
| `id` | 1-based integer |
| `title`, `storyProblem`, `concept` | rendered lesson header |
| `learnFirst` | object: `problem, knownInfo, pythonQuestion, whyPath, action, learned` |
| `vocabulary` | `[{ term, meaning }]` → vocab pills |
| `hints` | **exactly 3 strings**: concept clue, structure guide (with `\n` code block), guided correction |
| `starterCode` | prefilled editor content |
| `solution` | canonical answer; must pass every `tests` entry |
| `variables` | sensor names allowed in conditions, e.g. `["light","siren"]` |
| `base` | default sensor values merged under every test |
| `tests` | `[{ "environment": {...}, "want": "<command>", "label": "…" }]`; `environment` overrides `base` |
| `teacherExplanation`, `commonMistakes` (array), `studentReflection` | teacher-mode data |
| `free` | optional `true`, only on the final sandbox lesson |

## `scene.js` API

```js
export function init(container)            // build scene DOM once; include <div id="bubble"> if you want trace captions
export function render(env)                // sync visuals to sensor values; also called on every assignment/load
export function reset()                    // clear animations between tests
export async function play(name, { setBubble })  // animate one command; await its duration; setBubble(text) for captions
```

- `render(env)` mutates the DOM to reflect `env` (e.g. `env.light`). Use `document.getElementById("vars")` to render the sensor pill row if desired.
- `play()` must resolve (async). Use `setBubble` (from the engine) or a local bubble element scoped to your scene.
- Scene CSS goes in `scene.css`; do not add scene-specific rules to `core/styles.css`.

## Engine capability fence

The shared interpreter (core/engine.js) supports exactly: function calls listed in `commands`, `name = value` assignment, `if/elif/else`, comparisons `== != < > <= >=`, `and` / `or` / `not`, `True` / `False`, string (`"…"`) and number literals, and `#` comments via indentation rules.

It does NOT support: `while`/`for`, `def`/functions, `print()`, `import`, arithmetic operators, lists/dicts, or method calls. **Do not author lessons that require unsupported syntax.** If a future module needs new syntax, extend `core/engine.js` deliberately, keep `core/` shared, and update this file.

## UI conventions

- `#module-scene` (right panel) is where `init(container)` binds; the engine injects `#view` (trace), `#expl`, `#stepbar`, `#vars`, `#res`, `#legend` automatically.
- Lesson tabs are auto-generated from `LESSONS`; the last lesson shows `🎮` (intended for a `free: true` sandbox).
- id/name/title of each element in the shell (`index.html`) is fixed — see `core/ui-shell.js` `/els/`.
- Avoid renaming shared ids; module-specific ids live inside the module's scene DOM.

## Verification (mandatory before commit)

1. Syntax: `node --check modules/<id>/data.js modules/<id>/scene.js`
2. Serve: `npx serve .` and confirm the module loads with no console errors.
3. **Every `solution` must pass every `tests` entry.** Reference harness:

```js
node --input-type=module -e "
import { readFileSync } from 'node:fs';
import { parse, tr } from './core/engine.js';
import { adaptLesson } from './core/lessons.js';
import { LESSONS } from './modules/<id>/data.js';
const info = JSON.parse(readFileSync('./modules/<id>/module.json', 'utf8'));
let fails = 0;
for (const doc of LESSONS) {
  const L = adaptLesson(doc);
  for (const sc of (L.free ? [{}] : L.sc)) {
    const env = Object.assign({}, L.base, sc); delete env.want; delete env.label;
    const ev = []; tr(parse(doc.solution, L.names, info.commands), env, ev);
    if (!ev.some(e => e.k === 'call')) ev.push({ k: 'call', f: 'go' });
    const got = ev.filter(e => e.k === 'call').pop().f;
    if (!L.free && got !== sc.want) { fails++; console.log('FAIL', doc.title, sc.label, 'want', sc.want, 'got', got); }
  }
}
console.log(fails ? fails + ' failures' : 'OK: all solutions pass');
"
```

4. Do not merge a module branch into `main`; keep module branches long-lived and independent.

## Netlify / deploy

- `netlify.toml` publishes `.`. Each module branch is its own site or branch deploy.
- ES modules require HTTP; the app does not work from `file://`.