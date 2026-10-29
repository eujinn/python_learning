/* For-Loop Outpost scene — a mecha patrolling a row of guard tiles.
   Implements the module scene API: init(root), render(env), reset(), play(name). */

const sleep = ms => new Promise(r => setTimeout(r, ms));
const py = v => v === true ? "True" : v === false ? "False" : JSON.stringify(v);

let root = null;
const $ = s => root ? root.querySelector(s) : null;

let tiles = 3;      // wall length rendered
let step = 0;       // tiles marched (drives mecha position)

export function init(container) {
  root = container;
  root.innerHTML = `
    <div class="scene fl-scene">
      <div class="sun" id="flSun">☀️</div>
      <div class="bubble" id="bubble"></div>
      <div class="fl-hud">
        <span class="fl-hud-chip" id="flRound">🔁 Round —</span>
        <span class="fl-hud-chip" id="flTotal">🧱 Wall 0</span>
        <span class="fl-hud-chip energy-chip" id="flEnergy">🔋 Energy —</span>
      </div>
      <div class="fl-field">
        <div class="fl-tiles" id="flTiles"></div>
        <div class="fl-mecha" id="flMecha">🤖</div>
        <div class="fl-drone" id="flDrone">🛸</div>
        <div class="fl-laser" id="flLaser"></div>
      </div>
    </div>
  `;
  buildTiles(3);
}

function buildTiles(n) {
  const wrap = $("#flTiles");
  if (!wrap) return;
  wrap.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const t = document.createElement("div");
    t.className = "fl-tile";
    const b = document.createElement("span");
    b.textContent = i + 1;
    t.appendChild(b);
    wrap.appendChild(t);
  }
}

function packTiles(n) {
  const wrap = $("#flTiles");
  if (!wrap) return;
  while (wrap.children.length > n) wrap.lastChild.remove();
  while (wrap.children.length < n) {
    const t = document.createElement("div");
    t.className = "fl-tile";
    const b = document.createElement("span");
    b.textContent = wrap.children.length + 1;
    t.appendChild(b);
    wrap.appendChild(t);
  }
}

function markTile() {
  const wrap = $("#flTiles");
  if (!wrap) return;
  Array.from(wrap.children).forEach((t, i) => t.classList.toggle("patrolled", i < step));
}

export function render(env) {
  const n = Math.max(1, +env.count || 3);
  if (n !== tiles) { tiles = n; packTiles(n); markTile(); }
  const total = $("#flTotal");
  if (total) total.textContent = `🧱 Wall ${n}`;
  const round = $("#flRound");
  if (round) round.textContent = env.i !== undefined ? `🔁 Round ${env.i + 1} / ${n}` : "🔁 Round —";
  const energy = $("#flEnergy");
  if (energy) energy.textContent = env.energy !== undefined ? `🔋 Energy ${py(env.energy)}` : "🔋 Energy —";
}

export function reset() {
  step = 0;
  markTile();
  const m = $("#flMecha");
  if (m) m.style.left = "6%";
  const drone = $("#flDrone");
  if (drone) drone.classList.remove("hit");
  const laser = $("#flLaser");
  if (laser) laser.classList.remove("fire");
  const bubble = $("#bubble");
  if (bubble) bubble.textContent = "";
}

export async function play(name, { setBubble } = {}) {
  const bubbleSet = setBubble || (t => { const b = $("#bubble"); if (b) b.textContent = t; });
  const m = $("#flMecha");
  if (name == "march") {
    bubbleSet("🤖 March!");
    step = Math.min(step + 1, Math.max(tiles - 1, 1));
    markTile();
    if (m) {
      const pct = 6 + (step / tiles) * 66;
      m.style.left = pct + "%";
    }
    await sleep(900);
  } else if (name == "fire") {
    bubbleSet("🎯 Fire!");
    const laser = $("#flLaser");
    if (laser) laser.classList.add("fire");
    const drone = $("#flDrone");
    if (drone) drone.classList.add("hit");
    await sleep(1200);
    if (laser) laser.classList.remove("fire");
    if (drone) drone.classList.remove("hit");
  } else {
    bubbleSet("🔋 Recharge!");
    const energy = $("#flEnergy");
    if (energy) energy.classList.add("pulse");
    await sleep(900);
    if (energy) energy.classList.remove("pulse");
  }
  bubbleSet("");
}