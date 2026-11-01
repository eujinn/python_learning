export const LESSONS = [
  {
    id: 1,
    title: "Follow the Command — Power Up!",
    storyProblem: "Meet Astro-Bot! His power cell is currently at 0 energy units. To prepare for his mission, we need to charge him up to 3 units. Instead of calling charge() over and over by hand, Python gives us a superpower: the while loop! A while loop keeps repeating lines of code AS LONG AS its condition stays True. Click ▶ Run to follow the commands and watch the loop charge Astro-Bot until energy reaches 3!",
    concept: "Python while loop condition & counter",
    learnFirst: {
      problem: "Astro-Bot starts with 0 energy. We need to repeat charge() until energy reaches 3.",
      knownInfo: "A while loop tests a question (condition). As long as the question is True, it runs the indented lines inside.",
      pythonQuestion: "How does Python repeat code until a condition is reached?",
      whyPath: "while energy < 3: tests energy each time. Inside, energy = energy + 1 counts up so the loop knows when to stop!",
      action: "Click ▶ Run and use Step to watch energy count up from 0 to 3.",
      learned: "A while loop repeats its body while the condition is True, and stops when the condition becomes False."
    },
    vocabulary: [
      { term: "while", meaning: "A Python keyword that repeats a block of code as long as a condition is True." },
      { term: "condition", meaning: "A True/False test (like energy < 3) that controls whether the loop continues." },
      { term: "counter", meaning: "A variable (like energy = energy + 1) that updates each cycle so the loop eventually ends." },
      { term: "indentation", meaning: "Spaces at the start of lines showing which commands belong inside the loop." }
    ],
    hints: [
      "Concept Clue: Look at line 2. The question is 'while energy < 3:'. Inside the loop, charge() runs and energy increases by 1.",
      "Structure Guide:\nenergy = 0\nwhile energy < 3:\n    charge()\n    energy = energy + 1\nThe code is already complete! Just press ▶ Run.",
      "Guided Correction: Keep the starter code as is, press ▶ Run, and observe the live Condition Radar on the right!"
    ],
    starterCode: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1`,
    solution: `energy = 0
while energy < 3:
    charge()
    energy = energy + 1`,
    variables: ["energy"],
    base: {},
    tests: [
      {
        environment: {},
        want: "charge*3",
        label: "Test 1: energy charges 3 times until energy is 3",
        expect: {
          vars: {
            energy: 3
          }
        },
        constraints: {
          mustUse: ["while"]
        }
      }
    ],
    teacherExplanation: "Lesson 1 introduces the while loop syntax: initialization (energy = 0), condition (energy < 3), action (charge()), and state update (energy = energy + 1). Emphasize how the condition is checked before each iteration.",
    commonMistakes: [
      "Forgetting the colon : at the end of the while line",
      "Omitting energy = energy + 1 which would cause an infinite loop"
    ],
    studentReflection: "I learned that a while loop checks a condition each round and keeps repeating until the condition becomes False."
  },
  {
    id: 2,
    title: "Insert Your Own Limit — Supercharge!",
    storyProblem: "Great job! Astro-Bot now needs a supercharge for long-range scanning. The power chamber can hold 5 units of energy! On line 2, you'll see a placeholder '____' in the while loop condition: while energy < ____:. Replace the '____' with your target number 5 so Astro-Bot receives 5 charges! Then press ▶ Run to watch him supercharge.",
    concept: "Customizing loop termination conditions",
    learnFirst: {
      problem: "The loop condition currently has a blank '____'. We want the loop to stop when energy reaches 5.",
      knownInfo: "The comparison operator < checks if the left value is strictly less than the right value.",
      pythonQuestion: "What number should we put after < to repeat the loop 5 times starting from 0?",
      whyPath: "Starting at 0, energy < 5 runs when energy is 0, 1, 2, 3, and 4 (exactly 5 times!). At 5, it stops.",
      action: "Change '____' to 5, then click ▶ Run.",
      learned: "Changing the condition number controls exactly how many times the while loop executes."
    },
    vocabulary: [
      { term: "operator <", meaning: "Less-than comparison: returns True if the left value is strictly smaller than the right value." },
      { term: "termination", meaning: "When the condition evaluates to False and the while loop finishes running." },
      { term: "supercharge", meaning: "Charging Astro-Bot up to maximum 5-cell capacity." }
    ],
    hints: [
      "Concept Clue: Look at line 2. Replace '____' with the number 5 so the condition becomes while energy < 5:.",
      "Structure Guide:\nenergy = 0\nwhile energy < 5:\n    charge()\n    energy = energy + 1",
      "Guided Correction: Make sure line 2 reads 'while energy < 5:' with a colon at the end, and press ▶ Run."
    ],
    starterCode: `energy = 0
while energy < ____:
    charge()
    energy = energy + 1`,
    solution: `energy = 0
while energy < 5:
    charge()
    energy = energy + 1`,
    variables: ["energy"],
    base: {},
    tests: [
      {
        environment: {},
        want: "charge*5",
        label: "Test 1: energy charges 5 times until energy is 5",
        expect: {
          vars: {
            energy: 5
          }
        },
        constraints: {
          mustUse: ["while"]
        }
      }
    ],
    teacherExplanation: "Students practice setting their own loop boundary. Reinforce zero-based counting: starting at 0 with < 5 executes 5 times for values 0, 1, 2, 3, 4.",
    commonMistakes: [
      "Writing <= 5 instead of < 5 which would run 6 times instead of 5",
      "Deleting the colon after the condition number"
    ],
    studentReflection: "I learned how to set my own stopping condition in a while loop to control how many times it loops."
  },
  {
    id: 3,
    title: "Insert Your Own Command Inside the Loop",
    storyProblem: "While charging, Astro-Bot's diagnostic screen should report progress! You can put any statements you want inside a while loop body — as long as they are indented 4 spaces. Notice line 3 has '____'. Replace '____' with print(power) to announce each power level as it charges! Start at power = 1, loop while power <= 4:, print the power, charge, and increment power = power + 1.",
    concept: "Executing multiple statements in a loop body",
    learnFirst: {
      problem: "We want Astro-Bot to announce his power number on every single loop cycle.",
      knownInfo: "Every line indented inside the while block executes in order on each cycle of the loop.",
      pythonQuestion: "How do we display the power number inside the loop?",
      whyPath: "Calling print(power) inside the indented block prints the current value of power every time.",
      action: "Replace ____ with print(power), then click ▶ Run.",
      learned: "All indented lines inside the while loop run together on each repetition."
    },
    vocabulary: [
      { term: "loop body", meaning: "The indented block of code that runs on each cycle of the while loop." },
      { term: "<=", meaning: "Less-than-or-equal-to comparison: power <= 4 runs for 1, 2, 3, and 4." },
      { term: "diagnostic", meaning: "Status check that reports information about the robot's current power." }
    ],
    hints: [
      "Concept Clue: Look at line 3. Replace '____' with print(power) so Astro-Bot announces the number before charging.",
      "Structure Guide:\npower = 1\nwhile power <= 4:\n    print(power)\n    charge()\n    power = power + 1",
      "Guided Correction: Ensure print(power) and charge() are both indented 4 spaces inside the while loop."
    ],
    starterCode: `power = 1
while power <= 4:
    ____
    charge()
    power = power + 1`,
    solution: `power = 1
while power <= 4:
    print(power)
    charge()
    power = power + 1`,
    variables: ["power"],
    base: {},
    tests: [
      {
        environment: {},
        want: "charge*4",
        label: "Test 1: prints 1 to 4 and charges 4 times",
        expect: {
          stdout: "1\n2\n3\n4",
          vars: {
            power: 5
          }
        },
        constraints: {
          mustUse: ["while"]
        }
      }
    ],
    teacherExplanation: "Students learn that a while loop body can contain multiple statements in sequence. Emphasize that all indented statements execute together during each iteration.",
    commonMistakes: [
      "Placing print(power) with wrong indentation outside the loop",
      "Typing quotes around the variable name: print(\"power\") instead of print(power)"
    ],
    studentReflection: "I can put multiple commands inside a while loop, and every indented line will run on each repetition."
  },
  {
    id: 4,
    title: "Countdown to Blastoff!",
    storyProblem: "Astro-Bot is fully charged and standing on the launch pad! Now we need a launch countdown. A while loop doesn't just count up — it can count DOWN too! Start at countdown = 3. While countdown > 0:, print the countdown number and subtract 1 with countdown = countdown - 1. Then, AFTER the loop finishes (unindented on line 6), replace '____' with launch() to blast off into orbit!",
    concept: "Counting down & unindented post-loop code",
    learnFirst: {
      problem: "We need to count 3, 2, 1 and then launch once when the countdown is done.",
      knownInfo: "Lines indented belong inside the loop. Lines that are NOT indented run only after the loop has completely finished!",
      pythonQuestion: "How do we make launch() run only once at the end instead of every time?",
      whyPath: "Keep countdown = countdown - 1 indented inside the loop. Put launch() all the way to the left (unindented)!",
      action: "Replace ____ with launch() without indentation, then click ▶ Run.",
      learned: "Indented code repeats inside the loop; unindented code runs once after the loop finishes."
    },
    vocabulary: [
      { term: "countdown", meaning: "Decreasing a number step-by-step until reaching 0 or another threshold." },
      { term: "unindented", meaning: "Lines aligned with the left margin that run sequentially outside of any loop." },
      { term: "launch()", meaning: "Our command that ignites Astro-Bot's rocket boosters!" }
    ],
    hints: [
      "Concept Clue: Inside the loop, print(countdown) and countdown = countdown - 1. On line 6, launch() must NOT be indented.",
      "Structure Guide:\ncountdown = 3\nwhile countdown > 0:\n    print(countdown)\n    countdown = countdown - 1\nlaunch()",
      "Guided Correction: Replace '____' on line 6 with launch(). Make sure it has NO leading spaces."
    ],
    starterCode: `countdown = 3
while countdown > 0:
    print(countdown)
    countdown = countdown - 1
____`,
    solution: `countdown = 3
while countdown > 0:
    print(countdown)
    countdown = countdown - 1
launch()`,
    variables: ["countdown"],
    base: {},
    tests: [
      {
        environment: {},
        want: "launch",
        label: "Test 1: countdown 3, 2, 1 and then launch()",
        expect: {
          stdout: "3\n2\n1",
          vars: {
            countdown: 0
          }
        },
        constraints: {
          mustUse: ["while"]
        }
      }
    ],
    teacherExplanation: "This lesson highlights two key concepts: decrementing loop counters (countdown - 1) and loop termination flow. Unindented statements after the loop execute only after the condition becomes False.",
    commonMistakes: [
      "Indenting launch() inside the loop which would cause Astro-Bot to launch 3 times instead of once",
      "Using countdown = countdown + 1 which would create an infinite loop since countdown would never reach 0"
    ],
    studentReflection: "I learned that unindented code after a while loop only runs once when the loop is completely done."
  },
  {
    id: 5,
    title: "Astro-Bot Hyperdrive Lab",
    storyProblem: "Welcome to the Astro-Bot Sandbox Laboratory! Here you have full freedom to build your own while loops. You can charge, spark, print messages, count up or down, and launch! Try testing different loop conditions like while energy < 10: or while power > 0:. Click the stage controls on the right to interact and experiment!",
    concept: "Creative loop exploration & free experimentation",
    learnFirst: {
      problem: "You are the lead robotics programmer at the space station! Explore freely.",
      knownInfo: "You have while loops, print(), charge(), spark(), and launch() in your command deck.",
      pythonQuestion: "What creative sequence of charges, sparks, and launches can you build?",
      whyPath: "Combine conditions, counters, and commands to make your own custom robot routine.",
      action: "Write your own while loop, click ▶ Run, and test with the interactive controls!",
      learned: "While loops let you automate repetitive tasks with flexible stopping conditions."
    },
    vocabulary: [
      { term: "sandbox", meaning: "A free-play coding environment where you can test ideas without strict test rules." },
      { term: "spark()", meaning: "A command that releases an electrical energy spark around the reactor." },
      { term: "automation", meaning: "Using code and loops to do repetitive tasks automatically." }
    ],
    hints: [
      "Concept Clue: Try changing the condition to 'energy < 4' or adding spark() inside or outside the loop!",
      "Structure Guide:\nenergy = 0\nwhile energy < 3:\n    print(energy)\n    charge()\n    energy = energy + 1\nspark()\nlaunch()",
      "Guided Correction: This is free play! Experiment with any while loop you want."
    ],
    starterCode: `energy = 0
while energy < 3:
    print("Energy level:")
    print(energy)
    charge()
    energy = energy + 1
spark()
launch()`,
    solution: `energy = 0
while energy < 3:
    print("Energy level:")
    print(energy)
    charge()
    energy = energy + 1
spark()
launch()`,
    variables: ["energy", "power", "countdown"],
    base: {},
    free: true,
    tests: [
      {
        environment: {},
        want: null,
        label: "Free exploration sandbox"
      }
    ],
    teacherExplanation: "The sandbox allows students to practice combining multiple while loops, commands (charge, spark, launch), and print outputs to create their own robotic animations.",
    commonMistakes: [
      "Infinite loops from forgetting to update the counter variable inside the loop body"
    ],
    studentReflection: "I can design and control my own while loops to power up, charge, and launch Astro-Bot!"
  }
];
