/* =========================================================================
   Lesson 9 — Comparison + Boolean: Smart Eco-Greenhouse
   Ultra-Compact Scene Stage Visualizer
   - 135px height: guarantees all step buttons and trace stay in full view
   - Live Boolean truth evaluation in top HUD
   - Fast, snappy animations (250ms) for commands
   ========================================================================= */

const sleep = ms => new Promise(r => setTimeout(r, ms));
const py = v => v === true ? "True" : v === false ? "False" : JSON.stringify(v);

let root = null;
let currentEnv = {
  temp: 26,
  sun: true,
  moisture: 35,
  battery: 75,
  rain: false
};

const $ = s => root ? root.querySelector(s) : null;

function buildSVG() {
  return `
    <svg class="l9-stage-svg" viewBox="0 0 400 135" role="img" aria-label="Smart Eco-Greenhouse">
      <defs>
        <radialGradient id="l9-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="l9-light-cone" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stop-color="rgba(254, 240, 138, 0.85)" />
          <stop offset="60%" stop-color="rgba(251, 191, 36, 0.3)" />
          <stop offset="100%" stop-color="rgba(245, 158, 11, 0)" />
        </radialGradient>
        <radialGradient id="l9-eco-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(52, 211, 153, 0.15)" />
          <stop offset="85%" stop-color="rgba(16, 185, 129, 0.4)" />
          <stop offset="100%" stop-color="rgba(5, 150, 105, 0.75)" />
        </radialGradient>
      </defs>

      <!-- Background Meadow -->
      <path d="M 0 115 Q 120 102 240 112 T 400 110 L 400 135 L 0 135 Z" fill="#86efac" />

      <!-- Sky Celestial Body -->
      <g id="l9-sky-sun">
        <circle cx="345" cy="24" r="16" fill="url(#l9-sun-glow)"/>
        <circle cx="345" cy="24" r="9" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.2"/>
      </g>
      <g id="l9-sky-moon" style="display:none;">
        <path d="M 345 16 A 9 9 0 0 0 345 34 A 7 7 0 1 1 345 16 Z" fill="#f1f5f9"/>
      </g>

      <!-- Glass Greenhouse Arch -->
      <path d="M 70 115 C 70 20, 330 20, 330 115 Z" fill="rgba(224, 242, 254, 0.5)" stroke="#38bdf8" stroke-width="2" />
      <path d="M 125 115 C 125 36, 275 36, 275 115" fill="none" stroke="rgba(255, 255, 255, 0.65)" stroke-width="1.4" />
      <line x1="70" y1="75" x2="330" y2="75" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.4" />

      <!-- Rooftop Ventilation Fan Assembly -->
      <g id="l9-fan-unit">
        <circle cx="200" cy="22" r="12" fill="#334155" stroke="#475569" stroke-width="1.8"/>
        <g id="l9-fan-blades">
          <path d="M 200 22 Q 205 10 200 8 Q 195 10 200 22 Z" fill="#38bdf8"/>
          <path d="M 200 22 Q 212 27 214 22 Q 212 17 200 22 Z" fill="#38bdf8"/>
          <path d="M 200 22 Q 195 34 200 36 Q 205 34 200 22 Z" fill="#38bdf8"/>
          <path d="M 200 22 Q 188 17 186 22 Q 188 27 200 22 Z" fill="#38bdf8"/>
          <circle cx="200" cy="22" r="3" fill="#f8fafc"/>
        </g>
        <g id="l9-breeze-lines" opacity="0" style="transition:opacity 0.2s;">
          <path d="M 186 36 Q 190 48 182 60" fill="none" stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M 200 38 Q 202 52 200 66" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M 214 36 Q 210 48 218 60" fill="none" stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round"/>
        </g>
      </g>

      <!-- Grow-Lights Fixtures & Cones -->
      <g id="l9-grow-light-glow">
        <polygon points="155,42 120,115 195,115" fill="url(#l9-light-cone)"/>
        <polygon points="245,42 205,115 280,115" fill="url(#l9-light-cone)"/>
      </g>
      <g id="l9-light-fixtures">
        <line x1="160" y1="22" x2="160" y2="40" stroke="#64748b" stroke-width="1"/>
        <path d="M 153 40 Q 160 34 167 40 Z" fill="#fbbf24"/>
        <circle cx="160" cy="40" r="2.5" fill="#fef08a"/>
        <line x1="240" y1="22" x2="240" y2="40" stroke="#64748b" stroke-width="1"/>
        <path d="M 233 40 Q 240 34 247 40 Z" fill="#fbbf24"/>
        <circle cx="240" cy="40" r="2.5" fill="#fef08a"/>
      </g>

      <!-- Sprinklers -->
      <g id="l9-sprinklers">
        <line x1="125" y1="50" x2="275" y2="50" stroke="#94a3b8" stroke-width="1.8"/>
        <rect x="145" y="50" width="5" height="3" fill="#ca8a04"/>
        <rect x="250" y="50" width="5" height="3" fill="#ca8a04"/>
        <!-- Mist Drops -->
        <g id="l9-mist-drops">
          <ellipse class="l9-water-drop" cx="147" cy="60" rx="1.4" ry="2.2" fill="#38bdf8" opacity="0"/>
          <ellipse class="l9-water-drop" cx="150" cy="72" rx="1.2" ry="2.0" fill="#0ea5e9" opacity="0"/>
          <ellipse class="l9-water-drop" cx="252" cy="60" rx="1.4" ry="2.2" fill="#38bdf8" opacity="0"/>
          <ellipse class="l9-water-drop" cx="249" cy="72" rx="1.2" ry="2.0" fill="#0ea5e9" opacity="0"/>
        </g>
      </g>

      <!-- Eco Energy Shield -->
      <g id="l9-eco-shield">
        <path d="M 68 115 C 68 18, 332 18, 332 115 Z" fill="url(#l9-eco-aura)" stroke="#10b981" stroke-width="2.2" stroke-dasharray="5 3"/>
      </g>

      <!-- Soil Bed -->
      <rect x="75" y="112" width="250" height="18" rx="3" fill="#78350f" stroke="#451a03" stroke-width="1.8"/>

      <!-- Plants -->
      <!-- Sunflower Sunnie -->
      <g class="plant-item" id="l9-sunnie" transform="translate(130, 112)">
        <path d="M 0 0 Q -2 -12 0 -22" fill="none" stroke="#16a34a" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="0" cy="-22" r="7" fill="#facc15" stroke="#eab308" stroke-width="0.8"/>
        <circle cx="0" cy="-22" r="4.2" fill="#78350f"/>
        <circle cx="-1.5" cy="-23" r="0.7" fill="#ffffff"/>
        <circle cx="1.5" cy="-23" r="0.7" fill="#ffffff"/>
      </g>

      <!-- Baby Seedling Sprout -->
      <g class="plant-item" id="l9-sprout" transform="translate(200, 112)">
        <path d="M 0 0 Q 0 -8 0 -16" fill="none" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M 0 -15 C -8 -21, -8 -10, 0 -13" fill="#4ade80" stroke="#16a34a" stroke-width="0.8"/>
        <path d="M 0 -15 C 8 -21, 8 -10, 0 -13" fill="#4ade80" stroke="#16a34a" stroke-width="0.8"/>
        <circle cx="-1.4" cy="-11" r="0.7" fill="#14532d"/>
        <circle cx="1.4" cy="-11" r="0.7" fill="#14532d"/>
      </g>

      <!-- Strawberry Berry -->
      <g class="plant-item" id="l9-berry" transform="translate(270, 112)">
        <path d="M 0 0 Q 2 -10 0 -19" fill="none" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round"/>
        <ellipse cx="-6" cy="-14" rx="5.5" ry="4" fill="#22c55e"/>
        <ellipse cx="6" cy="-14" rx="5.5" ry="4" fill="#22c55e"/>
        <path d="M 0 -10 C -4 -10, -5 -4, 0 -1 C 5 -4, 4 -10, 0 -10 Z" fill="#ef4444"/>
      </g>

      <!-- Mascot Caretaker: Sprout-Bot -->
      <g id="l9-robot-bot" transform="translate(88, 55)">
        <ellipse cx="0" cy="18" rx="7" ry="2.2" fill="rgba(56, 189, 248, 0.25)"/>
        <rect x="-10" y="-8" width="20" height="16" rx="4" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
        <rect x="-7" y="-5.5" width="14" height="11" rx="2" fill="#0f172a"/>
        <text id="l9-bot-face" x="0" y="2" text-anchor="middle" font-size="5.5" fill="#38bdf8" font-family="'JetBrains Mono', monospace" font-weight="bold">(^_^)</text>
      </g>
    </svg>
  `;
}

export function init(container) {
  root = container;
  root.innerHTML = `
    <div class="scene l9-scene" id="l9-scene">
      <div class="bubble" id="bubble"></div>
      <div class="l9-stage-box" id="l9-stage-box">
        <div class="l9-hud-bar">
          <div class="l9-hud-title">🌱 Eco-Greenhouse</div>
          <div class="l9-truth-pill" id="l9-truth-pill">⚡ Logic: True</div>
        </div>
        ${buildSVG()}
      </div>
    </div>
  `;

  render(currentEnv);
}

export function render(env) {
  if (!env || !root) return;
  currentEnv = Object.assign({
    temp: 26,
    sun: true,
    moisture: 35,
    battery: 75,
    rain: false
  }, env);

  // Update sky
  const stage = $("#l9-stage-box");
  const sunEl = $("#l9-sky-sun");
  const moonEl = $("#l9-sky-moon");
  if (currentEnv.sun === false) {
    if (stage) stage.classList.add("is-night");
    if (sunEl) sunEl.style.display = "none";
    if (moonEl) moonEl.style.display = "inline";
  } else {
    if (stage) stage.classList.remove("is-night");
    if (sunEl) sunEl.style.display = "inline";
    if (moonEl) moonEl.style.display = "none";
  }

  // Update Top Truth Pill
  const truth = $("#l9-truth-pill");
  if (truth) {
    const temp = currentEnv.temp !== undefined ? currentEnv.temp : 26;
    const sun = currentEnv.sun !== undefined ? currentEnv.sun : true;
    const battery = currentEnv.battery !== undefined ? currentEnv.battery : 75;
    const moisture = currentEnv.moisture !== undefined ? currentEnv.moisture : 35;

    if (battery < 25) {
      truth.textContent = `⚡ battery < 25: eco_mode()`;
      truth.className = "l9-truth-pill";
    } else if (temp > 28 && sun) {
      truth.textContent = `🌀 temp>28 & sun: fan()`;
      truth.className = "l9-truth-pill";
    } else if (moisture < 30) {
      truth.textContent = `🌱 moisture < 30: water()`;
      truth.className = "l9-truth-pill";
    } else if (!sun) {
      truth.textContent = `💡 not sun: lights()`;
      truth.className = "l9-truth-pill";
    } else {
      truth.textContent = `🌿 Sensors Balanced`;
      truth.className = "l9-truth-pill";
    }
  }

  // Render variables into the standard #vars container cleanly
  const V = document.getElementById("vars");
  if (V) {
    V.innerHTML = "";
    const lb = document.createElement("span");
    lb.className = "lbl";
    lb.textContent = "Sensors:";
    V.appendChild(lb);
    Object.entries(env).forEach(([k, v]) => {
      if (k === "pc" || k === "want" || k === "label") return;
      const pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = `${k} = ${py(v)}`;
      V.appendChild(pill);
    });
  }
}

export function reset() {
  if (!root) return;
  const stage = $("#l9-stage-box");
  if (stage) {
    stage.classList.remove("fan-running", "water-running", "lights-running", "eco-running");
  }
  const f = $("#l9-bot-face");
  if (f) f.textContent = "(^_^)";
}

export async function play(name, options = {}) {
  if (!root) return;
  const setBubble = options.setBubble || ((text) => {
    const bubble = $("#bubble");
    if (bubble) {
      bubble.textContent = text;
      if (text) bubble.classList.add("active");
      else bubble.classList.remove("active");
    }
  });

  const stage = $("#l9-stage-box");
  const face = $("#l9-bot-face");
  reset();

  if (name === "print") {
    const text = options.out !== undefined ? String(options.out) : "print()";
    setBubble("🖨️ " + (text.length > 25 ? text.slice(0, 25) + "…" : text));
    if (face) face.textContent = "(^.^)";
    await sleep(200);
  } else if (name === "fan") {
    setBubble("🌀 Fan cooling!");
    if (face) face.textContent = "(^o^)";
    if (stage) stage.classList.add("fan-running");
    await sleep(250);
  } else if (name === "water") {
    setBubble("🌱 Mist watering!");
    if (face) face.textContent = "(*_*)";
    if (stage) stage.classList.add("water-running");
    await sleep(250);
  } else if (name === "lights") {
    setBubble("💡 Grow-lights on!");
    if (face) face.textContent = "(^_~)";
    if (stage) stage.classList.add("lights-running");
    await sleep(250);
  } else if (name === "eco_mode") {
    setBubble("🛡️ Eco-shield saved!");
    if (face) face.textContent = "(^‿^)";
    if (stage) stage.classList.add("eco-running");
    await sleep(250);
  } else {
    setBubble(`▶ ${name}()`);
    await sleep(150);
  }

  setBubble("");
  reset();
}
