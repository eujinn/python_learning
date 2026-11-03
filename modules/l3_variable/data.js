export const LESSONS = [
  /* =====================================================================
     RECAP (1–4) — refresh on print() from Lesson 1
     ===================================================================== */
  {
    id: 1,
    tier: "recap",
    title: "Repeat a Message",
    storyProblem: "Welcome to the Variable Vault! First, a quick recap of print(). Echo the parrot sends a greeting — make it repeat Hello.",
    concept: "print() recap",
    learnFirst: {
      problem: "Print the word Hello.",
      knownInfo: "print(\"Hello\") shows Hello on screen.",
      pythonQuestion: "Where does Hello go?",
      whyPath: "Inside the quotes, inside the brackets.",
      action: "Write print(\"Hello\").",
      learned: "print() shows whatever is inside the quotes."
    },
    vocabulary: [
      { term: "print()", meaning: "Shows text on the screen." },
      { term: "string", meaning: "Text in quote marks." }
    ],
    hints: [
      "Concept Clue: Put Hello inside the quotes.",
      "Structure Guide:\nprint(\"Hello\")",
      "Guided Correction: Write print(\"Hello\") on its own line."
    ],
    starterCode: 'print("____")',
    solution: 'print("Hello")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "Hello" }, label: "Test 1: recap print" }],
    teacherExplanation: "Warm-up recap: a simple print() before diving into variables.",
    commonMistakes: ["Missing quotes", "Typo in message"],
    studentReflection: "I can recall how print() works."
  },
  {
    id: 2,
    tier: "recap",
    title: "Two Recaps",
    storyProblem: "Print two words, each on its own line: Hello and World.",
    concept: "Multiple print() calls",
    learnFirst: {
      problem: "Print two separate lines.",
      knownInfo: "Each print() makes one line.",
      pythonQuestion: "How do we get two lines?",
      whyPath: "Two print() calls, one per line.",
      action: "Write two print() lines.",
      learned: "Two prints make two lines."
    },
    vocabulary: [{ term: "sequence", meaning: "Top-to-bottom order." }],
    hints: [
      "Concept Clue: One print per line.",
      "Structure Guide:\nprint(\"Hello\")\nprint(\"World\")",
      "Guided Correction: Add a second print line."
    ],
    starterCode: 'print("Hello")',
    solution: 'print("Hello")\nprint("World")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "Hello\nWorld" }, label: "Test 1: two lines" }],
    teacherExplanation: "Reminder of multi-line print sequencing.",
    commonMistakes: ["Only one line", "Wrong order"],
    studentReflection: "I can print two lines."
  },
  {
    id: 3,
    tier: "recap",
    title: "Print a Number",
    storyProblem: "Numbers do not need quotes. Print the number 10.",
    concept: "Number printing recap",
    learnFirst: {
      problem: "Print a number.",
      knownInfo: "print(10) shows 10.",
      pythonQuestion: "Do numbers need quotes?",
      whyPath: "Numbers can go straight inside print().",
      action: "Write print(10).",
      learned: "Numbers print without quotes."
    },
    vocabulary: [{ term: "integer", meaning: "A whole number." }],
    hints: [
      "Concept Clue: No quotes for numbers.",
      "Structure Guide:\nprint(10)",
      "Guided Correction: print(10)"
    ],
    starterCode: 'print("")',
    solution: 'print(10)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "10" }, label: "Test 1: print 10" }],
    teacherExplanation: "Quick number-printing recap.",
    commonMistakes: ["Quoting the number"],
    studentReflection: "I can print numbers without quotes."
  },
  {
    id: 4,
    tier: "recap",
    title: "Print Three Things",
    storyProblem: "Use three print() calls to print: 1, 2, 3 — each on its own line.",
    concept: "Sequence recap",
    learnFirst: {
      problem: "Print three numbers in order.",
      knownInfo: "One print per line.",
      pythonQuestion: "How many print calls?",
      whyPath: "Use three print() lines.",
      action: "Write three print() lines.",
      learned: "Multiple lines in order."
    },
    vocabulary: [{ term: "sequence", meaning: "Order from top to bottom." }],
    hints: [
      "Concept Clue: Three lines = three prints.",
      "Structure Guide:\nprint(1)\nprint(2)\nprint(3)",
      "Guided Correction: One print per number."
    ],
    starterCode: 'print(1)',
    solution: 'print(1)\nprint(2)\nprint(3)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "1\n2\n3" }, label: "Test 1: count to 3" }],
    teacherExplanation: "Multi-line recap to warm up before variables.",
    commonMistakes: ["Wrong order", "Only two lines"],
    studentReflection: "I can print a sequence."
  },

  /* =====================================================================
     BASIC (5–10) — core variable concept
     ===================================================================== */
  {
    id: 5,
    tier: "basic",
    title: "Store a Value",
    storyProblem: "Variables are labeled boxes. Store the number 0 in a box called score, then print(score) to look inside.",
    concept: "Variable = Value",
    learnFirst: {
      problem: "Store a number so the computer remembers it.",
      knownInfo: "A variable is a box with a name: name = value.",
      pythonQuestion: "How do we store 0 in a box called score?",
      whyPath: "The = sign saves the value on the right into the box on the left.",
      action: "Write score = 0, then print(score).",
      learned: "name = value stores a value in a variable."
    },
    vocabulary: [
      { term: "variable", meaning: "A labeled box that stores a value." },
      { term: "assignment", meaning: "Using = to put a value into a variable." }
    ],
    hints: [
      "Concept Clue: score = 0 stores the number 0 in the box named score.",
      "Structure Guide:\nscore = 0\nprint(score)",
      "Guided Correction: Write score = 0 on line 1, then print(score) on line 2."
    ],
    starterCode: 'score = ____\nprint(____)',
    solution: 'score = 0\nprint(score)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { score: 0 }, stdout: "0" }, label: "Test 1: store and print score" }],
    teacherExplanation: "First variable assignment. Students store 0 in score and print it.",
    commonMistakes: ["Using == instead of =", "Forgetting to print", "Typo in variable name"],
    studentReflection: "I can store a value in a variable using name = value."
  },
  {
    id: 6,
    tier: "basic",
    title: "Change the Value",
    storyProblem: "Variables can change! Store 1 in lives, then change it to 3. Print(lives) at the end to see the new value.",
    concept: "Reassignment",
    learnFirst: {
      problem: "Put a new value into the same box.",
      knownInfo: "Assigning a new value replaces the old one.",
      pythonQuestion: "What does print(lives) show after reassignment?",
      whyPath: "The last assignment wins.",
      action: "Set lives = 1 then lives = 3, then print(lives).",
      learned: "Reassigning = overwrites the old value."
    },
    vocabulary: [{ term: "reassign", meaning: "To give a variable a new value." }],
    hints: [
      "Concept Clue: Write lives = 1, then lives = 3 on the next line. The latest value wins.",
      "Structure Guide:\nlives = 1\nlives = 3\nprint(lives)",
      "Guided Correction: Three lines, with the second assignment using = not ==."
    ],
    starterCode: 'lives = ____\nlives = ____\nprint(____)',
    solution: 'lives = 1\nlives = 3\nprint(lives)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { lives: 3 }, stdout: "3" }, label: "Test 1: reassign lives" }],
    teacherExplanation: "Variable reassignment: overwriting shows the latest value wins.",
    commonMistakes: ["Using == for assignment", "Printing before the second assignment"],
    studentReflection: "I can change a variable's value by assigning a new one."
  },
  {
    id: 7,
    tier: "basic",
    title: "Store a Name",
    storyProblem: "Variables can store words too! Store your hero's name in hero and print it.",
    concept: "String variables",
    learnFirst: {
      problem: "Store text in a variable.",
      knownInfo: "Text needs quote marks.",
      pythonQuestion: "What goes around the hero name?",
      whyPath: "Strings need \"\" around them.",
      action: "Write hero = \"Nova\", then print(hero).",
      learned: "Text values go in quotes even inside a variable."
    },
    vocabulary: [{ term: "string", meaning: "Text wrapped in quotes." }],
    hints: [
      "Concept Clue: hero = \"Nova\" — quotes around the name.",
      "Structure Guide:\nhero = \"Nova\"\nprint(hero)",
      "Guided Correction: Put quotes around the word."
    ],
    starterCode: 'hero = "____"\nprint(____)',
    solution: 'hero = "Nova"\nprint(hero)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { hero: "Nova" }, stdout: "Nova" }, label: "Test 1: string variable" }],
    teacherExplanation: "String assignment with a variable name hint.",
    commonMistakes: ["Forgetting quotes around the string", "Putting quotes around the number"],
    studentReflection: "I can store text in a variable using quotes."
  },
  {
    id: 8,
    tier: "basic",
    title: "Two Variables",
    storyProblem: "Store a name and a number. Create a variable item with \"Key\" and a variable count with 2. Print both.",
    concept: "Multiple variables",
    learnFirst: {
      problem: "Store two different values.",
      knownInfo: "Each variable is its own box.",
      pythonQuestion: "How do we use two variables?",
      whyPath: "Assign each one, then print each one.",
      action: "Write item = \"Key\", count = 2, then print(item) and print(count).",
      learned: "Different variables hold different values."
    },
    vocabulary: [{ term: "multiple", meaning: "More than one." }],
    hints: [
      "Concept Clue: Two names, two values. item has a string, count has a number.",
      "Structure Guide:\nitem = \"Key\"\ncount = 2\nprint(item)\nprint(count)",
      "Guided Correction: Strings need quotes, numbers do not."
    ],
    starterCode: 'item = "____"\ncount = ____\nprint(____)\nprint(____)',
    solution: 'item = "Key"\ncount = 2\nprint(item)\nprint(count)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print+", expect: { vars: { item: "Key", count: 2 } }, label: "Test 1: two variables" }],
    teacherExplanation: "Students create and print two distinct variables — one string, one integer.",
    commonMistakes: ["Only printing one", "Wrong type (quotes around number)"],
    studentReflection: "I can create and print more than one variable."
  },
  {
    id: 9,
    tier: "basic",
    title: "Use a Variable in Print",
    storyProblem: "You can print more than just the variable name. Store greeting = \"Hi\" and print greeting and \"friend!\" together with a comma: print(greeting, \"friend!\").",
    concept: "Variable + literal in print()",
    learnFirst: {
      problem: "Print a variable and extra text together.",
      knownInfo: "A comma separates arguments in print().",
      pythonQuestion: "Can we mix a variable and a string?",
      whyPath: "Use a comma between the variable and the string.",
      action: "Write greeting = \"Hi\", then print(greeting, \"friend!\").",
      learned: "A variable and a literal string can be arguments together."
    },
    vocabulary: [{ term: "argument", meaning: "A value passed to a command." }],
    hints: [
      "Concept Clue: Put the variable and the string with a comma.",
      "Structure Guide:\ngreeting = \"Hi\"\nprint(greeting, \"friend!\")",
      "Guided Correction: No quotes around the variable name."
    ],
    starterCode: 'greeting = "____"\nprint(____, "____")',
    solution: 'greeting = "Hi"\nprint(greeting, "friend!")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { greeting: "Hi" }, stdout: "Hi friend!" }, label: "Test 1: variable + text" }],
    teacherExplanation: "Students combine a variable reference with a literal string using commas.",
    commonMistakes: ["Quoting the variable name", "Missing comma"],
    studentReflection: "I can print a variable alongside other text."
  },
  {
    id: 10,
    tier: "basic",
    title: "Three Variables",
    storyProblem: "Create three variables: a = 1, b = 2, c = 3. Print all three, each on its own line.",
    concept: "Multiple variables + print",
    learnFirst: {
      problem: "Create and print three variables.",
      knownInfo: "Each assignment stores one value.",
      pythonQuestion: "How do we show all three?",
      whyPath: "Three print() calls, one per variable.",
      action: "Assign a, b, c, then print each on its own line.",
      learned: "Variables store independent values."
    },
    vocabulary: [{ term: "assignment", meaning: "name = value puts a value into a box." }],
    hints: [
      "Concept Clue: Three variables, then three prints.",
      "Structure Guide:\na = 1\nb = 2\nc = 3\nprint(a)\nprint(b)\nprint(c)",
      "Guided Correction: One assignment per line, then one print per variable."
    ],
    starterCode: 'a = ____\nb = ____\nc = ____\nprint(____)\nprint(____)\nprint(____)',
    solution: 'a = 1\nb = 2\nc = 3\nprint(a)\nprint(b)\nprint(c)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { vars: { a: 1, b: 2, c: 3 }, stdout: "1\n2\n3" }, label: "Test 1: three values" }],
    teacherExplanation: "Reinforces multiple independent variables and print sequencing.",
    commonMistakes: ["Wrong assignment order", "Only two prints"],
    studentReflection: "I can work with several variables at once."
  },

  /* =====================================================================
     DEBUG (11–15) — fix common variable mistakes
     ===================================================================== */
  {
    id: 11,
    tier: "debug",
    title: "Comparing Instead of Assigning",
    storyProblem: "The code uses == instead of = to store a value. Fix it so score stores 5.",
    concept: "= vs ==",
    learnFirst: {
      problem: "You need to store, not compare.",
      knownInfo: "= stores, == checks.",
      pythonQuestion: "Which one stores a value?",
      whyPath: "One equals sign saves the value.",
      action: "Change == to =.",
      learned: "Use one = to store, two == to compare."
    },
    vocabulary: [{ term: "assignment", meaning: "Using = to store a value." }],
    hints: [
      "Concept Clue: Assignment uses one =.",
      "Structure Guide:\nscore = 5\nprint(score)",
      "Guided Correction: Change == to =."
    ],
    starterCode: '# Bug: double equals\nscore == 5\nprint(score)',
    solution: 'score = 5\nprint(score)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { score: 5 }, stdout: "5" }, label: "Test 1: fix ==" }],
    teacherExplanation: "Students fix the most common beginner variable mistake: == vs =.",
    commonMistakes: ["Still using ==", "Changing print line too"],
    studentReflection: "I know one = stores a value."
  },
  {
    id: 12,
    tier: "debug",
    title: "Variable Name Typo",
    storyProblem: "The variable is created as my_name but print reads myname. Fix the spelling so they match.",
    concept: "Consistent variable names",
    learnFirst: {
      problem: "The print refers to a variable that does not exist.",
      knownInfo: "Variable names must match exactly.",
      pythonQuestion: "Which name is misspelled?",
      whyPath: "Fix myname to my_name in the print.",
      action: "Change print(myname) to print(my_name).",
      learned: "Variable names must be spelled the same everywhere."
    },
    vocabulary: [{ term: "typo", meaning: "A spelling mistake in the code." }],
    hints: [
      "Concept Clue: Check that the variable name inside print( ) matches the assigned name.",
      "Structure Guide:\nmy_name = \"Alex\"\nprint(my_name)",
      "Guided Correction: Add the underscore: my_name."
    ],
    starterCode: '# Bug: mismatched name\nmy_name = "Alex"\nprint(myname)',
    solution: 'my_name = "Alex"\nprint(my_name)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { my_name: "Alex" }, stdout: "Alex" }, label: "Test 1: fix name" }],
    teacherExplanation: "Variable name consistency: the printed name must match the assigned name exactly.",
    commonMistakes: ["Renaming the variable instead", "Adding a new variable"],
    studentReflection: "I can spot a mismatched variable name."
  },
  {
    id: 13,
    tier: "debug",
    title: "Missing Print Arguments",
    storyProblem: "print() has its brackets empty. It should show the value of gold. Fix the print.",
    concept: "print() arguments",
    learnFirst: {
      problem: "print has nothing inside its brackets.",
      knownInfo: "print() needs something to show.",
      pythonQuestion: "What belongs inside the brackets?",
      whyPath: "Put the variable name gold inside print().",
      action: "Change print() to print(gold).",
      learned: "print() needs a value or variable inside."
    },
    vocabulary: [{ term: "argument", meaning: "What goes inside the brackets." }],
    hints: [
      "Concept Clue: Put gold inside the brackets of print().",
      "Structure Guide:\ngold = 50\nprint(gold)",
      "Guided Correction: Add gold inside ( )."
    ],
    starterCode: '# Bug: empty print\ngold = 50\nprint()',
    solution: 'gold = 50\nprint(gold)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { gold: 50 }, stdout: "50" }, label: "Test 1: fix print" }],
    teacherExplanation: "Empty print brackets are a common slip.",
    commonMistakes: ["Printing a string instead", "Forgetting to keep gold"],
    studentReflection: "I can fix an empty print()."
  },
  {
    id: 14,
    tier: "debug",
    title: "Wrong Assignment Order",
    storyProblem: "The code prints x before x has a value. Swap the lines so x is assigned first, then printed.",
    concept: "Assignment order",
    learnFirst: {
      problem: "You must store a value before reading it.",
      knownInfo: "Code runs top to bottom.",
      pythonQuestion: "Which line should come first?",
      whyPath: "The assignment must be before the print.",
      action: "Move x = 10 above print(x).",
      learned: "Assign before you print."
    },
    vocabulary: [{ term: "order", meaning: "The sequence lines run top to bottom." }],
    hints: [
      "Concept Clue: You cannot print x before it has a value.",
      "Structure Guide:\nx = 10\nprint(x)",
      "Guided Correction: Move x = 10 to line 1."
    ],
    starterCode: '# Bug: print before assign\nprint(x)\nx = 10',
    solution: 'x = 10\nprint(x)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { x: 10 }, stdout: "10" }, label: "Test 1: fix order" }],
    teacherExplanation: "Students reorder lines to put assignment before usage.",
    commonMistakes: ["Changing the variable name", "Removing the print"],
    studentReflection: "I know the assignment must come before print()."
  },
  {
    id: 15,
    tier: "debug",
    title: "String Without Quotes",
    storyProblem: "greeting is supposed to hold the text Hi but there are no quotes around Hi. Fix the assignment.",
    concept: "String quotes in assignment",
    learnFirst: {
      problem: "The text needs quotes.",
      knownInfo: "Words in Python must be in quote marks.",
      pythonQuestion: "What is missing around Hi?",
      whyPath: "Strings need \"\" around them.",
      action: "Add quotes around Hi.",
      learned: "Text values must be quoted even in assignments."
    },
    vocabulary: [{ term: "string", meaning: "Text wrapped in quotes." }],
    hints: [
      "Concept Clue: Add quotes around Hi.",
      "Structure Guide:\ngreeting = \"Hi\"\nprint(greeting)",
      "Guided Correction: Put Hi inside \"\"."
    ],
    starterCode: '# Bug: no quotes\ngreeting = Hi\nprint(greeting)',
    solution: 'greeting = "Hi"\nprint(greeting)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { greeting: "Hi" }, stdout: "Hi" }, label: "Test 1: fix quotes" }],
    teacherExplanation: "Unquoted string literals in assignments.",
    commonMistakes: ["Adding quotes only on one side"],
    studentReflection: "I know strings need quotes in assignments too."
  },

  /* =====================================================================
     CHALLENGE (16–18) — independent variable use
     ===================================================================== */
  {
    id: 16,
    tier: "challenge",
    title: "Store, Change, Print",
    storyProblem: "Store 100 in points. Then change points to 150. Print points to confirm.",
    concept: "Variable change tracking",
    learnFirst: {
      problem: "Track a changing value.",
      knownInfo: "Assign, reassign, then print.",
      pythonQuestion: "What does points equal at the end?",
      whyPath: "150 overwrites 100, so print shows 150.",
      action: "Write three lines: assign, reassign, print.",
      learned: "The last assigned value is what prints."
    },
    vocabulary: [{ term: "reassign", meaning: "Overwrite a variable with a new value." }],
    hints: [
      "Concept Clue: Assign 100, then change to 150, then print.",
      "Structure Guide:\npoints = 100\npoints = 150\nprint(points)",
      "Guided Correction: Three lines in that order."
    ],
    starterCode: '# Your turn: store, change, print\n',
    solution: 'points = 100\npoints = 150\nprint(points)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { points: 150 }, stdout: "150" }, label: "Test 1: points" }],
    teacherExplanation: "Independently apply assignment and reassignment.",
    commonMistakes: ["Using == somewhere", "Wrong final value"],
    studentReflection: "I can track a changing variable."
  },
  {
    id: 17,
    tier: "challenge",
    title: "Two Strings",
    storyProblem: "Create two variables: first = \"Kind\" and last = \"City\". Print them together: print(first, last).",
    concept: "Multiple string variables",
    learnFirst: {
      problem: "Print two string variables together.",
      knownInfo: "Commas separate arguments in print().",
      pythonQuestion: "What do we put inside print()?",
      whyPath: "The two variable names with a comma.",
      action: "Assign first, last, then print(first, last).",
      learned: "Two variables can be printed on one line."
    },
    vocabulary: [{ term: "argument", meaning: "A value inside brackets." }],
    hints: [
      "Concept Clue: print(first, last) shows both.",
      "Structure Guide:\nfirst = \"Kind\"\nlast = \"City\"\nprint(first, last)",
      "Guided Correction: No quotes around the variable names."
    ],
    starterCode: '# Your turn: two strings\n',
    solution: 'first = "Kind"\nlast = "City"\nprint(first, last)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { first: "Kind", last: "City" }, stdout: "Kind City" }, label: "Test 1: two strings" }],
    teacherExplanation: "Students combine two string variables with a comma.",
    commonMistakes: ["Quoting the variable names", "Wrong order"],
    studentReflection: "I can print two string variables together."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Room Inventory",
    storyProblem: "A room has a name and a light level. Store room = \"Library\" and light = 3. Print them on separate lines.",
    concept: "Variables with print lines",
    learnFirst: {
      problem: "Print two variables on separate lines.",
      knownInfo: "One print per line.",
      pythonQuestion: "How many print lines for two variables?",
      whyPath: "Two print() calls, one per variable.",
      action: "Assign room and light, then print each on its own line.",
      learned: "Multiple prints make multiple lines."
    },
    vocabulary: [{ term: "line", meaning: "One row of output." }],
    hints: [
      "Concept Clue: Two prints, one per variable.",
      "Structure Guide:\nroom = \"Library\"\nlight = 3\nprint(room)\nprint(light)",
      "Guided Correction: Assign first, then print each on its own line."
    ],
    starterCode: '# Your turn: room and light\n',
    solution: 'room = "Library"\nlight = 3\nprint(room)\nprint(light)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { vars: { room: "Library", light: 3 }, stdout: "Library\n3" }, label: "Test 1: inventory" }],
    teacherExplanation: "Independently create two variables and print each on a separate line.",
    commonMistakes: ["Only one print line", "Wrong variable order"],
    studentReflection: "I can use two variables in a multi-line output."
  },

  /* =====================================================================
     ADVANCED (19–20) — comment-guided, minimal hints
     ===================================================================== */
  {
    id: 19,
    tier: "advanced",
    title: "Three Items",
    storyProblem: "Read the comments and create three variables that match their descriptions.",
    concept: "Multi-variable composition",
    learnFirst: {
      problem: "Follow the comments to create three variables.",
      knownInfo: "Each line assigns one variable.",
      pythonQuestion: "What value does each comment describe?",
      whyPath: "Read each comment and write the matching assignment.",
      action: "Follow the comments in the editor.",
      learned: "I can create variables from written instructions."
    },
    vocabulary: [{ term: "comment", meaning: "A note for humans, starts with #." }],
    hints: [
      "Concept Clue: Each comment describes what to store.",
      "Structure Guide:\n# A number:\ndistance = 10\n# A name:\nname = \"Sun\"\n# Another number:\ncount = 5",
      "Guided Correction: Three assignments, then print the name."
    ],
    starterCode: '# Assignments:\n# 1) A number: distance\n# 2) A word: name\n# 3) Another number: count\n# Then print the name variable',
    solution: 'distance = 10\nname = "Sun"\ncount = 5\nprint(name)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { distance: 10, name: "Sun", count: 5 }, stdout: "Sun" }, label: "Test 1: three items" }],
    teacherExplanation: "Advanced: follow a commented plan to create three variables with correct types.",
    commonMistakes: ["Wrong variable type", "Not printing"],
    studentReflection: "I can build variables from a written plan."
  },
  {
    id: 20,
    tier: "advanced",
    title: "Final Vault Challenge",
    storyProblem: "The comments tell you the plan: store a city name, change it, store a number, change it, and print both at the end.",
    concept: "Mixed types + reassignment",
    learnFirst: {
      problem: "Follow the full plan: assign, reassign, then print.",
      knownInfo: "Variables can hold strings or numbers.",
      pythonQuestion: "What do the comments ask you to do?",
      whyPath: "Read each comment and write the line it describes.",
      action: "Follow the comments in the editor.",
      learned: "I can follow a multi-step plan with variables."
    },
    vocabulary: [{ term: "reassign", meaning: "Give a variable a new value." }],
    hints: [
      "Concept Clue: Follow each comment step by step.",
      "Structure Guide:\n# Step comments tell you exactly what to write.",
      "Guided Correction: Check the comments one by one."
    ],
    starterCode: '# Vault Challenge:\n# 1) Store \"Kindness\" in city\n# 2) Change city to \"Kindness City\"\n# 3) Store 5 in zones\n# 4) Change zones to 7\n# 5) Print city and zones, with a comma',
    solution: 'city = "Kindness"\ncity = "Kindness City"\nzones = 5\nzones = 7\nprint(city, zones)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { vars: { city: "Kindness City", zones: 7 }, stdout: "Kindness City 7" }, label: "Test 1: vault challenge" }],
    teacherExplanation: "Final advanced task: mix string and integer assignments, reassignments, and a combined print of both.",
    commonMistakes: ["Wrong final value", "Printing too early"],
    studentReflection: "I can follow a multi-step variable plan."
  }
];
