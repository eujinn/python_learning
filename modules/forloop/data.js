/* For-Loop Outpost — learn Python for loops by commanding a mecha defender.
   Follows the shared lesson schema; the engine now understands:
   for <name> in range(N) and range(start, stop), with if/elif/else inside. */

export const LESSONS = [
  {
    id: 1,
    title: "Exercise 1: March in a Loop",
    storyProblem: "The outpost wall has 3 guard tiles. Use a for loop to march() the mecha across all 3 tiles — one march per tile!",
    concept: "for range loops",
    learnFirst: {
      problem: "We must repeat march() three times — once for each guard tile.",
      knownInfo: "There are 3 tiles, and march() moves the mecha one tile.",
      pythonQuestion: "for i in range(3): — how many times does Python repeat the indented line?",
      whyPath: "range(3) makes the list 0, 1, 2, so the block runs exactly 3 times.",
      action: "march() runs on every loop round, marching the mecha across all 3 tiles.",
      learned: "A for loop repeats a block of lines — range(3) means repeat 3 times!"
    },
    vocabulary: [
      { term: "for", meaning: "Starts a loop: for i in range(3): means repeat the block below." },
      { term: "range(3)", meaning: "Makes the numbers 0, 1, 2 — the loop runs 3 times." }
    ],
    hints: [
      "Concept Clue: A for loop repeats lines. range(3) repeats the block 3 times.",
      "Structure Guide:\nfor i in range(3):\n    march()",
      "Guided Correction: Write for i in range(3): and the indented march()."
    ],
    starterCode: "# March 3 times with a loop:\nmarch()",
    solution: "for i in range(3):\n    march()",
    variables: ["count"],
    base: { count: 3 },
    tests: [
      { environment: { count: 3 }, want: "march*3", label: "3 guard tiles" },
      { environment: { count: 2 }, want: "march*3", label: "2 guard tiles (still 3 marches)" }
    ],
    teacherExplanation: "Introduce the for loop as 'repeat N times'. range(3) yields 0,1,2, and the indented block runs once per value.",
    commonMistakes: [
      "Forgetting the colon after range(3):",
      "Forgetting to indent march() under the for line",
      "Writing range(3) without the word in: 'for i 3:'"
    ],
    studentReflection: "I can use a for loop to repeat a command a fixed number of times."
  },

  {
    id: 2,
    title: "Exercise 2: Count from a Sensor",
    storyProblem: "The wall length changes! count tells you how many tiles there are. Loop exactly count times so march() always matches the wall.",
    concept: "range with a variable",
    learnFirst: {
      problem: "The number of tiles is stored in the count sensor, and it changes between tests.",
      knownInfo: "count is a whole number, e.g. 3 or 6.",
      pythonQuestion: "for i in range(count): — how many times will it repeat?",
      whyPath: "range(count) uses the sensor value, so the loop matches the wall exactly.",
      action: "march() runs count times, marching across every tile.",
      learned: "range() can take a variable — the loop repeats however many times the variable says!"
    },
    vocabulary: [
      { term: "range(count)", meaning: "A loop that repeats as many times as the value inside count." }
    ],
    hints: [
      "Concept Clue: Put the sensor variable count inside range() brackets.",
      "Structure Guide:\nfor i in range(___):\n    march()",
      "Guided Correction: Change range(3) to range(count) — no quote marks around count."
    ],
    starterCode: "# Loop matching the count sensor:\nfor i in range(3):\n    march()",
    solution: "for i in range(count):\n    march()",
    variables: ["count"],
    base: { count: 3 },
    tests: [
      { environment: { count: 3 }, want: "march*3", label: "count = 3" },
      { environment: { count: 6 }, want: "march*6", label: "count = 6" }
    ],
    teacherExplanation: "Show that range() accepts a variable read from sensors, so the same code works for different wall lengths.",
    commonMistakes: [
      "Writing range(\"count\") with quote marks — variables never use quotes",
      "Hard-coding range(3) when count differs"
    ],
    studentReflection: "I can make a loop repeat a sensor-controlled number of times."
  },

  {
    id: 3,
    title: "Exercise 3: Stop at the Beacon",
    storyProblem: "Position 3 (i == 2) has a beacon. March on every tile, but fire() exactly when i == 2, then keep marching to the end!",
    concept: "if inside a for loop",
    learnFirst: {
      problem: "We march every tile, but at tile i == 2 we must stop to fire at the beacon first.",
      knownInfo: "The loop variable i counts each round: 0, 1, 2, 3...",
      pythonQuestion: "Is i == 2? — check inside the loop every round.",
      whyPath: "When i is 2 the question is True, so fire() runs; otherwise else march() runs.",
      action: "march() every round except fire() when i == 2.",
      learned: "You can put if/else questions inside a loop — they are checked every round!"
    },
    vocabulary: [
      { term: "loop variable", meaning: "The letter after for (like i) that changes each round: 0, 1, 2..." }
    ],
    hints: [
      "Concept Clue: Check i == 2 inside the loop to fire only at the beacon tile.",
      "Structure Guide:\nfor i in range(count):\n    if i == 2:\n        fire()\n    else:\n        march()",
      "Guided Correction: Add if i == 2: with fire() under it, and else: with march() under it — all inside the loop."
    ],
    starterCode: "# March every round, fire at the beacon (i == 2):\nfor i in range(count):\n    march()",
    solution: "for i in range(count):\n    if i == 2:\n        fire()\n    else:\n        march()",
    variables: ["count"],
    base: { count: 3 },
    tests: [
      { environment: { count: 3 }, want: "fire*1", label: "count = 3 (beacon last)" },
      { environment: { count: 5 }, want: "march*4", label: "count = 5 (march after beacon)" }
    ],
    teacherExplanation: "Walk through the calls for count=3 (march, march, fire) and count=5 (march, march, fire, march, march). The last command differs by count.",
    commonMistakes: [
      "Forgetting the colon on if i == 2:",
      "Putting fire() and march() at the wrong indentation level",
      "Using one = instead of == in the question"
    ],
    studentReflection: "I can make decisions at a specific loop round using if and the loop variable."
  },

  {
    id: 4,
    title: "Exercise 4: Manage Reactor Power",
    storyProblem: "Guard each tile: if energy is below 30, recharge(); elif energy is above 70, march(); otherwise fire(). The loop checks the sensor stock pile every round!",
    concept: "elif inside a loop",
    learnFirst: {
      problem: "The mecha must pick the right action every round based on the energy sensor.",
      knownInfo: "energy is a number like 20, 50, or 90.",
      pythonQuestion: "1st: energy < 30? 2nd: energy > 70?",
      whyPath: "Python checks the branches top-to-bottom each loop round.",
      action: "Recharge when low, march when high, fire in between.",
      learned: "You can chain if, elif, else inside a loop for three-way decisions every round."
    },
    vocabulary: [
      { term: "elif", meaning: "A second question Python asks only if the first was False." }
    ],
    hints: [
      "Concept Clue: Use if energy < 30, elif energy > 70, then else inside the loop.",
      "Structure Guide:\nfor i in range(count):\n    if energy < 30:\n        recharge()\n    elif energy > 70:\n        march()\n    else:\n        fire()",
      "Guided Correction: Write the three-branch ladder (recharge / march / fire) indented inside the for loop."
    ],
    starterCode: "# Pick the right action for each energy level:\nfor i in range(count):\n    fire()",
    solution: "for i in range(count):\n    if energy < 30:\n        recharge()\n    elif energy > 70:\n        march()\n    else:\n        fire()",
    variables: ["count", "energy"],
    base: { count: 3, energy: 50 },
    tests: [
      { environment: { count: 3, energy: 20 }, want: "recharge*3", label: "energy = 20 (low)" },
      { environment: { count: 3, energy: 90 }, want: "march*3", label: "energy = 90 (high)" },
      { environment: { count: 3, energy: 50 }, want: "fire*3", label: "energy = 50 (middle)" }
    ],
    teacherExplanation: "Each loop round evaluates the same ladder; for a constant energy every round uses the same branch, so the last call equals that branch.",
    commonMistakes: [
      "Writing 'else if' as two words instead of elif",
      "Reversing < and >",
      "Indenting the ladder outside the for loop"
    ],
    studentReflection: "I can build three-way sensor decisions that repeat every loop round."
  },

  {
    id: 5,
    title: "Exercise 5: Loop a Chosen Slice",
    storyProblem: "Only defend the middle stretch! range(start, stop) loops from start up to (but not including) stop. March across the middle stretch from start to stop.",
    concept: "range(start, stop)",
    learnFirst: {
      problem: "We only want to march the middle of the wall — not the whole wall.",
      knownInfo: "start and stop are whole numbers from the sensors.",
      pythonQuestion: "range(start, stop) — which tiles does it include?",
      whyPath: "Python counts start, start+1, ..., up to stop-1 (stop is not included).",
      action: "march() runs once per tile between start and stop.",
      learned: "range(start, stop) loops between two numbers: it skips start before it and stops right before stop."
    },
    vocabulary: [
      { term: "range(start, stop)", meaning: "Loops the numbers from start up to (but not including) stop." }
    ],
    hints: [
      "Concept Clue: Give range() two numbers — the tile where to start and where to stop.",
      "Structure Guide:\nfor i in range(___, ___):\n    march()",
      "Guided Correction: Write for i in range(start, stop): — with a comma between start and stop."
    ],
    starterCode: "# March the middle stretch:\nfor i in range(1, 4):\n    march()",
    solution: "for i in range(start, stop):\n    march()",
    variables: ["start", "stop"],
    base: { start: 1, stop: 4 },
    tests: [
      { environment: { start: 1, stop: 4 }, want: "march*3", label: "start=1, stop=4 (3 rounds)" },
      { environment: { start: 0, stop: 5 }, want: "march*5", label: "start=0, stop=5 (5 rounds)" }
    ],
    teacherExplanation: "range(a, b) yields a..b-1. Emphasize that stop is excluded — a common off-by-one source.",
    commonMistakes: [
      "Writing start stop without the comma",
      "Forgetting that stop is not included (range(1,4) is 1,2,3)",
      "Putting quotes around start or stop"
    ],
    studentReflection: "I can loop over a chosen slice of numbers using range(start, stop)."
  },

  {
    id: 6,
    title: "Exercise 6: Patrol with Logic",
    storyProblem: "Patrol the full wall: march() as long as distance > 10 and not siren. Otherwise hold the line and fire(). Combine and, not, and a loop!",
    concept: "and / not inside a loop",
    learnFirst: {
      problem: "The mecha marches only when it is safe: far drones and no siren.",
      knownInfo: "distance is a number and siren is True/False.",
      pythonQuestion: "Is distance > 10 and not siren?",
      whyPath: "Both parts must be True for and; not flips the siren value.",
      action: "march() when safe; fire() when a drone is close or sirens blare.",
      learned: "Combine and / not with a loop so the same rule is applied every round."
    },
    vocabulary: [
      { term: "and", meaning: "Both questions must be True." },
      { term: "not", meaning: "Flips True to False (not siren means 'siren is off')." }
    ],
    hints: [
      "Concept Clue: Join distance > 10 and not siren with the word and.",
      "Structure Guide:\nfor i in range(count):\n    if distance > 10 and not siren:\n        march()\n    else:\n        fire()",
      "Guided Correction: Write if distance > 10 and not siren: with march(), and else: with fire()."
    ],
    starterCode: "# Patrol every round when it is safe:\nfor i in range(count):\n    march()",
    solution: "for i in range(count):\n    if distance > 10 and not siren:\n        march()\n    else:\n        fire()",
    variables: ["count", "distance", "siren"],
    base: { count: 3, distance: 20, siren: false },
    tests: [
      { environment: { count: 3, distance: 20, siren: false }, want: "march*3", label: "far & quiet" },
      { environment: { count: 3, distance: 5, siren: false }, want: "fire*3", label: "close drone" },
      { environment: { count: 3, distance: 20, siren: true }, want: "fire*3", label: "far but siren!" }
    ],
    teacherExplanation: "Walk through why 'siren is True' flips not siren to False, making the else fire() run every round.",
    commonMistakes: [
      "Writing 'not siren = True' instead of just not siren",
      "Using and when they mean or",
      "Forgetting the colon on the if line"
    ],
    studentReflection: "I can combine logic operators with loops to apply one rule every round."
  },

  {
    id: 7,
    title: "Exercise 7: Outpost Playground 🎮",
    storyProblem: "You defended the outpost! Change count, start, stop, energy, distance, or siren, and invent your own loop patrol rules.",
    concept: "Creative loop mastery",
    learnFirst: {
      problem: "Design your own wall length and your own patrol rules.",
      knownInfo: "You can set count, start, stop, energy, distance, and siren.",
      pythonQuestion: "Any question you write using for, range, if, elif, ==, <, >, and, or, not!",
      whyPath: "Watch the step tracer show each loop round.",
      action: "Your mecha obeys whatever loop rules you invent!",
      learned: "Experimenting with loops is the best way to master repetition."
    },
    vocabulary: [
      { term: "Playground", meaning: "A free sandbox where you can change sensors and test your own ideas." }
    ],
    hints: [
      "Concept Clue: Try changing count = 5 or energy = 20 at the top.",
      "Structure Guide:\nfor i in range(count):\n    if energy < 30:\n        recharge()\n    else:\n        march()",
      "Guided Correction: Try two-arg loops: for i in range(1, count):"
    ],
    starterCode: 'count = 5\nenergy = 80\nfor i in range(count):\n    if energy < 30:\n        recharge()\n    else:\n        march()',
    solution: 'count = 5\nenergy = 80\nfor i in range(count):\n    if energy < 30:\n        recharge()\n    else:\n        march()',
    variables: ["count", "start", "stop", "energy", "distance", "siren"],
    base: { count: 3, start: 1, stop: 4, energy: 50, distance: 20, siren: false },
    free: true,
    tests: [
      { environment: {}, want: "free", label: "Free patrol test" }
    ],
    teacherExplanation: "Encourage students to change sensors and predict how many loop rounds and which branch runs last.",
    commonMistakes: [],
    studentReflection: "I can design and test my own Python for-loops!"
  }
];