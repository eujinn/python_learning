/* For Loop — Ice Cream Machine (Lesson 12)
   Adapted from the Argon CodeCream customer Bear's ice-cream academy curriculum.
   Tests assert the exact ordered call sequence including arguments,
   e.g. want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(strawberry)"]. */

export const LESSONS = [
  {
    id: 1,
    title: "Exercise 1: Serve a Scoop",
    storyProblem: "Customer Bear wants one vanilla scoop. Type the command that serves it — remember the flavor goes inside the brackets, in quotes!",
    concept: "Calling a Command with an Argument",
    learnFirst: {
      problem: "The bowl is empty and Bear is hungry for one vanilla scoop.",
      knownInfo: "scoop(...) is a command, and it needs the flavor inside its brackets.",
      pythonQuestion: "No question needed — we just tell Python which command to run and what to put in it.",
      whyPath: "Python runs your line top to bottom and serves exactly what you name.",
      action: "scoop(\"vanilla\") drops one vanilla scoop into the bowl.",
      learned: "Text words like the flavor go inside quotes \"vanilla\" when passed to a command."
    },
    vocabulary: [
      { term: "scoop()", meaning: "A command that serves a scoop of ice cream into the bowl." },
      { term: "\"vanilla\"", meaning: "Quote marks tell Python this is a text word (a flavor), not a variable name." },
      { term: "Argument", meaning: "The value inside a command's brackets, like the flavor in scoop(\"vanilla\")." }
    ],
    hints: [
      "Concept Clue: scoop() needs the flavor inside its brackets, in quotes.",
      "Structure Guide:\nscoop(\"___\")",
      "Guided Correction: Write scoop(\"vanilla\") — flavor word between quotes inside the brackets."
    ],
    starterCode: '# Serve one vanilla scoop:\n',
    solution: 'scoop("vanilla")',
    variables: [],
    base: {},
    tests: [
      { environment: {}, want: ["scoop(vanilla)"], label: "one vanilla scoop" }
    ],
    teacherExplanation: "Introduce commands that take arguments. The value between the brackets is the argument, and strings must be wrapped in quotes.",
    commonMistakes: [
      "Writing scoop vanilla without brackets",
      "Forgetting the quotes around vanilla",
      "Writing scoop(\"vanilla\") with no closing quote"
    ],
    studentReflection: "I can call a command and pass it a text argument in quotes."
  },

  {
    id: 2,
    title: "Exercise 2: Repeat with for",
    storyProblem: "Bear wants 3 vanilla scoops. Don't type scoop 3 times — use a for loop to repeat the scoop line 3 times!",
    concept: "for loops",
    learnFirst: {
      problem: "We need the exact same scoop 3 times — repeating by typing is slow.",
      knownInfo: "for i in range(3): means 'repeat the indented line 3 times'.",
      pythonQuestion: "for i in range(3): — how many times does the indented line run?",
      whyPath: "range(3) makes the numbers 0, 1, 2, so the block below runs 3 times.",
      action: "scoop(\"vanilla\") is served on every loop round — 3 vanilla scoops total.",
      learned: "A for loop repeats a block of lines. range(3) means repeat 3 times!"
    },
    vocabulary: [
      { term: "for i in range(3):", meaning: "A loop header that repeats the indented block 3 times." },
      { term: "Indent", meaning: "Pushing a line in with Tab so Python knows it belongs inside the loop." }
    ],
    hints: [
      "Concept Clue: Write for i in range(3): on the first line, then Tab before scoop(\"vanilla\").",
      "Structure Guide:\nfor i in range(___):\n    scoop(\"vanilla\")",
      "Guided Correction: Start the line with for i in range(3):, press Enter, press Tab, then scoop(\"vanilla\")."
    ],
    starterCode: '# Repeat 3 times:\nscoop("vanilla")',
    solution: 'for i in range(3):\n    scoop("vanilla")',
    variables: [],
    base: {},
    tests: [
      { environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)"], label: "3 vanilla scoops" }
    ],
    teacherExplanation: "Show the loop as 'repeat N times'. Emphasize the colon and that only the indented line is repeated.",
    commonMistakes: [
      "Forgetting the colon after range(3):",
      "Not indenting scoop(\"vanilla\") with Tab",
      "Writing for 3: instead of for i in range(3):"
    ],
    studentReflection: "I can use a for loop to repeat a command exactly 3 times."
  },

  {
    id: 3,
    title: "Exercise 3: Loop, then One More",
    storyProblem: "Serve 3 vanilla scoops with a for loop, then ONE strawberry scoop on top. The strawberry line must NOT be indented — it runs once, after the loop.",
    concept: "Indentation ends a loop",
    learnFirst: {
      problem: "Two different jobs: a loop of 3 vanilla scoops, then a single strawberry scoop.",
      knownInfo: "Lines pushed in with Tab belong to the loop. A line at the left edge runs once after the loop.",
      pythonQuestion: "After the loop finishes, which line runs next?",
      whyPath: "The un-indented scoop(\"strawberry\") is outside the loop, so Python runs it exactly once.",
      action: "Loop serves 3 vanilla; then one strawberry lands on top.",
      learned: "Indentation decides what repeats inside a loop and what runs only once."
    },
    vocabulary: [
      { term: "Indentation", meaning: "Spaces at the start of a line. Push in = inside the loop; left edge = outside it." }
    ],
    hints: [
      "Concept Clue: Add scoop(\"strawberry\") on a new line at the bottom with NO spaces before it.",
      "Structure Guide:\nfor i in range(3):\n    scoop(\"vanilla\")\nscoop(\"___\")",
      "Guided Correction: After the loop's indented scoop(\"vanilla\"), press Enter back to the left edge and write scoop(\"strawberry\")."
    ],
    starterCode: 'for i in range(3):\n    scoop("vanilla")\n',
    solution: 'for i in range(3):\n    scoop("vanilla")\nscoop("strawberry")',
    variables: [],
    base: {},
    tests: [
      { environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)", "scoop(strawberry)"], label: "3 vanilla then 1 strawberry" }
    ],
    teacherExplanation: "This is the ordering test — a strawberry scoop must come after the 3 vanilla scoops, proving the loop finished before the last line ran.",
    commonMistakes: [
      "Indenting scoop(\"strawberry\") inside the loop (making 4 vanilla + 1 strawberry)",
      "Indenting it 4 spaces so it repeats",
      "Forgetting to keep scoop(\"vanilla\") indented"
    ],
    studentReflection: "I know indentation controls what repeats inside a loop and what runs once."
  },

  {
    id: 4,
    title: "Exercise 4: The Memory Box =",
    storyProblem: 'Save "mango" in a variable called flavor, then loop 2 times with scoop(flavor). Use the variable without quotes inside the brackets!',
    concept: "Variables in commands",
    learnFirst: {
      problem: "We use the same flavor twice, so we store it in a named memory box first.",
      knownInfo: 'flavor = "mango" saves the text "mango" inside a box named flavor.',
      pythonQuestion: "When we call scoop(flavor), what does Python read from the box?",
      whyPath: "flavor is a variable, so Python uses its value \"mango\" — no quotes needed around a variable name.",
      action: "The loop serves scoop(flavor) 2 times → 2 mango scoops.",
      learned: "A variable is a memory box: save with one =, then use the name without quotes anywhere a value fits."
    },
    vocabulary: [
      { term: "flavor = \"mango\"", meaning: "Saves the text \"mango\" inside the memory box named flavor." },
      { term: "Variable", meaning: "A named box that stores a value you can reuse in your code." }
    ],
    hints: [
      "Concept Clue: First save flavor = \"mango\", then loop 2 times calling scoop(flavor).",
      "Structure Guide:\nflavor = \"___\"\nfor i in range(2):\n    scoop(flavor)",
      "Guided Correction: Write flavor = \"mango\", then for i in range(2):, Tab, then scoop(flavor) — no quotes around flavor."
    ],
    starterCode: '# Save "mango" in flavor, then scoop it 2 times:\n',
    solution: 'flavor = "mango"\nfor i in range(2):\n    scoop(flavor)',
    variables: ["flavor"],
    base: {},
    tests: [
      { environment: {}, want: ["scoop(mango)", "scoop(mango)"], label: "2 mango scoops from the variable" }
    ],
    teacherExplanation: "The variable flavor is declared by the student's code (oven-added to known names). scoop(flavor) must resolve to mango — quotes around a variable name would be wrong.",
    commonMistakes: [
      'Writing scoop("flavor") — quotes make it the literal word "flavor" instead of the box\'s value',
      "Writing flavor = mango without quotes",
      "Not indenting scoop(flavor) inside the loop"
    ],
    studentReflection: "I can save a value in a variable and pass the variable to a command."
  },

  {
    id: 5,
    title: "Exercise 5: Count from the Customer",
    storyProblem: "Bear tells you n — how many scoops he wants. Loop range(n) times serving vanilla, so the script matches whatever order size n holds. Watch the test values change!",
    concept: "Variables in range()",
    learnFirst: {
      problem: "Each customer wants a different number of scoops, stored in the box n.",
      knownInfo: "n is a whole number, like 2, 4, or 1.",
      pythonQuestion: "for i in range(n): — how many times will it repeat?",
      whyPath: "range(n) reads the number inside the n box, so the loop matches the order size exactly.",
      action: "scoop(\"vanilla\") is served n times — every customer gets the right amount.",
      learned: "A variable can go anywhere a number can, including inside range()."
    },
    vocabulary: [
      { term: "range(n)", meaning: "A loop that repeats as many times as the number stored in n." }
    ],
    hints: [
      "Concept Clue: Use range(n) with no quotes around n so Python reads the number inside the box.",
      "Structure Guide:\nfor i in range(___):\n    scoop(\"vanilla\")",
      "Guided Correction: Change range(3) to range(n), keep scoop(\"vanilla\") indented, no quotes around n."
    ],
    starterCode: '# n = how many scoops?\nscoop("vanilla")',
    solution: 'for i in range(n):\n    scoop("vanilla")',
    variables: ["n"],
    base: {},
    tests: [
      { environment: { n: 2 }, want: ["scoop(vanilla)", "scoop(vanilla)"], label: "n = 2" },
      { environment: { n: 4 }, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)"], label: "n = 4" },
      { environment: { n: 1 }, want: ["scoop(vanilla)"], label: "n = 1" }
    ],
    teacherExplanation: "Each test sets a different n. The solution uses range(n) so the number of vanilla scoops always matches n exactly.",
    commonMistakes: [
      'Putting quotes around n — "n" is the letter, not the number',
      "Hard-coding range(3) so it can't match bigger orders",
      "Not indenting scoop(\"vanilla\") under the loop"
    ],
    studentReflection: "I can make a loop repeat a variable-controlled number of times using range(n)."
  }
];