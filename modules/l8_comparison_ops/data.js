/* Traffic Light Python — Lesson 8 (Comparison Operators).
   20-exercise backbone:
     recap 1-4  → Lesson 7 arithmetic refresher (one command each)
     basic 5-10 → ==, if/else, elif, !=, >, <
     debug 11-15→ repair comparison/logic syntax
     challenge 16-18 → nested if, and, or
     advanced 19-20 → not/booleans, autonomous-boss
*/

export const LESSONS = [
  /* ============================ RECAP (1–4) ============================ */
  {
    id: 1,
    tier: "recap",
    title: "Exercise 1: Recap — Add It Up",
    storyProblem: "Welcome back! Before comparisons, let's warm up with Lesson 7 arithmetic. If 2 + 3 equals 5, drive with go().",
    concept: "Arithmetic recap + ==",
    learnFirst: {
      problem: "Remember addition, then use a comparison to decide.",
      knownInfo: "2 + 3 makes 5. == asks if two values are the same.",
      pythonQuestion: "Is 2 + 3 == 5?",
      whyPath: "2 + 3 is 5, and 5 == 5 is True.",
      action: "Put if 2 + 3 == 5: and indent go().",
      learned: "Arithmetic and comparison can work together in a question."
    },
    vocabulary: [
      { term: "+", meaning: "Addition." },
      { term: "==", meaning: "Asks if two values are the same." }
    ],
    hints: [
      "Concept Clue: 2 + 3 makes 5, so the question is True.",
      "Structure Guide:\nif 2 + 3 == 5:\n    go()",
      "Guided Correction: Write if 2 + 3 == 5: then indent go()."
    ],
    starterCode: "# If 2 + 3 == 5, drive:\n",
    solution: 'if 2 + 3 == 5:\n    go()',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "go", label: "2 + 3 == 5" }],
    teacherExplanation: "Recap Lesson 7 arithmetic and bridge to comparisons.",
    commonMistakes: ["Using one = instead of ==", "Forgetting the colon"],
    studentReflection: "I can combine arithmetic with a comparison."
  },
  {
    id: 2,
    tier: "recap",
    title: "Exercise 2: Recap — Subtract",
    storyProblem: "Warm up subtraction. If 10 - 4 equals 6, drive with go().",
    concept: "Arithmetic recap + ==",
    learnFirst: {
      problem: "Use subtraction in a question.",
      knownInfo: "10 - 4 makes 6.",
      pythonQuestion: "Is 10 - 4 == 6?",
      whyPath: "10 - 4 is 6, and 6 == 6 is True.",
      action: "Write if 10 - 4 == 6: and indent go().",
      learned: "Subtraction works the same way inside a comparison."
    },
    vocabulary: [{ term: "-", meaning: "Subtraction." }],
    hints: [
      "Concept Clue: 10 - 4 makes 6.",
      "Structure Guide:\nif 10 - 4 == 6:\n    go()",
      "Guided Correction: if 10 - 4 == 6: then go()."
    ],
    starterCode: "# If 10 - 4 == 6, drive:\n",
    solution: 'if 10 - 4 == 6:\n    go()',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "go", label: "10 - 4 == 6" }],
    teacherExplanation: "Recap subtraction before new comparison operators.",
    commonMistakes: ["Wrong operator", "Using = instead of =="],
    studentReflection: "I can use subtraction in an if check."
  },
  {
    id: 3,
    tier: "recap",
    title: "Exercise 3: Recap — Multiply",
    storyProblem: "Warm up multiplication. If 3 * 2 is greater than 5, drive with go().",
    concept: "Arithmetic recap + >",
    learnFirst: {
      problem: "Use multiplication with a greater-than check.",
      knownInfo: "3 * 2 makes 6, and 6 > 5 is True.",
      pythonQuestion: "Is 3 * 2 > 5?",
      whyPath: "6 > 5 is True, so go() runs.",
      action: "Write if 3 * 2 > 5: and indent go().",
      learned: "Multiplication result can be compared with >."
    },
    vocabulary: [
      { term: "*", meaning: "Multiplication." },
      { term: ">", meaning: "Greater than." }
    ],
    hints: [
      "Concept Clue: 3 * 2 = 6, and 6 is bigger than 5.",
      "Structure Guide:\nif 3 * 2 > 5:\n    go()",
      "Guided Correction: if 3 * 2 > 5: then go()."
    ],
    starterCode: "# If 3 * 2 > 5, drive:\n",
    solution: 'if 3 * 2 > 5:\n    go()',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "go", label: "3 * 2 > 5" }],
    teacherExplanation: "Recap multiplication and introduce > informally.",
    commonMistakes: ["Using < by mistake"],
    studentReflection: "I can compare a product with >."
  },
  {
    id: 4,
    tier: "recap",
    title: "Exercise 4: Recap — Exact Division",
    storyProblem: "Last warm-up: exact division. If 10 // 2 equals 5, drive with go().",
    concept: "Arithmetic recap + //",
    learnFirst: {
      problem: "Use floor division in a question.",
      knownInfo: "10 // 2 makes 5.",
      pythonQuestion: "Is 10 // 2 == 5?",
      whyPath: "10 // 2 is 5, and 5 == 5 is True.",
      action: "Write if 10 // 2 == 5: and indent go().",
      learned: "// divides and drops any remainder."
    },
    vocabulary: [{ term: "//", meaning: "Whole-number division (drops the remainder)." }],
    hints: [
      "Concept Clue: 10 // 2 makes 5.",
      "Structure Guide:\nif 10 // 2 == 5:\n    go()",
      "Guided Correction: if 10 // 2 == 5: then go()."
    ],
    starterCode: "# If 10 // 2 == 5, drive:\n",
    solution: 'if 10 // 2 == 5:\n    go()',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "go", label: "10 // 2 == 5" }],
    teacherExplanation: "Recap floor division from Lesson 7.",
    commonMistakes: ["Using / instead of //", "Using = instead of =="],
    studentReflection: "I remember how // works."
  },

  /* ============================ BASIC (5–10) =========================== */
  {
    id: 5,
    tier: "basic",
    title: "Exercise 5: Ask a Question with if",
    storyProblem: "Now the traffic light changes by itself! Replace go() with an if question: when light is \"red\", run stop().",
    concept: "Decisions with if and ==",
    learnFirst: {
      problem: "The car must brake when the light is red, and only drive on when it is green.",
      knownInfo: "The road sensor gives us the variable light (\"red\" or \"green\").",
      pythonQuestion: "Is light == \"red\"? (Are these two values the exact same?)",
      whyPath: "When light is \"red\", the answer is True, so Python runs the indented line inside if.",
      action: "If True, Python runs stop(). If False, Python skips stop().",
      learned: "Use if and == with a colon : to ask a question, and press Tab to indent the action."
    },
    vocabulary: [
      { term: "if", meaning: "Asks Python a True or False question before deciding what to do." },
      { term: "==", meaning: "Two equal signs ask: 'Are these two values the exact same?'" },
      { term: ":", meaning: "A colon ends the question line and means: 'Here comes the action!'" }
    ],
    hints: [
      "Concept Clue: Ask Python if light is equal to \"red\" using ==, then indent stop().",
      "Structure Guide:\nif light == \"___\":\n    ___()",
      "Guided Correction: Write if light == \"red\": on line 2, press Enter and Tab, and write stop()."
    ],
    starterCode: "# Ask if light is \"red\", then stop():\ngo()",
    solution: 'if light == "red":\n    stop()',
    variables: ["light"],
    tests: [
      { environment: { light: "red" }, want: "stop", label: 'light = "red"' },
      { environment: { light: "green" }, want: null, label: 'light = "green" (no action)' }
    ],
    teacherExplanation: "Explain indentation as 'belonging'. The indented line only runs IF the question above it is True.",
    commonMistakes: ["Using one = instead of two ==", "Forgetting the colon :", "Forgetting to indent stop()"],
    studentReflection: "I can ask Python a question with if and ==, and indent the action underneath."
  },
  {
    id: 6,
    tier: "basic",
    title: "Exercise 6: Two Roads with else",
    storyProblem: "Good drivers don't guess! Add an else: branch so when the light is NOT red, the car explicitly runs go().",
    concept: "Two-Way Branching with else",
    learnFirst: {
      problem: "Our code knows when to stop(), but we need a clear rule for what to do when the light is not red.",
      knownInfo: "The light variable can be \"red\" or \"green\".",
      pythonQuestion: "Is light == \"red\"?",
      whyPath: "If True, Python runs stop(). If False, Python jumps to else: and runs go().",
      action: "The car brakes on red and drives forward on green.",
      learned: "else: means 'for everything else!' It never asks a question of its own."
    },
    vocabulary: [{ term: "else:", meaning: "Runs when the if question above was False. Written as else: with no question." }],
    hints: [
      "Concept Clue: Add else: at the start of a new line, then indent go() underneath it.",
      "Structure Guide:\nif light == \"red\":\n    stop()\n___:\n    ___()",
      "Guided Correction: Below stop(), write else: (lined up with if), press Enter, and indent go()."
    ],
    starterCode: 'if light == "red":\n    stop()',
    solution: 'if light == "red":\n    stop()\nelse:\n    go()',
    variables: ["light"],
    tests: [
      { environment: { light: "red" }, want: "stop", label: 'light = "red"' },
      { environment: { light: "green" }, want: "go", label: 'light = "green"' }
    ],
    teacherExplanation: "Emphasize that else: has no condition attached to it. It is the universal fallback branch.",
    commonMistakes: ["Writing a question after else", "Indenting else: instead of lining it up with if"],
    studentReflection: "I understand that else: tells Python what to do when the if question is False."
  },
  {
    id: 7,
    tier: "basic",
    title: "Exercise 7: Three Colors with elif",
    storyProblem: "Traffic lights have three colors! Insert an elif branch between if and else so when light is \"yellow\", the car calls slow().",
    concept: "Multi-Way Branching with elif",
    learnFirst: {
      problem: "A yellow light means slow down, then stop — we need a middle choice between red and green!",
      knownInfo: "The light variable can be \"red\", \"yellow\", or \"green\".",
      pythonQuestion: "1st: Is light == \"red\"? 2nd (elif): Is light == \"yellow\"?",
      whyPath: "Python checks from top to bottom and picks the very first branch that is True.",
      action: "Red runs stop(), yellow runs slow(), and green falls through to else: go().",
      learned: "elif means 'else if' — it asks a second question only when the first question was False."
    },
    vocabulary: [
      { term: "elif", meaning: "Short for 'else if'. Asks a new question when earlier questions were False." },
      { term: "slow()", meaning: "Car command: slows the car down gently, then stops at the line." }
    ],
    hints: [
      "Concept Clue: Use elif to ask if light == \"yellow\": before the else: line.",
      "Structure Guide:\nif light == \"red\":\n    stop()\nelif light == \"___\":\n    ___()\nelse:\n    go()",
      "Guided Correction: Between stop() and else:, add elif light == \"yellow\": and indent slow() underneath."
    ],
    starterCode: 'if light == "red":\n    stop()\nelse:\n    go()',
    solution: 'if light == "red":\n    stop()\nelif light == "yellow":\n    slow()\nelse:\n    go()',
    variables: ["light"],
    tests: [
      { environment: { light: "red" }, want: "stop", label: 'light = "red"' },
      { environment: { light: "yellow" }, want: "slow", label: 'light = "yellow"' },
      { environment: { light: "green" }, want: "go", label: 'light = "green"' }
    ],
    teacherExplanation: "Explain the top-to-bottom chain: once one branch is True, Python runs that block and skips the rest.",
    commonMistakes: ["Writing 'else if' as two words", "Placing elif after else:"],
    studentReflection: "I can check three or more possibilities in order using if, elif, and else."
  },
  {
    id: 8,
    tier: "basic",
    title: "Exercise 8: Watch the Crosswalk !=",
    storyProblem: "Pedestrians and road cones can block the crosswalk! Change the if condition to use != so if path is NOT \"clear\", the car calls stop().",
    concept: "Not Equal Operator (!=)",
    learnFirst: {
      problem: "The road might be \"busy\" or \"blocked\". We can only drive when it is \"clear\".",
      knownInfo: "The path variable can be \"clear\", \"busy\", or \"blocked\".",
      pythonQuestion: "Is path != \"clear\"? (Is the path different from \"clear\"?)",
      whyPath: "When path is \"busy\" or \"blocked\", path != \"clear\" is True, so the car brakes!",
      action: "Calls stop() for any hazard; calls go() only when clear.",
      learned: "!= means 'is NOT equal to'. It is True whenever two values are different."
    },
    vocabulary: [{ term: "!=", meaning: "Asks Python: 'Are these two values different (NOT equal)?'" }],
    hints: [
      "Concept Clue: Use != to ask if path is not equal to \"clear\".",
      "Structure Guide:\nif path != \"___\":\n    stop()\nelse:\n    go()",
      "Guided Correction: Write if path != \"clear\":, indent stop(), then else: and go()."
    ],
    starterCode: 'if path == "busy":\n    stop()\nelse:\n    go()',
    solution: 'if path != "clear":\n    stop()\nelse:\n    go()',
    variables: ["path"],
    base: { light: "green" },
    tests: [
      { environment: { path: "clear" }, want: "go", label: 'path = "clear"' },
      { environment: { path: "busy" }, want: "stop", label: 'path = "busy"' },
      { environment: { path: "blocked" }, want: "stop", label: 'path = "blocked"' }
    ],
    teacherExplanation: "One check (path != 'clear') handles every hazard instead of separate checks.",
    commonMistakes: ["Writing =! instead of !=", "Putting a space between ! and ="],
    studentReflection: "I know that != checks whether two values are different."
  },
  {
    id: 9,
    tier: "basic",
    title: "Exercise 9: Speed Limit with >",
    storyProblem: "The speed limit is 50 km/h! Write an if/else rule: if speed > 50, call crawl(); otherwise call go().",
    concept: "Greater Than Operator (>)",
    learnFirst: {
      problem: "When our speed goes over 50 km/h, the car is going too fast and must slow down.",
      knownInfo: "The speedometer gives us speed as a number (like 30, 50, or 80).",
      pythonQuestion: "Is speed > 50? (Is the speed number bigger than 50?)",
      whyPath: "80 > 50 is True so Python calls crawl(). 30 > 50 and 50 > 50 are False so Python calls go().",
      action: "Slows to turtle mode (crawl()) when over 50; drives normally at 50 or below.",
      learned: "Use > to check if a number is greater than another. Numbers never use quote marks!"
    },
    vocabulary: [
      { term: ">", meaning: "Greater than. Checks if the left number is bigger than the right number." },
      { term: "crawl()", meaning: "Car command: drives forward very slowly (turtle mode)." }
    ],
    hints: [
      "Concept Clue: Ask Python if the speed is greater than 50 using >.",
      "Structure Guide:\nif speed > ___:\n    ___()\nelse:\n    go()",
      "Guided Correction: Write if speed > 50: (no quotes around 50), indent crawl(), then else: and go()."
    ],
    starterCode: "# If speed > 50, crawl()! Otherwise go():\ngo()",
    solution: 'if speed > 50:\n    crawl()\nelse:\n    go()',
    variables: ["speed"],
    base: { light: "green" },
    tests: [
      { environment: { speed: 30 }, want: "go", label: "speed = 30" },
      { environment: { speed: 80 }, want: "crawl", label: "speed = 80" },
      { environment: { speed: 51 }, want: "crawl", label: "speed = 51" },
      { environment: { speed: 50 }, want: "go", label: "speed = 50 (at limit)" }
    ],
    teacherExplanation: "Numbers are mathematical values and must not be wrapped in quotes. Highlight the boundary: 50 > 50 is False.",
    commonMistakes: ["Putting quotes around the number", "Confusing > with <"],
    studentReflection: "I can compare numbers using > without quote marks."
  },
  {
    id: 10,
    tier: "basic",
    title: "Exercise 10: Too Close! Using <",
    storyProblem: "Look at the road ruler! distance is how many meters behind the lead car. If distance < 5, call stop(); otherwise call go().",
    concept: "Less Than Operator (<)",
    learnFirst: {
      problem: "If our car gets closer than 5 meters to the car ahead, we must brake immediately!",
      knownInfo: "The road ruler sensor gives us distance in meters.",
      pythonQuestion: "Is distance < 5? (Is the distance number smaller than 5?)",
      whyPath: "2 < 5 and 4 < 5 are True -> stop(). 20 < 5 and 5 < 5 are False -> go().",
      action: "Brakes when closer than 5 meters; drives on at 5 meters or farther.",
      learned: "< checks if the left number is smaller than the right number."
    },
    vocabulary: [{ term: "<", meaning: "Less than. The pointy tip points to the smaller number!" }],
    hints: [
      "Concept Clue: Ask Python if distance is less than 5 using <.",
      "Structure Guide:\nif distance < ___:\n    ___()\nelse:\n    go()",
      "Guided Correction: Write if distance < 5:, indent stop(), and under else: indent go()."
    ],
    starterCode: "# If distance < 5, stop()! Otherwise go():\ngo()",
    solution: 'if distance < 5:\n    stop()\nelse:\n    go()',
    variables: ["distance"],
    base: { light: "green" },
    tests: [
      { environment: { distance: 2 }, want: "stop", label: "distance = 2 m" },
      { environment: { distance: 20 }, want: "go", label: "distance = 20 m" },
      { environment: { distance: 4 }, want: "stop", label: "distance = 4 m" },
      { environment: { distance: 5 }, want: "go", label: "distance = 5 m" }
    ],
    teacherExplanation: "The pointy end of < points to the smaller value. At distance = 5, 5 < 5 is False.",
    commonMistakes: ["Using > instead of <", "Calling crawl() instead of stop()"],
    studentReflection: "I know that < checks if a number is smaller than another number."
  },

  /* ============================ DEBUG (11–15) ========================== */
  {
    id: 11,
    tier: "debug",
    title: "Exercise 11: Fix the Question Mark",
    storyProblem: "The if line uses one = to ask a question. That stores instead of comparing! Fix it so light is checked with ==.",
    concept: "= vs ==",
    learnFirst: {
      problem: "A condition needs ==, not =.",
      knownInfo: "One = stores; two == compare.",
      pythonQuestion: "Which sign asks a question?",
      whyPath: "== compares two values.",
      action: "Change if light = \"red\" to if light == \"red\".",
      learned: "Conditions use ==, assignments use =."
    },
    vocabulary: [{ term: "==", meaning: "Comparison: asks if two values are equal." }],
    hints: [
      "Concept Clue: A question needs two equals signs.",
      "Structure Guide:\nif light == \"red\":\n    stop()",
      "Guided Correction: Change = to == on the if line."
    ],
    starterCode: '# Bug: one = cannot ask a question\nif light = "red":\n    stop()',
    solution: 'if light == "red":\n    stop()',
    variables: ["light"],
    tests: [
      { environment: { light: "red" }, want: "stop", label: 'light = "red"' },
      { environment: { light: "green" }, want: null, label: 'light = "green"' }
    ],
    teacherExplanation: "Debug the classic = vs == mistake in a condition.",
    commonMistakes: ["Changing both lines", "Leaving one ="],
    studentReflection: "I know conditions need ==."
  },
  {
    id: 12,
    tier: "debug",
    title: "Exercise 12: Wrong Way Comparison",
    storyProblem: "The speed rule is backwards: it slows down when the car is slow! Change < to > so only speeds over 50 crawl.",
    concept: "Fix > vs <",
    learnFirst: {
      problem: "The comparison points the wrong way.",
      knownInfo: "Speeds over 50 should slow down.",
      pythonQuestion: "Should the check be > 50?",
      whyPath: "80 > 50 is True, so crawl() runs for fast cars.",
      action: "Change < to >.",
      learned: "Read a comparison like a sentence to check direction."
    },
    vocabulary: [{ term: ">", meaning: "Greater than." }],
    hints: [
      "Concept Clue: Fast speeds must trigger crawl().",
      "Structure Guide:\nif speed > 50:\n    crawl()",
      "Guided Correction: Change < to >."
    ],
    starterCode: '# Bug: backwards comparison\nif speed < 50:\n    crawl()\nelse:\n    go()',
    solution: 'if speed > 50:\n    crawl()\nelse:\n    go()',
    variables: ["speed"],
    base: { light: "green" },
    tests: [
      { environment: { speed: 80 }, want: "crawl", label: "speed = 80" },
      { environment: { speed: 30 }, want: "go", label: "speed = 30" }
    ],
    teacherExplanation: "Debug a reversed relational operator.",
    commonMistakes: ["Changing the commands instead", "Using =="],
    studentReflection: "I can check whether a comparison points the right way."
  },
  {
    id: 13,
    tier: "debug",
    title: "Exercise 13: The Broken Not-Equal",
    storyProblem: "The not-equal sign is typed backwards as =!. Fix it to != so anything not clear stops the car.",
    concept: "Fix != operator",
    learnFirst: {
      problem: "The operator is invalid.",
      knownInfo: "Not equal is written !=.",
      pythonQuestion: "What is the correct order?",
      whyPath: "! comes before =.",
      action: "Change =! to !=.",
      learned: "The not-equal operator is !=."
    },
    vocabulary: [{ term: "!=", meaning: "Not equal to." }],
    hints: [
      "Concept Clue: The exclamation mark comes first.",
      "Structure Guide:\nif path != \"clear\":\n    stop()",
      "Guided Correction: Change =! to !=."
    ],
    starterCode: '# Bug: =! is not an operator\nif path =! "clear":\n    stop()\nelse:\n    go()',
    solution: 'if path != "clear":\n    stop()\nelse:\n    go()',
    variables: ["path"],
    base: { light: "green" },
    tests: [
      { environment: { path: "busy" }, want: "stop", label: 'path = "busy"' },
      { environment: { path: "clear" }, want: "go", label: 'path = "clear"' }
    ],
    teacherExplanation: "Debug an invalid operator order.",
    commonMistakes: ["Changing the strings", "Removing the operator"],
    studentReflection: "I know not-equal is !=."
  },
  {
    id: 14,
    tier: "debug",
    title: "Exercise 14: Boundary Bug",
    storyProblem: "The distance rule stops when FAR away and drives when close. Change >= to <= so it stops at 5 m or closer.",
    concept: "Fix <= direction",
    learnFirst: {
      problem: "The inequality is reversed and wrong at the boundary.",
      knownInfo: "Stop when distance <= 5.",
      pythonQuestion: "Should it be <= 5?",
      whyPath: "4 <= 5 and 5 <= 5 are True; 6 <= 5 is False.",
      action: "Change >= to <=.",
      learned: "<= includes the exact boundary."
    },
    vocabulary: [{ term: "<=", meaning: "Less than or equal to." }],
    hints: [
      "Concept Clue: We stop when distance is small.",
      "Structure Guide:\nif distance <= 5:\n    stop()",
      "Guided Correction: Change >= to <=."
    ],
    starterCode: '# Bug: this stops when far away\nif distance >= 5:\n    stop()\nelse:\n    go()',
    solution: 'if distance <= 5:\n    stop()\nelse:\n    go()',
    variables: ["distance"],
    base: { light: "green" },
    tests: [
      { environment: { distance: 4 }, want: "stop", label: "distance = 4 m" },
      { environment: { distance: 5 }, want: "stop", label: "distance = 5 m" },
      { environment: { distance: 6 }, want: "go", label: "distance = 6 m" }
    ],
    teacherExplanation: "Debug a reversed inequality that also mishandles the boundary.",
    commonMistakes: ["Using < instead of <=", "Reversing the commands"],
    studentReflection: "I can fix a reversed boundary comparison."
  },
  {
    id: 15,
    tier: "debug",
    title: "Exercise 15: Missing Colon",
    storyProblem: "The if line forgot its colon, so Python cannot start the block. Add the missing : after the condition.",
    concept: "Fix missing colon",
    learnFirst: {
      problem: "The if line has no colon.",
      knownInfo: "An if line ends with :.",
      pythonQuestion: "What ends an if line?",
      whyPath: "The colon opens the block.",
      action: "Add : at the end of the if line.",
      learned: "Every if/elif/else line ends with a colon."
    },
    vocabulary: [{ term: ":", meaning: "Starts the indented block." }],
    hints: [
      "Concept Clue: The condition line needs a colon.",
      "Structure Guide:\nif light == \"green\":\n    go()",
      "Guided Correction: Add : at the end of the if line."
    ],
    starterCode: '# Bug: missing colon\nif light == "green"\n    go()',
    solution: 'if light == "green":\n    go()',
    variables: ["light"],
    tests: [
      { environment: { light: "green" }, want: "go", label: 'light = "green"' },
      { environment: { light: "red" }, want: null, label: 'light = "red"' }
    ],
    teacherExplanation: "Debug a missing colon.",
    commonMistakes: ["Adding a semicolon", "Removing the indentation"],
    studentReflection: "I remember that if lines end with a colon."
  },

  /* =========================== CHALLENGE (16–18) ======================= */
  {
    id: 16,
    tier: "challenge",
    title: "Exercise 16: Inside the Question (Nested if)",
    storyProblem: "Inside the else: block, replace go() with an indented if/else that checks if distance < 5: stop(), else: go().",
    concept: "Nested Conditionals",
    learnFirst: {
      problem: "First we check the light. When it is NOT red, we still need to check the distance!",
      knownInfo: "Two sensors: light and distance.",
      pythonQuestion: "Outer: Is light == \"red\"? Inner (inside else): Is distance < 5?",
      whyPath: "The inner if is pushed in with Tab inside else:, so Python only asks it when light is not red.",
      action: "Stops if light is red OR if distance < 5; calls go() only when green and safe.",
      learned: "Putting an if inside another block is called a 'nested if'."
    },
    vocabulary: [{ term: "Nested if", meaning: "An if question indented inside another block." }],
    hints: [
      "Concept Clue: Inside else:, indent a new if distance < 5: check.",
      "Structure Guide:\nif light == \"red\":\n    stop()\nelse:\n    if distance < ___:\n        ___()\n    else:\n        go()",
      "Guided Correction: Indent if distance < 5: (4 spaces), stop() (8), else: (4), go() (8)."
    ],
    starterCode: 'if light == "red":\n    stop()\nelse:\n    go()',
    solution: 'if light == "red":\n    stop()\nelse:\n    if distance < 5:\n        stop()\n    else:\n        go()',
    variables: ["light", "distance"],
    tests: [
      { environment: { light: "red", distance: 10 }, want: "stop", label: 'light = "red", distance = 10 m' },
      { environment: { light: "green", distance: 3 }, want: "stop", label: 'light = "green", distance = 3 m' },
      { environment: { light: "green", distance: 12 }, want: "go", label: 'light = "green", distance = 12 m' }
    ],
    teacherExplanation: "Walk through the two indentation levels: 4 spaces for the inner if/else, 8 spaces for their actions.",
    commonMistakes: ["Not indenting the inner if/else", "Forgetting the second indentation level"],
    studentReflection: "I can place an if question inside an else block using indentation."
  },
  {
    id: 17,
    tier: "challenge",
    title: "Exercise 17: Both Must Be True (and)",
    storyProblem: "Update the if line so the car calls go() ONLY when light == \"green\" and path == \"clear\".",
    concept: "Logical Operator: and",
    learnFirst: {
      problem: "A green light isn't safe if someone is on the crosswalk! Both the light AND the path must be safe.",
      knownInfo: "Two sensors: light and path.",
      pythonQuestion: "Is light == \"green\" and path == \"clear\"?",
      whyPath: "The word and is strict: BOTH questions must be True.",
      action: "Calls go() only when green AND clear; otherwise stop().",
      learned: "Use and to join two complete questions when both must be True."
    },
    vocabulary: [{ term: "and", meaning: "Joins two questions. True ONLY when both sides are True." }],
    hints: [
      "Concept Clue: Join light == \"green\" with path == \"clear\" using and.",
      "Structure Guide:\nif light == \"green\" and path == \"___\":\n    go()\nelse:\n    stop()",
      "Guided Correction: Change line 1 to: if light == \"green\" and path == \"clear\":"
    ],
    starterCode: 'if light == "green":\n    go()\nelse:\n    stop()',
    solution: 'if light == "green" and path == "clear":\n    go()\nelse:\n    stop()',
    variables: ["light", "path"],
    tests: [
      { environment: { light: "green", path: "clear" }, want: "go", label: "green & clear" },
      { environment: { light: "green", path: "busy" }, want: "stop", label: "green & busy" },
      { environment: { light: "red", path: "clear" }, want: "stop", label: "red & clear" }
    ],
    teacherExplanation: "Each side of and must be a complete comparison.",
    commonMistakes: ["Writing 'and \"clear\"' instead of 'and path == \"clear\"'", "Using & instead of and"],
    studentReflection: "I can join two complete questions with and."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Exercise 18: Either Can Be True (or)",
    storyProblem: "Slow down with crawl() if we are in a \"school\" zone OR if the weather is \"rainy\"! Update the if line using or.",
    concept: "Logical Operator: or",
    learnFirst: {
      problem: "Either a school zone OR rainy weather (or both) means we should slow down.",
      knownInfo: "Two sensors: zone (\"school\" or \"city\") and weather (\"rainy\" or \"sunny\").",
      pythonQuestion: "Is zone == \"school\" or weather == \"rainy\"?",
      whyPath: "or is flexible: if AT LEAST ONE side is True, the whole question is True!",
      action: "Calls crawl() in a school zone, in rain, or both; go() only in a sunny city.",
      learned: "Use or when either question being True is enough."
    },
    vocabulary: [{ term: "or", meaning: "Joins two questions. True if at least one side is True." }],
    hints: [
      "Concept Clue: Use or to check zone == \"school\" or weather == \"rainy\".",
      "Structure Guide:\nif zone == \"school\" or weather == \"___\":\n    crawl()\nelse:\n    go()",
      "Guided Correction: Change line 1 to: if zone == \"school\" or weather == \"rainy\":"
    ],
    starterCode: 'if zone == "school":\n    crawl()\nelse:\n    go()',
    solution: 'if zone == "school" or weather == "rainy":\n    crawl()\nelse:\n    go()',
    variables: ["zone", "weather"],
    base: { light: "green" },
    tests: [
      { environment: { zone: "school", weather: "sunny" }, want: "crawl", label: "school & sunny" },
      { environment: { zone: "city", weather: "rainy" }, want: "crawl", label: "city & rainy" },
      { environment: { zone: "city", weather: "sunny" }, want: "go", label: "city & sunny" },
      { environment: { zone: "school", weather: "rainy" }, want: "crawl", label: "school & rainy" }
    ],
    teacherExplanation: "Contrast and vs or: and needs both; or needs one.",
    commonMistakes: ["Using and instead of or", "Writing 'or \"rainy\"' without 'weather =='"],
    studentReflection: "I know that or is True whenever at least one question is True."
  },

  /* ============================ ADVANCED (19–20) ======================= */
  {
    id: 19,
    tier: "advanced",
    title: "Exercise 19: True, False and not",
    storyProblem: "siren is already True or False. The comment tells you the rule — build an if/else using not.",
    concept: "Booleans & Negation (not)",
    learnFirst: {
      problem: "When the siren is on we stop; when it is off we drive.",
      knownInfo: "siren is a True/False switch.",
      pythonQuestion: "Is not siren? (Is the siren off?)",
      whyPath: "not flips True and False.",
      action: "Follow the comment in the editor.",
      learned: "True/False are booleans; not flips them."
    },
    vocabulary: [
      { term: "True / False", meaning: "Special yes/no values." },
      { term: "not", meaning: "Flips a boolean to its opposite." }
    ],
    hints: [
      "Concept Clue: Check the comment in the editor.",
      "Structure Guide:\n# if no siren -> go, else stop",
      "Guided Correction: if not siren: go() else: stop()."
    ],
    starterCode: '# Rule:\n# - if there is NO siren, go()\n# - otherwise, stop()',
    solution: 'if not siren:\n    go()\nelse:\n    stop()',
    variables: ["siren"],
    base: { light: "green" },
    tests: [
      { environment: { siren: false }, want: "go", label: "siren = False" },
      { environment: { siren: true }, want: "stop", label: "siren = True" }
    ],
    teacherExplanation: "Advanced: translate a commented rule into an if/else using not, with minimal hints.",
    commonMistakes: ["Quoting True/False", "Swapping go() and stop()"],
    studentReflection: "I can use True, False and not to check on/off switches."
  },
  {
    id: 20,
    tier: "advanced",
    title: "Exercise 20: The Autonomous Brain",
    storyProblem: "Final challenge: build a full if/elif/else brain from the comments — green goes, yellow slows, everything else stops.",
    concept: "Combined Complex Decision Logic",
    learnFirst: {
      problem: "A real self-driving car combines several rules.",
      knownInfo: "light can be green, yellow or red.",
      pythonQuestion: "Which branch runs for each light?",
      whyPath: "Python checks top to bottom and runs the first True branch.",
      action: "Follow the comments in the editor.",
      learned: "You can combine if/elif/else with comparisons."
    },
    vocabulary: [{ term: "Combined Logic", meaning: "Using comparisons and branches together." }],
    hints: [
      "Concept Clue: Follow the comment order.",
      "Structure Guide:\n# green -> go, yellow -> slow, else -> stop",
      "Guided Correction: if light == \"green\": go() ... elif ... else ..."
    ],
    starterCode: '# Build the brain:\n# - green -> go()\n# - yellow -> slow()\n# - anything else -> stop()',
    solution: 'if light == "green":\n    go()\nelif light == "yellow":\n    slow()\nelse:\n    stop()',
    variables: ["light"],
    tests: [
      { environment: { light: "green" }, want: "go", label: 'light = "green"' },
      { environment: { light: "yellow" }, want: "slow", label: 'light = "yellow"' },
      { environment: { light: "red" }, want: "stop", label: 'light = "red"' }
    ],
    teacherExplanation: "Final advanced task: build a complete if/elif/else decision brain from comments alone.",
    commonMistakes: ["Putting else before elif", "Missing a branch"],
    studentReflection: "I can build a full decision brain with if/elif/else."
  }
];
