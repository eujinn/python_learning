export const LESSONS = [
  {
    id: 1,
    title: "Challenge 1: Follow the Command — Harvester Protocol",
    storyProblem: "Meet the Cyber Rover on planet Lumina-9! Its cargo bay is currently empty (0 crystals). To initiate the planetary survey, we must harvest 3 energy crystals. A while loop checks a condition each round: while crystals < 3: it repeats the indented commands. When crystals reaches 3, the condition becomes False and the loop stops! Click ▶ Run to follow the commands and watch the rover harvest 3 crystals!",
    concept: "While loop condition check & increment counter",
    learnFirst: {
      problem: "The Cyber Rover needs 3 energy crystals to complete Harvester Protocol.",
      knownInfo: "A while loop tests a condition before each cycle. As long as the condition is True, all indented code inside runs.",
      pythonQuestion: "How does Python repeat collect() until crystals reaches 3?",
      whyPath: "while crystals < 3: tests crystals each time. Inside the loop, crystals = crystals + 1 counts up so the condition will eventually become False!",
      action: "Click ▶ Run and use Step to watch crystals count from 0 to 3.",
      learned: "A while loop continues executing as long as its condition is True, and halts as soon as the condition turns False."
    },
    vocabulary: [
      { term: "while", meaning: "A Python loop that repeats a block of code as long as a condition evaluates to True." },
      { term: "condition", meaning: "A comparison test (such as crystals < 3) checked before each repetition of the loop." },
      { term: "counter", meaning: "A variable updated inside the loop (crystals = crystals + 1) to track how many times it has run." },
      { term: "collect()", meaning: "Commands the Cyber Rover's mechanical arm to scoop a crystal into the cargo bay." }
    ],
    hints: [
      "Concept Clue: Look at line 2. The loop condition is 'while crystals < 3:'. Inside the loop, collect() runs and crystals increases by 1.",
      "Structure Guide:\ncrystals = 0\nwhile crystals < 3:\n    collect()\n    crystals = crystals + 1\nThe code is already complete! Just press ▶ Run.",
      "Guided Correction: Leave the starter code intact, press ▶ Run, and watch the Live Condition Radar on the right show True and False!"
    ],
    starterCode: `crystals = 0
while crystals < 3:
    collect()
    crystals = crystals + 1`,
    solution: `crystals = 0
while crystals < 3:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [
      {
        environment: {},
        want: "collect*3",
        label: "Test 1: collects 3 crystals until crystals is 3",
        expect: {
          vars: {
            crystals: 3
          }
        },
        constraints: {
          mustUse: ["while"]
        }
      }
    ],
    teacherExplanation: "Challenge 1 reinforces while loop mechanics: initialization (crystals = 0), condition check (crystals < 3), action (collect()), and increment (crystals = crystals + 1). Emphasize that the condition is re-evaluated at the start of every cycle.",
    commonMistakes: [
      "Forgetting the colon : at the end of the while statement",
      "Omitting crystals = crystals + 1 which would create an infinite loop",
      "Wrong indentation for lines inside the loop"
    ],
    studentReflection: "I observed how a while loop re-checks its condition before every round and automatically stops when the condition becomes False."
  },
  {
    id: 2,
    title: "Challenge 2: Target Quota — Insert Your Own Condition",
    storyProblem: "Incoming solar flare alert! Mission Control needs a quota of 5 crystals to power up the rover's defensive energy shield. Look at line 2 in the code: you'll see a placeholder '____' in the while loop condition: while crystals < ____:. Insert your own target number 5 so the Cyber Rover harvests 5 crystals! Then press ▶ Run to watch the shield power up.",
    concept: "Customizing while loop termination boundaries",
    learnFirst: {
      problem: "Line 2 has a blank '____'. We need the while loop to stop after harvesting 5 crystals.",
      knownInfo: "The comparison operator < checks if the variable on the left is strictly less than the number on the right.",
      pythonQuestion: "What number should we put after < to harvest exactly 5 crystals starting from 0?",
      whyPath: "Starting at 0, crystals < 5 is True for 0, 1, 2, 3, and 4 (exactly 5 times!). At 5, it stops.",
      action: "Replace '____' with 5, then click ▶ Run.",
      learned: "Changing the condition number directly controls the loop's stopping point and total iterations."
    },
    vocabulary: [
      { term: "target quota", meaning: "A required goal amount that determines when a loop should stop repeating." },
      { term: "operator <", meaning: "Less-than comparison: returns True if the left value is strictly less than the right value." },
      { term: "termination", meaning: "The exact moment when a loop condition becomes False and execution moves past the loop." }
    ],
    hints: [
      "Concept Clue: Look at line 2. Replace '____' with the number 5 so the condition becomes while crystals < 5:.",
      "Structure Guide:\ncrystals = 0\nwhile crystals < 5:\n    collect()\n    crystals = crystals + 1",
      "Guided Correction: Make sure line 2 reads 'while crystals < 5:' followed by a colon :, then press ▶ Run."
    ],
    starterCode: `crystals = 0
while crystals < ____:
    collect()
    crystals = crystals + 1`,
    solution: `crystals = 0
while crystals < 5:
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [
      {
        environment: {},
        want: "collect*5",
        label: "Test 1: collects 5 crystals until crystals is 5",
        expect: {
          vars: {
            crystals: 5
          }
        },
        constraints: {
          mustUse: ["while"]
        }
      }
    ],
    teacherExplanation: "Challenge 2 challenges students to insert their own condition limit. Explain that crystals starts at 0, so crystals < 5 executes when crystals is 0, 1, 2, 3, and 4 — exactly 5 repetitions.",
    commonMistakes: [
      "Using <= 5 which results in 6 repetitions instead of 5",
      "Deleting the colon after the condition",
      "Writing a string like \"5\" instead of integer 5"
    ],
    studentReflection: "I can set my own condition threshold in a while loop to control exactly how many times the loop runs."
  },
  {
    id: 3,
    title: "Challenge 3: Sonic Drill & Telemetry — Insert Your Own Command",
    storyProblem: "The rover has reached a crystalline geode field! These rare crystals are encased in volcanic rock. Before collecting each crystal, the rover must activate its sonic laser drill with drill()! In the code below, line 4 has a placeholder '____'. Insert drill() inside the loop body, right before collect(). Also notice print(crystals) reports telemetry on each cycle! Replace '____' with drill() and click ▶ Run.",
    concept: "Inserting commands inside a multi-step loop body",
    learnFirst: {
      problem: "The rover needs to drill the rock before collecting each crystal, for 3 crystals total.",
      knownInfo: "Every statement indented inside the while block executes in sequential order during each cycle.",
      pythonQuestion: "Where and how do we call drill() inside the while loop?",
      whyPath: "Placing drill() indented inside the loop ensures the sonic drill fires before every collect() call!",
      action: "Replace ____ with drill() on line 4, keeping 4-space indentation, then click ▶ Run.",
      learned: "You can insert multiple commands into a while loop body to execute complex routines on every cycle."
    },
    vocabulary: [
      { term: "drill()", meaning: "Activates the Cyber Rover's high-frequency sonic laser drill to break down crystal geodes." },
      { term: "loop body", meaning: "All indented lines under the while statement that execute together on each repetition." },
      { term: "telemetry", meaning: "Automated status data sent back from the rover via print() statements." }
    ],
    hints: [
      "Concept Clue: Look at line 4. Replace '____' with drill() so the rover drills before calling collect().",
      "Structure Guide:\ncrystals = 1\nwhile crystals <= 3:\n    print(crystals)\n    drill()\n    collect()\n    crystals = crystals + 1",
      "Guided Correction: Type drill() with 4 spaces of indentation on line 4, then press ▶ Run."
    ],
    starterCode: `crystals = 1
while crystals <= 3:
    print(crystals)
    ____
    collect()
    crystals = crystals + 1`,
    solution: `crystals = 1
while crystals <= 3:
    print(crystals)
    drill()
    collect()
    crystals = crystals + 1`,
    variables: ["crystals"],
    base: {},
    tests: [
      {
        environment: {},
        want: "collect*3",
        label: "Test 1: drills and collects 3 crystals with telemetry 1, 2, 3",
        expect: {
          stdout: "1\n2\n3",
          vars: {
            crystals: 4
          }
        },
        constraints: {
          mustUse: ["while"]
        }
      }
    ],
    teacherExplanation: "In Challenge 3, students insert their own action into an existing while loop body. Highlight the sequential nature of code execution: print -> drill -> collect -> update.",
    commonMistakes: [
      "Incorrect indentation causing an indentation error",
      "Calling drill instead of drill() with parentheses",
      "Placing drill() outside the loop body"
    ],
    studentReflection: "I learned how to insert multiple custom commands inside a while loop so they all repeat in sequence."
  },
  {
    id: 4,
    title: "Challenge 4: Fuel Countdown & Orbital Beacon — Insert Post-Loop Action",
    storyProblem: "Emergency return protocol! The Cyber Rover has only 4 units of fuel left in its power cells. While fuel is greater than 0, the rover moves across the ridge by scanning terrain with scan() and expending fuel with fuel = fuel - 1. When fuel reaches 0, the loop ends! AFTER the loop (on unindented line 6), replace '____' with beacon() to deploy the orbital beam that signals the dropship! Press ▶ Run to execute the mission.",
    concept: "Countdown while loops & unindented post-loop execution",
    learnFirst: {
      problem: "The rover must scan 4 times as fuel counts down from 4 to 0, then fire beacon() once when done.",
      knownInfo: "Indented code repeats inside the loop. Code with zero indentation only runs after the while loop finishes.",
      pythonQuestion: "How do we make beacon() execute exactly once at the end instead of on every cycle?",
      whyPath: "Keep scan() indented in the loop. Put beacon() at the left margin (unindented) so it only runs when fuel is 0!",
      action: "Replace ____ on line 6 with beacon() with no indentation, then click ▶ Run.",
      learned: "Code outside the loop waits until the loop condition turns False before running."
    },
    vocabulary: [
      { term: "countdown", meaning: "Decreasing a variable step-by-step (fuel = fuel - 1) toward zero." },
      { term: "beacon()", meaning: "Fires an ultra-bright vertical laser beam to signal the orbital recovery craft." },
      { term: "post-loop", meaning: "Unindented statements placed after a while block that run only when the loop concludes." }
    ],
    hints: [
      "Concept Clue: Inside the loop, scan() runs and fuel decreases. On line 6, beacon() must be unindented (no spaces).",
      "Structure Guide:\nfuel = 4\nwhile fuel > 0:\n    scan()\n    fuel = fuel - 1\nbeacon()",
      "Guided Correction: Replace '____' on line 6 with beacon(). Ensure it has NO leading spaces."
    ],
    starterCode: `fuel = 4
while fuel > 0:
    scan()
    fuel = fuel - 1
____`,
    solution: `fuel = 4
while fuel > 0:
    scan()
    fuel = fuel - 1
beacon()`,
    variables: ["fuel"],
    base: {},
    tests: [
      {
        environment: {},
        want: "beacon",
        label: "Test 1: scans 4 times as fuel counts down, then fires beacon()",
        expect: {
          vars: {
            fuel: 0
          }
        },
        constraints: {
          mustUse: ["while"]
        }
      }
    ],
    teacherExplanation: "Challenge 4 demonstrates two vital while loop patterns: decrementing counters (countdown) and separating repeating code (indented) from post-loop completion actions (unindented).",
    commonMistakes: [
      "Indenting beacon() inside the loop so it fires 4 times instead of once",
      "Adding fuel = fuel + 1 instead of subtraction, causing an infinite loop",
      "Using fuel >= 0 which would run an extra round for fuel = 0"
    ],
    studentReflection: "I learned how to count down with a while loop and place commands after the loop so they run once when finished."
  },
  {
    id: 5,
    title: "Challenge 5: Lumina-9 Rover Sandbox — Master Arena",
    storyProblem: "Congratulations, Commander! You have conquered the While Loop Challenges. You now have full access to the Lumina-9 Sandbox Arena! Here you can invent your own while loops using collect(), drill(), scan(), beacon(), and print(). Try testing different loop conditions like while crystals < 6: or while fuel > 0:. Click the interactive controls on the stage to spawn crystals, trigger sonic drills, and explore!",
    concept: "Open challenge arena & creative while loop design",
    learnFirst: {
      problem: "You are in command of the Cyber Rover expedition. Build any while loop algorithm you want!",
      knownInfo: "You have all rover tools available: collect(), drill(), scan(), beacon(), and print(), plus condition controls.",
      pythonQuestion: "What autonomous mining and survey routine will you program for the Cyber Rover?",
      whyPath: "Combine counters, conditions, drills, scoops, and signals to create your own custom rover behavior.",
      action: "Write your while loop in the editor, click ▶ Run, and test with the interactive stage buttons!",
      learned: "While loops give you the power to automate complex robotic tasks with flexible stopping conditions."
    },
    vocabulary: [
      { term: "sandbox", meaning: "A free-play coding environment where you can freely experiment without restrictions." },
      { term: "algorithm", meaning: "A step-by-step sequence of instructions used to solve a problem or automate a task." },
      { term: "automation", meaning: "Using programming logic and loops to perform repetitive actions without human intervention." }
    ],
    hints: [
      "Concept Clue: Try changing the condition to 'gems < 4' or adding drill() and scan() inside your loop!",
      "Structure Guide:\ngems = 0\nwhile gems < 4:\n    print(gems)\n    drill()\n    collect()\n    gems = gems + 1\nbeacon()",
      "Guided Correction: This is free play! Write and run any while loop you want."
    ],
    starterCode: `gems = 0
while gems < 4:
    print("Harvesting gem:")
    print(gems)
    drill()
    collect()
    gems = gems + 1
beacon()`,
    solution: `gems = 0
while gems < 4:
    print("Harvesting gem:")
    print(gems)
    drill()
    collect()
    gems = gems + 1
beacon()`,
    variables: ["gems", "crystals", "fuel"],
    base: {},
    free: true,
    tests: [
      {
        environment: {},
        want: null,
        label: "Free exploration sandbox"
      }
    ],
    teacherExplanation: "The sandbox arena lets students synthesize everything they have learned: designing while loop conditions, structuring loop bodies with multiple rover commands, printing telemetry, and concluding with orbital beacons.",
    commonMistakes: [
      "Forgetting to increment or decrement the loop counter, leading to an infinite loop"
    ],
    studentReflection: "I can design, program, and master my own autonomous while loop routines for the Cyber Rover!"
  }
];
