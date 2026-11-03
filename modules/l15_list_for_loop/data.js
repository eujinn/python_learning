/* List + For Loop — Bento Express (Lesson 15)
   20-exercise backbone:
     recap 1-4  → Lesson 14 list refresher
     basic 5-10 → iterate lists with for loops
     debug 11-15→ repair loop/list syntax
     challenge 16-18 → independent list loops
     advanced 19-20 → comment-guided service */

export const LESSONS = [
  /* ============================ RECAP (1–4) ============================ */
  {
    id: 1,
    tier: "recap",
    title: "Recap: Make a List",
    storyProblem: "Welcome back! Lists came from Lesson 14. Make a list of dishes and print the first item at index 0.",
    concept: "list literal recap",
    learnFirst: {
      problem: "Create a list and read the first item.",
      knownInfo: "Lists use [ ] and commas.",
      pythonQuestion: "How do we read index 0?",
      whyPath: "dishes[0] is the first item.",
      action: "Create the list, then print(dishes[0]).",
      learned: "Lists store ordered items; first is index 0."
    },
    vocabulary: [{ term: "list", meaning: "Ordered items in [ ]." }],
    hints: [
      "Concept Clue: dishes[0] reads the first item.",
      "Structure Guide:\ndishes = [\"onigiri\", \"sushi\", \"gyoza\"]\nprint(dishes[0])",
      "Guided Correction: Press Run — the code is complete."
    ],
    starterCode: `dishes = ["onigiri", "sushi", "gyoza"]
print(dishes[0])`,
    solution: `dishes = ["onigiri", "sushi", "gyoza"]
print(dishes[0])`,
    variables: ["dishes"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "onigiri" }, label: "index 0" }],
    teacherExplanation: "Recap list creation and indexing.",
    commonMistakes: ["Using index 1", "Forgetting brackets"],
    studentReflection: "I remember how to read a list item."
  },
  {
    id: 2,
    tier: "recap",
    title: "Recap: Middle Item",
    storyProblem: "Print the middle dish at index 1.",
    concept: "index recap",
    learnFirst: {
      problem: "Read the second item.",
      knownInfo: "Index 1 is the second item.",
      pythonQuestion: "Which index is the middle?",
      whyPath: "Three items → middle is index 1.",
      action: "print(dishes[1]).",
      learned: "Index 1 is the second item."
    },
    vocabulary: [{ term: "index", meaning: "Position number starting at 0." }],
    hints: [
      "Concept Clue: the middle is index 1.",
      "Structure Guide:\nprint(dishes[1])",
      "Guided Correction: Use 1, not 0."
    ],
    starterCode: `dishes = ["onigiri", "sushi", "gyoza"]
print(dishes[0])`,
    solution: `dishes = ["onigiri", "sushi", "gyoza"]
print(dishes[1])`,
    variables: ["dishes"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "sushi" }, label: "middle item" }],
    teacherExplanation: "Recap index 1.",
    commonMistakes: ["Using 0 or 2"],
    studentReflection: "I can read the middle item."
  },
  {
    id: 3,
    tier: "recap",
    title: "Recap: Pack Size",
    storyProblem: "Print how many dishes are in the list with len().",
    concept: "len() recap",
    learnFirst: {
      problem: "Count the items.",
      knownInfo: "len(list) returns the count.",
      pythonQuestion: "What does len return for 3?",
      whyPath: "len counts elements.",
      action: "print(len(dishes)).",
      learned: "len counts list items."
    },
    vocabulary: [{ term: "len()", meaning: "Counts items." }],
    hints: [
      "Concept Clue: print(len(dishes)).",
      "Structure Guide:\nprint(len(dishes))",
      "Guided Correction: len counts the items."
    ],
    starterCode: `dishes = ["onigiri", "sushi", "gyoza"]
print(dishes[0])`,
    solution: `dishes = ["onigiri", "sushi", "gyoza"]
print(len(dishes))`,
    variables: ["dishes"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "3" }, label: "count items" }],
    teacherExplanation: "Recap len.",
    commonMistakes: ["Printing the list itself"],
    studentReflection: "I can count a list."
  },
  {
    id: 4,
    tier: "recap",
    title: "Recap: Replace a Dish",
    storyProblem: "Replace index 1 with ramen, then print index 1.",
    concept: "index assignment recap",
    learnFirst: {
      problem: "Replace the middle dish.",
      knownInfo: "dishes[1] = value replaces the second item.",
      pythonQuestion: "Which index changes?",
      whyPath: "Assign ramen to index 1.",
      action: "dishes[1] = \"ramen\", then print it.",
      learned: "Assigning to an index replaces that item."
    },
    vocabulary: [{ term: "index assignment", meaning: "items[i] = value replaces an item." }],
    hints: [
      "Concept Clue: dishes[1] = \"ramen\".",
      "Structure Guide:\ndishes[1] = \"ramen\"\nprint(dishes[1])",
      "Guided Correction: Use one =."
    ],
    starterCode: `dishes = ["onigiri", "sushi", "gyoza"]
dishes[1] = "____"
print(dishes[1])`,
    solution: `dishes = ["onigiri", "sushi", "gyoza"]
dishes[1] = "ramen"
print(dishes[1])`,
    variables: ["dishes"],
    base: {},
    tests: [{ environment: {}, want: "print", expect: { stdout: "ramen" }, label: "replace index 1" }],
    teacherExplanation: "Recap index assignment.",
    commonMistakes: ["Using =="],
    studentReflection: "I can replace a list item."
  },

  /* ============================ BASIC (5–10) =========================== */
  {
    id: 5,
    tier: "basic",
    title: "First Express Loop",
    storyProblem: "Use for dish in dishes: to print each dish on its own line.",
    concept: "for over a list",
    learnFirst: {
      problem: "Print every dish in the list.",
      knownInfo: "for x in list visits each item.",
      pythonQuestion: "What does dish hold each time?",
      whyPath: "dish takes each item in turn.",
      action: "Loop and print dish.",
      learned: "A for loop can walk a list."
    },
    vocabulary: [{ term: "for x in list", meaning: "Visits each item in order." }],
    hints: [
      "Concept Clue: for dish in dishes:",
      "Structure Guide:\nfor dish in dishes:\n    print(dish)",
      "Guided Correction: Indent print under the loop."
    ],
    starterCode: `dishes = ["onigiri", "sushi", "gyoza"]
for dish in dishes:
    print(dish)`,
    solution: `dishes = ["onigiri", "sushi", "gyoza"]
for dish in dishes:
    print(dish)`,
    variables: ["dishes", "dish"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "onigiri\nsushi\ngyoza" }, label: "print each dish" }],
    teacherExplanation: "Introduce iterating a list with for..in.",
    commonMistakes: ["Missing colon", "Not indenting"],
    studentReflection: "I can loop through a list."
  },
  {
    id: 6,
    tier: "basic",
    title: "Insert Your Own Dish",
    storyProblem: "The third dish is a placeholder. Replace it with your own snack, then loop and print every snack.",
    concept: "Custom list + loop",
    learnFirst: {
      problem: "Add your own item and loop.",
      knownInfo: "Replace the placeholder, keep quotes.",
      pythonQuestion: "How do we print each snack?",
      whyPath: "Loop over snacks and print.",
      action: "Edit the third item, keep the loop.",
      learned: "I can customize a list and loop it."
    },
    vocabulary: [{ term: "list", meaning: "Ordered items in [ ]." }],
    hints: [
      "Concept Clue: replace \"____\" with a quoted snack.",
      "Structure Guide:\nsnacks = [\"onigiri\", \"sushi\", \"dango\"]\nfor snack in snacks:\n    print(snack)",
      "Guided Correction: Keep the loop as-is."
    ],
    starterCode: `snacks = ["onigiri", "sushi", "____"]
for snack in snacks:
    print(snack)`,
    solution: `snacks = ["onigiri", "sushi", "dango"]
for snack in snacks:
    print(snack)`,
    variables: ["snacks", "snack"],
    base: {},
    tests: [{ environment: {}, want: "print*3", constraints: { mustUse: ["for"] }, label: "print all snacks" }],
    teacherExplanation: "Open-ended snack choice; the loop structure is checked.",
    commonMistakes: ["Removing quotes", "Breaking the loop"],
    studentReflection: "I can customize and loop a list."
  },
  {
    id: 7,
    tier: "basic",
    title: "Polite Bento Announcer",
    storyProblem: "Announce each dish as Serving: <dish>. Use print(\"Serving:\", dish) inside the loop.",
    concept: "print with two arguments",
    learnFirst: {
      problem: "Add a prefix to each announcement.",
      knownInfo: "print(a, b) shows both with a space.",
      pythonQuestion: "How do we combine text and dish?",
      whyPath: "Comma separates the prefix and the item.",
      action: "print(\"Serving:\", dish).",
      learned: "print can show a label and a value."
    },
    vocabulary: [{ term: "argument", meaning: "A value passed to print." }],
    hints: [
      "Concept Clue: print(\"Serving:\", dish).",
      "Structure Guide:\nfor dish in dishes:\n    print(\"Serving:\", dish)",
      "Guided Correction: Keep the comma."
    ],
    starterCode: `dishes = ["sushi", "gyoza", "ramen"]
for dish in dishes:
    print(dish)`,
    solution: `dishes = ["sushi", "gyoza", "ramen"]
for dish in dishes:
    print("Serving:", dish)`,
    variables: ["dishes", "dish"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "Serving: sushi\nServing: gyoza\nServing: ramen" }, label: "announce dishes" }],
    teacherExplanation: "Combine literal text and a loop variable.",
    commonMistakes: ["Missing comma", "Quoting dish"],
    studentReflection: "I can announce each item with a label."
  },
  {
    id: 8,
    tier: "basic",
    title: "Write Your Own Loop",
    storyProblem: "Loop over the drinks list and print every drink. Build the loop yourself.",
    concept: "for over a list from scratch",
    learnFirst: {
      problem: "Write the loop without a scaffold.",
      knownInfo: "for x in list: print(x).",
      pythonQuestion: "Which list do we loop?",
      whyPath: "Loop over drinks.",
      action: "Write for drink in drinks: print(drink).",
      learned: "I can write a list loop myself."
    },
    vocabulary: [{ term: "for", meaning: "Loop keyword." }],
    hints: [
      "Concept Clue: for drink in drinks:",
      "Structure Guide:\nfor drink in drinks:\n    print(drink)",
      "Guided Correction: Indent the print."
    ],
    starterCode: `drinks = ["tea", "boba", "juice"]
# Write your for loop below:
`,
    solution: `drinks = ["tea", "boba", "juice"]
for drink in drinks:
    print(drink)`,
    variables: ["drinks", "drink"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "tea\nboba\njuice" }, label: "loop drinks" }],
    teacherExplanation: "Independent list loop construction.",
    commonMistakes: ["Wrong list", "Missing indentation"],
    studentReflection: "I can write a list loop from scratch."
  },
  {
    id: 9,
    tier: "basic",
    title: "Head Chef's Custom Menu",
    storyProblem: "Create your own menu list with at least 3 items, then loop and print each food.",
    concept: "Custom list + loop",
    learnFirst: {
      problem: "Build a menu and announce it.",
      knownInfo: "Create a list, then loop.",
      pythonQuestion: "How many items?",
      whyPath: "At least 3.",
      action: "Create menu and loop print(food).",
      learned: "I can build and loop my own menu."
    },
    vocabulary: [{ term: "menu", meaning: "A list of foods." }],
    hints: [
      "Concept Clue: create menu = [...], then loop.",
      "Structure Guide:\nmenu = [\"pizza\", \"burger\", \"taco\"]\nfor food in menu:\n    print(food)",
      "Guided Correction: At least three items."
    ],
    starterCode: `# 1. Create your own menu list with at least 3 items:
`,
    solution: `menu = ["pizza", "burger", "taco"]
for food in menu:
    print(food)`,
    variables: ["menu", "food"],
    base: {},
    tests: [{ environment: {}, want: "print+", constraints: { mustUse: ["list", "for"] }, label: "custom menu loop" }],
    teacherExplanation: "Open-ended menu; requires a list and a loop.",
    commonMistakes: ["No loop", "Fewer than 3 items"],
    studentReflection: "I can create and announce my own menu."
  },
  {
    id: 10,
    tier: "basic",
    title: "Loop by Index",
    storyProblem: "Loop with for i in range(len(dishes)): and print each item using dishes[i].",
    concept: "Looping with range(len(list))",
    learnFirst: {
      problem: "Visit each list index.",
      knownInfo: "len gives the count; range makes indices.",
      pythonQuestion: "How do we loop over indices?",
      whyPath: "for i in range(len(dishes)) gives 0..n-1.",
      action: "Loop i and print dishes[i].",
      learned: "range(len(list)) generates valid indices."
    },
    vocabulary: [{ term: "range(len(list))", meaning: "Indices 0 to length-1." }],
    hints: [
      "Concept Clue: for i in range(len(dishes)):",
      "Structure Guide:\nfor i in range(len(dishes)):\n    print(dishes[i])",
      "Guided Correction: Use dishes[i], not dishes."
    ],
    starterCode: `dishes = ["onigiri", "sushi", "gyoza", "ramen"]
for i in dishes:
    print(i)`,
    solution: `dishes = ["onigiri", "sushi", "gyoza", "ramen"]
for i in range(len(dishes)):
    print(dishes[i])`,
    variables: ["dishes", "i"],
    base: {},
    tests: [{ environment: {}, want: "print*4", expect: { stdout: "onigiri\nsushi\ngyoza\nramen" }, label: "index loop" }],
    teacherExplanation: "Combine len and range to loop by index.",
    commonMistakes: ["Looping the items directly", "Using dishes[i] without range"],
    studentReflection: "I can loop over list indices."
  },

  /* ============================ DEBUG (11–15) ========================== */
  {
    id: 11,
    tier: "debug",
    title: "Missing Colon",
    storyProblem: "The for line has no colon. Add : so the indented print belongs to the loop.",
    concept: "Fix loop colon",
    learnFirst: {
      problem: "The for line needs a colon.",
      knownInfo: "for lines end with :.",
      pythonQuestion: "What ends the loop line?",
      whyPath: "The colon opens the block.",
      action: "Add : after the list.",
      learned: "Every for line ends with a colon."
    },
    vocabulary: [{ term: ":", meaning: "Starts the block." }],
    hints: [
      "Concept Clue: add : after dishes.",
      "Structure Guide:\nfor dish in dishes:\n    print(dish)",
      "Guided Correction: Add the colon."
    ],
    starterCode: `# Bug: missing colon
dishes = ["onigiri", "sushi"]
for dish in dishes
    print(dish)`,
    solution: `dishes = ["onigiri", "sushi"]
for dish in dishes:
    print(dish)`,
    variables: ["dishes", "dish"],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "onigiri\nsushi" }, label: "fixed colon" }],
    teacherExplanation: "Debug a missing loop colon.",
    commonMistakes: ["Adding a semicolon"],
    studentReflection: "I remember the loop colon."
  },
  {
    id: 12,
    tier: "debug",
    title: "Missing Indentation",
    storyProblem: "The print is not indented, so it runs after the loop. Indent it under the for line.",
    concept: "Fix loop indentation",
    learnFirst: {
      problem: "The print is outside the loop.",
      knownInfo: "Indented lines belong to the loop.",
      pythonQuestion: "Where should print sit?",
      whyPath: "Indented under the for line.",
      action: "Add 4 spaces before print.",
      learned: "Indentation defines the loop body."
    },
    vocabulary: [{ term: "indent", meaning: "Spaces showing block membership." }],
    hints: [
      "Concept Clue: indent print under for.",
      "Structure Guide:\nfor dish in dishes:\n    print(dish)",
      "Guided Correction: Add 4 spaces."
    ],
    starterCode: `# Bug: print is outside the loop
dishes = ["onigiri", "sushi"]
for dish in dishes:
print(dish)`,
    solution: `dishes = ["onigiri", "sushi"]
for dish in dishes:
    print(dish)`,
    variables: ["dishes", "dish"],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "onigiri\nsushi" }, label: "fixed indent" }],
    teacherExplanation: "Debug missing loop indentation.",
    commonMistakes: ["Indenting the for line"],
    studentReflection: "I can indent a loop body."
  },
  {
    id: 13,
    tier: "debug",
    title: "Print the Wrong Thing",
    storyProblem: "The loop prints the whole list each time instead of the item. Change print(dishes) to print(dish).",
    concept: "Fix loop variable",
    learnFirst: {
      problem: "The loop prints the list, not the item.",
      knownInfo: "dish holds the current item.",
      pythonQuestion: "What should print show?",
      whyPath: "Print dish, not dishes.",
      action: "Change print(dishes) to print(dish).",
      learned: "Print the loop variable to show each item."
    },
    vocabulary: [{ term: "loop variable", meaning: "The item for this repeat." }],
    hints: [
      "Concept Clue: print(dish), not print(dishes).",
      "Structure Guide:\nfor dish in dishes:\n    print(dish)",
      "Guided Correction: Remove the s."
    ],
    starterCode: `# Bug: prints the whole list
dishes = ["onigiri", "sushi"]
for dish in dishes:
    print(dishes)`,
    solution: `dishes = ["onigiri", "sushi"]
for dish in dishes:
    print(dish)`,
    variables: ["dishes", "dish"],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "onigiri\nsushi" }, label: "print item" }],
    teacherExplanation: "Debug using the list instead of the loop variable.",
    commonMistakes: ["Renaming the loop"],
    studentReflection: "I print the loop variable for each item."
  },
  {
    id: 14,
    tier: "debug",
    title: "Missing in",
    storyProblem: "The loop is missing the word in. Fix for dish dishes: to for dish in dishes:.",
    concept: "Fix for ... in",
    learnFirst: {
      problem: "The keyword in is missing.",
      knownInfo: "for x in list.",
      pythonQuestion: "Which word joins variable and list?",
      whyPath: "The word is in.",
      action: "Add in.",
      learned: "for loops use in."
    },
    vocabulary: [{ term: "in", meaning: "Links the loop variable to the list." }],
    hints: [
      "Concept Clue: add in.",
      "Structure Guide:\nfor dish in dishes:",
      "Guided Correction: for dish in dishes:"
    ],
    starterCode: `# Bug: missing 'in'
dishes = ["onigiri", "sushi"]
for dish dishes:
    print(dish)`,
    solution: `dishes = ["onigiri", "sushi"]
for dish in dishes:
    print(dish)`,
    variables: ["dishes", "dish"],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "onigiri\nsushi" }, label: "fixed in" }],
    teacherExplanation: "Debug a missing loop keyword.",
    commonMistakes: ["Changing the list"],
    studentReflection: "I know for loops use in."
  },
  {
    id: 15,
    tier: "debug",
    title: "Item Used as Index",
    storyProblem: "The loop uses the dish name as an index, which fails. Loop the item directly and print it.",
    concept: "Fix item vs index",
    learnFirst: {
      problem: "dishes[dish] treats the dish text as an index.",
      knownInfo: "Looping gives items, not numbers.",
      pythonQuestion: "Should we index or print the item?",
      whyPath: "dish is already the item.",
      action: "Loop over dishes and print(dish).",
      learned: "for..in gives items directly."
    },
    vocabulary: [{ term: "item", meaning: "The value from the list." }],
    hints: [
      "Concept Clue: print(dish), no [ ].",
      "Structure Guide:\nfor dish in dishes:\n    print(dish)",
      "Guided Correction: Remove [dish]."
    ],
    starterCode: `# Bug: dish is not an index
dishes = ["onigiri", "sushi"]
for dish in dishes:
    print(dishes[dish])`,
    solution: `dishes = ["onigiri", "sushi"]
for dish in dishes:
    print(dish)`,
    variables: ["dishes", "dish"],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "onigiri\nsushi" }, label: "fixed item" }],
    teacherExplanation: "Debug confusing a list item with an index.",
    commonMistakes: ["Using range instead"],
    studentReflection: "I know for..in yields items."
  },

  /* =========================== CHALLENGE (16–18) ======================= */
  {
    id: 16,
    tier: "challenge",
    title: "Loop a Menu of Four",
    storyProblem: "Create a list of four foods and loop to print each one.",
    concept: "List + loop from scratch",
    learnFirst: {
      problem: "Build a four-item list and announce it.",
      knownInfo: "Create list, loop print.",
      pythonQuestion: "How many prints?",
      whyPath: "One per item.",
      action: "Create and loop.",
      learned: "I can build and loop a four-item list."
    },
    vocabulary: [{ term: "list", meaning: "Ordered items." }],
    hints: [
      "Concept Clue: four items, then loop.",
      "Structure Guide:\nmenu = [\"a\", \"b\", \"c\", \"d\"]\nfor food in menu:\n    print(food)",
      "Guided Correction: Indent the print."
    ],
    starterCode: `# Your turn: four foods in a loop
`,
    solution: `menu = ["rice", "soup", "fish", "tea"]
for food in menu:
    print(food)`,
    variables: ["menu", "food"],
    base: {},
    tests: [{ environment: {}, want: "print*4", constraints: { mustUse: ["list", "for"] }, label: "four-item loop" }],
    teacherExplanation: "Independent list+loop.",
    commonMistakes: ["No list", "Missing loop"],
    studentReflection: "I can loop my own four-item menu."
  },
  {
    id: 17,
    tier: "challenge",
    title: "Announce with a Prefix",
    storyProblem: "Create a two-item drinks list and announce each as Drink: <name>.",
    concept: "Loop with prefix",
    learnFirst: {
      problem: "Prefix each announcement.",
      knownInfo: "print(\"Drink:\", d).",
      pythonQuestion: "How do we add the prefix?",
      whyPath: "Comma separates prefix and item.",
      action: "Loop and print with prefix.",
      learned: "Combine text and loop item."
    },
    vocabulary: [{ term: "prefix", meaning: "Text added before a value." }],
    hints: [
      "Concept Clue: print(\"Drink:\", d).",
      "Structure Guide:\nfor d in drinks:\n    print(\"Drink:\", d)",
      "Guided Correction: Keep the comma."
    ],
    starterCode: `# Your turn: announce two drinks
`,
    solution: `drinks = ["tea", "juice"]
for d in drinks:
    print("Drink:", d)`,
    variables: ["drinks", "d"],
    base: {},
    tests: [{ environment: {}, want: "print*2", expect: { stdout: "Drink: tea\nDrink: juice" }, label: "prefixed drinks" }],
    teacherExplanation: "Independent prefixed loop.",
    commonMistakes: ["Missing comma", "Quoting d"],
    studentReflection: "I can announce items with a prefix."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Index and Item",
    storyProblem: "Loop with for i in range(len(items)): and print both the index and the item: print(i, items[i]).",
    concept: "Index + item",
    learnFirst: {
      problem: "Show position and value together.",
      knownInfo: "range(len) gives indices.",
      pythonQuestion: "How do we print both?",
      whyPath: "print(i, items[i]).",
      action: "Loop indices and print both.",
      learned: "Combine index and item in one print."
    },
    vocabulary: [{ term: "index", meaning: "Position number." }],
    hints: [
      "Concept Clue: print(i, items[i]).",
      "Structure Guide:\nfor i in range(len(items)):\n    print(i, items[i])",
      "Guided Correction: Two arguments separated by a comma."
    ],
    starterCode: `# Your turn: print index and item
items = ["a", "b", "c"]`,
    solution: `items = ["a", "b", "c"]
for i in range(len(items)):
    print(i, items[i])`,
    variables: ["items", "i"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "0 a\n1 b\n2 c" }, label: "index and item" }],
    teacherExplanation: "Independent range(len) loop with two args.",
    commonMistakes: ["Forgetting range", "Missing comma"],
    studentReflection: "I can print position and item together."
  },

  /* ============================ ADVANCED (19–20) ======================= */
  {
    id: 19,
    tier: "advanced",
    title: "Chef's Special",
    storyProblem: "Follow the comments: create a three-item list and loop to announce each as Special: <food>.",
    concept: "Comment-guided loop",
    learnFirst: {
      problem: "Build and announce from a plan.",
      knownInfo: "Create list, loop with prefix.",
      pythonQuestion: "What prefix?",
      whyPath: "The comments say Special:.",
      action: "Follow the comments.",
      learned: "I can translate a plan into a loop."
    },
    vocabulary: [{ term: "comment", meaning: "A note starting with #." }],
    hints: [
      "Concept Clue: follow the comments.",
      "Structure Guide:\n# list of 3; loop print(\"Special:\", food)",
      "Guided Correction: Keep the prefix and comma."
    ],
    starterCode: `# 1) create a list of 3 foods named menu
# 2) loop over menu and print("Special:", food)`,
    solution: `menu = ["pizza", "burger", "taco"]
for food in menu:
    print("Special:", food)`,
    variables: ["menu", "food"],
    base: {},
    tests: [{ environment: {}, want: "print*3", expect: { stdout: "Special: pizza\nSpecial: burger\nSpecial: taco" }, label: "specials" }],
    teacherExplanation: "Advanced: build a prefixed loop from comments.",
    commonMistakes: ["Missing prefix", "No loop"],
    studentReflection: "I can build a prefixed announcement loop."
  },
  {
    id: 20,
    tier: "advanced",
    title: "Final Bento Service",
    storyProblem: "Follow the comments: loop over four items announcing each, then print Done after the loop.",
    concept: "Loop + post-loop line",
    learnFirst: {
      problem: "Announce all items, then finish once.",
      knownInfo: "Un-indented lines run after the loop.",
      pythonQuestion: "Where does Done go?",
      whyPath: "After the loop at the left edge.",
      action: "Follow the comments.",
      learned: "Finish a loop with a single line."
    },
    vocabulary: [{ term: "indent", meaning: "Spaces showing block membership." }],
    hints: [
      "Concept Clue: Done is not indented.",
      "Structure Guide:\n# loop announce 4 items; then print(\"Done\")",
      "Guided Correction: Put Done at the left edge."
    ],
    starterCode: `# 1) create a list of 4 dishes named dishes
# 2) loop and print("Item:", dish)
# 3) after the loop, print("Done")`,
    solution: `dishes = ["rice", "soup", "fish", "tea"]
for dish in dishes:
    print("Item:", dish)
print("Done")`,
    variables: ["dishes", "dish"],
    base: {},
    tests: [{ environment: {}, want: "print*5", expect: { stdout: "Item: rice\nItem: soup\nItem: fish\nItem: tea\nDone" }, label: "full service" }],
    teacherExplanation: "Advanced: combine a loop with a post-loop line from comments.",
    commonMistakes: ["Indenting Done", "Wrong order"],
    studentReflection: "I can finish a loop service with a final line."
  }
];
