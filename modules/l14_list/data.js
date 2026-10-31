export const LESSONS = [
  {
    id: 1,
    title: "Open Your Backpack",
    storyProblem: "Welcome, adventurer! Before heading into the Mystic Forest, inspect your adventure backpack. You have three starting items: potion, map, and torch. In Python, an ordered collection of items inside square brackets [ ] is called a list. Press Run to see how Python lists work and print the first item at index [0]!",
    concept: "Python list & index 0",
    learnFirst: {
      problem: "We want to store multiple items together in one variable and inspect the very first one.",
      knownInfo: "A list holds items in order inside square brackets [ ], separated by commas.",
      pythonQuestion: "How do we get the first item from a list in Python?",
      whyPath: "Python numbers list positions (indices) starting at 0! So inventory[0] grabs the first item.",
      action: "Click ▶ Run to create the list and print the first item at index 0.",
      learned: "Lists store items in order, and the first element is always at index [0]."
    },
    vocabulary: [
      { term: "list", meaning: "An ordered collection of values inside square brackets [ ], like [\"a\", \"b\"]." },
      { term: "index", meaning: "The position number of an item in a list, starting from 0." },
      { term: "element", meaning: "A single item stored inside a list, such as \"potion\"." },
      { term: "print()", meaning: "A Python function that outputs text or variables to the screen." }
    ],
    hints: [
      "Concept Clue: Look at line 1. Square brackets [ ] create the list. On line 2, inventory[0] asks Python for the item at position 0.",
      "Structure Guide:\ninventory = [\"potion\", \"map\", \"torch\"]\nprint(inventory[0])\nJust press ▶ Run to test it!",
      "Guided Correction: The starter code is already complete! Press ▶ Run and then Step through to see the backpack load slot 0."
    ],
    starterCode: `inventory = ["potion", "map", "torch"]
print(inventory[0])`,
    solution: `inventory = ["potion", "map", "torch"]
print(inventory[0])`,
    variables: ["inventory"],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Test 1: print item at index 0",
        expect: {
          stdout: "potion",
          vars: {
            inventory: ["potion", "map", "torch"]
          }
        },
        constraints: {
          mustUse: ["list", "index"],
          exactCalls: 1
        }
      }
    ],
    teacherExplanation: "Lesson 1 introduces list literal syntax and zero-based indexing. Emphasize to students that computer counting starts at 0, making index 0 the very first pocket.",
    commonMistakes: [
      "Using index 1 instead of index 0 for the first item",
      "Forgetting square brackets [ ] around the list items"
    ],
    studentReflection: "I learned that Python lists hold items in order and start counting at index 0."
  },
  {
    id: 2,
    title: "Insert Your Own Gear",
    storyProblem: "Every explorer needs special gear! Your backpack currently holds a potion and a map, but the third slot has a '____' placeholder. Replace the '____' with your own favorite item (like \"cookie\", \"compass\", or \"apple\"). Keep the quotes! Then print that item using inventory[2].",
    concept: "Customizing list elements",
    learnFirst: {
      problem: "The third slot (index 2) is empty ('____'). We want to insert our own custom item.",
      knownInfo: "Items in a list are separated by commas, and text items must be inside quotation marks \"\".",
      pythonQuestion: "How do we add our own text into a list?",
      whyPath: "Replace '____' with your custom string inside quotes, for example \"cookie\" or \"compass\".",
      action: "Change \"____\" to your item name, then click Run to print it.",
      learned: "You can customize any list element by writing a new value inside quotation marks."
    },
    vocabulary: [
      { term: "string", meaning: "Text wrapped in quotation marks, such as \"cookie\"." },
      { term: "comma", meaning: "Used to separate multiple elements inside a list: [item1, item2]." }
    ],
    hints: [
      "Concept Clue: Find \"____\" on line 1. Replace the underscores with any item you like, keeping the quotes (e.g. \"cookie\").",
      "Structure Guide:\ninventory = [\"potion\", \"map\", \"cookie\"]\nprint(inventory[2])",
      "Guided Correction: Type a word inside quotes for the third item, such as \"cookie\", then run the code."
    ],
    starterCode: `inventory = ["potion", "map", "____"]
print(inventory[2])`,
    solution: `inventory = ["potion", "map", "cookie"]
print(inventory[2])`,
    variables: ["inventory"],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Test 1: print custom item at index 2",
        constraints: {
          mustUse: ["list", "index"],
          exactCalls: 1
        }
      }
    ],
    teacherExplanation: "Students practice editing an element inside a Python list, learning that lists can store arbitrary strings and that quotes define string values.",
    commonMistakes: [
      "Removing the quotes around the new item name",
      "Deleting the separating commas between items"
    ],
    studentReflection: "I can customize items inside a Python list and read them using their index."
  },
  {
    id: 3,
    title: "Inspect Every Pocket",
    storyProblem: "The forest ranger stops you at the gate: 'Show me all three items in your pack!' Use print() three times to inspect each pocket in order: first inventory[0], then inventory[1], and finally inventory[2].",
    concept: "Accessing multiple indices (0, 1, 2)",
    learnFirst: {
      problem: "We need to output every item in our three-item backpack one after another.",
      knownInfo: "The pockets are numbered 0, 1, and 2.",
      pythonQuestion: "How do we print all three elements separately?",
      whyPath: "Call print(inventory[0]), print(inventory[1]), and print(inventory[2]) on separate lines.",
      action: "Add the two missing print lines for index 1 and index 2, then click Run.",
      learned: "Each position in a list has its own index: 0 is first, 1 is second, 2 is third."
    },
    vocabulary: [
      { term: "index 0", meaning: "The first element in the list." },
      { term: "index 1", meaning: "The second element in the list." },
      { term: "index 2", meaning: "The third element in the list." }
    ],
    hints: [
      "Concept Clue: Slot 0 is already printed on line 2. Below it, add print(inventory[1]) and print(inventory[2]).",
      "Structure Guide:\ninventory = [\"potion\", \"map\", \"compass\"]\nprint(inventory[0])\nprint(inventory[1])\nprint(inventory[2])",
      "Guided Correction: Add two lines: print(inventory[1]) on line 3, and print(inventory[2]) on line 4."
    ],
    starterCode: `inventory = ["potion", "map", "compass"]
print(inventory[0])
# Print slot 1 and slot 2 below!
`,
    solution: `inventory = ["potion", "map", "compass"]
print(inventory[0])
print(inventory[1])
print(inventory[2])`,
    variables: ["inventory"],
    base: {},
    tests: [
      {
        environment: {},
        want: "print*3",
        label: "Test 1: print all 3 items by index",
        expect: {
          stdout: "potion\nmap\ncompass"
        },
        constraints: {
          mustUse: ["index"],
          exactCalls: 3
        }
      }
    ],
    teacherExplanation: "Reinforces index sequence and shows how each bracketed index corresponds to an individual slot in the list.",
    commonMistakes: [
      "Using index 3 for a 3-item list (which causes an IndexError)",
      "Skipping index 0"
    ],
    studentReflection: "I know how to access any item in a list using its 0-based index number."
  },
  {
    id: 4,
    title: "Swap Your Gear",
    storyProblem: "Oh no! Your torch burned out in the foggy cave. Luckily, you discovered a glowing \"lantern\"! In Python, lists are mutable, meaning you can update any slot anytime. Replace the torch at index 1 using: inventory[1] = \"lantern\". Then print inventory[1] to test your new gear!",
    concept: "Index assignment (updating an element)",
    learnFirst: {
      problem: "We want to update an existing slot in the list without recreating the whole list.",
      knownInfo: "Slot 1 currently holds 'torch'.",
      pythonQuestion: "How do we assign a new value to a specific slot?",
      whyPath: "Write inventory[1] = \"lantern\" — the equals sign assigns the new value into slot 1.",
      action: "Set inventory[1] = \"lantern\" and print(inventory[1]).",
      learned: "Lists are mutable: you can update any slot with list[index] = new_value."
    },
    vocabulary: [
      { term: "mutable", meaning: "Can be modified after creation. Python lists are mutable!" },
      { term: "assignment", meaning: "Using the = sign to store a value into a variable or list slot." }
    ],
    hints: [
      "Concept Clue: Use inventory[1] = \"lantern\" to replace the item in pocket 1.",
      "Structure Guide:\ninventory = [\"potion\", \"torch\", \"shield\"]\ninventory[1] = \"lantern\"\nprint(inventory[1])",
      "Guided Correction: Write inventory[1] = \"lantern\" on line 2, then print(inventory[1]) on line 3."
    ],
    starterCode: `inventory = ["potion", "torch", "shield"]
# Swap out slot 1 for "lantern"
inventory[1] = "lantern"
print(inventory[1])`,
    solution: `inventory = ["potion", "torch", "shield"]
inventory[1] = "lantern"
print(inventory[1])`,
    variables: ["inventory"],
    base: {},
    tests: [
      {
        environment: {},
        want: "print",
        label: "Test 1: update slot 1 to lantern",
        expect: {
          stdout: "lantern",
          vars: {
            inventory: ["potion", "lantern", "shield"]
          }
        },
        constraints: {
          mustUse: ["idxset", "index"],
          exactCalls: 1
        }
      }
    ],
    teacherExplanation: "Demonstrates in-place mutation of lists with index assignment (list[i] = val). Students see how the list changes dynamically in memory.",
    commonMistakes: [
      "Writing == instead of = for assignment",
      "Confusing the slot index with the value"
    ],
    studentReflection: "I can change any item in a list using list[index] = new_value."
  },
  {
    id: 5,
    title: "Treasure Chest & Pack Size",
    storyProblem: "You discovered an ancient golden chest! Inside lies a sparkling \"gem\". Add it to your backpack using inventory.append(\"gem\"). Then print the newly added item (inventory[3]) and print len(inventory) to see your total item count!",
    concept: "list.append() & len()",
    learnFirst: {
      problem: "We want to add a brand-new item to the end of our list and know how many items we have.",
      knownInfo: ".append() attaches an item to the end of a list, and len() gives the total count.",
      pythonQuestion: "How do we add an element and count total items?",
      whyPath: "inventory.append(\"gem\") adds to the end; len(inventory) counts the items.",
      action: "Append your treasure, print inventory[3], and print len(inventory).",
      learned: "list.append() adds an item to the end, and len(list) returns the total number of items."
    },
    vocabulary: [
      { term: ".append()", meaning: "A list method that adds a new item to the very end of the list." },
      { term: "len()", meaning: "A built-in Python function that returns the total count of items in a list." }
    ],
    hints: [
      "Concept Clue: inventory.append(\"gem\") adds \"gem\" as the 4th item (index 3). len(inventory) returns 4.",
      "Structure Guide:\ninventory = [\"potion\", \"lantern\", \"shield\"]\ninventory.append(\"gem\")\nprint(inventory[3])\nprint(len(inventory))",
      "Guided Correction: Call inventory.append(\"gem\"), then print(inventory[3]), then print(len(inventory))."
    ],
    starterCode: `inventory = ["potion", "lantern", "shield"]
inventory.append("gem")
print(inventory[3])
print(len(inventory))`,
    solution: `inventory = ["potion", "lantern", "shield"]
inventory.append("gem")
print(inventory[3])
print(len(inventory))`,
    variables: ["inventory"],
    base: {},
    free: true,
    tests: [
      {
        environment: {},
        want: "print*2",
        label: "Test 1: append treasure and print item + len",
        expect: {
          stdout: "gem\n4"
        },
        constraints: {
          mustUse: ["method_call"]
        }
      }
    ],
    teacherExplanation: "Culminating lesson and sandbox. Students use .append() to dynamically grow a list and len() to inspect its size.",
    commonMistakes: [
      "Writing append(inventory, \"gem\") instead of inventory.append(\"gem\")",
      "Using index 4 instead of index 3 for the 4th item"
    ],
    studentReflection: "I can grow my list using .append() and check how many items it has with len()."
  }
];
