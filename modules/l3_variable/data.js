export const LESSONS = [
  {
    id: 1,
    title: "Store a Value",
    storyProblem: "Welcome to the Variable Vault! Variables are labeled boxes that store values. Create a variable called `player_score` and save the number `0` in it. Then use `print(player_score)` to peek inside and see what's stored.",
    concept: "Variable = Value",
    learnFirst: {
      problem: "We need to store a number so the computer remembers it.",
      knownInfo: "A variable is a labeled box. You create one with name = value.",
      pythonQuestion: "How do we store 0 in a box named player_score?",
      whyPath: "The = sign saves the value on the right into the box on the left.",
      action: "Write player_score = 0 to store 0, then print(player_score) to look inside.",
      learned: "name = value saves a value into a variable. Think of it as putting something in a labeled box."
    },
    vocabulary: [
      { term: "variable", meaning: "A labeled box that stores a value, like player_score = 0." },
      { term: "assignment", meaning: "Using = to save a value into a variable." },
      { term: "value", meaning: "The data stored in a variable, like a number or text." }
    ],
    hints: [
      "Concept Clue: The = sign saves the value on the right into the box on the left. player_score = 0 stores the number 0.",
      "Structure Guide:\nplayer_score = 0\nprint(player_score)\nReplace the ____ with 0 and player_score.",
      "Guided Correction: Write player_score = 0 on the first line, then print(player_score) on the second line."
    ],
    starterCode: 'player_score = ____\nprint(____)',
    solution: 'player_score = 0\nprint(player_score)',
    variables: [],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Store 0 in player_score then print it"
      }
    ],
    teacherExplanation: "Lesson 1 introduces variable assignment. Students store 0 in player_score, then print it. The variable box appears in the Vault scene showing player_score = 0.",
    commonMistakes: [
      "Using == instead of = to assign",
      "Forgetting to print",
      "Spelling the variable name wrong in print()"
    ],
    studentReflection: "I can store a value in a variable using name = value, and look inside with print(name)."
  },
  {
    id: 2,
    title: "Swap the Treasure",
    storyProblem: "Boxes can hold new treasures too! The variable `level` starts at 1. Change it to 5, then print(level) to confirm the new value replaced the old one.",
    concept: "Variable reassignment",
    learnFirst: {
      problem: "We stored 1 in level, but now we want level to hold 5 instead.",
      knownInfo: "Variables can change. The new value replaces the old one.",
      pythonQuestion: "How do we change what's inside the level box?",
      whyPath: "Assigning a new value overwrites the old one. The box only holds one thing at a time.",
      action: "Write level = 1, then level = 5, then print(level) to see the new value.",
      learned: "Assigning a new value to a variable replaces the old value. The newest value wins."
    },
    vocabulary: [
      { term: "reassign", meaning: "To give a variable a new value, replacing the old one." },
      { term: "overwrite", meaning: "The new value erases and replaces the old value in the variable." }
    ],
    hints: [
      "Concept Clue: When you write level = 5 after level = 1, the 5 replaces the 1. The box can only hold one thing!",
      "Structure Guide:\nlevel = 1\nlevel = 5\nprint(level)\nThe last assignment wins. What will print show?",
      "Guided Correction: Write level = 1, then level = 5 on the next line, then print(level) on the third line."
    ],
    starterCode: 'level = ____\nlevel = ____\nprint(____)',
    solution: 'level = 1\nlevel = 5\nprint(level)',
    variables: [],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Reassign level from 1 to 5 then print it"
      }
    ],
    teacherExplanation: "Lesson 2 teaches variable reassignment. Students set level = 1 then level = 5 and print. The Vault scene shows the value changing from 1 to 5 with a pulse animation.",
    commonMistakes: [
      "Using == instead of =",
      "Putting print() in the middle before the final assignment",
      "Thinking the variable keeps both values"
    ],
    studentReflection: "I can change a variable's value by assigning a new one. The new value replaces the old one."
  },
  {
    id: 3,
    title: "Many Boxes",
    storyProblem: "The vault can hold many labeled boxes! Create a variable called `hero` with your hero's name and a variable called `hp` with their health points. Print both to see what's inside.",
    concept: "Multiple variables",
    learnFirst: {
      problem: "We need to store two different things: a name and a number.",
      knownInfo: "Each variable is its own labeled box. You can have as many as you need.",
      pythonQuestion: "How do we make two variables and print both?",
      whyPath: "Each variable has a unique name. Assign each one separately, then print each one.",
      action: "Write hero = \"Nova\" on line 1, hp = 100 on line 2, then print(hero) and print(hp).",
      learned: "You can create many variables. Each has its own name and stores its own value."
    },
    vocabulary: [
      { term: "multiple variables", meaning: "Using more than one variable in the same program." }
    ],
    hints: [
      "Concept Clue: Make one variable for each piece of information. hero stores a name (string), hp stores a number.",
      "Structure Guide:\nhero = \"Nova\"\nhp = 100\nprint(hero)\nprint(hp)\nStrings need quotes \"\", numbers don't.",
      "Guided Correction: hero = \"Nova\" on line 1, hp = 100 on line 2, print(hero) on line 3, print(hp) on line 4."
    ],
    starterCode: 'hero = "____"\nhp = ____\nprint(____)\nprint(____)',
    solution: 'hero = "Nova"\nhp = 100\nprint(hero)\nprint(hp)',
    variables: [],
    base: {},
    tests: [
      {
        environment: {},
        want: "print+",
        label: "Two variables printed"
      }
    ],
    teacherExplanation: "Lesson 3 uses multiple variables. The Vault scene shows both boxes. The test checks print was called at least once (print+).",
    commonMistakes: [
      "Forgetting quotes around the string for hero",
      "Putting quotes around the number 100",
      "Only printing one variable"
    ],
    studentReflection: "I can create and use multiple variables to store different kinds of information."
  },
  {
    id: 4,
    title: "\ud83c\udfae Free Sandbox",
    storyProblem: "The Variable Vault is all yours! Create any variables you like \u2014 store numbers, text, or both. Watch each box appear on the shelf as you assign them.",
    concept: "Variable creative practice",
    learnFirst: {
      problem: "Free play \u2014 practice everything you've learned about variables.",
      knownInfo: "Variables store values with name = value. Print shows what's inside.",
      pythonQuestion: "What variables will you create?",
      whyPath: "Use = to assign, print() to look inside. Experiment with different names and values.",
      action: "Create any variables and print them. Watch the Vault fill up!",
      learned: "I can use variables to store and recall any value I need."
    },
    vocabulary: [
      { term: "sandbox", meaning: "A free practice space where there are no wrong answers." }
    ],
    hints: [
      "Concept Clue: Try score = 100 or name = \"YourName\" and print them!",
      "Structure Guide:\nmy_var = \"something cool\"\nprint(my_var)\nOr use numbers: lives = 3, print(lives)",
      "Guided Correction: There's no wrong answer! Try making 2 or 3 different variables and printing each one."
    ],
    starterCode: 'name = "____"\nprint(____)',
    solution: 'name = "My Vault"\nprint(name)',
    variables: [],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Any variable"
      }
    ],
    free: true,
    teacherExplanation: "Free sandbox \u2014 students experiment with creating variables and printing them without test constraints.",
    commonMistakes: [],
    studentReflection: "I can freely explore variables and how they store values."
  }
];