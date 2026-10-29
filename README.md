# Python Playground

A modular platform for teaching Python through interactive, visual lessons. Each module presents a split-screen: **code editor on the left**, **simulation + step-through trace on the right**.

## Overview

- `main` branch — scaffolding, core engine, and a `_template` module stub
- Each module = a separate long-lived branch (e.g. `module/traffic-light`, or curriculum `module/l12_for_loop`)
- Each branch deploys independently to its own Netlify site
- UI/color base (the "design system") is derived from the Argon Pro Edition style — see `AGENTS.md`

> Legacy theme branches were renamed into the curriculum (`module/traffic-light` → `module/l8_comparison_ops`).

## Structure

```
core/     shared engine + UI (editor.js gutter, ui-shell, engine, progress, hints, vocabulary, teacher)
css/      shared design system: base (tokens + .btn-3d), layout, editor, stage, modals
modules/  one folder per module (module.json + data.js + scene.js [+ scene.css])
index.html
```

## Modules

| Branch | Module | Description |
|---|---|---|
| `module/l8_comparison_ops` | Comparison Operators — Traffic Light | Lesson 8 curriculum: compare sensors to drive the car |
| `module/forloop` | For-Loop Outpost (legacy) | Learn Python for loops with an outpost mecha |
| `module/l12_for_loop` | For Loop — Lesson 12 | Curriculum lesson: bend the rules of repetition with for loops |

**Curriculum lessons** follow the one-lesson-per-module convention: branch id = `module/l<NN>_<snake_slug>`. The canonical 19-lesson table (l1_pyprint … l19_ai_challenge) lives in `AGENTS.md` — read it before creating any lesson module.

## Local Development

```bash
npx serve .
```

Then open the URL shown in your terminal. ES modules require an HTTP server; `file://` will not work.

## Adding a New Module

1. Copy `modules/_template/` to `modules/<your-module-id>/`
2. Update `module.json` with your module metadata and badges
3. Write your lessons in `data.js`
4. Write your scene + action callbacks in `scene.js`
5. Add your module id to `modules.json`
6. Create a branch: `git checkout -b module/<your-module-id>`
7. Read `AGENTS.md` — the module contracts and the Argon-derived design system are defined there

**In plain words:** to request a new curriculum lesson, just describe it (e.g. "Lesson 12 — kids program a spinning robot with a hula-hoop counter for N times"). An agent reading `AGENTS.md` resolves the canonical branch name from the table, scaffolds the module from `modules/_template/`, and folds your idea into the scene, lessons, and commands.

## Deploy

Each branch is deployed to Netlify independently. Configure per-branch deploys in the Netlify dashboard.
