# Python Playground Master Blueprint v1.0

| Blueprint Metadata | Details |
| :--- | :--- |
| **Document ID** | `PP-MASTER-BLUEPRINT-v1.0` |
| **Project** | Python Playground |
| **Source Repository** | `https://github.com/eujinn/python_learning` |
| **Baseline Reference** | [`Repository_Discovery_Report_v1.0.md`](./Repository_Discovery_Report_v1.0.md) |
| **Branch** | `feature/python-playground-architecture-review` |
| **Authors / Roles** | Argon 4 — Senior Software Architect, Educational Platform Architect & Product Strategist |
| **Operational Consumer** | Human Maintainers, Curriculum Designers, Contributors & AI Assistants (Flash 3.8) |
| **Status** | v1.0 Architecture Baseline — Awaiting Human Approval Before Implementation |
| **Date** | 2026-10-30 |

---

## 1. Executive Summary

**Python Playground** is an interactive visual Python learning platform built on a compelling educational premise: beginners learn programming best when they can **decompose problems systematically on the left** and **watch Python execute their code step-by-step in an animated world on the right**. Its zero-build ES module design, Argon-derived light arcade UI, 6-step *Learn First* thinking guide, 3-tier progressive hints, and built-in Teacher Mode establish an unusually strong pedagogical foundation.

However, our baseline discovery and cross-branch audit (`main`, `module/l1_pyprint`, `module/l8_comparison_ops`, `module/l12_for_loop`) prove that **the current per-branch engine-forking architecture cannot scale to a 20-lesson school system**:
1. **Active Codebase Divergence at N=3:** With only three curriculum modules built on separate branches, `core/engine.js`, `core/lessons.js`, `core/ui-shell.js`, and `index.html` have already split into **three mutually incompatible `scene.play()` and assertion APIs**. Scaling to 20 branches means maintaining 20 forked copies of the runtime, managing 20 Netlify sites, fracturing student `localStorage` across 20 subdomains, and cherry-picking every bug fix 20 times.
2. **Immediate Core Defects & Security Debt:** `core/teacher.js` currently crashes due to a `state.lessons` vs. `state.LESSONS` casing mismatch; `core/engine.js` compiles student input via `new Function()` (causing JavaScript semantic leaks and Content-Security-Policy violations); `.innerHTML` truncates teaching notes containing `<` or `>`; and `core/ui-shell.js` injects legacy `"go"` commands into non-car lessons.
3. **Engine & Assessment Ceiling:** Lessons 3–20 require variable/type inspection, arithmetic, lists, `while` loop infinite-run protection, `input()` mocking, `def` functions, and anti-hardcoding AST checks—capabilities beyond regex command matching.

### Strategic Blueprint Summary
1. **Unify the Platform on Trunk (`main`):** Replace per-branch `core/` forking with **One Versioned Stable Core + 20 Self-Contained Lesson Plugins (`modules/l1_*` … `modules/l20_*`)** deployed on a **single Netlify site**, using **Teacher Focus URLs (`?module=l12_for_loop&lock=1`)** to deliver distraction-free single-lesson classroom views when desired.
2. **Build Engine v2 Once (`core/engine/`):** Replace regex + `new Function()` with a zero-dependency, CSP-safe **Pedagogical Python Subset Lexer + Recursive-Descent AST + Tree-Walk Step Tracer** (~600 LOC vanilla JS) featuring declarative per-lesson **Syntax Capability Gates** (`allowedSyntax` in `module.json`) and a `MAX_TRACE_STEPS = 500` infinite-loop guard.
3. **Upgrade Assessment & Classroom Ergonomics:** Introduce **Multi-Modal Assertions** (stdout, variables, call sequences, AST `mustUse` constraints), **Auto-Play (`1x`/`2x`)** step execution, **Shared-PC Student Session Switching**, and **Printable Learning Report Cards**.
4. **Future-Proof for Own-Server Migration:** Isolate persistence behind a lightweight asynchronous **`StorageAdapter`** (`core/storage.js`), enabling Phase 1 `localStorage` operation today and seamless Phase 2 migration to a school backend, PostgreSQL database, teacher dashboard, and student accounts with **zero changes to lessons or scenes**.

---

## 2. Vision and Mission

### Vision
Establish **Python Playground** as a trusted, open-source, classroom-ready **Python Education Ecosystem** that bridges the gap between block-based coding (Scratch) and professional text-based Python—empowering schools, teachers, and self-learners worldwide.

### Mission
- **For Students:** Make Python's invisible execution model visible, playful, forgiving, and concrete so every learner builds genuine computational thinking rather than memorizing syntax.
- **For Teachers:** Provide turnkey 45-minute classroom lessons complete with teaching notes, live step-execution projection, locked classroom links, and effortless progress verification—even for non-specialist educators.
- **For Maintainers & Contributors:** Maintain a clean, zero-framework, human-readable architecture where curriculum creators add lessons purely as data and visual scenes without ever risking platform stability.

```text
                         PYTHON PLAYGROUND PLATFORM
                                      │
    ┌────────────────┬────────────────┼────────────────┬────────────────┐
    ▼                ▼                ▼                ▼                ▼
Curriculum      Interactive       Visual         Assessment       Teacher &
  System       Python Engine    Simulation         Engine         Classroom
(5 Units /     (Safe AST +      (Scene API +    (Stdout, Vars,   Tools (Focus
20 Lessons)    Syntax Gates)    Scene-Kit UI)   Calls & AST)     URLs, Reports)
```

---

## 3. Product Principles

| # | Principle | Operational Meaning |
| :---: | :--- | :--- |
| **P1** | **Pedagogy Over Language Completeness** | Support the exact Python subset beginners need with tutor-quality `Line N:` diagnostics rather than overwhelming learners with raw CPython tracebacks. |
| **P2** | **Stable Core, Declarative Content (Open-Closed)** | `core/` is maintained by developers and locked against per-lesson forks; `modules/<id>/` plugins configure syntax gates, toolbar keys, tests, and visuals declaratively. |
| **P3** | **Zero-Build Longevity** | Keep native browser ES modules, standard CSS custom properties, and zero npm runtime dependencies in Phase 1 so the codebase stays runnable for years without build-tool rot. |
| **P4** | **Deterministic Visible State** | Every line of student code produces inspectable trace events synchronized across the editor line highlight, speech bubble, stage visuals, and variable state bar. |
| **P5** | **Offline-First Today, Server-Ready Tomorrow** | Bundle all assets (including fonts and icons) locally with zero external CDN calls, while decoupling state persistence behind `StorageAdapter` for Phase 2 server migration. |
| **P6** | **Human-First Maintainability** | Every architectural boundary, file schema, and verification script must be understandable by a human educator or junior web developer in under 15 minutes. |

---

## 4. Target Users

| User Group | Primary Needs | Pain Points Addressed | Platform Capabilities Provided |
| :--- | :--- | :--- | :--- |
| **Students (Beginners & Young Learners)** | Guided entry, low typing friction, visual reward, clear error hints. | Syntax frustration (`:` / indentation / quotes), blank-page paralysis, loop step fatigue. | 6-step *Learn First* guide, dynamic syntax toolbar, 3-tier hints, Auto-Play `1x`/`2x` tracer, badges & sandbox mode. |
| **Classroom Teachers** | Zero-install browser links, projector demo tools, classroom pacing control, assessment proof. | Students clicking into wrong modules; shared computer state collisions; 30 simultaneous syntax questions. | Locked Focus URLs (`?module=id&lock=1`), fixed Teacher Mode drawer, session switcher, Printable Learning Report Card. |
| **Curriculum Designers** | Clear templates, expressive test assertions, fast preview & validation. | Having to edit JS parser internals just to write a `print()` or `variable` lesson. | Declarative `module.json` + `data.js` v2.0 schema, reusable `scene-kit.js`, plain-English CLI validator. |
| **Developers & Open Source Contributors** | Clean module contracts, automated regression checks, zero merge hell. | Cherry-picking fixes across 20 diverged branches; undocumented side effects. | Single-trunk `main` workflow, `node --test` unit suite, GitHub Actions CI verification gate. |
| **School IT / Future Administrators** | Safe CSP compliance, data privacy, versioned releases, self-hosting path. | `'unsafe-eval'` CSP violations, unvetted external network calls, cloud lock-in. | `eval`-free AST interpreter, 100% self-contained static bundle (Phase 1), Docker/API backend path (Phase 2). |

---

## 5. Educational Philosophy

Python Playground combines **PRIMM (Predict–Run–Investigate–Modify–Make)** and **Cognitive Apprenticeship**:

1. **Structured Problem Decomposition (`Learn First`):** Before writing code, students frame: *(1) Problem → (2) Known Info → (3) Python Question → (4) Why Path → (5) Action → (6) Concept Learned*.
2. **Scaffolded Micro-Progression Within Every Lesson (5–7 Exercises):**
   - **Exercise 1 — Observe (`type: "observe"`):** Working starter code; student runs and steps through trace to form an accurate mental model.
   - **Exercise 2 — Modify (`type: "modify"`):** Student alters values, strings, or operators in pre-structured starter code.
   - **Exercises 3–4 — Guided Apply (`type: "guided"`):** Multi-scenario problems where environment variables change per test run, proving why dynamic Python logic beats hardcoding.
   - **Exercise 5 — Challenge / Debug (`type: "challenge"` or `"debug"`):** Broken program repair or un-scaffolded synthesis problem verifying mastery.
   - **Exercise 6 — Creative Sandbox (`type: "sandbox"`, `free: true`):** Open-ended creative play (`🎮` tab) rewarding fast finishers while teachers support peers.
3. **Concept-True Assessment:** Tests verify *both* behavioral outcomes (commands, stdout, variable post-states) *and* structural understanding (`mustUse: ["for"]`), ensuring students cannot pass a loop lesson by copy-pasting five sequential calls.

---

## 6. Current Architecture Assessment

### 6.1 Component-by-Component Evaluation

| Area | Current Implementation | Assessment & Concrete Findings | Triage Decision |
| :--- | :--- | :--- | :---: |
| **Folder Structure** | `core/`, `css/`, `modules/_template/`, `index.html`, `modules.json` | Clean, intuitive separation between shared runtime, styling tokens, and per-module content. Missing `docs/`, `scripts/`, `tests/`, and `assets/fonts/`. | **KEEP & EXTEND** |
| **Design System (`css/*`)** | Argon-derived light arcade CSS custom properties, `.btn-3d` buttons, 2-column grid | Cohesive, joyful, accessible contrast. However, `Fredoka` and `JetBrains Mono` lack local `@font-face` bundles, and `.editor-gutter` lacks scroll/nowrap synchronization with `textarea#code`. | **IMPROVE** |
| **Module System** | Per-branch `module/<id>` owning forked copies of `core/` | **Critical Scalability Failure:** `l1_pyprint`, `l8_comparison_ops`, and `l12_for_loop` already diverged into incompatible `scene.play()` and `ui-shell.js` contracts. Fractures Netlify hosting and `localStorage` across 20 origins. | **REDESIGN** (Unify onto `main`) |
| **Python Engine (`core/engine.js`)** | 149-line regex parser + `new Function("e", ...)` evaluator | Unsafe under strict CSP (`'unsafe-eval'`), leaks JS semantics (`3 > 2 > 1` is `false` in JS vs. `True` in Python; `bool([])` mismatch), lacks arithmetic, lists, `while` loop bounds, `input()`, and `def`. | **REDESIGN** (Pure-JS AST Engine v2) |
| **UI Shell (`core/ui-shell.js`)** | Dynamic module loader, manual step runner, hardcoded `#keys` | Solid orchestration pattern, but contains legacy Traffic-Light coupling (`auto: true` `"go"` injection + `st.cur >= 3` check), lacks Auto-Play speed controls, and hardcodes toolbar buttons in `index.html`. | **IMPROVE** |
| **Lesson & Test Schema (`core/lessons.js`)** | `adaptLesson()` + string-based `matchesWant()` (`"go"`, `"go*3"`) | Rich pedagogical fields, weak test assertions: cannot check variable post-states, stdout content (allowing `print("____")` to pass in `l1` Ex 2), or required AST constructs. | **REDESIGN** (`assertions.js` v2) |
| **Teacher Mode (`core/teacher.js`)** | Pure-JS SHA-256 + 5 classroom functions | **Currently Crashes:** Reads `state.lessons` instead of `state.LESSONS` (lines 93, 115, 127, 134). Uses unsafe `.innerHTML` (truncating `<` in notes) and hardcodes a single passcode hash in source. | **IMPROVE / FIX** |
| **Progress (`core/progress.js`)** | Direct `localStorage` (`plp_<id>_record`) + modal | Works for 1 student on 1 module, but collides on shared lab PCs, cannot print/export reports, and couples UI directly to `localStorage`. | **IMPROVE** (`StorageAdapter` + Session/Print) |
| **Testing Strategy** | Manual `npx serve .` + ad-hoc inline snippet in `AGENTS.md` | No committed test runner, no engine unit tests, no CI workflow on pull requests. | **REDESIGN** (`verify-all.mjs` + CI) |

---

## 7. Gap Analysis

### 7.1 Technical & Architectural Gaps
1. **Multi-Branch Maintenance Trap:** Fixing a single UI or accessibility bug across 20 independent branches creates `O(N)` merge burden and guaranteed drift.
2. **Absence of Infinite-Loop Protection:** Because `tr()` unrolls execution synchronously before UI playback begins, Lesson 16 (`while True:`) will hang the browser main thread unless bounded by `MAX_TRACE_STEPS`.
3. **Synchronous `input()` Gap:** Lesson 18 (`input()`) requires both deterministic scripted input queues during automated scenario verification and an interactive input prompt during student free runs.
4. **HTML Injection / Text Truncation:** Rendering `teacherExplanation` and `commonMistakes` with `.innerHTML` corrupts any text containing `<` (such as comparison lessons).
5. **No Storage Abstraction:** Direct `localStorage.getItem`/`setItem` calls prevent drop-in migration to a Phase 2 classroom backend.

### 7.2 Educational & Classroom Adoption Gaps
1. **Missing Lesson 20 (`def` Functions & Capstone):** The 19-lesson table in `AGENTS.md` omits user-defined functions (`def`) and lacks a culminating 20th synthesis project.
2. **Shortcut / Hardcoding Vulnerability:** Without AST construct assertions (`mustUse`) and negative starter checks, students can pass exercises without practicing the target Python concept.
3. **Classroom Pacing & Navigation Friction:** Showing all 20 modules in an unlocked dropdown tempts students to jump ahead during class; conversely, deploying 20 separate websites destroys unified progress tracking.
4. **Shared Lab Computer Collisions:** Schools frequently share Chromebooks/PCs across 4–6 periods per day; without a lightweight Student Session selector/reset, Period 2 students inherit Period 1's completed checkmarks.
5. **Step-Through Fatigue on Loops:** Manually clicking `Next step ▶` 35 times during nested or 10-iteration loops frustrates learners; an `Auto-Play (1x / 2x)` toggle is essential.

---

## 8. Recommended Future Architecture

### 8.1 Unified Core + Declarative Curriculum Plugins (Single-Trunk Model)

Instead of forking `core/` onto 20 branches, **all 20 curriculum modules coexist under `modules/` on `main`**, powered by one authoritative `core/` runtime:

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                   UNIFIED WEB SHELL (index.html + css/*)                  │
│   Header: Curriculum Hub Drawer | Focus Lock (?lock=1) | Session | Mode   │
├─────────────────────────────────────┬─────────────────────────────────────┤
│         LEFT PANE: LEARNING         │       RIGHT PANE: VISUAL STAGE      │
│ • Concept + Story Mission           │ • Module Scene (scene.js v2 API)    │
│ • Teacher Drawer (+ Copy Lock Link) │ • Optional Stdout Console Drawer    │
│ • 6-Step Learn First Guide          │ • Line-Highlighted Trace (#view)    │
│ • Interactive Vocab + 3-Tier Hints  │ • Plain-English Step Bubble/Expl    │
│ • Gutter-Synced Editor + Dyn Keys   │ • Step / Auto-Play (1x,2x) / Skip   │
└──────────────────┬──────────────────┴──────────────────┬──────────────────┘
                   │                                     │
                   ▼                                     ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                        STABLE SHARED CORE (core/*)                        │
│  ┌─────────────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ Engine v2 (core/engine) │  │ Assertions v2    │  │ StorageAdapter   │  │
│  │ • Lexer (Indent/Tokens) │  │ • calls / seq    │  │ • Phase 1: Local │  │
│  │ • AST Parser + Gate     │  │ • stdout lines   │  │ • Phase 2: REST  │  │
│  │ • Safe Tree-Walk Tracer │  │ • env post-vars  │  │   Backend API    │  │
│  │ • MAX_STEPS = 500       │  │ • AST mustUse    │  └──────────────────┘  │
│  └─────────────────────────┘  └──────────────────┘                        │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │ Dynamic ES Module Plugin Load
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
[modules/l1_pyprint]       [modules/l8_comparison_ops]   [modules/l20_functions_capstone]
 • module.json (v2)         • module.json (v2)            • module.json (v2)
 • data.js (LESSONS)        • data.js (LESSONS)           • data.js (LESSONS)
 • scene.js + scene.css     • scene.js + scene.css        • scene.js + scene.css
```

### 8.2 How Unified Trunk Preserves Every Benefit of the Old Branch Model
1. **Classroom Isolation Without 20 Sites:** `core/router.js` supports `?module=l12_for_loop&lock=1`. When `lock=1` is present in the URL (generated in 1 click from Teacher Mode), the module switcher is hidden so students stay focused strictly on Lesson 12—while still running from the single unified deployment and unified origin storage.
2. **Per-Lesson Syntax Fencing Without Forking `engine.js`:** `module.json` declares `allowedSyntax` (e.g., `["print", "strings"]` in Lesson 1). When a Lesson 1 student types `while`, Engine v2 recognizes the token and responds: *"Hold on! `while` loops unlock in Lesson 16. Use `print()` for this mission!"*
3. **Zero-Conflict Parallel Lesson Authoring:** Because Engine v2, dynamic `toolbarKeys`, and `assertions.js` already support all 20 lessons, creating a new lesson only adds files inside `modules/<id>/` and appends one entry to `modules.json`.

### 8.3 Pedagogical Python Subset Engine v2 Specification
Engine v2 (`core/engine/`) is a pure-JavaScript (~600 LOC), zero-dependency **Lexer → Recursive-Descent AST → Tree-Walk Step Tracer** supporting the exact 20-lesson scope:
- **Types & Literals:** `int`, `float`, `str` (single/double quotes + escapes), `bool` (`True`, `False`), `None`, `list` (`[a, b]`).
- **Variables & Mutation:** `x = expr`, `+=`, `-=`, list indexing `items[i]`, `items[i] = val`, `items.append(val)`.
- **Operators (True Python 3 Semantics):** `+`, `-`, `*` (including `"ha" * 3`), `/`, `//`, `%`, unary `-`, chained comparisons (`==`, `!=`, `<`, `>`, `<=`, `>=`, `in`, `not in`), boolean short-circuit (`and`, `or`, `not` with Python truthiness where `bool([]) === false` and `bool("") === false`).
- **Control Flow:** `if` / `elif` / `else`, `for x in range(start, stop, step):`, `for item in list_expr:`, `while cond:`, `break`, `continue`.
- **Functions & Built-ins:** `def fn(a, b):` + `return expr` (recursion/step-bounded), `print(*args)`, `len()`, `type()` (returns `"int"`, `"float"`, `"str"`, `"bool"`, `"list"` or `<class '...'>` formatted cleanly), `int()`, `float()`, `str()`, `abs()`, `min()`, `max()`, `input(prompt)` (reads from test `inputs` queue or interactive modal), `time.sleep(seconds)` (emits `{ k: "sleep", sec }` trace event), plus module-declared scene commands (`commands` in `module.json`).
- **Safety Guarantees:** Zero `eval` / `new Function`; hard cap `MAX_TRACE_STEPS = 500` and `MAX_CALL_DEPTH = 16`.

---

## 9. Curriculum Architecture (20-Lesson School Baseline)

### 9.1 5-Unit Pedagogical Progression
We preserve all 19 canonical IDs from `AGENTS.md` (`l1_pyprint` … `l19_ai_challenge`) without renaming and append **`l20_functions_capstone`** to provide reusable functions (`def`) and a culminating project:

| Unit | Lesson # | Canonical Module ID | Title | Core Concepts | Prerequisite IDs | Mastery Goal |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| **Unit 1: Output, Commands & Variables** | 1 | `l1_pyprint` | Python + `print()` | `print()`, strings, multi-arg output | None | Display text & multiple values accurately |
| | 2 | `l2_env_func_comment` | Coding Environment + Function + Comment | `#` comments, sequential execution, action calls | `l1_pyprint` | Sequence commands top-to-bottom & document code |
| | 3 | `l3_variable` | Variable | `name = value`, reading variables in `print`/calls | `l2_env_func_comment` | Bind values to descriptive names & retrieve them |
| | 4 | `l4_var_practice` | Variable Practice | Reassignment, updating variables across steps | `l3_variable` | Trace how variable state changes line by line |
| **Unit 2: Data Types & Arithmetic** | 5 | `l5_data_types` | Data Types: String / Integer / Float | `str`, `int`, `float`, quotes vs numeric values | `l4_var_practice` | Choose & distinguish text, whole, and decimal data |
| | 6 | `l6_datatype_detective` | Data Type Detective | `type()`, `int()`, `float()`, `str()` casting | `l5_data_types` | Inspect types and fix string/number mismatches |
| | 7 | `l7_arithmetic_ops` | Arithmetic Operators | `+`, `-`, `*`, `/`, `//`, `%`, `+=`, parentheses | `l6_datatype_detective` | Compute totals, remainders, and state updates |
| **Unit 3: Comparisons & Decisions** | 8 | `l8_comparison_ops` | Comparison Operators | `==`, `!=`, `<`, `>`, `<=`, `>=` | `l7_arithmetic_ops` | Formulate true/false sensor comparisons |
| | 9 | `l9_compare_bool` | Comparison + Boolean | `True`, `False`, `and`, `or`, `not` | `l8_comparison_ops` | Combine compound conditions accurately |
| | 10 | `l10_if` | `if` Statements | `if cond:`, `:`, 4-space block indentation | `l9_compare_bool` | Guard actions behind conditional blocks |
| | 11 | `l11_if_else` | `if` / `elif` / `else` + Decision Making | Multi-way branching & fallback paths | `l10_if` | Handle all environment cases cleanly |
| **Unit 4: Loops & Lists** | 12 | `l12_for_loop` | `for` Loop | `for i in range(n):`, `range(a, b)`, loop counter | `l11_if_else` | Repeat structured patterns dynamically |
| | 13 | `l13_for_loop_sleep` | `for` Loop Challenge + `time.sleep()` | Timed sequences, countdowns, loops + `if` | `l12_for_loop` | Coordinate timed repetitive animations |
| | 14 | `l14_list` | List | `[...]`, 0-based index `a[0]`, `len()`, `.append()` | `l12_for_loop` | Store, access, and grow ordered collections |
| | 15 | `l15_list_for_loop` | List + `for` Loop | `for item in items:`, list filtering & totals | `l14_list` | Process every item in a collection with loops + `if` |
| **Unit 5: Interactivity, AI & Functions** | 16 | `l16_while_loop` | `while` Loop | `while cond:`, loop state mutation, termination | `l11_if_else`, `l12_for_loop` | Repeat actions until a dynamic condition is met |
| | 17 | `l17_while_challenge` | `while` Loop Challenge | Compound `while`, `break`, avoiding infinite loops | `l16_while_loop` | Solve unknown-length navigation/resource tasks |
| | 18 | `l18_input_interactive` | `input()` + Interactive Program | `input(prompt)`, casting `int(input())` | `l6_datatype_detective`, `l11_if_else` | Build interactive programs responding to user input |
| | 19 | `l19_ai_challenge` | Python AI Challenge | Rule-based scoring, keyword matching (`in`), lists | `l15_list_for_loop`, `l18_input_interactive` | Build an explainable rule-based classifier bot |
| | 20 | `l20_functions_capstone` | Functions (`def`) & Smart Town Capstone | `def fn(x):`, `return`, modular decomposition | `l15_list_for_loop`, `l16_while_loop` | Organize reusable logic to run a multi-system scene |

---

## 10. Lesson Module Standard (v2.0 Specification)

Every curriculum module lives in `modules/<module_id>/` and contains **four standardized files**:

### 10.1 File Checklist per Module
- [ ] `module.json` — Declarative metadata, syntax capability gate, toolbar keys, commands, and mastery badges.
- [ ] `data.js` — Exports `export const LESSONS = [...]` containing 5–6 scaffolded exercises + 1 `free: true` sandbox.
- [ ] `scene.js` — Exports `init(container, ctx)`, `render(env, meta)`, `reset()`, and `async play(cmd, args, ctx)`.
- [ ] `scene.css` — Scoped stage CSS rules prefixed by a unique module class (e.g., `.l12-scene ...`) so modules never leak styles when switching in the Curriculum Hub.

### 10.2 `module.json` Standard Fields

| Property | Required | Type | Description |
| :--- | :---: | :--- | :--- |
| `schemaVersion` | Yes | `2` | Identifies v2.0 unified plugin contract (`1` supported via adapter). |
| `id` | Yes | `string` | Must match folder name and canonical curriculum ID (e.g., `"l3_variable"`). |
| `unit` / `curriculumOrder` | Yes | `number` | Unit (`1`–`5`) and sequence order (`1`–`20`) for Curriculum Hub grouping. |
| `name`, `icon`, `description` | Yes | `string` | Displayed in Curriculum Hub, header title, and browser tab. |
| `learningObjectives` | Yes | `string[]` | 2–4 measurable student learning outcomes shown in Teacher Mode & Hub. |
| `prerequisites` | Yes | `string[]` | Module IDs recommended prior to this lesson. |
| `allowedSyntax` | Yes | `string[]` | Syntax gates unlocked in Engine v2 (`"print"`, `"variables"`, `"arithmetic"`, `"comparisons"`, `"booleans"`, `"if"`, `"elif_else"`, `"for_range"`, `"sleep"`, `"lists"`, `"for_list"`, `"while"`, `"input"`, `"def"`). |
| `commands` / `labels` | Yes | `string[]` / `object` | Allowed scene/built-in calls and plain-English step trace captions. |
| `toolbarKeys` | Yes | `string[]` | Exact quick-insert buttons rendered in `#keys` for this lesson. |
| `showConsole` | Optional | `boolean` | When `true`, displays a standard output terminal strip under the visual scene for `print()`/`input()`. |
| `badges` | Yes | `Badge[]` | 2–3 achievement badges mapped to 0-based `levels` arrays. |
| `userIdea` | Optional | `string` | Preserves original theme/story brief for traceability. |

### 10.3 `data.js` Exercise & Mastery Criteria Standard

Each exercise object inside `LESSONS` MUST satisfy:
1. **Pedagogical Header:** `id` (1-based), `type` (`"observe" | "modify" | "guided" | "challenge" | "debug" | "sandbox"`), `title`, `concept`, `storyProblem`.
2. **6-Step Thinking Guide (`learnFirst`):** Non-empty `problem`, `knownInfo`, `pythonQuestion`, `whyPath`, `action`, `learned`.
3. **Vocabulary (`vocabulary`):** 2–5 `{ term, meaning }` entries matching terms used in the exercise.
4. **3-Tier Hints (`hints`):** Exactly 3 strings: `[0]` Concept Clue, `[1]` Structure Skeleton, `[2]` Guided Correction.
5. **Code Pair:** `starterCode` and canonical `solution`.
6. **Structural Constraints (`constraints`, optional):** `{ mustUse: [...], mustNotUse: [...], forbidLiterals: [...] }` to guarantee authentic concept mastery.
7. **Multi-Scenario Tests (`tests`):** At least 1 scenario for deterministic output lessons and **≥2–3 varied `environment`/`inputs` scenarios** for variable, conditional, loop, or function exercises:
   - `environment`: initial sensor/variable dictionary overriding `base`.
   - `inputs`: optional array of strings fed sequentially to `input()`.
   - `want`: backward-compatible call matcher (`"go"`, `"scoop*3"`, `["scoop(vanilla)"]`) OR
   - `expect`: `{ stdout?: string[], vars?: Record<string, any>, calls?: string[], returnVal?: any }`.
8. **Teacher & Reflection Metadata:** `teacherExplanation`, `commonMistakes` (`string[]`), and `studentReflection`.
9. **Module Mastery Criteria:** A student masters a module when 100% of non-`free` exercises pass all `tests` and `constraints`, unlocking the module's final Capstone Badge.

---

## 11. Technical Roadmap

```text
MILESTONE 1: Core Stabilization & Safety (Foundation)
  ├── Fix core/teacher.js (state.LESSONS) & safe DOM rendering (core/dom.js)
  ├── Remove Traffic-Light auto-"go" coupling from core/ui-shell.js
  ├── Sync editor gutter scrolling/nowrap & bundle local WOFF2 fonts
  └── Establish zero-dependency test runner (node --test)

MILESTONE 2: Engine v2, Assertions v2 & Storage Seam
  ├── Implement core/engine/ (Lexer + AST Parser + Safe Tree-Walk Tracer + Syntax Gates)
  ├── Implement core/assertions.js (stdout, vars, call sequences, AST mustUse)
  ├── Implement core/storage.js (StorageAdapter + LocalStorageAdapter + session namespacing)
  └── Implement scripts/verify-all.mjs + GitHub Actions CI workflow

MILESTONE 3: Unified Shell UX & Legacy Branch Consolidation
  ├── Add Curriculum Hub drawer + Teacher Focus URL router (?module=<id>&lock=1)
  ├── Add Dynamic Syntax Toolbar (toolbarKeys), Console drawer & Auto-Play (1x/2x)
  ├── Port l1_pyprint, l8_comparison_ops, l12_for_loop onto unified main
  └── Tag v1.0.0 Unified Platform Baseline

MILESTONE 4: 20-Lesson Curriculum Buildout & Classroom Pilot
  ├── Create core/scene-kit.js reusable stage components
  ├── Author remaining 17 modules in 4 Unit batches (l2..l7, l9..l11, l13..l15, l16..l20)
  ├── Add Printable/PDF Learning Report Card & Teacher Guide documentation
  └── Tag v2.0.0 Complete 20-Lesson School Edition on Netlify

MILESTONE 5: Phase 2 Own-Server Classroom Platform (Future)
  ├── Dockerized backend service (FastAPI / Node) + PostgreSQL database
  ├── Swap LocalStorageAdapter -> ApiStorageAdapter (class join codes, live teacher grid)
  └── Optional Tier-2 Pyodide WebWorker sandbox for post-Lesson-20 free Python coding
```

---

## 12. Teacher Usage Model

### Classroom Workflow (45-Minute Period)
1. **Before Class (Prep — 2 mins):**
   - Teacher visits the hosted Python Playground URL, clicks **👩‍🏫 Teacher Mode**, enters the school Teacher Passcode (configurable in `config.js`), selects today's lesson from the Curriculum Hub, reads **2. Show Teaching Notes**, and clicks **🔗 Copy Locked Lesson Link** (`?module=l10_if&lock=1`).
2. **Concept Launch (Projector — 10 mins):**
   - Teacher projects the lesson on the classroom board, expands **🧠 Learn First: 6-Step Python Thinking Guide**, clicks through the **🔑 Python Words** pills with the class, and clicks **3. Demonstrate Step Execution** on Exercise 1 so students watch line-by-line evaluation before touching keyboards.
3. **Active Lab Coding (Student Devices — 28 mins):**
   - Students open the locked classroom link, type their name/seat into the header **Student Session Pill** (isolating their `localStorage` record on shared school PCs), and progress through Exercises 1–5.
   - Students use **Auto-Play (`1x`/`2x`)** or **Next step ▶** to debug mismatches visually and consult **Hints 1–3** independently before raising hands.
   - Early finishers unlock the `🎮` **Sandbox Level** for creative exploration within the same lesson theme.
4. **Wrap-Up & Assessment (5 mins):**
   - Students open **📋 Learning Record** and either show their earned Badges screen as an exit ticket or click **🖨️ Print / Save PDF Report** to upload to Google Classroom / LMS.
   - On shared lab computers, students click **Switch / End Session** when the bell rings.

---

## 13. Human Maintenance Model

### 13.1 Role Separation Matrix

| Persona | Responsibilities | Allowed File Touchpoints | Required Technical Depth |
| :--- | :--- | :--- | :--- |
| **Classroom Teachers** | Deliver lessons, customize school PIN (`config.js`), report student pain points via GitHub Issues. | `config.js` (optional self-hosted config) | Zero programming maintenance required. |
| **Curriculum Creators** | Author/refine lesson stories, 6-step guides, hints, vocab, and test cases. | `modules/<id>/data.js`, `modules/<id>/module.json` | Basic JSON/JS object literals + Python basics. Validated by `node scripts/verify-all.mjs`. |
| **Scene / UI Contributors** | Build custom themed visuals (`scene.js` / `scene.css`) or enhance `scene-kit.js`. | `modules/<id>/scene.js`, `modules/<id>/scene.css` | Standard HTML/CSS/SVG + 4-function vanilla JS lifecycle. |
| **Core Maintainers** | Maintain Engine v2, UI shell, accessibility, CI scripts, and release tags. | `core/**`, `css/**`, `scripts/**`, `index.html` | Vanilla ES2020+, recursive-descent ASTs, DOM APIs. |

### 13.2 Documentation Structure (`docs/`)
```text
docs/
├── architecture/
│   ├── Repository_Discovery_Report_v1.0.md      # Frozen baseline audit
│   └── Python_Playground_Master_Blueprint_v1.0.md # Authoritative system blueprint (this file)
├── guides/
│   ├── TEACHER_GUIDE.md                         # Classroom setup, PIN config, Focus URLs, printing
│   ├── CURRICULUM_AUTHORING_GUIDE.md            # Step-by-step non-developer guide to data.js/module.json
│   └── SCENE_DEVELOPER_GUIDE.md                 # scene.js v2 lifecycle, CSS scoping & scene-kit reference
```

### 13.3 Versioning & Testing Requirements
- **Semantic Versioning (`vMAJOR.MINOR.PATCH`):** Schools require stability mid-semester. Tag releases (`v1.0.0`, `v1.1.0`, `v2.0.0`) so school deployments can pin to a verified tag while `main` continues advancing.
- **Zero-Dependency Verification Suite:** Rely exclusively on Node 20's built-in `node:test` and `node:assert` modules (`node --test` and `node scripts/verify-all.mjs`) so contributors never face broken `npm install` chains years later.

---

## 14. Open Source Contribution Model

### 14.1 Repository Governance Files (To Add During Implementation)
- `CONTRIBUTING.md` — Fork/branch workflow, lesson PR checklist, local `npx serve .` and `node scripts/verify-all.mjs` instructions.
- `CODE_OF_CONDUCT.md` — Contributor Covenant v2.1 (essential for an education/youth-focused open-source project).
- `.github/CODEOWNERS` — Requires Core Maintainer review on any PR touching `core/`, `css/`, `index.html`, `netlify.toml`, or `.github/`.
- `.github/workflows/verify.yml` — Runs `node --test` and `node scripts/verify-all.mjs` automatically on every Pull Request.

### 14.2 Safe Contributor Workflow
1. Branch from `main`: `git checkout -b feat/lesson-l05-data-types` (or `fix/core-...`).
2. Copy `modules/_template/` to `modules/l5_data_types/` (using the exact canonical ID).
3. Author `module.json`, `data.js`, `scene.js`, and scoped `scene.css`; register `"l5_data_types"` in `modules.json`.
4. Run `node scripts/verify-all.mjs` locally — must report **0 schema errors, 100% solution passes, 100% starterCode anti-cheat passes**.
5. Open a Pull Request targeting `main` (Netlify automatically generates an isolated PR Deploy Preview URL for visual review!).
6. Merge via Squash & Merge after automated CI and human pedagogical review pass.

---

## 15. Deployment Evolution Strategy

### 15.1 Feature Classification: Build Now vs. Build Later vs. Avoid Currently

| Capability / Feature | Classification | Target Phase | Strategic Justification |
| :--- | :---: | :---: | :--- |
| **Unified Single-Site Static Hosting (Netlify)** | **BUILD NOW** | Phase 1 | Replaces 20 fragmented branch sites with 1 zero-cost site + unified origin storage. |
| **Engine v2 (Safe AST + 20-Lesson Subset + Syntax Gates)** | **BUILD NOW** | Phase 1 | Eliminates `new Function()` security hazard and per-branch engine drift permanently. |
| **Multi-Modal Assertions & CLI Verifier (`verify-all.mjs`)** | **BUILD NOW** | Phase 1 | Essential quality & anti-hardcoding gate for scaling to 20 lessons (~120 exercises). |
| **Teacher Mode Bugfix + Focus Lock URLs (`?lock=1`)** | **BUILD NOW** | Phase 1 | Restores broken Teacher Mode and enables distraction-free classroom links today. |
| **Student Session Switcher + Printable Report Card** | **BUILD NOW** | Phase 1 | Solves shared lab PCs and classroom grading without requiring accounts or databases. |
| **`StorageAdapter` Interface (`core/storage.js`)** | **BUILD NOW** | Phase 1 | Low-cost (~50 LOC) seam guaranteeing zero-rewrite migration to Phase 2 backend. |
| **Own Server Deployment (Docker + Static/API Host)** | **BUILD LATER** | Phase 2 | Straightforward once Phase 1 static bundle is school-piloted and stable. |
| **Backend Services & PostgreSQL Database** | **BUILD LATER** | Phase 2 | Needed only when persistent cross-device student records and class dashboards launch. |
| **Authentication (Teacher Accounts + 6-Char Class Codes)** | **BUILD LATER** | Phase 2 | Prefer pseudonymous Class Join Codes + Seat PINs for students to minimize privacy/PII burden. |
| **Teacher Cohort Dashboard & Progress Analytics** | **BUILD LATER** | Phase 2 | High classroom value once `ApiStorageAdapter` streams live exercise completions and hint counts. |
| **Pyodide (WASM Python 3) Free-Coding Tier** | **BUILD LATER** | Phase 3 | Valuable as an optional "Upper Secondary Studio" tab; too heavy (12 MB) for beginner Lessons 1–20. |
| **Live Cloud LLM / AI Chatbot Tutor for Students** | **AVOID CURRENTLY** | Avoid | Breaks offline operation, incurs ongoing API cost, introduces child-safety/prompt-injection risk, and short-circuits student problem-solving. |
| **Custom Web CMS / WYSIWYG Lesson Editor** | **AVOID CURRENTLY** | Avoid | High engineering upkeep; Git-backed `data.js` + CLI schema validation is simpler, versioned, and AI-friendly. |
| **Frontend Framework Migration (React / Vue / Vite)** | **AVOID CURRENTLY** | Avoid | Adds build complexity and dependency churn without improving student learning or runtime speed. |

### 15.2 Seamless Phase 1 → Phase 2 Migration Path
- **Phase 1 (Netlify Static):** Browser loads static bundle from Netlify CDN; Engine v2 executes Python safely on client CPU; `LocalStorageAdapter` persists progress locally; `netlify.toml` enforces strict CSP (`script-src 'self'; object-src 'none'`).
- **Phase 2 (Own Server):** Package the exact same static frontend behind Nginx/FastAPI (or Node) with PostgreSQL. Switch `config.js` `storageDriver: "api"`. Because Python code still executes inside Engine v2 in the student's browser, **the school server never executes untrusted student Python code**, keeping server RAM/CPU minimal and security rock-solid.

---

## 16. AI Handoff Guide (Operational Reference for Flash 3.8)

> **MANDATORY OPERATIONAL BRIEFING FOR FLASH 3.8 & FUTURE AI AGENTS:**
> This section contains everything required to execute tasks in this repository without prior conversation history. Read every table below before running any tool or modifying any file.

### 16.1 Project Context Snapshot

| Field | Authoritative Value |
| :--- | :--- |
| **Repository URL** | `https://github.com/eujinn/python_learning` |
| **Local Workspace Root** | `D:\000. GITHUB\Python Playground_Main_Template\` (contains private folders `blueprint\`, `reviews\`, `prompts\`, `research\`, `notes\` outside Git) |
| **Git Repository Root** | `D:\000. GITHUB\Python Playground_Main_Template\repo\` (all Git operations run here) |
| **Current Active Branch** | `feature/python-playground-architecture-review` |
| **Baseline Discovery Doc** | `docs/architecture/Repository_Discovery_Report_v1.0.md` |
| **Master Blueprint Doc** | `docs/architecture/Python_Playground_Master_Blueprint_v1.0.md` (this document) |
| **Current Phase** | **Architecture Review Completed — Awaiting Human Sign-Off to Begin Implementation** |
| **Target Architecture** | Single Unified Core (`core/`) + Engine v2 (Safe AST, no `new Function`) + 20 Self-Contained Lesson Plugins (`modules/l1_*` … `modules/l20_*`) on `main` + URL Focus Mode (`?module=<id>&lock=1`) |

### 16.2 Architecture Decision Records (ADRs)

| ADR ID | Decision | Status | Operational Rule for AI Agents |
| :--- | :--- | :---: | :--- |
| **ADR-01** | **Unified Trunk Plugin Model** (retiring per-branch `core/` forks documented in legacy `AGENTS.md`) | Pending Human Sign-Off | Once approved, build all modules to run against the single unified `core/` on `main`. Never fork `core/` per lesson. |
| **ADR-02** | **Pure-JS Pedagogical Python Subset Engine v2** | Pending Human Sign-Off | Implement Lexer + Recursive-Descent AST + Tree-Walk Evaluator in `core/engine/`. **Never** use `eval()` or `new Function()`. Enforce `MAX_TRACE_STEPS = 500`. |
| **ADR-03** | **20-Lesson Canonical IDs (`l1`–`l20`)** | Pending Human Sign-Off | Keep `l1_pyprint` … `l19_ai_challenge` IDs from `AGENTS.md` exact and immutable; use `l20_functions_capstone` for Lesson 20. |
| **ADR-04** | **`StorageAdapter` Seam (`core/storage.js`)** | Pending Human Sign-Off | Route all progress/session persistence through `core/storage.js`; never call `localStorage` directly from `ui-shell.js` or modules. |
| **ADR-05** | **Universal `scene.js` v2 Signature** | Pending Human Sign-Off | All modules use `init(container, ctx)`, `render(env, meta)`, `reset()`, and `async play(cmd, args, ctx)`. |

### 16.3 Authoritative Files & Human Approval Matrix

| Path (Repo-Relative) | Role | AI Modification Rule |
| :--- | :--- | :--- |
| `docs/architecture/Repository_Discovery_Report_v1.0.md` | Frozen baseline discovery record | **PROHIBITED** — Do not alter historical baseline. |
| `docs/architecture/Python_Playground_Master_Blueprint_v1.0.md` | Authoritative Master Blueprint | Modify **only** when explicitly instructed by human maintainer to bump version (`v1.1+`). |
| `AGENTS.md` | Contributor & agent quick-reference | Currently reflects legacy v0 per-branch model. Update **only** in Priority Step 5 after human approves ADR-01..05. |
| `core/**`, `css/**`, `index.html`, `scripts/**` | Shared platform runtime, styles & verifier | **ALLOWED ONLY** during explicitly assigned Core Implementation Tasks (P0–P1 below). **PROHIBITED** during Lesson Authoring Tasks! |
| `modules/_template/**` | Starter module scaffold | Update once during Core Schema v2 upgrade; read-only reference during lesson authoring. |
| `modules/l<NN>_<slug>/**` & `modules.json` | Individual curriculum lesson plugins & manifest | **ALLOWED** during assigned Lesson Authoring Tasks (must pass `node scripts/verify-all.mjs`). |

### 16.4 Allowed vs. Prohibited AI Actions Checklist

#### Allowed Actions (When Instructed by Human)
- [x] Read any file in `repo/` and inspect Git history/diffs read-only.
- [x] Implement scoped, approved Priority Work Packages one step at a time.
- [x] Run `node --check`, `node --test`, and `node scripts/verify-all.mjs` inside `repo/`.
- [x] Author self-contained curriculum modules under `modules/<canonical_id>/` using Argon CSS tokens (`var(--bg-card)`, `var(--primary)`, etc.) and scoped CSS selectors (`.l<NN>-scene ...`).

#### Strictly Prohibited Actions (Never Perform)
- [ ] **NEVER** copy private workspace folders (`blueprint\`, `reviews\`, `prompts\`, `research\`, `notes\`) into `repo\`.
- [ ] **NEVER** use `new Function()`, `eval()`, `setTimeout("string")`, or unescaped `.innerHTML` on untrusted or lesson text strings (which breaks `<` / `>` rendering).
- [ ] **NEVER** add `npm` runtime dependencies, bundlers (Vite/Webpack), React/Tailwind, dark-mode CSS (`prefers-color-scheme`), or external CDN links (Google Fonts, unpkg, etc.).
- [ ] **NEVER** modify `core/` or `index.html` to hack in a single lesson's feature—extend via `module.json` (`allowedSyntax`, `commands`, `toolbarKeys`, `showConsole`).
- [ ] **NEVER** run `git commit`, `git merge`, `git branch -D`, or `git push` without explicit per-step human confirmation.

### 16.5 Standard Execution Workflow for Flash 3.8

```text
Step 1: Verify State   -> Check `git branch --show-current` and `git status`.
Step 2: Check Scope    -> Confirm target files match the active Priority Work Package below.
Step 3: Execute Edits  -> Apply minimal, clean, well-commented ES module / CSS / lesson changes.
Step 4: Run Verifiers  -> Execute `node --check` + `node --test` + `node scripts/verify-all.mjs`.
Step 5: Report Results -> Report modified files, test results vs. Acceptance Criteria, and `git status`.
Step 6: Wait Gate      -> STOP and wait for human review before committing or advancing.
```

---

## 17. Implementation Priorities (Actionable Work Packages & Acceptance Criteria)

Once human approval is granted, execute the following dependency-ordered priorities:

| Priority ID | Work Package | Affected Files | Dependencies | Explicit Acceptance Criteria |
| :--- | :--- | :--- | :---: | :--- |
| **PRI-01 (P0)** | **Core Bugfixes, DOM Safety & Gutter Sync** | `core/dom.js` (new), `core/teacher.js`, `core/progress.js`, `core/ui-shell.js`, `core/editor.js`, `css/editor.css`, `index.html`, `assets/fonts/*` | Blueprint Approval | 1. `teacher.js` uses `state.LESSONS`; all 5 Teacher Mode buttons work without console errors.<br>2. Zero raw `.innerHTML` with unescaped lesson strings; `<` and `>` render intact in notes/mistakes.<br>3. Legacy `"go"` auto-injection removed from `ui-shell.js`.<br>4. `#code` uses `white-space: pre` and syncs `scrollTop` with `.editor-gutter`. |
| **PRI-02 (P0)** | **Pedagogical Python Engine v2 (`core/engine/`)** | `core/engine/lexer.js`, `core/engine/parser.js`, `core/engine/evaluator.js`, `core/engine.js`, `tests/engine.test.mjs` | PRI-01 | 1. Zero `new Function` or `eval` in repository.<br>2. Supports full 20-lesson subset (`print`, vars, `int`/`float`/`str`/`type`, arithmetic, chained comparisons, `if/elif/else`, `for` range/list, `while`, `input`, `time.sleep`, `def`/`return`).<br>3. Enforces `allowedSyntax` gates and `MAX_TRACE_STEPS = 500`.<br>4. ≥50 unit tests pass via `node --test`. |
| **PRI-03 (P0)** | **Assertions v2 & Automated Verifier (`verify-all.mjs`)** | `core/assertions.js`, `core/lessons.js`, `scripts/verify-all.mjs`, `.github/workflows/verify.yml` | PRI-02 | 1. Supports `want` (v1) + `expect` (`stdout`, `vars`, `calls`, `returnVal`) + `constraints` (`mustUse`, `forbidLiterals`).<br>2. `node scripts/verify-all.mjs` checks schema completeness, verifies every `solution` passes 100%, and verifies non-observe `starterCode` fails at least 1 check. |
| **PRI-04 (P1)** | **Unified Classroom Shell UX & `StorageAdapter`** | `core/storage.js`, `core/router.js`, `core/ui-shell.js`, `core/progress.js`, `config.js`, `index.html`, `css/stage.css`, `css/modals.css` | PRI-03 | 1. All persistence routed via `StorageAdapter` with Student Session Name switcher.<br>2. `?module=<id>&lock=1` hides Curriculum Hub switcher; Teacher Mode offers 1-click Copy Locked Link.<br>3. Dynamic `toolbarKeys`, optional `showConsole` output strip, `Auto-Play (1x/2x)` runner, and `@media print` Learning Report Card work cleanly. |
| **PRI-05 (P1)** | **Port Existing Modules (`l1`, `l8`, `l12`) & Update Governance Docs** | `modules/l1_pyprint/*`, `modules/l8_comparison_ops/*`, `modules/l12_for_loop/*`, `modules.json`, `AGENTS.md`, `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `docs/guides/*` | PRI-04 | 1. `l1`, `l8`, and `l12` run side-by-side in unified shell using `scene.js` v2 (`play(cmd, args, ctx)`).<br>2. `l1` Ex 2 rejects unmodified `"____"`; `l12` loop exercises enforce `mustUse: ["for"]`.<br>3. `AGENTS.md` updated to authoritative Unified Plugin v2 contract; `verify-all.mjs` exits `0`. |
| **PRI-06 (P2)** | **Scene-Kit & Remaining 17 Curriculum Lessons (4 Unit Batches)** | `core/scene-kit.js`, `modules/l2_*` … `modules/l20_functions_capstone/*`, `modules.json` | PRI-05 | 1. Reusable `scene-kit.js` provides Console, MemoryBox, and Grid/Actor widgets.<br>2. Batches delivered cleanly: Batch A (`l2`–`l7`), Batch B (`l9`–`l11`), Batch C (`l13`–`l15`), Batch D (`l16`–`l20`).<br>3. All 20 lessons pass `node scripts/verify-all.mjs` and educator review. |

---

## 18. Risks and Mitigation

| Risk ID | Risk Description | Impact | Likelihood | Mitigation Strategy |
| :--- | :--- | :---: | :---: | :--- |
| **RSK-01** | Student writes `while True:` in Lesson 16 and freezes classroom browser tab. | High | Certain | Engine v2 tracer enforces `MAX_TRACE_STEPS = 500` and `MAX_OUTPUT_LINES = 100`, halting cleanly with a friendly `PyErr` loop-debugging hint. |
| **RSK-02** | JavaScript edge cases (`"2" + 2`, `[] == false`, `3 > 2 > 1`) teach wrong Python mental models. | High | Medium | Pure-JS tree-walk evaluator implements explicit Python type-checking rules (raising `TypeError`-equivalent `PyErr` on `"score: " + 5` so students learn `str(5)` or `print("score:", 5)`!). |
| **RSK-03** | AI-generated lessons drift visually, leak global CSS, or ship broken tests. | Medium | High | Scoped `.l<NN>-scene` CSS rule + shared `core/scene-kit.js` + mandatory `node scripts/verify-all.mjs` CI gate checking both `solution` pass and `starterCode` fail. |
| **RSK-04** | Shared school lab computers mix Student A and Student B progress records. | Medium | High | Header Student Session switcher namespaces `localStorage` keys (`plp_v2_<sessionId>_...`) + 1-click "New Student / Reset Session" button. |
| **RSK-05** | School network firewalls block external font/script CDNs or disallow `'unsafe-eval'`. | High | Medium | Zero external network requests; bundle local `.woff2` fonts; zero `eval`/`new Function` for strict CSP compatibility. |
| **RSK-06** | Scope creep delays shipping the 20-lesson classroom curriculum (e.g., building backend DB too early). | High | Medium | Strict Phase 1 freeze on backend/auth/LLM features; ship complete 20-lesson static Netlify release (`v2.0.0`) and validate in real classrooms before starting Phase 2 server work. |
