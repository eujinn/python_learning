/* =========================================================================
   Lesson 17 — While Loop Challenge: Cyber Rover Harvester Scene Visualizer
   Lumina-9 Terrain · Interactive Condition Radar · Smooth Graphics & Audio
   ========================================================================= */

let root = null;
let currentCrystals = 0;
let currentFuel = 4;
let targetQuota = 3;
let currentCycle = 0;
let soundEnabled = true;
let audioCtx = null;
let lastEnv = {};

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
    // Non-blocking fallback
  }
}

function playCollectSound() {
  if (!soundEnabled) return;
  playTone(523.25, "triangle", 0.12, 0.18); // C5
  setTimeout(() => playTone(659.25, "triangle", 0.12, 0.18), 70); // E5
  setTimeout(() => playTone(783.99, "sine", 0.22, 0.2), 140); // G5
}

function playDrillSound() {
  if (!soundEnabled) return;
  playTone(220, "sawtooth", 0.25, 0.12);
  setTimeout(() => playTone(330, "sawtooth", 0.2, 0.14), 60);
  setTimeout(() => playTone(440, "triangle", 0.2, 0.12), 120);
}

function playScanSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(260, audioCtx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (e) {}
}

function playBeaconSound() {
  if (!soundEnabled) return;
  playTone(261.63, "triangle", 0.4, 0.2); // C4
  setTimeout(() => playTone(392.00, "triangle", 0.4, 0.2), 100); // G4
  setTimeout(() => playTone(523.25, "sine", 0.5, 0.22), 200); // C5
  setTimeout(() => playTone(659.25, "sine", 0.6, 0.25), 300); // E5
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---- Main Lifecycle: init -------------------------------------------- */
export function init(container) {
  root = container;
  currentCrystals = 0;
  currentFuel = 4;
  targetQuota = 3;
  currentCycle = 0;
  lastEnv = {};

  root.innerHTML = `
    <div class="wc-stage">
      <div id="bubble" class="bubble"></div>

      <!-- Header & Status Bar -->
      <div class="wc-header">
        <div class="wc-title-wrap">
          <div class="wc-icon-badge">🤖</div>
          <div>
            <div class="wc-title">Cyber Rover Harvester</div>
            <div class="wc-subtitle">Lumina-9 Planetary Expedition · Model CR-17</div>
          </div>
        </div>
        <div class="wc-header-controls">
          <button class="wc-audio-btn" id="wc-sound-toggle" title="Toggle Sound Effects">
            <span id="wc-sound-icon">🔊</span> <span id="wc-sound-text">Sound ON</span>
          </button>
          <div class="wc-status-pill" id="wc-status-pill">
            <span class="wc-status-dot"></span>
            <span id="wc-status-text">Standby · Ready to Loop</span>
          </div>
        </div>
      </div>

      <!-- Condition Radar HUD ("Understand") -->
      <div class="wc-radar" id="wc-radar">
        <div class="wc-radar-header">
          <span>📡 Live Condition Radar</span>
          <span id="wc-cycle-counter">Cycle: #0</span>
        </div>
        <div class="wc-radar-grid">
          <div class="wc-radar-var">
            <span class="wc-radar-label">Variable</span>
            <span class="wc-radar-val" id="wc-var-display">crystals = 0</span>
          </div>
          <div class="wc-radar-expr">
            <span>while</span>
            <span class="wc-expr-var" id="wc-expr-left">crystals</span>
            <span class="wc-expr-op" id="wc-expr-op">&lt;</span>
            <span class="wc-expr-target" id="wc-expr-right">3</span>
            <span>:</span>
          </div>
          <div class="wc-radar-result wc-res-idle" id="wc-radar-badge">
            <span id="wc-badge-icon">⏳</span>
            <span id="wc-badge-text">READY</span>
          </div>
        </div>
        <div class="wc-radar-explain" id="wc-radar-explain">
          <span class="wc-explain-icon">💡</span>
          <span id="wc-explain-text">The while loop tests its condition before every round. Press ▶ Run to see it loop!</span>
        </div>
      </div>

      <!-- Main Visual Viewport -->
      <div class="wc-viewport">
        <!-- Cosmic Stars -->
        <div class="wc-stars"></div>

        <!-- Alien Moon with Orbit Ring -->
        <div class="wc-moon">
          <div class="wc-moon-ring"></div>
        </div>

        <!-- Mountain Peaks SVG -->
        <svg class="wc-mountains" viewBox="0 0 500 90" preserveAspectRatio="none">
          <polygon points="0,90 40,45 80,70 140,25 210,80 270,35 340,75 420,20 480,65 500,90" fill="#1e1b4b" opacity="0.65"/>
          <polygon points="0,90 60,60 120,80 180,45 250,85 320,50 390,80 460,40 500,90" fill="#0f172a" opacity="0.9"/>
        </svg>

        <!-- Ground Terrain with Neon Gridlines -->
        <div class="wc-ground">
          <div class="wc-gridlines"></div>
        </div>

        <!-- Animated Special Effects -->
        <div class="wc-beam-overlay" id="wc-beacon-beam"></div>
        <div class="wc-radar-wave" id="wc-radar-wave"></div>
        <div class="wc-sparks" id="wc-sparks"></div>

        <!-- The Cyber Rover SVG -->
        <div class="wc-rover-container hovering" id="wc-rover">
          <svg class="wc-rover-svg" viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="rover-body" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#334155"/>
                <stop offset="50%" stop-color="#1e293b"/>
                <stop offset="100%" stop-color="#0f172a"/>
              </linearGradient>
              <linearGradient id="rover-armor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#0284c7"/>
              </linearGradient>
              <linearGradient id="visor-glass" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0f172a"/>
                <stop offset="100%" stop-color="#020617"/>
              </linearGradient>
              <linearGradient id="drill-laser" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#f59e0b"/>
                <stop offset="100%" stop-color="#ef4444"/>
              </linearGradient>
            </defs>

            <!-- Continuous Treads -->
            <!-- Back Wheels & Track -->
            <rect x="18" y="112" width="134" height="26" rx="13" fill="#090d16" stroke="#0284c7" stroke-width="2.5"/>
            <!-- Sprocket Wheels -->
            <circle cx="32" cy="125" r="9" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="62" cy="125" r="9" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="92" cy="125" r="9" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="122" cy="125" r="9" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="138" cy="125" r="7" fill="#0284c7"/>

            <!-- Main Chassis Body -->
            <path d="M25 112 L35 72 L125 72 L140 112 Z" fill="url(#rover-body)" stroke="#0284c7" stroke-width="2.5"/>

            <!-- Neon Energy Conduits -->
            <line x1="42" y1="92" x2="128" y2="92" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
            <circle cx="42" cy="92" r="3" fill="#ffffff"/>
            <circle cx="128" cy="92" r="3" fill="#ffffff"/>

            <!-- Cargo Chamber Hatch (Middle) -->
            <rect x="52" y="74" width="34" height="20" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
            <circle cx="69" cy="84" r="5" fill="#38bdf8" opacity="0.8" id="wc-chassis-core"/>

            <!-- Cockpit Cab & Visor Head -->
            <rect x="86" y="50" width="46" height="30" rx="8" fill="url(#rover-armor)" stroke="#0284c7" stroke-width="2"/>
            <!-- Visor Screen -->
            <rect x="92" y="55" width="34" height="18" rx="6" fill="url(#visor-glass)" stroke="#38bdf8" stroke-width="1.5"/>
            <!-- Expressive Glowing LED Eyes -->
            <ellipse cx="102" cy="64" rx="4" ry="4.5" fill="#38bdf8" id="wc-eye-left"/>
            <ellipse cx="116" cy="64" rx="4" ry="4.5" fill="#38bdf8" id="wc-eye-right"/>
            <circle cx="103" cy="62.5" r="1.5" fill="#ffffff"/>
            <circle cx="117" cy="62.5" r="1.5" fill="#ffffff"/>

            <!-- Orbital Beacon Tower (Top Roof) -->
            <rect x="42" y="56" width="10" height="18" rx="2" fill="#475569" stroke="#334155" stroke-width="1.5"/>
            <polygon points="47,44 42,56 52,56" fill="#38bdf8" id="wc-beacon-tip" stroke="#0284c7" stroke-width="1.5"/>

            <!-- Rotating Radar Dish (Top Cab) -->
            <g id="wc-radar-dish-group">
              <line x1="108" y1="50" x2="108" y2="38" stroke="#0284c7" stroke-width="2.5"/>
              <ellipse cx="108" cy="36" rx="14" ry="6" fill="#38bdf8" stroke="#0284c7" stroke-width="2" id="wc-dish-ellipse"/>
              <circle cx="108" cy="36" r="3" fill="#ffffff"/>
            </g>

            <!-- Sonic Laser Drill Module (Front Bumper) -->
            <g id="wc-drill-group">
              <rect x="136" y="94" width="16" height="12" rx="3" fill="#475569" stroke="#334155" stroke-width="1.5"/>
              <polygon points="152,95 168,100 152,105" fill="url(#drill-laser)" id="wc-drill-tip"/>
            </g>

            <!-- Articulated Mechanical Harvester Arm -->
            <g id="wc-arm-group" style="transform-origin: 35px 85px; transition: transform 0.35s ease;">
              <!-- Arm Base / Shoulder Pivot -->
              <circle cx="35" cy="85" r="6" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
              <!-- Upper Arm -->
              <line x1="35" y1="85" x2="20" y2="70" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
              <!-- Elbow Pivot -->
              <circle cx="20" cy="70" r="4" fill="#38bdf8"/>
              <!-- Forearm -->
              <line x1="20" y1="70" x2="8" y2="85" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/>
              <!-- Grabber Claw -->
              <path d="M8 85 L2 92 M8 85 L14 92" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" id="wc-claw"/>
            </g>
          </svg>
        </div>

        <!-- Ground Crystal Deposits (Clickable by student!) -->
        <div class="wc-crystal-deposit" style="left: 230px;" id="cryst-node-1" title="Click to inspect crystal">
          <svg width="24" height="28" viewBox="0 0 24 28">
            <polygon points="12,2 22,9 18,24 6,24 2,9" fill="#06b6d4" stroke="#38bdf8" stroke-width="1.5"/>
            <polygon points="12,2 18,24 12,20 6,24" fill="#38bdf8" opacity="0.6"/>
          </svg>
        </div>
        <div class="wc-crystal-deposit" style="left: 275px;" id="cryst-node-2" title="Click to inspect crystal">
          <svg width="22" height="26" viewBox="0 0 24 28">
            <polygon points="12,2 22,9 18,24 6,24 2,9" fill="#38bdf8" stroke="#bae6fd" stroke-width="1.5"/>
            <polygon points="12,2 18,24 12,20 6,24" fill="#ffffff" opacity="0.5"/>
          </svg>
        </div>
        <div class="wc-crystal-deposit" style="left: 320px;" id="cryst-node-3" title="Click to inspect crystal">
          <svg width="26" height="30" viewBox="0 0 24 28">
            <polygon points="12,2 22,9 18,24 6,24 2,9" fill="#818cf8" stroke="#c084fc" stroke-width="1.5"/>
            <polygon points="12,2 18,24 12,20 6,24" fill="#c084fc" opacity="0.6"/>
          </svg>
        </div>
        <div class="wc-crystal-deposit" style="left: 370px;" id="cryst-node-4" title="Click to inspect crystal">
          <svg width="24" height="28" viewBox="0 0 24 28">
            <polygon points="12,2 22,9 18,24 6,24 2,9" fill="#06b6d4" stroke="#38bdf8" stroke-width="1.5"/>
            <polygon points="12,2 18,24 12,20 6,24" fill="#38bdf8" opacity="0.6"/>
          </svg>
        </div>
        <div class="wc-crystal-deposit" style="left: 415px;" id="cryst-node-5" title="Click to inspect crystal">
          <svg width="24" height="28" viewBox="0 0 24 28">
            <polygon points="12,2 22,9 18,24 6,24 2,9" fill="#38bdf8" stroke="#bae6fd" stroke-width="1.5"/>
            <polygon points="12,2 18,24 12,20 6,24" fill="#ffffff" opacity="0.5"/>
          </svg>
        </div>
      </div>

      <!-- Cargo Bay Display -->
      <div class="wc-cargo-section">
        <div class="wc-cargo-meta">
          <span class="wc-cargo-title">
            <span>💎 Cargo Bay Crystals</span>
          </span>
          <span class="wc-cargo-counter" id="wc-cargo-counter">0 / 3 Units</span>
        </div>
        <div class="wc-cargo-slots" id="wc-cargo-slots">
          <div class="wc-cargo-slot" id="wc-slot-0"></div>
          <div class="wc-cargo-slot" id="wc-slot-1"></div>
          <div class="wc-cargo-slot" id="wc-slot-2"></div>
          <div class="wc-cargo-slot" id="wc-slot-3"></div>
          <div class="wc-cargo-slot" id="wc-slot-4"></div>
        </div>
        <div class="wc-progress-track">
          <div class="wc-progress-fill" id="wc-cargo-fill"></div>
        </div>
      </div>

      <!-- Interactive Student Stage Controls -->
      <div class="wc-toolbar">
        <button class="wc-tool-btn btn-primary" id="wc-btn-harvest" title="Test Rover Arm: collect()">
          <span>💎</span> <span>Harvest</span>
        </button>
        <button class="wc-tool-btn" id="wc-btn-drill" title="Test Laser Drill: drill()">
          <span>⚡</span> <span>Sonic Drill</span>
        </button>
        <button class="wc-tool-btn" id="wc-btn-scan" title="Test Radar: scan()">
          <span>🔍</span> <span>Radar Scan</span>
        </button>
        <button class="wc-tool-btn" id="wc-btn-beacon" title="Test Beacon: beacon()">
          <span>📡</span> <span>Orbital Beacon</span>
        </button>
        <button class="wc-tool-btn" id="wc-btn-spawn" title="Spawn a new crystal on terrain">
          <span>➕</span> <span>Drop Crystal</span>
        </button>
      </div>

      <!-- Interactive Condition Simulator ("What-If" Hands-on Tester) -->
      <div class="wc-sim-drawer">
        <div class="wc-sim-header">
          <span>🧪 Condition Simulator — Test What Happens When Value Changes</span>
          <span class="wc-sim-badge" id="wc-sim-eval" style="background:#22c55e26; border:1px solid #22c55e; color:#4ade80;">True</span>
        </div>
        <div class="wc-sim-controls">
          <div class="wc-sim-slider-wrap">
            <span style="font-family:'JetBrains Mono'; font-weight:700; color:#38bdf8;">crystals:</span>
            <input type="range" min="0" max="6" value="0" class="wc-sim-slider" id="wc-sim-slider">
            <span style="font-family:'JetBrains Mono'; font-weight:700; width:16px;" id="wc-sim-num">0</span>
          </div>
          <div style="font-family:'JetBrains Mono'; font-size:0.82rem; color:#cbd5e1;">
            <span>while crystals &lt; </span>
            <select id="wc-sim-target" style="background:#1e293b; color:#fff; border:1px solid #38bdf8; border-radius:4px; padding:2px 4px; font-family:'JetBrains Mono';">
              <option value="3" selected>3</option>
              <option value="5">5</option>
            </select>
            <span>:</span>
          </div>
        </div>
      </div>
    </div>
  `;

  wireInteractiveControls();
  renderCargo(0, 3);
  updateRadarDisplay(0, "<", 3, "ready");
}

/* ---- Wire Interactive Buttons & Click Events ------------------------- */
function wireInteractiveControls() {
  const soundBtn = root.querySelector("#wc-sound-toggle");
  if (soundBtn) {
    soundBtn.onclick = () => {
      soundEnabled = !soundEnabled;
      initAudio();
      root.querySelector("#wc-sound-icon").textContent = soundEnabled ? "🔊" : "🔇";
      root.querySelector("#wc-sound-text").textContent = soundEnabled ? "Sound ON" : "Muted";
    };
  }

  // Stage button: Harvest
  const harvestBtn = root.querySelector("#wc-btn-harvest");
  if (harvestBtn) {
    harvestBtn.onclick = async () => {
      initAudio();
      harvestBtn.disabled = true;
      await animateArmScoop();
      currentCrystals = Math.min(5, currentCrystals + 1);
      renderCargo(currentCrystals, targetQuota);
      playCollectSound();
      updateStatus("Manual harvest: scooped 1 crystal!", "active");
      harvestBtn.disabled = false;
    };
  }

  // Stage button: Sonic Drill
  const drillBtn = root.querySelector("#wc-btn-drill");
  if (drillBtn) {
    drillBtn.onclick = async () => {
      initAudio();
      drillBtn.disabled = true;
      await animateDrill();
      playDrillSound();
      updateStatus("Sonic drill fired: geode shattered!", "active");
      drillBtn.disabled = false;
    };
  }

  // Stage button: Radar Scan
  const scanBtn = root.querySelector("#wc-btn-scan");
  if (scanBtn) {
    scanBtn.onclick = async () => {
      initAudio();
      scanBtn.disabled = true;
      await animateScan();
      playScanSound();
      updateStatus("Radar scan pulse sent across Lumina-9", "active");
      scanBtn.disabled = false;
    };
  }

  // Stage button: Orbital Beacon
  const beaconBtn = root.querySelector("#wc-btn-beacon");
  if (beaconBtn) {
    beaconBtn.onclick = async () => {
      initAudio();
      beaconBtn.disabled = true;
      await animateBeacon();
      playBeaconSound();
      updateStatus("Orbital beacon signal deployed!", "active");
      beaconBtn.disabled = false;
    };
  }

  // Stage button: Spawn Crystal
  const spawnBtn = root.querySelector("#wc-btn-spawn");
  if (spawnBtn) {
    spawnBtn.onclick = () => {
      initAudio();
      playTone(440, "sine", 0.1);
      spawnCrystalNode();
    };
  }

  // Click on terrain crystals
  root.querySelectorAll(".wc-crystal-deposit").forEach(el => {
    el.onclick = () => {
      initAudio();
      playTone(600, "triangle", 0.15);
      el.style.transform = "scale(1.3) translateY(-6px)";
      setTimeout(() => { el.style.transform = ""; }, 250);
      updateStatus("Crystal node scanned: high purity energy!", "active");
    };
  });

  // What-If Simulator Slider & Select
  const slider = root.querySelector("#wc-sim-slider");
  const targetSelect = root.querySelector("#wc-sim-target");
  const simNum = root.querySelector("#wc-sim-num");
  const simBadge = root.querySelector("#wc-sim-eval");

  function updateSimulator() {
    const val = parseInt(slider.value, 10);
    const target = parseInt(targetSelect.value, 10);
    simNum.textContent = val;
    const isTrue = val < target;

    if (isTrue) {
      simBadge.textContent = `True (${val} < ${target} -> Loop Runs!)`;
      simBadge.style.background = "rgba(34, 197, 94, 0.2)";
      simBadge.style.borderColor = "#22c55e";
      simBadge.style.color = "#4ade80";
    } else {
      simBadge.textContent = `False (${val} < ${target} -> Loop Stops!)`;
      simBadge.style.background = "rgba(239, 68, 68, 0.2)";
      simBadge.style.borderColor = "#ef4444";
      simBadge.style.color = "#f87171";
    }
  }

  if (slider && targetSelect) {
    slider.oninput = updateSimulator;
    targetSelect.onchange = updateSimulator;
    updateSimulator();
  }
}

function spawnCrystalNode() {
  const viewport = root.querySelector(".wc-viewport");
  if (!viewport) return;
  const leftPos = Math.floor(Math.random() * 220) + 210;
  const node = document.createElement("div");
  node.className = "wc-crystal-deposit";
  node.style.left = leftPos + "px";
  node.innerHTML = `
    <svg width="24" height="28" viewBox="0 0 24 28">
      <polygon points="12,2 22,9 18,24 6,24 2,9" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5"/>
      <polygon points="12,2 18,24 12,20 6,24" fill="#ffffff" opacity="0.6"/>
    </svg>
  `;
  node.onclick = () => {
    playTone(600, "triangle", 0.15);
    node.style.transform = "scale(1.3) translateY(-6px)";
    setTimeout(() => { node.style.transform = ""; }, 250);
  };
  viewport.appendChild(node);
  updateStatus(`New energy crystal detected at coordinate X:${leftPos}!`, "active");
}

/* ---- Update Status Pill ---------------------------------------------- */
function updateStatus(text, mode = "normal") {
  const statusText = root.querySelector("#wc-status-text");
  const dot = root.querySelector(".wc-status-dot");
  if (statusText) statusText.textContent = text;
  if (dot) {
    if (mode === "active") dot.style.background = "#22c55e";
    else if (mode === "done") dot.style.background = "#a855f7";
    else dot.style.background = "#38bdf8";
  }
}

/* ---- Render Cargo Bay Slots ------------------------------------------ */
function renderCargo(count, max = 5) {
  const container = root.querySelector("#wc-cargo-slots");
  const counter = root.querySelector("#wc-cargo-counter");
  const fill = root.querySelector("#wc-cargo-fill");
  if (!container) return;

  const displayMax = Math.max(max, count, 3);
  if (counter) counter.textContent = `${count} / ${displayMax} Units`;
  if (fill) {
    const pct = Math.min(100, Math.round((count / displayMax) * 100));
    fill.style.width = pct + "%";
  }

  for (let i = 0; i < 5; i++) {
    const slot = root.querySelector("#wc-slot-" + i);
    if (!slot) continue;
    if (i < count) {
      if (!slot.classList.contains("filled")) {
        slot.classList.add("filled");
        slot.innerHTML = `
          <svg class="wc-gem-svg" viewBox="0 0 24 28">
            <polygon points="12,2 22,9 18,24 6,24 2,9" fill="#06b6d4" stroke="#38bdf8" stroke-width="1.5"/>
            <polygon points="12,2 18,24 12,20 6,24" fill="#bae6fd" opacity="0.75"/>
            <circle cx="12" cy="11" r="2.5" fill="#ffffff"/>
          </svg>
        `;
      }
    } else {
      slot.classList.remove("filled");
      slot.innerHTML = "";
    }
  }
}

/* ---- Update Live Condition Radar ------------------------------------- */
function updateRadarDisplay(val, op, target, status) {
  const varDisplay = root.querySelector("#wc-var-display");
  const leftDisplay = root.querySelector("#wc-expr-left");
  const opDisplay = root.querySelector("#wc-expr-op");
  const rightDisplay = root.querySelector("#wc-expr-right");
  const badge = root.querySelector("#wc-radar-badge");
  const badgeIcon = root.querySelector("#wc-badge-icon");
  const badgeText = root.querySelector("#wc-badge-text");
  const explain = root.querySelector("#wc-explain-text");

  if (!varDisplay) return;

  if (val !== undefined && val !== null) {
    varDisplay.textContent = `value = ${val}`;
    leftDisplay.textContent = `${val}`;
  }
  if (op) opDisplay.textContent = op;
  if (target !== undefined) rightDisplay.textContent = target;

  if (status === "true") {
    badge.className = "wc-radar-result wc-res-true";
    badgeIcon.textContent = "✔";
    badgeText.textContent = "TRUE · LOOPS";
    explain.textContent = `Condition evaluated to True (${val} ${op} ${target}). Python executes the indented loop body!`;
  } else if (status === "false") {
    badge.className = "wc-radar-result wc-res-false";
    badgeIcon.textContent = "✖";
    badgeText.textContent = "FALSE · ENDS";
    explain.textContent = `Condition evaluated to False (${val} ${op} ${target}). The while loop finishes and moves to the next code!`;
  } else {
    badge.className = "wc-radar-result wc-res-idle";
    badgeIcon.textContent = "⏳";
    badgeText.textContent = "READY";
    explain.textContent = "The while loop tests its condition before every round. Press ▶ Run to see it loop!";
  }
}

/* ---- Smooth SVG Animation Helpers ------------------------------------ */
async function animateArmScoop() {
  const arm = root.querySelector("#wc-arm-group");
  if (!arm) return;
  // Reach down toward terrain
  arm.style.transform = "rotate(24deg) translate(8px, 6px)";
  await sleep(180);
  // Clamp & lift up toward cargo
  arm.style.transform = "rotate(-18deg) translate(-4px, -8px)";
  await sleep(180);
  // Return to idle resting pose
  arm.style.transform = "rotate(0deg) translate(0px, 0px)";
}

async function animateDrill() {
  const drillTip = root.querySelector("#wc-drill-tip");
  const sparks = root.querySelector("#wc-sparks");
  if (drillTip) {
    drillTip.style.fill = "#fef08a";
    drillTip.style.transform = "scaleX(1.3)";
  }
  if (sparks) {
    sparks.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="3" fill="#fef08a"/>
        <line x1="20" y1="20" x2="35" y2="10" stroke="#f59e0b" stroke-width="2"/>
        <line x1="20" y1="20" x2="32" y2="30" stroke="#ef4444" stroke-width="2"/>
        <line x1="20" y1="20" x2="10" y2="28" stroke="#38bdf8" stroke-width="2"/>
      </svg>
    `;
    setTimeout(() => { if (sparks) sparks.innerHTML = ""; }, 260);
  }
  await sleep(250);
  if (drillTip) {
    drillTip.style.fill = "url(#drill-laser)";
    drillTip.style.transform = "scaleX(1)";
  }
}

async function animateScan() {
  const dish = root.querySelector("#wc-radar-dish-group");
  const wave = root.querySelector("#wc-radar-wave");
  if (dish) {
    dish.style.transform = "rotate(-20deg)";
    setTimeout(() => { dish.style.transform = "rotate(20deg)"; }, 150);
    setTimeout(() => { dish.style.transform = ""; }, 300);
  }
  if (wave) {
    wave.classList.remove("scanning");
    void wave.offsetWidth; // Trigger reflow
    wave.classList.add("scanning");
    setTimeout(() => { wave.classList.remove("scanning"); }, 1000);
  }
  await sleep(350);
}

async function animateBeacon() {
  const beam = root.querySelector("#wc-beacon-beam");
  const tip = root.querySelector("#wc-beacon-tip");
  if (tip) tip.style.fill = "#ffffff";
  if (beam) {
    beam.classList.add("active");
    await sleep(650);
    beam.classList.remove("active");
  }
  if (tip) tip.style.fill = "#38bdf8";
}

/* ---- Exported API: render -------------------------------------------- */
export function render(env) {
  if (!root) return;
  lastEnv = env || {};

  // Track crystals variable
  if (env && typeof env.crystals === "number") {
    currentCrystals = env.crystals;
    const quota = env.crystals >= 5 ? 5 : (targetQuota || 3);
    renderCargo(currentCrystals, quota);

    const isLooping = env.crystals < quota;
    updateRadarDisplay(env.crystals, "<", quota, isLooping ? "true" : "false");
    updateStatus(`While loop executing: crystals = ${env.crystals}`, "active");
  }

  // Track fuel variable (Lesson 4 countdown)
  if (env && typeof env.fuel === "number") {
    currentFuel = env.fuel;
    const isLooping = env.fuel > 0;
    updateRadarDisplay(env.fuel, ">", 0, isLooping ? "true" : "false");
    updateStatus(`Fuel countdown loop: fuel = ${env.fuel}`, "active");
  }

  // Track gems variable (Lesson 5 sandbox)
  if (env && typeof env.gems === "number") {
    currentCrystals = env.gems;
    renderCargo(currentCrystals, 4);
    const isLooping = env.gems < 4;
    updateRadarDisplay(env.gems, "<", 4, isLooping ? "true" : "false");
    updateStatus(`Sandbox loop: gems = ${env.gems}`, "active");
  }
}

/* ---- Exported API: reset --------------------------------------------- */
export function reset() {
  currentCycle = 0;
  if (!root) return;
  const beam = root.querySelector("#wc-beacon-beam");
  if (beam) beam.classList.remove("active");
  const sparks = root.querySelector("#wc-sparks");
  if (sparks) sparks.innerHTML = "";
  renderCargo(0, 3);
  updateRadarDisplay(0, "<", 3, "ready");
  updateStatus("Standby · Ready to Loop", "normal");
}

/* ---- Exported API: play ---------------------------------------------- */
export async function play(cmd, ctx = {}) {
  initAudio();
  currentCycle++;
  const cycleElem = root ? root.querySelector("#wc-cycle-counter") : null;
  if (cycleElem) cycleElem.textContent = `Cycle: #${currentCycle}`;

  switch (cmd) {
    case "collect":
      if (ctx && ctx.setBubble) ctx.setBubble("Scooping energy crystal into cargo bay!");
      updateStatus(`Command: collect() — retrieved crystal!`, "active");
      await animateArmScoop();
      playCollectSound();
      break;

    case "drill":
      if (ctx && ctx.setBubble) ctx.setBubble("Sonic laser drill breaking geode!");
      updateStatus(`Command: drill() — sonic laser fired!`, "active");
      await animateDrill();
      playDrillSound();
      break;

    case "scan":
      if (ctx && ctx.setBubble) ctx.setBubble("Radar pulse sweeping planetary terrain...");
      updateStatus(`Command: scan() — telemetry ping sent!`, "active");
      await animateScan();
      playScanSound();
      break;

    case "beacon":
      if (ctx && ctx.setBubble) ctx.setBubble("Orbital recovery beacon deployed!");
      updateStatus(`Command: beacon() — orbital beam active!`, "done");
      await animateBeacon();
      playBeaconSound();
      break;

    case "print":
      if (ctx && ctx.setBubble && ctx.out !== undefined) {
        ctx.setBubble(`Telemetry: ${String(ctx.out)}`);
      }
      playTone(400, "sine", 0.08, 0.1);
      await sleep(150);
      break;

    default:
      await sleep(150);
      break;
  }
}
