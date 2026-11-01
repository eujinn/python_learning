export const LESSONS = [
  {
    id: 1,
    title: "Challenge 1: Follow the Command — First Interactive Program",
    storyProblem: "Meet A.E.X.-18, the Starbase AI Companion Bot! A.E.X. is standing by at the main command terminal and needs to know who is operating the console. In Python, input(\"Enter cadet name: \") pauses the program, displays a prompt on the screen, and waits for the cadet to type a response! Whatever text is typed gets returned as a string and stored inside variable name. Then login(name) authenticates the cadet on the station! Click ▶ Run to follow the commands and watch the terminal interact with you!",
    concept: "Using input() to receive user text and store it in a variable",
    learnFirst: {
      problem: "The terminal needs to identify the cadet operating the console.",
      knownInfo: "input(prompt) displays the prompt message and captures user keystrokes as a string.",
      pythonQuestion: "How does Python ask a user for text and save their answer?",
      whyPath: "name = input(\"...\") waits for the user's keystrokes and saves the resulting string into variable name for our program to use!",
      action: "Click ▶ Run and watch the Live Input Pipeline display prompt, input text, and variable storage.",
      learned: "input() pauses program execution, prompts the user, and captures their typed response as a string variable."
    },
    vocabulary: [
      { term: "input()", meaning: "A built-in Python function that displays a prompt, pauses execution, and returns user-typed text." },
      { term: "prompt", meaning: "The question or message shown inside input(\"...\") to tell the user what to type." },
      { term: "interactive program", meaning: "A program that actively communicates with a human user by requesting input and responding dynamically." },
      { term: "string", meaning: "Textual data surrounded by quotes (such as 'Astra' or 'Nova') returned by input()." }
    ],
    hints: [
      "Concept Clue: Look at line 1. 'name = input(\"Enter cadet name: \")' asks for your name and stores it in variable 'name'.",
      "Structure Guide:\nname = input(\"Enter cadet name: \")\nprint(\"Welcome to Starbase,\", name)\nlogin(name)\nThe code is already complete! Press ▶ Run to see it in action.",
      "Guided Correction: Leave the starter code intact, press ▶ Run, and watch the Live Input Pipeline on the right display the prompt and response!"
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
      {
        environment: {},
        inputs: ["Astra"],
        want: "login",
        label: "Test 1: cadet enters 'Astra' -> logs in",
        expect: {
          vars: {
            name: "Astra"
          },
          stdout: "Welcome to Starbase, Astra"
        },
        constraints: {
          mustUse: ["input", "login"]
        }
      },
      {
        environment: {},
        inputs: ["Nova"],
        want: "login",
        label: "Test 2: cadet enters 'Nova' -> logs in",
        expect: {
          vars: {
            name: "Nova"
          },
          stdout: "Welcome to Starbase, Nova"
        },
        constraints: {
          mustUse: ["input", "login"]
        }
      }
    ],
    teacherExplanation: "Challenge 1 introduces Python's input() function. Emphasize that input() halts execution until the user provides text. The value returned is always a string ('str'), assigned here to variable 'name' and passed to login().",
    commonMistakes: [
      "Forgetting to assign the result of input() to a variable (e.g. just writing input() without name =)",
      "Omitting quotes inside the input() prompt message",
      "Misspelling the variable name when printing or logging in"
    ],
    studentReflection: "I observed how input() lets Python ask the user a question and store their response in a variable to personalize the program."
  },
  {
    id: 2,
    title: "Challenge 2: Prompt Customization — Insert Your Own Prompt Message",
    storyProblem: "Starbase sensors have detected multiple planetary signals! A.E.X.-18 is ready to plot a patrol flight path, but the navigation terminal is missing its prompt instruction! Look at line 1 in the code: destination = input(\"____\"). Replace the placeholder \"____\" with your own prompt string: \"Enter destination: \". When the pilot enters \"Mars\" or \"Europa\", the program prints the confirmation and commands the bot with patrol()! Replace \"____\" and click ▶ Run.",
    concept: "Customizing prompt messages inside input()",
    learnFirst: {
      problem: "Line 1 has an empty placeholder '____' inside the input() function.",
      knownInfo: "The string inside input(\"...\") provides clear instructions so users know what information to enter.",
      pythonQuestion: "What prompt string should we place inside input()?",
      whyPath: "Putting \"Enter destination: \" inside input() clearly guides the pilot on what waypoint to type.",
      action: "Replace '____' with Enter destination: (keep the quotes), then click ▶ Run.",
      learned: "A clear prompt message makes interactive programs easy and intuitive for users to navigate."
    },
    vocabulary: [
      { term: "prompt string", meaning: "The descriptive text placed inside quotes within input(...) that guides the user." },
      { term: "argument", meaning: "A value passed inside the parentheses of a function, such as the prompt string in input(\"...\")." },
      { term: "patrol()", meaning: "Commands A.E.X.-18 to ignite hover thrusters and patrol the planetary coordinates." }
    ],
    hints: [
      "Concept Clue: Look at line 1. Replace '____' with 'Enter destination: ' inside the quotes.",
      "Structure Guide:\ndestination = input(\"Enter destination: \")\nprint(\"Plotting course to\", destination)\npatrol()",
      "Guided Correction: Make sure line 1 reads destination = input(\"Enter destination: \") and keep patrol() on line 3, then press ▶ Run."
    ],
    starterCode: `destination = input("____")
print("Plotting course to", destination)
patrol()`,
    solution: `destination = input("Enter destination: ")
print("Plotting course to", destination)
patrol()`,
    variables: ["destination"],
    base: {},
    tests: [
      {
        environment: {},
        inputs: ["Mars"],
        want: "patrol",
        label: "Test 1: pilot enters 'Mars' -> course plotted to Mars",
        expect: {
          vars: {
            destination: "Mars"
          },
          stdout: "Plotting course to Mars"
        },
        constraints: {
          mustUse: ["input", "patrol"]
        }
      },
      {
        environment: {},
        inputs: ["Europa"],
        want: "patrol",
        label: "Test 2: pilot enters 'Europa' -> course plotted to Europa",
        expect: {
          vars: {
            destination: "Europa"
          },
          stdout: "Plotting course to Europa"
        },
        constraints: {
          mustUse: ["input", "patrol"]
        }
      }
    ],
    teacherExplanation: "Challenge 2 focuses on user experience and prompt design. Students learn that the string argument to input() gives human context before capturing input.",
    commonMistakes: [
      "Leaving the placeholder ____ inside the quotes",
      "Accidentally deleting the quotes around the prompt string",
      "Altering the print() format string or patrol() function call"
    ],
    studentReflection: "I can customize the prompt string inside input() to give clear guidance to anyone using my program."
  },
  {
    id: 3,
    title: "Challenge 3: Interactive Decision Maker — Insert Your Own Command",
    storyProblem: "Time to give users real control! An interactive program doesn't just ask for names — it makes choices based on what the user types. Here, A.E.X. asks: action = input(\"Enter mode (patrol/boost): \"). If the cadet enters 'patrol', the bot calls patrol(). If the cadet enters 'boost', we want the bot to engage overdrive with boost()! Look at line 5: replace '____' with boost() so that when 'boost' is chosen, the thrusters flare! Replace '____' and click ▶ Run.",
    concept: "Branching execution with if/elif based on user input",
    learnFirst: {
      problem: "Line 5 has a placeholder '____' under the elif action == \"boost\": branch.",
      knownInfo: "Interactive programs compare user input strings with == to trigger different commands.",
      pythonQuestion: "What command should run when action equals \"boost\"?",
      whyPath: "When action == \"boost\" is True, calling boost() activates A.E.X.'s overdrive turbo thrusters!",
      action: "Replace '____' on line 5 with boost(), then press ▶ Run.",
      learned: "Combining input() with if and elif statements allows programs to respond dynamically to user commands."
    },
    vocabulary: [
      { term: "branching", meaning: "Directing program flow along different paths based on conditions like user input." },
      { term: "equality ==", meaning: "Checks if the string typed by the user matches an expected target word." },
      { term: "boost()", meaning: "Activates A.E.X.-18's high-speed overdrive thrusters and particle exhaust trail." }
    ],
    hints: [
      "Concept Clue: Look at line 5 under 'elif action == \"boost\":'. Replace '____' with 'boost()'.",
      "Structure Guide:\naction = input(\"Enter mode (patrol/boost): \")\nif action == \"patrol\":\n    patrol()\nelif action == \"boost\":\n    boost()",
      "Guided Correction: Indent boost() with 4 spaces under 'elif action == \"boost\":' and do not forget the parentheses ()!"
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
      {
        environment: {},
        inputs: ["patrol"],
        want: "patrol",
        label: "Test 1: input 'patrol' -> calls patrol()",
        expect: {
          vars: {
            action: "patrol"
          }
        },
        constraints: {
          mustUse: ["input", "if", "patrol"]
        }
      },
      {
        environment: {},
        inputs: ["boost"],
        want: "boost",
        label: "Test 2: input 'boost' -> calls boost()",
        expect: {
          vars: {
            action: "boost"
          }
        },
        constraints: {
          mustUse: ["input", "if", "boost"]
        }
      }
    ],
    teacherExplanation: "Challenge 3 connects input() with decision making. Students see how interactive software operates: prompt -> capture string -> conditional comparison -> specific action.",
    commonMistakes: [
      "Using single = instead of comparison == in condition checks",
      "Forgetting to include empty parentheses () after the function call boost",
      "Incorrect indentation under elif"
    ],
    studentReflection: "I can use if and elif statements to evaluate user input and execute different commands for different choices."
  },
  {
    id: 4,
    title: "Challenge 4: Number Conversion — int(input(...))",
    storyProblem: "Crucial secret of Python: input() ALWAYS gives you a string ('str') with quotes! If a user types 80, Python sees \"80\" (letters, not numbers). You cannot compare \"80\" >= 50 directly! To use user input for calculations or power thresholds, we wrap it in int(): power = int(input(\"Enter shield power: \")). On line 1, replace '____' with int(input(\"Enter shield power: \")). When power is at least 50, A.E.X. raises the plasma force field with shield(power)! Replace '____' and click ▶ Run.",
    concept: "Type casting user input from string to integer with int()",
    learnFirst: {
      problem: "Line 1 has a blank '____'. We need to capture numerical power units from the cadet.",
      knownInfo: "input() returns text ('str'). Wrapping input() inside int() transforms that text into an integer number.",
      pythonQuestion: "How do we get an integer number directly from user input?",
      whyPath: "int(input(\"...\")) takes the string from input() and converts it immediately into a numerical integer.",
      action: "Replace '____' with int(input(\"Enter shield power: \")), then click ▶ Run.",
      learned: "Use int(input(...)) whenever your interactive program expects numbers for comparisons or math."
    },
    vocabulary: [
      { term: "int()", meaning: "A built-in function that converts a string containing digits into an integer number." },
      { term: "type conversion", meaning: "Transforming data from one type (such as string \"80\") into another type (such as integer 80)." },
      { term: "shield()", meaning: "Generates a shimmering plasma force field around A.E.X.-18 calibrated to the power level." }
    ],
    hints: [
      "Concept Clue: Wrap input() inside int() like this: int(input(\"Enter shield power: \")).",
      "Structure Guide:\npower = int(input(\"Enter shield power: \"))\nprint(\"Calibrated shield to\", power)\nif power >= 50:\n    shield(power)",
      "Guided Correction: On line 1, make sure both closing parentheses are present: one for input() and one for int()!"
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
      {
        environment: {},
        inputs: ["80"],
        want: "shield+",
        label: "Test 1: input '80' converted to int 80 >= 50 -> shield active",
        expect: {
          vars: {
            power: 80
          },
          stdout: "Calibrated shield to 80"
        },
        constraints: {
          mustUse: ["input", "int", "shield"]
        }
      },
      {
        environment: {},
        inputs: ["100"],
        want: "shield+",
        label: "Test 2: input '100' converted to int 100 >= 50 -> shield active",
        expect: {
          vars: {
            power: 100
          },
          stdout: "Calibrated shield to 100"
        },
        constraints: {
          mustUse: ["input", "int", "shield"]
        }
      }
    ],
    teacherExplanation: "Challenge 4 addresses one of the most common beginner stumbling blocks: input() always produces a string. Demonstrating int(input()) equips students to safely handle numbers in interactive programs.",
    commonMistakes: [
      "Missing the second closing parenthesis: int(input(...) without the final )",
      "Trying to compare string \"80\" with integer 50 without calling int()",
      "Writing int = input(...) instead of power = int(input(...))"
    ],
    studentReflection: "I discovered that input() always returns text, and wrapping it in int(input()) turns it into a real number I can use for math and conditions."
  },
  {
    id: 5,
    title: "Challenge 5: Free Play Sandbox — Interactive Cyber Terminal",
    storyProblem: "Welcome to the Free Play Sandbox Commander! You now have full clearance over the A.E.X.-18 Cyber Terminal. Design your own interactive Python program! Ask for pilot names, prompt for custom flight modes, test shield power, or trigger celebrate()! You can use login(), patrol(), boost(), shield(power), say(\"...\"), celebrate(), and print(). Experiment with your own prompts and watch your AI bot respond in real time!",
    concept: "Open-ended interactive program development",
    learnFirst: {
      problem: "You are the lead architect of this Starbase terminal. Build any interactive program you desire!",
      knownInfo: "You have learned input(), prompt strings, if/elif branching, and int() number conversions.",
      pythonQuestion: "How will you combine inputs and commands into an interactive terminal experience?",
      whyPath: "Creative programming in the sandbox solidifies your understanding of interactive Python programs.",
      action: "Modify the code below, enter inputs, and press ▶ Run to test your custom creations!",
      learned: "Interactive programs allow endless possibilities for user communication, games, tools, and robotics."
    },
    vocabulary: [
      { term: "free play", meaning: "An open sandbox environment to explore and combine everything you have learned." },
      { term: "celebrate()", meaning: "Triggers an energetic victory dance, light show, and celebratory fanfare!" },
      { term: "say()", meaning: "Displays speech text directly in A.E.X.'s holographic voice bubble." }
    ],
    hints: [
      "Concept Clue: Feel free to change questions, add print() greetings, or test commands like celebrate(), boost(), or patrol().",
      "Structure Guide:\nname = input(\"Enter pilot name: \")\nlogin(name)\ncommand = input(\"Choose action: \")\nif command == \"boost\":\n    boost()\nelif command == \"celebrate\":\n    celebrate()\nelse:\n    patrol()",
      "Guided Correction: In Sandbox mode, any valid Python program runs freely. Have fun creating your own bot terminal!"
    ],
    free: true,
    starterCode: `name = input("Enter pilot name: ")
login(name)
command = input("Choose action (patrol/boost/shield/celebrate): ")
if command == "patrol":
    patrol()
elif command == "boost":
    boost()
elif command == "celebrate":
    celebrate()
else:
    shield(100)
print("Mission ready for", name)`,
    solution: `name = input("Enter pilot name: ")
login(name)
command = input("Choose action (patrol/boost/shield/celebrate): ")
if command == "patrol":
    patrol()
elif command == "boost":
    boost()
elif command == "celebrate":
    celebrate()
else:
    shield(100)
print("Mission ready for", name)`,
    variables: ["name", "command"],
    base: {},
    tests: [
      {
        environment: {},
        inputs: ["Alex", "celebrate"],
        want: null,
        label: "Sandbox interactive session"
      }
    ],
    teacherExplanation: "The sandbox encourages student autonomy. They can combine multiple input calls, nested conditionals, or custom output messages to build interactive text adventures or bot controllers.",
    commonMistakes: [
      "Mismatched quotes in strings",
      "Indentation errors in if/elif blocks"
    ],
    studentReflection: "I can build complete interactive Python programs that ask questions, make decisions based on user answers, and control animated systems."
  }
];
