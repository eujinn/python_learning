# Kindness City — Theme & Scene Guide

> **Read this before designing any module's right-panel scene.**
> This is the canonical visual/narrative brief for the Python Playground. If a
> developer asks an agent to "create a new module with teaching content X" and
> gives no scene details, the agent MUST build the scene from this guide.

---

## 1. Core values (爱自己，爱别人，爱地球)

Every scene, story, and character must express one or more of the three core values:

| Value | Chinese | Meaning in-scene |
|---|---|---|
| **Love yourself** | 爱自己 | Healthy choices, learning, rest, safety, self-respect, curiosity. |
| **Love others** | 爱别人 | Kindness, sharing, helping neighbours, gratitude, teamwork, care for animals. |
| **Love the Earth** | 爱地球 | Meatless meals, recycling, saving energy/water, planting, less waste, clean air. |

These are *positive* values: never use violence, blame, punishment, or scary imagery.
Mistakes are framed as "try again", never as failure.

---

## 2. The world: Kindness City

All lessons take place in **Kindness City** — a friendly, sunny, walkable town where
citizens practise the three core values every day. Each module is a **place** or a
**citizen task** inside the city. Recurring ideas:

- **Citizens**: curious kids, helpful shopkeepers, a recycling crew, a community-garden
  club, a stray-cat shelter, a bike-sharing crew.
- **Places**: food stall, recycling centre, community garden, library, transit stop,
  energy-saving home, animal shelter, repair café, kindness post office.
- **Tone**: warm, hopeful, playful, inclusive. Bilingual labels (Chinese + English) are
  welcome but optional.
- **Motion**: gentle and meaningful — animation should show the *concept*, not distract
  from it. One clear visual beat per command is better than constant motion.

### Scenario library (pick or adapt one per module)

| Scenario | Core value | Natural Python concepts |
|---|---|---|
| Meatless food stall (素食小摊) | 爱地球 | Counting orders, totals, `for`, `if` on choices, lists of dishes |
| Recycling centre (回收中心) | 爱地球 | Sorting into bins, comparisons, lists, loops, `%` |
| Community garden (社区花园) | 爱地球 / 爱别人 | Watering N plants, growth, `range`, accumulation |
| Kindness post office (善念邮局) | 爱别人 | Messages, strings, `print`, conditionals, name variables |
| Animal shelter (动物之家) | 爱别人 | Feeding animals, lists, loops, counting |
| Energy-saving home (节能小屋) | 爱地球 | Turning devices on/off, booleans, `if/else` |
| Bike-sharing crew (共享单车) | 爱地球 | Counters, arithmetic, while loops |
| Repair café (维修咖啡馆) | 爱地球 | Debugging metaphors, step-by-step fixes |
| Library / study corner (图书馆) | 爱自己 | Strings, lists, tracking progress |
| Kindness award board (善行榜) | 爱别人 | Variables, totals, comparisons, badges |

> Do not copy a table row mechanically. Use it as a starting point and let the lesson's
> teaching content choose the most natural scenario.

---

## 3. Mapping a lesson to a scene

Given a lesson concept, design the scene in four steps:

1. **Pick the value** the lesson best expresses (self / others / Earth).
2. **Pick a place** in Kindness City where that value is practised daily.
3. **Find the one action** the student's code should visibly drive (e.g. serve a meatless
   meal, sort one bottle, water one plant). The engine calls `play(cmd)` per command, so
   the scene needs a clear visual response per command.
4. **Show the value in the copy**: the story, labels, legend, and completion message
   should name the kindness being practised (e.g. "You served 5 meatless meals — the city
   breathes a little easier.").

### Example mappings

| Teaching content | Kindness City scene | Commands / visual |
|---|---|---|
| `print()` | Kindness post office | `send(message)` stamps and posts a card |
| Variables | Library study corner | `label(name)` writes a name tag; render shows the stored value |
| Arithmetic | Meatless food stall | `serve(count)` adds dishes to a tray; totals update |
| `if/else` | Recycling centre | `sort(item)` drops an item into the right bin |
| `for` loop | Community garden | `water(plant)` waters each plant in turn |
| Lists | Animal shelter | `feed(animal)` feeds each animal from the list |
| `while` loop | Bike-sharing crew | `unlock(bike)` keeps going until the goal is met |
| Debug | Repair café | `fix(part)` repairs one broken part |

---

## 4. Visual design rules (right panel)

The scene lives in the **right `.card-panel` (`#module-scene`)**. Follow the shared
design system; scenario accents layer on top of the neutral base.

- **Base palette** (from `css/base.css`): light grey surfaces + **dark blue** brand
  (`--primary #1e3a8a`). Accents: `--success`, `--warning`, `--danger`, `--purple`.
- **Scenario colours**: define module-local tokens in `scene.css` (e.g. `--stall-red`,
  `--recycle-green`) and scope them to the module's scene. Do **not** edit shared CSS.
- **Scene tokens** available for back-compat: `--sky1`, `--sky2`, `--grass`, `--road`,
  `--sun`. Prefer explicit module tokens for anything new.
- **Scene structure**: build a `.scene` container, include `<div id="bubble">` if you want
  trace captions, and keep DOM ids module-specific (prefix with the lesson id) to avoid
  collisions with the shared shell.
- **Accessibility**: keep contrast readable on the light-grey base; do not rely on colour
  alone to communicate state (pair with text/icon).
- **Performance**: pure CSS/SVG where possible; no external images or CDNs; no bundlers.

### `scene.js` contract (must match)

```js
export function init(container)             // build scene DOM once (include #bubble if wanted)
export function render(env)                 // sync visuals to sensor/state values
export function reset()                     // clear animations between tests
export async function play(cmd, args, ctx)  // animate one command; resolve when done
```

- `play()` must always resolve; animate a single, legible beat per command.
- `render(env)` is called on every assignment and load — keep it cheap.
- `reset()` runs between tests — clear counters, timers, and transient DOM state.
- Clean up any `setInterval`/listeners you create; a module may be swapped at runtime.

---

## 5. Agent workflow when a developer supplies only the teaching content

When a developer says *"I want a new module that teaches X"* and gives **no scene
details**, the agent should:

1. **Default to Kindness City.** Do not invent a different universe.
2. **Choose the value + place** using §2–§3; state the choice briefly in the module's
   `description` and keep a `userIdea` field in `module.json` recording the original
   request.
3. **Design the right pane** so one command = one visible kindness action (§3 step 3).
4. **Write the story** around that action so the value is explicit, not decorative.
5. **Honour the shared visual system** (§4) and the 20-exercise backbone in `AGENTS.md`.
6. **Verify** with `node scripts/verify-all.mjs` and confirm the scene renders in the
   browser (`npx serve .`).

If the developer *does* supply scene details, fold their idea into Kindness City where it
fits; if it conflicts with the core values, adapt it so it still expresses
爱自己 / 爱别人 / 爱地球.

---

## 6. Scene checklist

- [ ] Takes place in Kindness City and names the place/citizen.
- [ ] Expresses at least one core value explicitly in the story/labels.
- [ ] One command maps to one clear visual action.
- [ ] Uses the light-grey + dark-blue base; scenario accents are module-scoped.
- [ ] `init` / `render` / `reset` / `play` implemented and leak-free.
- [ ] No external assets, CDNs, bundlers, or `eval`.
- [ ] `node scripts/verify-all.mjs` passes; module loads with no console errors.

---

*This guide is the single source of truth for scene theme and values. Update it here,
not in per-module notes, so every future module inherits the same world.*
