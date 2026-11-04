export const LESSONS = [
  {
    id: 1,
    title: "First Hello",
    storyProblem: "A friendly parrot named Echo lives in the output panel. Say hello to it! The code already has a print() command \u2014 just press Run to see what happens.",
    concept: "print() basics",
    learnFirst: {
      problem: "We want the parrot to repeat our message.",
      knownInfo: "print() is a Python command that shows text on the screen.",
      pythonQuestion: "What goes inside the brackets of print()?",
      whyPath: "The text inside quote marks \"\" is called a string.",
      action: "Click Run to watch print(\"Hello Python!\") execute step by step.",
      learned: "print() repeats whatever string you put inside the brackets."
    },
    vocabulary: [
      { term: "print()", meaning: "A Python command that shows (prints) text on the output screen." },
      { term: "string", meaning: "A piece of text wrapped in quote marks, like \"Hello\"." },
      { term: "argument", meaning: "The value you put inside the brackets of a command, like \"Hello\" in print(\"Hello\")." },
      { term: "output", meaning: "What the program shows back to you after you run it." }
    ],
    hints: [
      "Concept Clue: print() repeats whatever text is inside the brackets. Look at line 1 \u2014 it already has a message ready!",
      "Structure Guide:\nJust press the ▶ Run button. The code print(\"Hello Python!\") is already written for you below.",
      "Guided Correction: The starter code is correct. Click ▶ Run step by step to see the parrot repeat your message."
    ],
    starterCode: 'print("Hello Python!")',
    solution: 'print("Hello Python!")',
    variables: [],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Test 1: print a greeting"
      }
    ],
    teacherExplanation: "Lesson 1 introduces print() with a pre-written command. Students just press Run and see the trace. This builds confidence and shows the step-through mechanic.",
    commonMistakes: [
      "Typing print without brackets",
      "Forgetting the opening quote mark"
    ],
    studentReflection: "I can use print() to show a message on the screen."
  },
  {
    id: 2,
    title: "Your Own Words",
    storyProblem: "Echo the parrot is bored of \"Hello Python!\". Change the message inside the print() to something fun \u2014 your own words!",
    concept: "Custom strings",
    learnFirst: {
      problem: "We want the parrot to repeat something new.",
      knownInfo: "print(\"message\") shows whatever string is inside the quotes.",
      pythonQuestion: "How do we change what the parrot says?",
      whyPath: "Replace the text inside the quote marks with your own words.",
      action: "Change \"____\" in the starter code to your own message, then press Run.",
      learned: "You can put any text inside print() to show your own message."
    },
    vocabulary: [
      { term: "string", meaning: "Any text wrapped in quote marks, like \"pizza\" or \"Hello\"." },
      { term: "argument", meaning: "The input you give to print() that gets shown on screen." }
    ],
    hints: [
      'Concept Clue: The message lives inside the quote marks "". Change the text between the quotes to something you want the parrot to say.',
      'Structure Guide:\nprint("____")\nReplace the ____ with your own message, keeping the quotes "" around it.',
      "Guided Correction: Change the text inside the quotes. Example: print(\"Pizza is the best!\")"
    ],
    starterCode: 'print("____")',
    solution: 'print("Python is fun!")',
    variables: [],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Test 1: print your own message"
      }
    ],
    teacherExplanation: "Students replace a placeholder with their own message. Any string passes since the test only checks that print() was called.",
    commonMistakes: [
      "Forgetting the closing quote mark",
      "Deleting the quotes entirely",
      "Typing text without quotes around it"
    ],
    studentReflection: "I can change what print() shows by editing the text inside the quotes."
  },
  {
    id: 3,
    title: "Two-Line News",
    storyProblem: "The parrot wants to announce TWO things! Use two print() commands, one after the other, so Echo tells a mini news report.",
    concept: "Multiple print() calls",
    learnFirst: {
      problem: "We need the parrot to say two different things.",
      knownInfo: "Each print() command shows one line of text.",
      pythonQuestion: "How do we make the parrot say two things in order?",
      whyPath: "Python runs code top to bottom. Write two print() lines, one for each message.",
      action: "Write two print() commands, one on each line, with different messages.",
      learned: "Python runs commands in order, top to bottom. Multiple print() calls show multiple lines."
    },
    vocabulary: [
      { term: "sequence", meaning: "The order in which Python runs your commands, from top to bottom." }
    ],
    hints: [
      "Concept Clue: Python reads code from top to bottom. Write one print() on line 1 and another on line 2.",
      "Structure Guide:\nprint(\"First message\")\nprint(\"Second message\")",
      "Guided Correction: Each print() goes on its own line. Make sure both have quotes around the text."
    ],
    starterCode: 'print("")',
    solution: 'print("Breaking news:")\nprint("Stay tuned!")',
    variables: [],
    base: {},
    tests: [
      {
        environment: {},
        want: "print*2",
        label: "Test 1: two print() commands"
      }
    ],
    teacherExplanation: "Lesson 3 introduces multi-line programs. Students must call print() twice. The test uses count-based matching (print*2).",
    commonMistakes: [
      "Writing both messages in one print() separated by a comma (covered in lesson 5)",
      "Only writing one print() command"
    ],
    studentReflection: "I can make the parrot say multiple things by using print() more than once."
  },
  {
    id: 4,
    title: "Say a Number",
    storyProblem: "Parrots can repeat numbers too! Make Echo say the number 7. No quotes needed \u2014 numbers can go straight inside print().",
    concept: "Number arguments",
    learnFirst: {
      problem: "We want the parrot to repeat a number instead of text.",
      knownInfo: "Words need quotes \"\", but numbers in Python can stand alone.",
      pythonQuestion: "Do numbers need quote marks inside print()?",
      whyPath: "Numbers are their own data type. Python understands them without quotes.",
      action: "Write print(7) \u2014 just the number, no quotes.",
      learned: "Numbers don't need quotes inside print(). Python prints them as-is."
    },
    vocabulary: [
      { term: "integer", meaning: "A whole number in Python, like 7 or 42." }
    ],
    hints: [
      "Concept Clue: Numbers can go straight inside print() without quote marks. Try print(7).",
      "Structure Guide:\nprint(7)\nNo quotes needed around the number.",
      "Guided Correction: Write print(7) on its own line."
    ],
    starterCode: 'print("")',
    solution: 'print(7)',
    variables: [],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Test 1: print a number"
      }
    ],
    teacherExplanation: "Students learn that numbers don't require quotes in print(). This introduces the idea of data types.",
    commonMistakes: [
      "Putting quotes around the number like print(\"7\") \u2014 that still works but shows a string",
      "Forgetting brackets"
    ],
    studentReflection: "I know that numbers can go inside print() without quote marks."
  },
  {
    id: 5,
    title: "Say Two Things",
    storyProblem: "Echo loves when you give it TWO things at once! Put a comma between them inside print() and watch the parrot say both.",
    concept: "Multiple arguments",
    learnFirst: {
      problem: "We want the parrot to say two things in one print() command.",
      knownInfo: "print() can take more than one argument separated by commas.",
      pythonQuestion: "How do we give print() two things to say?",
      whyPath: "Put a comma , between the two values inside the brackets.",
      action: "Try print(\"Hello\", \"world\") \u2014 two strings separated by a comma.",
      learned: "print() can take multiple arguments. A comma separates them, and Python joins them with a space."
    },
    vocabulary: [
      { term: "multiple arguments", meaning: "Giving a command more than one input, separated by commas." }
    ],
    hints: [
      'Concept Clue: Inside the brackets, put a comma between the two things. Example: print("Hello", "world")',
      'Structure Guide:\nprint("First part", "Second part")\nEach part has its own quotes. The comma goes between them.',
      "Guided Correction: Write print(\"Hello\", \"world\") \u2014 two strings with a comma between."
    ],
    starterCode: 'print("")',
    solution: 'print("Hello", "world")',
    variables: [],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Test 1: print with two arguments"
      }
    ],
    teacherExplanation: "Lesson 5 introduces multi-argument print(). The comma-separated values are joined with a space when displayed.",
    commonMistakes: [
      "Forgetting the comma between arguments",
      "Putting the comma outside the quotes like print(\"Hello\" \"world\")"
    ],
    studentReflection: "I can put multiple things inside print() by separating them with a comma."
  },
  {
    id: 6,
    title: "\ud83c\udfae Free Sandbox",
    storyProblem: "The sandbox is YOUR stage! Print anything you like \u2014 words, numbers, or both. Let Echo repeat whatever you create.",
    concept: "print() creative practice",
    learnFirst: {
      problem: "Free play \u2014 practice everything you've learned about print().",
      knownInfo: "print() shows text (with quotes) and numbers (without quotes). Multiple arguments are separated by commas.",
      pythonQuestion: "What will you make the parrot say?",
      whyPath: "Use everything you learned: strings, numbers, and multiple arguments.",
      action: "Type any print() command and run it. Experiment!",
      learned: "I can use print() to show anything I want on the screen."
    },
    vocabulary: [
      { term: "sandbox", meaning: "A free practice space where there are no wrong answers." }
    ],
    hints: [
      'Concept Clue: Try print("Your name") to say your name, or print(100) to show a number.',
      'Structure Guide:\nprint("Something fun!")\nOr: print(42)\nOr: print("Hi", "there")',
      "Guided Correction: There is no wrong answer here! Just type any print() command and press Run."
    ],
    starterCode: 'print("")',
    solution: 'print("I love Python!")',
    variables: [],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Test 1: any print()"
      }
    ],
    free: true,
    teacherExplanation: "Free sandbox \u2014 students experiment with print() without test constraints.",
    commonMistakes: [],
    studentReflection: "I can freely explore what print() can do."
  }
];