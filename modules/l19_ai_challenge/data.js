/* Python AI Challenge — Cyber Core NOVA-19 (Lesson 19)
   20-exercise backbone:
     recap 1-4  → Lesson 18 input refresher
     basic 5-10 → boot, prompt, intent, confidence, speech
     debug 11-15→ repair input/if syntax
     challenge 16-18 → autonomous sequences
     advanced 19-20 → comment-guided missions */

export const LESSONS = [
  /* ============================ RECAP (1–4) ============================ */
  {
    id: 1,
    tier: "recap",
    title: "Recap: Ask a Name",
    storyProblem: "Warm up with Lesson 18 input(). Ask for a name, store it, and print it.",
    concept: "input recap",
    learnFirst: {
      problem: "Ask for text and print it.",
      knownInfo: "input(\"prompt\") returns text.",
      pythonQuestion: "What does input return?",
      whyPath: "The typed text.",
      action: "name = input(...); print(name).",
      learned: "input returns what the user types."
    },
    vocabulary: [{ term: "input()", meaning: "Asks and returns text." }],
    hints: [
      "Concept Clue: name = input(\"Name? \").",
      "Structure Guide:\nname = input(\"Name? \")\nprint(name)",
      "Guided Correction: Keep the prompt in quotes."
    ],
    starterCode: `name = input("Name? ")
print(name)`,
    solution: `name = input("Name? ")
print(name)`,
    variables: ["name"],
    base: {},
    tests: [{ environment: {}, inputs: ["Astra"], want: "print", expect: { stdout: "Astra", vars: { name: "Astra" } }, label: "print name" }],
    teacherExplanation: "Recap input.",
    commonMistakes: ["Not assigning input", "Missing prompt quotes"],
    studentReflection: "I remember input()."
  },
  {
    id: 2,
    tier: "recap",
    title: "Recap: Ask a Number",
    storyProblem: "Ask for a number and convert it with int(), then print it.",
    concept: "int(input()) recap",
    learnFirst: {
      problem: "Turn typed text into a number.",
      knownInfo: "int() converts text to a number.",
      pythonQuestion: "How do we get a number?",
      whyPath: "int(input(...)) returns a number.",
      action: "n = int(input(...)); print(n).",
      learned: "int() converts typed text to a number."
    },
    vocabulary: [{ term: "int()", meaning: "Convert text to number." }],
    hints: [
      "Concept Clue: n = int(input(\"n? \")).",
      "Structure Guide:\nn = int(input(\"n? \"))\nprint(n)",
      "Guided Correction: Keep both )."
    ],
    starterCode: `n = int(input("n? "))
print(n)`,
    solution: `n = int(input("n? "))
print(n)`,
    variables: ["n"],
    base: {},
    tests: [{ environment: {}, inputs: ["7"], want: "print", expect: { stdout: "7", vars: { n: 7 } }, label: "print number" }],
    teacherExplanation: "Recap int(input()).",
    commonMistakes: ["Missing int()", "Missing )"],
    studentReflection: "I can convert input to a number."
  },
  {
    id: 3,
    tier: "recap",
    title: "Recap: Branch on Input",
    storyProblem: "Ask for a mode. If it is scan call ai_scan(mode), otherwise call ai_think(mode).",
    concept: "input + if/else recap",
    learnFirst: {
      problem: "Choose a command from input.",
      knownInfo: "Compare input with ==.",
      pythonQuestion: "Is mode == \"scan\"?",
      whyPath: "True scans; else thinks.",
      action: "Ask, then if/else.",
      learned: "Input can drive a branch."
    },
    vocabulary: [{ term: "==", meaning: "Compare two values." }],
    hints: [
      "Concept Clue: if mode == \"scan\": ai_scan(mode) else: ai_think(mode).",
      "Structure Guide:\nmode = input(\"mode? \")\nif mode == \"scan\":\n    ai_scan(mode)\nelse:\n    ai_think(mode)",
      "Guided Correction: Pass mode to the command."
    ],
    starterCode: `mode = input("mode? ")
if mode == "scan":
    ai_scan(mode)`,
    solution: `mode = input("mode? ")
if mode == "scan":
    ai_scan(mode)
else:
    ai_think(mode)`,
    variables: ["mode"],
    base: {},
    tests: [
      { environment: {}, inputs: ["scan"], want: "ai_scan", expect: { vars: { mode: "scan" } }, label: "scan" },
      { environment: {}, inputs: ["boost"], want: "ai_think", expect: { vars: { mode: "boost" } }, label: "think" }
    ],
    teacherExplanation: "Recap input-driven branching.",
    commonMistakes: ["Using =", "Missing else"],
    studentReflection: "I can branch on input."
  },
  {
    id: 4,
    tier: "recap",
    title: "Recap: Loop a Print",
    storyProblem: "Print 0 and 1 with for i in range(2).",
    concept: "for loop recap",
    learnFirst: {
      problem: "Repeat a print twice.",
      knownInfo: "range(2) repeats twice.",
      pythonQuestion: "What does print(i) show?",
      whyPath: "i is 0 then 1.",
      action: "Indent print(i).",
      learned: "for loops repeat."
    },
    vocabulary: [{ term: "range(2)", meaning: "Repeat 2 times." }],
    hints: [
      "Concept Clue: for i in range(2):",
      "Structure Guide:\nfor i in range(2):\n    print(i)",
      "Guided Correction: Indent print."
    ],
    starterCode: `for i in range(2):
    print(i)`,
    solution: `for i in range(2):
    print(i)`,
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "0\n1" }, label: "count 0-1" }],
    teacherExplanation: "Recap for loops.",
    commonMistakes: ["Quoting i"],
    studentReflection: "I remember for loops."
  },

  /* ============================ BASIC (5–10) =========================== */
  {
    id: 5,
    tier: "basic",
    title: "Neural Core Awakening",
    storyProblem: "Ask for the commander name, print a link message, then ai_boot() and ai_think(commander).",
    concept: "input + AI boot",
    learnFirst: {
      problem: "Wake NOVA with the commander's name.",
      knownInfo: "input stores the name; commands use it.",
      pythonQuestion: "What order do the calls run?",
      whyPath: "input, print, ai_boot, ai_think.",
      action: "Store input and pass it to ai_think.",
      learned: "Pass an input value to commands."
    },
    vocabulary: [
      { term: "ai_boot()", meaning: "Wakes the AI core." },
      { term: "ai_think(x)", meaning: "Processes a value." }
    ],
    hints: [
      "Concept Clue: ai_think(commander).",
      "Structure Guide:\ncommander = input(...)\nprint(\"AI Neural Core linked to\", commander)\nai_boot()\nai_think(commander)",
      "Guided Correction: The code is complete — press Run."
    ],
    starterCode: `commander = input("Enter commander name: ")
print("AI Neural Core linked to", commander)
ai_boot()
ai_think(commander)`,
    solution: `commander = input("Enter commander name: ")
print("AI Neural Core linked to", commander)
ai_boot()
ai_think(commander)`,
    variables: ["commander"],
    base: {},
    tests: [
      { environment: {}, inputs: ["Astra"], want: "ai_think", expect: { vars: { commander: "Astra" }, stdout: "AI Neural Core linked to Astra" }, constraints: { mustUse: ["input", "ai_boot", "ai_think"] }, label: "Astra" },
      { environment: {}, inputs: ["CyberCadet"], want: "ai_think", expect: { vars: { commander: "CyberCadet" }, stdout: "AI Neural Core linked to CyberCadet" }, constraints: { mustUse: ["input", "ai_boot", "ai_think"] }, label: "CyberCadet" }
    ],
    teacherExplanation: "Introduce input with AI commands.",
    commonMistakes: ["Not assigning input", "Wrong order"],
    studentReflection: "I can boot the AI with a name."
  },
  {
    id: 6,
    tier: "basic",
    title: "Prompt Customization",
    storyProblem: "Write your own prompt, store the query, print it, then ai_scan(query).",
    concept: "Custom prompt",
    learnFirst: {
      problem: "Choose the prompt text.",
      knownInfo: "Your prompt is a string.",
      pythonQuestion: "Does the prompt change the query?",
      whyPath: "No, it is just a message.",
      action: "Write your prompt, then ai_scan.",
      learned: "Prompts are your choice."
    },
    vocabulary: [{ term: "prompt", meaning: "The asking message." }],
    hints: [
      "Concept Clue: put your message inside input().",
      "Structure Guide:\nquery = input(\"Ask NOVA anything: \")\nai_scan(query)",
      "Guided Correction: Keep the quotes."
    ],
    starterCode: `query = input("Ask NOVA anything: ")
print("AI analyzing query:", query)
ai_scan(query)`,
    solution: `query = input("Ask NOVA anything: ")
print("AI analyzing query:", query)
ai_scan(query)`,
    variables: ["query"],
    base: {},
    tests: [
      { environment: {}, inputs: ["analyze sector 7"], want: "ai_scan", expect: { vars: { query: "analyze sector 7" }, stdout: "AI analyzing query: analyze sector 7" }, constraints: { mustUse: ["input", "ai_scan"] }, label: "sector 7" },
      { environment: {}, inputs: ["check energy"], want: "ai_scan", expect: { vars: { query: "check energy" }, stdout: "AI analyzing query: check energy" }, constraints: { mustUse: ["input", "ai_scan"] }, label: "check energy" }
    ],
    teacherExplanation: "Open-ended prompt; pass query to ai_scan.",
    commonMistakes: ["Missing quotes", "Not passing query"],
    studentReflection: "I can customize the prompt."
  },
  {
    id: 7,
    tier: "basic",
    title: "Intent Classifier",
    storyProblem: "Ask for an AI mode. If it is boost call power_boost(), otherwise ai_scan(action).",
    concept: "input + intent branch",
    learnFirst: {
      problem: "Classify the intent and run a command.",
      knownInfo: "if/else chooses a branch.",
      pythonQuestion: "Is action == \"boost\"?",
      whyPath: "True boosts; else scans.",
      action: "Ask, then if/else.",
      learned: "Branches can select AI actions."
    },
    vocabulary: [{ term: "intent", meaning: "What the user wants." }],
    hints: [
      "Concept Clue: if action == \"boost\": power_boost().",
      "Structure Guide:\naction = input(...)\nif action == \"boost\":\n    power_boost()\nelse:\n    ai_scan(action)",
      "Guided Correction: Keep else."
    ],
    starterCode: `action = input("Enter AI mode (boost/scan): ")
if action == "boost":
    power_boost()
else:
    ai_scan(action)`,
    solution: `action = input("Enter AI mode (boost/scan): ")
if action == "boost":
    power_boost()
else:
    ai_scan(action)`,
    variables: ["action"],
    base: {},
    tests: [
      { environment: {}, inputs: ["boost"], want: "power_boost", expect: { vars: { action: "boost" } }, constraints: { mustUse: ["if", "power_boost", "ai_scan"] }, label: "boost" },
      { environment: {}, inputs: ["scan"], want: "ai_scan", expect: { vars: { action: "scan" } }, constraints: { mustUse: ["if", "power_boost", "ai_scan"] }, label: "scan" }
    ],
    teacherExplanation: "Branch on intent.",
    commonMistakes: ["Using =", "Missing branch"],
    studentReflection: "I can classify an intent."
  },
  {
    id: 8,
    tier: "basic",
    title: "Neural Confidence",
    storyProblem: "Ask for confidence with int(input()). If it is at least 75, activate_shield(confidence); otherwise print a warning.",
    concept: "int(input()) threshold",
    learnFirst: {
      problem: "Use a numeric threshold.",
      knownInfo: "int(input()) gives a number.",
      pythonQuestion: "Is confidence >= 75?",
      whyPath: "True activates the shield.",
      action: "Convert, compare, branch.",
      learned: "Numeric input can gate actions."
    },
    vocabulary: [{ term: "threshold", meaning: "The cut-off value." }],
    hints: [
      "Concept Clue: confidence = int(input(...)).",
      "Structure Guide:\nconfidence = int(input(...))\nif confidence >= 75:\n    activate_shield(confidence)",
      "Guided Correction: Keep both )."
    ],
    starterCode: `confidence = int(input("Enter neural confidence: "))
if confidence >= 75:
    print("Shields activated at full power")
    activate_shield(confidence)
else:
    print("Confidence too low for defense")`,
    solution: `confidence = int(input("Enter neural confidence: "))
if confidence >= 75:
    print("Shields activated at full power")
    activate_shield(confidence)
else:
    print("Confidence too low for defense")`,
    variables: ["confidence"],
    base: {},
    tests: [
      { environment: {}, inputs: ["90"], want: "activate_shield+", expect: { vars: { confidence: 90 }, stdout: "Shields activated at full power" }, constraints: { mustUse: ["input", "int", "activate_shield"] }, label: "90" },
      { environment: {}, inputs: ["50"], want: null, expect: { vars: { confidence: 50 }, stdout: "Confidence too low for defense" }, constraints: { mustUse: ["input", "int", "activate_shield"] }, label: "50" }
    ],
    teacherExplanation: "Threshold from converted input.",
    commonMistakes: ["Missing int()", "Wrong comparison"],
    studentReflection: "I can gate actions by a number."
  },
  {
    id: 9,
    tier: "basic",
    title: "Speak the Query",
    storyProblem: "Ask for a query and speak it with synthesize_speech(query).",
    concept: "input + speech",
    learnFirst: {
      problem: "Pass input to a speech command.",
      knownInfo: "synthesize_speech(text) speaks.",
      pythonQuestion: "What does it receive?",
      whyPath: "The typed query.",
      action: "q = input(...); synthesize_speech(q).",
      learned: "Input can be spoken."
    },
    vocabulary: [{ term: "synthesize_speech()", meaning: "Speaks text." }],
    hints: [
      "Concept Clue: synthesize_speech(q).",
      "Structure Guide:\nq = input(\"Query? \")\nsynthesize_speech(q)",
      "Guided Correction: No quotes around q."
    ],
    starterCode: `q = input("Query? ")
synthesize_speech(____)`,
    solution: `q = input("Query? ")
synthesize_speech(q)`,
    variables: ["q"],
    base: {},
    tests: [{ environment: {}, inputs: ["hello"], want: "synthesize_speech", expect: { vars: { q: "hello" } }, constraints: { mustUse: ["input", "synthesize_speech"] }, label: "speak query" }],
    teacherExplanation: "Pass input to a command.",
    commonMistakes: ["Quoting q", "Not assigning input"],
    studentReflection: "I can pass input to a command."
  },
  {
    id: 10,
    tier: "basic",
    title: "Boot and Think",
    storyProblem: "Boot the AI, ask for a query, then ai_think(query).",
    concept: "Sequence with input",
    learnFirst: {
      problem: "Boot, ask, think.",
      knownInfo: "Order matters.",
      pythonQuestion: "What runs after input?",
      whyPath: "ai_think(query).",
      action: "ai_boot(); q=input; ai_think(q).",
      learned: "Combine commands and input in order."
    },
    vocabulary: [{ term: "sequence", meaning: "Order of commands." }],
    hints: [
      "Concept Clue: boot, input, think.",
      "Structure Guide:\nai_boot()\nq = input(\"Query? \")\nai_think(q)",
      "Guided Correction: Keep the order."
    ],
    starterCode: `ai_boot()
q = input("Query? ")
ai_think(q)`,
    solution: `ai_boot()
q = input("Query? ")
ai_think(q)`,
    variables: ["q"],
    base: {},
    tests: [{ environment: {}, inputs: ["status"], want: "ai_think", expect: { vars: { q: "status" } }, constraints: { mustUse: ["ai_boot", "input", "ai_think"] }, label: "boot and think" }],
    teacherExplanation: "Sequence commands with input.",
    commonMistakes: ["Wrong order"],
    studentReflection: "I can sequence boot, input, and think."
  },

  /* ============================ DEBUG (11–15) ========================== */
  {
    id: 11,
    tier: "debug",
    title: "Missing Prompt Quotes",
    storyProblem: "The prompt is not in quotes. Add quotes so input() works.",
    concept: "Fix prompt quotes",
    learnFirst: {
      problem: "The prompt needs quotes.",
      knownInfo: "input(\"text\").",
      pythonQuestion: "What is missing?",
      whyPath: "Quotes make a string.",
      action: "Add quotes around the prompt.",
      learned: "Prompts are strings."
    },
    vocabulary: [{ term: "string", meaning: "Text in quotes." }],
    hints: [
      "Concept Clue: wrap the prompt in quotes.",
      "Structure Guide:\nname = input(\"Name? \")",
      "Guided Correction: Add \" around the prompt."
    ],
    starterCode: `# Bug: prompt not quoted
name = input(Name? )
print(name)`,
    solution: `name = input("Name? ")
print(name)`,
    variables: ["name"],
    base: {},
    tests: [{ environment: {}, inputs: ["Astra"], want: "print", expect: { stdout: "Astra" }, label: "fixed prompt" }],
    teacherExplanation: "Debug an unquoted prompt.",
    commonMistakes: ["Quoting one side"],
    studentReflection: "Prompts need quotes."
  },
  {
    id: 12,
    tier: "debug",
    title: "Missing int()",
    storyProblem: "confidence is text, so comparing it to 75 fails. Wrap input in int().",
    concept: "Fix int(input())",
    learnFirst: {
      problem: "The typed number is text.",
      knownInfo: "int() converts.",
      pythonQuestion: "How do we compare to 75?",
      whyPath: "int(input(...)).",
      action: "Wrap input in int().",
      learned: "Convert text before numeric comparison."
    },
    vocabulary: [{ term: "int()", meaning: "Convert to number." }],
    hints: [
      "Concept Clue: confidence = int(input(...)).",
      "Structure Guide:\nconfidence = int(input(\"n: \"))\nif confidence >= 75:\n    activate_shield(confidence)",
      "Guided Correction: Add int( and one more )."
    ],
    starterCode: `# Bug: confidence is text
confidence = input("n: ")
if confidence >= 75:
    activate_shield(confidence)`,
    solution: `confidence = int(input("n: "))
if confidence >= 75:
    activate_shield(confidence)`,
    variables: ["confidence"],
    base: {},
    tests: [{ environment: {}, inputs: ["90"], want: "activate_shield+", expect: { vars: { confidence: 90 } }, label: "fixed int" }],
    teacherExplanation: "Debug a missing int().",
    commonMistakes: ["Missing final )"],
    studentReflection: "I convert input before comparing."
  },
  {
    id: 13,
    tier: "debug",
    title: "One Equals in the If",
    storyProblem: "The if uses = instead of ==. Fix the comparison.",
    concept: "Fix = vs ==",
    learnFirst: {
      problem: "The condition assigns.",
      knownInfo: "== compares.",
      pythonQuestion: "Which sign asks a question?",
      whyPath: "== compares.",
      action: "Change = to ==.",
      learned: "Conditions use ==."
    },
    vocabulary: [{ term: "==", meaning: "Comparison." }],
    hints: [
      "Concept Clue: change = to ==.",
      "Structure Guide:\nif action == \"boost\":",
      "Guided Correction: Two equals signs."
    ],
    starterCode: `# Bug: = in a condition
action = input("mode? ")
if action = "boost":
    power_boost()`,
    solution: `action = input("mode? ")
if action == "boost":
    power_boost()`,
    variables: ["action"],
    base: {},
    tests: [{ environment: {}, inputs: ["boost"], want: "power_boost", label: "fixed ==" }],
    teacherExplanation: "Debug = vs ==.",
    commonMistakes: ["Changing the branch"],
    studentReflection: "I know conditions use ==."
  },
  {
    id: 14,
    tier: "debug",
    title: "Missing Indentation",
    storyProblem: "The if body is not indented. Indent ai_boot() so it belongs to the if.",
    concept: "Fix if indentation",
    learnFirst: {
      problem: "The body is outside the if.",
      knownInfo: "Indented lines belong to the if.",
      pythonQuestion: "Which line is inside?",
      whyPath: "ai_boot is indented.",
      action: "Indent ai_boot().",
      learned: "Indentation defines the if body."
    },
    vocabulary: [{ term: "indent", meaning: "Spaces showing block membership." }],
    hints: [
      "Concept Clue: indent ai_boot() under the if.",
      "Structure Guide:\nif mode == \"boot\":\n    ai_boot()",
      "Guided Correction: Add 4 spaces."
    ],
    starterCode: `# Bug: body outside the if
mode = input("mode? ")
if mode == "boot":
ai_boot()`,
    solution: `mode = input("mode? ")
if mode == "boot":
    ai_boot()`,
    variables: ["mode"],
    base: {},
    tests: [{ environment: {}, inputs: ["boot"], want: "ai_boot", label: "fixed indent" }],
    teacherExplanation: "Debug missing if indentation.",
    commonMistakes: ["Indenting the if line"],
    studentReflection: "I can indent an if body."
  },
  {
    id: 15,
    tier: "debug",
    title: "Missing Closing Parenthesis",
    storyProblem: "int(input(...) is missing its final ) so Python cannot finish the call. Close it.",
    concept: "Fix nested parentheses",
    learnFirst: {
      problem: "The nested call is not closed.",
      knownInfo: "int(input(...)) needs two ).",
      pythonQuestion: "How many ) at the end?",
      whyPath: "One for int, one for input.",
      action: "Add the missing ).",
      learned: "Nested calls need balanced parentheses."
    },
    vocabulary: [{ term: "parentheses", meaning: "The ( ) around arguments." }],
    hints: [
      "Concept Clue: add the final ).",
      "Structure Guide:\npower = int(input(\"n: \"))",
      "Guided Correction: Count the brackets."
    ],
    starterCode: `# Bug: missing final )
power = int(input("n: ")
if power >= 50:
    activate_shield(power)`,
    solution: `power = int(input("n: "))
if power >= 50:
    activate_shield(power)`,
    variables: ["power"],
    base: {},
    tests: [{ environment: {}, inputs: ["80"], want: "activate_shield+", expect: { vars: { power: 80 } }, label: "fixed parens" }],
    teacherExplanation: "Debug unbalanced nested parentheses.",
    commonMistakes: ["Adding ) in the wrong place"],
    studentReflection: "I can balance nested calls."
  },

  /* =========================== CHALLENGE (16–18) ======================= */
  {
    id: 16,
    tier: "challenge",
    title: "Full AI Sequence",
    storyProblem: "Boot the AI, ask for a query, think about it, scan it, then celebrate().",
    concept: "AI pipeline",
    learnFirst: {
      problem: "Build a full AI sequence.",
      knownInfo: "boot, input, think, scan, celebrate.",
      pythonQuestion: "What order?",
      whyPath: "Follow the pipeline.",
      action: "Write the sequence.",
      learned: "I can compose an AI pipeline."
    },
    vocabulary: [{ term: "pipeline", meaning: "A sequence of commands." }],
    hints: [
      "Concept Clue: boot, input, think, scan, celebrate.",
      "Structure Guide:\nai_boot()\nq = input(\"Query? \")\nai_think(q)\nai_scan(q)\ncelebrate()",
      "Guided Correction: Keep the order."
    ],
    starterCode: `# Your turn: full AI sequence
`,
    solution: `ai_boot()
q = input("Query? ")
ai_think(q)
ai_scan(q)
celebrate()`,
    variables: ["q"],
    base: {},
    tests: [{ environment: {}, inputs: ["hello"], want: "celebrate", expect: { vars: { q: "hello" } }, constraints: { mustUse: ["ai_boot", "input", "ai_think", "ai_scan", "celebrate"] }, label: "AI pipeline" }],
    teacherExplanation: "Independent AI pipeline.",
    commonMistakes: ["Wrong order", "Missing a command"],
    studentReflection: "I can compose an AI pipeline."
  },
  {
    id: 17,
    tier: "challenge",
    title: "Confidence Gate",
    storyProblem: "Ask for confidence with int(input()). If it is at least 90, activate_shield(power); otherwise power_boost().",
    concept: "Numeric gate",
    learnFirst: {
      problem: "Choose shield or boost by confidence.",
      knownInfo: "int(input()) and if/else.",
      pythonQuestion: "Is confidence >= 90?",
      whyPath: "True shields; else boosts.",
      action: "Convert, compare, branch.",
      learned: "Numeric thresholds gate actions."
    },
    vocabulary: [{ term: "threshold", meaning: "Cut-off value." }],
    hints: [
      "Concept Clue: if confidence >= 90: activate_shield(...).",
      "Structure Guide:\nconfidence = int(input(\"conf? \"))\nif confidence >= 90:\n    activate_shield(confidence)\nelse:\n    power_boost()",
      "Guided Correction: Convert with int()."
    ],
    starterCode: `# Your turn: shield at 90+ else boost
`,
    solution: `confidence = int(input("conf? "))
if confidence >= 90:
    activate_shield(confidence)
else:
    power_boost()`,
    variables: ["confidence"],
    base: {},
    tests: [
      { environment: {}, inputs: ["95"], want: "activate_shield+", expect: { vars: { confidence: 95 } }, constraints: { mustUse: ["int", "activate_shield"] }, label: "95 shields" },
      { environment: {}, inputs: ["60"], want: "power_boost", expect: { vars: { confidence: 60 } }, constraints: { mustUse: ["int", "power_boost"] }, label: "60 boosts" }
    ],
    teacherExplanation: "Independent numeric gate.",
    commonMistakes: ["Missing int()", "Using ="],
    studentReflection: "I can gate actions with a threshold."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Intent and Confidence",
    storyProblem: "Ask for an action and a confidence. If action is boost, power_boost(); otherwise activate_shield(confidence).",
    concept: "Two inputs + branch",
    learnFirst: {
      problem: "Use two inputs in one program.",
      knownInfo: "Two input calls; branch on the first.",
      pythonQuestion: "Which input drives the branch?",
      whyPath: "action drives it.",
      action: "Ask action, then confidence, then branch.",
      learned: "Multiple inputs can drive a program."
    },
    vocabulary: [{ term: "input", meaning: "Ask the user." }],
    hints: [
      "Concept Clue: action = input(...); confidence = int(input(...)).",
      "Structure Guide:\naction = input(\"mode? \")\nconfidence = int(input(\"conf? \"))\nif action == \"boost\":\n    power_boost()\nelse:\n    activate_shield(confidence)",
      "Guided Correction: Convert confidence with int()."
    ],
    starterCode: `# Your turn: two inputs and a branch
`,
    solution: `action = input("mode? ")
confidence = int(input("conf? "))
if action == "boost":
    power_boost()
else:
    activate_shield(confidence)`,
    variables: ["action", "confidence"],
    base: {},
    tests: [
      { environment: {}, inputs: ["boost", "50"], want: "power_boost", expect: { vars: { action: "boost", confidence: 50 } }, label: "boost" },
      { environment: {}, inputs: ["scan", "80"], want: "activate_shield", expect: { vars: { action: "scan", confidence: 80 } }, label: "shield" }
    ],
    teacherExplanation: "Independent two-input branch.",
    commonMistakes: ["Wrong input order", "Missing int()"],
    studentReflection: "I can use two inputs in a program."
  },

  /* ============================ ADVANCED (19–20) ======================= */
  {
    id: 19,
    tier: "advanced",
    title: "Autonomous Briefing",
    storyProblem: "Follow the comments: ask for a commander, print the link message, ai_boot(), then ai_think(commander).",
    concept: "Comment-guided AI briefing",
    learnFirst: {
      problem: "Build an AI briefing from comments.",
      knownInfo: "input, print, boot, think.",
      pythonQuestion: "What order?",
      whyPath: "The comments give the order.",
      action: "Follow the comments.",
      learned: "I can build an AI briefing."
    },
    vocabulary: [{ term: "comment", meaning: "A note starting with #." }],
    hints: [
      "Concept Clue: follow the comments.",
      "Structure Guide:\n# input commander; print link; ai_boot; ai_think",
      "Guided Correction: Pass commander to ai_think."
    ],
    starterCode: `# 1) commander = input("Name? ")
# 2) print("AI Neural Core linked to", commander)
# 3) ai_boot()
# 4) ai_think(commander)`,
    solution: `commander = input("Name? ")
print("AI Neural Core linked to", commander)
ai_boot()
ai_think(commander)`,
    variables: ["commander"],
    base: {},
    tests: [{ environment: {}, inputs: ["Astra"], want: "ai_think", expect: { vars: { commander: "Astra" }, stdout: "AI Neural Core linked to Astra" }, label: "briefing" }],
    teacherExplanation: "Advanced: AI briefing from comments.",
    commonMistakes: ["Wrong order", "Missing input"],
    studentReflection: "I can build an AI briefing."
  },
  {
    id: 20,
    tier: "advanced",
    title: "NOVA-19 Final Mission",
    storyProblem: "Follow the comments: input a name, boot, input action, int confidence, branch boost vs shield, then celebrate.",
    concept: "Full AI mission",
    learnFirst: {
      problem: "Compose the full NOVA mission.",
      knownInfo: "Two inputs, conversion, branch, finale.",
      pythonQuestion: "What runs last?",
      whyPath: "celebrate().",
      action: "Follow the comments.",
      learned: "I can compose a full AI mission."
    },
    vocabulary: [{ term: "mission", meaning: "A full program sequence." }],
    hints: [
      "Concept Clue: follow the comments in order.",
      "Structure Guide:\n# name; boot; action; confidence; branch; celebrate",
      "Guided Correction: celebrate is not indented."
    ],
    starterCode: `# 1) name = input("Name? ")
# 2) ai_boot()
# 3) action = input("mode? ")
# 4) confidence = int(input("conf? "))
# 5) if action == "boost": power_boost() else: activate_shield(confidence)
# 6) celebrate()`,
    solution: `name = input("Name? ")
ai_boot()
action = input("mode? ")
confidence = int(input("conf? "))
if action == "boost":
    power_boost()
else:
    activate_shield(confidence)
celebrate()`,
    variables: ["name", "action", "confidence"],
    base: {},
    tests: [
      { environment: {}, inputs: ["Astra", "boost", "40"], want: "celebrate", expect: { vars: { name: "Astra", action: "boost", confidence: 40 } }, label: "boost mission" },
      { environment: {}, inputs: ["Nova", "scan", "95"], want: "celebrate", expect: { vars: { name: "Nova", action: "scan", confidence: 95 } }, label: "shield mission" }
    ],
    teacherExplanation: "Advanced: full AI mission with conversion, branch, and finale.",
    commonMistakes: ["Wrong input order", "Missing int()", "Indenting celebrate"],
    studentReflection: "I can compose a full AI mission."
  }
];
