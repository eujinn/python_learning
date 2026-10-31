# Typing Guide Integration Proposal v1.0

| Metadata | Details |
| :--- | :--- |
| **Document ID** | `PP-TYPING-GUIDE-PROPOSAL-v1.0` |
| **Project** | Python Playground |
| **Source Repository** | `https://github.com/eujinn/python_learning` |
| **Target Architecture** | Engine v2 (commit `3e8def5`) |
| **Reference File** | `typing guide.html` (*Hero Kai & The Scrolls of Pythonia — Scroll 6*) |
| **Status** | Proposed Integration Design — Awaiting Review |
| **Date** | 2026-10-31 |

---

## 1. Engine v2 Integration Review

### 1.1 Current Architecture Analysis (Post Engine v2 Update)
The repository was recently updated to **Engine v2** (`3e8def5`), introducing a clean, modular runtime and addressing initial technical debt:
1. **Engine v2 Modularization (`core/engine/`):**
   - **`lexer.js`**: Replaced heuristic regex parsing with an indentation-aware, stateful Python tokenizer (tracking `INDENT`/`DEDENT` tokens, 4-space blocks, escaped string literals, numbers, comments `#`, and multi-character operators).
   - **`parser.js`**: Recursive-descent AST parser supporting 35 constructs (`print`, variables, arithmetic, comparisons, `if/elif/else`, `for` ranges/lists, `while`, `def/return`, `time.sleep`).
   - **`evaluator.js`**: Safe tree-walk step tracer enforcing `MAX_TRACE_STEPS = 500`, stdout collection, and `allowedSyntax` gating with **zero `eval` or `new Function()`**.
   - **`engine.js`**: Stable, backward-compatible integration adapter (`parse()`, `tr()`, `py()`, `PyErr`).
2. **Assertions v2 (`core/assertions.js`):**
   - Implemented multi-modal validation: `checkWant()` (legacy command calls), `checkExpect()` (`stdout`, environment `vars`, `return`), and `checkConstraints()` (`mustUse`, `forbid`, call counts).
3. **Editor Subsystem (`core/editor.js` & `css/editor.css`):**
   - Added `initEditorScrollSync()` to lock vertical scrolling between `.editor-gutter` and `textarea#code`.
   - Applied `white-space: pre` and `overflow-x: auto` to prevent soft line-wrap misalignments.
4. **Pedagogical & UI Fixes:**
   - Fixed the `state.lessons` property casing crash in `core/teacher.js`.
   - Replaced unescaped `.innerHTML` with safe text DOM injection for `<` / `>` compatibility.
   - Removed the legacy car-specific `"go"` auto-injection from `core/ui-shell.js`.

---

## 2. Typing Guide Feature Analysis (`typing guide.html`)

### 2.1 Feature Breakdown & User Experience Flow
`typing guide.html` (*Hero Kai & The Scrolls of Pythonia*) is a character-by-character interactive typing tutor designed to build tactile typing muscle memory for beginner programmers:

```text
[ Target Solution Code: L.solution ]
                │
                ▼
[ Character-by-Character Comparison ] <──── [ Student Keyboard / Touch Input ]
                │
        ┌───────┴───────┐
        ▼               ▼
   [ Match ✅ ]     [ Mistake ❌ ]
• Advance cursor     • Block / flag character
• Pleasant audio     • Audio alert + shake feedback
• Clear clue         • Contextual "Detective Clue" (quotes, colons, indent, etc.)
                │
                ▼
      [ Level 100% Typed ]
• Execution trigger / victory fanfare
• Unlock next lesson / badge
```

### 2.2 Key UI Components Identified
1. **Interactive Code Display (`#disp`):**
   - Renders each character of the target code as individual DOM spans with states:
     - `.p` = Pending (faint gray)
     - `.ok` = Correctly typed (green)
     - `.bad` = Typo / mismatch (red with highlight)
     - `.cur` = Active cursor location (pulsing gold focus)
     - `.nl` = Visual newline indicator (`↵`)
     - `.cm` = Comment styling (distinct italic green)
2. **Hidden / Synchronized Input Receiver (`#inp`):**
   - Listens to `input` events, disables paste (`e.preventDefault()`) with an alert *"Type It, Never Copy-Paste! True Wizards build muscle memory!"*.
3. **Contextual Rune Guide / Detective Clue Box (`#det`):**
   - Explains the specific key needed when an error occurs:
     - `#` $\rightarrow$ *"A whisper starts with a hashtag # - without it Python tries to RUN the line!"*
     - `\n` $\rightarrow$ *"New line - press [Enter ↵]."*
     - `"` $\rightarrow$ *"Strings wear quotation marks " " so Python knows they are words!"*
     - `(` or `)` $\rightarrow$ *"print() needs parentheses to hold its ingredients."*
     - Case mismatch $\rightarrow$ *"Uppercase vs lowercase: expected 'X' (hold Shift!)."*
4. **Gamification & Ergonomics:**
   - Real-time WPM & Accuracy calculator.
   - Web Audio synthesizer (`AudioContext`) generating low-latency sound cues without external MP3 assets.
   - Projector mode (`--code: 2rem`) for classroom visibility.

### 2.3 Dependencies & Architectural Fit
- **What to preserve:** The character-matching algorithm, the contextual syntax clue dictionary, the paste guard, and the lightweight WebAudio synth.
- **What must be adapted for Python Playground:**
  - `typing guide.html` ran a primitive hardcoded regex `l.match(/^print\("(.*)"\)$/)`. In Python Playground, the completed code must seamlessly feed into **Engine v2 AST parsing and multi-scenario visual trace execution**.
  - `typing guide.html` had its own dark theme and standalone layout; it must adapt to the **Argon light-arcade design system** (`--bg-card`, `--primary`, `--border-strong`).

---

## 3. Architecture Placement Proposal

### 3.1 Dual-Mode Editor Placement
The typing guide should not replace the code editor; instead, it should act as an **assisted input mode** for beginners and young learners:

```text
Left Card Panel (Editor Area)
┌─────────────────────────────────────────────────────────────┐
│ Mode Switcher Pill: [ 💻 Free Editor ] [ ⌨️ Guided Typing ]  │
├─────────────────────────────────────────────────────────────┤
│ (When "Guided Typing" Active):                              │
│  • Target Code Overlay with glowing active cursor           │
│  • Direct keystroke synchronization into #code              │
│  • Contextual Detective Clue banner on typo                 │
│  • Real-time Accuracy & WPM counters                        │
│  • Paste guard preventing copy-paste shortcuts              │
├─────────────────────────────────────────────────────────────┤
│ Quick-Insert Syntax Keys (Dynamic per module)               │
│ ▶ Run step by step (auto-enabled once 100% typed)           │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Key Integration Touchpoints with Engine v2 & Curriculum
1. **Source of Truth for Target Code:**
   - In Python Playground, each exercise in `data.js` defines a canonical `solution: "..."`.
   - When Guided Typing mode is active, the target text dynamically binds to `lesson.solution` (or `lesson.starterCode` for scaffolded exercises).
2. **Syntax-Aware Contextual Clues:**
   - In addition to punctuation clues (`"`, `:`, `(`, `#`), the clue engine connects directly to Engine v2 keywords and syntax gates:
     - `for` / `in` / `range` $\rightarrow$ Loop construct hints.
     - `==` $\rightarrow$ *"Use two equals == to check if things match."*
     - `4 spaces` $\rightarrow$ Indentation guidance.
3. **Classroom & Teacher Mode Integration:**
   - In `core/teacher.js`, teachers can toggle `"Enforce Guided Typing for Classroom"` (via URL parameter `?typing=1` or teacher toggle), ensuring young students type out syntax by hand rather than guessing.
4. **Backward Compatibility:**
   - Fully optional. If a student prefers typing freely without character-by-character guidance, they can switch between **Free Editor Mode** and **Guided Typing Mode** with one click.

---

## 4. Implementation Plan

### 4.1 Step-by-Step Implementation Sequence

```text
Step 1: Create core/typing-guide.js
  ├── Contextual clue dictionary (indentation, colons, quotes, operators, keywords)
  ├── Sound generator (pure WebAudio API with mute toggle)
  ├── Character-diff validator & stats tracker (accuracy, WPM)
  └── Export initTypingGuide(), renderTypingOverlay(), handleTypingInput(), setTargetCode()

Step 2: Create css/typing-guide.css
  ├── Argon-pro color tokens (--bg-card, --code-bg, --primary, --warning)
  ├── Character states (.ok, .bad, .cur, .nl, .comment)
  └── Clue callout box styling

Step 3: Wire into index.html & ui-shell.js
  ├── Add mode toggle: [ 💻 Free Edit ] [ ⌨️ Guided Typing ]
  ├── On load(lessonIndex): update target code from LESSONS[cur].solution
  ├── On typing complete: sync text directly to #code textarea and unlock ▶ Run
  └── Link typing-guide.css in index.html

Step 4: Verification & Edge Cases
  ├── Verify indentation/tab handling (4 spaces vs Tab key)
  ├── Verify multi-line code with blank lines and comments
  ├── Verify mobile/tablet soft keyboards
  └── Verify seamless transition between Guided Typing and standard Engine v2 step execution
```

---

## 5. File Modification Plan

| Action | File Path | Scope & Responsibility |
| :--- | :--- | :--- |
| **CREATE** | `core/typing-guide.js` | Pure ES module: character-matching engine, clue dictionary, audio feedback, and WPM/accuracy tracking. |
| **CREATE** | `css/typing-guide.css` | Scoped styling matching Argon Pro theme for ghost characters, cursor, and feedback banner. |
| **MODIFY** | `index.html` | Add mode toggle buttons and typing display container inside `.editor-shell`. |
| **MODIFY** | `core/ui-shell.js` | Wire typing guide into `load(i)`, synchronizing target solution and handling mode toggle. |
| **MODIFY** | `css/editor.css` | Support dual-mode display within `.editor-shell`. |
