# AGENTS.md — Python Playground

Guidance for AI agents and contributors working in this repository. Read this before adding or changing any module.

## Project overview

An offline-capable static web platform for teaching Python through interactive modules. Each module is a split-screen lesson set: **code editor (left)** and **simulation + step-by-step trace (right)**. Plain HTML/CSS/JS with ES modules; no build step. Served from Netlify (or any static server); run locally with `npx serve .`.

```
core/                shared engine and UI (do not couple to one module's scene)
  engine.js          Python-like interpreter: parse/cond/exec/tr/py
  lessons.js         adaptLesson() + label/exprOf/used helpers
  ui-shell.js        module loading, lesson tabs, step-through runner, event wiring
  editor.js          code editor line-number gutter renderer (renderGutter)
  progress.js        per-module localStorage progress + badges + Learning Record modal
  hints.js           3-tier hint system
  vocabulary.js      Learn First 6-question guide + vocab pills
  teacher.js         teacher auth (SHA-256) + 5 classroom functions
css/                 shared design system (Argon-derived base)
  base.css           design tokens, reset, body gradient, .btn-3d (tactile buttons)
  layout.css         header, .module-select, .level-tabs, .progress-pill, .workspace-grid/.card-panel
  editor.css         mission header, .learn-drawer, vocab, hints, .editor-shell/.editor-gutter, .syntax-keys, .action-row, #run/#next, .msg
  stage.css          output panel: scene shell, shared #bubble, #view trace, #stepbar, .vars/.pill, #res/.chip, .legend
  modals.css         .modal-bg/.modal-box/.modal-x, learning record, badges, teacher drawer + auth
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
- **Each module is its own long-lived branch** named `module/<id>` (e.g. `module/l12_for_loop`).
- A new module MUST branch from `main`, never from another module branch.
- Each branch deploys to its own Netlify site. `modules.json` should list only the module(s) that branch is about.
- `core/` must stay identical across branches. When `core/` changes on `main`, sync module branches with `git rebase origin/main` (or merge).

### Curriculum module naming convention

Each lesson in the Python curriculum is its own long-lived module branch (one lesson = one module), named with a stable lesson id:

```
module/l<NN>_<snake_slug>
```

The official 19-lesson curriculum — **this table is the canonical source of truth for branch ids. These ids are fixed; do not rename a lesson id once shipped.**

| Full Lesson Name | Module Branch Name |
| :--- | :--- |
| Lesson 1 — Python + print() | `module/l1_pyprint` |
| Lesson 2 — Coding Environment + Function + Comment | `module/l2_env_func_comment` |
| Lesson 3 — Variable | `module/l3_variable` |
| Lesson 4 — Variable Practice | `module/l4_var_practice` |
| Lesson 5 — Data Types: String / Integer / Float | `module/l5_data_types` |
| Lesson 6 — Data Type Detective | `module/l6_datatype_detective` |
| Lesson 7 — Arithmetic Operators | `module/l7_arithmetic_ops` |
| Lesson 8 — Comparison Operators | `module/l8_comparison_ops` |
| Lesson 9 — Comparison + Boolean | `module/l9_compare_bool` |
| Lesson 10 — If | `module/l10_if` |
| Lesson 11 — If / Else + Decision Making | `module/l11_if_else` |
| Lesson 12 — For Loop | `module/l12_for_loop` |
| Lesson 13 — For Loop Challenge + time.sleep() | `module/l13_for_loop_sleep` |
| Lesson 14 — List | `module/l14_list` |
| Lesson 15 — List + For Loop | `module/l15_list_for_loop` |
| Lesson 16 — While Loop | `module/l16_while_loop` |
| Lesson 17 — While Loop Challenge | `module/l17_while_challenge` |
| Lesson 18 — Input + Interactive Program | `module/l18_input_interactive` |
| Lesson 19 — Python AI Challenge | `module/l19_ai_challenge` |

- Each branch's module folder id matches the branch id (`modules/l12_for_loop/`), and `modules.json` lists that id.
- Existing theme-based branches (`module/traffic-light`, `module/forloop`) are legacy and NOT part of this curriculum table.
- **Engine notes for these lessons:** the shared interpreter currently supports calls, assignment, if/elif/else, comparisons, and/or/not, True/False, and `for ... in range(...)`. Lessons that need `print()` (l1), arithmetic operators (l7), `time.sleep()` (l13), lists (l14, l15), `while` (l16, l17), or `input()` (l18) REQUIRE extending `core/engine.js` on `main` first (and syncing module branches). Do not author a lesson branch until its required syntax is supported (see Engine capability fence).

### Agent workflow: creating a lesson module on request

A future developer (or a user) requests a lesson in plain language, e.g.:

> "Create Lesson 12 — For Loop, idea: kids program a hula-hoop counter for a robot that spins N times"

Resolve and build without asking for the branch name:

1. **Match the lesson number/title to the canonical table above** → branch `module/l12_for_loop`. If the lesson is not listed, confirm it is a genuinely new curriculum lesson, append a row to the table (`l<NN>_<snake_slug>`), and use that id. Never shadow an existing id.
2. **Scaffold from `main`**: `git checkout main -b module/l<NN>_<slug>`, copy `modules/_template/` → `modules/<id>/`.
3. **Fold the user's idea into the module contents** — the idea drives:
   - `module.json` → description, `commands`, `labels`, `badges`
   - `data.js` → storyProblem, learnFirst, vocabulary, hints (shared lesson schema; `tests` may use `cmd`, `cmd*N`, `cmd+` wants)
   - `scene.js`/`scene.css` → the visual right-pane for the idea's theme
4. **Engine gate first**: if the lesson needs syntax the interpreter lacks (`print`, arithmetic, lists, `while`, `input`, `time.sleep`), extend `core/engine.js` on `main` first, update the capability fence, sync module branches, then author the lesson. Do not write lessons around unsupported syntax.
5. **Register** the id in `modules.json`, run the verification harness (every `solution` must pass every `tests`, count-aware), commit, and push the branch.
6. **Preserve the user's idea**: keep a `userIdea` field in `module.json` (e.g. `"userIdea": "hula-hoop counter robot"`) so the design intent stays traceable, and mirror the idea in the scene + story.

## Adding a new module

1. `git checkout main && git checkout -b module/<id>` — for curriculum lessons use the canonical branch name from the table above (via the Agent workflow), never an invented ad-hoc id.
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
- Scene CSS goes in the module's own `scene.css`; do not add scene-specific rules to the shared `css/` files.

## Design system (Argon-derived)

The scaffold's UI/color base is extracted from the Argon "Pro Edition" style. Future modules **must** reuse it; do not introduce a second visual language.

- **Theme:** light arcade only. No dark-mode rules; do not add `prefers-color-scheme` blocks.
- **Tokens** (`css/base.css`): `--bg-app #e0f2fe`, `--bg-card #ffffff`, `--bg-subtle #f0f9ff`, `--ink-main #0f172a`, `--ink-muted #475569`, `--border-line #bae6fd`, `--border-strong #7dd3fc`; accents `--primary #2563eb`, `--success #16a34a`, `--warning #f59e0b`, `--danger #ef4444`, `--purple #7c3aed`; code `--code-bg #0f172a / --code-gutter #1e293b / --code-ink #f8fafc`. Scene tokens `--sky1/--sky2/--grass/--road/--sun` are back-compat for module scene.css files.
- **Class conventions:** tactile `.btn-3d` buttons (+ `.btn-teacher`, `.btn-journey`, `.unlocked`), `.level-tab` with `.active`/`.completed` states, `.brand-title`/`.brand-badge`, `.module-select`, `.progress-pill`/`.progress-track`/`.progress-fill`, `.workspace-grid`/`.card-panel`, `.concept-badge`, `.mission-title`/`.mission-story`, `.learn-drawer` (collapsible via `.closed`) + `.q6-item`, `.vocab-pill`/`.info-pop`, `.editor-shell`/`.editor-gutter`, `.syntax-keys`, `.action-row`, `.modal-bg`/`.modal-box`/`.modal-x`, `.badge-chip`(+`.earned`), `.t-drawer`/`.t-act`/`.t-out`.
- **Fonts:** user-visible text uses Fredoka (set on `:root`); code, pills, trace, keys, and gutter use `"JetBrains Mono", monospace`.
- **Editor gutter:** line numbers are rendered by `renderGutter()` from `core/editor.js` into `.editor-gutter`. Call it after programmatically setting `#code` value; the shell wires it on `input` automatically.

## Engine capability fence

The shared interpreter (core/engine.js) supports exactly: function calls listed in `commands`, `name = value` assignment, `if/elif/else`, comparisons `== != < > <= >=`, `and` / `or` / `not`, `True` / `False`, string (`"…"`) and number literals, `for` loops (`for <name> in range(N):` or `range(start, stop):`, where bounds are integer literals or variables holding whole numbers), and `#` comments via indentation rules. Loops unroll into per-iteration trace events (`k: "for"`), so the step-runner walks each iteration; `exec` (Script mode) iterates normally.

It does NOT support: `while`, `def`/functions, `print()`, `import`, arithmetic operators (`+ - * /`), lists/dicts, method calls, or `break`/`continue`. **Do not author lessons that require unsupported syntax.** If a future module needs new syntax, extend `core/engine.js` deliberately, keep `core/` shared, and update this file.

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