/* Variable Vault scene — the right-pane display for L3 Variable. */

let root;
let shelvesEl;
let outputEl;

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#7c3aed', '#ef4444', '#0891b2'];

function varColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return COLORS[Math.abs(h) % COLORS.length];
}

function fmt(val) {
  if (val === true) return "True";
  if (val === false) return "False";
  if (typeof val === "string") return '"' + val + '"';
  return String(val);
}

function trunc(s, n) {
  return s.length > n ? s.slice(0, n) + "\u2026" : s;
}

export function init(container) {
  root = container;
  root.innerHTML = `
    <div class="scene vv-scene">
      <div class="bubble" id="bubble"></div>
      <div class="vv-hdr">\ud83d\udcda Variable Vault</div>
      <div class="vv-body">
        <div class="vv-shelves" id="vv-shelves">
          <div class="vv-empty">\ud83d\udd12 No variables yet. Assign one in your code!</div>
        </div>
        <div class="vv-console">
          <div class="vv-console-hdr">\ud83d\udda8\ufe0f Output</div>
          <div class="vv-console-out" id="vv-console-out"></div>
        </div>
      </div>
      <div class="vv-legend">Store with <b>=</b>, look inside with <b>print()</b></div>
    </div>
  `;
  shelvesEl = root.querySelector("#vv-shelves");
  outputEl = root.querySelector("#vv-console-out");
}

export function render(env) {
  Object.entries(env).forEach(([key, value]) => {
    if (key === "want" || key === "label") return;
    const color = varColor(key);
    const display = fmt(value);
    const existing = root.querySelector(`[data-var="${CSS.escape(key)}"]`);
    if (existing) {
      const valEl = existing.querySelector(".vv-val");
      if (valEl.textContent !== display) {
        valEl.textContent = display;
        existing.classList.remove("vv-pop");
        void existing.offsetWidth;
        existing.classList.add("vv-pop");
      }
    } else {
      const box = document.createElement("div");
      box.className = "vv-box vv-pop";
      box.dataset.var = key;
      box.style.setProperty("--box-c", color);
      box.innerHTML =
        '<div class="vv-label">' + key + '</div>' +
        '<div class="vv-body-inner"><div class="vv-val">' + display + '</div></div>';
      shelvesEl.appendChild(box);
    }
  });
  const empty = shelvesEl.querySelector(".vv-empty");
  if (empty && shelvesEl.children.length > 0) empty.remove();
}

export function reset() {
  shelvesEl.innerHTML =
    '<div class="vv-empty">\ud83d\udd12 No variables yet. Assign one in your code!</div>';
  outputEl.innerHTML = "";
}

export async function play(name, { setBubble, out }) {
  if (name === "print" && out !== undefined) {
    const line = document.createElement("div");
    line.className = "vv-out-line vv-out-new";
    line.textContent = "> " + trunc(out, 40);
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
    setBubble("\ud83d\udda8\ufe0f Printing: " + trunc(out, 30));
  } else if (name === "print") {
    setBubble("\ud83d\udda8\ufe0f Printing\u2026");
  } else {
    setBubble("\u25b6 " + name + "()");
  }
  await new Promise(r => setTimeout(r, 400));
  setBubble("");
}