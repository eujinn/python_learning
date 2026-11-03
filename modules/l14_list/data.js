/* List — Adventure Backpack (Lesson 14)
   20-exercise backbone:
     recap 1-4  → Lesson 13 for-loop refresher
     basic 5-10 → list literals, indexing, index assignment, append, len
     debug 11-15→ repair list syntax
     challenge 16-18 → independent list tasks
     advanced 19-20 → comment-guided inventory work */

export const LESSONS = [
  /* ============================ RECAP (1–4) ============================ */
  {
    id: 1,
    tier: "recap",
    title: "Recap: Repeat a Word",
    storyProblem: "Before lists, a quick loop warm-up. Use for i in range(3): to print pack three times.",
    concept: "for loop recap",
    learnFirst: {
      problem: "Print the same word three times.",
      knownInfo: "for i in range(3): repeats the indented line 3 times.",
      pythonQuestion: "How many repeats does range(3) give?",
      whyPath: "The indented print runs once per number 0,1,2.",
      action: "Write the loop and indent print(\"pack\").",
      learned: "A loop repeats its indented block."
    },
    vocabulary: [{ term: "range(3)", meaning: "Repeat 3 times." }],
    hints: [
      "Concept Clue: range(3) repeats three times.",
      "Structure Guide:\nfor i in range(3):\n    print(\"pack\")",
      "Guided Correction: Indent print under the for line."
    ],
    starterCode: `for i in range(3):
    print("____")`,
    solution: `for i in range(3):
    print("pack")`,
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "pack\npack\npack" }, label: "three prints" }],
    teacherExplanation: "Recap Lesson 13: loop repeats the indented print.",
    commonMistakes: ["Missing colon", "Not indenting print"],
    studentReflection: "I remember how a for loop repeats a print."
  },
  {
    id: 2,
    tier: "recap",
    title: "Recap: Loop Then Finish",
    storyProblem: "Loop range(2) to print item twice, then print done once after the loop.",
    concept: "Loop scope recap",
    learnFirst: {
      problem: "Repeat twice, then run one line once.",
      knownInfo: "Un-indented lines run after the loop.",
      pythonQuestion: "Which print runs once?",
      whyPath: "The un-indented print(done) runs after the loop.",
      action: "Indent the two item prints; keep done at the left edge.",
      learned: "Indentation decides what repeats."
    },
    vocabulary: [{ term: "indent", meaning: "Spaces that show block membership." }],
    hints: [
      "Concept Clue: done is not indented.",
      "Structure Guide:\nfor i in range(2):\n    print(\"item\")\nprint(\"done\")",
      "Guided Correction: Put print(done) at the left edge."
    ],
    starterCode: `for i in range(2):
    print("item")`,
    solution: `for i in range(2):
    print("item")
print("done")`,
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "item\nitem\ndone" }, label: "loop then finish" }],
    teacherExplanation: "Recap loop body vs post-loop line.",
    commonMistakes: ["Indenting done", "Wrong order"],
    studentReflection: "I know which lines repeat."
  },
  {
    id: 3,
    tier: "recap",
    title: "Recap: Count Up",
    storyProblem: "Loop range(3) and print the loop number i each time. The output should be 0, 1, 2.",
    concept: "Loop variable recap",
    learnFirst: {
      problem: "Print the loop number each time.",
      knownInfo: "i changes each repeat: 0,1,2.",
      pythonQuestion: "What does print(i) show?",
      whyPath: "i is the current repeat number.",
      action: "Indent print(i).",
      learned: "The loop variable holds the current count."
    },
    vocabulary: [{ term: "loop variable", meaning: "i, which changes on each repeat." }],
    hints: [
      "Concept Clue: print(i) prints the number.",
      "Structure Guide:\nfor i in range(3):\n    print(i)",
      "Guided Correction: No quotes around i."
    ],
    starterCode: `for i in range(3):
    print("____")`,
    solution: `for i in range(3):
    print(i)`,
    variables: [],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "0\n1\n2" }, label: "count 0 1 2" }],
    teacherExplanation: "Recap the changing loop variable.",
    commonMistakes: ["Quoting i", "Printing outside the loop"],
    studentReflection: "I can print the loop counter."
  },
  {
    id: 4,
    tier: "recap",
    title: "Recap: Variable Count",
    storyProblem: "n tells how many times to print ready. Loop range(n) so the number of lines matches n.",
    concept: "range(n) recap",
    learnFirst: {
      problem: "Loop a variable number of times.",
      knownInfo: "range(n) reads the number in n.",
      pythonQuestion: "How many lines for n = 3?",
      whyPath: "range(3) repeats 3 times.",
      action: "Write for i in range(n): print(\"ready\").",
      learned: "range can read a variable."
    },
    vocabulary: [{ term: "range(n)", meaning: "Repeat n times." }],
    hints: [
      "Concept Clue: range(n) with no quotes.",
      "Structure Guide:\nfor i in range(n):\n    print(\"ready\")",
      "Guided Correction: Change 3 to n."
    ],
    starterCode: `for i in range(n):
    print("ready")`,
    solution: `for i in range(n):
    print("ready")`,
    variables: ["n"],
    base: {},
    tests: [
      { environment: { n: 2 }, want: "print*2", expect: { stdout: "ready\nready" }, label: "n = 2" },
      { environment: { n: 3 }, want: "print*3", expect: { stdout: "ready\nready\nready" }, label: "n = 3" }
    ],
    teacherExplanation: "Recap range with a variable.",
    commonMistakes: ["Quoting n", "Hardcoding range(3)"],
    studentReflection: "I can loop n times."
  },

  /* ============================ BASIC (5–10) =========================== */
  {
    id: 5,
    tier: "basic",
    title: "Open Your Backpack",
    storyProblem: "Your backpack holds potion, map, and torch. A list stores them in order inside [ ]. Print the first item at index 0.",
    concept: "List literal & index 0",
    learnFirst: {
      problem: "Store several items together and read the first one.",
      knownInfo: "A list holds items in order inside square brackets [ ].",
      pythonQuestion: "How do we get the first item?",
      whyPath: "Python counts from 0, so inventory[0] is the first item.",
      action: "Create the list, then print(inventory[0]).",
      learned: "Lists store items in order; the first is at index 0."
    },
    vocabulary: [
      { term: "list", meaning: "An ordered collection inside [ ]." },
      { term: "index", meaning: "A position number starting at 0." }
    ],
    hints: [
      "Concept Clue: inventory[0] asks for position 0.",
      "Structure Guide:\ninventory = [\"potion\", \"map\", \"torch\"]\nprint(inventory[0])",
      "Guided Correction: Press Run — the code is complete."
    ],
    starterCode: `inventory = ["potion", "map", "torch"]
print(inventory[0])`,
    solution: `inventory = ["potion", "map", "torch"]
print(inventory[0])`,
    variables: ["inventory"],
    base: {},
    tests: [{
      environment: {},
      want: "print",
      expect: { stdout: "potion", vars: { inventory: ["potion", "map", "torch"] } },
      constraints: { mustUse: ["list", "index"] },
      label: "print index 0"
    }],
    teacherExplanation: "Introduce list literals and zero-based indexing.",
    commonMistakes: ["Using index 1 for the first item", "Forgetting square brackets"],
    studentReflection: "I know the first list item is at index 0."
  },
  {
    id: 6,
    tier: "basic",
    title: "Insert Your Own Gear",
    storyProblem: "The third slot (index 2) is a placeholder. Replace \"____\" with your own item, keep the quotes, then print inventory[2].",
    concept: "Customizing a list element",
    learnFirst: {
      problem: "Put your own item into the list.",
      knownInfo: "Text items need quotes.",
      pythonQuestion: "How do we change the third item?",
      whyPath: "Replace \"____\" with a quoted word.",
      action: "Edit the third item, then print index 2.",
      learned: "Any list element can be customized."
    },
    vocabulary: [{ term: "string", meaning: "Text inside quotes." }],
    hints: [
      "Concept Clue: Replace \"____\" with a quoted word.",
      "Structure Guide:\ninventory = [\"potion\", \"map\", \"cookie\"]\nprint(inventory[2])",
      "Guided Correction: Keep the commas and quotes."
    ],
    starterCode: `inventory = ["potion", "map", "____"]
print(inventory[2])`,
    solution: `inventory = ["potion", "map", "cookie"]
print(inventory[2])`,
    variables: ["inventory"],
    base: {},
    tests: [{
      environment: {},
      want: "print",
      constraints: { mustUse: ["list", "index"] },
      label: "print custom item"
    }],
    teacherExplanation: "Open-ended: any quoted third item is accepted.",
    commonMistakes: ["Removing quotes", "Deleting commas"],
    studentReflection: "I can customize an item in a list."
  },
  {
    id: 7,
    tier: "basic",
    title: "Inspect Every Pocket",
    storyProblem: "Show all three items in order: print inventory[0], inventory[1], and inventory[2].",
    concept: "Accessing indices 0, 1, 2",
    learnFirst: {
      problem: "Print every item separately.",
      knownInfo: "Pockets are numbered 0, 1, 2.",
      pythonQuestion: "How do we print all three?",
      whyPath: "Three print calls, one per index.",
      action: "Print indices 0, 1, 2 in order.",
      learned: "Each position has its own index."
    },
    vocabulary: [{ term: "index 2", meaning: "The third element." }],
    hints: [
      "Concept Clue: One print per index.",
      "Structure Guide:\nprint(inventory[0])\nprint(inventory[1])\nprint(inventory[2])",
      "Guided Correction: Add the missing prints in order."
    ],
    starterCode: `inventory = ["potion", "map", "torch"]
print(inventory[0])`,
    solution: `inventory = ["potion", "map", "torch"]
print(inventory[0])
print(inventory[1])
print(inventory[2])`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "potion\nmap\ntorch" }, label: "all three pockets" }],
    teacherExplanation: "Practice multiple indices in order.",
    commonMistakes: ["Wrong order", "Skipping index 1"],
    studentReflection: "I can read each index of a list."
  },
  {
    id: 8,
    tier: "basic",
    title: "Swap Your Gear",
    storyProblem: "Swap the item at index 1 for \"lantern\", then print it to confirm.",
    concept: "Index assignment",
    learnFirst: {
      problem: "Replace an item in the list.",
      knownInfo: "inventory[1] = value replaces the second item.",
      pythonQuestion: "How do we change index 1?",
      whyPath: "Assign a new value to inventory[1].",
      action: "Write inventory[1] = \"lantern\", then print index 1.",
      learned: "Assigning to an index replaces that item."
    },
    vocabulary: [{ term: "index assignment", meaning: "items[i] = value replaces an item." }],
    hints: [
      "Concept Clue: inventory[1] = \"lantern\".",
      "Structure Guide:\ninventory[1] = \"lantern\"\nprint(inventory[1])",
      "Guided Correction: Use one =, not =="
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
    tests: [{
      environment: {},
      want: "print",
      expect: { stdout: "lantern", vars: { inventory: ["potion", "lantern", "shield"] } },
      label: "swap index 1"
    }],
    teacherExplanation: "Index assignment updates one slot.",
    commonMistakes: ["Using ==", "Wrong index"],
    studentReflection: "I can replace an item by index."
  },
  {
    id: 9,
    tier: "basic",
    title: "Change the Last Item",
    storyProblem: "The last slot (index 2) should become \"rope\". Assign it, then print index 2.",
    concept: "Updating the last index",
    learnFirst: {
      problem: "Replace the third item.",
      knownInfo: "Index 2 is the third item.",
      pythonQuestion: "Which index is last in a 3-item list?",
      whyPath: "Indices 0,1,2 — so 2 is last.",
      action: "inventory[2] = \"rope\", then print it.",
      learned: "The last index of a 3-item list is 2."
    },
    vocabulary: [{ term: "last index", meaning: "One less than the list length." }],
    hints: [
      "Concept Clue: index 2 is the last slot.",
      "Structure Guide:\ninventory[2] = \"rope\"\nprint(inventory[2])",
      "Guided Correction: Use index 2."
    ],
    starterCode: `inventory = ["potion", "map", "torch"]
inventory[2] = "____"
print(inventory[2])`,
    solution: `inventory = ["potion", "map", "torch"]
inventory[2] = "rope"
print(inventory[2])`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "rope", vars: { inventory: ["potion", "map", "rope"] } }, label: "change last" }],
    teacherExplanation: "Update the final index.",
    commonMistakes: ["Using index 3", "Quoting the index"],
    studentReflection: "I can update the last item."
  },
  {
    id: 10,
    tier: "basic",
    title: "Treasure Chest & Pack Size",
    storyProblem: "Add \"gem\" to the backpack with append, print the new last item (index 3), then print the pack size with len(inventory).",
    concept: "append() and len()",
    learnFirst: {
      problem: "Add an item and count the pack.",
      knownInfo: "append adds to the end; len counts items.",
      pythonQuestion: "What is the new last index?",
      whyPath: "After append there are 4 items, so the last index is 3.",
      action: "append gem, print index 3, then print(len(inventory)).",
      learned: "append grows a list; len reports its size."
    },
    vocabulary: [
      { term: "append()", meaning: "Adds an item to the end of a list." },
      { term: "len()", meaning: "Returns how many items a list has." }
    ],
    hints: [
      "Concept Clue: append adds gem; the new last index is 3.",
      "Structure Guide:\ninventory.append(\"gem\")\nprint(inventory[3])\nprint(len(inventory))",
      "Guided Correction: len(inventory) counts the items."
    ],
    starterCode: `inventory = ["potion", "lantern", "shield"]`,
    solution: `inventory = ["potion", "lantern", "shield"]
inventory.append("gem")
print(inventory[3])
print(len(inventory))`,
    variables: ["inventory"],
    base: {},
    tests: [{
      environment: {},
      want: "print*2",
      expect: { stdout: "gem\n4", vars: { inventory: ["potion", "lantern", "shield", "gem"] } },
      label: "append and count"
    }],
    teacherExplanation: "Introduce append and len.",
    commonMistakes: ["Using index 4", "Forgetting to print len"],
    studentReflection: "I can grow a list and measure it."
  },

  /* ============================ DEBUG (11–15) ========================== */
  {
    id: 11,
    tier: "debug",
    title: "Missing Comma",
    storyProblem: "Two items in the list are not separated. Add the missing comma so the second item can be printed.",
    concept: "Fix list comma",
    learnFirst: {
      problem: "List items need commas.",
      knownInfo: "Separate items with ,",
      pythonQuestion: "What goes between the strings?",
      whyPath: "A comma separates list items.",
      action: "Add a comma between the two items.",
      learned: "List items are comma-separated."
    },
    vocabulary: [{ term: "comma", meaning: "The , between list items." }],
    hints: [
      "Concept Clue: Add , between the strings.",
      "Structure Guide:\ninventory = [\"potion\", \"map\"]",
      "Guided Correction: Insert a comma."
    ],
    starterCode: `# Bug: missing comma
inventory = ["potion" "map"]
print(inventory[1])`,
    solution: `inventory = ["potion", "map"]
print(inventory[1])`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "map" }, label: "fixed list" }],
    teacherExplanation: "Debug a missing list separator.",
    commonMistakes: ["Putting the comma inside quotes"],
    studentReflection: "I know list items need commas."
  },
  {
    id: 12,
    tier: "debug",
    title: "Missing Closing Bracket",
    storyProblem: "The list is not closed with ]. Add it so the list is complete.",
    concept: "Fix list brackets",
    learnFirst: {
      problem: "The list has no closing bracket.",
      knownInfo: "Lists end with ].",
      pythonQuestion: "What closes the list?",
      whyPath: "Add ] after the last item.",
      action: "Close the list with ].",
      learned: "Lists need both [ and ]."
    },
    vocabulary: [{ term: "bracket", meaning: "The [ and ] around a list." }],
    hints: [
      "Concept Clue: Close the list with ].",
      "Structure Guide:\ninventory = [\"potion\", \"map\"]",
      "Guided Correction: Add ] after map\"."
    ],
    starterCode: `# Bug: missing closing bracket
inventory = ["potion", "map"
print(inventory[0])`,
    solution: `inventory = ["potion", "map"]
print(inventory[0])`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "potion" }, label: "fixed bracket" }],
    teacherExplanation: "Debug a missing list bracket.",
    commonMistakes: ["Adding a ) instead of ]"],
    studentReflection: "I can close a list correctly."
  },
  {
    id: 13,
    tier: "debug",
    title: "Unquoted Item",
    storyProblem: "The first item is not in quotes. Add quotes so Python treats it as text.",
    concept: "Fix unquoted string",
    learnFirst: {
      problem: "A word in the list has no quotes.",
      knownInfo: "Text items need quotes.",
      pythonQuestion: "Which item is missing quotes?",
      whyPath: "Wrap potion in quotes.",
      action: "Add quotes around potion.",
      learned: "Text values must be quoted inside lists."
    },
    vocabulary: [{ term: "string", meaning: "Text in quotes." }],
    hints: [
      "Concept Clue: Wrap potion in quotes.",
      "Structure Guide:\ninventory = [\"potion\", \"map\"]",
      "Guided Correction: Add \" around potion."
    ],
    starterCode: `# Bug: unquoted item
inventory = [potion, "map"]
print(inventory[0])`,
    solution: `inventory = ["potion", "map"]
print(inventory[0])`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "potion" }, label: "fixed quote" }],
    teacherExplanation: "Debug an unquoted string in a list.",
    commonMistakes: ["Quoting only one side"],
    studentReflection: "I know list text items need quotes."
  },
  {
    id: 14,
    tier: "debug",
    title: "Index in Quotes",
    storyProblem: "The index is written as a string \"0\". Remove the quotes so Python uses the number 0.",
    concept: "Fix quoted index",
    learnFirst: {
      problem: "An index must be a number, not text.",
      knownInfo: "inventory[0] uses a number index.",
      pythonQuestion: "Should the 0 have quotes?",
      whyPath: "No quotes — it is a number.",
      action: "Change [\"0\"] to [0].",
      learned: "Indices are numbers, not strings."
    },
    vocabulary: [{ term: "index", meaning: "A number position in a list." }],
    hints: [
      "Concept Clue: Remove the quotes around 0.",
      "Structure Guide:\nprint(inventory[0])",
      "Guided Correction: inventory[0] with no quotes."
    ],
    starterCode: `# Bug: index is a string
inventory = ["potion", "map"]
print(inventory["0"])`,
    solution: `inventory = ["potion", "map"]
print(inventory[0])`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "potion" }, label: "fixed index" }],
    teacherExplanation: "Debug a quoted index.",
    commonMistakes: ["Changing the item instead"],
    studentReflection: "I know indices are numbers."
  },
  {
    id: 15,
    tier: "debug",
    title: "Comparing Instead of Assigning",
    storyProblem: "The line uses == and only compares — it does not change the item. Use = to replace index 1 with \"torch\".",
    concept: "Fix = vs ==",
    learnFirst: {
      problem: "The item was never replaced.",
      knownInfo: "= assigns; == compares.",
      pythonQuestion: "Which sign stores a value?",
      whyPath: "One = assigns.",
      action: "Change == to =.",
      learned: "Use = to replace an item."
    },
    vocabulary: [{ term: "=", meaning: "Assignment: stores a value." }],
    hints: [
      "Concept Clue: Use one = for assignment.",
      "Structure Guide:\ninventory[1] = \"torch\"",
      "Guided Correction: Change == to =."
    ],
    starterCode: `# Bug: double equals
inventory = ["potion", "map"]
inventory[1] == "torch"
print(inventory[1])`,
    solution: `inventory = ["potion", "map"]
inventory[1] = "torch"
print(inventory[1])`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "torch", vars: { inventory: ["potion", "torch"] } }, label: "fixed assignment" }],
    teacherExplanation: "Debug assignment vs comparison.",
    commonMistakes: ["Leaving =="],
    studentReflection: "I know = replaces a list item."
  },

  /* =========================== CHALLENGE (16–18) ======================= */
  {
    id: 16,
    tier: "challenge",
    title: "Print All Three",
    storyProblem: "Create a list [\"apple\", \"bread\", \"rope\"] and print each item in order.",
    concept: "List + index from scratch",
    learnFirst: {
      problem: "Build a list and print its items.",
      knownInfo: "Use three prints, one per index.",
      pythonQuestion: "How many prints?",
      whyPath: "One per item.",
      action: "Create the list, then print indices 0,1,2.",
      learned: "I can build and read a list."
    },
    vocabulary: [{ term: "list", meaning: "Ordered items in [ ]." }],
    hints: [
      "Concept Clue: Three items, three prints.",
      "Structure Guide:\nitems = [\"apple\", \"bread\", \"rope\"]\nprint(items[0])...",
      "Guided Correction: Indices 0,1,2."
    ],
    starterCode: `# Your turn: print all three items
`,
    solution: `inventory = ["apple", "bread", "rope"]
print(inventory[0])
print(inventory[1])
print(inventory[2])`,
    variables: ["inventory"],
    base: {},
    tests: [{
      environment: {},
      want: "print*3",
      expect: { stdout: "apple\nbread\nrope" },
      label: "print all three"
    }],
    teacherExplanation: "Independent list creation and indexing.",
    commonMistakes: ["Wrong order", "Using index 3"],
    studentReflection: "I can build a list and print every item."
  },
  {
    id: 17,
    tier: "challenge",
    title: "Replace and Show",
    storyProblem: "Start with [\"hat\", \"coat\", \"boots\"], replace index 1 with \"scarf\", then print index 1.",
    concept: "Index assignment",
    learnFirst: {
      problem: "Replace the middle item.",
      knownInfo: "index 1 is the middle of three.",
      pythonQuestion: "Which index is the coat?",
      whyPath: "Coat is at index 1.",
      action: "Assign scarf to index 1, then print it.",
      learned: "Assign to an index to replace that item."
    },
    vocabulary: [{ term: "replace", meaning: "Put a new value at an existing index." }],
    hints: [
      "Concept Clue: inventory[1] = \"scarf\".",
      "Structure Guide:\ninventory[1] = \"scarf\"\nprint(inventory[1])",
      "Guided Correction: Use = not =="
    ],
    starterCode: `# Your turn: replace index 1 with scarf
`,
    solution: `inventory = ["hat", "coat", "boots"]
inventory[1] = "scarf"
print(inventory[1])`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "scarf", vars: { inventory: ["hat", "scarf", "boots"] } }, label: "replace middle" }],
    teacherExplanation: "Independent index assignment.",
    commonMistakes: ["Using ==", "Wrong index"],
    studentReflection: "I can replace the middle item."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Pack Size",
    storyProblem: "Create a four-item list [\"a\", \"b\", \"c\", \"d\"] and print how many items it has with len().",
    concept: "len()",
    learnFirst: {
      problem: "Count the items in a list.",
      knownInfo: "len(list) returns the count.",
      pythonQuestion: "What does len return for 4 items?",
      whyPath: "len counts elements.",
      action: "Create the list, then print(len(inventory)).",
      learned: "len reports the number of items."
    },
    vocabulary: [{ term: "len()", meaning: "Counts items." }],
    hints: [
      "Concept Clue: print(len(inventory)).",
      "Structure Guide:\ninventory = [\"a\", \"b\", \"c\", \"d\"]\nprint(len(inventory))",
      "Guided Correction: 4 items returns 4."
    ],
    starterCode: `# Your turn: print the pack size
`,
    solution: `inventory = ["a", "b", "c", "d"]
print(len(inventory))`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "4" }, label: "pack size" }],
    teacherExplanation: "Independent len usage.",
    commonMistakes: ["Counting from 0", "Missing the list"],
    studentReflection: "I can count list items with len."
  },

  /* ============================ ADVANCED (19–20) ======================= */
  {
    id: 19,
    tier: "advanced",
    title: "Pack the Backpack",
    storyProblem: "Follow the comments: create a three-item list, replace index 1 with \"compass\", then print index 1.",
    concept: "Comment-guided list edit",
    learnFirst: {
      problem: "Build and edit a list from a plan.",
      knownInfo: "Create, replace, then print.",
      pythonQuestion: "Which index changes?",
      whyPath: "The comment says index 1 becomes compass.",
      action: "Follow the comments.",
      learned: "I can follow a list-editing plan."
    },
    vocabulary: [{ term: "comment", meaning: "A note starting with #." }],
    hints: [
      "Concept Clue: Follow the comments in order.",
      "Structure Guide:\n# list, replace index 1, print",
      "Guided Correction: Use index 1 for the swap."
    ],
    starterCode: `# 1) create ["potion", "map", "torch"] in inventory
# 2) replace index 1 with "compass"
# 3) print index 1`,
    solution: `inventory = ["potion", "map", "torch"]
inventory[1] = "compass"
print(inventory[1])`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "compass", vars: { inventory: ["potion", "compass", "torch"] } }, label: "edit plan" }],
    teacherExplanation: "Advanced: translate comments into list creation + replacement.",
    commonMistakes: ["Wrong index", "Using =="],
    studentReflection: "I can edit a list from a written plan."
  },
  {
    id: 20,
    tier: "advanced",
    title: "Final Inventory",
    storyProblem: "Follow the comments: make a four-item list, print the first item, print the last item, then print the size.",
    concept: "First, last, and len",
    learnFirst: {
      problem: "Read the first and last items and count.",
      knownInfo: "First is 0; last is length-1.",
      pythonQuestion: "Which index is last for 4 items?",
      whyPath: "Indices 0..3, so last is 3.",
      action: "Follow the comments.",
      learned: "First is index 0; last is index 3."
    },
    vocabulary: [{ term: "last index", meaning: "One less than the length." }],
    hints: [
      "Concept Clue: last index of 4 items is 3.",
      "Structure Guide:\n# create 4 items; print 0, print 3, print len",
      "Guided Correction: Use index 3 for the last item."
    ],
    starterCode: `# 1) create ["rope", "lamp", "food", "water"] in inventory
# 2) print the first item
# 3) print the last item
# 4) print the pack size`,
    solution: `inventory = ["rope", "lamp", "food", "water"]
print(inventory[0])
print(inventory[3])
print(len(inventory))`,
    variables: ["inventory"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "rope\nwater\n4" }, label: "final inventory" }],
    teacherExplanation: "Advanced: combine first/last indexing with len from comments.",
    commonMistakes: ["Using index 4 for last", "Forgetting len"],
    studentReflection: "I can read the first and last items and count a list."
  }
];
