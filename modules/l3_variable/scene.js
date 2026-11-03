/* Variable Vault scene — the right-pane display for L3 Variable.
   RECAP exercises (no variables) show only a large Print Output panel.
   Once the student assigns a variable, the vault shelves take over.       */

let root;
let recapView;
let recapOut;
let vaultView;
let shelvesEl;
let outputEl;

const COLORS = ['#2a4f9e', '#16a34a', '#f59e0b', '#7c3aed', '#ef4444', '#0891b2'];

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

      <!-- RECAP VIEW: print output only -->
      <div class="vv-recap-view" id="vv-recap-view">
        <div class="vv-recap-hdr">🖨️ Print Output</div>
        <div class="vv-recap-out" id="vv-recap-out">
          <div class="vv-recap-hint">Press Run, then Next step to see your messages.</div>
        </div>
      </div>

      <!-- VAULT VIEW: shown once variables exist -->
      <div class="vv-vault-view" id="vv-vault-view" hidden>
        <div class="vv-hdr">📚 Variable Vault</div>
        <div class="vv-body">
          <div class="vv-shelves" id="vv-shelves"></div>
          <div class="vv-console">
            <div class="vv-console-hdr">🖨️ Output</div>
            <div class="vv-console-out" id="vv-console-out"></div>
          </div>
        </div>
        <div class="vv-legend">Store with <b>=</b>, look inside with <b>print()</b></div>
      </div>
    </div>
  `;
  recapView = root.querySelector("#vv-recap-view");
  recapOut = root.querySelector("#vv-recap-out");
  vaultView = root.querySelector("#vv-vault-view");
  shelvesEl = root.querySelector("#vv-shelves");
  outputEl = root.querySelector("#vv-console-out");
}

function showRecapView() {
  recapView.hidden = false;
  vaultView.hidden = true;
}

function showVaultView() {
  recapView.hidden = true;
  vaultView.hidden = false;
}

function clearRecap() {
  recapOut.innerHTML = '<div class="vv-recap-hint">Press Run, then Next step to see your messages.</div>';
}

export function render(env) {
  const liveVars = Object.keys(env).filter(k => k !== "want" && k !== "label" && k !== "pc");
  if (liveVars.length === 0) return;

  showVaultView();

  liveVars.forEach(key => {
    const value = env[key];
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
}

export function reset() {
  clearRecap();
  showRecapView();
  shelvesEl.innerHTML = "";
  outputEl.innerHTML = "";
}

export async function play(name, { setBubble, out }) {
  if (name === "print" && out !== undefined) {
    const recapLine = document.createElement("div");
    recapLine.className = "vv-recap-line vv-pop";
    recapLine.textContent = "🖨️ " + out;
    const hint = recapOut.querySelector(".vv-recap-hint");
    if (hint) hint.remove();
    recapOut.appendChild(recapLine);
    recapOut.scrollTop = recapOut.scrollHeight;

    const line = document.createElement("div");
    line.className = "vv-out-line vv-out-new";
    line.textContent = "> " + trunc(out, 40);
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;

    setBubble("🖨️ Printing: " + trunc(out, 30));
  } else if (name === "print") {
    setBubble("🖨️ Printing…");
  } else {
    setBubble("▶ " + name + "()");
  }
  await new Promise(r => setTimeout(r, 400));
  setBubble("");
}
