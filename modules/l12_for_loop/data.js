/* For Loop — Ice Cream Machine (Lesson 12)
   20-exercise backbone:
     recap 1-4  → Lesson 11 if/else refresher
     basic 5-10 → commands with args, for loops, range(variable)
     debug 11-15→ repair loop syntax
     challenge 16-18 → independent loop tasks
     advanced 19-20 → comment-guided compositions

   Tests assert the exact ordered call sequence including arguments, e.g.
   want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(strawberry)"]. */

export const LESSONS = [
  /* ============================ RECAP (1–4) ============================ */
  {
    id: 1,
    tier: "recap",
    title: "Exercise 1: Recap — Choose the Flavor",
    storyProblem: "Welcome back! Lesson 11 was about if/else. Bear orders vanilla or chocolate — use if/else to serve the right flavor.",
    concept: "if / else recap",
    learnFirst: {
      problem: "Serve different flavors for different orders.",
      knownInfo: "if asks a question; else handles everything different.",
      pythonQuestion: "Is order == \"vanilla\"?",
      whyPath: "True runs the if branch, False runs the else branch.",
      action: "Write if order == \"vanilla\": scoop(\"vanilla\") else: scoop(\"chocolate\").",
      learned: "if/else picks one branch."
    },
    vocabulary: [
      { term: "if", meaning: "Runs a block when a question is True." },
      { term: "else", meaning: "Runs when the if question is False." }
    ],
    hints: [
      "Concept Clue: Check if order == \"vanilla\".",
      "Structure Guide:\nif order == \"vanilla\":\n    scoop(\"vanilla\")\nelse:\n    scoop(\"chocolate\")",
      "Guided Correction: Both branches serve a flavor; keep quotes and colons."
    ],
    starterCode: '# Serve vanilla or chocolate:\n',
    solution: 'if order == "vanilla":\n    scoop("vanilla")\nelse:\n    scoop("chocolate")',
    variables: ["order"],
    base: { order: "vanilla" },
    tests: [
      { environment: { order: "vanilla" }, want: ["scoop(vanilla)"], label: "order = vanilla" },
      { environment: { order: "chocolate" }, want: ["scoop(chocolate)"], label: "order = chocolate" }
    ],
    teacherExplanation: "Recap Lesson 11: one condition selects between two commands.",
    commonMistakes: ["Using one = instead of ==", "Forgetting the colon", "Not indenting the scoop"],
    studentReflection: "I can use if/else to choose a flavor."
  },
  {
    id: 2,
    tier: "recap",
    title: "Exercise 2: Recap — Mango or Vanilla",
    storyProblem: "Bear wants mango if he asks for it, otherwise vanilla. Use if/else with the order box.",
    concept: "if / else recap",
    learnFirst: {
      problem: "Serve mango only when ordered.",
      knownInfo: "else is the fallback.",
      pythonQuestion: "Is order == \"mango\"?",
      whyPath: "True serves mango; False serves vanilla.",
      action: "Write the two branches.",
      learned: "The else branch runs for every other value."
    },
    vocabulary: [{ term: "condition", meaning: "The True/False question after if." }],
    hints: [
      "Concept Clue: Check order == \"mango\".",
      "Structure Guide:\nif order == \"mango\":\n    scoop(\"mango\")\nelse:\n    scoop(\"vanilla\")",
      "Guided Correction: Keep the else branch for everything else."
    ],
    starterCode: '# Mango if ordered, otherwise vanilla:\n',
    solution: 'if order == "mango":\n    scoop("mango")\nelse:\n    scoop("vanilla")',
    variables: ["order"],
    base: { order: "mango" },
    tests: [
      { environment: { order: "mango" }, want: ["scoop(mango)"], label: "order = mango" },
      { environment: { order: "vanilla" }, want: ["scoop(vanilla)"], label: "order = vanilla" }
    ],
    teacherExplanation: "Reinforce the fallback nature of else.",
    commonMistakes: ["Using ==", "Swapping branches"],
    studentReflection: "I can write an if/else with a fallback flavor."
  },
  {
    id: 3,
    tier: "recap",
    title: "Exercise 3: Recap — Three Flavors",
    storyProblem: "Bear can order vanilla, chocolate, or strawberry. Use if/elif/else to serve the matching flavor.",
    concept: "elif recap",
    learnFirst: {
      problem: "Choose among three flavors.",
      knownInfo: "elif asks another question only if the first was False.",
      pythonQuestion: "Is order vanilla? Else is it chocolate?",
      whyPath: "Python checks top to bottom and runs the first True branch.",
      action: "Write if / elif / else with one scoop each.",
      learned: "elif adds more choices."
    },
    vocabulary: [{ term: "elif", meaning: "Another question after if." }],
    hints: [
      "Concept Clue: Check vanilla, then chocolate, then else strawberry.",
      "Structure Guide:\nif order == \"vanilla\":\n    scoop(\"vanilla\")\nelif order == \"chocolate\":\n    scoop(\"chocolate\")\nelse:\n    scoop(\"strawberry\")",
      "Guided Correction: Put elif before else."
    ],
    starterCode: '# Three flavors with if/elif/else:\n',
    solution: 'if order == "vanilla":\n    scoop("vanilla")\nelif order == "chocolate":\n    scoop("chocolate")\nelse:\n    scoop("strawberry")',
    variables: ["order"],
    base: { order: "vanilla" },
    tests: [
      { environment: { order: "vanilla" }, want: ["scoop(vanilla)"], label: "vanilla" },
      { environment: { order: "chocolate" }, want: ["scoop(chocolate)"], label: "chocolate" },
      { environment: { order: "strawberry" }, want: ["scoop(strawberry)"], label: "strawberry" }
    ],
    teacherExplanation: "Recap multi-way branching with elif.",
    commonMistakes: ["Writing 'else if'", "Putting else before elif"],
    studentReflection: "I can choose among three flavors."
  },
  {
    id: 4,
    tier: "recap",
    title: "Exercise 4: Recap — Print the Order",
    storyProblem: "Print the order so staff can hear it, then serve vanilla or chocolate with if/else.",
    concept: "print + if/else recap",
    learnFirst: {
      problem: "Announce the order, then serve it.",
      knownInfo: "print() shows text; if/else chooses a flavor.",
      pythonQuestion: "Which branch serves chocolate?",
      whyPath: "When order is not vanilla, else runs.",
      action: "Print order, then use if/else for the scoop.",
      learned: "You can combine print and decisions."
    },
    vocabulary: [{ term: "print()", meaning: "Shows a value on screen." }],
    hints: [
      "Concept Clue: print(order) first, then the if/else.",
      "Structure Guide:\nprint(order)\nif order == \"vanilla\":\n    scoop(\"vanilla\")\nelse:\n    scoop(\"chocolate\")",
      "Guided Correction: print(order) has no quotes around order."
    ],
    starterCode: '# Announce the order, then serve it:\n',
    solution: 'print(order)\nif order == "vanilla":\n    scoop("vanilla")\nelse:\n    scoop("chocolate")',
    variables: ["order"],
    base: { order: "vanilla" },
    tests: [
      { environment: { order: "vanilla" }, want: ["print(vanilla)", "scoop(vanilla)"], expect: { stdout: "vanilla" }, label: "vanilla" },
      { environment: { order: "chocolate" }, want: ["print(chocolate)", "scoop(chocolate)"], expect: { stdout: "chocolate" }, label: "chocolate" }
    ],
    teacherExplanation: "Combine output with a decision, recapping print and if/else.",
    commonMistakes: ["Quoting order in print", "Missing the else"],
    studentReflection: "I can print an order and serve it conditionally."
  },

  /* ============================ BASIC (5–10) =========================== */
  {
    id: 5,
    tier: "basic",
    title: "Exercise 5: Serve a Scoop",
    storyProblem: "Customer Bear wants one vanilla scoop. Type the command that serves it — remember the flavor goes inside the brackets, in quotes!",
    concept: "Calling a Command with an Argument",
    learnFirst: {
      problem: "The bowl is empty and Bear wants one vanilla scoop.",
      knownInfo: "scoop(...) needs the flavor inside its brackets.",
      pythonQuestion: "No question needed — tell Python which command and flavor.",
      whyPath: "Python runs your line top to bottom.",
      action: "scoop(\"vanilla\") drops one scoop into the bowl.",
      learned: "Text arguments go inside quotes."
    },
    vocabulary: [
      { term: "scoop()", meaning: "Serves a scoop into the bowl." },
      { term: "Argument", meaning: "The value inside the brackets." }
    ],
    hints: [
      "Concept Clue: scoop() needs the flavor inside its brackets, in quotes.",
      "Structure Guide:\nscoop(\"___\")",
      "Guided Correction: Write scoop(\"vanilla\")."
    ],
    starterCode: '# Serve one vanilla scoop:\n',
    solution: 'scoop("vanilla")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(vanilla)"], label: "one vanilla scoop" }],
    teacherExplanation: "Introduce commands with arguments; strings need quotes.",
    commonMistakes: ["Writing scoop vanilla", "Forgetting quotes"],
    studentReflection: "I can call a command with a text argument."
  },
  {
    id: 6,
    tier: "basic",
    title: "Exercise 6: Repeat with for",
    storyProblem: "Bear wants 3 vanilla scoops. Use a for loop with range(3) and keep scoop(\"vanilla\") indented underneath.",
    concept: "for + range",
    learnFirst: {
      problem: "Serve the same scoop three times.",
      knownInfo: "for i in range(3): repeats the indented lines 3 times.",
      pythonQuestion: "How many times does range(3) repeat?",
      whyPath: "The indented scoop runs once per number 0,1,2.",
      action: "Write for i in range(3): then indent scoop(\"vanilla\").",
      learned: "A for loop repeats its indented block."
    },
    vocabulary: [{ term: "range(3)", meaning: "Repeats the block 3 times." }],
    hints: [
      "Concept Clue: range(3) repeats three times.",
      "Structure Guide:\nfor i in range(3):\n    scoop(\"vanilla\")",
      "Guided Correction: Indent the scoop under the for line."
    ],
    starterCode: '# Serve 3 vanilla scoops with a loop:\nscoop("vanilla")',
    solution: 'for i in range(3):\n    scoop("vanilla")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)"], label: "3 vanilla scoops" }],
    teacherExplanation: "Show the loop as 'repeat N times'; only the indented line repeats.",
    commonMistakes: ["Forgetting the colon", "Not indenting the scoop"],
    studentReflection: "I can repeat a command with for and range."
  },
  {
    id: 7,
    tier: "basic",
    title: "Exercise 7: Loop, then One More",
    storyProblem: "Serve 3 vanilla scoops in a loop, then add 1 strawberry scoop after the loop (not indented).",
    concept: "Loop scope",
    learnFirst: {
      problem: "Some commands repeat; the last one runs once.",
      knownInfo: "Indented lines repeat; un-indented lines run once.",
      pythonQuestion: "Which scoop runs only once?",
      whyPath: "The un-indented strawberry line runs after the loop finishes.",
      action: "Loop 3 vanilla, then scoop strawberry at the left edge.",
      learned: "Indentation decides what is inside the loop."
    },
    vocabulary: [{ term: "indentation", meaning: "Spaces at the start of a line show block membership." }],
    hints: [
      "Concept Clue: Put the strawberry scoop at the left edge after the loop.",
      "Structure Guide:\nfor i in range(3):\n    scoop(\"vanilla\")\nscoop(\"strawberry\")",
      "Guided Correction: Do not indent scoop(\"strawberry\")."
    ],
    starterCode: 'for i in range(3):\n    scoop("vanilla")',
    solution: 'for i in range(3):\n    scoop("vanilla")\nscoop("strawberry")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)", "scoop(strawberry)"], label: "3 vanilla then 1 strawberry" }],
    teacherExplanation: "The ordering test proves the loop finished before the last line.",
    commonMistakes: ["Indenting the strawberry line", "Putting it before the loop"],
    studentReflection: "I know which lines are inside and outside a loop."
  },
  {
    id: 8,
    tier: "basic",
    title: "Exercise 8: The Flavor Box",
    storyProblem: "Store flavor = \"mango\", then loop range(2) serving scoop(flavor) — no quotes around the variable.",
    concept: "Variables inside a loop",
    learnFirst: {
      problem: "Use a variable in a command.",
      knownInfo: "flavor = \"mango\" stores a word.",
      pythonQuestion: "Does scoop(flavor) need quotes?",
      whyPath: "flavor is a box name, so no quotes.",
      action: "Assign flavor, then loop scoop(flavor).",
      learned: "Variables go inside brackets without quotes."
    },
    vocabulary: [{ term: "variable", meaning: "A named box holding a value." }],
    hints: [
      "Concept Clue: scoop(flavor) has no quotes around flavor.",
      "Structure Guide:\nflavor = \"mango\"\nfor i in range(2):\n    scoop(flavor)",
      "Guided Correction: Quotes go around mango, not around flavor."
    ],
    starterCode: 'flavor = "mango"\nfor i in range(2):\n    scoop("flavor")',
    solution: 'flavor = "mango"\nfor i in range(2):\n    scoop(flavor)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(mango)", "scoop(mango)"], label: "2 mango scoops" }],
    teacherExplanation: "The variable resolves to mango; quoting the name is a common mistake.",
    commonMistakes: ["scoop(\"flavor\")", "Forgetting the assignment"],
    studentReflection: "I can use a variable as a command argument."
  },
  {
    id: 9,
    tier: "basic",
    title: "Exercise 9: Count from the Customer",
    storyProblem: "Bear tells you n — how many scoops. Loop range(n) serving vanilla so the count matches the order.",
    concept: "Variables in range()",
    learnFirst: {
      problem: "Each customer wants a different number of scoops.",
      knownInfo: "n is a whole number.",
      pythonQuestion: "for i in range(n) — how many repeats?",
      whyPath: "range(n) reads the number in n.",
      action: "Write for i in range(n): scoop(\"vanilla\").",
      learned: "A variable can go inside range()."
    },
    vocabulary: [{ term: "range(n)", meaning: "Repeats n times." }],
    hints: [
      "Concept Clue: Use range(n) with no quotes.",
      "Structure Guide:\nfor i in range(n):\n    scoop(\"vanilla\")",
      "Guided Correction: Change range(3) to range(n)."
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
    teacherExplanation: "Each test sets a different n so range(n) matches the order size.",
    commonMistakes: ["Quoting n", "Hardcoding range(3)"],
    studentReflection: "I can loop a variable number of times."
  },
  {
    id: 10,
    tier: "basic",
    title: "Exercise 10: Topping After the Loop",
    storyProblem: "Loop range(2) serving vanilla, then add sprinkles with topping(\"sprinkles\") after the loop.",
    concept: "Commands after a loop",
    learnFirst: {
      problem: "Repeat scoops, then add one topping.",
      knownInfo: "Un-indented lines run once after the loop.",
      pythonQuestion: "Where does topping go?",
      whyPath: "After the loop, at the left edge.",
      action: "Loop 2 vanilla, then topping(\"sprinkles\").",
      learned: "Mix repeated and single commands."
    },
    vocabulary: [{ term: "topping()", meaning: "Adds a topping to the sundae." }],
    hints: [
      "Concept Clue: topping() is not indented.",
      "Structure Guide:\nfor i in range(2):\n    scoop(\"vanilla\")\ntopping(\"sprinkles\")",
      "Guided Correction: Put topping at the left edge after the loop."
    ],
    starterCode: 'for i in range(2):\n    scoop("vanilla")',
    solution: 'for i in range(2):\n    scoop("vanilla")\ntopping("sprinkles")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "topping(sprinkles)"], label: "2 scoops + sprinkles" }],
    teacherExplanation: "Distinguish loop body from the command after the loop.",
    commonMistakes: ["Indenting topping", "Wrong order"],
    studentReflection: "I can add a single topping after repeated scoops."
  },

  /* ============================ DEBUG (11–15) ========================== */
  {
    id: 11,
    tier: "debug",
    title: "Exercise 11: Missing Colon",
    storyProblem: "The for line is missing its colon. Add : so the indented scoop belongs to the loop.",
    concept: "Fix missing colon",
    learnFirst: {
      problem: "The loop line has no colon.",
      knownInfo: "for lines end with :.",
      pythonQuestion: "What ends the for line?",
      whyPath: "The colon opens the block.",
      action: "Add : at the end of the for line.",
      learned: "Every for line ends with a colon."
    },
    vocabulary: [{ term: ":", meaning: "Starts the indented block." }],
    hints: [
      "Concept Clue: Add a colon after range(3).",
      "Structure Guide:\nfor i in range(3):\n    scoop(\"vanilla\")",
      "Guided Correction: Add : at the end of the for line."
    ],
    starterCode: '# Bug: missing colon\nfor i in range(3)\n    scoop("vanilla")',
    solution: 'for i in range(3):\n    scoop("vanilla")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)"], label: "3 scoops" }],
    teacherExplanation: "Debug a missing colon.",
    commonMistakes: ["Adding a semicolon", "Removing indentation"],
    studentReflection: "I remember for lines end with a colon."
  },
  {
    id: 12,
    tier: "debug",
    title: "Exercise 12: Missing Indentation",
    storyProblem: "The scoop is not indented, so Python thinks it is outside the loop. Indent it under the for line.",
    concept: "Fix indentation",
    learnFirst: {
      problem: "The loop body is at the left edge.",
      knownInfo: "Indented lines belong to the loop.",
      pythonQuestion: "Where should scoop sit?",
      whyPath: "Under the for line, indented by 4 spaces.",
      action: "Indent the scoop line.",
      learned: "Indentation defines the loop body."
    },
    vocabulary: [{ term: "indent", meaning: "Spaces at line start that show block membership." }],
    hints: [
      "Concept Clue: scoop must be inside the loop.",
      "Structure Guide:\nfor i in range(3):\n    scoop(\"vanilla\")",
      "Guided Correction: Add 4 spaces before scoop."
    ],
    starterCode: '# Bug: scoop is outside the loop\nfor i in range(3):\nscoop("vanilla")',
    solution: 'for i in range(3):\n    scoop("vanilla")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)"], label: "3 scoops" }],
    teacherExplanation: "Debug missing indentation.",
    commonMistakes: ["Indenting the for line instead", "Removing the colon"],
    studentReflection: "I can fix loop indentation."
  },
  {
    id: 13,
    tier: "debug",
    title: "Exercise 13: Wrong Scoop Count",
    storyProblem: "Bear ordered 3 scoops but range(2) only serves 2. Fix the number so 3 vanilla scoops are served.",
    concept: "Fix range count",
    learnFirst: {
      problem: "The loop repeats too few times.",
      knownInfo: "range(3) repeats 3 times.",
      pythonQuestion: "Which number gives 3 repeats?",
      whyPath: "range(3) counts 0,1,2.",
      action: "Change range(2) to range(3).",
      learned: "The number in range is the repeat count."
    },
    vocabulary: [{ term: "range(3)", meaning: "Repeat 3 times." }],
    hints: [
      "Concept Clue: Bear wants 3, so range needs 3.",
      "Structure Guide:\nfor i in range(3):\n    scoop(\"vanilla\")",
      "Guided Correction: Change 2 to 3."
    ],
    starterCode: '# Bug: only 2 scoops\nfor i in range(2):\n    scoop("vanilla")',
    solution: 'for i in range(3):\n    scoop("vanilla")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)"], label: "3 scoops" }],
    teacherExplanation: "Debug a wrong range count.",
    commonMistakes: ["Changing the flavor", "Adding extra scoop lines"],
    studentReflection: "I can fix how many times a loop repeats."
  },
  {
    id: 14,
    tier: "debug",
    title: "Exercise 14: Quotes Around the Variable",
    storyProblem: "scoop(\"flavor\") serves the word 'flavor', not the mango inside the box. Remove the quotes around the variable.",
    concept: "Fix quoted variable",
    learnFirst: {
      problem: "The command uses a quoted variable name.",
      knownInfo: "Quotes mean text; no quotes means the variable.",
      pythonQuestion: "Should flavor have quotes?",
      whyPath: "No quotes reads the box value.",
      action: "Change scoop(\"flavor\") to scoop(flavor).",
      learned: "Variables go inside brackets without quotes."
    },
    vocabulary: [{ term: "variable", meaning: "A named box holding a value." }],
    hints: [
      "Concept Clue: Remove the quotes around flavor.",
      "Structure Guide:\nflavor = \"mango\"\nfor i in range(2):\n    scoop(flavor)",
      "Guided Correction: scoop(flavor), not scoop(\"flavor\")."
    ],
    starterCode: '# Bug: quoted variable\nflavor = "mango"\nfor i in range(2):\n    scoop("flavor")',
    solution: 'flavor = "mango"\nfor i in range(2):\n    scoop(flavor)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(mango)", "scoop(mango)"], label: "2 mango scoops" }],
    teacherExplanation: "Debug quotes around a variable name.",
    commonMistakes: ["Removing quotes from mango", "Changing the count"],
    studentReflection: "I know variables in commands have no quotes."
  },
  {
    id: 15,
    tier: "debug",
    title: "Exercise 15: Wrong Loop Keyword",
    storyProblem: "The loop says 'on' instead of 'in'. Fix the keyword so Python understands the loop.",
    concept: "Fix for ... in",
    learnFirst: {
      problem: "The loop keyword is misspelled.",
      knownInfo: "A for loop is written 'for x in ...'.",
      pythonQuestion: "Which word joins the loop variable and range?",
      whyPath: "The word is 'in'.",
      action: "Change 'on' to 'in'.",
      learned: "for loops use the keyword in."
    },
    vocabulary: [{ term: "in", meaning: "The keyword linking the loop variable to range or a list." }],
    hints: [
      "Concept Clue: The keyword is 'in'.",
      "Structure Guide:\nfor i in range(3):\n    scoop(\"vanilla\")",
      "Guided Correction: Change on to in."
    ],
    starterCode: '# Bug: wrong keyword\nfor i on range(3):\n    scoop("vanilla")',
    solution: 'for i in range(3):\n    scoop("vanilla")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)"], label: "3 scoops" }],
    teacherExplanation: "Debug a misspelled loop keyword.",
    commonMistakes: ["Changing range", "Removing the colon"],
    studentReflection: "I know for loops use the word in."
  },

  /* =========================== CHALLENGE (16–18) ======================= */
  {
    id: 16,
    tier: "challenge",
    title: "Exercise 16: Five Sundaes",
    storyProblem: "Serve 5 chocolate scoops using a loop. No scaffold — build it yourself.",
    concept: "for loop from scratch",
    learnFirst: {
      problem: "Repeat 5 times.",
      knownInfo: "for i in range(n): repeats n times.",
      pythonQuestion: "What number goes in range?",
      whyPath: "range(5) repeats 5 times.",
      action: "Write the for loop and indented scoop.",
      learned: "I can write a loop from scratch."
    },
    vocabulary: [{ term: "range(5)", meaning: "Repeat 5 times." }],
    hints: [
      "Concept Clue: range(5) for five scoops.",
      "Structure Guide:\nfor i in range(5):\n    scoop(\"chocolate\")",
      "Guided Correction: Indent the scoop."
    ],
    starterCode: '# Your turn: 5 chocolate scoops\n',
    solution: 'for i in range(5):\n    scoop("chocolate")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(chocolate)", "scoop(chocolate)", "scoop(chocolate)", "scoop(chocolate)", "scoop(chocolate)"], label: "5 chocolate scoops" }],
    teacherExplanation: "Independent loop construction.",
    commonMistakes: ["Wrong count", "Missing indentation"],
    studentReflection: "I can build a loop without a scaffold."
  },
  {
    id: 17,
    tier: "challenge",
    title: "Exercise 17: Loop with a Variable Count",
    storyProblem: "Store flavor = \"strawberry\" and count = 4, then loop range(count) serving scoop(flavor).",
    concept: "Variable count + variable flavor",
    learnFirst: {
      problem: "Use two variables in a loop.",
      knownInfo: "range(count) uses a variable; scoop(flavor) uses another.",
      pythonQuestion: "How many repeats does range(count) give?",
      whyPath: "count is 4, so 4 repeats.",
      action: "Assign both, then loop.",
      learned: "Variables can control both the count and the flavor."
    },
    vocabulary: [{ term: "variable", meaning: "A named box holding a value." }],
    hints: [
      "Concept Clue: range(count) and scoop(flavor).",
      "Structure Guide:\nflavor = \"strawberry\"\ncount = 4\nfor i in range(count):\n    scoop(flavor)",
      "Guided Correction: No quotes around count or flavor."
    ],
    starterCode: '# Your turn: 4 strawberry scoops\n',
    solution: 'flavor = "strawberry"\ncount = 4\nfor i in range(count):\n    scoop(flavor)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(strawberry)", "scoop(strawberry)", "scoop(strawberry)", "scoop(strawberry)"], label: "4 strawberry scoops" }],
    teacherExplanation: "Combine variable count and variable argument.",
    commonMistakes: ["Quoting flavor/count", "Wrong count"],
    studentReflection: "I can use variables for both loop count and flavor."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Exercise 18: Scoop and Sauce",
    storyProblem: "Loop range(3) serving vanilla, then pour chocolate sauce once after the loop.",
    concept: "Loop then sauce",
    learnFirst: {
      problem: "Repeat scoops and finish with sauce.",
      knownInfo: "sauce(\"...\") runs once when un-indented.",
      pythonQuestion: "Where does sauce go?",
      whyPath: "After the loop at the left edge.",
      action: "Loop 3 vanilla, then sauce(\"chocolate\").",
      learned: "Finish a loop with a single command."
    },
    vocabulary: [{ term: "sauce()", meaning: "Pours sauce over the sundae." }],
    hints: [
      "Concept Clue: sauce is not indented.",
      "Structure Guide:\nfor i in range(3):\n    scoop(\"vanilla\")\nsauce(\"chocolate\")",
      "Guided Correction: Put sauce at the left edge."
    ],
    starterCode: '# Your turn: 3 vanilla scoops, then chocolate sauce\n',
    solution: 'for i in range(3):\n    scoop("vanilla")\nsauce("chocolate")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)", "sauce(chocolate)"], label: "3 scoops + sauce" }],
    teacherExplanation: "Combine a loop with a finishing command.",
    commonMistakes: ["Indenting sauce", "Wrong order"],
    studentReflection: "I can finish a loop with a sauce."
  },

  /* ============================ ADVANCED (19–20) ======================= */
  {
    id: 19,
    tier: "advanced",
    title: "Exercise 19: Bear's Order",
    storyProblem: "Read the comments: serve 3 vanilla scoops in a loop, then 1 mango scoop after the loop.",
    concept: "Comment-guided loop",
    learnFirst: {
      problem: "Build the order from a comment plan.",
      knownInfo: "Loop for repeated scoops; one scoop after.",
      pythonQuestion: "What runs once?",
      whyPath: "The mango scoop is outside the loop.",
      action: "Follow the comments.",
      learned: "I can translate a plan into a loop plus a single command."
    },
    vocabulary: [{ term: "comment", meaning: "A note starting with #; Python ignores it." }],
    hints: [
      "Concept Clue: The comments give the order.",
      "Structure Guide:\n# 3 vanilla in a loop, then 1 mango",
      "Guided Correction: Mango is not indented."
    ],
    starterCode: "# Bear's order:\n# 1) loop 3 times and serve vanilla\n# 2) after the loop, serve mango",
    solution: 'for i in range(3):\n    scoop("vanilla")\nscoop("mango")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(vanilla)", "scoop(vanilla)", "scoop(vanilla)", "scoop(mango)"], label: "3 vanilla + 1 mango" }],
    teacherExplanation: "Advanced: build a loop plus a post-loop command from comments only.",
    commonMistakes: ["Indenting the mango", "Wrong loop count"],
    studentReflection: "I can follow a comment plan for a loop order."
  },
  {
    id: 20,
    tier: "advanced",
    title: "Exercise 20: Party Sundae",
    storyProblem: "Finale: loop 4 times serving chocolate, then add sprinkles and caramel sauce — the comments describe the plan.",
    concept: "Loop + topping + sauce composition",
    learnFirst: {
      problem: "Compose a full sundae from a plan.",
      knownInfo: "Loop for scoops; topping and sauce run once.",
      pythonQuestion: "Which lines repeat?",
      whyPath: "Only the indented scoop repeats.",
      action: "Follow the comments.",
      learned: "I can compose a full sundae with a loop and finishing commands."
    },
    vocabulary: [{ term: "composition", meaning: "Combining repeated and single commands into one program." }],
    hints: [
      "Concept Clue: Follow the comments in order.",
      "Structure Guide:\n# loop 4 chocolate, then topping, then sauce",
      "Guided Correction: topping and sauce are at the left edge."
    ],
    starterCode: "# Party sundae:\n# 1) loop 4 times and serve chocolate\n# 2) add sprinkles topping\n# 3) pour caramel sauce",
    solution: 'for i in range(4):\n    scoop("chocolate")\ntopping("sprinkles")\nsauce("caramel")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: ["scoop(chocolate)", "scoop(chocolate)", "scoop(chocolate)", "scoop(chocolate)", "topping(sprinkles)", "sauce(caramel)"], label: "party sundae" }],
    teacherExplanation: "Final advanced task: compose a loop with two finishing commands from comments.",
    commonMistakes: ["Indenting topping/sauce", "Wrong scoop count"],
    studentReflection: "I can build a complete sundae with a loop and finishing commands."
  }
];
