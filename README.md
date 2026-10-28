# Python Playground

A modular platform for teaching Python through interactive, visual lessons. Each module presents a split-screen: **code editor on the left**, **simulation + step-through trace on the right**.

## Overview

- `main` branch — scaffolding, core engine, and a `_template` module stub
- Each module = a separate long-lived branch (e.g. `module/traffic-light`)
- Each branch deploys independently to its own Netlify site

## Modules

| Branch | Module | Description |
|---|---|---|
| `module/traffic-light` | Traffic Light Python | Learn conditionals by programming a self-driving car |

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

## Deploy

Each branch is deployed to Netlify independently. Configure per-branch deploys in the Netlify dashboard.
