/* =========================================================================
   20-EXERCISE TEMPLATE LESSON SET
   Tier layout (indices are 0-based in this array):
     0–3   recap      free-select warm-ups (always unlocked)
     4–9   basic      core idea of the lesson
     10–14 debug      broken starter code to repair
     15–17 challenge  independent intermediate tasks
     18–19 advanced   stretch tasks
   Exercises 5–20 are gated: passing exercise n unlocks n+1.
   ========================================================================= */

const CONCEPT = {
  recap: "Warm-Up Recap",
  basic: "Core Command Order",
  debug: "Debugging Command Order",
  challenge: "Intermediate Challenge",
  advanced: "Advanced Challenge"
};

const VOCAB = {
  recap: [
    { term: "go()", meaning: "Advances the program one step." },
    { term: "stop()", meaning: "Halts the program at the end." }
  ],
  basic: [
    { term: "top to bottom", meaning: "Python runs each command in order, one line after another." },
    { term: "command", meaning: "A named action such as go() or stop()." }
  ],
  debug: [
    { term: "bug", meaning: "A mistake that makes the program do the wrong thing." },
    { term: "trace", meaning: "The step-by-step record of what the program actually did." }
  ],
  challenge: [
    { term: "repeat", meaning: "Call the same command more than once." },
    { term: "sequence", meaning: "The order in which commands run." }
  ],
  advanced: [
    { term: "sequence", meaning: "A longer ordered chain of commands." },
    { term: "final command", meaning: "The last command the program runs." }
  ]
};

const HINTS = {
  recap: [
    "Concept Clue: This is a warm-up — you have seen go() and stop() before.",
    "Structure Guide:\n___()",
    "Guided Correction: Keep the brackets and match the command to the story."
  ],
  basic: [
    "Concept Clue: Read the story and decide which command must run last.",
    "Structure Guide:\ncommand()` per line, top to bottom",
    "Guided Correction: Put one command on each line and check the count."
  ],
  debug: [
    "Concept Clue: The starter code is wrong on purpose — find the line that does not match the story.",
    "Structure Guide:\n# broken: stop()\n# fixed:   go()",
    "Guided Correction: Replace the incorrect command with the one the story asks for."
  ],
  challenge: [
    "Concept Clue: Count how many times the command must run.",
    "Structure Guide:\ngo()\ngo()\n...",
    "Guided Correction: Add one call per repetition the story requires."
  ],
  advanced: [
    "Concept Clue: Build a longer sequence and keep every call in order.",
    "Structure Guide:\ngo()\n...\ngo()",
    "Guided Correction: Count the calls, then check the trace from the top."
  ]
};

function exercise(cfg) {
  return {
    id: cfg.id,
    tier: cfg.tier,
    title: "Exercise " + cfg.id + ": " + cfg.title,
    storyProblem: cfg.story,
    concept: CONCEPT[cfg.tier],
    learnFirst: {
      problem: cfg.story,
      knownInfo: "go() advances the program; stop() halts it.",
      pythonQuestion: "Which command should run last?",
      whyPath: "Python runs command calls from top to bottom.",
      action: "Write the calls in the order the trace should show.",
      learned: "Commands run top to bottom, so their order and count matter."
    },
    vocabulary: VOCAB[cfg.tier],
    hints: HINTS[cfg.tier],
    starterCode: cfg.starter !== undefined ? cfg.starter : "# " + cfg.title + "\ngo()",
    solution: cfg.solution,
    variables: ["mode"],
    base: { mode: "idle" },
    tests: [{ environment: { mode: "ready" }, want: cfg.want, label: 'mode = "ready"' }],
    teacherExplanation: cfg.teach,
    commonMistakes: cfg.mistakes || [
      "Forgetting the () after a command",
      "Running the commands in the wrong order"
    ],
    studentReflection: cfg.reflect || "I can order commands and predict which one runs last."
  };
}

export const LESSONS = [
  /* ---- Recap: free-select warm-ups (1–4) ------------------------------- */
  exercise({
    id: 1,
    tier: "recap",
    title: "Run the Template",
    story: "Change stop() to go() so the program advances in the Output panel.",
    starter: "# Change stop() to go() below:\nstop()",
    solution: "go()",
    want: "go",
    teach: "Recap of the module API: the final command call drives the scene.",
    reflect: "I can replace a command and keep the brackets ()."
  }),
  exercise({
    id: 2,
    tier: "recap",
    title: "Go, Then Stop",
    story: "Make the program advance once, then halt. The last command must be stop().",
    solution: "go()\nstop()",
    want: "stop",
    teach: "Recap of sequencing: the last call in the file is the last command run.",
    reflect: "I can put two commands in order."
  }),
  exercise({
    id: 3,
    tier: "recap",
    title: "Two Small Steps",
    story: "Call go() twice so the program takes two steps.",
    solution: "go()\ngo()",
    want: "go*2",
    teach: "Recap of repetition by writing a call twice.",
    reflect: "I can repeat a command by writing it again."
  }),
  exercise({
    id: 4,
    tier: "recap",
    title: "Back to One Step",
    story: "Reset your thinking: call go() exactly once.",
    solution: "go()",
    want: "go",
    teach: "Recap checkpoint before the gated exercises begin at Exercise 5.",
    reflect: "I am ready for the gated exercises."
  }),

  /* ---- Basic: core idea (5–10) ----------------------------------------- */
  exercise({
    id: 5,
    tier: "basic",
    title: "First Gated Command",
    story: "This is the first unlocked exercise in the chain. Call go() once.",
    solution: "go()",
    want: "go",
    teach: "Entry point of the sequential chain. Passing this unlocks Exercise 6.",
    reflect: "I can complete an exercise to unlock the next one."
  }),
  exercise({
    id: 6,
    tier: "basic",
    title: "Repeat Twice",
    story: "The program must advance twice. Call go() two times.",
    solution: "go()\ngo()",
    want: "go*2",
    teach: "Two calls produce two steps; the test counts go() calls.",
    reflect: "I can make a command run a set number of times."
  }),
  exercise({
    id: 7,
    tier: "basic",
    title: "Halt at the End",
    story: "Advance once, then finish with stop().",
    solution: "go()\nstop()",
    want: "stop",
    teach: "The final command is stop(), so want checks the last call.",
    reflect: "I can control how a program finishes."
  }),
  exercise({
    id: 8,
    tier: "basic",
    title: "Three Steps",
    story: "Make the program advance exactly three times.",
    solution: "go()\ngo()\ngo()",
    want: "go*3",
    teach: "Three go() calls satisfy want = go*3.",
    reflect: "I can match a required count."
  }),
  exercise({
    id: 9,
    tier: "basic",
    title: "Stop Right Away",
    story: "The program should halt immediately. Call stop() only.",
    solution: "stop()",
    want: "stop",
    teach: "Sometimes the correct program is a single halt command.",
    reflect: "I can choose the command the story needs."
  }),
  exercise({
    id: 10,
    tier: "basic",
    title: "Four in a Row",
    story: "Advance four times before the exercise is complete.",
    solution: "go()\ngo()\ngo()\ngo()",
    want: "go*4",
    teach: "Last basic exercise: four calls, then the debug tier unlocks.",
    reflect: "I can build a longer ordered sequence."
  }),

  /* ---- Debug: broken starters (11–15) ---------------------------------- */
  exercise({
    id: 11,
    tier: "debug",
    title: "Fix the Halt",
    story: "The starter stops too early. Change it so the program goes once.",
    starter: "# Bug: stop() runs too soon\nstop()",
    solution: "go()",
    want: "go",
    teach: "Debug tier: repair a wrong command while keeping the brackets.",
    reflect: "I can find and fix a wrong command."
  }),
  exercise({
    id: 12,
    tier: "debug",
    title: "Fix the Double",
    story: "The program should advance twice but the starter only advances once.",
    starter: "# Bug: only one step\ngo()",
    solution: "go()\ngo()",
    want: "go*2",
    teach: "Debug by adding the missing repeated call.",
    reflect: "I can add a missing command."
  }),
  exercise({
    id: 13,
    tier: "debug",
    title: "Fix the Order",
    story: "The starter halts before it moves. Put go() first, then stop().",
    starter: "# Bug: stop() before go()\nstop()\ngo()",
    solution: "go()\nstop()",
    want: "stop",
    teach: "Order matters: the final call must be stop() after go().",
    reflect: "I can reorder commands to match the story."
  }),
  exercise({
    id: 14,
    tier: "debug",
    title: "Fix the Triple",
    story: "The program needs three steps but the starter has two.",
    starter: "# Bug: only two steps\ngo()\ngo()",
    solution: "go()\ngo()\ngo()",
    want: "go*3",
    teach: "Debug by counting and adding the missing call.",
    reflect: "I can debug by counting calls."
  }),
  exercise({
    id: 15,
    tier: "debug",
    title: "Fix the Finish",
    story: "The starter advances but never finishes with stop().",
    starter: "# Bug: no stop()\ngo()",
    solution: "go()\nstop()",
    want: "stop",
    teach: "Debug the ending so the final command is stop().",
    reflect: "I can fix a missing final command."
  }),

  /* ---- Challenge: intermediate (16–18) --------------------------------- */
  exercise({
    id: 16,
    tier: "challenge",
    title: "Drive Five",
    story: "Advance exactly five times with no stop() call.",
    starter: "# Your turn: five steps\n",
    solution: "go()\ngo()\ngo()\ngo()\ngo()",
    want: "go*5",
    teach: "Challenge: build a five-step sequence from scratch.",
    reflect: "I can write a longer sequence without a scaffold."
  }),
  exercise({
    id: 17,
    tier: "challenge",
    title: "Go, Go, Stop",
    story: "Advance twice, then finish with stop().",
    starter: "# Your turn: two steps then stop\n",
    solution: "go()\ngo()\nstop()",
    want: "stop",
    teach: "Challenge: combine repetition with a final halt.",
    reflect: "I can combine several commands into one plan."
  }),
  exercise({
    id: 18,
    tier: "challenge",
    title: "Six in a Row",
    story: "Advance six times to finish the challenge tier.",
    starter: "# Your turn: six steps\n",
    solution: "go()\ngo()\ngo()\ngo()\ngo()\ngo()",
    want: "go*6",
    teach: "Last challenge: a longer count before the advanced tier.",
    reflect: "I can count and write six ordered calls."
  }),

  /* ---- Advanced: stretch (19–20) --------------------------------------- */
  exercise({
    id: 19,
    tier: "advanced",
    title: "Grand Parade",
    story: "Run a five-step parade, then halt the city celebration with stop().",
    starter: "# Advanced: parade then finish\n",
    solution: "go()\ngo()\ngo()\ngo()\ngo()\nstop()",
    want: "stop",
    teach: "Advanced: a longer sequence that ends on stop().",
    reflect: "I can build and finish a long sequence."
  }),
  exercise({
    id: 20,
    tier: "advanced",
    title: "City Finale",
    story: "Finish the module with eight steps in a row — the final command is go().",
    starter: "# Advanced finale: eight steps\n",
    solution: "go()\ngo()\ngo()\ngo()\ngo()\ngo()\ngo()\ngo()",
    want: "go*8",
    teach: "Final advanced exercise: the longest count in the module.",
    reflect: "I can complete the full 20-exercise backbone."
  })
];
