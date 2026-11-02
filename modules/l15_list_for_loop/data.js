export const LESSONS = [
  {
    id: 1,
    title: "First Express Loop",
    storyProblem: "Welcome to Chef Kuma's Bento Express! A conveyor belt carries three dishes: onigiri, sushi, and gyoza. Press Run to watch a for loop visit each item in the list and print it to announce the order!",
    concept: "for loop over a list",
    learnFirst: {
      problem: "We want to announce every dish on the conveyor belt without repeating print() three times manually.",
      knownInfo: "A list holds multiple values like [\"onigiri\", \"sushi\", \"gyoza\"].",
      pythonQuestion: "How do we tell Python to take each item one by one?",
      whyPath: "The for loop 'for dish in dishes:' automatically grabs each item from the list, saves it into 'dish', and runs the indented code.",
      action: "Click Run to watch the loop step through the list and print each dish.",
      learned: "A for loop repeats code once for each element in a list."
    },
    vocabulary: [
      { term: "list", meaning: "An ordered collection of items inside square brackets [ ], like [\"a\", \"b\"]." },
      { term: "for loop", meaning: "A loop that steps through every item in a sequence or list." },
      { term: "loop variable", meaning: "The temporary name (like 'dish') that holds the current item during each step." },
      { term: "print()", meaning: "A Python command that outputs text or variables to the screen." }
    ],
    hints: [
      "Concept Clue: Look at line 2. 'for dish in dishes:' means Python will take each food item one at a time and put it into 'dish'.",
      "Structure Guide:\ndishes = [\"onigiri\", \"sushi\", \"gyoza\"]\nfor dish in dishes:\n    print(dish)\nJust press ▶ Run to test it!",
      "Guided Correction: The starter code is already complete! Press ▶ Run and then Step through to see Chef Kuma announce each plate."
    ],
    starterCode: `dishes = ["onigiri", "sushi", "gyoza"]
for dish in dishes:
    print(dish)`,
    solution: `dishes = ["onigiri", "sushi", "gyoza"]
for dish in dishes:
    print(dish)`,
    variables: ["dishes", "dish"],
    base: {},
    tests: [
      {
        environment: {},
        want: "print*3",
        label: "Test 1: print all 3 dishes in order",
        expect: {
          stdout: "onigiri\nsushi\ngyoza"
        },
        constraints: {
          mustUse: ["for"],
          exactCalls: 3
        }
      }
    ],
    teacherExplanation: "Lesson 1 introduces iterating over a list with 'for x in list:'. Students follow pre-written code to build confidence in how the loop variable changes on each iteration.",
    commonMistakes: [
      "Forgetting to indent lines inside the for loop",
      "Confusing the list name (dishes) with the item variable (dish)"
    ],
    studentReflection: "I understand that a for loop steps through a list and lets me print each item."
  },
  {
    id: 2,
    title: "Insert Your Own Dish",
    storyProblem: "The lunch rush is starting, and the customer requested a dessert! In the starter code, replace the '____' placeholder with your own favorite snack (like \"dango\" or \"mochi\") to complete the menu.",
    concept: "Customizing list elements",
    learnFirst: {
      problem: "The third spot in our snacks list is empty ('____'). We need to insert a real snack.",
      knownInfo: "List items are separated by commas, and text items must be wrapped in quotes \"\".",
      pythonQuestion: "How do we add our own text into a list?",
      whyPath: "Replace the placeholder text with your new string inside quotes, like \"dango\".",
      action: "Change \"____\" to your own snack name, then click Run.",
      learned: "You can change or add items in a Python list by writing strings inside quotes."
    },
    vocabulary: [
      { term: "element", meaning: "A single item stored inside a list." },
      { term: "string", meaning: "Text wrapped in quotation marks, such as \"dango\"." }
    ],
    hints: [
      "Concept Clue: Find \"____\" on line 1. Replace the underscores with any snack you want, like \"dango\" or \"mochi\". Keep the quotes!",
      "Structure Guide:\nsnacks = [\"onigiri\", \"sushi\", \"dango\"]\nfor snack in snacks:\n    print(snack)",
      "Guided Correction: Write a word inside quotes for the 3rd item, for example: \"dango\"."
    ],
    starterCode: `snacks = ["onigiri", "sushi", "____"]
for snack in snacks:
    print(snack)`,
    solution: `snacks = ["onigiri", "sushi", "dango"]
for snack in snacks:
    print(snack)`,
    variables: ["snacks", "snack"],
    base: {},
    tests: [
      {
        environment: {},
        want: "print*3",
        label: "Test 1: loop prints 3 snack items without placeholder",
        constraints: {
          mustUse: ["for"],
          forbid: ["____"],
          exactCalls: 3
        }
      }
    ],
    teacherExplanation: "Students practice editing a Python list by inserting their own string, reinforcing list syntax and showing that any string value can be processed by the loop.",
    commonMistakes: [
      "Deleting the quotation marks around the snack name",
      "Deleting the separating commas between list items",
      "Leaving the '____' placeholder untouched"
    ],
    studentReflection: "I can customize items in a Python list and print them with a for loop."
  },
  {
    id: 3,
    title: "Polite Bento Announcer",
    storyProblem: "Chef Kuma wants to be extra polite! Instead of just printing the raw item name, announce each dish with the word \"Serving:\" before it. Change print(dish) to print(\"Serving:\", dish) inside the loop.",
    concept: "print() with multiple arguments",
    learnFirst: {
      problem: "We want every printed line to say 'Serving: <dish>' instead of just '<dish>'.",
      knownInfo: "print() can take multiple items separated by commas.",
      pythonQuestion: "How do we print fixed text together with the loop variable?",
      whyPath: "Pass both the string \"Serving:\" and the variable 'dish' to print: print(\"Serving:\", dish).",
      action: "Update print() inside the loop to include \"Serving:\" as the first argument.",
      learned: "print() can combine a label and a loop variable separated by a comma."
    },
    vocabulary: [
      { term: "arguments", meaning: "Values passed inside the brackets of print(), separated by commas." },
      { term: "multiple arguments", meaning: "Passing two or more items to print() separated by a comma, like print(\"A:\", b)." }
    ],
    hints: [
      "Concept Clue: Inside print(), put \"Serving:\", then a comma, then dish.",
      "Structure Guide:\ndishes = [\"sushi\", \"gyoza\", \"ramen\"]\nfor dish in dishes:\n    print(\"Serving:\", dish)",
      "Guided Correction: Change line 3 to:    print(\"Serving:\", dish)"
    ],
    starterCode: `dishes = ["sushi", "gyoza", "ramen"]
for dish in dishes:
    print(dish)`,
    solution: `dishes = ["sushi", "gyoza", "ramen"]
for dish in dishes:
    print("Serving:", dish)`,
    variables: ["dishes", "dish"],
    base: {},
    tests: [
      {
        environment: {},
        want: "print*3",
        label: "Test 1: announce each dish with Serving:",
        expect: {
          stdout: "Serving: sushi\nServing: gyoza\nServing: ramen"
        },
        constraints: {
          mustUse: ["for"],
          exactCalls: 3
        }
      }
    ],
    teacherExplanation: "This level shows students how to combine literal strings and loop variables in a single print() statement, which is a staple pattern in beginner Python.",
    commonMistakes: [
      "Putting quotes around the variable name: print(\"Serving:\", \"dish\")",
      "Forgetting the comma between \"Serving:\" and dish"
    ],
    studentReflection: "I can print both fixed words and changing loop variables together."
  },
  {
    id: 4,
    title: "Write Your Own Loop",
    storyProblem: "The drinks cooler is fully stocked with green tea, boba, and juice! The list 'drinks' is ready, but the for loop is missing. Write the loop from scratch and print each drink.",
    concept: "Writing a for-in loop from scratch",
    learnFirst: {
      problem: "The list drinks exists, but nothing prints them yet.",
      knownInfo: "A for loop starts with 'for', has a variable name, 'in', the list name, and ends with a colon :.",
      pythonQuestion: "How do we write the complete loop header and body?",
      whyPath: "Write 'for drink in drinks:' followed by an indented line with 'print(drink)'.",
      action: "Type the for loop header and the indented print statement, then run your code.",
      learned: "Every for loop follows the pattern 'for <item> in <list>:' with indented body lines."
    },
    vocabulary: [
      { term: "colon (:)", meaning: "The symbol at the end of the for line that introduces an indented block." },
      { term: "indentation", meaning: "4 spaces before a line to show it belongs inside the loop." }
    ],
    hints: [
      "Concept Clue: Start with 'for drink in drinks:' and remember the colon at the end!",
      "Structure Guide:\ndrinks = [\"tea\", \"boba\", \"juice\"]\nfor drink in drinks:\n    print(drink)",
      "Guided Correction: Add:\nfor drink in drinks:\n    print(drink)"
    ],
    starterCode: `drinks = ["tea", "boba", "juice"]
# Write your for loop below:
`,
    solution: `drinks = ["tea", "boba", "juice"]
for drink in drinks:
    print(drink)`,
    variables: ["drinks", "drink"],
    base: {},
    tests: [
      {
        environment: {},
        want: "print*3",
        label: "Test 1: print each drink from the list",
        expect: {
          stdout: "tea\nboba\njuice"
        },
        constraints: {
          mustUse: ["for"],
          exactCalls: 3
        }
      }
    ],
    teacherExplanation: "Level 4 takes away the pre-written loop scaffold. Students synthesize what they have observed by authoring both the loop header and the indented print call.",
    commonMistakes: [
      "Forgetting the colon : at the end of the for line",
      "Not indenting print(drink) beneath the for line"
    ],
    studentReflection: "I can write a for loop from scratch to iterate over a list and print each item."
  },
  {
    id: 5,
    title: "Head Chef's Custom Menu",
    storyProblem: "You are now Head Chef of Bento Express! Create your very own menu list with at least 3 foods (like pizza, burger, taco), then write a for loop to print each item.",
    concept: "Full list definition and iteration",
    learnFirst: {
      problem: "We need both a new list definition and a for loop to process it.",
      knownInfo: "Lists use square brackets [ ] with commas between items. Loops use for ... in ... :.",
      pythonQuestion: "How do we put everything together independently?",
      whyPath: "Assign a list of 3 strings to a variable, then loop through it and print each item.",
      action: "Create your menu list, write the loop, and print each food.",
      learned: "I can create any list and process all its items with a for loop and print()."
    },
    vocabulary: [
      { term: "data structure", meaning: "A way to organize and store multiple values together, like a list." },
      { term: "iteration", meaning: "One complete pass through the body of a loop." }
    ],
    hints: [
      "Concept Clue: Define your list first: menu = [\"pizza\", \"burger\", \"taco\"]. Then loop over it!",
      "Structure Guide:\nmenu = [\"pizza\", \"burger\", \"taco\"]\nfor food in menu:\n    print(food)",
      "Guided Correction: Write:\nmenu = [\"pizza\", \"burger\", \"taco\"]\nfor food in menu:\n    print(food)"
    ],
    starterCode: `# 1. Create your own menu list with at least 3 items:
menu = ["pizza", "burger", "taco"]

# 2. Write a for loop to print each item:
`,
    solution: `menu = ["pizza", "burger", "taco"]
for food in menu:
    print(food)`,
    variables: ["menu", "food"],
    base: {},
    tests: [
      {
        environment: {},
        want: "print+",
        label: "Test 1: prints at least 3 items with a loop",
        constraints: {
          mustUse: ["for"],
          minCalls: 3
        }
      }
    ],
    teacherExplanation: "Level 5 assesses full mastery: creating a list from scratch and iterating through it with a for loop and print.",
    commonMistakes: [
      "Using round parentheses ( ) instead of square brackets [ ] for the list",
      "Looping over a string instead of the list"
    ],
    studentReflection: "I can create my own Python lists and loop over them to print each item."
  },
  {
    id: 6,
    title: "🎮 Free Bento Sandbox",
    storyProblem: "The kitchen is yours! Create any lists you want — cute animals, galaxy planets, magical potions, or desserts. Loop through them, print whatever messages you like, and watch Chef Kuma animate every item!",
    concept: "Creative list and loop experimentation",
    learnFirst: {
      problem: "Free sandbox — no tests or restrictions!",
      knownInfo: "You can put any text, emojis, or numbers into a list and loop through them.",
      pythonQuestion: "What exciting list will you build and print today?",
      whyPath: "Use loops, lists, and print() to build your own mini program.",
      action: "Write any list and for loop you want, then press Run!",
      learned: "Python lists and for loops give me the power to handle collections of data with ease."
    },
    vocabulary: [
      { term: "sandbox", meaning: "A creative zone where you can experiment freely without pass/fail rules." }
    ],
    hints: [
      "Concept Clue: Try a party list: party = [\"🎈 balloon\", \"🎂 cake\", \"🎵 music\"] and loop over it!",
      "Structure Guide:\ntreats = [\"cake\", \"cookie\", \"donut\"]\nfor treat in treats:\n    print(\"Yum:\", treat)",
      "Guided Correction: There are no wrong answers in the sandbox! Type any loop over a list and press Run."
    ],
    starterCode: `treasures = ["ruby", "emerald", "sapphire"]
for gem in treasures:
    print("Found gem:", gem)`,
    solution: `treasures = ["ruby", "emerald", "sapphire"]
for gem in treasures:
    print("Found gem:", gem)`,
    variables: ["treasures", "gem"],
    base: {},
    tests: [
      {
        environment: {},
        want: "print+",
        label: "Test 1: sandbox free run"
      }
    ],
    free: true,
    teacherExplanation: "Free sandbox for creative play and open-ended exploration of lists and for loops.",
    commonMistakes: [],
    studentReflection: "I can invent my own ideas using Python lists, for loops, and print()."
  }
];
