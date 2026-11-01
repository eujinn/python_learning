/* =========================================================================
   Lesson 16 — While Loop: Astro-Bot Power Core Scene Visualizer
   High-tech interactive reactor, condition radar & smooth SVG animations.
   ========================================================================= */

let root = null;
let currentEnergy = 0;
let maxEnergy = 5;
let currentCycle = 0;
let lastEnv = {};

export function init(container) {
  root = container;
  currentEnergy = 0;
  maxEnergy = 5;
  currentCycle = 0;
  lastEnv = {};

  root.innerHTML = `
    <div class="wb-stage">
      <div id="bubble" class="bubble"></div>

      <!-- Header: Title & Status -->
      <div class="wb-header">
        <div class="wb-title-wrap">
          <div class="wb-icon-badge">⚡</div>
          <div>
            <div class="wb-title">Astro-Bot Power Core</div>
          </div>
        </div>
        <div class="wb-status-pill" id="wb-status-pill">
          <span class="wb-status-dot"></span>
          <span id="wb-status-text">Standby · Ready to Loop</span>
        </div>
      </div>

      <!-- Main Visual Display: Robot + Reactor Column -->
      <div class="wb-main-display">
        <!-- Cute SVG Astro-Bot -->
        <div class="wb-bot-container hovering" id="wb-bot">
          <svg class="wb-bot-svg" viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Glow filter defs -->
            <defs>
              <radialGradient id="reactor-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#38bdf8" stop-opacity="1"/>
                <stop offset="60%" stop-color="#0284c7" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#0369a1" stop-opacity="0"/>
              </radialGradient>
              <linearGradient id="body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#e0f2fe"/>
              </linearGradient>
              <linearGradient id="visor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0f172a"/>
                <stop offset="100%" stop-color="#1e293b"/>
              </linearGradient>
              <linearGradient id="flame-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fef08a"/>
                <stop offset="40%" stop-color="#f59e0b"/>
                <stop offset="100%" stop-color="#ef4444"/>
              </linearGradient>
            </defs>

            <!-- Antenna -->
            <line x1="80" y1="28" x2="80" y2="10" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
            <circle cx="80" cy="8" r="6" fill="#38bdf8" id="wb-antenna-bulb" stroke="#0284c7" stroke-width="2"/>

            <!-- Robot Head -->
            <rect x="35" y="26" width="90" height="56" rx="20" fill="url(#body-grad)" stroke="#0284c7" stroke-width="3"/>
            <!-- Visor Screen -->
            <rect x="45" y="36" width="70" height="36" rx="12" fill="url(#visor-grad)" stroke="#0369a1" stroke-width="2"/>
            <!-- Eyes (LED Cyan) -->
            <ellipse cx="64" cy="54" rx="7" ry="8" fill="#38bdf8" id="wb-eye-left"/>
            <ellipse cx="96" cy="54" rx="7" ry="8" fill="#38bdf8" id="wb-eye-right"/>
            <circle cx="66" cy="51" r="2.5" fill="#ffffff"/>
            <circle cx="98" cy="51" r="2.5" fill="#ffffff"/>

            <!-- Ears / Bolts -->
            <rect x="27" y="44" width="8" height="20" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
            <rect x="125" y="44" width="8" height="20" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>

            <!-- Neck -->
            <rect x="68" y="82" width="24" height="8" rx="3" fill="#94a3b8"/>

            <!-- Robot Body -->
            <rect x="38" y="88" width="84" height="64" rx="18" fill="url(#body-grad)" stroke="#0284c7" stroke-width="3"/>

            <!-- Chest Power Core (Glows brighter with energy) -->
            <circle cx="80" cy="120" r="20" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
            <circle cx="80" cy="120" r="16" fill="url(#reactor-glow)" id="wb-bot-core"/>
            <!-- Core Symbol -->
            <path d="M82 110 L74 121 L79 121 L77 130 L86 119 L81 119 Z" fill="#ffffff" id="wb-core-icon"/>

            <!-- Arms -->
            <rect x="20" y="98" width="16" height="42" rx="8" fill="#bae6fd" stroke="#0284c7" stroke-width="2.5"/>
            <rect x="124" y="98" width="16" height="42" rx="8" fill="#bae6fd" stroke="#0284c7" stroke-width="2.5"/>

            <!-- Rocket Thruster Nozzles -->
            <path d="M56 152 L62 164 L72 164 L78 152 Z" fill="#475569" stroke="#334155" stroke-width="2"/>
            <path d="M82 152 L88 164 L98 164 L104 152 Z" fill="#475569" stroke="#334155" stroke-width="2"/>

            <!-- Thruster Flame (Hidden by default, fires on launch) -->
            <g class="wb-thruster-flame" id="wb-flames">
              <polygon points="67,164 61,180 73,180" fill="url(#flame-grad)"/>
              <polygon points="93,164 87,180 99,180" fill="url(#flame-grad)"/>
            </g>
          </svg>
        </div>

        <!-- Reactor Tube Column -->
        <div class="wb-reactor-column">
          <div class="wb-reactor-tube-outer" id="wb-reactor-tube">
            <div class="wb-reactor-ticks">
              <span class="wb-tick">5</span>
              <span class="wb-tick">4</span>
              <span class="wb-tick">3</span>
              <span class="wb-tick">2</span>
              <span class="wb-tick">1</span>
              <span class="wb-tick">0</span>
            </div>
            <div class="wb-reactor-fluid" id="wb-reactor-fluid" style="height: 0%;"></div>
          </div>
          <div class="wb-reactor-meta">
            <span class="wb-reactor-val" id="wb-reactor-text">0 / 5</span>
            <span class="wb-reactor-label" id="wb-reactor-unit">ENERGY</span>
          </div>
        </div>
      </div>

      <!-- Cognitive Visualizer: Live While Condition Radar -->
      <div class="wb-condition-radar" id="wb-radar">
        <div class="wb-radar-header">
          <span>🎯 LIVE WHILE CONDITION RADAR</span>
          <span class="wb-cycle-pill">
            <span class="wb-cycle-icon">🔄</span>
            <span id="wb-cycle-text">Cycle: #0</span>
          </span>
        </div>
        <div class="wb-radar-body">
          <div class="wb-radar-expr" id="wb-radar-expr">while energy &lt; 3:</div>
          <div class="wb-radar-eval">
            <span id="wb-eval-math">[ 0 ] &lt; 3</span>
            <span class="wb-radar-badge true" id="wb-eval-badge">TRUE ✅</span>
          </div>
        </div>
        <div class="wb-radar-footer" id="wb-radar-footer">
          <span>💡 <b>Loop Rule:</b> As long as condition is <b>True</b>, the loop repeats!</span>
        </div>
      </div>

      <!-- Interactive Student Deck -->
      <div class="wb-interact-deck">
        <div class="wb-interact-title">
          <span>🧪 Student Interactive Lab (Click to test &amp; experiment):</span>
        </div>

        <!-- Tactile Energy Value Setter -->
        <div class="wb-node-row">
          <span class="wb-node-label">Test Energy:</span>
          <button type="button" class="wb-val-chip active" data-val="0">0</button>
          <button type="button" class="wb-val-chip" data-val="1">1</button>
          <button type="button" class="wb-val-chip" data-val="2">2</button>
          <button type="button" class="wb-val-chip" data-val="3">3</button>
          <button type="button" class="wb-val-chip" data-val="4">4</button>
          <button type="button" class="wb-val-chip" data-val="5">5</button>
          <button type="button" class="wb-snippet-btn" id="wb-test-charge-btn" style="margin-left:auto;background:#e0f2fe;font-weight:700;">
            ⚡ Tap Charge (+1)
          </button>
        </div>

        <!-- Quick Code Syntax Helpers -->
        <div class="wb-snippet-row">
          <button type="button" class="wb-snippet-btn" data-snippet="while energy < 3:">
            🔁 while energy &lt; 3:
          </button>
          <button type="button" class="wb-snippet-btn" data-snippet="energy = energy + 1">
            ➕ energy = energy + 1
          </button>
          <button type="button" class="wb-snippet-btn" data-snippet="print(power)">
            📢 print(power)
          </button>
          <button type="button" class="wb-snippet-btn" data-snippet="launch()">
            🚀 launch()
          </button>
        </div>

        <!-- Inspector output -->
        <div class="wb-inspector-bar" id="wb-inspector-bar">
          👆 Click any number or snippet above to test condition checks and loop commands!
        </div>
      </div>
    </div>
  `;

  // Attach interactive listeners for the Student Deck
  wireInteractiveControls();
  updateVisuals(0, 3, "energy", true);
}

function wireInteractiveControls() {
  if (!root) return;

  // Number chips [0, 1, 2, 3, 4, 5]
  const valChips = root.querySelectorAll(".wb-val-chip");
  valChips.forEach(chip => {
    chip.addEventListener("click", () => {
      valChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const val = parseInt(chip.dataset.val, 10);
      currentEnergy = val;

      // Update test condition
      const targetLimit = 3;
      const isTrue = val < targetLimit;
      updateVisuals(val, targetLimit, "energy", isTrue);

      const inspector = root.querySelector("#wb-inspector-bar");
      if (inspector) {
        if (isTrue) {
          inspector.innerHTML = `Condition <code>[ ${val} ] &lt; ${targetLimit}</code> is <b>True ✅</b> — The while loop will run the commands inside!`;
        } else {
          inspector.innerHTML = `Condition <code>[ ${val} ] &lt; ${targetLimit}</code> is <b>False 🛑</b> — Target reached! The loop will terminate and move on.`;
        }
      }
    });
  });

  // Tap Charge Button
  const tapChargeBtn = root.querySelector("#wb-test-charge-btn");
  if (tapChargeBtn) {
    tapChargeBtn.addEventListener("click", () => {
      currentEnergy = (currentEnergy + 1) % 6;
      valChips.forEach(c => {
        c.classList.toggle("active", parseInt(c.dataset.val, 10) === currentEnergy);
      });
      play("charge", {}, {
        setBubble: text => {
          const b = root.querySelector("#bubble");
          if (b) { b.textContent = text; b.style.display = text ? "block" : "none"; }
        }
      });
      const targetLimit = 3;
      const isTrue = currentEnergy < targetLimit;
      updateVisuals(currentEnergy, targetLimit, "energy", isTrue);
    });
  }

  // Snippet buttons
  const snippetBtns = root.querySelectorAll(".wb-snippet-btn[data-snippet]");
  snippetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const snip = btn.dataset.snippet;
      const inspector = root.querySelector("#wb-inspector-bar");
      if (!inspector) return;

      if (snip.startsWith("while")) {
        inspector.innerHTML = `<b>Loop Header:</b> <code>${snip}</code> checks before each cycle. Don't forget the colon <code>:</code>!`;
      } else if (snip.includes("+ 1")) {
        inspector.innerHTML = `<b>Counter Step:</b> <code>${snip}</code> increments by 1 so the loop reaches its target!`;
      } else if (snip.includes("print")) {
        inspector.innerHTML = `<b>Output Command:</b> <code>${snip}</code> announces the current value to the diagnostic monitor!`;
      } else if (snip.includes("launch")) {
        inspector.innerHTML = `<b>Post-Loop Action:</b> <code>${snip}</code> should be unindented outside the loop so it only launches once!`;
      }
    });
  });
}

function updateVisuals(val, limit, varName = "energy", isTrue = null) {
  if (!root) return;

  const reactorFluid = root.querySelector("#wb-reactor-fluid");
  const reactorText = root.querySelector("#wb-reactor-text");
  const reactorUnit = root.querySelector("#wb-reactor-unit");
  const radarExpr = root.querySelector("#wb-radar-expr");
  const evalMath = root.querySelector("#wb-eval-math");
  const evalBadge = root.querySelector("#wb-eval-badge");
  const statusText = root.querySelector("#wb-status-text");
  const botCore = root.querySelector("#wb-bot-core");
  const radarFooter = root.querySelector("#wb-radar-footer");

  // Determine percentage
  const maxCap = limit > 5 ? limit : 5;
  const pct = Math.min(100, Math.max(0, (val / maxCap) * 100));

  if (reactorFluid) {
    reactorFluid.style.height = `${pct}%`;
    reactorFluid.classList.toggle("supercharged", val >= 5);
  }

  if (reactorText) {
    reactorText.textContent = `${val} / ${limit}`;
  }

  if (reactorUnit) {
    reactorUnit.textContent = varName.toUpperCase();
  }

  // Update robot core glow
  if (botCore) {
    const scale = 0.5 + (pct / 100) * 0.7;
    botCore.style.transformOrigin = "80px 120px";
    botCore.style.transform = `scale(${scale})`;
  }

  // Update Live Condition Radar
  if (varName === "countdown") {
    if (radarExpr) radarExpr.textContent = `while countdown > 0:`;
    const checkTrue = isTrue !== null ? isTrue : (val > 0);
    if (evalMath) evalMath.textContent = `[ ${val} ] > 0`;
    if (evalBadge) {
      evalBadge.className = `wb-radar-badge ${checkTrue ? "true" : "false"}`;
      evalBadge.textContent = checkTrue ? "TRUE ✅ (Countdown)" : "FALSE 🛑 (Blastoff!)";
    }
    if (radarFooter) {
      radarFooter.innerHTML = checkTrue 
        ? `<span>⏳ <b>Counting down:</b> ${val} second(s) remaining!</span>`
        : `<span>🚀 <b>Countdown finished!</b> Moving to launch()!</span>`;
    }
    if (statusText) {
      statusText.textContent = checkTrue ? `⏳ T-minus ${val}...` : "🚀 Blastoff Ready!";
    }
  } else {
    // Normal counting up
    const op = varName === "power" ? "<=" : "<";
    if (radarExpr) radarExpr.textContent = `while ${varName} ${op} ${limit}:`;
    const checkTrue = isTrue !== null ? isTrue : (op === "<=" ? val <= limit : val < limit);
    if (evalMath) evalMath.textContent = `[ ${val} ] ${op} ${limit}`;
    if (evalBadge) {
      evalBadge.className = `wb-radar-badge ${checkTrue ? "true" : "false"}`;
      evalBadge.textContent = checkTrue ? "TRUE ✅ (Looping)" : "FALSE 🛑 (Finished)";
    }
    if (radarFooter) {
      radarFooter.innerHTML = checkTrue 
        ? `<span>🔄 <b>Condition Met:</b> Running loop body statements!</span>`
        : `<span>🏁 <b>Condition False:</b> Stopping loop, Astro-Bot is ready!</span>`;
    }
    if (statusText) {
      statusText.textContent = checkTrue 
        ? `🔋 Charging ${varName} (${val}/${limit})` 
        : `⚡ Power Reached (${val} units)!`;
    }
  }
}

export function render(env) {
  if (!root || !env) return;
  lastEnv = Object.assign({}, env);

  let varName = "energy";
  let val = 0;
  let limit = 3;

  if (env.countdown !== undefined) {
    varName = "countdown";
    val = env.countdown;
    limit = 0;
  } else if (env.power !== undefined) {
    varName = "power";
    val = env.power;
    limit = 4;
  } else if (env.energy !== undefined) {
    varName = "energy";
    val = env.energy;
    limit = (val > 3 || (env.target && env.target >= 5)) ? 5 : 3;
  }

  currentEnergy = val;

  // Increment cycle
  currentCycle++;
  const cycleText = root.querySelector("#wb-cycle-text");
  if (cycleText) cycleText.textContent = `Cycle: #${currentCycle}`;

  // Highlight corresponding chip if within 0..5
  const valChips = root.querySelectorAll(".wb-val-chip");
  valChips.forEach(c => {
    c.classList.toggle("active", parseInt(c.dataset.val, 10) === val);
  });

  updateVisuals(val, limit, varName);
}

export function reset() {
  currentCycle = 0;
  if (!root) return;

  const bot = root.querySelector("#wb-bot");
  if (bot) {
    bot.classList.remove("launched", "thrusting", "charging-burst");
    bot.classList.add("hovering");
  }

  const sparks = root.querySelectorAll(".wb-spark-particle");
  sparks.forEach(s => s.remove());

  const cycleText = root.querySelector("#wb-cycle-text");
  if (cycleText) cycleText.textContent = "Cycle: #0";

  const bubble = root.querySelector("#bubble");
  if (bubble) {
    bubble.textContent = "";
    bubble.style.display = "none";
  }

  updateVisuals(0, 3, "energy", true);
}

export async function play(cmd, args, ctx) {
  if (!root) return;

  const bot = root.querySelector("#wb-bot");
  const bubble = root.querySelector("#bubble");
  const setBubble = (ctx && ctx.setBubble) ? ctx.setBubble : (msg => {
    if (bubble) {
      bubble.textContent = msg;
      bubble.style.display = msg ? "block" : "none";
    }
  });

  if (cmd === "charge") {
    if (bot) {
      bot.classList.remove("charging-burst");
      void bot.offsetWidth; // trigger reflow
      bot.classList.add("charging-burst");
    }
    spawnSparks(6);
    setBubble("⚡ Charging power core! (+1)");
    await new Promise(r => setTimeout(r, 400));
  } else if (cmd === "spark") {
    if (bot) {
      bot.classList.remove("charging-burst");
      void bot.offsetWidth;
      bot.classList.add("charging-burst");
    }
    spawnSparks(12);
    setBubble("✨ Zap! High-voltage electro-spark!");
    await new Promise(r => setTimeout(r, 400));
  } else if (cmd === "launch") {
    if (bot) {
      bot.classList.remove("hovering");
      bot.classList.add("thrusting", "launched");
    }
    spawnSparks(10, { color: "#f59e0b" });
    setBubble("🚀 3... 2... 1... Blastoff! Astro-Bot launches into orbit!");
    await new Promise(r => setTimeout(r, 650));
  } else if (cmd === "print") {
    const text = (args && args.length) ? args.join(" ") : "status ok";
    setBubble(`📢 ${text}`);
    await new Promise(r => setTimeout(r, 300));
  } else {
    setBubble(`▶ ${cmd}()`);
    await new Promise(r => setTimeout(r, 250));
  }
}

function spawnSparks(count = 6, options = {}) {
  if (!root) return;
  const stage = root.querySelector(".wb-main-display") || root;
  const color = options.color || "#38bdf8";

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("div");
    spark.className = "wb-spark-particle";
    spark.style.background = color;
    spark.style.boxShadow = `0 0 8px ${color}`;

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
    const dist = 30 + Math.random() * 40;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    spark.style.setProperty("--dx", `${dx}px`);
    spark.style.setProperty("--dy", `${dy}px`);

    // Center on robot or reactor
    spark.style.left = "45%";
    spark.style.top = "50%";

    stage.appendChild(spark);
    setTimeout(() => spark.remove(), 550);
  }
}
