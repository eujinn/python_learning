/* =========================================================================
   Lesson 14 — List: Adventure Backpack Scene
   Interactive visualizer for Python list indexing, mutation & append.
   ========================================================================= */

let root;
let currentInventory = [];
let selectedSlot = null;

const ITEM_ICONS = {
  potion: "🧪",
  map: "🗺️",
  torch: "🔦",
  lantern: "🏮",
  compass: "🧭",
  gem: "💎",
  crystal: "💎",
  cookie: "🍪",
  apple: "🍎",
  shield: "🛡️",
  sword: "⚔️",
  key: "🔑",
  gold: "🪙",
  coin: "🪙",
  bread: "🥖",
  dango: "🍡",
  scroll: "📜",
  book: "📖",
  pencil: "✏️",
  notebook: "📓",
  water: "💧"
};

function getIcon(itemName) {
  if (!itemName) return "✨";
  const clean = String(itemName).toLowerCase().replace(/[^a-z]/g, "");
  return ITEM_ICONS[clean] || "🎒";
}

export function init(container) {
  root = container;
  selectedSlot = null;
  currentInventory = ["potion", "map", "torch"];

  root.innerHTML = `
    <div class="bp-stage">
      <div id="bubble" class="bubble"></div>

      <div class="bp-backpack-card">
        <div class="bp-header">
          <div class="bp-title-wrap">
            <span class="bp-pack-icon">🎒</span>
            <span class="bp-title">Adventure Backpack</span>
          </div>
          <div class="bp-counter-pill" id="bp-counter">
            <span class="bp-counter-dot"></span>
            <span id="bp-counter-text">len = 3 items</span>
          </div>
        </div>

        <div class="bp-slots-grid" id="bp-slots-grid">
          <!-- Rendered dynamically -->
        </div>

        <div class="bp-code-ribbon" id="bp-code-ribbon">
          <span class="bp-code-ribbon-label">List View:</span>
          <span class="bp-code-syntax" id="bp-code-syntax">inventory = []</span>
        </div>
      </div>

      <div class="bp-inspector" id="bp-inspector">
        <div class="bp-inspector-text" id="bp-inspector-text">
          <span>👆 Click any slot above to inspect its index and Python code!</span>
        </div>
      </div>

      <div class="bp-stash-card">
        <div class="bp-stash-header">
          <span>🧰 Gear Chest (Click an item to see how to code it):</span>
        </div>
        <div class="bp-stash-items">
          <button type="button" class="bp-stash-btn" data-item="compass">🧭 "compass"</button>
          <button type="button" class="bp-stash-btn" data-item="apple">🍎 "apple"</button>
          <button type="button" class="bp-stash-btn" data-item="cookie">🍪 "cookie"</button>
          <button type="button" class="bp-stash-btn" data-item="lantern">🏮 "lantern"</button>
          <button type="button" class="bp-stash-btn" data-item="gem">💎 "gem"</button>
          <button type="button" class="bp-stash-btn" data-item="shield">🛡️ "shield"</button>
        </div>
      </div>
    </div>
  `;

  // Attach gear chest interactive click listeners
  const stashButtons = root.querySelectorAll(".bp-stash-btn");
  stashButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.dataset.item;
      const inspectorText = root.querySelector("#bp-inspector-text");
      if (inspectorText) {
        inspectorText.innerHTML = `
          <span>Idea for your code:</span>
          <span class="bp-code-badge" title="Click to copy">"${item}"</span>
          <span>· Add to list: <code style="color:#0284c7;font-weight:700;">inventory.append("${item}")</code></span>
        `;
      }
    });
  });

  renderInventory(currentInventory);
}

function renderInventory(items, options = {}) {
  const grid = root ? root.querySelector("#bp-slots-grid") : null;
  if (!grid) return;

  const list = Array.isArray(items) ? items : [];
  currentInventory = list;

  // Update counter
  const counterText = root.querySelector("#bp-counter-text");
  if (counterText) {
    counterText.textContent = `len = ${list.length} item${list.length === 1 ? "" : "s"}`;
  }

  // Update code ribbon
  const codeSyntax = root.querySelector("#bp-code-syntax");
  if (codeSyntax) {
    if (!list.length) {
      codeSyntax.innerHTML = `<span class="bp-kw">inventory</span> = <span class="bp-punct">[]</span>`;
    } else {
      const itemsHtml = list.map((it, idx) => {
        const val = typeof it === "string" ? `"${it}"` : String(it);
        return `<span class="bp-str" data-idx="${idx}">${val}</span>`;
      }).join(`<span class="bp-punct">, </span>`);
      codeSyntax.innerHTML = `<span class="bp-kw">inventory</span> = <span class="bp-punct">[</span> ${itemsHtml} <span class="bp-punct">]</span>`;
    }
  }

  // Render slots
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML = `
      <div class="bp-slot empty-slot">
        <div class="bp-slot-index"><span class="bp-idx-num">[ 0 ]</span></div>
        <div class="bp-slot-icon">📦</div>
        <div class="bp-slot-name">empty</div>
        <div class="bp-slot-type">list is empty</div>
      </div>
    `;
    return;
  }

  list.forEach((item, index) => {
    const slotEl = document.createElement("div");
    slotEl.className = "bp-slot";
    slotEl.dataset.index = index;

    if (selectedSlot === index) {
      slotEl.classList.add("inspected");
    }
    if (options.highlightIndex === index) {
      slotEl.classList.add("highlight-glow");
    }
    if (options.swappedIndex === index) {
      slotEl.classList.add("swapped");
    }
    if (options.newlyAddedIndex === index) {
      slotEl.classList.add("newly-added");
    }

    const icon = getIcon(item);
    const displayVal = typeof item === "string" ? `"${item}"` : String(item);
    const valType = Array.isArray(item) ? "list" : typeof item;

    slotEl.innerHTML = `
      <div class="bp-slot-index">
        <span>index</span> <span class="bp-idx-num">[${index}]</span>
      </div>
      <div class="bp-slot-icon">${icon}</div>
      <div class="bp-slot-name">${displayVal}</div>
      <div class="bp-slot-type">${valType}</div>
    `;

    slotEl.addEventListener("click", () => {
      selectSlot(index, item);
    });

    grid.appendChild(slotEl);
  });
}

function selectSlot(index, item) {
  selectedSlot = index;
  if (!root) return;
  const allSlots = root.querySelectorAll(".bp-slot");
  allSlots.forEach(s => s.classList.remove("inspected"));

  const target = root.querySelector(`.bp-slot[data-index="${index}"]`);
  if (target) target.classList.add("inspected");

  const inspectorText = root.querySelector("#bp-inspector-text");
  if (inspectorText) {
    const displayVal = typeof item === "string" ? `"${item}"` : String(item);
    inspectorText.innerHTML = `
      <span>Pocket <b>[${index}]</b> holds:</span>
      <span class="bp-code-badge">${displayVal}</span>
      <span>· Access in Python: <code style="color:#2563eb;font-weight:700;">inventory[${index}]</code></span>
    `;
  }
}

export function render(env) {
  if (!root) return;
  let list = null;
  if (env && Array.isArray(env.inventory)) {
    list = env.inventory;
  } else if (env && typeof env === "object") {
    for (const k of Object.keys(env)) {
      if (Array.isArray(env[k])) {
        list = env[k];
        break;
      }
    }
  }

  if (list) {
    let swappedIndex = null;
    let newlyAddedIndex = null;

    if (list.length > currentInventory.length && currentInventory.length > 0) {
      newlyAddedIndex = list.length - 1;
    } else if (list.length === currentInventory.length && currentInventory.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] !== currentInventory[i]) {
          swappedIndex = i;
          break;
        }
      }
    }

    renderInventory(list, {
      swappedIndex,
      newlyAddedIndex
    });
  }
}

export function reset() {
  selectedSlot = null;
  if (root) {
    const allSlots = root.querySelectorAll(".bp-slot");
    allSlots.forEach(s => {
      s.classList.remove("highlight-glow", "swapped", "newly-added", "inspected");
    });
    const bubble = root.querySelector("#bubble");
    if (bubble) bubble.textContent = "";
  }
}

export async function play(name, ctx = {}) {
  if (!root) return;
  const setBubble = ctx.setBubble;

  if (name === "print") {
    // Determine the specific slot being accessed/printed
    let targetIndex = null;

    // 1. Inspect the actively highlighted trace line in #view
    const hlLine = document.querySelector("#view .ln.hl");
    const lineText = hlLine ? hlLine.textContent : "";
    const idxMatch = lineText.match(/\[\s*(\d+)\s*\]/);
    if (idxMatch) {
      targetIndex = parseInt(idxMatch[1], 10);
    }

    // 2. If not found in trace text, check ctx.args / ctx.event.args
    const args = ctx.args || (ctx.event && ctx.event.args);
    if (targetIndex === null && Array.isArray(args) && args.length > 0) {
      const printedVal = args[0];
      const matchIdx = currentInventory.indexOf(printedVal);
      if (matchIdx !== -1) {
        targetIndex = matchIdx;
      }
    }

    // 3. Fallback: check #code editor line by line number from ctx.event.n or hlLine
    if (targetIndex === null) {
      const lineNum = (ctx.event && ctx.event.n) || (hlLine ? parseInt(hlLine.dataset.n, 10) : null);
      const codeEl = document.getElementById("code");
      if (codeEl && lineNum) {
        const lines = codeEl.value.split("\n");
        const codeLine = lines[lineNum - 1] || "";
        const m = codeLine.match(/\[\s*(\d+)\s*\]/);
        if (m) targetIndex = parseInt(m[1], 10);
      }
    }

    // Clear previous glow
    const allSlots = root.querySelectorAll(".bp-slot");
    allSlots.forEach(s => s.classList.remove("highlight-glow"));

    // Highlight ONLY the specific slot that was printed!
    if (targetIndex !== null && targetIndex >= 0 && targetIndex < currentInventory.length) {
      const slotEl = root.querySelector(`.bp-slot[data-index="${targetIndex}"]`);
      if (slotEl) {
        slotEl.classList.add("highlight-glow");
        selectSlot(targetIndex, currentInventory[targetIndex]);
        if (setBubble) setBubble(`🔍 print(inventory[${targetIndex}]) ➔ "${currentInventory[targetIndex]}"`);
      }
    } else {
      // General print fallback if whole inventory is printed
      allSlots.forEach(s => s.classList.add("highlight-glow"));
      if (setBubble) setBubble("🔍 print() reads backpack!");
    }

    await new Promise(r => setTimeout(r, 650));
    allSlots.forEach(s => s.classList.remove("highlight-glow"));
    if (setBubble) setBubble("");
  } else if (name && name.includes("append")) {
    const lastIdx = Math.max(0, currentInventory.length - 1);
    const slotEl = root.querySelector(`.bp-slot[data-index="${lastIdx}"]`);
    if (slotEl) {
      slotEl.classList.add("newly-added", "highlight-glow");
    }
    if (setBubble) setBubble(`💎 .append() added a new item to slot [${lastIdx}]!`);
    await new Promise(r => setTimeout(r, 650));
    if (slotEl) slotEl.classList.remove("highlight-glow");
    if (setBubble) setBubble("");
  } else {
    if (setBubble) setBubble(`▶ ${name}()`);
    await new Promise(r => setTimeout(r, 400));
    if (setBubble) setBubble("");
  }
}
