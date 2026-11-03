/* While Loop — Astro-Bot Power Core (Lesson 16)
   20-exercise backbone:
     recap 1-4  → Lesson 15 for-loop refresher
     basic 5-10 → while loops, counters, post-loop actions
     debug 11-15→ repair while syntax/logic
     challenge 16-18 → independent while tasks
     advanced 19-20 → comment-guided sequences */

export const LESSONS = [
  /* ============================ RECAP (1–4) ============================ */
  {
    id: 1,
    tier: "recap",
    title: "Recap: Count with for",
    storyProblem: "Warm up with Lesson 15's for loop. Print 0, 1, 2 using for i in range(3).",
    concept: "for loop recap",
    learnFirst: {
      problem: "Repeat a print three times.",
      knownInfo: "for i in range(3): repeats.",
      pythonQuestion: "What does print(i) show?",
      whyPath: "i takes 0,1,2.",
      action: "Indent print(i).",
      learned: "for loops repeat a block."
    },
    vocabulary: [{ term: "range(3)", meaning: "Repeat 3 times." }],
    hints: [
      "Concept Clue: print(i) shows the count.",
      "Structure Guide:\nfor i in range(3):\n    print(i)",
      "Guided Correction: No quotes around i."
    ],
    starterCode: `for i in range(3):
    print(i)`,
    solution: `for i in range(3):
    print(i)`,
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "0\n1\n2" }, label: "count 0 1 2" }],
    teacherExplanation: "Recap for loops before while.",
    commonMistakes: ["Quoting i", "Missing colon"],
    studentReflection: "I remember for loops."
  },
  {
    id: 2,
    tier: "recap",
    title: "Recap: Loop a Word",
    storyProblem: "Print power twice using a for loop.",
    concept: "for loop recap",
    learnFirst: {
      problem: "Repeat a word twice.",
      knownInfo: "for i in range(2): repeats twice.",
      pythonQuestion: "How many repeats?",
      whyPath: "range(2) gives two repeats.",
      action: "Indent print(\"power\").",
      learned: "range(2) repeats twice."
    },
    vocabulary: [{ term: "range(2)", meaning: "Repeat 2 times." }],
    hints: [
      "Concept Clue: use range(2).",
      "Structure Guide:\nfor i in range(2):\n    print(\"power\")",
      "Guided Correction: Indent print."
    ],
    starterCode: `for i in range(2):
    print("power")`,
    solution: `for i in range(2):
    print("power")`,
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "power\npower" }, label: "two prints" }],
    teacherExplanation: "Recap loop repetition.",
    commonMistakes: ["Wrong count"],
    studentReflection: "I can loop a word."
  },
  {
    id: 3,
    tier: "recap",
    title: "Recap: range(n)",
    storyProblem: "n tells how many times to print ready. Loop range(n).",
    concept: "range(n) recap",
    learnFirst: {
      problem: "Loop a variable number of times.",
      knownInfo: "range(n) reads n.",
      pythonQuestion: "How many lines for n=2?",
      whyPath: "range(2) repeats twice.",
      action: "Write for i in range(n): print(\"ready\").",
      learned: "range can read a variable."
    },
    vocabulary: [{ term: "range(n)", meaning: "Repeat n times." }],
    hints: [
      "Concept Clue: range(n) with no quotes.",
      "Structure Guide:\nfor i in range(n):\n    print(\"ready\")",
      "Guided Correction: Change 2 to n."
    ],
    starterCode: `for i in range(2):
    print("ready")`,
    solution: `for i in range(n):
    print("ready")`,
    variables: ["n"],
    base: {},
    tests: [
      { environment: { n: 2 }, want: "print*2", expect: { stdout: "ready\nready" }, label: "n = 2" },
      { environment: { n: 3 }, want: "print*3", expect: { stdout: "ready\nready\nready" }, label: "n = 3" }
    ],
    teacherExplanation: "Recap range(n).",
    commonMistakes: ["Quoting n", "Hardcoding"],
    studentReflection: "I can loop n times."
  },
  {
    id: 4,
    tier: "recap",
    title: "Recap: Loop Then Finish",
    storyProblem: "Loop range(2) to print go twice, then print done once after the loop.",
    concept: "loop scope recap",
    learnFirst: {
      problem: "Repeat twice, then run one line.",
      knownInfo: "Un-indented lines run after the loop.",
      pythonQuestion: "Which print runs once?",
      whyPath: "print(done) is un-indented.",
      action: "Indent go; keep done at the left edge.",
      learned: "Indentation decides what repeats."
    },
    vocabulary: [{ term: "indent", meaning: "Spaces showing block membership." }],
    hints: [
      "Concept Clue: done is not indented.",
      "Structure Guide:\nfor i in range(2):\n    print(\"go\")\nprint(\"done\")",
      "Guided Correction: Put done at the left edge."
    ],
    starterCode: `for i in range(2):
    print("go")`,
    solution: `for i in range(2):
    print("go")
print("done")`,
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "go\ngo\ndone" }, label: "loop then finish" }],
    teacherExplanation: "Recap loop body vs post-loop line.",
    commonMistakes: ["Indenting done"],
    studentReflection: "I know what repeats."
  },

  /* ============================ BASIC (5–10) =========================== */
  {
    id: 5,
    tier: "basic",
    title: "Follow the Command — Power Up!",
    storyProblem: "Charge the core until energy reaches 3 using a while loop: while energy < 3: charge() then energy = energy + 1.",
    concept: "while loop basics",
    learnFirst: {
      problem: "Repeat until energy reaches 3.",
      knownInfo: "while condition: repeats while True.",
      pythonQuestion: "When does the loop stop?",
      whyPath: "energy < 3 becomes False at 3.",
      action: "Charge and increase energy each pass.",
      learned: "A while loop repeats while its condition is True."
    },
    vocabulary: [
      { term: "while", meaning: "Repeats while a condition is True." },
      { term: "condition", meaning: "The True/False check." }
    ],
    hints: [
      "Concept Clue: while energy < 3:",
      "Structure Guide:\nenergy = 0\nwhile energy < 3:\n    charge()\n    energy = energy + 1",
      "Guided Correction: Increase energy inside the loop."
    ],
    starterCode: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1`,
    solution: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1`,
    variables: ["energy"],
    base: {},
    tests: [{ environment: {}, want: "charge*3", expect: { vars: { energy: 3 } }, label: "charge to 3" }],
    teacherExplanation: "Introduce while with a counter.",
    commonMistakes: ["Forgetting to increase energy", "Missing colon"],
    studentReflection: "I can write a basic while loop."
  },
  {
    id: 6,
    tier: "basic",
    title: "Insert Your Own Limit — Supercharge!",
    storyProblem: "Change the limit so the core charges 5 times: while energy < 5.",
    concept: "Changing the loop limit",
    learnFirst: {
      problem: "Charge to a new limit.",
      knownInfo: "Change the number in the condition.",
      pythonQuestion: "Which number gives 5 charges?",
      whyPath: "energy < 5 stops at 5.",
      action: "Use while energy < 5.",
      learned: "The limit controls the number of repeats."
    },
    vocabulary: [{ term: "limit", meaning: "The value that stops the loop." }],
    hints: [
      "Concept Clue: change 3 to 5.",
      "Structure Guide:\nwhile energy < 5:",
      "Guided Correction: energy < 5"
    ],
    starterCode: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1`,
    solution: `energy = 0
while energy < 5:
    charge()
    energy = energy + 1`,
    variables: ["energy"],
    base: {},
    tests: [{ environment: {}, want: "charge*5", expect: { vars: { energy: 5 } }, label: "charge to 5" }],
    teacherExplanation: "Change the loop limit.",
    commonMistakes: ["Changing the increment instead"],
    studentReflection: "I can set a while loop limit."
  },
  {
    id: 7,
    tier: "basic",
    title: "Insert Your Own Command Inside the Loop",
    storyProblem: "Inside the loop, print power before charging. Loop power from 1 to 4 with while power <= 4.",
    concept: "Commands inside a while loop",
    learnFirst: {
      problem: "Print each power level inside the loop.",
      knownInfo: "Indented lines repeat.",
      pythonQuestion: "What prints each pass?",
      whyPath: "print(power) is inside the loop.",
      action: "Add print(power) inside.",
      learned: "Any indented command repeats."
    },
    vocabulary: [{ term: "body", meaning: "The indented lines inside the loop." }],
    hints: [
      "Concept Clue: print(power) goes inside the loop.",
      "Structure Guide:\nwhile power <= 4:\n    print(power)\n    charge()\n    power = power + 1",
      "Guided Correction: Indent print(power)."
    ],
    starterCode: `power = 1
while power <= 4:
    charge()
    power = power + 1`,
    solution: `power = 1
while power <= 4:
    print(power)
    charge()
    power = power + 1`,
    variables: ["power"],
    base: {},
    tests: [{ environment: {}, want: "charge*4", expect: { stdout: "1\n2\n3\n4", vars: { power: 5 } }, label: "print 1-4" }],
    teacherExplanation: "Add another command to the loop body.",
    commonMistakes: ["Printing outside the loop"],
    studentReflection: "I can add commands inside a while loop."
  },
  {
    id: 8,
    tier: "basic",
    title: "Countdown to Blastoff!",
    storyProblem: "Count down 3, 2, 1 with while countdown > 0, then call launch() after the loop.",
    concept: "Decreasing counter",
    learnFirst: {
      problem: "Count down, then launch.",
      knownInfo: "Decrease the counter each pass.",
      pythonQuestion: "When does the loop stop?",
      whyPath: "countdown > 0 is False at 0.",
      action: "Print countdown, subtract 1, then launch() after.",
      learned: "A counter can go down too."
    },
    vocabulary: [{ term: "decrement", meaning: "Subtract 1 from a counter." }],
    hints: [
      "Concept Clue: countdown = countdown - 1 inside the loop.",
      "Structure Guide:\nwhile countdown > 0:\n    print(countdown)\n    countdown = countdown - 1\nlaunch()",
      "Guided Correction: launch() is not indented."
    ],
    starterCode: `countdown = 3
while countdown > 0:
    print(countdown)
    countdown = countdown - 1`,
    solution: `countdown = 3
while countdown > 0:
    print(countdown)
    countdown = countdown - 1
launch()`,
    variables: ["countdown"],
    base: {},
    tests: [{ environment: {}, want: "launch", expect: { stdout: "3\n2\n1", vars: { countdown: 0 } }, label: "countdown then launch" }],
    teacherExplanation: "Decrement a counter and add a post-loop action.",
    commonMistakes: ["Indenting launch", "Subtracting outside"],
    studentReflection: "I can count down with while."
  },
  {
    id: 9,
    tier: "basic",
    title: "Hyperdrive Lab",
    storyProblem: "Print the energy level each pass, charge, increase energy to 3, then spark() and launch().",
    concept: "Multi-line loop body + finale",
    learnFirst: {
      problem: "Report, charge, then finish with spark and launch.",
      knownInfo: "Indented lines repeat; post-loop lines run once.",
      pythonQuestion: "What runs after the loop?",
      whyPath: "spark() and launch() are un-indented.",
      action: "Follow the given structure.",
      learned: "Combine a loop body with a finale."
    },
    vocabulary: [{ term: "finale", meaning: "Commands after the loop." }],
    hints: [
      "Concept Clue: keep spark() and launch() at the left edge.",
      "Structure Guide:\nwhile energy < 3: ...\nspark()\nlaunch()",
      "Guided Correction: Do not indent spark or launch."
    ],
    starterCode: `energy = 0
while energy < 3:
    print("Energy level:")
    print(energy)
    charge()
    energy = energy + 1
spark()
launch()`,
    solution: `energy = 0
while energy < 3:
    print("Energy level:")
    print(energy)
    charge()
    energy = energy + 1
spark()
launch()`,
    variables: ["energy"],
    base: {},
    tests: [{
      environment: {},
      want: "launch",
      expect: { vars: { energy: 3 }, stdout: "Energy level:\n0\nEnergy level:\n1\nEnergy level:\n2" },
      label: "hyperdrive finale"
    }],
    teacherExplanation: "Multi-line body with post-loop spark and launch.",
    commonMistakes: ["Indenting the finale"],
    studentReflection: "I can combine a loop with a finale."
  },
  {
    id: 10,
    tier: "basic",
    title: "While with a Counter",
    storyProblem: "Count power from 0 to 3 with while: increase power, then print it. The final print should show 3.",
    concept: "Counter and print",
    learnFirst: {
      problem: "Increase a counter and show the final value.",
      knownInfo: "Increase then print inside the loop.",
      pythonQuestion: "What is printed last?",
      whyPath: "power reaches 3.",
      action: "While power < 3: power += 1; print(power).",
      learned: "A counter can be printed each pass."
    },
    vocabulary: [{ term: "counter", meaning: "A variable that increases each loop." }],
    hints: [
      "Concept Clue: power = power + 1 before print.",
      "Structure Guide:\npower = 0\nwhile power < 3:\n    power = power + 1\n    print(power)",
      "Guided Correction: Increase before printing."
    ],
    starterCode: `power = 0
while power < 3:
    power = power + 1
    print(power)`,
    solution: `power = 0
while power < 3:
    power = power + 1
    print(power)`,
    variables: ["power"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "1\n2\n3", vars: { power: 3 } }, label: "counter 1-3" }],
    teacherExplanation: "Reinforce counter increment and print.",
    commonMistakes: ["Printing before increasing"],
    studentReflection: "I can print a counter each pass."
  },

  /* ============================ DEBUG (11–15) ========================== */
  {
    id: 11,
    tier: "debug",
    title: "Missing Colon",
    storyProblem: "The while line has no colon. Add : so the body belongs to the loop.",
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
      "Concept Clue: add : after energy < 3.",
      "Structure Guide:\nwhile energy < 3:\n    charge()",
      "Guided Correction: Add the colon."
    ],
    starterCode: `# Bug: missing colon
energy = 0
while energy < 3
    charge()
    energy = energy + 1`,
    solution: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1`,
    variables: ["energy"],
    base: {},
    tests: [{ environment: {}, want: "charge*3", expect: { vars: { energy: 3 } }, label: "fixed colon" }],
    teacherExplanation: "Debug a missing while colon.",
    commonMistakes: ["Adding a semicolon"],
    studentReflection: "I remember the while colon."
  },
  {
    id: 12,
    tier: "debug",
    title: "Missing Indentation",
    storyProblem: "The loop body is not indented. Indent charge() and the increment so they repeat.",
    concept: "Fix while indentation",
    learnFirst: {
      problem: "The body is outside the loop.",
      knownInfo: "Indented lines repeat.",
      pythonQuestion: "Which lines belong to the loop?",
      whyPath: "charge and energy increase are indented.",
      action: "Indent both body lines.",
      learned: "Indentation defines the loop body."
    },
    vocabulary: [{ term: "indent", meaning: "Spaces showing block membership." }],
    hints: [
      "Concept Clue: indent charge() and the increment.",
      "Structure Guide:\nwhile energy < 3:\n    charge()\n    energy = energy + 1",
      "Guided Correction: Add 4 spaces to both lines."
    ],
    starterCode: `# Bug: body outside the loop
energy = 0
while energy < 3:
charge()
energy = energy + 1`,
    solution: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1`,
    variables: ["energy"],
    base: {},
    tests: [{ environment: {}, want: "charge*3", expect: { vars: { energy: 3 } }, label: "fixed indent" }],
    teacherExplanation: "Debug missing loop indentation.",
    commonMistakes: ["Indenting the while line"],
    studentReflection: "I can indent a loop body."
  },
  {
    id: 13,
    tier: "debug",
    title: "Forgot to Increase",
    storyProblem: "The counter never changes, so the loop runs forever. Add energy = energy + 1 inside the loop.",
    concept: "Fix infinite loop",
    learnFirst: {
      problem: "The condition never becomes False.",
      knownInfo: "A counter must change each pass.",
      pythonQuestion: "What is missing?",
      whyPath: "energy must increase.",
      action: "Add the increment inside the loop.",
      learned: "Update the counter so the loop can end."
    },
    vocabulary: [{ term: "infinite loop", meaning: "A loop that never ends." }],
    hints: [
      "Concept Clue: add energy = energy + 1 inside the loop.",
      "Structure Guide:\nwhile energy < 3:\n    charge()\n    energy = energy + 1",
      "Guided Correction: The increment belongs inside the loop."
    ],
    starterCode: `# Bug: energy never changes
energy = 0
while energy < 3:
    charge()`,
    solution: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1`,
    variables: ["energy"],
    base: {},
    tests: [{ environment: {}, want: "charge*3", expect: { vars: { energy: 3 } }, label: "fixed infinite loop" }],
    teacherExplanation: "Debug a missing increment.",
    commonMistakes: ["Decrementing instead"],
    studentReflection: "I always update the loop counter."
  },
  {
    id: 14,
    tier: "debug",
    title: "Wrong Condition",
    storyProblem: "energy starts at 0, so 'while energy > 3' never runs. Change > to < so the loop charges.",
    concept: "Fix condition direction",
    learnFirst: {
      problem: "The condition is backwards.",
      knownInfo: "0 is not greater than 3.",
      pythonQuestion: "Should it be < 3?",
      whyPath: "0 < 3 is True, so the loop runs.",
      action: "Change > to <.",
      learned: "Read the condition to check the direction."
    },
    vocabulary: [{ term: "<", meaning: "Less than." }],
    hints: [
      "Concept Clue: change > to <.",
      "Structure Guide:\nwhile energy < 3:",
      "Guided Correction: energy < 3"
    ],
    starterCode: `# Bug: condition never true
energy = 0
while energy > 3:
    charge()
    energy = energy + 1`,
    solution: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1`,
    variables: ["energy"],
    base: {},
    tests: [{ environment: {}, want: "charge*3", expect: { vars: { energy: 3 } }, label: "fixed condition" }],
    teacherExplanation: "Debug a reversed while condition.",
    commonMistakes: ["Changing the counter"],
    studentReflection: "I can check a condition's direction."
  },
  {
    id: 15,
    tier: "debug",
    title: "One Equals in a Condition",
    storyProblem: "The condition uses = instead of a comparison. Fix it to while energy < 3.",
    concept: "Fix = in condition",
    learnFirst: {
      problem: "A condition needs a comparison.",
      knownInfo: "= assigns; < compares.",
      pythonQuestion: "Which operator asks a question?",
      whyPath: "< compares two numbers.",
      action: "Change = to <.",
      learned: "Conditions use comparisons, not =."
    },
    vocabulary: [{ term: "<", meaning: "Comparison operator." }],
    hints: [
      "Concept Clue: use < in the condition.",
      "Structure Guide:\nwhile energy < 3:",
      "Guided Correction: energy < 3"
    ],
    starterCode: `# Bug: assignment in a condition
energy = 0
while energy = 3:
    charge()
    energy = energy + 1`,
    solution: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1`,
    variables: ["energy"],
    base: {},
    tests: [{ environment: {}, want: "charge*3", expect: { vars: { energy: 3 } }, label: "fixed condition" }],
    teacherExplanation: "Debug an assignment used as a condition.",
    commonMistakes: ["Using ==", "Removing the condition"],
    studentReflection: "I know conditions use comparisons."
  },

  /* =========================== CHALLENGE (16–18) ======================= */
  {
    id: 16,
    tier: "challenge",
    title: "Count to Four",
    storyProblem: "Use a while loop to print 0, 1, 2, 3. Increase i each pass.",
    concept: "While count from scratch",
    learnFirst: {
      problem: "Count 0..3 with while.",
      knownInfo: "Start at 0, increase while < 4.",
      pythonQuestion: "When does it stop?",
      whyPath: "i < 4 is False at 4.",
      action: "Write i=0; while i<4: print(i); i+=1.",
      learned: "I can build a counting while loop."
    },
    vocabulary: [{ term: "while", meaning: "Repeat while True." }],
    hints: [
      "Concept Clue: start i=0, loop while i < 4.",
      "Structure Guide:\ni = 0\nwhile i < 4:\n    print(i)\n    i = i + 1",
      "Guided Correction: Increase inside the loop."
    ],
    starterCode: `# Your turn: print 0 1 2 3
`,
    solution: `i = 0
while i < 4:
    print(i)
    i = i + 1`,
    variables: ["i"],
    base: {},
    tests: [{ environment: {}, want: "print*4", expect: { stdout: "0\n1\n2\n3", vars: { i: 4 } }, label: "count 0-3" }],
    teacherExplanation: "Independent counting while loop.",
    commonMistakes: ["Forgetting increment", "Wrong bound"],
    studentReflection: "I can write a counting while loop."
  },
  {
    id: 17,
    tier: "challenge",
    title: "Until the Target",
    storyProblem: "n tells how many charges are needed. Loop while i < n, calling charge() and increasing i.",
    concept: "Variable limit",
    learnFirst: {
      problem: "Loop until a target n.",
      knownInfo: "Use i < n.",
      pythonQuestion: "How many charges for n=3?",
      whyPath: "i 0,1,2 → three charges.",
      action: "While i < n: charge(); i += 1.",
      learned: "A variable can set the loop limit."
    },
    vocabulary: [{ term: "target", meaning: "The value that stops the loop." }],
    hints: [
      "Concept Clue: while i < n.",
      "Structure Guide:\ni = 0\nwhile i < n:\n    charge()\n    i = i + 1",
      "Guided Correction: No quotes around n."
    ],
    starterCode: `# Your turn: charge n times
`,
    solution: `i = 0
while i < n:
    charge()
    i = i + 1`,
    variables: ["n", "i"],
    base: {},
    tests: [
      { environment: { n: 2 }, want: "charge*2", expect: { vars: { i: 2 } }, label: "n = 2" },
      { environment: { n: 3 }, want: "charge*3", expect: { vars: { i: 3 } }, label: "n = 3" }
    ],
    teacherExplanation: "Independent variable-limit while loop.",
    commonMistakes: ["Quoting n", "No increment"],
    studentReflection: "I can loop until a target."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Labeled Steps",
    storyProblem: "Print Step 0, Step 1, Step 2 using print(\"Step\", step) in a while loop.",
    concept: "While with labeled output",
    learnFirst: {
      problem: "Label each step.",
      knownInfo: "print(\"Step\", step).",
      pythonQuestion: "How do we add the label?",
      whyPath: "Comma joins label and number.",
      action: "Loop step 0..2 with the label.",
      learned: "Combine text and counter."
    },
    vocabulary: [{ term: "label", meaning: "Text before a value." }],
    hints: [
      "Concept Clue: print(\"Step\", step).",
      "Structure Guide:\nwhile step < 3:\n    print(\"Step\", step)\n    step = step + 1",
      "Guided Correction: Keep the comma."
    ],
    starterCode: `# Your turn: print Step 0, Step 1, Step 2
`,
    solution: `step = 0
while step < 3:
    print("Step", step)
    step = step + 1`,
    variables: ["step"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "Step 0\nStep 1\nStep 2" }, label: "labeled steps" }],
    teacherExplanation: "Independent labeled loop.",
    commonMistakes: ["Missing comma", "Quoting step"],
    studentReflection: "I can label each loop step."
  },

  /* ============================ ADVANCED (19–20) ======================= */
  {
    id: 19,
    tier: "advanced",
    title: "Countdown to Launch",
    storyProblem: "Follow the comments: count down 3, 2, 1 with a while loop, then launch().",
    concept: "Comment-guided countdown",
    learnFirst: {
      problem: "Build a countdown from a plan.",
      knownInfo: "Decrease countdown until 0, then launch.",
      pythonQuestion: "Where is launch?",
      whyPath: "After the loop.",
      action: "Follow the comments.",
      learned: "I can build a countdown while loop."
    },
    vocabulary: [{ term: "comment", meaning: "A note starting with #." }],
    hints: [
      "Concept Clue: follow the comments.",
      "Structure Guide:\n# countdown 3..1, then launch",
      "Guided Correction: launch() is not indented."
    ],
    starterCode: `# 1) countdown = 3
# 2) while countdown > 0: print it, then subtract 1
# 3) after the loop, launch()`,
    solution: `countdown = 3
while countdown > 0:
    print(countdown)
    countdown = countdown - 1
launch()`,
    variables: ["countdown"],
    base: {},
    tests: [{ environment: {}, want: "launch", expect: { stdout: "3\n2\n1", vars: { countdown: 0 } }, label: "countdown plan" }],
    teacherExplanation: "Advanced: build a countdown from comments.",
    commonMistakes: ["Indenting launch", "Wrong direction"],
    studentReflection: "I can build a countdown from a plan."
  },
  {
    id: 20,
    tier: "advanced",
    title: "Full Power Sequence",
    storyProblem: "Follow the comments: charge energy to 3 in a while loop, then spark() and launch().",
    concept: "Comment-guided power sequence",
    learnFirst: {
      problem: "Charge then finish from a plan.",
      knownInfo: "Loop while energy < 3, then finale.",
      pythonQuestion: "What runs after the loop?",
      whyPath: "spark and launch.",
      action: "Follow the comments.",
      learned: "I can combine a loop with a finale from comments."
    },
    vocabulary: [{ term: "finale", meaning: "Post-loop commands." }],
    hints: [
      "Concept Clue: follow the comments in order.",
      "Structure Guide:\n# charge to 3; then spark(); then launch()",
      "Guided Correction: Keep spark and launch un-indented."
    ],
    starterCode: `# 1) energy = 0
# 2) while energy < 3: charge() and energy = energy + 1
# 3) after the loop: spark() then launch()`,
    solution: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1
spark()
launch()`,
    variables: ["energy"],
    base: {},
    tests: [{ environment: {}, want: "launch", expect: { vars: { energy: 3 } }, label: "power sequence" }],
    teacherExplanation: "Advanced: combine a while loop with a finale from comments.",
    commonMistakes: ["Indenting the finale", "Missing increment"],
    studentReflection: "I can build a full power sequence."
  }
];
