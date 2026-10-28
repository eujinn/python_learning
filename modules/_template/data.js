export const LESSONS = [
  {
    id: 1,
    title: "Exercise 1: Run the Template",
    storyProblem: "This is a stub lesson showing the module API. Change stop() to go() on line 2 so the program advances in the Output panel.",
    concept: "Module API Contract",
    learnFirst: {
      problem: "Prove the scaffold boots: a lesson document, a scene, and a command call.",
      knownInfo: "go() and stop() are the commands this stub module declares.",
      pythonQuestion: "Which command is called last?",
      whyPath: "Python runs commands top to bottom.",
      action: "go() advances the counter shown in the Output panel.",
      learned: "A module is just lesson data (data.js) plus a scene renderer (scene.js)."
    },
    vocabulary: [
      { term: "scene.js", meaning: "Where this module paints its output panel and animates commands." },
      { term: "data.js", meaning: "Where this module keeps its lesson documents and tests." }
    ],
    hints: [
      "Concept Clue: Replace stop() with go() and keep the brackets.",
      "Structure Guide:\n___()",
      "Guided Correction: Change line 2 from stop() to go()."
    ],
    starterCode: "# Change stop() to go() below:\nstop()",
    solution: "go()",
    variables: ["mode"],
    base: { mode: "idle" },
    tests: [
      {
        environment: { mode: "ready" },
        want: "go",
        label: 'mode = "ready"'
      }
    ],
    teacherExplanation: "Template lesson: students learn that go() is the last command called and drives the scene forward.",
    commonMistakes: [
      "Typing go without brackets ()",
      "Leaving stop() instead of go()"
    ],
    studentReflection: "I can give a program a direct instruction using a command and brackets ()."
  }
];