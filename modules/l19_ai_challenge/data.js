export const LESSONS = [
  {
    id: 1,
    title: "Challenge 1: Follow the Command — Neural Core Awakening",
    storyProblem: "Welcome to the Quantum AI Lab! Meet NOVA-19, your Autonomous AI Companion. NOVA's neural core is currently in standby mode awaiting a human commander. In Python, input(\"Enter commander name: \") pauses execution, displays a prompt, and waits for you to type your name. The typed name is saved into variable commander, printed on the console, and passed to ai_boot() and ai_think(commander) to awaken the neural network! Click ▶ Run to follow the commands and watch NOVA-19 initialize its glowing holographic core!",
    concept: "Initializing an AI agent with human input and neural subroutines",
    learnFirst: {
      problem: "NOVA-19 needs to authenticate the commander before activating its neural core.",
      knownInfo: "input(prompt) displays the prompt message and captures human input as a string.",
      pythonQuestion: "How do we ask the user for their commander name and awaken the AI?",
      whyPath: "commander = input(\"...\") stores the commander's identity so ai_boot() and ai_think() can establish the neural link!",
      action: "Click ▶ Run and watch the Live AI Neural Pipeline light up from Perception to Thinking.",
      learned: "AI systems begin by capturing human input, storing variables, and triggering activation subroutines."
    },
    vocabulary: [
      { term: "AI Agent", meaning: "An autonomous software entity that perceives its environment, reasons, and executes actions." },
      { term: "Neural Core", meaning: "The central processing system of NOVA-19 that evaluates inputs and coordinates responses." },
      { term: "ai_boot()", meaning: "A Python command that powers up NOVA-19's sensor arrays and holographic gyro rings." },
      { term: "ai_think()", meaning: "Commands NOVA-19 to engage neural synaptic processing on a query." }
    ],
    hints: [
      "Concept Clue: Look at line 1. 'commander = input(\"Enter commander name: \")' captures your name.",
      "Structure Guide:\ncommander = input(\"Enter commander name: \")\nprint(\"AI Neural Core linked to\", commander)\nai_boot()\nai_think(commander)\nThe starter code is already complete! Press ▶ Run to see it awaken.",
      "Guided Correction: Leave the starter code intact, press ▶ Run, and observe NOVA-19 boot up with holographic rings and neural pulses!"
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
      {
        environment: {},
        inputs: ["Astra"],
        want: "ai_think",
        label: "Test 1: commander 'Astra' -> AI core boots and thinks",
        expect: {
          vars: {
            commander: "Astra"
          },
          stdout: "AI Neural Core linked to Astra"
        },
        constraints: {
          mustUse: ["input", "ai_boot", "ai_think"]
        }
      },
      {
        environment: {},
        inputs: ["CyberCadet"],
        want: "ai_think",
        label: "Test 2: commander 'CyberCadet' -> AI core boots and thinks",
        expect: {
          vars: {
            commander: "CyberCadet"
          },
          stdout: "AI Neural Core linked to CyberCadet"
        },
        constraints: {
          mustUse: ["input", "ai_boot", "ai_think"]
        }
      }
    ],
    teacherExplanation: "Challenge 1 establishes the AI interaction loop. Students see how human input flows into variables, triggers console telemetry via print(), and commands the simulated AI agent to boot up.",
    commonMistakes: [
      "Deleting the variable assignment (writing input() alone without commander =)",
      "Misspelling ai_boot() or ai_think()",
      "Removing quotes around the prompt text"
    ],
    studentReflection: "I discovered how AI programs use input() to receive human commands and activate autonomous neural processes."
  },
  {
    id: 2,
    title: "Challenge 2: Prompt Customization — Insert Your Own Prompt Message",
    storyProblem: "An AI system is only as effective as the instructions it displays to humans! NOVA-19 is ready to analyze sector telemetry, but the terminal input line has an empty placeholder \"____\" on line 1! Insert your own prompt string: replace \"____\" with \"Ask NOVA anything: \". When the user asks \"analyze sector 7\" or \"check energy\", Python prints the query and runs ai_scan(query) to deploy sensor sweeps! Replace \"____\" and click ▶ Run.",
    concept: "Crafting customized prompt messages for AI user interfaces",
    learnFirst: {
      problem: "Line 1 contains an unfilled placeholder '____' inside the input() call.",
      knownInfo: "The string inside input(\"...\") provides clear context so users understand what to ask the AI.",
      pythonQuestion: "What prompt text should we insert inside input()?",
      whyPath: "Putting \"Ask NOVA anything: \" guides the user to submit an actionable question to the AI.",
      action: "Replace '____' with Ask NOVA anything: (keep the quotes), then click ▶ Run.",
      learned: "Clear prompt engineering makes AI systems intuitive, responsive, and user-friendly."
    },
    vocabulary: [
      { term: "Prompt", meaning: "The guidance text displayed to a human user to elicit specific information or questions." },
      { term: "ai_scan()", meaning: "Directs NOVA-19 to perform a deep holographic sensor sweep on the given query." },
      { term: "argument", meaning: "The input data passed inside the parentheses of a function call, such as ai_scan(query)." }
    ],
    hints: [
      "Concept Clue: Look at line 1. Replace '____' with 'Ask NOVA anything: ' inside the quotes.",
      "Structure Guide:\nquery = input(\"Ask NOVA anything: \")\nprint(\"AI analyzing query:\", query)\nai_scan(query)",
      "Guided Correction: Ensure line 1 is query = input(\"Ask NOVA anything: \") and keep ai_scan(query) on line 3, then press ▶ Run."
    ],
    starterCode: `query = input("____")
print("AI analyzing query:", query)
ai_scan(query)`,
    solution: `query = input("Ask NOVA anything: ")
print("AI analyzing query:", query)
ai_scan(query)`,
    variables: ["query"],
    base: {},
    tests: [
      {
        environment: {},
        inputs: ["analyze sector 7"],
        want: "ai_scan",
        label: "Test 1: query 'analyze sector 7' -> AI scans query",
        expect: {
          vars: {
            query: "analyze sector 7"
          },
          stdout: "AI analyzing query: analyze sector 7"
        },
        constraints: {
          mustUse: ["input", "ai_scan"]
        }
      },
      {
        environment: {},
        inputs: ["check energy"],
        want: "ai_scan",
        label: "Test 2: query 'check energy' -> AI scans query",
        expect: {
          vars: {
            query: "check energy"
          },
          stdout: "AI analyzing query: check energy"
        },
        constraints: {
          mustUse: ["input", "ai_scan"]
        }
      }
    ],
    teacherExplanation: "Challenge 2 shifts the student from passive observers to active authors. By customizing the prompt string, students learn that prompts define the conversational boundary between humans and AI.",
    commonMistakes: [
      "Accidentally deleting the closing quotation mark or parenthesis",
      "Changing the variable name query on subsequent lines",
      "Misspelling the prompt string"
    ],
    studentReflection: "I learned how to craft informative prompts that clearly guide users when communicating with an AI."
  },
  {
    id: 3,
    title: "Challenge 3: Intent Classifier — Insert Your Own Decision Logic",
    storyProblem: "Intelligent AI systems must classify human intent! When a commander enters an action, NOVA-19 evaluates the text: if action == \"boost\", the AI diverts auxiliary energy to thrusters with power_boost()! Otherwise, in the else block, NOVA-19 executes ai_scan(action). Look at line 2: if action == \"____\":. Replace the placeholder \"____\" with \"boost\" to insert your own decision logic! Then click ▶ Run to test both branches.",
    concept: "Classifying user intent using conditional if/else decision logic",
    learnFirst: {
      problem: "NOVA-19 needs to distinguish between a 'boost' request and other commands.",
      knownInfo: "if action == \"boost\": checks whether the user input matches the word 'boost'.",
      pythonQuestion: "How do we write the decision check so NOVA-19 triggers power_boost()?",
      whyPath: "Comparing action == \"boost\" allows the AI to choose different autonomous actions based on human intent!",
      action: "Replace '____' on line 2 with boost (keep quotes), then click ▶ Run.",
      learned: "Conditional logic forms the decision-making brain of interactive AI agents."
    },
    vocabulary: [
      { term: "Intent Classification", meaning: "Analyzing user input to determine what goal or action the human wants the AI to perform." },
      { term: "if / else", meaning: "A Python construct that chooses which code path to run based on whether a condition is True or False." },
      { term: "power_boost()", meaning: "Commands NOVA-19 to engage high-speed neon particle thrusters." }
    ],
    hints: [
      "Concept Clue: Replace '____' on line 2 with 'boost'.",
      "Structure Guide:\naction = input(\"Enter AI mode (boost/scan): \")\nif action == \"boost\":\n    power_boost()\nelse:\n    ai_scan(action)",
      "Guided Correction: Make sure line 2 reads if action == \"boost\": with 4 spaces of indentation for power_boost(), then press ▶ Run."
    ],
    starterCode: `action = input("Enter AI mode (boost/scan): ")
if action == "____":
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
      {
        environment: {},
        inputs: ["boost"],
        want: "power_boost",
        label: "Test 1: action is 'boost' -> triggers power_boost()",
        expect: {
          vars: {
            action: "boost"
          }
        },
        constraints: {
          mustUse: ["if", "power_boost", "ai_scan"]
        }
      },
      {
        environment: {},
        inputs: ["scan"],
        want: "ai_scan",
        label: "Test 2: action is 'scan' -> triggers ai_scan()",
        expect: {
          vars: {
            action: "scan"
          }
        },
        constraints: {
          mustUse: ["if", "power_boost", "ai_scan"]
        }
      }
    ],
    teacherExplanation: "Challenge 3 introduces intent classification. Highlight that string equality (==) enables simple keyword-based intent detection, mimicking real natural language classification pipelines.",
    commonMistakes: [
      "Using a single = instead of double == for comparison",
      "Forgetting the colon : at the end of the if line",
      "Mismatched indentation inside the if and else blocks"
    ],
    studentReflection: "I learned how to write if/else conditions to classify user intent and let an AI dynamically choose what action to take."
  },
  {
    id: 4,
    title: "Challenge 4: Neural Confidence — Insert Number Conversion",
    storyProblem: "Before deploying defensive plasma shields, NOVA-19 calculates a neural confidence score (0 to 100). Remember: input() always returns text (a string)! To compare with numbers, we must convert the input using int(). Look at line 1: confidence = ____(input(\"Enter neural confidence: \")). Insert the int function name by replacing \"____\" with int. If confidence >= 75, NOVA activates plasma defense with activate_shield(confidence)! Otherwise, it warns that confidence is too low. Replace \"____\" and click ▶ Run!",
    concept: "Converting user input to numbers with int() for AI confidence thresholds",
    learnFirst: {
      problem: "Text from input() cannot be directly compared to numbers for confidence calculations.",
      knownInfo: "int(\"90\") converts the string \"90\" into the integer number 90.",
      pythonQuestion: "How do we convert user input into a number before checking the threshold?",
      whyPath: "Wrapping input() with int(...) turns the user's keystrokes into a real number we can compare with >= 75!",
      action: "Replace '____' on line 1 with int, then click ▶ Run.",
      learned: "AI confidence thresholds require numeric comparisons, enabled by int(input())."
    },
    vocabulary: [
      { term: "Confidence Score", meaning: "A numerical metric (e.g. 0-100) representing how certain an AI system is in its evaluation." },
      { term: "int()", meaning: "A built-in Python function that converts text or strings into integers." },
      { term: "Threshold", meaning: "A cutoff value (such as 75) that determines whether an autonomous action should be triggered." },
      { term: "activate_shield()", meaning: "Generates a glowing hexagonal plasma defense shield around NOVA-19." }
    ],
    hints: [
      "Concept Clue: Look at line 1. Replace '____' with 'int' to convert the input into a number.",
      "Structure Guide:\nconfidence = int(input(\"Enter neural confidence: \"))\nif confidence >= 75:\n    print(\"Shields activated at full power\")\n    activate_shield(confidence)\nelse:\n    print(\"Confidence too low for defense\")",
      "Guided Correction: Make sure line 1 starts with confidence = int(input(\"Enter neural confidence: \")), then press ▶ Run."
    ],
    starterCode: `confidence = ____(input("Enter neural confidence: "))
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
      {
        environment: {},
        inputs: ["90"],
        want: "activate_shield+",
        label: "Test 1: confidence '90' >= 75 -> activates shield",
        expect: {
          vars: {
            confidence: 90
          },
          stdout: "Shields activated at full power"
        },
        constraints: {
          mustUse: ["input", "int", "activate_shield"]
        }
      },
      {
        environment: {},
        inputs: ["50"],
        want: null,
        label: "Test 2: confidence '50' < 75 -> low confidence warning",
        expect: {
          vars: {
            confidence: 50
          },
          stdout: "Confidence too low for defense"
        },
        constraints: {
          mustUse: ["input", "int"]
        }
      }
    ],
    teacherExplanation: "Challenge 4 links input handling with numerical reasoning. In real machine learning, decisions depend on probability and confidence thresholds. int(input()) is the key syntax building block here.",
    commonMistakes: [
      "Typing int inside quotes like \"int\"",
      "Missing the closing parenthesis at the end of int(input(...))",
      "Comparing confidence with a string like \"75\" instead of integer 75"
    ],
    studentReflection: "I understood that AI systems rely on numeric confidence scores to make safe decisions, and int(input()) lets Python read numbers from users."
  },
  {
    id: 5,
    title: "Challenge 5: Free Play Sandbox — Autonomous AI Studio",
    storyProblem: "Welcome to the Autonomous AI Studio, Lead AI Architect! You now possess full control over the NOVA-19 Cyber Core. Program your own interactive AI agent! Ask for commander names, prompt for custom missions, evaluate confidence levels, trigger power_boost(), deploy activate_shield(power), speak with synthesize_speech(\"...\"), or trigger celebrate()! Combine inputs, if/elif branching, and commands to bring your custom AI companion to life!",
    concept: "Full autonomy: designing custom interactive AI agents in Python",
    learnFirst: {
      problem: "You are the creator of this Autonomous AI agent. Build any interactive AI behavior you want!",
      knownInfo: "You have mastered input(), prompt strings, intent classification, and numeric thresholds.",
      pythonQuestion: "How will you combine inputs and AI commands into an autonomous companion?",
      whyPath: "Building creative programs in the AI Sandbox solidifies your Python and AI problem-solving skills.",
      action: "Modify the code below, test your own interactive commands, and click ▶ Run!",
      learned: "Python gives you the power to create interactive AI systems that perceive, reason, and act."
    },
    vocabulary: [
      { term: "Sandbox", meaning: "An unrestricted development environment for free experimentation and creation." },
      { term: "synthesize_speech()", meaning: "Generates vocal synthesized audio speech from NOVA-19." },
      { term: "celebrate()", meaning: "Triggers a victory light show, neural confetti, and celebratory robotic fanfare." }
    ],
    hints: [
      "Concept Clue: Feel free to change questions, add print() greetings, or test commands like celebrate(), power_boost(), or activate_shield().",
      "Structure Guide:\nname = input(\"Enter commander name: \")\nai_boot()\nmode = input(\"Choose AI mode (boost/shield/celebrate): \")\nif mode == \"boost\":\n    power_boost()\nelif mode == \"shield\":\n    activate_shield(95)\nelif mode == \"celebrate\":\n    celebrate()\nelse:\n    ai_think(mode)",
      "Guided Correction: In the Sandbox, any valid Python program runs freely. Have fun creating your own AI agent companion!"
    ],
    free: true,
    starterCode: `name = input("Enter commander name: ")
ai_boot()
mode = input("Choose AI mode (boost/shield/celebrate): ")
if mode == "boost":
    power_boost()
elif mode == "shield":
    activate_shield(95)
elif mode == "celebrate":
    celebrate()
else:
    ai_think(mode)
print("NOVA-19 mission complete for", name)`,
    solution: `name = input("Enter commander name: ")
ai_boot()
mode = input("Choose AI mode (boost/shield/celebrate): ")
if mode == "boost":
    power_boost()
elif mode == "shield":
    activate_shield(95)
elif mode == "celebrate":
    celebrate()
else:
    ai_think(mode)
print("NOVA-19 mission complete for", name)`,
    variables: ["name", "mode"],
    base: {},
    tests: [
      {
        environment: {},
        inputs: ["Astra", "celebrate"],
        want: null,
        label: "Interactive Autonomous AI session"
      }
    ],
    teacherExplanation: "The Free Play Sandbox empowers students to synthesize everything learned across the module. They can experiment with nested conditions, multi-modal outputs, and autonomous logic without constraints.",
    commonMistakes: [
      "Mismatched quotation marks in strings",
      "Indentation errors in elif blocks"
    ],
    studentReflection: "I can build complete interactive AI agents that prompt users, reason through complex decisions, and trigger exciting autonomous actions!"
  }
];
