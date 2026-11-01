/* =========================================================================
   Lesson 19 — Python AI Challenge: Cyber Core NOVA-19 Visualizer
   Autonomous AI Companion · Interactive Neural Pipeline · Smooth SVG & Audio
   ========================================================================= */

let root = null;
let soundEnabled = true;
let audioCtx = null;

// Telemetry and visualizer state
let currentCommander = "Commander";
let currentQuery = "Standby";
let currentAction = "idle";
let currentConfidence = 0;
let currentMode = "Standby";
let stagedInputs = [];
let aiSpeechQueue = null;

const aiResponses = [
  "Neural network synchronizing...",
  "Perception matrix analyzing input...",
  "Cognitive algorithms running at 100% efficiency!",
  "Awaiting commander directive.",
  "Synaptic pathway calibrated!"
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

function playClickSound() {
  if (!soundEnabled) return;
  playTone(900, "triangle", 0.04, 0.08);
}

function playBootSound() {
  if (!soundEnabled) return;
  playTone(261.63, "sine", 0.12, 0.18); // C4
  setTimeout(() => playTone(329.63, "sine", 0.12, 0.18), 80); // E4
  setTimeout(() => playTone(392.00, "sine", 0.16, 0.20), 160); // G4
  setTimeout(() => playTone(523.25, "triangle", 0.35, 0.22), 240); // C5
}

function playThinkSound() {
  if (!soundEnabled) return;
  playTone(600, "sine", 0.08, 0.12);
  setTimeout(() => playTone(750, "sine", 0.08, 0.12), 90);
  setTimeout(() => playTone(900, "sine", 0.12, 0.15), 180);
}

function playScanSweepSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(350, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (e) {}
}

function playBoostSound() {
  if (!soundEnabled) return;
  playTone(150, "sawtooth", 0.4, 0.15);
  setTimeout(() => playTone(260, "sawtooth", 0.4, 0.18), 70);
  setTimeout(() => playTone(520, "triangle", 0.45, 0.2), 140);
}

function playShieldSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(196, audioCtx.currentTime); // G3
    osc.frequency.exponentialRampToValueAtTime(587.33, audioCtx.currentTime + 0.4); // D5
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } catch (e) {}
}

function playCelebrateSound() {
  if (!soundEnabled) return;
  playTone(523.25, "triangle", 0.1, 0.2); // C5
  setTimeout(() => playTone(659.25, "triangle", 0.1, 0.2), 80); // E5
  setTimeout(() => playTone(783.99, "triangle", 0.1, 0.2), 160); // G5
  setTimeout(() => playTone(1046.50, "sine", 0.35, 0.25), 240); // C6
}

function playChirpSound() {
  if (!soundEnabled) return;
  playTone(650, "sine", 0.06, 0.14);
  setTimeout(() => playTone(1100, "triangle", 0.1, 0.16), 55);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---- Main Lifecycle: init -------------------------------------------- */
export function init(container) {
  root = container;
  currentCommander = "Commander";
  currentQuery = "Standby";
  currentAction = "idle";
  currentConfidence = 0;
  currentMode = "Standby";
  stagedInputs = [];

  root.innerHTML = `
    <div class="ai-stage">
      <!-- Shared Trace Bubble -->
      <div id="bubble" class="bubble"></div>

      <!-- Top Header & Controls -->
      <div class="ai-header">
        <div class="ai-title-wrap">
          <div class="ai-icon-badge" id="ai-avatar-icon">🧠</div>
          <div>
            <div class="ai-title">NOVA-19 Cyber Core</div>
            <div class="ai-subtitle">Autonomous AI Companion · Model N-19</div>
          </div>
        </div>
        <div class="ai-header-actions">
          <span class="ai-badge" id="ai-status-badge">● STANDBY</span>
          <button type="button" class="ai-sound-btn" id="ai-sound-toggle" title="Toggle audio feedback">
            🔊 Sound ON
          </button>
        </div>
      </div>

      <!-- Live AI Neural Pipeline (Perception -> Processing -> Decision -> Action) -->
      <div class="ai-pipeline-card">
        <div class="ai-pipeline-title">
          <span>AI NEURAL PROCESSING PIPELINE</span>
          <span id="ai-pipeline-status" class="ai-pipeline-tag">Active State: Idle</span>
        </div>
        <div class="ai-pipeline-track">
          <div class="ai-pipe-node active" id="pipe-perceive">
            <div class="ai-pipe-icon">📡</div>
            <div class="ai-pipe-name">1. Perception</div>
            <div class="ai-pipe-sub" id="pipe-perceive-sub">input() capture</div>
          </div>
          <div class="ai-pipe-arrow">➜</div>
          <div class="ai-pipe-node" id="pipe-think">
            <div class="ai-pipe-icon">🧠</div>
            <div class="ai-pipe-name">2. Neural Think</div>
            <div class="ai-pipe-sub" id="pipe-think-sub">Synaptic compute</div>
          </div>
          <div class="ai-pipe-arrow">➜</div>
          <div class="ai-pipe-node" id="pipe-decide">
            <div class="ai-pipe-icon">⚖️</div>
            <div class="ai-pipe-name">3. Decision</div>
            <div class="ai-pipe-sub" id="pipe-decide-sub">if / threshold</div>
          </div>
          <div class="ai-pipe-arrow">➜</div>
          <div class="ai-pipe-node" id="pipe-act">
            <div class="ai-pipe-icon">⚡</div>
            <div class="ai-pipe-name">4. Action</div>
            <div class="ai-pipe-sub" id="pipe-act-sub">Autonomous run</div>
          </div>
        </div>
      </div>

      <!-- Central Visual Deck: Expressive Interactive AI Avatar -->
      <div class="ai-avatar-deck" id="ai-avatar-deck" title="Click NOVA-19 to interact!">
        <!-- Holographic Forcefield Shield (Triggered on activate_shield) -->
        <div class="ai-shield-barrier" id="ai-shield-barrier">
          <div class="ai-shield-hex"></div>
        </div>

        <!-- Warp Boost Particles (Triggered on power_boost) -->
        <div class="ai-boost-warp" id="ai-boost-warp">
          <div class="ai-warp-beam b1"></div>
          <div class="ai-warp-beam b2"></div>
          <div class="ai-warp-beam b3"></div>
        </div>

        <!-- Animated SVG Droid Core Avatar -->
        <div class="ai-avatar-core" id="ai-avatar-core">
          <svg class="ai-avatar-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="50%" stop-color="#818cf8"/>
                <stop offset="100%" stop-color="#c084fc"/>
              </linearGradient>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#4facfe" stop-opacity="0.2"/>
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="glow"/>
                <feMerge>
                  <feMergeNode in="glow"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <!-- Rotating Holographic Outer Gyro Ring -->
            <circle class="ai-gyro-ring outer" cx="100" cy="100" r="88" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="14 10" fill="none" opacity="0.75"/>
            
            <!-- Rotating Synaptic Middle Ring -->
            <circle class="ai-gyro-ring middle" cx="100" cy="100" r="72" stroke="#a855f7" stroke-width="2" stroke-dasharray="8 6" fill="none" opacity="0.65"/>
            
            <!-- Inner Glowing Plasma Aura -->
            <circle class="ai-plasma-aura" cx="100" cy="100" r="54" fill="url(#coreGlow)" opacity="0.25"/>

            <!-- Orbiting Neural Synapse Nodes -->
            <g class="ai-orbit-group">
              <circle class="ai-orbit-node n1" cx="100" cy="28" r="4.5" fill="#38bdf8" filter="url(#neonGlow)"/>
              <circle class="ai-orbit-node n2" cx="172" cy="100" r="4" fill="#c084fc" filter="url(#neonGlow)"/>
              <circle class="ai-orbit-node n3" cx="100" cy="172" r="4.5" fill="#38bdf8" filter="url(#neonGlow)"/>
              <circle class="ai-orbit-node n4" cx="28" cy="100" r="4" fill="#818cf8" filter="url(#neonGlow)"/>
            </g>

            <!-- Droid Head Chassis -->
            <rect x="52" y="52" width="96" height="96" rx="28" fill="#0f172a" stroke="#38bdf8" stroke-width="3" filter="url(#neonGlow)"/>

            <!-- Cybernetic Antenna Ears -->
            <rect x="42" y="85" width="8" height="30" rx="4" fill="#38bdf8" opacity="0.9"/>
            <rect x="150" y="85" width="8" height="30" rx="4" fill="#38bdf8" opacity="0.9"/>
            <line x1="46" y1="78" x2="46" y2="85" stroke="#38bdf8" stroke-width="2"/>
            <line x1="154" y1="78" x2="154" y2="85" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="46" cy="76" r="3" fill="#38bdf8"/>
            <circle cx="154" cy="76" r="3" fill="#38bdf8"/>

            <!-- High-Tech Visor Screen -->
            <rect x="62" y="66" width="76" height="50" rx="14" fill="#020617" stroke="#1e293b" stroke-width="1.5"/>

            <!-- Visor Scanlines -->
            <line x1="64" y1="75" x2="136" y2="75" stroke="#38bdf8" stroke-width="0.5" opacity="0.3"/>
            <line x1="64" y1="85" x2="136" y2="85" stroke="#38bdf8" stroke-width="0.5" opacity="0.3"/>
            <line x1="64" y1="95" x2="136" y2="95" stroke="#38bdf8" stroke-width="0.5" opacity="0.3"/>
            <line x1="64" y1="105" x2="136" y2="105" stroke="#38bdf8" stroke-width="0.5" opacity="0.3"/>

            <!-- Expressive Animated Digital Eyes (Swapped via classes) -->
            <g class="ai-eyes-group" id="ai-eyes">
              <!-- Default: Friendly Cyan Glow Eyes -->
              <ellipse class="ai-eye left" cx="82" cy="90" rx="8" ry="12" fill="#38bdf8" filter="url(#neonGlow)"/>
              <ellipse class="ai-eye right" cx="118" cy="90" rx="8" ry="12" fill="#38bdf8" filter="url(#neonGlow)"/>
              <!-- Eye Highlights -->
              <circle class="ai-eye-hl left" cx="80" cy="86" r="3" fill="#ffffff"/>
              <circle class="ai-eye-hl right" cx="116" cy="86" r="3" fill="#ffffff"/>
            </g>

            <!-- Holographic Mouth / Waveform Line -->
            <path id="ai-mouth" class="ai-mouth" d="M 88 126 Q 100 131 112 126" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" fill="none"/>
          </svg>
        </div>

        <!-- Voice / Thought Speech Bubble inside Avatar Deck -->
        <div class="ai-speech-bubble" id="ai-speech-bubble">
          <div class="ai-speech-tail"></div>
          <span class="ai-speech-text" id="ai-speech-text">Ready for command, Commander!</span>
        </div>

        <!-- Interaction Prompt Hint -->
        <div class="ai-avatar-hint">💡 Tap NOVA-19 to interact & hear voice synthesis!</div>
      </div>

      <!-- Live Confidence Meter & Sensor Telemetry HUD -->
      <div class="ai-hud-grid">
        <!-- Confidence Meter -->
        <div class="ai-hud-card">
          <div class="ai-hud-label">
            <span>NEURAL CONFIDENCE</span>
            <span id="ai-conf-val" class="ai-conf-val">0%</span>
          </div>
          <div class="ai-conf-track">
            <div class="ai-conf-bar" id="ai-conf-bar" style="width: 0%"></div>
          </div>
          <div class="ai-conf-legend">
            <span>0% (Idle)</span>
            <span>Threshold: 75%</span>
            <span>100% (Full)</span>
          </div>
        </div>

        <!-- Telemetry Data Chips -->
        <div class="ai-hud-card">
          <div class="ai-hud-label">
            <span>LIVE TELEMETRY MATRIX</span>
            <span class="ai-telemetry-status" id="ai-telemetry-tag">Synced</span>
          </div>
          <div class="ai-telemetry-chips">
            <div class="ai-chip">
              <span class="ai-chip-k">Commander</span>
              <span class="ai-chip-v" id="tel-commander">Commander</span>
            </div>
            <div class="ai-chip">
              <span class="ai-chip-k">Query</span>
              <span class="ai-chip-v" id="tel-query">Standby</span>
            </div>
            <div class="ai-chip">
              <span class="ai-chip-k">Action</span>
              <span class="ai-chip-v" id="tel-action">idle</span>
            </div>
            <div class="ai-chip">
              <span class="ai-chip-k">Mode</span>
              <span class="ai-chip-v" id="tel-mode">Autonomous</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Quick-Prompt Station: Clickable Chips to Test Inputs -->
      <div class="ai-interactive-station">
        <div class="ai-station-header">
          <span class="ai-station-title">INTERACTIVE PROMPT CHIPS</span>
          <span class="ai-station-desc">Tap any chip to stage inputs & test responses</span>
        </div>
        <div class="ai-chips-row">
          <button type="button" class="ai-prompt-chip" data-val="Astra">
            💬 "Astra"
          </button>
          <button type="button" class="ai-prompt-chip" data-val="analyze sector 7">
            🔍 "analyze sector 7"
          </button>
          <button type="button" class="ai-prompt-chip" data-val="boost">
            ⚡ "boost"
          </button>
          <button type="button" class="ai-prompt-chip" data-val="85">
            🛡️ "85" (Shield)
          </button>
          <button type="button" class="ai-prompt-chip" data-val="celebrate">
            🎉 "celebrate"
          </button>
        </div>

        <!-- Direct Live Input Field -->
        <div class="ai-input-row">
          <input type="text" id="ai-user-input" class="ai-user-input" placeholder="Type custom input to feed into input()..." />
          <button type="button" id="ai-send-btn" class="ai-send-btn">
            🚀 Stage Input
          </button>
        </div>
        <div class="ai-staged-notice" id="ai-staged-notice">
          Staged input queue: <b>None</b> (Ready for test or custom run)
        </div>
      </div>
    </div>
  `;

  wireEvents();
  updateVisuals();
}

/* ---- Event Wiring ---------------------------------------------------- */
function wireEvents() {
  if (!root) return;

  // Sound toggle button
  const soundBtn = root.querySelector("#ai-sound-toggle");
  if (soundBtn) {
    soundBtn.onclick = () => {
      soundEnabled = !soundEnabled;
      soundBtn.textContent = soundEnabled ? "🔊 Sound ON" : "🔇 Muted";
      soundBtn.classList.toggle("muted", !soundEnabled);
      if (soundEnabled) playChirpSound();
    };
  }

  // Interactive Avatar Click
  const avatarDeck = root.querySelector("#ai-avatar-deck");
  if (avatarDeck) {
    avatarDeck.onclick = () => {
      playChirpSound();
      triggerAvatarWink();
      const randomMsg = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setSpeechBubble(randomMsg);
      pulsePipelineNode("pipe-think");
    };
  }

  // Quick Prompt Chips
  const promptChips = root.querySelectorAll(".ai-prompt-chip");
  promptChips.forEach(chip => {
    chip.onclick = () => {
      playClickSound();
      const val = chip.dataset.val;
      const inputEl = root.querySelector("#ai-user-input");
      if (inputEl) inputEl.value = val;
      stageCustomInput(val);
    };
  });

  // Stage Input Button
  const sendBtn = root.querySelector("#ai-send-btn");
  const inputEl = root.querySelector("#ai-user-input");
  if (sendBtn && inputEl) {
    const handleSend = () => {
      const text = inputEl.value.trim();
      if (!text) return;
      playClickSound();
      stageCustomInput(text);
      setSpeechBubble(`Staged input: "${text}". Ready for ▶ Run!`);
    };
    sendBtn.onclick = handleSend;
    inputEl.onkeydown = e => {
      if (e.key === "Enter") handleSend();
    };
  }
}

function stageCustomInput(val) {
  stagedInputs = [val];
  const notice = root ? root.querySelector("#ai-staged-notice") : null;
  if (notice) {
    notice.innerHTML = `Staged input queue: <b>"${val}"</b> (will be fed into <code>input()</code> on ▶ Run)`;
  }
  pulsePipelineNode("pipe-perceive");
}

/* ---- Dynamic Input Provider for ui-shell ----------------------------- */
export function getInputs() {
  if (stagedInputs.length > 0) {
    return stagedInputs.slice();
  }
  return [];
}

/* ---- Visual State Updates -------------------------------------------- */
function updateVisuals() {
  if (!root) return;

  const telCommander = root.querySelector("#tel-commander");
  const telQuery = root.querySelector("#tel-query");
  const telAction = root.querySelector("#tel-action");
  const telMode = root.querySelector("#tel-mode");
  const confBar = root.querySelector("#ai-conf-bar");
  const confVal = root.querySelector("#ai-conf-val");

  if (telCommander) telCommander.textContent = currentCommander;
  if (telQuery) telQuery.textContent = currentQuery;
  if (telAction) telAction.textContent = currentAction;
  if (telMode) telMode.textContent = currentMode;

  if (confBar && confVal) {
    const pct = Math.min(100, Math.max(0, currentConfidence));
    confBar.style.width = pct + "%";
    confVal.textContent = pct + "%";
    if (pct >= 75) {
      confBar.classList.add("high");
    } else {
      confBar.classList.remove("high");
    }
  }
}

function setSpeechBubble(text) {
  if (!root) return;
  const bubble = root.querySelector("#ai-speech-text");
  if (bubble) {
    bubble.textContent = text;
    const bubbleBox = root.querySelector("#ai-speech-bubble");
    if (bubbleBox) {
      bubbleBox.classList.remove("pop");
      void bubbleBox.offsetWidth; // trigger reflow
      bubbleBox.classList.add("pop");
    }
  }
}

function setStatusBadge(text, stateClass = "active") {
  if (!root) return;
  const badge = root.querySelector("#ai-status-badge");
  if (badge) {
    badge.textContent = text;
    badge.className = "ai-badge " + stateClass;
  }
}

function pulsePipelineNode(nodeId) {
  if (!root) return;
  const nodes = root.querySelectorAll(".ai-pipe-node");
  nodes.forEach(n => n.classList.remove("active", "pulse"));
  const target = root.querySelector("#" + nodeId);
  if (target) {
    target.classList.add("active", "pulse");
    setTimeout(() => target.classList.remove("pulse"), 800);
  }
}

function setAvatarEmotion(emotion) {
  if (!root) return;
  const avatarCore = root.querySelector("#ai-avatar-core");
  const mouth = root.querySelector("#ai-mouth");
  if (!avatarCore) return;

  avatarCore.className = "ai-avatar-core " + emotion;

  if (mouth) {
    if (emotion === "happy" || emotion === "celebrate") {
      mouth.setAttribute("d", "M 86 122 Q 100 138 114 122");
    } else if (emotion === "boost") {
      mouth.setAttribute("d", "M 88 126 Q 100 128 112 126");
    } else {
      mouth.setAttribute("d", "M 88 126 Q 100 131 112 126");
    }
  }
}

function triggerAvatarWink() {
  if (!root) return;
  const eyes = root.querySelector("#ai-eyes");
  if (eyes) {
    eyes.classList.add("wink");
    setTimeout(() => eyes.classList.remove("wink"), 450);
  }
}

/* ---- Engine Lifecycle: render ---------------------------------------- */
export function render(env) {
  if (!root) return;
  env = env || {};

  if (env.commander) {
    currentCommander = String(env.commander);
    pulsePipelineNode("pipe-perceive");
  }
  if (env.query) {
    currentQuery = String(env.query);
    pulsePipelineNode("pipe-think");
  }
  if (env.action) {
    currentAction = String(env.action);
    pulsePipelineNode("pipe-decide");
  }
  if (env.confidence !== undefined) {
    currentConfidence = Number(env.confidence) || 0;
    pulsePipelineNode("pipe-decide");
  }

  updateVisuals();
}

/* ---- Engine Lifecycle: reset ----------------------------------------- */
export function reset() {
  if (!root) return;
  currentAction = "idle";
  setAvatarEmotion("idle");
  setStatusBadge("● READY", "ready");

  const shield = root.querySelector("#ai-shield-barrier");
  if (shield) shield.classList.remove("active");

  const warp = root.querySelector("#ai-boost-warp");
  if (warp) warp.classList.remove("active");

  const nodes = root.querySelectorAll(".ai-pipe-node");
  nodes.forEach(n => n.classList.remove("pulse"));
  const first = root.querySelector("#pipe-perceive");
  if (first) first.classList.add("active");
}

/* ---- Engine Lifecycle: play ------------------------------------------ */
export async function play(cmd, args = [], ctx = {}) {
  if (!root) return;
  currentAction = cmd;
  const setBubble = ctx.setBubble || (() => {});

  switch (cmd) {
    case "input": {
      pulsePipelineNode("pipe-perceive");
      const promptText = args[0] || "input()";
      setStatusBadge("● PROMPTING", "processing");
      setAvatarEmotion("thinking");
      setBubble(`⌨️ input: "${promptText}"`);
      setSpeechBubble(`Prompting user: "${promptText}"`);
      playClickSound();
      await sleep(550);
      break;
    }

    case "ai_boot": {
      pulsePipelineNode("pipe-perceive");
      setStatusBadge("● AWAKENING", "processing");
      setAvatarEmotion("thinking");
      setBubble("⚡ ai_boot(): Neural Core online!");
      setSpeechBubble("NOVA-19 Neural Core online! Initializing synaptic matrix.");
      playBootSound();

      const core = root.querySelector("#ai-avatar-core");
      if (core) {
        core.classList.add("booting");
        setTimeout(() => core.classList.remove("booting"), 1200);
      }
      await sleep(750);
      setStatusBadge("● ONLINE", "active");
      setAvatarEmotion("happy");
      break;
    }

    case "ai_think": {
      pulsePipelineNode("pipe-think");
      setStatusBadge("● THINKING", "processing");
      setAvatarEmotion("thinking");
      const param = args[0] !== undefined ? `("${args[0]}")` : "()";
      setBubble(`🧠 ai_think${param}: Synaptic network computing...`);
      setSpeechBubble(`Analyzing query: "${args[0] || 'processing'}"`);
      playThinkSound();

      const core = root.querySelector("#ai-avatar-core");
      if (core) {
        core.classList.add("thinking-pulse");
        setTimeout(() => core.classList.remove("thinking-pulse"), 1000);
      }
      await sleep(700);
      setStatusBadge("● COMPLETED", "active");
      break;
    }

    case "ai_scan": {
      pulsePipelineNode("pipe-think");
      setStatusBadge("● SCANNING", "processing");
      setAvatarEmotion("scanning");
      const queryStr = args[0] ? ` "${args[0]}"` : "";
      setBubble(`🔍 ai_scan(): Deploying holographic sensor sweep${queryStr}`);
      setSpeechBubble(`Sensor radar sweep engaged on query${queryStr}!`);
      playScanSweepSound();

      const core = root.querySelector("#ai-avatar-core");
      if (core) {
        core.classList.add("scanning-anim");
        setTimeout(() => core.classList.remove("scanning-anim"), 900);
      }
      await sleep(750);
      setStatusBadge("● SCAN RESOLVED", "active");
      setAvatarEmotion("happy");
      break;
    }

    case "power_boost": {
      pulsePipelineNode("pipe-act");
      setStatusBadge("● TURBO BOOST", "boost");
      setAvatarEmotion("boost");
      setBubble("🚀 power_boost(): Diverting energy to warp thrusters!");
      setSpeechBubble("Overdrive engaged! Turbo boost at 100% velocity!");
      playBoostSound();

      const warp = root.querySelector("#ai-boost-warp");
      if (warp) {
        warp.classList.add("active");
        setTimeout(() => warp.classList.remove("active"), 1200);
      }
      await sleep(800);
      setStatusBadge("● ONLINE", "active");
      break;
    }

    case "activate_shield": {
      pulsePipelineNode("pipe-act");
      setStatusBadge("● SHIELD ACTIVE", "shield");
      setAvatarEmotion("shield");
      const power = args[0] !== undefined ? Number(args[0]) : 85;
      currentConfidence = power;
      updateVisuals();

      setBubble(`🛡️ activate_shield(${power}): Hexagonal plasma barrier online!`);
      setSpeechBubble(`Defensive plasma shield active at ${power}% efficiency!`);
      playShieldSound();

      const shield = root.querySelector("#ai-shield-barrier");
      if (shield) {
        shield.classList.add("active");
        setTimeout(() => shield.classList.remove("active"), 1400);
      }
      await sleep(850);
      break;
    }

    case "celebrate": {
      pulsePipelineNode("pipe-act");
      setStatusBadge("● CELEBRATING", "celebrate");
      setAvatarEmotion("celebrate");
      setBubble("🎉 celebrate(): Victory sequence engaged!");
      setSpeechBubble("Woohoo! Mission successful, Commander! 🌟");
      playCelebrateSound();

      const core = root.querySelector("#ai-avatar-core");
      if (core) {
        core.classList.add("celebrating-bounce");
        setTimeout(() => core.classList.remove("celebrating-bounce"), 1300);
      }
      await sleep(850);
      break;
    }

    case "synthesize_speech": {
      pulsePipelineNode("pipe-act");
      setStatusBadge("● SPEAKING", "processing");
      setAvatarEmotion("happy");
      const text = args[0] ? String(args[0]) : "Communication channel active.";
      setBubble(`🔊 synthesize_speech("${text}")`);
      setSpeechBubble(text);
      playChirpSound();
      await sleep(650);
      break;
    }

    case "print": {
      pulsePipelineNode("pipe-perceive");
      const msg = args.join(" ");
      setBubble(`📟 Telemetry: ${msg}`);
      playClickSound();
      await sleep(350);
      break;
    }

    default: {
      setBubble(`▶ ${cmd}()`);
      playClickSound();
      await sleep(300);
      break;
    }
  }

  updateVisuals();
}
