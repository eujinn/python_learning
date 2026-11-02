/* ==========================================================================
   List + For Loop — Bento Express: Interactive Scene Controller
   Implements init(container), render(env), reset(), play(cmd, args, ctx)
   ========================================================================== */

const sleep = ms => new Promise(r => setTimeout(r, ms));
const py = v => v === true ? "True" : v === false ? "False" : JSON.stringify(v);

let root = null;
let currentList = ["onigiri", "sushi", "gyoza"];
let currentListName = "dishes";
let activeVal = null;
let servedCount = 0;
let lastEnv = {};

const DISH_ICONS = {
  onigiri: "🍙",
  sushi: "🍣",
  gyoza: "🥟",
  dango: "🍡",
  mochi: "🍓",
  ramen: "🍜",
  tea: "🍵",
  boba: "🧋",
  juice: "🧃",
  soda: "🥤",
  pizza: "🍕",
  burger: "🍔",
  taco: "🌮",
  cake: "🍰",
  cookie: "🍪",
  donut: "🍩",
  ruby: "💎",
  diamond: "💎",
  emerald: "❇️",
  sapphire: "🔷",
  crown: "👑",
  key: "🗝️",
  apple: "🍎",
  banana: "🍌",
  candy: "🍬",
  chocolate: "🍫"
};

const PANTRY_ITEMS = [
  { name: "dango", icon: "🍡" },
  { name: "mochi", icon: "🍓" },
  { name: "ramen", icon: "🍜" },
  { name: "boba", icon: "🧋" },
  { name: "pizza", icon: "🍕" },
  { name: "taco", icon: "🌮" },
  { name: "cake", icon: "🍰" },
  { name: "cookie", icon: "🍪" }
];

function getIcon(name) {
  if (!name) return "🍱";
  const str = String(name).toLowerCase();
  for (const [key, icon] of Object.entries(DISH_ICONS)) {
    if (str.includes(key)) return icon;
  }
  return "🍱";
}

/* Chef Kuma SVG artwork with dynamic mood facial expressions */
function getChefKumaSVG(mood = "idle") {
  let mouthPath = 'M48 76 Q55 83 62 76'; // smiling
  let eyeLeft = '<circle cx="42" cy="58" r="4.5" fill="#451a03"/><circle cx="43.5" cy="56.5" r="1.5" fill="#ffffff"/>';
  let eyeRight = '<circle cx="68" cy="58" r="4.5" fill="#451a03"/><circle cx="69.5" cy="56.5" r="1.5" fill="#ffffff"/>';

  if (mood === "happy") {
    // Happy squint eyes (^ ^) and big open smile
    eyeLeft = '<path d="M38 58 Q42 52 46 58" fill="none" stroke="#451a03" stroke-width="3" stroke-linecap="round"/>';
    eyeRight = '<path d="M64 58 Q68 52 72 58" fill="none" stroke="#451a03" stroke-width="3" stroke-linecap="round"/>';
    mouthPath = 'M46 74 Q55 86 64 74 Z';
  } else if (mood === "curious") {
    // Curious raised eye
    eyeLeft = '<circle cx="42" cy="55" r="5" fill="#451a03"/><circle cx="44" cy="53" r="1.8" fill="#ffffff"/>';
    eyeRight = '<circle cx="68" cy="59" r="4" fill="#451a03"/><circle cx="69" cy="58" r="1.5" fill="#ffffff"/>';
    mouthPath = 'M49 77 Q55 80 61 77';
  }

  return `
  <svg class="chef-kuma-svg" id="chef-kuma" viewBox="0 0 110 125" role="img" aria-label="Chef Kuma">
    <!-- Soft shadow -->
    <ellipse cx="55" cy="118" rx="35" ry="6" fill="#78350f" opacity="0.18"/>
    
    <!-- Ears -->
    <circle cx="28" cy="34" r="16" fill="#b45309"/>
    <circle cx="28" cy="34" r="9" fill="#fde68a"/>
    <circle cx="82" cy="34" r="16" fill="#b45309"/>
    <circle cx="82" cy="34" r="9" fill="#fde68a"/>

    <!-- Head -->
    <circle cx="55" cy="62" r="40" fill="#d97706"/>
    <!-- Muzzle -->
    <ellipse cx="55" cy="74" rx="24" ry="17" fill="#fef3c7"/>
    <!-- Nose -->
    <ellipse cx="55" cy="67" rx="7" ry="5" fill="#451a03"/>
    
    <!-- Eyes -->
    <g id="kuma-eyes">
      ${eyeLeft}
      ${eyeRight}
    </g>

    <!-- Mouth -->
    <path id="kuma-mouth" d="${mouthPath}" fill="${mood === 'happy' ? '#ea580c' : 'none'}" stroke="#451a03" stroke-width="2.8" stroke-linecap="round"/>
    <!-- Rosy cheeks -->
    <circle cx="33" cy="72" r="5" fill="#f87171" opacity="0.5"/>
    <circle cx="77" cy="72" r="5" fill="#f87171" opacity="0.5"/>

    <!-- Chef Hat -->
    <g id="kuma-hat" transform="translate(0, -6)">
      <ellipse cx="55" cy="28" rx="26" ry="7" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <path d="M30 27 C26 5, 45 4, 55 12 C65 4, 84 5, 80 27 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <rect x="34" y="24" width="42" height="8" rx="3" fill="#ea580c"/>
    </g>
  </svg>
  `;
}

export function init(container) {
  root = container;
  root.innerHTML = `
    <div class="scene bento-stage">
      <div id="bubble"></div>

      <!-- Header bar with interactive order bell and live status -->
      <div class="bento-header">
        <div class="bento-title-wrap">
          <span class="shop-sign-icon">🍱</span>
          <div class="shop-title-col">
            <span class="bento-shop-name">Bento Express</span>
            <span class="bento-shop-sub">Sushi & Snack Conveyor</span>
          </div>
          <button class="bento-bell-btn btn-3d" id="bell-btn" type="button" title="Ring the order bell!">
            <span class="bell-emoji">🔔</span> Order Bell
          </button>
        </div>
        <div class="bento-status-pill" id="bento-status">Ready to serve</div>
      </div>

      <!-- Main Stage Arena: Chef + Conveyor Track + Customer Serving Tray -->
      <div class="bento-arena">
        <!-- Chef Kuma Zone -->
        <div class="bento-chef-zone">
          <div id="chef-svg-container">${getChefKumaSVG("idle")}</div>
          <div class="chef-badge">Chef Kuma</div>
        </div>

        <!-- Conveyor Track Zone -->
        <div class="bento-track-zone">
          <div class="track-label-bar">
            <div class="track-info-left">
              <span class="track-tag">List:</span>
              <strong class="track-code-name" id="track-list-name">dishes</strong>
            </div>
            <div class="track-info-right">
              <span class="track-count-badge" id="track-len-info">3 items</span>
            </div>
          </div>

          <!-- Conveyor Track Belt with moving rollers -->
          <div class="conveyor-container">
            <div class="conveyor-rail top-rail"></div>
            <div class="conveyor-belt" id="conveyor-belt">
              <!-- Plates injected dynamically -->
            </div>
            <div class="conveyor-rail btm-rail"></div>
          </div>

          <!-- Active Loop Pointer HUD -->
          <div class="loop-pointer-bar" id="loop-pointer-bar">
            <span class="loop-spin-icon">🔁</span>
            <span id="loop-status-text">Waiting for for loop…</span>
          </div>
        </div>

        <!-- Customer Serving Tray (where print() lands) -->
        <div class="bento-tray-zone">
          <div class="tray-title">
            <span>🍱</span>
            <span>Serving Tray</span>
          </div>
          <div class="tray-content" id="tray-content">
            <!-- Served dishes pop in here -->
          </div>
          <div class="tray-count" id="tray-count">0 served</div>
        </div>
      </div>

      <!-- Interactive Chef's Pantry Bar (Quick-Insert Helpers) -->
      <div class="pantry-bar">
        <div class="pantry-header">
          <span class="pantry-sparkle">💡</span>
          <span class="pantry-title">Chef's Pantry: Click to inspect & copy delicious snacks into your list:</span>
        </div>
        <div class="pantry-chips-row" id="pantry-chips">
          ${PANTRY_ITEMS.map(item => `
            <button class="pantry-chip" type="button" data-name="${item.name}" title="Click to use &quot;${item.name}&quot;">
              <span class="pantry-icon">${item.icon}</span>
              <span class="pantry-name">${item.name}</span>
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Interactive Plate Inspector Popup -->
      <div class="plate-inspect-popup" id="plate-inspect-popup" style="display: none;">
        <div class="inspect-body" id="inspect-body">
          <span class="inspect-icon" id="inspect-icon">🍙</span>
          <div class="inspect-details">
            <div class="inspect-line1" id="inspect-code-repr">dishes[0] = "onigiri"</div>
            <div class="inspect-line2" id="inspect-desc">Data Type: str · Position: 1st in list</div>
          </div>
        </div>
        <button class="inspect-close" id="inspect-close" type="button" aria-label="Close">✕</button>
      </div>
    </div>
  `;

  // Wire Order Bell
  const bellBtn = root.querySelector("#bell-btn");
  if (bellBtn) {
    bellBtn.addEventListener("click", () => {
      bellBtn.classList.remove("ring");
      void bellBtn.offsetWidth;
      bellBtn.classList.add("ring");
      setChefMood("happy");
      triggerChefBounce();
      setLocalBubble("🔔 Ding! Order bell rang! Press ▶ Run to start the loop!");
      setTimeout(() => {
        setLocalBubble("");
        setChefMood("idle");
      }, 1500);
    });
  }

  // Wire Pantry Chips
  const pantryChips = root.querySelectorAll(".pantry-chip");
  pantryChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const snackName = chip.getAttribute("data-name");
      const icon = getIcon(snackName);
      chip.classList.add("chip-bounce");
      setTimeout(() => chip.classList.remove("chip-bounce"), 400);

      triggerChefBounce();
      setChefMood("happy");

      // Check if editor has placeholder "____"
      const editor = document.getElementById("code");
      let replaced = false;
      if (editor && editor.value.includes('"____"')) {
        editor.value = editor.value.replace('"____"', `"${snackName}"`);
        editor.dispatchEvent(new Event("input"));
        replaced = true;
      } else if (editor && editor.value.includes("'____'")) {
        editor.value = editor.value.replace("'____'", `"${snackName}"`);
        editor.dispatchEvent(new Event("input"));
        replaced = true;
      }

      if (replaced) {
        setLocalBubble(`✨ Added "${snackName}" into your Python list!`);
      } else {
        // Try clipboard copy
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(`"${snackName}"`).catch(() => {});
        }
        setLocalBubble(`💡 Picked ${icon} "${snackName}"! Insert it into your list in quotes.`);
      }

      setTimeout(() => {
        setLocalBubble("");
        setChefMood("idle");
      }, 2000);
    });
  });

  // Wire Inspector close button
  const closeBtn = root.querySelector("#inspect-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const p = root.querySelector("#plate-inspect-popup");
      if (p) p.style.display = "none";
    });
  }

  reset();
}

function setChefMood(mood) {
  const container = root ? root.querySelector("#chef-svg-container") : null;
  if (container) {
    container.innerHTML = getChefKumaSVG(mood);
  }
}

function setLocalBubble(text) {
  const b = root ? root.querySelector("#bubble") : null;
  if (b) b.textContent = text;
}

function triggerChefBounce() {
  const kuma = root ? root.querySelector("#chef-kuma") : null;
  if (kuma) {
    kuma.classList.remove("kuma-bounce");
    void kuma.offsetWidth;
    kuma.classList.add("kuma-bounce");
  }
}

export function render(env) {
  lastEnv = Object.assign({}, env || {});

  // 1. Detect list in env
  let listKey = null;
  for (const [k, v] of Object.entries(lastEnv)) {
    if (Array.isArray(v) && !k.startsWith("_")) {
      listKey = k;
      break;
    }
  }

  if (listKey && Array.isArray(lastEnv[listKey])) {
    currentListName = listKey;
    currentList = lastEnv[listKey];
  } else {
    // Inspect editor code if list not in env yet (idle preview)
    const codeEl = document.getElementById("code");
    if (codeEl && codeEl.value) {
      const m = codeEl.value.match(/([a-zA-Z_]\w*)\s*=\s*\[(.*?)\]/);
      if (m) {
        currentListName = m[1];
        try {
          const items = m[2].split(",").map(s => s.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
          if (items.length) currentList = items;
        } catch (_) {}
      }
    }
  }

  // 2. Detect active loop item
  activeVal = null;
  let activeVarName = null;
  for (const [k, v] of Object.entries(lastEnv)) {
    if (k !== currentListName && (typeof v === "string" || typeof v === "number")) {
      if (currentList.some(item => String(item) === String(v))) {
        activeVal = v;
        activeVarName = k;
        break;
      }
    }
  }

  // Update track list title and length badge
  const listNameEl = root ? root.querySelector("#track-list-name") : null;
  if (listNameEl) listNameEl.textContent = currentListName;

  const lenEl = root ? root.querySelector("#track-len-info") : null;
  if (lenEl) lenEl.textContent = `${currentList.length} items`;

  renderConveyorPlates();

  // Update loop pointer HUD
  const loopTextEl = root ? root.querySelector("#loop-status-text") : null;
  const loopBar = root ? root.querySelector("#loop-pointer-bar") : null;
  if (loopTextEl && loopBar) {
    if (activeVal !== null && activeVal !== undefined) {
      const idx = currentList.findIndex(item => String(item) === String(activeVal));
      const idxLabel = idx >= 0 ? `[${idx}]` : "";
      const varPrefix = activeVarName ? `${activeVarName} = ` : "";
      loopTextEl.textContent = `Looping: ${varPrefix}${py(activeVal)} ${idxLabel} (${idx + 1}/${currentList.length})`;
      loopBar.classList.add("pointer-pulse");
      setChefMood("curious");
    } else {
      loopTextEl.textContent = "Ready for for loop…";
      loopBar.classList.remove("pointer-pulse");
      setChefMood("idle");
    }
  }
}

function renderConveyorPlates() {
  const belt = root ? root.querySelector("#conveyor-belt") : null;
  if (!belt) return;

  belt.innerHTML = "";
  if (!currentList || !currentList.length) {
    const empty = document.createElement("div");
    empty.className = "empty-track-msg";
    empty.textContent = "Conveyor belt is empty [ ]";
    belt.appendChild(empty);
    return;
  }

  currentList.forEach((item, idx) => {
    const plate = document.createElement("div");
    plate.className = "bento-plate";
    const isActive = activeVal !== null && String(activeVal) === String(item);
    if (isActive) {
      plate.classList.add("active");
      // Smoothly scroll active plate into view if conveyor has overflow
      setTimeout(() => {
        plate.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }, 50);
    }

    const icon = getIcon(item);
    plate.innerHTML = `
      <span class="plate-idx">[${idx}]</span>
      <span class="plate-icon">${icon}</span>
      <span class="plate-name" title="${String(item)}">${String(item)}</span>
    `;

    // Interactive plate click for student exploration
    plate.addEventListener("click", () => {
      plate.classList.add("plate-click-glow");
      setTimeout(() => plate.classList.remove("plate-click-glow"), 500);
      triggerChefBounce();
      setChefMood("happy");
      showInspectPopup(idx, item, icon);
    });

    belt.appendChild(plate);
  });
}

function showInspectPopup(idx, val, icon) {
  const popup = root ? root.querySelector("#plate-inspect-popup") : null;
  const iconEl = root ? root.querySelector("#inspect-icon") : null;
  const codeEl = root ? root.querySelector("#inspect-code-repr") : null;
  const descEl = root ? root.querySelector("#inspect-desc") : null;

  if (popup && codeEl && descEl && iconEl) {
    iconEl.textContent = icon;
    codeEl.innerHTML = `<code>${currentListName}[${idx}]</code> = <span class="val-str">"${val}"</span>`;
    descEl.textContent = `Type: str · Position ${idx + 1} of ${currentList.length} in list`;
    popup.style.display = "flex";
  }
}

export function reset() {
  activeVal = null;
  servedCount = 0;
  lastEnv = {};
  setLocalBubble("");
  setChefMood("idle");

  const tray = root ? root.querySelector("#tray-content") : null;
  if (tray) tray.innerHTML = "";

  const trayCount = root ? root.querySelector("#tray-count") : null;
  if (trayCount) trayCount.textContent = "0 served";

  const status = root ? root.querySelector("#bento-status") : null;
  if (status) status.textContent = "Ready to serve";

  const loopTextEl = root ? root.querySelector("#loop-status-text") : null;
  if (loopTextEl) loopTextEl.textContent = "Waiting for loop…";

  const loopBar = root ? root.querySelector("#loop-pointer-bar") : null;
  if (loopBar) loopBar.classList.remove("pointer-pulse");

  const popup = root ? root.querySelector("#plate-inspect-popup") : null;
  if (popup) popup.style.display = "none";

  renderConveyorPlates();
}

export async function play(name, args = [], ctx = {}) {
  // Support both play(cmd, args, ctx) and play(cmd, ctx)
  let context = ctx;
  let callArgs = args;
  if (arguments.length === 2 && !Array.isArray(arguments[1]) && typeof arguments[1] === "object") {
    context = arguments[1];
    callArgs = context.args || [];
  }

  const bubbleSet = context.setBubble || setLocalBubble;

  if (name === "print") {
    servedCount++;
    setChefMood("happy");
    triggerChefBounce();

    // Determine announced string
    let outText = "";
    if (callArgs && callArgs.length) {
      outText = callArgs.map(a => a === undefined || a === null ? "None" : String(a)).join(" ");
    } else if (context.out !== undefined && context.out !== null) {
      outText = String(context.out);
    } else if (activeVal !== null) {
      outText = String(activeVal);
    } else {
      outText = "served item";
    }

    const icon = getIcon(outText);

    // Chef speech announcement
    bubbleSet(`📢 Chef Kuma: “${outText}”!`);

    // Add served card to Bento Serving Tray with smooth animation
    const tray = root ? root.querySelector("#tray-content") : null;
    if (tray) {
      const card = document.createElement("div");
      card.className = "served-card";
      card.innerHTML = `
        <span class="served-icon">${icon}</span>
        <span class="served-text" title="${outText}">${outText}</span>
      `;
      tray.appendChild(card);
      // Auto-scroll tray to latest dish
      tray.scrollTop = tray.scrollHeight;
    }

    // Update tray counter
    const countEl = root ? root.querySelector("#tray-count") : null;
    if (countEl) countEl.textContent = `${servedCount} served`;

    // Update status badge
    const statusEl = root ? root.querySelector("#bento-status") : null;
    if (statusEl) {
      const total = currentList.length || 3;
      statusEl.textContent = servedCount >= total ? "Order Complete! 🎉" : `Serving #${servedCount} of ${total}`;
    }

    // Mark active plate as served
    const belt = root ? root.querySelector("#conveyor-belt") : null;
    if (belt) {
      const activePlate = belt.querySelector(".bento-plate.active");
      if (activePlate) {
        activePlate.classList.add("served");
        activePlate.classList.remove("active");
      }
    }

    await sleep(650);
    bubbleSet("");
  } else {
    bubbleSet(`▶ ${name}()`);
    await sleep(400);
    bubbleSet("");
  }
}
