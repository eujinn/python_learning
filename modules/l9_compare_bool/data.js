/* =========================================================================
   Comparison + Boolean — Smart Eco-Greenhouse (Lesson 9 Data)
   Kindness City — 爱地球 (Care for Earth & Living Plants)
   20-Exercise Backbone:
     Recap 1–4   → Refresh Lesson 8 comparison operators (==, >, <, !=)
     Basic 5–10  → Booleans (True, False), and, or, not, boolean flag variables, else
     Debug 11–15 → Fix capitalization (True vs true), = vs ==, and vs or, && vs and, misplaced not
     Challenge 16–18 → Multi-sensor gates, compound (or + and), priority branching
     Advanced 19–20  → Full Eco-Guardian decision matrices with flag variables
   ========================================================================= */

export const LESSONS = [
  /* ============================ RECAP (1–4) ============================ */
  {
    id: 1,
    tier: "recap",
    title: "Exercise 1: Recap — Check with ==",
    storyProblem: "Welcome to Kindness City's Smart Eco-Greenhouse! Before exploring Booleans, let's refresh Lesson 8 comparisons. If the soil sensor reads moisture == 20, spray gentle water with water()!",
    concept: "Equality check with ==",
    learnFirst: {
      problem: "The soil has dried out to exactly 20%. The plants need water.",
      knownInfo: "The moisture variable is 20. == checks if two values are equal.",
      pythonQuestion: "Is moisture == 20?",
      whyPath: "When moisture is 20, the condition is True, so Python runs water().",
      action: "Write if moisture == 20: and indent water().",
      learned: "Two equal signs == ask if two values match."
    },
    vocabulary: [
      { term: "==", meaning: "Comparison operator: asks 'are both sides exactly equal?'" },
      { term: "water()", meaning: "Command: sprays gentle nourishing mist onto the plants." }
    ],
    hints: [
      "Concept Clue: Ask if moisture equals 20 using ==.",
      "Structure Guide:\nif moisture == 20:\n    water()",
      "Guided Correction: Write if moisture == 20: on line 1, then indent water()."
    ],
    starterCode: "# If moisture == 20, water the bed:\n",
    solution: "if moisture == 20:\n    water()",
    variables: ["moisture"],
    base: { moisture: 20 },
    tests: [
      { environment: { moisture: 20 }, want: "water", label: "moisture == 20 (dry soil)" },
      { environment: { moisture: 50 }, want: null, label: "moisture == 50 (moist, no water)" }
    ],
    teacherExplanation: "Recap Lesson 8 == comparison before introducing Booleans in Exercise 5.",
    commonMistakes: ["Using single = instead of ==", "Forgetting the colon :"],
    studentReflection: "I can check equality using ==."
  },
  {
    id: 2,
    tier: "recap",
    title: "Exercise 2: Recap — Heat Check with >",
    storyProblem: "Sunlight is warming the greenhouse dome. If the temperature is greater than 30 (temp > 30), turn on the cooling fan with fan()!",
    concept: "Greater than check with >",
    learnFirst: {
      problem: "When the dome heats up past 30°C, fresh air must circulate.",
      knownInfo: "The temp sensor gives current temperature in degrees Celsius.",
      pythonQuestion: "Is temp > 30?",
      whyPath: "If temp is above 30, the condition is True, so fan() starts spinning.",
      action: "Write if temp > 30: and indent fan().",
      learned: "> asks if the left value is strictly larger than the right value."
    },
    vocabulary: [
      { term: ">", meaning: "Greater than operator." },
      { term: "fan()", meaning: "Command: spins the rooftop ventilation fan to circulate cool air." }
    ],
    hints: [
      "Concept Clue: Check if temp is greater than 30 with >.",
      "Structure Guide:\nif temp > 30:\n    fan()",
      "Guided Correction: Write if temp > 30: followed by indented fan()."
    ],
    starterCode: "# If temp > 30, turn on cooling fan:\n",
    solution: "if temp > 30:\n    fan()",
    variables: ["temp"],
    base: { temp: 32 },
    tests: [
      { environment: { temp: 32 }, want: "fan", label: "temp = 32 (> 30)" },
      { environment: { temp: 24 }, want: null, label: "temp = 24 (comfortable, no fan)" }
    ],
    teacherExplanation: "Recap greater than operator >.",
    commonMistakes: ["Using < instead of >", "Forgetting indentation"],
    studentReflection: "I can compare values using the > operator."
  },
  {
    id: 3,
    tier: "recap",
    title: "Exercise 3: Recap — Low Power with <",
    storyProblem: "Kindness City stores solar energy in battery banks. If battery < 25, switch to eco_mode() to save energy for the night!",
    concept: "Less than check with <",
    learnFirst: {
      problem: "Solar battery has dipped below 25%. We must save energy.",
      knownInfo: "The battery variable reports the power percentage (0–100).",
      pythonQuestion: "Is battery < 25?",
      whyPath: "When battery is under 25, eco_mode() protects the remaining power.",
      action: "Write if battery < 25: and indent eco_mode().",
      learned: "< checks if the left value is strictly smaller than the right value."
    },
    vocabulary: [
      { term: "<", meaning: "Less than operator." },
      { term: "eco_mode()", meaning: "Command: activates energy-saving mode to conserve battery." }
    ],
    hints: [
      "Concept Clue: Ask if battery is less than 25 with <.",
      "Structure Guide:\nif battery < 25:\n    eco_mode()",
      "Guided Correction: Write if battery < 25: then indent eco_mode()."
    ],
    starterCode: "# If battery < 25, switch to eco_mode:\n",
    solution: "if battery < 25:\n    eco_mode()",
    variables: ["battery"],
    base: { battery: 18 },
    tests: [
      { environment: { battery: 18 }, want: "eco_mode", label: "battery = 18 (< 25)" },
      { environment: { battery: 80 }, want: null, label: "battery = 80 (plenty of power, no eco_mode)" }
    ],
    teacherExplanation: "Recap less than operator < in an eco-conservation setting.",
    commonMistakes: ["Typing > instead of <"],
    studentReflection: "I can check low thresholds using <."
  },
  {
    id: 4,
    tier: "recap",
    title: "Exercise 4: Recap — Overcast Day with !=",
    storyProblem: "Plants need light to grow. If the weather is not sunny (weather != \"sunny\"), turn on the warm LED grow-lights with lights()!",
    concept: "Inequality check with !=",
    learnFirst: {
      problem: "When the sky is overcast or rainy, natural sunlight is missing.",
      knownInfo: "The weather variable is a string like \"sunny\" or \"cloudy\".",
      pythonQuestion: "Is weather != \"sunny\"? (Is weather DIFFERENT from \"sunny\"?)",
      whyPath: "If weather is not \"sunny\", the condition is True, so lights() turn on.",
      action: "Write if weather != \"sunny\": and indent lights().",
      learned: "!= means 'not equal' — it is True when two values are different."
    },
    vocabulary: [
      { term: "!=", meaning: "Not equal operator (an exclamation mark followed by equal sign)." },
      { term: "lights()", meaning: "Command: turns on warm LED grow-lights for photosynthesis." }
    ],
    hints: [
      "Concept Clue: Check if weather is not equal to \"sunny\" with !=.",
      "Structure Guide:\nif weather != \"sunny\":\n    lights()",
      "Guided Correction: Write if weather != \"sunny\": and indent lights()."
    ],
    starterCode: "# If weather != \"sunny\", turn on grow-lights:\n",
    solution: 'if weather != "sunny":\n    lights()',
    variables: ["weather"],
    base: { weather: "cloudy" },
    tests: [
      { environment: { weather: "cloudy" }, want: "lights", label: 'weather = "cloudy" (lights on)' },
      { environment: { weather: "sunny" }, want: null, label: 'weather = "sunny" (bright, no lights)' }
    ],
    teacherExplanation: "Recap != inequality operator with strings.",
    commonMistakes: ["Using =! instead of !=", "Missing quotes around \"sunny\""],
    studentReflection: "I can test if things are different using !=."
  },

  /* ============================ BASIC (5–10) =========================== */
  {
    id: 5,
    tier: "basic",
    title: "Exercise 5: Welcome to Booleans (True & False)",
    storyProblem: "Welcome to Booleans! In Python, a yes/no fact is a Boolean: True or False. The greenhouse roof sensor sun gives True on sunny days and False at night. If sun == True, run fan() to ventilate the sunlit greenhouse!",
    concept: "The Boolean type: True and False",
    learnFirst: {
      problem: "A sensor reports a direct yes/no state: sun is True or False.",
      knownInfo: "Python has two special boolean keywords: True and False (always capitalized!).",
      pythonQuestion: "Is sun == True?",
      whyPath: "When sun is True, the comparison evaluates to True, so fan() runs.",
      action: "Write if sun == True: and indent fan().",
      learned: "Booleans represent truth values. They are named after mathematician George Boole."
    },
    vocabulary: [
      { term: "Boolean", meaning: "A data type that can only be True or False." },
      { term: "True", meaning: "The Python boolean value for 'yes' or 'on'. Must have capital T!" },
      { term: "False", meaning: "The Python boolean value for 'no' or 'off'. Must have capital F!" }
    ],
    hints: [
      "Concept Clue: Compare the variable sun to the boolean True with ==.",
      "Structure Guide:\nif sun == True:\n    fan()",
      "Guided Correction: Write if sun == True: then press Enter and indent fan()."
    ],
    starterCode: "# Check if sun is True, then fan():\n",
    solution: "if sun == True:\n    fan()",
    variables: ["sun"],
    base: { sun: true },
    tests: [
      { environment: { sun: true }, want: "fan", label: "sun is True (fan on)" },
      { environment: { sun: false }, want: null, label: "sun is False (no fan)" }
    ],
    teacherExplanation: "Introduce the Boolean data type. Emphasize capital T for True and capital F for False.",
    commonMistakes: ["Typing lowercase true instead of True", "Using single = instead of =="],
    studentReflection: "I know that True and False are Python Booleans with capital letters."
  },
  {
    id: 6,
    tier: "basic",
    title: "Exercise 6: Both Must Match with 'and'",
    storyProblem: "The plants only need fan cooling when it is BOTH hot AND sunny outside! Use the Python keyword 'and' to connect two checks: if temp > 28 and sun == True, run fan().",
    concept: "Logical operator 'and'",
    learnFirst: {
      problem: "Running the fan when it's hot but night wastes power. Running when it's cool is unnecessary. We need BOTH conditions to be True.",
      knownInfo: "The keyword 'and' checks two conditions. It is True ONLY if both sides are True.",
      pythonQuestion: "Is temp > 28 AND is sun == True?",
      whyPath: "If both are True, the whole question is True! If either side is False, Python skips fan().",
      action: "Write if temp > 28 and sun == True: and indent fan().",
      learned: "'and' requires every condition to be True."
    },
    vocabulary: [
      { term: "and", meaning: "Logical operator: True only if BOTH left and right sides are True." }
    ],
    hints: [
      "Concept Clue: Connect temp > 28 with sun == True using the word and.",
      "Structure Guide:\nif temp > 28 and sun == True:\n    fan()",
      "Guided Correction: Write if temp > 28 and sun == True: and indent fan()."
    ],
    starterCode: "# Cool down only when hot AND sunny:\nif temp > 28 and sun == True:\n    fan()",
    solution: "if temp > 28 and sun == True:\n    fan()",
    variables: ["temp", "sun"],
    base: { temp: 32, sun: true },
    tests: [
      { environment: { temp: 32, sun: true }, want: "fan", label: "temp=32, sun=True (both True -> fan on)" },
      { environment: { temp: 32, sun: false }, want: null, label: "temp=32, sun=False (cloudy -> no fan)" },
      { environment: { temp: 22, sun: true }, want: null, label: "temp=22, sun=True (cool -> no fan)" }
    ],
    teacherExplanation: "Teach 'and' truth table: True and True -> True; any False -> False.",
    commonMistakes: ["Using && instead of and", "Forgetting the second comparison"],
    studentReflection: "I understand that 'and' requires both conditions to be True."
  },
  {
    id: 7,
    tier: "basic",
    title: "Exercise 7: Either Can Match with 'or'",
    storyProblem: "Kindness City waters plants if the soil is dry (moisture < 30) OR if the gardener pressed the manual button (manual_water == True). If either condition is met, spray water with water()!",
    concept: "Logical operator 'or'",
    learnFirst: {
      problem: "Watering should happen if soil is dry, OR if the human helper requested it.",
      knownInfo: "'or' connects two conditions. It is True if AT LEAST ONE side is True.",
      pythonQuestion: "Is moisture < 30 OR is manual_water == True?",
      whyPath: "If the first condition is True, or the second is True, or both, 'or' evaluates to True.",
      action: "Write if moisture < 30 or manual_water == True: and indent water().",
      learned: "'or' only needs one condition to be True."
    },
    vocabulary: [
      { term: "or", meaning: "Logical operator: True if at least one of the conditions is True." }
    ],
    hints: [
      "Concept Clue: Combine moisture < 30 with manual_water == True using or.",
      "Structure Guide:\nif moisture < 30 or manual_water == True:\n    water()",
      "Guided Correction: Write if moisture < 30 or manual_water == True: and indent water()."
    ],
    starterCode: "# Water if soil is dry OR manual button is pressed:\n",
    solution: "if moisture < 30 or manual_water == True:\n    water()",
    variables: ["moisture", "manual_water"],
    base: { moisture: 20, manual_water: false },
    tests: [
      { environment: { moisture: 20, manual_water: false }, want: "water", label: "moisture=20 (dry -> water)" },
      { environment: { moisture: 50, manual_water: true }, want: "water", label: "manual_water=True (button -> water)" },
      { environment: { moisture: 50, manual_water: false }, want: null, label: "neither True -> no water" }
    ],
    teacherExplanation: "Contrasting 'or' with 'and': 'or' is forgiving, 'and' is strict.",
    commonMistakes: ["Using || instead of or", "Mixing up and with or"],
    studentReflection: "I know that 'or' is True if either side is True."
  },
  {
    id: 8,
    tier: "basic",
    title: "Exercise 8: Flip the Truth with 'not'",
    storyProblem: "The word 'not' flips a Boolean: not True becomes False, and not False becomes True! If it is NOT sunny (if not sun:), turn on the warm grow-lights with lights().",
    concept: "Logical operator 'not'",
    learnFirst: {
      problem: "When natural sunlight is absent (sun is False), plants need lights.",
      knownInfo: "not sun turns False into True!",
      pythonQuestion: "Is not sun True?",
      whyPath: "When sun is False, not False is True, so Python runs lights().",
      action: "Write if not sun: and indent lights().",
      learned: "'not' inverts any truth value."
    },
    vocabulary: [
      { term: "not", meaning: "Logical operator: flips True to False, and False to True." }
    ],
    hints: [
      "Concept Clue: Place 'not' before the variable sun.",
      "Structure Guide:\nif not sun:\n    lights()",
      "Guided Correction: Write if not sun: on line 1, then indent lights()."
    ],
    starterCode: "# If NOT sunny, turn on grow-lights:\n",
    solution: "if not sun:\n    lights()",
    variables: ["sun"],
    base: { sun: false },
    tests: [
      { environment: { sun: false }, want: "lights", label: "sun is False -> not sun is True (lights on)" },
      { environment: { sun: true }, want: null, label: "sun is True -> not sun is False (lights off)" }
    ],
    teacherExplanation: "Introduce the negation operator 'not'.",
    commonMistakes: ["Writing not = sun", "Putting not after the variable"],
    studentReflection: "I can flip a condition using 'not'."
  },
  {
    id: 9,
    tier: "basic",
    title: "Exercise 9: Store a Boolean in a Flag Variable",
    storyProblem: "Now take control! You can store a comparison & boolean result in your own variable! Calculate needs_water = moisture < 35 and not rain. Then if needs_water: call water().",
    concept: "Boolean variables and flags",
    learnFirst: {
      problem: "Instead of writing long if statements, real programmers store answers in clear flag variables.",
      knownInfo: "Expressions like moisture < 35 and not rain evaluate directly to True or False.",
      pythonQuestion: "Does the soil need water while it is not raining?",
      whyPath: "Storing the result in needs_water makes your code clean and readable.",
      action: "Assign needs_water = moisture < 35 and not rain, then check if needs_water: water().",
      learned: "A variable can hold a Boolean result from a comparison expression."
    },
    vocabulary: [
      { term: "flag variable", meaning: "A variable that holds True or False to signal a status." }
    ],
    hints: [
      "Concept Clue: First calculate needs_water, then use if needs_water:.",
      "Structure Guide:\nneeds_water = moisture < 35 and not rain\nif needs_water:\n    water()",
      "Guided Correction: Line 1: needs_water = moisture < 35 and not rain. Line 2: if needs_water: Line 3: indent water()."
    ],
    starterCode: "# Create your own boolean flag variable:\nneeds_water = moisture < 35 and not rain\nif needs_water:\n    water()",
    solution: "needs_water = moisture < 35 and not rain\nif needs_water:\n    water()",
    variables: ["moisture", "rain"],
    base: { moisture: 25, rain: false },
    tests: [
      { environment: { moisture: 25, rain: false }, want: "water", label: "dry soil & not raining -> water()" },
      { environment: { moisture: 25, rain: true }, want: null, label: "dry soil but raining outside -> no water" },
      { environment: { moisture: 60, rain: false }, want: null, label: "moist soil -> no water" }
    ],
    teacherExplanation: "Demonstrate that comparison and boolean operators return real Boolean values that can be stored in variables.",
    commonMistakes: ["Forgetting to indent under if", "Over-complicating with == True"],
    studentReflection: "I can store a Boolean condition in a variable."
  },
  {
    id: 10,
    tier: "basic",
    title: "Exercise 10: Decision Making with else",
    storyProblem: "The smart greenhouse manages solar energy! If battery >= 50 and sun == True, run fan() to cool the plants. Otherwise (else:), call eco_mode() to save electricity!",
    concept: "Boolean conditions with else fallback",
    learnFirst: {
      problem: "We need an action when the condition is True, AND a fallback when it is False.",
      knownInfo: "if runs when the condition is True; else: runs when it is False.",
      pythonQuestion: "Is battery >= 50 and sun == True?",
      whyPath: "If True, run fan(). If False, jump to else: and run eco_mode().",
      action: "Write if battery >= 50 and sun == True: fan() then else: eco_mode().",
      learned: "else: provides a reliable fallback when boolean questions are False."
    },
    vocabulary: [
      { term: "else:", meaning: "Runs when the preceding if condition was False." }
    ],
    hints: [
      "Concept Clue: Check battery >= 50 and sun == True, then add else:.",
      "Structure Guide:\nif battery >= 50 and sun == True:\n    fan()\nelse:\n    eco_mode()",
      "Guided Correction: Write the if line with fan(), then on a new line write else: and indent eco_mode()."
    ],
    starterCode: "# If plenty of solar power, fan(); otherwise eco_mode():\nif battery >= 50 and sun == True:\n    fan()\nelse:\n    eco_mode()",
    solution: "if battery >= 50 and sun == True:\n    fan()\nelse:\n    eco_mode()",
    variables: ["battery", "sun"],
    base: { battery: 80, sun: true },
    tests: [
      { environment: { battery: 80, sun: true }, want: "fan", label: "battery=80, sun=True (fan)" },
      { environment: { battery: 30, sun: true }, want: "eco_mode", label: "battery=30, sun=True (eco_mode)" },
      { environment: { battery: 90, sun: false }, want: "eco_mode", label: "battery=90, sun=False (eco_mode)" }
    ],
    teacherExplanation: "Combine boolean logic with two-way branching.",
    commonMistakes: ["Writing a condition after else", "Misaligning if and else"],
    studentReflection: "I can use else: to handle cases when a boolean check is False."
  },

  /* ============================ DEBUG (11–15) ========================== */
  {
    id: 11,
    tier: "debug",
    title: "Exercise 11: Debug — Capitalize True & False",
    storyProblem: "Bug Alert! A student wrote is_hot = true in the greenhouse code, but Python threw a NameError! In Python, Booleans MUST start with a capital letter: True or False. Fix the bug!",
    concept: "Capitalization of Python Booleans",
    learnFirst: {
      problem: "Python does not recognize lowercase true or false — it thinks they are missing variables!",
      knownInfo: "Valid Python booleans are True and False.",
      pythonQuestion: "How do we write the Boolean value for yes in Python?",
      whyPath: "Replacing true with True fixes the syntax error.",
      action: "Change true to True on line 1.",
      learned: "Python is case-sensitive: always capitalize True and False."
    },
    vocabulary: [
      { term: "Case-sensitive", meaning: "Capital letters matter! True != true." }
    ],
    hints: [
      "Concept Clue: Change lowercase 'true' to capitalized 'True'.",
      "Structure Guide:\nis_hot = True\nif is_hot:\n    fan()",
      "Guided Correction: Replace 'true' with 'True' with a capital T."
    ],
    starterCode: "# Bug: Python booleans must be capitalized!\nis_hot = true\nif is_hot:\n    fan()",
    solution: "is_hot = True\nif is_hot:\n    fan()",
    variables: [],
    base: {},
    tests: [
      { environment: {}, want: "fan", label: "Capitalized True runs fan()" }
    ],
    teacherExplanation: "Common beginner bug: lowercase true/false from languages like JavaScript or C++.",
    commonMistakes: ["Leaving true in lowercase"],
    studentReflection: "I remember that Python Booleans are always True and False with capital letters."
  },
  {
    id: 12,
    tier: "debug",
    title: "Exercise 12: Debug — = vs ==",
    storyProblem: "Bug Alert! Someone wrote if sun = True:! A single = assigns a variable; two == compares values. Fix the single = to double == so the fan turns on when sun is True.",
    concept: "Assignment (=) vs Comparison (==)",
    learnFirst: {
      problem: "Using single = inside an if statement causes a SyntaxError in Python.",
      knownInfo: "= saves a value into a variable; == asks if two values are equal.",
      pythonQuestion: "Which operator asks if sun equals True?",
      whyPath: "Using == checks equality without causing a syntax error.",
      action: "Change sun = True to sun == True.",
      learned: "Always use == when asking questions in if statements."
    },
    vocabulary: [
      { term: "=", meaning: "Assignment operator (stores value into a variable)." },
      { term: "==", meaning: "Comparison operator (tests if two sides are equal)." }
    ],
    hints: [
      "Concept Clue: Change the single = to double ==.",
      "Structure Guide:\nif sun == True:\n    fan()",
      "Guided Correction: On line 2, replace sun = True with sun == True."
    ],
    starterCode: "# Bug: Use == to compare, not single =\nif sun = True:\n    fan()",
    solution: "if sun == True:\n    fan()",
    variables: ["sun"],
    base: { sun: true },
    tests: [
      { environment: { sun: true }, want: "fan", label: "sun is True (fan runs)" },
      { environment: { sun: false }, want: null, label: "sun is False (no fan)" }
    ],
    teacherExplanation: "Reinforce the difference between = (store) and == (compare).",
    commonMistakes: ["Leaving single =", "Putting spaces between = ="],
    studentReflection: "I use == to compare and = to assign."
  },
  {
    id: 13,
    tier: "debug",
    title: "Exercise 13: Debug — Confusing 'and' with 'or'",
    storyProblem: "Bug Alert! The irrigation controller wrote if temp > 30 and moisture < 20: water(). But if the soil is dry (moisture < 20), plants need water EVEN on a cool day! Change 'and' to 'or'.",
    concept: "Choosing between 'and' and 'or'",
    learnFirst: {
      problem: "With 'and', dry plants will not be watered if temperature is only 22°C!",
      knownInfo: "Plants need water if it is hot OR if the soil is dry.",
      pythonQuestion: "Should watering happen if either condition is true?",
      whyPath: "Changing 'and' to 'or' allows water to spray when soil is dry regardless of heat.",
      action: "Replace 'and' with 'or'.",
      learned: "Use 'or' when either condition alone justifies taking action."
    },
    vocabulary: [
      { term: "Logic bug", meaning: "Code runs without syntax error, but does the wrong thing in real life." }
    ],
    hints: [
      "Concept Clue: Replace the word 'and' with 'or'.",
      "Structure Guide:\nif temp > 30 or moisture < 20:\n    water()",
      "Guided Correction: Change 'and' on line 2 to 'or'."
    ],
    starterCode: "# Bug: Plants need water if hot OR if moisture is low:\nif temp > 30 and moisture < 20:\n    water()",
    solution: "if temp > 30 or moisture < 20:\n    water()",
    variables: ["temp", "moisture"],
    base: { temp: 22, moisture: 15 },
    tests: [
      { environment: { temp: 22, moisture: 15 }, want: "water", label: "cool day & dry soil (water)" },
      { environment: { temp: 35, moisture: 40 }, want: "water", label: "hot day & moist soil (water)" },
      { environment: { temp: 24, moisture: 50 }, want: null, label: "mild day & moist soil (no water)" }
    ],
    teacherExplanation: "Distinguish semantic logic bugs from syntax errors.",
    commonMistakes: ["Keeping 'and' and changing numbers instead"],
    studentReflection: "I carefully choose between 'and' and 'or' based on real-world requirements."
  },
  {
    id: 14,
    tier: "debug",
    title: "Exercise 14: Debug — Python Uses Words, Not &&",
    storyProblem: "Bug Alert! A student coming from JavaScript wrote if sun == True && temp > 25: fan(). Python does not use && or || — it uses plain English words: and and or! Fix the syntax.",
    concept: "Python keyword 'and' vs '&&'",
    learnFirst: {
      problem: "&& causes a syntax error in Python.",
      knownInfo: "Python prides itself on readability: use the keyword 'and'.",
      pythonQuestion: "How do we write logical AND in Python?",
      whyPath: "Replacing && with 'and' makes valid Python.",
      action: "Change && to and.",
      learned: "Python uses 'and' and 'or', never '&&' or '||'."
    },
    vocabulary: [
      { term: "Readability", meaning: "Python code reads like plain English sentences." }
    ],
    hints: [
      "Concept Clue: Replace '&&' with the word 'and'.",
      "Structure Guide:\nif sun == True and temp > 25:\n    fan()",
      "Guided Correction: Replace '&&' with 'and'."
    ],
    starterCode: "# Bug: In Python use 'and', not '&&':\nif sun == True && temp > 25:\n    fan()",
    solution: "if sun == True and temp > 25:\n    fan()",
    variables: ["sun", "temp"],
    base: { sun: true, temp: 30 },
    tests: [
      { environment: { sun: true, temp: 30 }, want: "fan", label: "sun=True and temp=30 (fan)" },
      { environment: { sun: false, temp: 30 }, want: null, label: "sun=False (no fan)" }
    ],
    teacherExplanation: "Highlight Python's design philosophy: words instead of cryptic symbols.",
    commonMistakes: ["Leaving one & symbol"],
    studentReflection: "In Python I write 'and' and 'or' as English words."
  },
  {
    id: 15,
    tier: "debug",
    title: "Exercise 15: Debug — Clean Negation with 'not'",
    storyProblem: "Bug Alert! Someone wrote if rain == not True: to check if it wasn't raining. That is invalid syntax! In Python, simply write if not rain: water(). Fix the line!",
    concept: "Clean boolean negation syntax",
    learnFirst: {
      problem: "Writing == not True is invalid and confusing.",
      knownInfo: "When rain is a boolean (True/False), writing not rain is clean and idiomatic Python.",
      pythonQuestion: "How do we check if a boolean is False?",
      whyPath: "if not rain: is True whenever rain is False.",
      action: "Replace rain == not True with not rain.",
      learned: "Use if not variable: to check if something is False."
    },
    vocabulary: [
      { term: "Idiomatic Python", meaning: "Writing code in the natural, clean Python style." }
    ],
    hints: [
      "Concept Clue: Write 'if not rain:'.",
      "Structure Guide:\nif not rain:\n    water()",
      "Guided Correction: Change 'if rain == not True:' to 'if not rain:'."
    ],
    starterCode: "# Bug: Write clean Python: if not rain:\nif rain == not True:\n    water()",
    solution: "if not rain:\n    water()",
    variables: ["rain"],
    base: { rain: false },
    tests: [
      { environment: { rain: false }, want: "water", label: "rain is False -> not rain is True (water)" },
      { environment: { rain: true }, want: null, label: "rain is True -> not rain is False (no water)" }
    ],
    teacherExplanation: "Teach idiomatic Python: avoid 'x == False' or 'x == not True', prefer 'not x'.",
    commonMistakes: ["Writing not = rain"],
    studentReflection: "I write 'if not x:' to check when a boolean is False."
  },

  /* ============================ CHALLENGE (16–18) ====================== */
  {
    id: 16,
    tier: "challenge",
    title: "Exercise 16: Three-Sensor Safety Gate",
    storyProblem: "Kindness City green-energy rule: The rooftop fan uses significant electricity. Only run fan() when ALL THREE conditions are met: temp > 26, sun == True, and battery > 40! Chain two 'and' operators.",
    concept: "Chaining multiple 'and' conditions",
    learnFirst: {
      problem: "We have three sensors: temperature, sunlight, and battery power.",
      knownInfo: "You can chain multiple ands: cond1 and cond2 and cond3.",
      pythonQuestion: "Are all three sensors in the green zone?",
      whyPath: "If all three are True, the fan runs. If any one fails, no power is wasted.",
      action: "Write if temp > 26 and sun == True and battery > 40: and indent fan().",
      learned: "You can chain as many 'and' conditions as your mission needs."
    },
    vocabulary: [
      { term: "Chained condition", meaning: "Connecting three or more checks with logical operators." }
    ],
    hints: [
      "Concept Clue: Connect all three checks with two 'and' keywords.",
      "Structure Guide:\nif temp > 26 and sun == True and battery > 40:\n    fan()",
      "Guided Correction: Write if temp > 26 and sun == True and battery > 40: then indent fan()."
    ],
    starterCode: "# Insert your own 3-part condition with 'and':\nif temp > 26 and sun == True and battery > 40:\n    fan()",
    solution: "if temp > 26 and sun == True and battery > 40:\n    fan()",
    variables: ["temp", "sun", "battery"],
    base: { temp: 30, sun: true, battery: 70 },
    tests: [
      { environment: { temp: 30, sun: true, battery: 70 }, want: "fan", label: "All 3 True (fan on)" },
      { environment: { temp: 30, sun: true, battery: 20 }, want: null, label: "Battery too low (no fan)" },
      { environment: { temp: 20, sun: true, battery: 80 }, want: null, label: "Temp comfortable (no fan)" },
      { environment: { temp: 30, sun: false, battery: 80 }, want: null, label: "Cloudy day (no fan)" }
    ],
    teacherExplanation: "All conditions must be satisfied in a chained 'and'.",
    commonMistakes: ["Using commas instead of 'and'"],
    studentReflection: "I can chain multiple 'and' operators to enforce multi-sensor safety rules."
  },
  {
    id: 17,
    tier: "challenge",
    title: "Exercise 17: Grouping Logic with Parentheses",
    storyProblem: "Water conservation rule: Spray water() if the soil is critically dry (moisture < 20) OR if it is a hot sunny afternoon (temp > 30 and sun == True). Group the hot sunny check with parentheses!",
    concept: "Combining 'or' with 'and' and parentheses",
    learnFirst: {
      problem: "We have an emergency condition (moisture < 20) OR a compound daytime condition.",
      knownInfo: "Parentheses () group operations together, just like in math.",
      pythonQuestion: "Is soil dry, OR is it simultaneously hot and sunny?",
      whyPath: "Parentheses make the order of checks crystal clear to Python and human readers.",
      action: "Write if moisture < 20 or (temp > 30 and sun == True): and indent water().",
      learned: "Use parentheses to group logical sub-expressions."
    },
    vocabulary: [
      { term: "Grouping ()", meaning: "Parentheses ensure sub-conditions are evaluated together." }
    ],
    hints: [
      "Concept Clue: Wrap the (temp > 30 and sun == True) in parentheses.",
      "Structure Guide:\nif moisture < 20 or (temp > 30 and sun == True):\n    water()",
      "Guided Correction: Write if moisture < 20 or (temp > 30 and sun == True): and indent water()."
    ],
    starterCode: "# Group logic with parentheses:\nif moisture < 20 or (temp > 30 and sun == True):\n    water()",
    solution: "if moisture < 20 or (temp > 30 and sun == True):\n    water()",
    variables: ["moisture", "temp", "sun"],
    base: { moisture: 15, temp: 22, sun: false },
    tests: [
      { environment: { moisture: 15, temp: 22, sun: false }, want: "water", label: "critically dry soil (water)" },
      { environment: { moisture: 40, temp: 33, sun: true }, want: "water", label: "hot and sunny (water)" },
      { environment: { moisture: 40, temp: 33, sun: false }, want: null, label: "hot but cloudy (no water)" },
      { environment: { moisture: 40, temp: 25, sun: true }, want: null, label: "mild sun (no water)" }
    ],
    teacherExplanation: "Operator precedence: 'and' binds tighter than 'or', so parentheses add clarity.",
    commonMistakes: ["Unbalanced parentheses"],
    studentReflection: "I can use parentheses () to group complex boolean logic."
  },
  {
    id: 18,
    tier: "challenge",
    title: "Exercise 18: Night and Low Power Protection",
    storyProblem: "Kindness City nightfall protocol: If battery < 20, activate eco_mode() to save energy. Otherwise, if not sun, turn on lights()! Use an if / elif decision.",
    concept: "Multi-branch decision with boolean condition",
    learnFirst: {
      problem: "Protecting battery life comes first; providing grow-light comes second.",
      knownInfo: "elif checks a second question only when the first question was False.",
      pythonQuestion: "Is battery < 20? If not, is not sun True?",
      whyPath: "When battery is low, eco_mode() runs. If battery is okay but night falls, lights() run.",
      action: "Write if battery < 20: eco_mode() elif not sun: lights().",
      learned: "elif allows prioritized decision chains with booleans."
    },
    vocabulary: [
      { term: "Priority branch", meaning: "Checking the most urgent safety condition first." }
    ],
    hints: [
      "Concept Clue: First check battery < 20 for eco_mode(), then elif not sun: for lights().",
      "Structure Guide:\nif battery < 20:\n    eco_mode()\nelif not sun:\n    lights()",
      "Guided Correction: Write the if block for eco_mode(), then elif not sun: with indented lights()."
    ],
    starterCode: "# Check battery first, then nightfall:\nif battery < 20:\n    eco_mode()\nelif not sun:\n    lights()",
    solution: "if battery < 20:\n    eco_mode()\nelif not sun:\n    lights()",
    variables: ["battery", "sun"],
    base: { battery: 10, sun: false },
    tests: [
      { environment: { battery: 10, sun: false }, want: "eco_mode", label: "battery=10 (eco_mode priority)" },
      { environment: { battery: 60, sun: false }, want: "lights", label: "battery=60, not sun (lights on)" },
      { environment: { battery: 80, sun: true }, want: null, label: "battery=80, sunny (no action needed)" }
    ],
    teacherExplanation: "Prioritizing urgent safety checks before standard actions.",
    commonMistakes: ["Putting lights() before eco_mode()", "Missing elif colon"],
    studentReflection: "I can prioritize boolean decisions with if and elif."
  },

  /* ============================ ADVANCED (19–20) ======================= */
  {
    id: 19,
    tier: "advanced",
    title: "Exercise 19: Complete Eco-Guardian Decision Matrix",
    storyProblem: "Assemble the full caretaker brain for Kindness City's greenhouse!\n1. If battery < 20: eco_mode()\n2. Elif moisture < 30 and not rain: water()\n3. Elif temp > 28 and sun == True: fan()\n4. Elif not sun: lights()",
    concept: "4-way boolean decision matrix",
    learnFirst: {
      problem: "Automate all four environmental responses in a single unified program.",
      knownInfo: "Check urgency in order: battery safety -> water -> ventilation -> grow-lights.",
      pythonQuestion: "Which environmental condition requires action first?",
      whyPath: "Python scans branches top-to-bottom and runs only the first branch that evaluates to True.",
      action: "Write the 4-tier if/elif ladder connecting comparisons and booleans.",
      learned: "A multi-branch boolean matrix acts as a full autonomous controller."
    },
    vocabulary: [
      { term: "Decision matrix", meaning: "A structured set of rules that handles multiple real-world states." }
    ],
    hints: [
      "Concept Clue: Follow the 4 steps in order using if and three elif statements.",
      "Structure Guide:\nif battery < 20:\n    eco_mode()\nelif moisture < 30 and not rain:\n    water()\nelif temp > 28 and sun == True:\n    fan()\nelif not sun:\n    lights()",
      "Guided Correction: Write the if block and three elif blocks in exact priority order."
    ],
    starterCode: "# Build the 4-part Eco-Guardian controller:\nif battery < 20:\n    eco_mode()\nelif moisture < 30 and not rain:\n    water()\nelif temp > 28 and sun == True:\n    fan()\nelif not sun:\n    lights()",
    solution: "if battery < 20:\n    eco_mode()\nelif moisture < 30 and not rain:\n    water()\nelif temp > 28 and sun == True:\n    fan()\nelif not sun:\n    lights()",
    variables: ["battery", "moisture", "rain", "temp", "sun"],
    base: { battery: 15, moisture: 20, rain: false, temp: 35, sun: true },
    tests: [
      { environment: { battery: 15, moisture: 20, rain: false, temp: 35, sun: true }, want: "eco_mode", label: "Priority 1: battery < 20 (eco_mode)" },
      { environment: { battery: 70, moisture: 20, rain: false, temp: 24, sun: true }, want: "water", label: "Priority 2: moisture < 30 & not rain (water)" },
      { environment: { battery: 70, moisture: 50, rain: false, temp: 31, sun: true }, want: "fan", label: "Priority 3: temp > 28 & sunny (fan)" },
      { environment: { battery: 70, moisture: 50, rain: false, temp: 24, sun: false }, want: "lights", label: "Priority 4: overcast day (lights)" }
    ],
    teacherExplanation: "Real-world automation relies on hierarchical boolean testing.",
    commonMistakes: ["Swapping branch orders", "Forgetting 'not rain' check"],
    studentReflection: "I can build a complete 4-tier autonomous controller using boolean logic."
  },
  {
    id: 20,
    tier: "advanced",
    title: "Exercise 20: Master Eco-City Haven (Flag Variables & Mastery)",
    storyProblem: "Mastery Challenge! Kindness City celebrates your coding graduation! Calculate three clear boolean flags first:\n  hot_day = temp >= 30 and sun == True\n  thirsty = moisture <= 25 and not rain\n  low_power = battery < 25\nThen drive decisions cleanly: if low_power: eco_mode() elif thirsty: water() elif hot_day: fan() else: lights()!",
    concept: "Flag variables + clean hierarchical decision tree",
    learnFirst: {
      problem: "Complex conditions become easy to read when separated into named boolean variables.",
      knownInfo: "hot_day, thirsty, and low_power each hold True or False.",
      pythonQuestion: "How do professional engineers structure complex robot logic?",
      whyPath: "Naming conditions makes the code self-explanatory and bug-free.",
      action: "Define the three boolean variables, then write the clean if/elif/else chain.",
      learned: "Master programmers use boolean variables to turn complex logic into clear English."
    },
    vocabulary: [
      { term: "Mastery", meaning: "Combining all skills: comparisons, booleans, variables, and decisions." }
    ],
    hints: [
      "Concept Clue: Define the 3 variables first, then write the if/elif/else chain.",
      "Structure Guide:\nhot_day = temp >= 30 and sun == True\nthirsty = moisture <= 25 and not rain\nlow_power = battery < 25\nif low_power:\n    eco_mode()\nelif thirsty:\n    water()\nelif hot_day:\n    fan()\nelse:\n    lights()",
      "Guided Correction: Copy the three flag definitions, then the if/elif/elif/else structure."
    ],
    starterCode: "# Program the master greenhouse controller:\nhot_day = temp >= 30 and sun == True\nthirsty = moisture <= 25 and not rain\nlow_power = battery < 25\n\nif low_power:\n    eco_mode()\nelif thirsty:\n    water()\nelif hot_day:\n    fan()\nelse:\n    lights()",
    solution: "hot_day = temp >= 30 and sun == True\nthirsty = moisture <= 25 and not rain\nlow_power = battery < 25\n\nif low_power:\n    eco_mode()\nelif thirsty:\n    water()\nelif hot_day:\n    fan()\nelse:\n    lights()",
    variables: ["temp", "sun", "moisture", "rain", "battery"],
    base: { battery: 10, temp: 32, sun: true, moisture: 20, rain: false },
    tests: [
      { environment: { battery: 10, temp: 32, sun: true, moisture: 20, rain: false }, want: "eco_mode", label: "low_power is True (eco_mode)" },
      { environment: { battery: 80, temp: 24, sun: true, moisture: 20, rain: false }, want: "water", label: "thirsty is True (water)" },
      { environment: { battery: 80, temp: 32, sun: true, moisture: 50, rain: false }, want: "fan", label: "hot_day is True (fan)" },
      { environment: { battery: 80, temp: 24, sun: false, moisture: 50, rain: false }, want: "lights", label: "default: healthy day overcast (lights)" }
    ],
    teacherExplanation: "The pinnacle of Lesson 9: separating data evaluation (flags) from control flow.",
    commonMistakes: ["Typos in variable names", "Indentation errors"],
    studentReflection: "I am a Master Eco-Guardian! I can compose Python comparisons and booleans into clean, readable software."
  }
];
