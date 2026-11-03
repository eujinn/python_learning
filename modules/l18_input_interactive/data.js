/* Input + Interactive Program — Cyber Terminal & Bot (Lesson 18)
   20-exercise backbone:
     recap 1-4  → Lesson 17 while-loop refresher
     basic 5-10 → input(), prompts, decisions, int(input())
     debug 11-15→ repair input/if syntax
     challenge 16-18 → interactive programs
     advanced 19-20 → comment-guided missions */

export const LESSONS = [
  /* ============================ RECAP (1–4) ============================ */
  {
    id: 1,
    tier: "recap",
    title: "Recap: While Count",
    storyProblem: "Warm up with Lesson 17's while loop. Print 0, 1, 2 with i = 0 while i < 3.",
    concept: "while recap",
    learnFirst: {
      problem: "Repeat a print three times with while.",
      knownInfo: "while i < 3: repeats.",
      pythonQuestion: "What does print(i) show?",
      whyPath: "i takes 0,1,2.",
      action: "Print and increase i inside the loop.",
      learned: "A while loop repeats while True."
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
    title: "Recap: Patrol Twice",
    storyProblem: "Patrol twice with a while loop: scans = 0 while scans < 2.",
    concept: "while with a command",
    learnFirst: {
      problem: "Repeat patrol twice.",
      knownInfo: "while scans < 2 repeats twice.",
      pythonQuestion: "When does it stop?",
      whyPath: "scans reaches 2.",
      action: "patrol and increase inside.",
      learned: "A command can repeat in while."
    },
    vocabulary: [{ term: "count", meaning: "How many times." }],
    hints: [
      "Concept Clue: while scans < 2.",
      "Structure Guide:\nwhile scans < 2:\n    patrol()\n    scans = scans + 1",
      "Guided Correction: Increase scans."
    ],
    starterCode: `scans = 0
while scans < 2:
    patrol()
    scans = scans + 1`,
    solution: `scans = 0
while scans < 2:
    patrol()
    scans = scans + 1`,
    variables: ["scans"],
    base: {},
    tests: [{ environment: {}, want: "patrol*2", expect: { vars: { scans: 2 } }, label: "patrol twice" }],
    teacherExplanation: "Recap a command inside while.",
    commonMistakes: ["No increment"],
    studentReflection: "I can repeat a command with while."
  },
  {
    id: 3,
    tier: "recap",
    title: "Recap: Countdown",
    storyProblem: "Print 3, 2, 1 with fuel = 3 while fuel > 0.",
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
      "Guided Correction: Subtract inside."
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
    title: "Recap: Loop Then Celebrate",
    storyProblem: "Patrol twice in a while loop, then celebrate() after the loop.",
    concept: "loop + finale recap",
    learnFirst: {
      problem: "Repeat, then finish once.",
      knownInfo: "Un-indented lines run after the loop.",
      pythonQuestion: "Where is celebrate()?",
      whyPath: "After the loop.",
      action: "Loop patrol twice, then celebrate().",
      learned: "Finish a loop with one command."
    },
    vocabulary: [{ term: "post-loop", meaning: "Commands after the loop." }],
    hints: [
      "Concept Clue: celebrate() is not indented.",
      "Structure Guide:\nwhile i < 2:\n    patrol()\n    i = i + 1\ncelebrate()",
      "Guided Correction: Put celebrate at the left edge."
    ],
    starterCode: `i = 0
while i < 2:
    patrol()
    i = i + 1`,
    solution: `i = 0
while i < 2:
    patrol()
    i = i + 1
celebrate()`,
    variables: ["i"],
    base: {},
    tests: [{ environment: {}, want: "celebrate", expect: { vars: { i: 2 } }, label: "loop then celebrate" }],
    teacherExplanation: "Recap post-loop commands.",
    commonMistakes: ["Indenting celebrate"],
    studentReflection: "I can finish a loop with celebrate."
  },

  /* ============================ BASIC (5–10) =========================== */
  {
    id: 5,
    tier: "basic",
    title: "First Interactive Program",
    storyProblem: "Ask for the cadet's name with input(), greet them, then log in.",
    concept: "input() basics",
    learnFirst: {
      problem: "Ask the user for text.",
      knownInfo: "input(\"prompt\") returns what the user types.",
      pythonQuestion: "What does input return?",
      whyPath: "A string of what was typed.",
      action: "Store input, print a welcome, then login(name).",
      learned: "input() pauses and returns typed text."
    },
    vocabulary: [
      { term: "input()", meaning: "Asks the user and returns their text." },
      { term: "prompt", meaning: "The message shown while asking." }
    ],
    hints: [
      "Concept Clue: name = input(\"...\") stores the answer.",
      "Structure Guide:\nname = input(\"Enter cadet name: \")\nprint(\"Welcome to Starbase,\", name)\nlogin(name)",
      "Guided Correction: The code is complete — press Run."
    ],
    starterCode: `name = input("Enter cadet name: ")
print("Welcome to Starbase,", name)
login(name)`,
    solution: `name = input("Enter cadet name: ")
print("Welcome to Starbase,", name)
login(name)`,
    variables: ["name"],
    base: {},
    tests: [
      { environment: {}, inputs: ["Astra"], want: "login", expect: { vars: { name: "Astra" }, stdout: "Welcome to Starbase, Astra" }, constraints: { mustUse: ["input", "login"] }, label: "Astra logs in" },
      { environment: {}, inputs: ["Nova"], want: "login", expect: { vars: { name: "Nova" }, stdout: "Welcome to Starbase, Nova" }, constraints: { mustUse: ["input", "login"] }, label: "Nova logs in" }
    ],
    teacherExplanation: "Introduce input(); the returned value is a string.",
    commonMistakes: ["Forgetting to assign input", "Missing prompt quotes"],
    studentReflection: "I can ask for a name with input()."
  },
  {
    id: 6,
    tier: "basic",
    title: "Prompt Customization",
    storyProblem: "Write your own prompt message, store the answer, then log in.",
    concept: "Custom prompt",
    learnFirst: {
      problem: "Choose the prompt text.",
      knownInfo: "input(\"your message\") shows your message.",
      pythonQuestion: "Does the prompt change the answer?",
      whyPath: "The prompt is just a message.",
      action: "Write input with your own prompt, then login.",
      learned: "The prompt is your choice."
    },
    vocabulary: [{ term: "prompt", meaning: "The asking message." }],
    hints: [
      "Concept Clue: put your message inside input().",
      "Structure Guide:\nname = input(\"Who is piloting? \")\nlogin(name)",
      "Guided Correction: Keep the quotes around the prompt."
    ],
    starterCode: `name = input("Enter cadet name: ")
login(name)`,
    solution: `name = input("Who is piloting? ")
login(name)`,
    variables: ["name"],
    base: {},
    tests: [
      { environment: {}, inputs: ["Mars"], want: "login", expect: { vars: { name: "Mars" } }, constraints: { mustUse: ["input", "login"] }, label: "Mars" },
      { environment: {}, inputs: ["Europa"], want: "login", expect: { vars: { name: "Europa" } }, constraints: { mustUse: ["input", "login"] }, label: "Europa" }
    ],
    teacherExplanation: "Open-ended prompt; any quoted prompt works.",
    commonMistakes: ["Removing the prompt quotes"],
    studentReflection: "I can customize the input prompt."
  },
  {
    id: 7,
    tier: "basic",
    title: "Interactive Decision Maker",
    storyProblem: "Ask for a mode (patrol or boost), then use if/elif to run the right command.",
    concept: "input + if/elif",
    learnFirst: {
      problem: "Decide based on the typed answer.",
      knownInfo: "input returns a string; compare with ==.",
      pythonQuestion: "Is action == \"patrol\"?",
      whyPath: "True runs patrol, elif runs boost.",
      action: "Ask, then branch.",
      learned: "input values can drive if/elif."
    },
    vocabulary: [{ term: "==", meaning: "Compare two values." }],
    hints: [
      "Concept Clue: action = input(...) then if action == \"patrol\":",
      "Structure Guide:\naction = input(\"Enter mode (patrol/boost): \")\nif action == \"patrol\":\n    patrol()\nelif action == \"boost\":\n    boost()",
      "Guided Correction: Add boost() under elif."
    ],
    starterCode: `action = input("Enter mode (patrol/boost): ")
if action == "patrol":
    patrol()
elif action == "boost":
    ____`,
    solution: `action = input("Enter mode (patrol/boost): ")
if action == "patrol":
    patrol()
elif action == "boost":
    boost()`,
    variables: ["action"],
    base: {},
    tests: [
      { environment: {}, inputs: ["patrol"], want: "patrol", constraints: { mustUse: ["input", "if", "patrol"] }, label: "patrol" },
      { environment: {}, inputs: ["boost"], want: "boost", constraints: { mustUse: ["input", "if", "boost"] }, label: "boost" }
    ],
    teacherExplanation: "Branch on a typed choice.",
    commonMistakes: ["Using = instead of ==", "Forgetting a branch"],
    studentReflection: "I can choose a command from input."
  },
  {
    id: 8,
    tier: "basic",
    title: "Number Conversion — int(input(...))",
    storyProblem: "Ask for shield power, convert the text to a number with int(), then shield(power) when it is at least 50.",
    concept: "int(input())",
    learnFirst: {
      problem: "Use a typed number in a comparison.",
      knownInfo: "input returns text; int() converts it.",
      pythonQuestion: "Is power >= 50?",
      whyPath: "int(input()) makes a real number.",
      action: "Wrap input in int(), then compare.",
      learned: "int(input()) turns typed text into a number."
    },
    vocabulary: [{ term: "int()", meaning: "Converts text to a whole number." }],
    hints: [
      "Concept Clue: power = int(input(...)).",
      "Structure Guide:\npower = int(input(\"Enter shield power: \"))\nif power >= 50:\n    shield(power)",
      "Guided Correction: Keep both closing parentheses."
    ],
    starterCode: `power = ____
print("Calibrated shield to", power)
if power >= 50:
    shield(power)`,
    solution: `power = int(input("Enter shield power: "))
print("Calibrated shield to", power)
if power >= 50:
    shield(power)`,
    variables: ["power"],
    base: {},
    tests: [
      { environment: {}, inputs: ["80"], want: "shield+", expect: { vars: { power: 80 }, stdout: "Calibrated shield to 80" }, constraints: { mustUse: ["input", "int", "shield"] }, label: "80" },
      { environment: {}, inputs: ["100"], want: "shield+", expect: { vars: { power: 100 }, stdout: "Calibrated shield to 100" }, constraints: { mustUse: ["input", "int", "shield"] }, label: "100" }
    ],
    teacherExplanation: "input always yields a string; int() converts it for comparisons.",
    commonMistakes: ["Missing final )", "Comparing a string to 50"],
    studentReflection: "I can convert input into a number."
  },
  {
    id: 9,
    tier: "basic",
    title: "Say the Call Sign",
    storyProblem: "Ask for a call sign with input(), then say(call) to greet the bot.",
    concept: "input + say",
    learnFirst: {
      problem: "Store input and pass it to say.",
      knownInfo: "say(text) speaks text.",
      pythonQuestion: "What does say receive?",
      whyPath: "The typed call sign.",
      action: "call = input(...); say(call).",
      learned: "Pass input directly to a command."
    },
    vocabulary: [{ term: "say()", meaning: "Makes the bot speak." }],
    hints: [
      "Concept Clue: say(call) after input.",
      "Structure Guide:\ncall = input(\"Call sign? \")\nsay(call)",
      "Guided Correction: No quotes around call."
    ],
    starterCode: `call = input("Call sign? ")
say(____)`,
    solution: `call = input("Call sign? ")
say(call)`,
    variables: ["call"],
    base: {},
    tests: [{ environment: {}, inputs: ["Alex"], want: "say", expect: { vars: { call: "Alex" } }, constraints: { mustUse: ["input", "say"] }, label: "say call sign" }],
    teacherExplanation: "Pass an input value to a command.",
    commonMistakes: ["Quoting the variable", "Not assigning input"],
    studentReflection: "I can pass input to a command."
  },
  {
    id: 10,
    tier: "basic",
    title: "Boost or Patrol",
    storyProblem: "Ask for a choice; if it is boost call boost(), otherwise call patrol().",
    concept: "input + if/else",
    learnFirst: {
      problem: "Two-way choice from input.",
      knownInfo: "if/else picks one branch.",
      pythonQuestion: "Is choice == \"boost\"?",
      whyPath: "True boosts; else patrols.",
      action: "Ask, then if/else.",
      learned: "else handles every other answer."
    },
    vocabulary: [{ term: "else", meaning: "Runs when if is False." }],
    hints: [
      "Concept Clue: if choice == \"boost\": boost() else: patrol().",
      "Structure Guide:\nchoice = input(\"boost or patrol? \")\nif choice == \"boost\":\n    boost()\nelse:\n    patrol()",
      "Guided Correction: Keep else un-indented."
    ],
    starterCode: `choice = input("boost or patrol? ")
if choice == "boost":
    boost()`,
    solution: `choice = input("boost or patrol? ")
if choice == "boost":
    boost()
else:
    patrol()`,
    variables: ["choice"],
    base: {},
    tests: [
      { environment: {}, inputs: ["boost"], want: "boost", label: "boost" },
      { environment: {}, inputs: ["patrol"], want: "patrol", label: "patrol" }
    ],
    teacherExplanation: "Two-way interactive branch.",
    commonMistakes: ["Missing else", "Using ="],
    studentReflection: "I can use if/else with input."
  },

  /* ============================ DEBUG (11–15) ========================== */
  {
    id: 11,
    tier: "debug",
    title: "Missing Prompt Quotes",
    storyProblem: "The prompt is not in quotes. Add quotes so input() can show it.",
    concept: "Fix prompt quotes",
    learnFirst: {
      problem: "The prompt needs quotes.",
      knownInfo: "input(\"text\") needs a string.",
      pythonQuestion: "What is missing around the prompt?",
      whyPath: "Quotes make it a string.",
      action: "Add quotes around the prompt.",
      learned: "Prompts are strings."
    },
    vocabulary: [{ term: "string", meaning: "Text in quotes." }],
    hints: [
      "Concept Clue: wrap the prompt in quotes.",
      "Structure Guide:\nname = input(\"Enter name: \")\nlogin(name)",
      "Guided Correction: Add \" around the prompt."
    ],
    starterCode: `# Bug: prompt not quoted
name = input(Enter name: )
login(name)`,
    solution: `name = input("Enter name: ")
login(name)`,
    variables: ["name"],
    base: {},
    tests: [{ environment: {}, inputs: ["Astra"], want: "login", expect: { vars: { name: "Astra" } }, label: "fixed prompt" }],
    teacherExplanation: "Debug an unquoted prompt.",
    commonMistakes: ["Quoting only one side"],
    studentReflection: "I know prompts need quotes."
  },
  {
    id: 12,
    tier: "debug",
    title: "Missing Parentheses",
    storyProblem: "input is written without brackets. Add ( ) around the prompt.",
    concept: "Fix input brackets",
    learnFirst: {
      problem: "The call has no brackets.",
      knownInfo: "input(\"text\") uses brackets.",
      pythonQuestion: "What is missing?",
      whyPath: "Add ( ) after input.",
      action: "Wrap the prompt in brackets.",
      learned: "Commands need brackets."
    },
    vocabulary: [{ term: "brackets", meaning: "The ( ) after a command." }],
    hints: [
      "Concept Clue: input(\"Name: \").",
      "Structure Guide:\nname = input(\"Name: \")\nlogin(name)",
      "Guided Correction: Add ( and )."
    ],
    starterCode: `# Bug: missing brackets
name = input "Name: "
login(name)`,
    solution: `name = input("Name: ")
login(name)`,
    variables: ["name"],
    base: {},
    tests: [{ environment: {}, inputs: ["Nova"], want: "login", expect: { vars: { name: "Nova" } }, label: "fixed brackets" }],
    teacherExplanation: "Debug missing call brackets.",
    commonMistakes: ["Adding only one bracket"],
    studentReflection: "I know commands need brackets."
  },
  {
    id: 13,
    tier: "debug",
    title: "Missing int()",
    storyProblem: "power is text, so comparing it to 50 fails. Wrap input in int() to make it a number.",
    concept: "Fix int(input())",
    learnFirst: {
      problem: "The typed number is text.",
      knownInfo: "int() converts text to a number.",
      pythonQuestion: "How do we compare power to 50?",
      whyPath: "int(input(...)) makes a number.",
      action: "Wrap input in int().",
      learned: "Convert input before numeric comparisons."
    },
    vocabulary: [{ term: "int()", meaning: "Converts text to a number." }],
    hints: [
      "Concept Clue: power = int(input(...)).",
      "Structure Guide:\npower = int(input(\"n: \"))\nif power >= 50:\n    shield(power)",
      "Guided Correction: Add int( around input and one more )."
    ],
    starterCode: `# Bug: power is text
power = input("n: ")
if power >= 50:
    shield(power)`,
    solution: `power = int(input("n: "))
if power >= 50:
    shield(power)`,
    variables: ["power"],
    base: {},
    tests: [{ environment: {}, inputs: ["80"], want: "shield+", expect: { vars: { power: 80 } }, label: "fixed int" }],
    teacherExplanation: "Debug a missing int() conversion.",
    commonMistakes: ["Missing the final )", "Using float incorrectly"],
    studentReflection: "I convert input before comparing numbers."
  },
  {
    id: 14,
    tier: "debug",
    title: "One Equals in the If",
    storyProblem: "The if uses = instead of ==. Fix it so the comparison works.",
    concept: "Fix = vs ==",
    learnFirst: {
      problem: "The condition assigns instead of comparing.",
      knownInfo: "== compares.",
      pythonQuestion: "Which sign asks a question?",
      whyPath: "== compares two values.",
      action: "Change = to ==.",
      learned: "Conditions use ==."
    },
    vocabulary: [{ term: "==", meaning: "Comparison." }],
    hints: [
      "Concept Clue: change = to ==.",
      "Structure Guide:\nif action == \"patrol\":\n    patrol()",
      "Guided Correction: Two equals signs."
    ],
    starterCode: `# Bug: = in a condition
action = input("mode? ")
if action = "patrol":
    patrol()`,
    solution: `action = input("mode? ")
if action == "patrol":
    patrol()`,
    variables: ["action"],
    base: {},
    tests: [{ environment: {}, inputs: ["patrol"], want: "patrol", label: "fixed ==" }],
    teacherExplanation: "Debug = vs ==.",
    commonMistakes: ["Changing the branch"],
    studentReflection: "I know conditions use ==."
  },
  {
    id: 15,
    tier: "debug",
    title: "Missing Indentation",
    storyProblem: "The if body is not indented. Indent patrol() so it belongs to the if.",
    concept: "Fix if indentation",
    learnFirst: {
      problem: "The body is outside the if.",
      knownInfo: "Indented lines belong to the if.",
      pythonQuestion: "Which line is inside?",
      whyPath: "patrol is indented.",
      action: "Indent patrol().",
      learned: "Indentation defines the if body."
    },
    vocabulary: [{ term: "indent", meaning: "Spaces showing block membership." }],
    hints: [
      "Concept Clue: indent patrol() under the if.",
      "Structure Guide:\nif action == \"patrol\":\n    patrol()",
      "Guided Correction: Add 4 spaces."
    ],
    starterCode: `# Bug: body outside the if
action = input("mode? ")
if action == "patrol":
patrol()`,
    solution: `action = input("mode? ")
if action == "patrol":
    patrol()`,
    variables: ["action"],
    base: {},
    tests: [{ environment: {}, inputs: ["patrol"], want: "patrol", label: "fixed indent" }],
    teacherExplanation: "Debug missing if indentation.",
    commonMistakes: ["Indenting the if line"],
    studentReflection: "I can indent an if body."
  },

  /* =========================== CHALLENGE (16–18) ======================= */
  {
    id: 16,
    tier: "challenge",
    title: "Login and Patrol",
    storyProblem: "Ask for a name, log in, then patrol once.",
    concept: "input + two commands",
    learnFirst: {
      problem: "Ask, log in, then patrol.",
      knownInfo: "input then two commands.",
      pythonQuestion: "What order?",
      whyPath: "input, login, patrol.",
      action: "Write the three lines.",
      learned: "Combine input with commands."
    },
    vocabulary: [{ term: "login()", meaning: "Logs the cadet in." }],
    hints: [
      "Concept Clue: input, login, patrol in order.",
      "Structure Guide:\nname = input(\"Name? \")\nlogin(name)\npatrol()",
      "Guided Correction: Keep the order."
    ],
    starterCode: `# Your turn: input, login, patrol
`,
    solution: `name = input("Name? ")
login(name)
patrol()`,
    variables: ["name"],
    base: {},
    tests: [{ environment: {}, inputs: ["Astra"], want: "patrol", expect: { vars: { name: "Astra" } }, constraints: { mustUse: ["input", "login", "patrol"] }, label: "login then patrol" }],
    teacherExplanation: "Independent input + commands.",
    commonMistakes: ["Wrong order", "Not assigning input"],
    studentReflection: "I can combine input with several commands."
  },
  {
    id: 17,
    tier: "challenge",
    title: "Shield Check",
    storyProblem: "Ask for power with int(input()). If it is at least 50, shield(power); otherwise boost().",
    concept: "int input + if/else",
    learnFirst: {
      problem: "Choose shield or boost from a number.",
      knownInfo: "int(input()) and if/else.",
      pythonQuestion: "Is power >= 50?",
      whyPath: "True shields; else boosts.",
      action: "Convert, compare, branch.",
      learned: "Numbers from input can drive decisions."
    },
    vocabulary: [{ term: "int()", meaning: "Convert text to number." }],
    hints: [
      "Concept Clue: if power >= 50: shield(power) else: boost().",
      "Structure Guide:\npower = int(input(\"power? \"))\nif power >= 50:\n    shield(power)\nelse:\n    boost()",
      "Guided Correction: Convert with int()."
    ],
    starterCode: `# Your turn: shield if >= 50 else boost
`,
    solution: `power = int(input("power? "))
if power >= 50:
    shield(power)
else:
    boost()`,
    variables: ["power"],
    base: {},
    tests: [
      { environment: {}, inputs: ["80"], want: "shield+", expect: { vars: { power: 80 } }, constraints: { mustUse: ["int", "shield"] }, label: "80 shields" },
      { environment: {}, inputs: ["20"], want: "boost", expect: { vars: { power: 20 } }, constraints: { mustUse: ["int", "boost"] }, label: "20 boosts" }
    ],
    teacherExplanation: "Independent numeric interactive branch.",
    commonMistakes: ["Missing int()", "Using ="],
    studentReflection: "I can decide from a typed number."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Celebrate if Yes",
    storyProblem: "Ask yes/no. If the answer is yes, celebrate(); otherwise print Standing by.",
    concept: "input + if/else with print",
    learnFirst: {
      problem: "Celebrate only on yes.",
      knownInfo: "Compare answer to yes.",
      pythonQuestion: "Is answer == \"yes\"?",
      whyPath: "True celebrates; else stands by.",
      action: "Ask, then branch.",
      learned: "Text answers can drive branches."
    },
    vocabulary: [{ term: "else", meaning: "Fallback branch." }],
    hints: [
      "Concept Clue: if answer == \"yes\": celebrate().",
      "Structure Guide:\nanswer = input(\"Celebrate? \")\nif answer == \"yes\":\n    celebrate()\nelse:\n    print(\"Standing by\")",
      "Guided Correction: Keep else."
    ],
    starterCode: `# Your turn: celebrate on yes
`,
    solution: `answer = input("Celebrate? ")
if answer == "yes":
    celebrate()
else:
    print("Standing by")`,
    variables: ["answer"],
    base: {},
    tests: [
      { environment: {}, inputs: ["yes"], want: "celebrate", label: "yes celebrates" },
      { environment: {}, inputs: ["no"], want: "print", expect: { stdout: "Standing by" }, label: "no stands by" }
    ],
    teacherExplanation: "Independent text-driven branch.",
    commonMistakes: ["Missing else", "Using ="],
    studentReflection: "I can branch on a yes/no answer."
  },

  /* ============================ ADVANCED (19–20) ======================= */
  {
    id: 19,
    tier: "advanced",
    title: "Mission Briefing",
    storyProblem: "Follow the comments: ask for a name and log in, then ask for a mode and run patrol or boost.",
    concept: "Comment-guided interactive program",
    learnFirst: {
      problem: "Build a two-step interactive program from comments.",
      knownInfo: "Input name, login; input mode, branch.",
      pythonQuestion: "What order?",
      whyPath: "The comments give the order.",
      action: "Follow the comments.",
      learned: "I can build an interactive program from a plan."
    },
    vocabulary: [{ term: "comment", meaning: "A note starting with #." }],
    hints: [
      "Concept Clue: follow the comments in order.",
      "Structure Guide:\n# input name -> login; input mode -> if/else patrol/boost",
      "Guided Correction: Keep both inputs."
    ],
    starterCode: `# 1) name = input("Name? ")
# 2) login(name)
# 3) mode = input("mode? ")
# 4) if mode == "patrol": patrol() else: boost()`,
    solution: `name = input("Name? ")
login(name)
mode = input("mode? ")
if mode == "patrol":
    patrol()
else:
    boost()`,
    variables: ["name", "mode"],
    base: {},
    tests: [
      { environment: {}, inputs: ["Astra", "patrol"], want: "patrol", expect: { vars: { name: "Astra", mode: "patrol" } }, label: "patrol mission" },
      { environment: {}, inputs: ["Nova", "boost"], want: "boost", expect: { vars: { name: "Nova", mode: "boost" } }, label: "boost mission" }
    ],
    teacherExplanation: "Advanced: two inputs and a branch from comments.",
    commonMistakes: ["Wrong order", "Missing second input"],
    studentReflection: "I can build a two-step interactive program."
  },
  {
    id: 20,
    tier: "advanced",
    title: "Full Interactive Mission",
    storyProblem: "Follow the comments: input a name and log in, input power as a number, shield or boost, then celebrate.",
    concept: "Full interactive mission",
    learnFirst: {
      problem: "Build a full interactive mission from comments.",
      knownInfo: "Two inputs, int conversion, branch, finale.",
      pythonQuestion: "What runs last?",
      whyPath: "celebrate() after the branch.",
      action: "Follow the comments.",
      learned: "I can compose a complete interactive program."
    },
    vocabulary: [{ term: "mission", meaning: "A sequence of commands." }],
    hints: [
      "Concept Clue: follow the comments in order.",
      "Structure Guide:\n# name -> login; power = int(input); if >=50 shield else boost; celebrate",
      "Guided Correction: celebrate is not indented."
    ],
    starterCode: `# 1) name = input("Name? ")
# 2) login(name)
# 3) power = int(input("power? "))
# 4) if power >= 50: shield(power) else: boost()
# 5) celebrate()`,
    solution: `name = input("Name? ")
login(name)
power = int(input("power? "))
if power >= 50:
    shield(power)
else:
    boost()
celebrate()`,
    variables: ["name", "power"],
    base: {},
    tests: [
      { environment: {}, inputs: ["Astra", "80"], want: "celebrate", expect: { vars: { name: "Astra", power: 80 } }, label: "shield mission" },
      { environment: {}, inputs: ["Nova", "20"], want: "celebrate", expect: { vars: { name: "Nova", power: 20 } }, label: "boost mission" }
    ],
    teacherExplanation: "Advanced: full interactive mission with conversion, branch, and finale.",
    commonMistakes: ["Missing int()", "Indenting celebrate"],
    studentReflection: "I can compose a full interactive program."
  }
];
