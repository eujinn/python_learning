export const LESSONS = [
  /* =====================================================================
     RECAP (1–4) — intro game: meet Echo the parrot
     ===================================================================== */
  {
    id: 1,
    tier: "recap",
    title: "Meet Echo the Parrot",
    storyProblem: "Welcome to Kindness City! Echo the parrot lives in the output panel. Say hello to start the intro game — the code is ready, just press Run.",
    concept: "print() basics",
    learnFirst: {
      problem: "We want the parrot to repeat our message.",
      knownInfo: "print() is a Python command that shows text on the screen.",
      pythonQuestion: "What goes inside the brackets of print()?",
      whyPath: "Text inside quote marks \"\" is called a string.",
      action: "Press Run to watch print(\"Hello!\") execute step by step.",
      learned: "print() repeats whatever string you put inside the brackets."
    },
    vocabulary: [
      { term: "print()", meaning: "A Python command that shows text on the output screen." },
      { term: "string", meaning: "A piece of text wrapped in quote marks, like \"Hello\"." }
    ],
    hints: [
      "Concept Clue: The code is already written. Look at what is inside print().",
      "Structure Guide:\nJust press ▶ Run step by step.",
      "Guided Correction: The starter code is correct — press ▶ Run."
    ],
    starterCode: 'print("Hello!")',
    solution: 'print("Hello!")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "Hello!" }, label: "Test 1: say hello" }],
    teacherExplanation: "First contact with print(). Students run pre-written code and watch the trace to build confidence.",
    commonMistakes: ["Typing print without brackets", "Forgetting a quote mark"],
    studentReflection: "I can use print() to show a message."
  },
  {
    id: 2,
    tier: "recap",
    title: "Echo Your Name",
    storyProblem: "Echo wants to know you! Put your name inside the quotes so the parrot repeats it.",
    concept: "Custom strings",
    learnFirst: {
      problem: "We want the parrot to say a name.",
      knownInfo: "print(\"message\") shows whatever is inside the quotes.",
      pythonQuestion: "How do we change what the parrot says?",
      whyPath: "Replace the text inside the quotes.",
      action: "Type your name between the quotes, then press Run.",
      learned: "You can put any text inside print() to show your own message."
    },
    vocabulary: [
      { term: "string", meaning: "Any text wrapped in quote marks." },
      { term: "argument", meaning: "The value inside the brackets of print()." }
    ],
    hints: [
      "Concept Clue: Change the text between the quote marks.",
      "Structure Guide:\nprint(\"____\")",
      "Guided Correction: Example: print(\"Sunny\")"
    ],
    starterCode: 'print("____")',
    solution: 'print("Sunny")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", constraints: { mustUse: ["str"] }, label: "Test 1: print a name of your choice" }],
    teacherExplanation: "Open-ended: any name inside a string passes. The sample solution uses \"Sunny\"; students are encouraged to use their own name.",
    commonMistakes: ["Deleting the quotes", "Forgetting the closing bracket"],
    studentReflection: "I can change what print() shows by editing the text inside the quotes."
  },
  {
    id: 3,
    tier: "recap",
    title: "Two Chirps",
    storyProblem: "Echo is excited and chirps twice! Use two print() commands, one after the other.",
    concept: "Multiple print() calls",
    learnFirst: {
      problem: "We need the parrot to say the same thing twice.",
      knownInfo: "Each print() shows one line.",
      pythonQuestion: "How do we make two lines?",
      whyPath: "Python runs code top to bottom, so two print() lines make two lines.",
      action: "Write print(\"Chirp!\") twice, one on each line.",
      learned: "Multiple print() calls show multiple lines in order."
    },
    vocabulary: [{ term: "sequence", meaning: "The order Python runs your commands, top to bottom." }],
    hints: [
      "Concept Clue: Each print() goes on its own line.",
      "Structure Guide:\nprint(\"Chirp!\")\nprint(\"Chirp!\")",
      "Guided Correction: Copy the print line onto a second line."
    ],
    starterCode: 'print("Chirp!")',
    solution: 'print("Chirp!")\nprint("Chirp!")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "Chirp!\nChirp!" }, label: "Test 1: two chirps" }],
    teacherExplanation: "Introduces multi-line programs and count-based checking (print*2).",
    commonMistakes: ["Only one print line", "Forgetting a quote"],
    studentReflection: "I can make the parrot speak more than once."
  },
  {
    id: 4,
    tier: "recap",
    title: "Echo Says Three",
    storyProblem: "Intro game finish line! Make Echo say the number 3. Numbers do not need quotes.",
    concept: "Number arguments",
    learnFirst: {
      problem: "We want the parrot to say a number.",
      knownInfo: "Words need quotes, but numbers can stand alone.",
      pythonQuestion: "Do numbers need quote marks?",
      whyPath: "Numbers are their own data type in Python.",
      action: "Write print(3) with no quotes.",
      learned: "Numbers can go inside print() without quotes."
    },
    vocabulary: [{ term: "integer", meaning: "A whole number like 3 or 42." }],
    hints: [
      "Concept Clue: Numbers do not need quotes.",
      "Structure Guide:\nprint(3)",
      "Guided Correction: Write print(3)."
    ],
    starterCode: 'print("")',
    solution: 'print(3)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "3" }, label: "Test 1: print 3" }],
    teacherExplanation: "First taste of a non-string value. Sets up data types for later lessons.",
    commonMistakes: ["Adding quotes around the number", "Forgetting brackets"],
    studentReflection: "I know numbers can go inside print() without quotes."
  },

  /* =====================================================================
     BASIC (5–10) — core print() and strings
     ===================================================================== */
  {
    id: 5,
    tier: "basic",
    title: "Say Hello",
    storyProblem: "Echo wants a proper greeting. Print the word Hello exactly — capital H, and no exclamation mark.",
    concept: "String output",
    learnFirst: {
      problem: "Print one exact word.",
      knownInfo: "print(\"Hello\") shows Hello.",
      pythonQuestion: "Where does the word go?",
      whyPath: "Inside the quotes, inside the brackets.",
      action: "Write print(\"Hello\") with no exclamation mark.",
      learned: "The text inside quotes is shown exactly."
    },
    vocabulary: [{ term: "string", meaning: "Text wrapped in quote marks." }],
    hints: [
      "Concept Clue: Put Hello inside the quotes — no punctuation after it.",
      "Structure Guide:\nprint(\"Hello\")",
      "Guided Correction: print(\"Hello\") — remove any ! or extra words."
    ],
    starterCode: 'print("")',
    solution: 'print("Hello")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "Hello" }, label: "Test 1: print Hello" }],
    teacherExplanation: "Confirms exact string output before moving to multiple lines.",
    commonMistakes: ["Missing quotes", "Typo in the word"],
    studentReflection: "I can print an exact word."
  },
  {
    id: 6,
    tier: "basic",
    title: "Two Lines",
    storyProblem: "Echo greets the whole city. Print Hello on one line and World on the next.",
    concept: "Two print() lines",
    learnFirst: {
      problem: "Print two lines.",
      knownInfo: "Each print() creates one line.",
      pythonQuestion: "How do we get two lines?",
      whyPath: "Use two print() calls.",
      action: "Write two print() lines.",
      learned: "Two print() calls make two lines."
    },
    vocabulary: [{ term: "line", meaning: "One row of output." }],
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
    teacherExplanation: "Checks order and count of two print calls.",
    commonMistakes: ["Swapping the order", "Only one line"],
    studentReflection: "I can print two lines in order."
  },
  {
    id: 7,
    tier: "basic",
    title: "Say a Number",
    storyProblem: "Echo can count too. Print the number 7 with no quotes.",
    concept: "Number arguments",
    learnFirst: {
      problem: "Print a number.",
      knownInfo: "Numbers do not need quotes.",
      pythonQuestion: "How do we print 7?",
      whyPath: "Put 7 inside print().",
      action: "Write print(7).",
      learned: "Numbers print as-is."
    },
    vocabulary: [{ term: "integer", meaning: "A whole number." }],
    hints: [
      "Concept Clue: No quotes for numbers.",
      "Structure Guide:\nprint(7)",
      "Guided Correction: print(7)"
    ],
    starterCode: 'print("")',
    solution: 'print(7)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "7" }, label: "Test 1: print 7" }],
    teacherExplanation: "Reinforces that numeric literals do not need quotes.",
    commonMistakes: ["Quoting the number", "Wrong number"],
    studentReflection: "I can print numbers without quotes."
  },
  {
    id: 8,
    tier: "basic",
    title: "Two Things at Once",
    storyProblem: "Echo can say two things in one breath. Print the words I and like with a comma between them.",
    concept: "Multiple arguments",
    learnFirst: {
      problem: "Print two words with one command.",
      knownInfo: "print() can take more than one argument.",
      pythonQuestion: "How do we separate the words?",
      whyPath: "A comma separates arguments.",
      action: "Write print(\"I\", \"like\").",
      learned: "A comma separates values and Python adds a space."
    },
    vocabulary: [{ term: "comma", meaning: "The , that separates arguments." }],
    hints: [
      "Concept Clue: Put a comma between the two strings.",
      "Structure Guide:\nprint(\"I\", \"like\")",
      "Guided Correction: print(\"I\", \"like\")"
    ],
    starterCode: 'print("")',
    solution: 'print("I", "like")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "I like" }, label: "Test 1: two arguments" }],
    teacherExplanation: "Introduces multi-argument print and the automatic space.",
    commonMistakes: ["Forgetting the comma", "Putting the comma inside the quotes"],
    studentReflection: "I can give print() more than one thing."
  },
  {
    id: 9,
    tier: "basic",
    title: "Greeting Card",
    storyProblem: "Make a friendly card for a neighbour: print the words Hi and friend! with a comma.",
    concept: "Multiple arguments",
    learnFirst: {
      problem: "Print a friendly two-word greeting.",
      knownInfo: "A comma separates arguments.",
      pythonQuestion: "Which words go inside print()?",
      whyPath: "Two strings, one comma.",
      action: "Write print(\"Hi\", \"friend!\").",
      learned: "Commas join arguments with a space."
    },
    vocabulary: [{ term: "argument", meaning: "A value inside the brackets." }],
    hints: [
      "Concept Clue: Two strings, one comma.",
      "Structure Guide:\nprint(\"Hi\", \"friend!\")",
      "Guided Correction: print(\"Hi\", \"friend!\")"
    ],
    starterCode: 'print("")',
    solution: 'print("Hi", "friend!")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "Hi friend!" }, label: "Test 1: greeting" }],
    teacherExplanation: "Practises two-argument output with punctuation.",
    commonMistakes: ["Missing comma", "Missing exclamation mark"],
    studentReflection: "I can build a friendly greeting with print()."
  },
  {
    id: 10,
    tier: "basic",
    title: "Three Lines",
    storyProblem: "Echo reads the city news in three lines: first, second, third. Print those three words on separate lines.",
    concept: "Multiple print() calls",
    learnFirst: {
      problem: "Print three lines.",
      knownInfo: "Each print() makes one line.",
      pythonQuestion: "How many print() calls do we need?",
      whyPath: "One call per line.",
      action: "Write three print() lines.",
      learned: "Three print() calls make three lines."
    },
    vocabulary: [{ term: "sequence", meaning: "Top-to-bottom order." }],
    hints: [
      "Concept Clue: Three lines need three prints.",
      "Structure Guide:\nprint(\"first\")\nprint(\"second\")\nprint(\"third\")",
      "Guided Correction: Add three print lines."
    ],
    starterCode: 'print("first")',
    solution: 'print("first")\nprint("second")\nprint("third")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "first\nsecond\nthird" }, label: "Test 1: three lines" }],
    teacherExplanation: "Reinforces ordering and count with three calls.",
    commonMistakes: ["Wrong order", "Only two lines"],
    studentReflection: "I can print three lines in order."
  },

  /* =====================================================================
     DEBUG (11–15) — fix syntax mistakes
     ===================================================================== */
  {
    id: 11,
    tier: "debug",
    title: "Missing Quotes",
    storyProblem: "Echo cannot repeat Hello because the word has no quote marks. Fix the code so it prints Hello.",
    concept: "String quotes",
    learnFirst: {
      problem: "The word is not in quotes.",
      knownInfo: "Text needs quote marks.",
      pythonQuestion: "What is missing around Hello?",
      whyPath: "Strings must be wrapped in \"\".",
      action: "Add quotes around Hello.",
      learned: "Unquoted words cause an error."
    },
    vocabulary: [{ term: "bug", meaning: "A mistake that stops the program working." }],
    hints: [
      "Concept Clue: Words need quotes.",
      "Structure Guide:\nprint(\"Hello\")",
      "Guided Correction: Put Hello inside \"\"."
    ],
    starterCode: '# Bug: no quotes around the word\nprint(Hello)',
    solution: 'print("Hello")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "Hello" }, label: "Test 1: fixed" }],
    teacherExplanation: "Debug exercise focused on string syntax.",
    commonMistakes: ["Quoting only one side", "Deleting the brackets"],
    studentReflection: "I can spot a missing quote."
  },
  {
    id: 12,
    tier: "debug",
    title: "Forgot the Closing Quote",
    storyProblem: "The closing quote is missing so Echo gets confused. Fix the line.",
    concept: "Closing quotes",
    learnFirst: {
      problem: "A quote is missing on the right.",
      knownInfo: "Strings need an opening and a closing quote.",
      pythonQuestion: "Which side is missing a quote?",
      whyPath: "Add the missing quote after the word.",
      action: "Close the string with a second quote.",
      learned: "Every string needs both quotes."
    },
    vocabulary: [{ term: "string", meaning: "Text in matching quotes." }],
    hints: [
      "Concept Clue: Count the quotes — there should be two.",
      "Structure Guide:\nprint(\"Hello\")",
      "Guided Correction: Add the quote after Hello."
    ],
    starterCode: '# Bug: the right quote is missing\nprint("Hello)',
    solution: 'print("Hello")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "Hello" }, label: "Test 1: fixed" }],
    teacherExplanation: "Focuses on balanced quotes.",
    commonMistakes: ["Adding a third quote", "Removing the opening quote"],
    studentReflection: "I can fix an unclosed string."
  },
  {
    id: 13,
    tier: "debug",
    title: "Missing Bracket",
    storyProblem: "print needs brackets, but the closing bracket is gone. Repair the command.",
    concept: "Brackets",
    learnFirst: {
      problem: "The command has no closing bracket.",
      knownInfo: "Commands are called with ( ).",
      pythonQuestion: "What is missing at the end?",
      whyPath: "Close the call with ).",
      action: "Add the closing bracket.",
      learned: "Commands need both brackets."
    },
    vocabulary: [{ term: "brackets", meaning: "The ( ) after a command name." }],
    hints: [
      "Concept Clue: Commands end with ).",
      "Structure Guide:\nprint(\"Hello\")",
      "Guided Correction: Add ) at the end."
    ],
    starterCode: '# Bug: missing closing bracket\nprint("Hello"',
    solution: 'print("Hello")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "Hello" }, label: "Test 1: fixed" }],
    teacherExplanation: "Bracket-balancing debug task.",
    commonMistakes: ["Adding a quote instead", "Removing the opening bracket"],
    studentReflection: "I can fix a missing bracket."
  },
  {
    id: 14,
    tier: "debug",
    title: "Missing Comma",
    storyProblem: "Echo should say Hello world, but the two words are not separated. Add the missing comma.",
    concept: "Argument separator",
    learnFirst: {
      problem: "Two strings are stuck together.",
      knownInfo: "Arguments are separated by commas.",
      pythonQuestion: "What goes between the two strings?",
      whyPath: "A comma separates arguments.",
      action: "Add a comma between the strings.",
      learned: "Commas keep arguments separate."
    },
    vocabulary: [{ term: "comma", meaning: "The , between arguments." }],
    hints: [
      "Concept Clue: Put a comma between the two strings.",
      "Structure Guide:\nprint(\"Hello\", \"world\")",
      "Guided Correction: Insert , between \"Hello\" and \"world\"."
    ],
    starterCode: '# Bug: missing comma\nprint("Hello" "world")',
    solution: 'print("Hello", "world")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "Hello world" }, label: "Test 1: fixed" }],
    teacherExplanation: "Separates arguments correctly.",
    commonMistakes: ["Putting the comma inside the quotes"],
    studentReflection: "I know arguments need a comma."
  },
  {
    id: 15,
    tier: "debug",
    title: "Too Many Quotes",
    storyProblem: "There are extra quote marks around the word. Remove the extras so Echo says Hello once.",
    concept: "Quote balance",
    learnFirst: {
      problem: "There are four quotes instead of two.",
      knownInfo: "A string needs exactly two quotes.",
      pythonQuestion: "Which quotes should stay?",
      whyPath: "Keep one opening and one closing quote.",
      action: "Delete the extra quotes.",
      learned: "Extra quotes break the string."
    },
    vocabulary: [{ term: "quote", meaning: "The \" mark around text." }],
    hints: [
      "Concept Clue: Keep exactly two quotes.",
      "Structure Guide:\nprint(\"Hello\")",
      "Guided Correction: Remove the doubled quotes."
    ],
    starterCode: '# Bug: too many quotes\nprint(""Hello"")',
    solution: 'print("Hello")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "Hello" }, label: "Test 1: fixed" }],
    teacherExplanation: "Practises recognizing extra quote marks.",
    commonMistakes: ["Removing all quotes"],
    studentReflection: "I can tidy up quote marks."
  },

  /* =====================================================================
     CHALLENGE (16–18) — apply print() independently
     ===================================================================== */
  {
    id: 16,
    tier: "challenge",
    title: "Three-Word Story",
    storyProblem: "Tell a tiny story in one line. Print The parrot sings with commas between the words.",
    concept: "Multiple arguments",
    learnFirst: {
      problem: "Build one line from three words.",
      knownInfo: "A comma separates each argument.",
      pythonQuestion: "How many arguments do we need?",
      whyPath: "Three strings, two commas.",
      action: "Write print(\"The\", \"parrot\", \"sings\").",
      learned: "Several arguments make one sentence."
    },
    vocabulary: [{ term: "argument", meaning: "A value inside print()." }],
    hints: [
      "Concept Clue: Three words, two commas.",
      "Structure Guide:\nprint(\"The\", \"parrot\", \"sings\")",
      "Guided Correction: Separate each word with a comma."
    ],
    starterCode: '# Your turn: one line, three words\n',
    solution: 'print("The", "parrot", "sings")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "The parrot sings" }, label: "Test 1: one-line story" }],
    teacherExplanation: "Independent application of multi-argument print.",
    commonMistakes: ["Missing commas", "Quotes around the commas"],
    studentReflection: "I can build a sentence with several arguments."
  },
  {
    id: 17,
    tier: "challenge",
    title: "News Report",
    storyProblem: "Echo reports the news in two lines: Echo News: then The sky is blue.",
    concept: "Two print() lines",
    learnFirst: {
      problem: "Print a two-line report.",
      knownInfo: "One print per line.",
      pythonQuestion: "How do we split the report?",
      whyPath: "Use two print() calls.",
      action: "Write two print() lines.",
      learned: "Two calls make a two-line report."
    },
    vocabulary: [{ term: "line", meaning: "One row of output." }],
    hints: [
      "Concept Clue: Two lines need two prints.",
      "Structure Guide:\nprint(\"Echo News:\")\nprint(\"The sky is blue.\")",
      "Guided Correction: Add the second print line."
    ],
    starterCode: '# Your turn: two-line report\n',
    solution: 'print("Echo News:")\nprint("The sky is blue.")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "Echo News:\nThe sky is blue." }, label: "Test 1: report" }],
    teacherExplanation: "Combines ordering with exact text.",
    commonMistakes: ["One print with a comma", "Wrong order"],
    studentReflection: "I can print a two-line report."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Count Up",
    storyProblem: "Echo counts 1, 2, 3 — one number per line, no quotes.",
    concept: "Number printing",
    learnFirst: {
      problem: "Print three numbers on separate lines.",
      knownInfo: "Numbers do not need quotes.",
      pythonQuestion: "How many print calls for three numbers?",
      whyPath: "One call per number.",
      action: "Write three print() lines with 1, 2, 3.",
      learned: "Numbers print cleanly without quotes."
    },
    vocabulary: [{ term: "integer", meaning: "A whole number." }],
    hints: [
      "Concept Clue: Three numbers, three prints.",
      "Structure Guide:\nprint(1)\nprint(2)\nprint(3)",
      "Guided Correction: Print 1, then 2, then 3 on separate lines."
    ],
    starterCode: '# Your turn: count 1, 2, 3\n',
    solution: 'print(1)\nprint(2)\nprint(3)',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "1\n2\n3" }, label: "Test 1: count up" }],
    teacherExplanation: "Applies number printing across multiple lines.",
    commonMistakes: ["Quoting the numbers", "Wrong order"],
    studentReflection: "I can print numbers in order."
  },

  /* =====================================================================
     ADVANCED (19–20) — minimal hints, comment-guided
     ===================================================================== */
  {
    id: 19,
    tier: "advanced",
    title: "Echo's Song",
    storyProblem: "Compose a three-line song for Echo. Read the comment in the editor — that is your only guide.",
    concept: "print() composition",
    learnFirst: {
      problem: "Write a three-line song from a comment clue.",
      knownInfo: "Use print() once per line.",
      pythonQuestion: "What are the three lines?",
      whyPath: "The comment names them in order.",
      action: "Print the three lines exactly as described.",
      learned: "I can turn a written plan into print() calls."
    },
    vocabulary: [{ term: "comment", meaning: "A note for humans starting with #; Python ignores it." }],
    hints: [
      "Concept Clue: Follow the comment in the editor.",
      "Structure Guide:\n# 3 lines\ngoal: La la la! / Echo sings! / La la la!",
      "Guided Correction: Three print() lines, top to bottom."
    ],
    starterCode: '# Song (in order):\n# 1) La la la!\n# 2) Echo sings!\n# 3) La la la!',
    solution: 'print("La la la!")\nprint("Echo sings!")\nprint("La la la!")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "La la la!\nEcho sings!\nLa la la!" }, label: "Test 1: song" }],
    teacherExplanation: "Advanced: students translate a commented plan into ordered print calls with minimal scaffolding.",
    commonMistakes: ["Wrong line order", "Missing punctuation"],
    studentReflection: "I can follow a plan and write the matching print() lines."
  },
  {
    id: 20,
    tier: "advanced",
    title: "Final Broadcast",
    storyProblem: "Echo closes the show with a four-line broadcast. The comment lists the lines — build it yourself.",
    concept: "print() composition",
    learnFirst: {
      problem: "Write a four-line broadcast from a comment.",
      knownInfo: "One print per line.",
      pythonQuestion: "What order do the lines go in?",
      whyPath: "The comment gives the order.",
      action: "Write four print() calls matching the comment.",
      learned: "I can compose a longer ordered output."
    },
    vocabulary: [{ term: "sequence", meaning: "Order from top to bottom." }],
    hints: [
      "Concept Clue: The comment lists four lines.",
      "Structure Guide:\n# 4 lines, one print each",
      "Guided Correction: Four print() lines in the given order."
    ],
    starterCode: '# Broadcast:\n# 1) Good night!\n# 2) Stay kind.\n# 3) Love the Earth.\n# 4) See you tomorrow!',
    solution: 'print("Good night!")\nprint("Stay kind.")\nprint("Love the Earth.")\nprint("See you tomorrow!")',
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*4", expect: { stdout: "Good night!\nStay kind.\nLove the Earth.\nSee you tomorrow!" }, label: "Test 1: broadcast" }],
    teacherExplanation: "Final advanced task: translate a multi-line plan into print calls with only comments as hints.",
    commonMistakes: ["Skipping a line", "Wrong order"],
    studentReflection: "I can build a four-line broadcast using print()."
  }
];
