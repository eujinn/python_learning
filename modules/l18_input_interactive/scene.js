/* =========================================================================
   Lesson 18 — Input + Interactive Program: Cyber Terminal & Bot Visualizer
   A.E.X.-18 Interactive Companion · Live Input Pipeline · Smooth SVG & Audio
   ========================================================================= */

let root = null;
let soundEnabled = true;
let audioCtx = null;
let currentCadetName = "Cadet";
let currentPrompt = "input() ready";
let currentInputVal = "—";
let currentDestination = "Deep Space";
let currentShield = 0;
let currentAction = "idle";
let stagedInputs = [];
let botGreetings = [
  "Awaiting command, Commander!",
  "Starbase terminal online!",
  "Ready for interactive input!",
  "Type or press any tool button!",
  "Beep boop! Systems at 100%."
];

/* ---- Web Audio Synthesizer (Zero dependencies, offline safe) --------- */
function initAudio() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioCtor();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playTone(freq, type = "sine", duration = 0.15, vol = 0.15) {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Graceful fallback
  }
}

function playKeyClick() {
  if (!soundEnabled) return;
  playTone(850, "triangle", 0.04, 0.1);
}

function playLoginChime() {
  if (!soundEnabled) return;
  playTone(440, "sine", 0.15, 0.18); // A4
  setTimeout(() => playTone(554.37, "sine", 0.15, 0.18), 90); // C#5
  setTimeout(() => playTone(659.25, "sine", 0.25, 0.2), 180); // E5
  setTimeout(() => playTone(880.00, "triangle", 0.35, 0.22), 270); // A5
}

function playPatrolSweepSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.16, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {}
}

function playBoostSound() {
  if (!soundEnabled) return;
  playTone(180, "sawtooth", 0.35, 0.14);
  setTimeout(() => playTone(280, "sawtooth", 0.35, 0.16), 80);
  setTimeout(() => playTone(460, "triangle", 0.4, 0.18), 160);
}

function playShieldSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, audioCtx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (e) {}
}

function playCelebrateFanfare() {
  if (!soundEnabled) return;
  playTone(523.25, "triangle", 0.12, 0.2); // C5
  setTimeout(() => playTone(659.25, "triangle", 0.12, 0.2), 80); // E5
  setTimeout(() => playTone(783.99, "triangle", 0.12, 0.2), 160); // G5
  setTimeout(() => playTone(1046.50, "sine", 0.4, 0.25), 240); // C6
}

function playBotChirp() {
  if (!soundEnabled) return;
  playTone(600, "sine", 0.08, 0.15);
  setTimeout(() => playTone(900, "triangle", 0.1, 0.18), 70);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---- Main Lifecycle: init -------------------------------------------- */
export function init(container) {
  root = container;
  currentCadetName = "Cadet";
  currentPrompt = "input() ready";
  currentInputVal = "—";
  currentDestination = "Deep Space";
  currentShield = 0;
  currentAction = "idle";
  stagedInputs = [];

  root.innerHTML = `
    <div class="it-stage">
      <div id="bubble" class="bubble"></div>

      <!-- Header & Status Bar -->
      <div class="it-header">
        <div class="it-title-wrap">
          <div class="it-icon-badge" id="it-bot-icon">🤖</div>
          <div>
            <div class="it-title">Cyber Terminal & AI Bot</div>
            <div class="it-subtitle">Starbase Station Deck · Model A.E.X.-18</div>
          </div>
        </div>
        <div class="it-header-controls">
          <button class="it-audio-btn" id="it-sound-toggle" title="Toggle Sound Effects">
            <span id="it-sound-icon">🔊</span> <span id="it-sound-text">Sound ON</span>
          </button>
          <div class="it-status-pill" id="it-status-pill">
            <span class="it-status-dot"></span>
            <span id="it-status-text">Standby · Awaiting Input</span>
          </div>
        </div>
      </div>

      <!-- "Understand" HUD: Visual Input Pipeline -->
      <div class="it-pipeline" id="it-pipeline">
        <div class="it-pipeline-header">
          <span>📡 Live Input Pipeline — Data Flow Inspector</span>
          <span id="it-step-badge" style="color:#94a3b8; font-weight:500;">Step: Standby</span>
        </div>
        <div class="it-pipeline-grid">
          <!-- Step 1: Prompt Question -->
          <div class="it-pipe-node" id="it-node-prompt">
            <span class="it-pipe-label">1. input(prompt)</span>
            <span class="it-pipe-val" id="it-pipe-prompt">"Enter cadet name: "<span class="it-cursor"></span></span>
          </div>
          <div class="it-pipe-arrow">➜</div>
          <!-- Step 2: User Typed Response -->
          <div class="it-pipe-node" id="it-node-input">
            <span class="it-pipe-label">2. User Keystrokes</span>
            <span class="it-pipe-val" id="it-pipe-input" style="color:#38bdf8;">"Astra"</span>
          </div>
          <div class="it-pipe-arrow">➜</div>
          <!-- Step 3: Variable Stored & Type -->
          <div class="it-pipe-node" id="it-node-var">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="it-pipe-label">3. Saved Variable</span>
              <span class="it-pipe-type-badge it-type-str" id="it-type-badge">str</span>
            </div>
            <span class="it-pipe-val" id="it-pipe-var" style="color:#4ade80;">name = "Astra"</span>
          </div>
        </div>
        <div class="it-pipeline-info" id="it-pipe-explain">
          <span>💡</span>
          <span id="it-pipe-explain-text">Python's input() pauses the program, asks the cadet for text, and stores the answer as a string variable!</span>
        </div>
      </div>

      <!-- Main Visual Viewport (Starbase Command Deck) -->
      <div class="it-viewport" id="it-viewport">
        <!-- Cosmic Stars -->
        <div class="it-stars"></div>
        <!-- Orbiting Space Station -->
        <div class="it-station"></div>
        <!-- Floor Gridlines -->
        <div class="it-deck-floor">
          <div class="it-grid-lines"></div>
        </div>

        <!-- Radar Sweep Cone -->
        <div class="it-radar-sweep" id="it-radar-sweep"></div>

        <!-- Shimmering Spherical Plasma Force Field -->
        <div class="it-shield-sphere" id="it-shield-sphere"></div>

        <!-- Dynamic Holographic Speech Bubble -->
        <div class="it-holo-bubble" id="it-holo-bubble">
          <span id="it-holo-text">Ready for cadet input! 🚀</span>
        </div>

        <!-- Particles FX Overlay (Boost flames, confetti) -->
        <div class="it-fx-overlay" id="it-fx-overlay"></div>

        <!-- Cyber Bot A.E.X.-18 SVG Container -->
        <div class="it-bot-wrap hovering" id="it-bot-wrap" title="Click me to interact!">
          <svg class="it-bot-svg" viewBox="0 0 160 170" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bot-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#475569"/>
                <stop offset="50%" stop-color="#1e293b"/>
                <stop offset="100%" stop-color="#0f172a"/>
              </linearGradient>
              <linearGradient id="bot-cyan-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#0284c7"/>
              </linearGradient>
              <linearGradient id="flame-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="60%" stop-color="#0284c7"/>
                <stop offset="100%" stop-color="transparent"/>
              </linearGradient>
              <linearGradient id="visor-glass" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#090d16"/>
                <stop offset="100%" stop-color="#020617"/>
              </linearGradient>
            </defs>

            <!-- Holographic Antenna -->
            <line x1="80" y1="28" x2="80" y2="12" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="80" cy="10" r="4.5" fill="#38bdf8" id="it-antenna-orb" filter="drop-shadow(0 0 6px #38bdf8)"/>

            <!-- Head Chassis -->
            <rect x="42" y="28" width="76" height="52" rx="16" fill="url(#bot-metal)" stroke="#38bdf8" stroke-width="2"/>

            <!-- Ear Audio Pods -->
            <rect x="34" y="44" width="8" height="20" rx="3" fill="#0284c7"/>
            <rect x="118" y="44" width="8" height="20" rx="3" fill="#0284c7"/>

            <!-- Visor Screen -->
            <rect x="52" y="38" width="56" height="32" rx="10" fill="url(#visor-glass)" stroke="#0284c7" stroke-width="1.5"/>

            <!-- Expressive Glowing LED Eyes -->
            <ellipse cx="68" cy="54" rx="6.5" ry="7.5" fill="#38bdf8" id="it-eye-left" class="it-visor-eye"/>
            <ellipse cx="92" cy="54" rx="6.5" ry="7.5" fill="#38bdf8" id="it-eye-right" class="it-visor-eye"/>
            <circle cx="70" cy="51" r="2" fill="#ffffff"/>
            <circle cx="94" cy="51" r="2" fill="#ffffff"/>

            <!-- Cheerful Mouth / Audio Waveform -->
            <path d="M72 63 Q80 68 88 63" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" fill="none" id="it-mouth"/>

            <!-- Neck Joint -->
            <rect x="72" y="80" width="16" height="8" rx="2" fill="#334155"/>

            <!-- Main Torso Body -->
            <path d="M46 88 L114 88 L122 136 L38 136 Z" fill="url(#bot-metal)" stroke="#0284c7" stroke-width="2"/>

            <!-- Chest Interactive Reactor Core -->
            <circle cx="80" cy="110" r="14" fill="#090d16" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="80" cy="110" r="9" fill="#38bdf8" id="it-core-glow" opacity="0.9"/>
            <polygon points="80,103 86,114 74,114" fill="#ffffff" opacity="0.75"/>

            <!-- Arm Left -->
            <g id="it-arm-left" style="transform-origin: 38px 96px; transition: transform 0.3s ease;">
              <circle cx="38" cy="96" r="5" fill="#0284c7"/>
              <line x1="38" y1="96" x2="22" y2="120" stroke="#94a3b8" stroke-width="4.5" stroke-linecap="round"/>
              <circle cx="20" cy="122" r="5" fill="#38bdf8"/>
            </g>

            <!-- Arm Right (Articulated for waving) -->
            <g id="it-arm-right" style="transform-origin: 122px 96px; transition: transform 0.3s ease;">
              <circle cx="122" cy="96" r="5" fill="#0284c7"/>
              <line x1="122" y1="96" x2="138" y2="120" stroke="#94a3b8" stroke-width="4.5" stroke-linecap="round"/>
              <circle cx="140" cy="122" r="5" fill="#38bdf8"/>
            </g>

            <!-- Dual Ion Hover Thrusters (Bottom) -->
            <rect x="50" y="136" width="22" height="8" rx="2" fill="#334155"/>
            <rect x="88" y="136" width="22" height="8" rx="2" fill="#334155"/>

            <!-- Thruster Ion Flames -->
            <polygon points="53,144 69,144 61,166" fill="url(#flame-grad)" class="it-thruster-flame" id="it-flame-left"/>
            <polygon points="91,144 107,144 99,166" fill="url(#flame-grad)" class="it-thruster-flame" id="it-flame-right"/>
          </svg>
        </div>
      </div>

      <!-- Telemetry & Variable Tray -->
      <div class="it-telemetry">
        <div class="it-telem-item">
          <span class="it-telem-icon">👤</span>
          <span>Pilot:</span>
          <span class="it-telem-val" id="it-telem-name">Cadet</span>
        </div>
        <div class="it-telem-item">
          <span class="it-telem-icon">🪐</span>
          <span>Course:</span>
          <span class="it-telem-val" id="it-telem-course">Deep Space</span>
        </div>
        <div class="it-telem-item">
          <span class="it-telem-icon">🛡️</span>
          <span>Shield:</span>
          <span class="it-telem-val" id="it-telem-shield">0%</span>
        </div>
        <div class="it-telem-item">
          <span class="it-telem-icon">⚡</span>
          <span>Status:</span>
          <span class="it-telem-val" id="it-telem-status" style="color:#10b981;">Online</span>
        </div>
      </div>

      <!-- Interactive Stage Tool Buttons -->
      <div class="it-toolbar">
        <button class="it-tool-btn btn-primary" id="it-btn-login" title="Test Login: login(name)">
          <span>🔑</span> <span>Login</span>
        </button>
        <button class="it-tool-btn" id="it-btn-patrol" title="Test Patrol: patrol()">
          <span>🛸</span> <span>Patrol</span>
        </button>
        <button class="it-tool-btn" id="it-btn-boost" title="Test Overdrive: boost()">
          <span>⚡</span> <span>Boost</span>
        </button>
        <button class="it-tool-btn" id="it-btn-shield" title="Test Force Field: shield(80)">
          <span>🛡️</span> <span>Shield (80%)</span>
        </button>
        <button class="it-tool-btn" id="it-btn-chat" title="Test Speech Synthesis: say()">
          <span>💬</span> <span>Talk</span>
        </button>
        <button class="it-tool-btn" id="it-btn-celebrate" title="Test Victory Light Show: celebrate()">
          <span>🎉</span> <span>Celebrate</span>
        </button>
      </div>

      <!-- Hands-on Interactive Input Simulator ("Try Your Own Input") -->
      <div class="it-sim-deck">
        <div class="it-sim-header">
          <span>⌨️ Interactive Input Deck — Test How input() Receives Keystrokes</span>
          <span class="it-sim-badge">Live Simulator</span>
        </div>
        <div class="it-sim-input-row">
          <input type="text" class="it-sim-input" id="it-sim-input" placeholder="Type custom input here (e.g. Astra, Mars, boost, 80)..." />
          <button class="it-sim-send-btn" id="it-sim-send">Send Input ↵</button>
        </div>
        <div class="it-sim-chips">
          <span class="it-sim-chip-label">Quick test chips:</span>
          <span class="it-sim-chip" data-val="Astra">"Astra"</span>
          <span class="it-sim-chip" data-val="Mars">"Mars"</span>
          <span class="it-sim-chip" data-val="patrol">"patrol"</span>
          <span class="it-sim-chip" data-val="boost">"boost"</span>
          <span class="it-sim-chip" data-val="80">"80"</span>
          <span class="it-sim-chip" data-val="celebrate">"celebrate"</span>
        </div>
      </div>
    </div>
  `;

  setupEventListeners();
}

/* ---- Event Listeners & Interactive Wiring ---------------------------- */
function setupEventListeners() {
  if (!root) return;

  // Sound toggle
  const soundBtn = root.querySelector("#it-sound-toggle");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      const icon = root.querySelector("#it-sound-icon");
      const text = root.querySelector("#it-sound-text");
      if (icon) icon.textContent = soundEnabled ? "🔊" : "🔇";
      if (text) text.textContent = soundEnabled ? "Sound ON" : "Sound OFF";
      if (soundEnabled) playBotChirp();
    });
  }

  // Click on Bot
  const botWrap = root.querySelector("#it-bot-wrap");
  if (botWrap) {
    botWrap.addEventListener("click", () => {
      triggerBotGreeting();
    });
  }

  // Stage tool buttons
  const btnLogin = root.querySelector("#it-btn-login");
  if (btnLogin) btnLogin.addEventListener("click", () => animateLogin(currentCadetName));

  const btnPatrol = root.querySelector("#it-btn-patrol");
  if (btnPatrol) btnPatrol.addEventListener("click", () => animatePatrol());

  const btnBoost = root.querySelector("#it-btn-boost");
  if (btnBoost) btnBoost.addEventListener("click", () => animateBoost());

  const btnShield = root.querySelector("#it-btn-shield");
  if (btnShield) btnShield.addEventListener("click", () => animateShield(80));

  const btnChat = root.querySelector("#it-btn-chat");
  if (btnChat) btnChat.addEventListener("click", () => triggerBotGreeting());

  const btnCelebrate = root.querySelector("#it-btn-celebrate");
  if (btnCelebrate) btnCelebrate.addEventListener("click", () => animateCelebrate());

  // Input simulator
  const simInput = root.querySelector("#it-sim-input");
  const simSend = root.querySelector("#it-sim-send");

  const submitSimInput = val => {
    const raw = (val !== undefined ? val : (simInput ? simInput.value : "")).trim();
    if (!raw) return;
    playKeyClick();
    handleSimulatedInput(raw);
    if (simInput) simInput.value = "";
  };

  if (simSend) {
    simSend.addEventListener("click", () => submitSimInput());
  }

  if (simInput) {
    simInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitSimInput();
      }
    });
  }

  // Quick chips
  const chips = root.querySelectorAll(".it-sim-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const val = chip.getAttribute("data-val");
      submitSimInput(val);
    });
  });
}

function updateStatus(text, type = "idle") {
  if (!root) return;
  const pill = root.querySelector("#it-status-pill");
  const statusText = root.querySelector("#it-status-text");
  if (statusText) statusText.textContent = text;
  if (pill) {
    pill.className = "it-status-pill";
    if (type === "active") pill.classList.add("active");
    if (type === "prompting") pill.classList.add("prompting");
  }
}

function updateHoloBubble(text) {
  if (!root) return;
  const bubble = root.querySelector("#it-holo-bubble");
  const txt = root.querySelector("#it-holo-text");
  if (txt) txt.textContent = text;
  if (bubble) {
    bubble.style.transform = "translateX(-50%) scale(1.05)";
    setTimeout(() => { bubble.style.transform = "translateX(-50%) scale(1)"; }, 200);
  }
}

function setBotEyes(type = "normal") {
  if (!root) return;
  const leftEye = root.querySelector("#it-eye-left");
  const rightEye = root.querySelector("#it-eye-right");
  if (!leftEye || !rightEye) return;

  if (type === "happy") {
    leftEye.setAttribute("ry", "2.5");
    rightEye.setAttribute("ry", "2.5");
  } else if (type === "boost") {
    leftEye.setAttribute("ry", "9");
    rightEye.setAttribute("ry", "9");
    leftEye.setAttribute("fill", "#f59e0b");
    rightEye.setAttribute("fill", "#f59e0b");
  } else {
    leftEye.setAttribute("ry", "7.5");
    rightEye.setAttribute("ry", "7.5");
    leftEye.setAttribute("fill", "#38bdf8");
    rightEye.setAttribute("fill", "#38bdf8");
  }
}

function triggerBotGreeting() {
  playBotChirp();
  setBotEyes("happy");
  waveRightArm();
  const randomMsg = botGreetings[Math.floor(Math.random() * botGreetings.length)];
  updateHoloBubble(randomMsg);
  setTimeout(() => setBotEyes("normal"), 1500);
}

function waveRightArm() {
  if (!root) return;
  const arm = root.querySelector("#it-arm-right");
  if (!arm) return;
  arm.style.transform = "rotate(-50deg)";
  setTimeout(() => { arm.style.transform = "rotate(-20deg)"; }, 200);
  setTimeout(() => { arm.style.transform = "rotate(-50deg)"; }, 400);
  setTimeout(() => { arm.style.transform = "rotate(0deg)"; }, 650);
}

/* ---- Hands-on Input Simulation --------------------------------------- */
function handleSimulatedInput(val) {
  currentInputVal = val;
  stagedInputs.push(val);

  // Determine type
  const isNumber = /^\d+$/.test(val);
  const typeStr = isNumber ? "int" : "str";

  // Update HUD
  const nodePrompt = root.querySelector("#it-node-prompt");
  const nodeInput = root.querySelector("#it-node-input");
  const nodeVar = root.querySelector("#it-node-var");
  const pipeInput = root.querySelector("#it-pipe-input");
  const pipeVar = root.querySelector("#it-pipe-var");
  const typeBadge = root.querySelector("#it-type-badge");
  const explain = root.querySelector("#it-pipe-explain-text");

  if (pipeInput) pipeInput.textContent = isNumber ? val : `"${val}"`;
  if (pipeVar) pipeVar.textContent = isNumber ? `power = ${val}` : `response = "${val}"`;

  if (typeBadge) {
    typeBadge.className = `it-pipe-type-badge ${isNumber ? "it-type-int" : "it-type-str"}`;
    typeBadge.textContent = typeStr;
  }

  if (nodeInput) nodeInput.classList.add("active");
  if (nodeVar) nodeVar.classList.add("active");
  setTimeout(() => {
    if (nodeInput) nodeInput.classList.remove("active");
    if (nodeVar) nodeVar.classList.remove("active");
  }, 1200);

  if (explain) {
    explain.textContent = isNumber
      ? `Received number ${val}! If converted with int(), Python treats this as a numerical integer.`
      : `Captured string "${val}"! Python input() saved this text into memory.`;
  }

  // React to known commands
  const lower = val.toLowerCase();
  if (lower === "boost") {
    animateBoost();
  } else if (lower === "patrol") {
    animatePatrol();
  } else if (lower === "celebrate") {
    animateCelebrate();
  } else if (isNumber) {
    const num = parseInt(val, 10);
    animateShield(num);
  } else {
    // Treat as pilot name or course
    if (lower === "mars" || lower === "europa" || lower === "moon" || lower === "titan") {
      currentDestination = val;
      const cElem = root.querySelector("#it-telem-course");
      if (cElem) cElem.textContent = val;
      updateHoloBubble(`Course plotted for ${val}! 🪐`);
      playPatrolSweepSound();
    } else {
      currentCadetName = val;
      animateLogin(val);
    }
  }
}

/* ---- Command Animations ---------------------------------------------- */
async function animateLogin(name) {
  playLoginChime();
  updateStatus(`Cadet Authenticated: ${name}`, "active");
  updateHoloBubble(`Welcome to Starbase, ${name}! 🔑`);
  setBotEyes("happy");
  waveRightArm();

  const telemName = root ? root.querySelector("#it-telem-name") : null;
  if (telemName) telemName.textContent = name || "Cadet";

  const core = root ? root.querySelector("#it-core-glow") : null;
  if (core) {
    core.setAttribute("fill", "#22c55e");
    setTimeout(() => core.setAttribute("fill", "#38bdf8"), 1200);
  }
  await sleep(600);
  setBotEyes("normal");
}

async function animatePatrol() {
  playPatrolSweepSound();
  updateStatus("Scanning Sector · Patrol Active", "active");
  updateHoloBubble("Thrusters engaged! Scanning sector coordinates... 🛸");

  const radar = root ? root.querySelector("#it-radar-sweep") : null;
  if (radar) {
    radar.classList.remove("sweeping");
    void radar.offsetWidth;
    radar.classList.add("sweeping");
  }

  const botWrap = root ? root.querySelector("#it-bot-wrap") : null;
  if (botWrap) {
    botWrap.style.transform = "translateX(40px)";
    await sleep(400);
    botWrap.style.transform = "translateX(-40px)";
    await sleep(400);
    botWrap.style.transform = "translateX(0)";
  }
  await sleep(400);
  updateStatus("Patrol Complete", "idle");
}

async function animateBoost() {
  playBoostSound();
  updateStatus("OVERDRIVE BOOST ENGAGED", "active");
  updateHoloBubble("⚡ WARP OVERDRIVE BOOST! ⚡");
  setBotEyes("boost");

  const botWrap = root ? root.querySelector("#it-bot-wrap") : null;
  if (botWrap) {
    botWrap.classList.add("boost-mode");
    botWrap.style.transform = "translateY(-16px) scale(1.08)";
  }

  // Spawn trail sparks
  spawnSparks(15, "#f59e0b");
  await sleep(800);

  if (botWrap) {
    botWrap.classList.remove("boost-mode");
    botWrap.style.transform = "translateY(0) scale(1)";
  }
  setBotEyes("normal");
  updateStatus("Boost Cooldown", "idle");
}

async function animateShield(power = 80) {
  playShieldSound();
  currentShield = power;
  updateStatus(`Shield Active: ${power}%`, "active");
  updateHoloBubble(`Plasma Shield Barrier Active at ${power}%! 🛡️`);

  const shieldElem = root ? root.querySelector("#it-shield-sphere") : null;
  const telemShield = root ? root.querySelector("#it-telem-shield") : null;
  if (telemShield) telemShield.textContent = `${power}%`;

  if (shieldElem) {
    shieldElem.classList.add("active");
    if (power >= 80) {
      shieldElem.style.borderColor = "rgba(56, 189, 248, 0.95)";
    } else {
      shieldElem.style.borderColor = "rgba(245, 158, 11, 0.85)";
    }
  }

  await sleep(1000);
  // Keep shield visible if power > 0
}

async function animateCelebrate() {
  playCelebrateFanfare();
  updateStatus("MISSION VICTORY · CELEBRATION", "active");
  updateHoloBubble("🎉 HURRAY! MISSION COMPLETE! 🎉");
  setBotEyes("happy");
  waveRightArm();

  spawnConfetti(25);

  const botWrap = root ? root.querySelector("#it-bot-wrap") : null;
  if (botWrap) {
    botWrap.style.transform = "translateY(-12px) rotate(-6deg)";
    await sleep(250);
    botWrap.style.transform = "translateY(-12px) rotate(6deg)";
    await sleep(250);
    botWrap.style.transform = "translateY(0) rotate(0deg)";
  }
  await sleep(600);
  setBotEyes("normal");
  updateStatus("Mission Ready", "idle");
}

function spawnConfetti(count = 20) {
  if (!root) return;
  const overlay = root.querySelector("#it-fx-overlay");
  if (!overlay) return;

  const colors = ["#38bdf8", "#f59e0b", "#ec4899", "#10b981", "#8b5cf6", "#e0f2fe"];

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "it-confetti-particle";
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = `${30 + Math.random() * 40}%`;
    p.style.top = "45%";
    p.style.setProperty("--dx", `${(Math.random() - 0.5) * 180}px`);
    p.style.setProperty("--dy", `${-40 - Math.random() * 90}px`);
    p.style.setProperty("--dr", `${(Math.random() - 0.5) * 720}deg`);
    overlay.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

function spawnSparks(count = 12, color = "#f59e0b") {
  if (!root) return;
  const overlay = root.querySelector("#it-fx-overlay");
  if (!overlay) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "it-confetti-particle";
    p.style.backgroundColor = color;
    p.style.borderRadius = "50%";
    p.style.width = "5px";
    p.style.height = "5px";
    p.style.left = "50%";
    p.style.top = "70%";
    p.style.setProperty("--dx", `${(Math.random() - 0.5) * 120}px`);
    p.style.setProperty("--dy", `${30 + Math.random() * 50}px`);
    p.style.setProperty("--dr", "0deg");
    overlay.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

/* ---- Exported API: render -------------------------------------------- */
export function render(env) {
  if (!root || !env) return;

  if (env.name !== undefined) {
    currentCadetName = String(env.name);
    const telemName = root.querySelector("#it-telem-name");
    if (telemName) telemName.textContent = currentCadetName;

    const pipeVar = root.querySelector("#it-pipe-var");
    if (pipeVar) pipeVar.textContent = `name = "${currentCadetName}"`;
  }

  if (env.destination !== undefined) {
    currentDestination = String(env.destination);
    const telemCourse = root.querySelector("#it-telem-course");
    if (telemCourse) telemCourse.textContent = currentDestination;

    const pipeVar = root.querySelector("#it-pipe-var");
    if (pipeVar) pipeVar.textContent = `destination = "${currentDestination}"`;
  }

  if (env.action !== undefined) {
    currentAction = String(env.action);
    const pipeVar = root.querySelector("#it-pipe-var");
    if (pipeVar) pipeVar.textContent = `action = "${currentAction}"`;
  }

  if (env.power !== undefined) {
    currentShield = Number(env.power) || 0;
    const telemShield = root.querySelector("#it-telem-shield");
    if (telemShield) telemShield.textContent = `${currentShield}%`;

    const pipeVar = root.querySelector("#it-pipe-var");
    if (pipeVar) pipeVar.textContent = `power = ${currentShield}`;

    const typeBadge = root.querySelector("#it-type-badge");
    if (typeBadge) {
      typeBadge.className = "it-pipe-type-badge it-type-int";
      typeBadge.textContent = "int";
    }
  }
}

/* ---- Exported API: reset --------------------------------------------- */
export function reset() {
  if (!root) return;
  const shield = root.querySelector("#it-shield-sphere");
  if (shield) shield.classList.remove("active");

  const radar = root.querySelector("#it-radar-sweep");
  if (radar) radar.classList.remove("sweeping");

  const botWrap = root.querySelector("#it-bot-wrap");
  if (botWrap) {
    botWrap.classList.remove("boost-mode");
    botWrap.style.transform = "";
  }
  setBotEyes("normal");
  updateStatus("Ready for Next Run", "idle");
}

/* ---- Exported API: play ---------------------------------------------- */
export async function play(cmd, args, ctx) {
  initAudio();
  const context = (args && args.setBubble) ? args : (ctx || {});
  const argList = Array.isArray(args) ? args : [];

  switch (cmd) {
    case "login": {
      const name = argList[0] || currentCadetName;
      if (context.setBubble) context.setBubble(`🔑 Authenticated: ${name}`);
      await animateLogin(name);
      break;
    }

    case "patrol": {
      if (context.setBubble) context.setBubble("🛸 Patrolling coordinates...");
      await animatePatrol();
      break;
    }

    case "boost": {
      if (context.setBubble) context.setBubble("⚡ Warp Overdrive Activated!");
      await animateBoost();
      break;
    }

    case "shield": {
      const lvl = argList[0] !== undefined ? argList[0] : 80;
      if (context.setBubble) context.setBubble(`🛡️ Plasma Shield Active (${lvl}%)`);
      await animateShield(lvl);
      break;
    }

    case "celebrate": {
      if (context.setBubble) context.setBubble("🎉 Mission Complete! Hurray!");
      await animateCelebrate();
      break;
    }

    case "say": {
      const msg = argList[0] || "Hello Commander!";
      playBotChirp();
      if (context.setBubble) context.setBubble(`💬 A.E.X.: "${msg}"`);
      updateHoloBubble(msg);
      setBotEyes("happy");
      await sleep(600);
      setBotEyes("normal");
      break;
    }

    case "input": {
      const promptText = argList[0] || "input()";
      playKeyClick();
      updateStatus(`Prompting: ${promptText}`, "prompting");
      updateHoloBubble(`⌨️ ${promptText}`);

      const pipePrompt = root ? root.querySelector("#it-pipe-prompt") : null;
      if (pipePrompt) pipePrompt.innerHTML = `"${promptText}"<span class="it-cursor"></span>`;

      if (context.setBubble) context.setBubble(`⌨️ input: "${promptText}"`);
      await sleep(500);
      break;
    }

    case "print": {
      const printed = argList.join(" ");
      playKeyClick();
      if (context.setBubble) context.setBubble(`🖨️ ${printed}`);
      updateHoloBubble(printed);
      await sleep(400);
      break;
    }

    default:
      if (context.setBubble) context.setBubble(`▶ ${cmd}()`);
      await sleep(350);
      break;
  }
}

/* ---- Exported API: getInputs ----------------------------------------- */
export function getInputs() {
  if (stagedInputs.length > 0) {
    const list = stagedInputs.slice();
    stagedInputs = [];
    return list;
  }
  return [];
}
