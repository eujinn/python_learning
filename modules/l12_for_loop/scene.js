/* For Loop — Ice Cream Machine scene.
   Implements the module scene API: init(root), render(env), reset(), play(name, arg). */

const sleep = ms => new Promise(r => setTimeout(r, ms));
const py = v => v === true ? "True" : v === false ? "False" : JSON.stringify(v);

/* Keep code editor visible during stepping */
function keepCodeVisible() {
  document.getElementById("run")?.addEventListener("click", () => {
    setTimeout(() => {
      const el = document.getElementById("code");
      if (el) { el.hidden = false; el.removeAttribute("hidden"); }
      const keys = document.getElementById("keys");
      if (keys) { keys.hidden = false; keys.removeAttribute("hidden"); }
    }, 10);
  });
}

/* Code persistence across exercise revisits */
const LS_KEY = "plp_l12_code_";
function saveCode(i, code) { try { localStorage.setItem(LS_KEY + i, code); } catch {} }
function restoreCode(i) { try { return localStorage.getItem(LS_KEY + i); } catch { return null; } }

function hookCodeSave() {
  let _saveIdx = -1;
  const obs = new MutationObserver(() => {
    const tabs = document.getElementById("tabs");
    if (!tabs) return;
    Array.from(tabs.querySelectorAll(".level-tab")).forEach(tab => {
      if (tab.classList.contains("completed") && !tab._saved) {
        tab._saved = true;
        const idx = parseInt(tab.textContent, 10);
        if (!isNaN(idx) && idx !== _saveIdx) {
          _saveIdx = idx;
          const ta = document.getElementById("code");
          if (ta) saveCode(idx - 1, ta.value);
        }
      }
    });
  });
  const T = document.getElementById("tabs");
  if (T) obs.observe(T, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
}

/* Restore saved code when tab changes (after DOM has updated) */
function hookCodeRestore() {
  const T = document.getElementById("tabs");
  if (!T) return;
  let _lastTab = -1;
  new MutationObserver(() => {
    const active = T.querySelector(".level-tab.active");
    if (!active) return;
    const n = parseInt(active.textContent, 10);
    if (isNaN(n) || n === _lastTab) return;
    _lastTab = n;
    setTimeout(() => {
      const saved = restoreCode(n - 1);
      const ta = document.getElementById("code");
      if (ta && saved !== null && saved !== undefined && saved.length > 0) {
        ta.value = saved;
      }
    }, 200);
  }).observe(T, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
}

/* ---- Guided walkthrough stages ---------------------------------------- */
let _guideEl = null;
let _guideBar = null;

function guideStage(stage) {
  document.body.classList.remove("guide-read", "guide-write", "guide-run");
  if (stage) document.body.classList.add("guide-" + stage);
  _guideEl = stage;
  if (!_guideBar) {
    _guideBar = document.createElement("div");
    _guideBar.id = "guideBar";
    _guideBar.style.cssText = "color:var(--ink-muted);padding:6px 0;font-size:0.9rem;cursor:pointer;border-bottom:1px dashed var(--border-line);margin:2px 0 8px;";
    const task = document.getElementById("task");
    if (task && task.parentNode) task.parentNode.insertBefore(_guideBar, task.nextSibling);
    else document.querySelector(".card-panel:first-child")?.appendChild(_guideBar);
    _guideBar.onclick = () => { if (_guideEl === "read" || _guideEl === "write") guideNext(); };
  }
  if (stage === "read") {
    _guideBar.textContent = "👆 Step 1: Read the instruction. Click the instruction or this bar to continue.";
    _guideBar.style.display = "";
  } else if (stage === "write") {
    _guideBar.textContent = "✏️ Step 2: Write your code, then press ▶ Run step by step.";
    _guideBar.style.display = "";
  } else {
    guideStage(null);
    _guideBar.style.display = "none";
  }
}

function guideNext() {
  const order = ["read", "write", "run", null];
  const idx = order.indexOf(_guideEl);
  guideStage(order[Math.min(idx + 1, order.length - 1)]);
}

function hookGuide() {
  const task = document.getElementById("task");
  if (task) {
    task.style.cursor = "pointer";
    task.addEventListener("click", () => { if (_guideEl === "read") guideNext(); });
  }
  if (_guideBar) _guideBar.onclick = () => { if (_guideEl === "read" || _guideEl === "write") guideNext(); };
  document.getElementById("run")?.addEventListener("click", () => {
    document.body.classList.remove("guide-read", "guide-write", "guide-run");
    _guideEl = null;
    if (_guideBar) _guideBar.style.display = "none";
  });
  /* Restart guide on tab switch (exercise change) */
  const T = document.getElementById("tabs");
  if (T) {
    let _lastIdx = -1;
    const cb = () => {
      const active = T.querySelector(".level-tab.active");
      if (!active) return;
      const now = parseInt(active.textContent, 10);
      if (isNaN(now) || now === _lastIdx) return;
      _lastIdx = now;
      setTimeout(() => {
        document.body.classList.remove("guide-read", "guide-write", "guide-run");
        _guideEl = null;
        guideStage("read");
      }, 150);
    };
    new MutationObserver(cb).observe(T, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    cb();
  }
}

let root = null;
let currentWant = null;
const $ = s => root ? root.querySelector(s) : null;

const FLAVOR_COLORS = {
  vanilla: { base: "#fff3b0", shade: "#f3d57c", chip: "#d4a359" },
  strawberry: { base: "#ff8fab", shade: "#fb6f92", chip: "#ffe5ec" },
  mango: { base: "#ffbe0b", shade: "#fb8500", chip: "#ffffff" },
  mint: { base: "#72efdd", shade: "#48bfe3", chip: "#3d2214" },
  chocolate: { base: "#7f4f24", shade: "#582f0e", chip: "#3d2214" },
  blueberry: { base: "#8388ff", shade: "#5e60ce", chip: "#e0e1dd" },
  caramel: { base: "#d48c46", shade: "#a45c1c", chip: "#fff3b0" }
};

const TOPPING_ICONS = { nuts: "🥜", sprinkles: "✨", cherry: "🍒" };

function fallbackPalette(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  const hue = Math.abs(h) % 360;
  return { base: `hsl(${hue},85%,82%)`, shade: `hsl(${hue},80%,70%)`, chip: `hsl(${hue},60%,45%)` };
}
function palette(flavor) {
  if (!flavor) return { base: "#e2e8f0", shade: "#cbd5e1", chip: "#94a3b8" };
  return FLAVOR_COLORS[String(flavor).toLowerCase().trim()] || fallbackPalette(String(flavor).toLowerCase().trim());
}

/* ---- SVG builders ------------------------------------------------------ */
function bowlSVG() {
  const d = document.createElement("div");
  d.className = "cup-svg-wrap";
  d.innerHTML = `
    <svg viewBox="0 0 110 54" width="100%" height="100%">
      <ellipse cx="55" cy="10" rx="48" ry="8" fill="#ffffff" stroke="#e11d48" stroke-width="3"/>
      <path d="M10 10 C14 42, 96 42, 100 10 Z" fill="#ffe4e6" stroke="#e11d48" stroke-width="3"/>
      <path d="M30 15 L36 33 M55 17 L55 36 M80 15 L74 33" stroke="#fb7185" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="36" y="36" width="38" height="9" rx="4.5" fill="#fb7185" stroke="#e11d48" stroke-width="2.5"/>
    </svg>`;
  return d;
}

function scoopSVG(flavor) {
  const pal = palette(flavor);
  const div = document.createElement("div");
  div.className = "scoop-item";
  div.title = "scoop: " + flavor;
  div.innerHTML = `
    <svg viewBox="0 0 80 46" width="100%" height="100%">
      <path d="M8 34 C8 6, 72 6, 72 34 C76 34, 78 42, 70 42 C63 42, 60 37, 54 41 C47 44, 33 44, 26 41 C20 37, 17 42, 10 42 C2 42, 4 34, 8 34 Z"
            fill="${pal.base}" stroke="#3d2214" stroke-width="2.5"/>
      <path d="M22 18 Q34 11 48 15" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
      <circle cx="28" cy="26" r="2" fill="${pal.chip}"/>
      <circle cx="52" cy="24" r="2.2" fill="${pal.chip}"/>
      <circle cx="40" cy="31" r="1.8" fill="${pal.chip}"/>
    </svg>`;
  return div;
}

function sauceSVG(flavor) {
  const pal = palette(flavor || "chocolate");
  const div = document.createElement("div");
  div.className = "sauce-item";
  div.title = "sauce: " + flavor;
  div.innerHTML = `
    <svg viewBox="0 0 76 22" width="100%" height="100%">
      <path d="M6 6 Q38 0 70 6 Q72 14 66 14 Q60 14 58 9 Q50 21 44 21 Q38 21 36 10 Q26 19 20 19 Q14 19 12 10 Q4 14 6 6 Z"
            fill="${pal.base}" stroke="#3d2214" stroke-width="2"/>
    </svg>`;
  return div;
}

function toppingEl(name) {
  const d = document.createElement("div");
  d.className = "topping-item";
  d.textContent = TOPPING_ICONS[name] || "⭐";
  d.title = "topping: " + name;
  return d;
}

/* ---- Bear SVG with mood faces ----------------------------------------- */
const BEAR_BODY = `
  <svg id="bear-svg" viewBox="0 0 120 124" width="102" height="112" role="img" aria-label="Customer Bear">
    <ellipse cx="60" cy="112" rx="34" ry="7" fill="#3d2214" opacity="0.18"/>
    <circle cx="30" cy="30" r="17" fill="#b98a5f"/>
    <circle cx="90" cy="30" r="17" fill="#b98a5f"/>
    <circle cx="30" cy="30" r="8" fill="#e9b98f"/>
    <circle cx="90" cy="30" r="8" fill="#e9b98f"/>
    <circle cx="60" cy="64" r="44" fill="#c99967"/>
    <ellipse cx="60" cy="78" rx="26" ry="18" fill="#eec9a2"/>
    <circle cx="60" cy="66" r="6.5" fill="#3d2214"/>
    <ellipse cx="60" cy="82" rx="9" ry="6" fill="#3d2214" opacity="0.9"/>
    <g id="bear-face-expr"></g>
  </svg>`;

const BEAR_MOODS = {
  happy: `
    <path d="M39 52 Q45 45 51 52" fill="none" stroke="#2b1708" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M69 52 Q75 45 81 52" fill="none" stroke="#2b1708" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M50 69 Q60 82 70 69 Z" fill="#e11d48" stroke="#3d2214" stroke-width="2.5"/>`,
  thinking: `
    <circle cx="45" cy="52" r="4.5" fill="#2b1708"/><circle cx="46.5" cy="50.5" r="1.5" fill="#fff"/>
    <circle cx="75" cy="52" r="4.5" fill="#2b1708"/><circle cx="76.5" cy="50.5" r="1.5" fill="#fff"/>
    <circle cx="63" cy="75" r="4" fill="#3d2214"/>`,
  oops: `
    <circle cx="45" cy="54" r="4.5" fill="#2b1708"/><circle cx="46.5" cy="52.5" r="1.5" fill="#fff"/>
    <circle cx="75" cy="54" r="4.5" fill="#2b1708"/><circle cx="76.5" cy="52.5" r="1.5" fill="#fff"/>
    <path d="M52 77 Q60 71 68 77" fill="none" stroke="#3d2214" stroke-width="3" stroke-linecap="round"/>`,
  default: `
    <circle cx="45" cy="54" r="4.5" fill="#2b1708"/><circle cx="43.5" cy="52.5" r="1.5" fill="#fff"/>
    <circle cx="75" cy="54" r="4.5" fill="#2b1708"/><circle cx="73.5" cy="52.5" r="1.5" fill="#fff"/>
    <path d="M53 74 Q60 80 67 74" fill="none" stroke="#3d2214" stroke-width="3" stroke-linecap="round"/>`
};

function setBearMood(mood) {
  const g = $("bear-svg #bear-face-expr");
  const svg = $("bear-svg");
  if (!g || !svg) return;
  svg.classList.toggle("bear-bounce", mood === "happy");
  g.innerHTML = BEAR_MOODS[mood] || BEAR_MOODS.default;
}

/* ---- Scene DOM --------------------------------------------------------- */
export function init(container) {
  root = container;
  root.innerHTML = `
    <div class="shop">
      <div class="shop-top-bar">
        <div id="order"></div>
      </div>
      <div class="stage-arena">
        <div class="bear-box">${BEAR_BODY}</div>
        <div id="bowl">${bowlSVG().outerHTML}</div>
        <div class="cognitive-hud">
          <div id="bubble">🤔 Think…</div>
        </div>
      </div>
    </div>
  `;
  setBearMood("default");
  keepCodeVisible();
  /* Move stepbar to left panel */
  const stepbar = document.getElementById("stepbar");
  const actionRow = document.querySelector(".card-panel:first-child .action-row");
  if (stepbar && actionRow) {
    actionRow.parentNode.appendChild(stepbar);
  }
  setTimeout(() => { guideStage("read"); hookGuide(); hookCodeSave(); hookCodeRestore(); }, 50);
}

export function render(env, meta = {}) {
  const order = $("#order");
  const stepbar = document.getElementById("stepbar");
  const running = stepbar && !stepbar.hidden;
  if (order) {
    if (!running) {
      order.textContent = "";
    } else if (env.n !== undefined && env.n !== -1) {
      order.textContent = `🧾 Order: ${py(env.n)} scoops`;
    } else if (env.order !== undefined) {
      order.textContent = `🧾 Order: ${py(env.order)}`;
    } else {
      order.textContent = "";
    }
  }
  const loopDial = $("#loop-dial");
  if (loopDial) {
    loopDial.textContent = env.i !== undefined ? `🔁 Loop round ${env.i + 1}` : "🔁 Loop —";
  }
  }

export function reset() {
  const bowl = $("#bowl");
  if (bowl) {
    bowl.querySelectorAll(".scoop-item, .sauce-item, .topping-item").forEach(n => n.remove());
  }
  setBearMood("default");
  }

export async function play(name, { setBubble, out } = {}) {
  const bowl = $("#bowl");
  const a = out === undefined || out === null ? "" : String(out);
  const bs = setBubble || (t => { const b = $("#bubble"); if (b) b.textContent = t; });
  if (name == "scoop") {
    bs("🍨 scoop(" + a + ")!");
    setBearMood("happy");
    if (bowl) bowl.appendChild(scoopSVG(a));
    await sleep(750);
  } else if (name == "sauce") {
    bs("🍫 sauce(" + a + ")!");
    if (bowl) bowl.appendChild(sauceSVG(a));
    await sleep(800);
  } else {
    bs("✨ topping(" + a + ")!");
    if (bowl) bowl.appendChild(toppingEl(a));
    await sleep(600);
  }
  setBearMood("default");
}