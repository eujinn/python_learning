# Repository Discovery Report v1.0

| Metadata | Details |
| :--- | :--- |
| **Document ID** | `PP-DISCOVERY-v1.0` |
| **Project** | Python Playground |
| **Source Repository** | `https://github.com/eujinn/python_learning` |
| **Review Type** | Baseline Repository Discovery (Read-Only) |
| **Discovery Scope** | Full repository structure on `main`, runtime modules (`core/`), Argon design system (`css/`), starter module (`modules/_template/`), configuration files, and remote module branch topology (`origin/module/*`) |
| **Active Branch** | `feature/python-playground-architecture-review` |
| **Baseline Reviewers** | Flash 3.8 (Initial Discovery) & Argon 4 (Verification & Branch Topology Audit) |
| **Status** | Completed — Baseline Frozen |
| **Date** | 2026-10-30 |

---

## 1. Project Information & Discovery Scope

### 1.1 Project Identity
- **Name:** Python Playground
- **Purpose:** An offline-capable, static client-side educational platform teaching Python programming concepts through interactive, visual lessons.
- **Intended Users:**
  - Beginner Python learners (primary/secondary school students and self-learners).
  - Classroom teachers delivering guided coding instruction and live step-by-step demonstrations.
  - Curriculum authors and AI coding agents scaffolding new themed lessons.
- **Design Philosophy:** Split-screen interactive pedagogy (**Python code editor + thinking aids on the left**; **visual simulation stage + deterministic line-by-line execution trace on the right**) powered by zero-build browser ES modules.

### 1.2 Discovery Scope
This discovery baseline covers:
1. All tracked files on `main` (commit `885f13a`).
2. Shared core runtime (`core/*.js`), Argon-derived CSS design tokens (`css/*.css`), HTML shell (`index.html`), and module template (`modules/_template/*`).
3. Remote repository branch inventory (`origin/main`, `origin/module/l1_pyprint`, `origin/module/l8_comparison_ops`, `origin/module/l12_for_loop`, and legacy `origin/module/forloop`) to verify how lessons are currently authored and deployed in practice.

---

## 2. Repository Information & Structure

### 2.1 File & Directory Map (`main` Branch)

```text
python_learning/
├── .gitignore               # Standard ignores (node_modules, .DS_Store, etc.)
├── AGENTS.md                # Contributor & AI guide: branch rules, 19-lesson table, contracts
├── LICENSE                  # MIT License
├── README.md                # Project overview, local server command, module workflow
├── index.html               # Single-page application shell (header, left editor, right stage, modals)
├── modules.json             # Array manifest of active module IDs on the current branch (["_template"])
├── netlify.toml             # Netlify static publishing configuration (publish = ".", NODE_VERSION = "20")
│
├── core/                    # Shared application runtime & UI orchestration
│   ├── editor.js            # Line-number gutter renderer (renderGutter)
│   ├── engine.js            # Placeholder Python subset parser, evaluator (exec), and tracer (tr)
│   ├── hints.js             # Progressive 3-tier hint controller (Concept, Structure, Guided)
│   ├── lessons.js           # Lesson schema adapter (adaptLesson) and test want-matcher (matchesWant)
│   ├── progress.js          # Per-module localStorage persistence, badges, Learning Record modal
│   ├── teacher.js           # Pure-JS SHA-256 passcode verification & 5 classroom teaching actions
│   ├── ui-shell.js          # Central controller: module loader, step-through runner, event bindings
│   └── vocabulary.js        # "Learn First" 6-step thinking guide & interactive vocabulary pills
│
├── css/                     # Shared Argon-derived light arcade design system
│   ├── base.css             # CSS custom properties (tokens), reset, typography, .btn-3d buttons
│   ├── editor.css           # Mission header, collapsible Learn First drawer, vocab, gutter, toolbar
│   ├── layout.css           # Top header, module picker, progress pill, level tabs, 2-column grid
│   ├── modals.css           # Modal dialogs, Learning Record list, badge chips, Teacher Mode drawer
│   └── stage.css            # Simulation stage shell, speech #bubble, #view trace board, #stepbar, #res
│
└── modules/                 # Curriculum lesson modules
    └── _template/           # Canonical minimal module example
        ├── data.js          # Exports LESSONS array (story, learnFirst, hints, starterCode, tests)
        ├── module.json      # Module metadata, allowed commands, labels, badges, CSS path
        ├── scene.css        # Module-scoped visual stage styling
        └── scene.js         # Visual lifecycle callbacks: init, render, reset, play
```

### 2.2 Remote Branch Topology Observed
Inspecting remote refs on `origin` reveals the active per-branch deployment pattern:
- `origin/main` — Scaffolding shell, placeholder `core/engine.js`, and `modules/_template`.
- `origin/module/l1_pyprint` — Lesson 1: *Print — Echo Parrot* (6 exercises + custom `print()` multi-argument engine modifications).
- `origin/module/l8_comparison_ops` — Lesson 8: *Traffic Light Autonomous Car* (16 exercises teaching comparisons and conditionals, renamed from `module/traffic-light`).
- `origin/module/l12_for_loop` — Lesson 12: *For Loop — Ice-Cream Machine* (exercises + `for ... in range()` engine and sequence assertion modifications).
- `origin/module/forloop` — Legacy *For-Loop Outpost Mecha* module (pre-curriculum naming convention).

---

## 3. Technology Stack

| Layer | Technology / Mechanism | Notes |
| :--- | :--- | :--- |
| **Language & Modules** | Vanilla JavaScript (ES2020+ ES Modules) | Native browser `<script type="module">` and dynamic `import()`; zero bundler or build step. |
| **Python Execution** | Custom in-browser AST parser & step tracer (`core/engine.js`) | Compiles conditions via `new Function()` on `main`; unrolls execution into step events (`ev`). |
| **Markup & Styling** | Semantic HTML5 + Vanilla CSS3 Custom Properties | Derived from Argon "Pro Edition" light arcade style; tactile `.btn-3d` controls; responsive below `920px`. |
| **Typography** | `Fredoka` (UI) & `JetBrains Mono` (code/trace) | Declared in CSS font stacks with system fallbacks (`Trebuchet MS`, `monospace`). |
| **State & Persistence** | Browser `localStorage` | Keyed per module as `plp_<moduleId>_record` storing completed lesson indices, badges, and timestamp. |
| **Teacher Auth** | Pure-JS SHA-256 (`sha256Hex` in `core/teacher.js`) | Works 100% offline without WebCrypto HTTPS context requirements. |
| **Local Development** | Static HTTP server (`npx serve .` or `python -m http.server`) | Required for ES module `fetch()` / `import()`; `file://` is blocked by browser CORS policy. |
| **Hosting & Deployment** | Netlify (`netlify.toml`, `publish = "."`) | Currently configured as separate Netlify sites/deploys per `module/*` branch. |

---

## 4. Architecture Findings

### 4.1 Runtime Data & Execution Flow

```text
[index.html]
     │
     ▼
[core/ui-shell.js] ──(fetch modules.json)──► [modules/<id>/module.json]
     │                                       [modules/<id>/data.js (LESSONS)]
     │                                       [modules/<id>/scene.js (init/render/reset/play)]
     │
     ├──► 1. Parse Code:    core/engine.js :: parse(code, L.names, commands)
     ├──► 2. Trace Tests:   core/engine.js :: tr(ast, env, ev) -> deterministic event array
     ├──► 3. Check Result:  core/lessons.js :: matchesWant(sc.want, calls)
     ├──► 4. Step Playback: core/ui-shell.js :: step() -> highlights line + awaits scene.play()
     └──► 5. Save Mastery:  core/progress.js :: saveProgress() -> localStorage
```

### 4.2 Educational Architecture
1. **19-Lesson Curriculum Table (`AGENTS.md`):** Defines canonical branch IDs from `l1_pyprint` through `l19_ai_challenge`.
2. **Learn First (6-Step Guide):** Collapsible drawer guiding students through *Problem → Known Info → Python Question → Why Path → Action → Learned*.
3. **Interactive Vocabulary Pills:** Contextual clickable terms (`core/vocabulary.js`) explaining Python keywords and concepts on demand.
4. **Progressive 3-Tier Hints (`core/hints.js`):** Cycles through *Hint 1 (Concept Clue)* → *Hint 2 (Structure Guide)* → *Hint 3 (Guided Correction + Common Mistakes)*.
5. **Multi-Scenario Verification:** Evaluates student code across multiple `tests` environments to discourage hardcoded single-case answers, ending with an optional `free: true` sandbox tab (`🎮`).
6. **Teacher Mode (`core/teacher.js`):** Passcode-unlocked classroom drawer providing canonical solution reveal, teaching notes, live step demo, expected test table, and student view reset.

---

## 5. Strengths Observed

1. **Zero Build / Zero Dependency Simplicity:** No `package.json` dependency tree to rot; instant startup and trivial static hosting.
2. **Strong Pedagogical Scaffolding:** Unlike raw REPL playgrounds, the UI explicitly supports beginner cognitive load with syntax toolbar buttons, step-by-step plain-English trace narration, and structured problem decomposition.
3. **Clear Declarative Module Folder Layout:** Separating `module.json` (metadata), `data.js` (curriculum), and `scene.js`/`scene.css` (visuals) gives each lesson a clean conceptual home.
4. **Friendly Domain-Specific Error Messages:** `PyErr` catches common beginner mistakes (missing `:`, `=` instead of `==`, missing `()`, bad indentation) with line-numbered, encouraging hints.

---

## 6. Concerns & Limitations Observed

### 6.1 Architectural & Technical Concerns
1. **Active Core Divergence Across Module Branches:** By rule (`AGENTS.md`), each `module/*` branch modifies its own copy of `core/engine.js`. Diffing `origin/main`, `origin/module/l1_pyprint`, and `origin/module/l12_for_loop` shows that `core/engine.js`, `core/lessons.js`, `core/ui-shell.js`, and `index.html` have **already diverged into three incompatible `scene.play()` and `matchesWant()` contracts**.
2. **Runtime Bug in Teacher Mode (`core/teacher.js`):** `teacher.js` reads `state.lessons[state.cur]` (lowercase) in four functions, whereas `ui-shell.js` defines `st.LESSONS` (uppercase), causing a `TypeError` crash when unlocking or using Teacher Mode.
3. **`new Function()` Expression Evaluation (`core/engine.js`):** Compiling student expressions into JS via `new Function("e", ...)` breaks under strict CSP (no `'unsafe-eval'`), leaks JavaScript semantics instead of Python semantics (e.g., chained comparisons `3 > 2 > 1`, empty list truthiness), and introduces sandbox risks as language features expand.
4. **Legacy Traffic-Light Coupling in `core/ui-shell.js`:** `run()` injects an automatic `{ k: "call", f: "go", auto: true }` whenever student code makes zero command calls and applies a magic lesson-index check (`if (st.cur >= 3)`), polluting non-car modules.
5. **Unescaped `.innerHTML` Rendering (`core/teacher.js`, `core/progress.js`):** Pedagogical strings containing `<` or `>` (such as comparison operators in Lesson 8) are interpolated into `.innerHTML`, causing malformed HTML truncation and potential DOM injection.
6. **Editor Gutter Desynchronization:** `textarea#code` does not sync vertical scroll position or prevent soft line-wrapping against `.editor-gutter`, misaligning line numbers on longer programs.

### 6.2 Educational & Operational Limitations
1. **Limited Test Assertion Expressiveness:** `matchesWant()` on `main` only checks command names/counts (`"go"`, `"go*3"`, `"go+"`), making it unable to assert variable values/types (needed for Lessons 3–7 & 14), stdout text (allowing unmodified `print("____")` to pass in `l1_pyprint` Exercise 2), or required AST constructs (allowing copy-pasted calls to pass loop lessons without `for`/`while`).
2. **Fragmented Deployment & Student Records:** Deploying 20 lessons as 20 separate Netlify sites splits `localStorage` across 20 browser origins, preventing cumulative student progress tracking, shared computers session management, or unified school administration.
3. **Missing Governance & Automated CI Files:** Repository lacks `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, automated GitHub Actions verification, and a standalone CLI test script on `main`.

---

## 7. Investigation Questions Resolved in Master Blueprint

1. **Module & Branch Strategy:** How can we replace the 20-branch engine-forking model with a **Single Unified Core + Declarative Curriculum Plugins** while keeping distraction-free single-lesson links for teachers?
2. **Interpreter Evolution:** What exact Python subset and AST architecture is needed to support all 20 lessons safely (including `while` loop termination guards and `input()` testing) without `new Function()` or heavy WASM downloads?
3. **Curriculum & Assessment Completeness:** How should the 19-lesson table expand to a complete 20-lesson curriculum (including `def` functions / capstone) with anti-hardcoding assertions?
4. **Classroom & Human Sustainability:** How can teachers manage shared lab computers, print/collect student records, and maintain lessons long-term without touching core JS code?

*(See companion document `Python_Playground_Master_Blueprint_v1.0.md` in `docs/architecture/` for full architectural evaluation, decisions, standards, and implementation roadmap.)*
