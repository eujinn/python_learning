/* While Loop Challenge — Cyber Rover Harvester (Lesson 17)
   20-exercise backbone:
     recap 1-4  → Lesson 16 while-loop refresher
     basic 5-10 → harvesting while loops
     debug 11-15→ repair while syntax/logic
     challenge 16-18 → independent rover missions
     advanced 19-20 → comment-guided missions */

export const LESSONS = [
  /* ============================ RECAP (1–4) ============================ */
  {
    id: 1,
    tier: "recap",
    title: "Recap: Count with while",
    storyProblem: "Warm up with Lesson 16's while loop. Print 0, 1, 2 with i = 0 while i < 3.",
    concept: "while recap",
    learnFirst: {
      problem: "Repeat a print three times with while.",
      knownInfo: "while i < 3: repeats.",
      pythonQuestion: "What does print(i) show?",
      whyPath: "i takes 0,1,2.",
      action: "Print and increase i inside the loop.",
      learned: "A while loop repeats while its condition is True."
    },
    vocabulary: [{ term: "while", meaning: "Repeat while a condition is True." }],
    hints: [
      "Concept Clue: increase i inside the loop.",
      "Structure Guide:\ni = 0\nwhile i < 3:\n    print(i)\n    i = i + 1",
      "Guided Correction: Don't forget the increment."
    ],
    starterCode: `i = 0
while i < 3:
    print(i)
    i = i + 1`,
    solution: `i = 0
while i < 3:
    print(i)
    i = i + 1`,
    variables: ["i"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "0\n1\n2", vars: { i: 3 } }, label: "count 0-2" }],
    teacherExplanation: "Recap while counters.",
    commonMistakes: ["No increment", "Missing colon"],
    studentReflection: "I remember while loops."
  },
  {
    id: 2,
    tier: "recap",
    title: "Recap: Loop a Command",
    storyProblem: "Collect twice with a while loop: crystals = 0 while crystals < 2.",
    concept: "while with a command",
    learnFirst: {
      problem: "Repeat collect twice.",
      knownInfo: "while crystals < 2 repeats twice.",
      pythonQuestion: "When does it stop?",
      whyPath: "crystals reaches 2.",
      action: "collect and increase inside the loop.",
      learned: "A command can repeat in a while loop."
    },
    vocabulary: [{ term: "count", meaning: "How many times." }],
    hints: [
      "Concept Clue: while crystals < 2.",
      "Structure Guide:\nwhile crystals < 2:\n    collect()\n    crystals = crystals + 1",
      "Guided Correction: Increase crystals inside."
    ],
    starterCode: `crystals = 0
while crystals < 2:
    collect()
    crystals = crystals + 1`,
    solution: `crystals = 0
while crystals < 2:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "collect*2", expect: { vars: { crystals: 2 } }, label: "collect twice" }],
    teacherExplanation: "Recap a command inside while.",
    commonMistakes: ["No increment"],
    studentReflection: "I can repeat a command with while."
  },
  {
    id: 3,
    tier: "recap",
    title: "Recap: Countdown",
    storyProblem: "Print 3, 2, 1 with fuel = 3 while fuel > 0, decreasing fuel.",
    concept: "decrement recap",
    learnFirst: {
      problem: "Count down to 0.",
      knownInfo: "Subtract 1 each pass.",
      pythonQuestion: "When does it stop?",
      whyPath: "fuel reaches 0.",
      action: "Print fuel, then subtract.",
      learned: "A counter can count down."
    },
    vocabulary: [{ term: "decrement", meaning: "Subtract 1." }],
    hints: [
      "Concept Clue: fuel = fuel - 1 inside.",
      "Structure Guide:\nwhile fuel > 0:\n    print(fuel)\n    fuel = fuel - 1",
      "Guided Correction: Subtract inside the loop."
    ],
    starterCode: `fuel = 3
while fuel > 0:
    print(fuel)
    fuel = fuel - 1`,
    solution: `fuel = 3
while fuel > 0:
    print(fuel)
    fuel = fuel - 1`,
    variables: ["fuel"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "3\n2\n1", vars: { fuel: 0 } }, label: "countdown" }],
    teacherExplanation: "Recap decrement.",
    commonMistakes: ["Adding instead"],
    studentReflection: "I can count down with while."
  },
  {
    id: 4,
    tier: "recap",
    title: "Recap: Loop Then Beacon",
    storyProblem: "Collect twice in a while loop, then fire beacon() after the loop.",
    concept: "loop + post action recap",
    learnFirst: {
      problem: "Repeat, then finish once.",
      knownInfo: "Un-indented lines run after the loop.",
      pythonQuestion: "Where is beacon()?",
      whyPath: "After the loop.",
      action: "Loop collect twice, then beacon().",
      learned: "Finish a loop with a single command."
    },
    vocabulary: [{ term: "post-loop", meaning: "Commands after the loop." }],
    hints: [
      "Concept Clue: beacon() is not indented.",
      "Structure Guide:\nwhile i < 2:\n    collect()\n    i = i + 1\nbeacon()",
      "Guided Correction: Put beacon at the left edge."
    ],
    starterCode: `i = 0
while i < 2:
    collect()
    i = i + 1`,
    solution: `i = 0
while i < 2:
    collect()
    i = i + 1
beacon()`,
    variables: ["i"],
    base: {},
    tests: [{ environment: {}, want: "beacon", expect: { vars: { i: 2 } }, label: "loop then beacon" }],
    teacherExplanation: "Recap post-loop commands.",
    commonMistakes: ["Indenting beacon"],
    studentReflection: "I can finish a loop with beacon."
  },

  /* ============================ BASIC (5–10) =========================== */
  {
    id: 5,
    tier: "basic",
    title: "Harvester Protocol",
    storyProblem: "Collect 3 crystals: crystals = 0 while crystals < 3, collecting and increasing each pass.",
    concept: "while harvesting",
    learnFirst: {
      problem: "Collect until 3 crystals.",
      knownInfo: "while crystals < 3 repeats.",
      pythonQuestion: "When does it stop?",
      whyPath: "crystals reaches 3.",
      action: "collect and increase inside.",
      learned: "A while loop can repeat a rover command."
    },
    vocabulary: [{ term: "quota", meaning: "The target number." }],
    hints: [
      "Concept Clue: while crystals < 3.",
      "Structure Guide:\nwhile crystals < 3:\n    collect()\n    crystals = crystals + 1",
      "Guided Correction: Increase crystals."
    ],
    starterCode: `crystals = 0
while crystals < 3:
    collect()
    crystals = crystals + 1`,
    solution: `crystals = 0
while crystals < 3:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "collect*3", expect: { vars: { crystals: 3 } }, label: "collect 3" }],
    teacherExplanation: "Introduce the harvester while loop.",
    commonMistakes: ["No increment"],
    studentReflection: "I can loop a rover command."
  },
  {
    id: 6,
    tier: "basic",
    title: "Target Quota",
    storyProblem: "Set the quota to 5: collect until crystals reaches 5.",
    concept: "Changing the quota",
    learnFirst: {
      problem: "Collect to a bigger target.",
      knownInfo: "Change the condition number.",
      pythonQuestion: "Which number gives 5?",
      whyPath: "crystals < 5 stops at 5.",
      action: "Use while crystals < 5.",
      learned: "The condition sets the quota."
    },
    vocabulary: [{ term: "quota", meaning: "Target amount." }],
    hints: [
      "Concept Clue: change 3 to 5.",
      "Structure Guide:\nwhile crystals < 5:",
      "Guided Correction: crystals < 5"
    ],
    starterCode: `crystals = 0
while crystals < 3:
    collect()
    crystals = crystals + 1`,
    solution: `crystals = 0
while crystals < 5:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "collect*5", expect: { vars: { crystals: 5 } }, label: "collect 5" }],
    teacherExplanation: "Change the loop quota.",
    commonMistakes: ["Changing the increment"],
    studentReflection: "I can set a collection quota."
  },
  {
    id: 7,
    tier: "basic",
    title: "Sonic Drill & Telemetry",
    storyProblem: "From crystals = 1 while crystals <= 3: print crystals, drill(), collect(), then increase.",
    concept: "Multi-command loop body",
    learnFirst: {
      problem: "Report, drill, collect each pass.",
      knownInfo: "Indented lines repeat.",
      pythonQuestion: "What prints each pass?",
      whyPath: "print(crystals) is inside.",
      action: "Add the commands inside the loop.",
      learned: "Several commands can repeat together."
    },
    vocabulary: [{ term: "telemetry", meaning: "Status report." }],
    hints: [
      "Concept Clue: print, drill, collect all indented.",
      "Structure Guide:\nwhile crystals <= 3:\n    print(crystals)\n    drill()\n    collect()\n    crystals = crystals + 1",
      "Guided Correction: Increase last."
    ],
    starterCode: `crystals = 1
while crystals <= 3:
    drill()
    collect()
    crystals = crystals + 1`,
    solution: `crystals = 1
while crystals <= 3:
    print(crystals)
    drill()
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "collect*3", expect: { stdout: "1\n2\n3", vars: { crystals: 4 } }, label: "drill telemetry" }],
    teacherExplanation: "Multiple commands in a while body.",
    commonMistakes: ["Printing outside"],
    studentReflection: "I can run several commands in a loop."
  },
  {
    id: 8,
    tier: "basic",
    title: "Fuel Countdown & Orbital Beacon",
    storyProblem: "Scan while fuel counts down from 4 to 0, then fire beacon() after the loop.",
    concept: "Countdown + post-loop",
    learnFirst: {
      problem: "Scan each fuel unit, then beacon.",
      knownInfo: "Decrease fuel, then beacon after.",
      pythonQuestion: "Where is beacon()?",
      whyPath: "After the loop.",
      action: "scan and decrement, then beacon().",
      learned: "Combine a countdown with a finale."
    },
    vocabulary: [{ term: "beacon", meaning: "A recovery signal." }],
    hints: [
      "Concept Clue: beacon is un-indented.",
      "Structure Guide:\nwhile fuel > 0:\n    scan()\n    fuel = fuel - 1\nbeacon()",
      "Guided Correction: Decrease fuel inside."
    ],
    starterCode: `fuel = 4
while fuel > 0:
    scan()
    fuel = fuel - 1`,
    solution: `fuel = 4
while fuel > 0:
    scan()
    fuel = fuel - 1
beacon()`,
    variables: ["fuel"],
    base: {},
    tests: [{ environment: {}, want: "beacon", expect: { vars: { fuel: 0 } }, label: "countdown + beacon" }],
    teacherExplanation: "Countdown loop plus post-loop command.",
    commonMistakes: ["Indenting beacon"],
    studentReflection: "I can finish a countdown with a beacon."
  },
  {
    id: 9,
    tier: "basic",
    title: "Scan Sweep",
    storyProblem: "Scan 3 times with scans = 0 while scans < 3.",
    concept: "while scanning",
    learnFirst: {
      problem: "Repeat scan three times.",
      knownInfo: "while scans < 3 repeats.",
      pythonQuestion: "When does it stop?",
      whyPath: "scans reaches 3.",
      action: "scan and increase.",
      learned: "Any command can repeat."
    },
    vocabulary: [{ term: "scan", meaning: "Send a radar ping." }],
    hints: [
      "Concept Clue: while scans < 3.",
      "Structure Guide:\nwhile scans < 3:\n    scan()\n    scans = scans + 1",
      "Guided Correction: Increase scans."
    ],
    starterCode: `scans = 0
while scans < 3:
    scan()
    scans = scans + 1`,
    solution: `scans = 0
while scans < 3:
    scan()
    scans = scans + 1`,
    variables: ["scans"],
    base: {},
    tests: [{ environment: {}, want: "scan*3", expect: { vars: { scans: 3 } }, label: "scan three times" }],
    teacherExplanation: "Repeat scan.",
    commonMistakes: ["No increment"],
    studentReflection: "I can loop the scan command."
  },
  {
    id: 10,
    tier: "basic",
    title: "Drill and Collect",
    storyProblem: "Do a drill then collect, twice: gems = 0 while gems < 2.",
    concept: "Pair of commands in a loop",
    learnFirst: {
      problem: "Repeat a drill+collect pair.",
      knownInfo: "Both commands are indented.",
      pythonQuestion: "How many collect calls?",
      whyPath: "Each pass collects once.",
      action: "drill(); collect(); gems += 1.",
      learned: "Pairs of commands can repeat together."
    },
    vocabulary: [{ term: "pair", meaning: "Two commands together." }],
    hints: [
      "Concept Clue: drill then collect inside.",
      "Structure Guide:\nwhile gems < 2:\n    drill()\n    collect()\n    gems = gems + 1",
      "Guided Correction: Increase gems."
    ],
    starterCode: `gems = 0
while gems < 2:
    drill()
    collect()
    gems = gems + 1`,
    solution: `gems = 0
while gems < 2:
    drill()
    collect()
    gems = gems + 1`,
    variables: ["gems"],
    base: {},
    tests: [{ environment: {}, want: "collect*2", expect: { vars: { gems: 2 } }, label: "drill+collect twice" }],
    teacherExplanation: "Repeat a pair of commands.",
    commonMistakes: ["Missing increment"],
    studentReflection: "I can repeat a pair of commands."
  },

  /* ============================ DEBUG (11–15) ========================== */
  {
    id: 11,
    tier: "debug",
    title: "Missing Colon",
    storyProblem: "The while line has no colon. Add : to open the loop body.",
    concept: "Fix while colon",
    learnFirst: {
      problem: "The while line needs a colon.",
      knownInfo: "while lines end with :.",
      pythonQuestion: "What ends the while line?",
      whyPath: "The colon opens the body.",
      action: "Add : after the condition.",
      learned: "Every while line ends with a colon."
    },
    vocabulary: [{ term: ":", meaning: "Starts the block." }],
    hints: [
      "Concept Clue: add : after crystals < 3.",
      "Structure Guide:\nwhile crystals < 3:\n    collect()",
      "Guided Correction: Add the colon."
    ],
    starterCode: `# Bug: missing colon
crystals = 0
while crystals < 3
    collect()
    crystals = crystals + 1`,
    solution: `crystals = 0
while crystals < 3:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "collect*3", expect: { vars: { crystals: 3 } }, label: "fixed colon" }],
    teacherExplanation: "Debug a missing colon.",
    commonMistakes: ["Adding a semicolon"],
    studentReflection: "I remember the colon."
  },
  {
    id: 12,
    tier: "debug",
    title: "Missing Indentation",
    storyProblem: "The loop body is not indented. Indent collect() and the increment.",
    concept: "Fix indentation",
    learnFirst: {
      problem: "The body is outside the loop.",
      knownInfo: "Indented lines repeat.",
      pythonQuestion: "Which lines belong to the loop?",
      whyPath: "Both body lines are indented.",
      action: "Indent both lines.",
      learned: "Indentation defines the body."
    },
    vocabulary: [{ term: "indent", meaning: "Spaces showing block membership." }],
    hints: [
      "Concept Clue: indent collect and the increment.",
      "Structure Guide:\nwhile crystals < 3:\n    collect()\n    crystals = crystals + 1",
      "Guided Correction: Add 4 spaces."
    ],
    starterCode: `# Bug: body outside the loop
crystals = 0
while crystals < 3:
collect()
crystals = crystals + 1`,
    solution: `crystals = 0
while crystals < 3:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "collect*3", expect: { vars: { crystals: 3 } }, label: "fixed indent" }],
    teacherExplanation: "Debug missing indentation.",
    commonMistakes: ["Indenting the while line"],
    studentReflection: "I can indent a loop."
  },
  {
    id: 13,
    tier: "debug",
    title: "Forgot to Increase",
    storyProblem: "crystals never changes, so the loop never ends. Add crystals = crystals + 1 inside.",
    concept: "Fix infinite loop",
    learnFirst: {
      problem: "The counter never changes.",
      knownInfo: "Update the counter each pass.",
      pythonQuestion: "What is missing?",
      whyPath: "crystals must increase.",
      action: "Add the increment inside.",
      learned: "Update the counter so the loop can stop."
    },
    vocabulary: [{ term: "infinite loop", meaning: "A loop that never ends." }],
    hints: [
      "Concept Clue: add crystals = crystals + 1 inside.",
      "Structure Guide:\nwhile crystals < 3:\n    collect()\n    crystals = crystals + 1",
      "Guided Correction: Increment inside the loop."
    ],
    starterCode: `# Bug: crystals never changes
crystals = 0
while crystals < 3:
    collect()`,
    solution: `crystals = 0
while crystals < 3:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "collect*3", expect: { vars: { crystals: 3 } }, label: "fixed infinite" }],
    teacherExplanation: "Debug a missing increment.",
    commonMistakes: ["Decrementing"],
    studentReflection: "I always increment the counter."
  },
  {
    id: 14,
    tier: "debug",
    title: "Wrong Condition",
    storyProblem: "crystals starts at 0, so 'while crystals > 3' never runs. Change > to <.",
    concept: "Fix condition direction",
    learnFirst: {
      problem: "The condition is backwards.",
      knownInfo: "0 is not greater than 3.",
      pythonQuestion: "Should it be < 3?",
      whyPath: "0 < 3 is True.",
      action: "Change > to <.",
      learned: "Check the direction of a comparison."
    },
    vocabulary: [{ term: "<", meaning: "Less than." }],
    hints: [
      "Concept Clue: change > to <.",
      "Structure Guide:\nwhile crystals < 3:",
      "Guided Correction: crystals < 3"
    ],
    starterCode: `# Bug: condition never true
crystals = 0
while crystals > 3:
    collect()
    crystals = crystals + 1`,
    solution: `crystals = 0
while crystals < 3:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "collect*3", expect: { vars: { crystals: 3 } }, label: "fixed condition" }],
    teacherExplanation: "Debug a reversed condition.",
    commonMistakes: ["Changing the counter"],
    studentReflection: "I can check the comparison direction."
  },
  {
    id: 15,
    tier: "debug",
    title: "One Equals in a Condition",
    storyProblem: "The condition uses = instead of a comparison. Fix it to while crystals < 3.",
    concept: "Fix = in condition",
    learnFirst: {
      problem: "A condition needs a comparison.",
      knownInfo: "= assigns; < compares.",
      pythonQuestion: "Which operator asks a question?",
      whyPath: "< compares numbers.",
      action: "Change = to <.",
      learned: "Conditions use comparisons."
    },
    vocabulary: [{ term: "<", meaning: "Comparison operator." }],
    hints: [
      "Concept Clue: use < in the condition.",
      "Structure Guide:\nwhile crystals < 3:",
      "Guided Correction: crystals < 3"
    ],
    starterCode: `# Bug: assignment in a condition
crystals = 0
while crystals = 3:
    collect()
    crystals = crystals + 1`,
    solution: `crystals = 0
while crystals < 3:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "collect*3", expect: { vars: { crystals: 3 } }, label: "fixed condition" }],
    teacherExplanation: "Debug an assignment used as a condition.",
    commonMistakes: ["Using ==", "Removing the condition"],
    studentReflection: "I know conditions use comparisons."
  },

  /* =========================== CHALLENGE (16–18) ======================= */
  {
    id: 16,
    tier: "challenge",
    title: "Quota of Six",
    storyProblem: "Collect 6 crystals with a while loop from scratch.",
    concept: "While harvest from scratch",
    learnFirst: {
      problem: "Collect six crystals.",
      knownInfo: "Start at 0, loop while < 6.",
      pythonQuestion: "When does it stop?",
      whyPath: "crystals reaches 6.",
      action: "Write the counter loop.",
      learned: "I can build a harvest loop."
    },
    vocabulary: [{ term: "quota", meaning: "Target amount." }],
    hints: [
      "Concept Clue: while crystals < 6.",
      "Structure Guide:\ncrystals = 0\nwhile crystals < 6:\n    collect()\n    crystals = crystals + 1",
      "Guided Correction: Increase crystals."
    ],
    starterCode: `# Your turn: collect 6 crystals
`,
    solution: `crystals = 0
while crystals < 6:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "collect*6", expect: { vars: { crystals: 6 } }, label: "six crystals" }],
    teacherExplanation: "Independent harvest loop.",
    commonMistakes: ["No increment", "Wrong bound"],
    studentReflection: "I can build a harvest loop."
  },
  {
    id: 17,
    tier: "challenge",
    title: "Variable Quota",
    storyProblem: "n tells how many crystals are needed. Loop while i < n, collecting each pass.",
    concept: "Variable quota",
    learnFirst: {
      problem: "Loop until a variable target.",
      knownInfo: "Use i < n.",
      pythonQuestion: "How many for n = 3?",
      whyPath: "i 0,1,2 → three collects.",
      action: "while i < n: collect(); i += 1.",
      learned: "A variable can set the quota."
    },
    vocabulary: [{ term: "target", meaning: "The stopping value." }],
    hints: [
      "Concept Clue: while i < n.",
      "Structure Guide:\ni = 0\nwhile i < n:\n    collect()\n    i = i + 1",
      "Guided Correction: No quotes around n."
    ],
    starterCode: `# Your turn: collect n crystals
`,
    solution: `i = 0
while i < n:
    collect()
    i = i + 1`,
    variables: ["n", "i"],
    base: {},
    tests: [
      { environment: { n: 2 }, want: "collect*2", expect: { vars: { i: 2 } }, label: "n = 2" },
      { environment: { n: 3 }, want: "collect*3", expect: { vars: { i: 3 } }, label: "n = 3" }
    ],
    teacherExplanation: "Independent variable quota loop.",
    commonMistakes: ["Quoting n", "No increment"],
    studentReflection: "I can collect to a variable target."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Scan Then Beacon",
    storyProblem: "Scan 3 times, then beacon(). Use scans = 0 while scans < 3.",
    concept: "Loop then finale",
    learnFirst: {
      problem: "Scan, then beacon.",
      knownInfo: "beacon is after the loop.",
      pythonQuestion: "Where is beacon?",
      whyPath: "Un-indented after the loop.",
      action: "Loop scans, then beacon.",
      learned: "Finish a loop with a beacon."
    },
    vocabulary: [{ term: "beacon", meaning: "Recovery signal." }],
    hints: [
      "Concept Clue: beacon is not indented.",
      "Structure Guide:\nwhile scans < 3:\n    scan()\n    scans = scans + 1\nbeacon()",
      "Guided Correction: Put beacon at the left edge."
    ],
    starterCode: `# Your turn: scan 3 times then beacon
`,
    solution: `scans = 0
while scans < 3:
    scan()
    scans = scans + 1
beacon()`,
    variables: ["scans"],
    base: {},
    tests: [{ environment: {}, want: "beacon", expect: { vars: { scans: 3 } }, label: "scan + beacon" }],
    teacherExplanation: "Independent loop + finale.",
    commonMistakes: ["Indenting beacon"],
    studentReflection: "I can finish a scan loop with beacon."
  },

  /* ============================ ADVANCED (19–20) ======================= */
  {
    id: 19,
    tier: "advanced",
    title: "Full Harvest",
    storyProblem: "Follow the comments: collect 4 crystals in a while loop, then beacon().",
    concept: "Comment-guided harvest",
    learnFirst: {
      problem: "Build a harvest mission from comments.",
      knownInfo: "Loop to 4, then beacon.",
      pythonQuestion: "Where is beacon?",
      whyPath: "After the loop.",
      action: "Follow the comments.",
      learned: "I can build a harvest mission."
    },
    vocabulary: [{ term: "comment", meaning: "A note starting with #." }],
    hints: [
      "Concept Clue: follow the comments.",
      "Structure Guide:\n# collect 4; then beacon",
      "Guided Correction: beacon is un-indented."
    ],
    starterCode: `# 1) crystals = 0
# 2) while crystals < 4: collect() and increase
# 3) after the loop, beacon()`,
    solution: `crystals = 0
while crystals < 4:
    collect()
    crystals = crystals + 1
beacon()`,
    variables: ["crystals"],
    base: {},
    tests: [{ environment: {}, want: "beacon", expect: { vars: { crystals: 4 } }, label: "harvest mission" }],
    teacherExplanation: "Advanced: build a harvest loop from comments.",
    commonMistakes: ["Indenting beacon", "No increment"],
    studentReflection: "I can build a harvest mission from comments."
  },
  {
    id: 20,
    tier: "advanced",
    title: "Deep Core Mission",
    storyProblem: "Follow the comments: print the gem count, drill, collect, and increase, three times, then beacon().",
    concept: "Multi-command mission",
    learnFirst: {
      problem: "Build a multi-command mission from comments.",
      knownInfo: "Print, drill, collect, increase in the loop; beacon after.",
      pythonQuestion: "What runs after the loop?",
      whyPath: "beacon.",
      action: "Follow the comments.",
      learned: "I can build a full mission from comments."
    },
    vocabulary: [{ term: "mission", meaning: "A sequence of rover commands." }],
    hints: [
      "Concept Clue: follow the comments in order.",
      "Structure Guide:\n# loop 3 with print/drill/collect/increase; then beacon",
      "Guided Correction: beacon is un-indented."
    ],
    starterCode: `# 1) gems = 0
# 2) while gems < 3: print("Gem:"), print(gems), drill(), collect(), increase gems
# 3) after the loop, beacon()`,
    solution: `gems = 0
while gems < 3:
    print("Gem:")
    print(gems)
    drill()
    collect()
    gems = gems + 1
beacon()`,
    variables: ["gems"],
    base: {},
    tests: [{ environment: {}, want: "beacon", expect: { vars: { gems: 3 }, stdout: "Gem:\n0\nGem:\n1\nGem:\n2" }, label: "deep core mission" }],
    teacherExplanation: "Advanced: multi-command mission from comments.",
    commonMistakes: ["Indenting beacon", "Missing increment"],
    studentReflection: "I can build a full rover mission."
  }
];
