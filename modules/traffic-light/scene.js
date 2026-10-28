/* Traffic Light scene — renders the self-driving car simulation.
   Implements the module scene API: init(root), render(env), reset(), play(name). */

const sleep = ms => new Promise(r => setTimeout(r, ms));
const py = v => v === true ? "True" : v === false ? "False" : JSON.stringify(v);

let root = null;
const $ = s => root ? root.querySelector(s) : null;

export function init(container) {
  root = container;
  root.innerHTML = `
    <div class="scene">
      <div class="sun" id="sunE">☀️</div>
      <div class="deco" id="deco"></div>
      <svg class="gauge" id="gauge" viewBox="0 0 120 78" style="display:none" aria-hidden="true">
        <path d="M14 60A46 46 0 0 1 48.1 15.6" stroke="#2fbf71" stroke-width="9" fill="none"/>
        <path d="M48.1 15.6A46 46 0 0 1 106 60" stroke="#e5484d" stroke-width="9" fill="none"/>
        <text x="40" y="9" font-size="8" text-anchor="middle" fill="#222">50</text>
        <g id="needle" style="transform-origin:60px 60px;transition:transform .9s cubic-bezier(.3,1.4,.5,1)">
          <line x1="60" y1="60" x2="20" y2="60" stroke="#222" stroke-width="3" stroke-linecap="round"/>
        </g>
        <circle cx="60" cy="60" r="5" fill="#222"/>
        <text id="gnum" x="60" y="75" font-size="10" font-weight="700" text-anchor="middle" fill="#222">0</text>
      </svg>
      <div class="ground"></div>
      <div class="road"><div class="zebra"></div></div>
      <div class="pole">
        <div class="lamp" id="l-red"></div>
        <div class="lamp" id="l-yellow"></div>
        <div class="lamp" id="l-green"></div>
      </div>
      <div class="walker" id="walker" hidden>🚶</div>
      <div class="bubble" id="bubble"></div>
      <svg class="car" id="car" viewBox="0 0 100 50" aria-hidden="true">
        <rect x="4" y="22" width="92" height="20" rx="8" fill="#ef4444"/>
        <path d="M24 22 L34 8 H68 L80 22Z" fill="#f87171"/>
        <rect x="38" y="12" width="12" height="9" fill="#bfe3ff"/>
        <rect x="53" y="12" width="12" height="9" fill="#bfe3ff"/>
        <circle cx="26" cy="43" r="8" fill="#222"/>
        <circle cx="74" cy="43" r="8" fill="#222"/>
        <circle cx="26" cy="43" r="3" fill="#bbb"/>
        <circle cx="74" cy="43" r="3" fill="#bbb"/>
        <circle cx="93" cy="30" r="3" fill="#ffe066"/>
      </svg>
    </div>
    <div class="ruler" id="ruler" hidden>
      <div class="rl">📏 Road ruler: how far is the car ahead?</div>
      <div class="rt" id="rtrack">
        <div class="span" id="span"><span id="dlab">0 m</span></div>
        <div class="rc" id="me">🚗</div>
        <div class="rc" id="lead">🚙</div>
      </div>
    </div>
  `;
  buildRuler();
}

export function render(env) {
  ["red", "yellow", "green"].forEach(k => {
    const lamp = $("#l-" + k);
    if (lamp) lamp.classList.toggle("on", env.light === k);
  });
  const w = $("#walker");
  if (w) {
    w.hidden = env.path === undefined || env.path === "clear";
    w.textContent = env.path === "blocked" ? "🚧" : "🚶";
  }
  const sun = $("#sunE");
  if (sun) sun.textContent = env.weather === "rainy" ? "🌧️" : "☀️";
  const scene = $(".scene");
  if (scene) scene.style.filter = env.weather === "rainy" ? "brightness(.75)" : "none";
  const deco = $("#deco");
  if (deco) deco.textContent = env.siren === true ? "🚑" : env.zone === "school" ? "🏫" : "";

  const V = document.getElementById("vars");
  if (V) {
    V.innerHTML = "";
    const lb = document.createElement("span");
    lb.className = "lbl";
    lb.textContent = "Test values:";
    V.appendChild(lb);
    Object.entries(env).forEach(([k, v]) => {
      const e = document.createElement("span");
      e.className = "pill";
      e.textContent = k + " = " + py(v);
      V.appendChild(e);
    });
  }

  const g = $("#gauge");
  if (g) g.style.display = env.speed === undefined ? "none" : "block";

  const R = $("#ruler");
  if (R) R.hidden = env.distance === undefined;
  if (env.distance !== undefined) {
    const d = Math.max(0, +env.distance || 0), pc = Math.min(d, 20) / 20 * 100;
    const lead = $("#lead");
    if (lead) lead.style.left = pc + "%";
    const span = $("#span");
    if (span) span.style.width = pc + "%";
    const dlab = $("#dlab");
    if (dlab) dlab.textContent = env.distance + " m";
  }

  if (env.speed !== undefined) {
    const sp = Math.max(0, Math.min(120, +env.speed || 0));
    const needle = $("#needle");
    if (needle) needle.style.transform = "rotate(" + (sp / 120 * 180) + "deg)";
    const gnum = $("#gnum");
    if (gnum) gnum.textContent = env.speed + " km/h";
  }
}

export function reset() {
  const c = $("#car");
  if (c) {
    c.style.transition = "none";
    c.style.left = "-120px";
    void c.offsetWidth;
  }
  const bubble = $("#bubble");
  if (bubble) bubble.textContent = "";
}

export async function play(a, { setBubble } = {}) {
  const car = $("#car");
  const bubbleSet = setBubble || (t => { const b = $("#bubble"); if (b) b.textContent = t; });
  const STOP = "calc(46% - 110px)", END = "calc(100% + 20px)";
  if (!car) { await sleep(300); return; }
  if (a == "stop") {
    bubbleSet("🛑 Stop!");
    car.style.transition = "left 1.1s cubic-bezier(.2,.8,.2,1)";
    car.style.left = STOP;
    await sleep(1500);
  } else if (a == "slow") {
    bubbleSet("🟡 Slowing down… then stopping");
    car.style.transition = "left 3.4s cubic-bezier(.1,.6,.3,1)";
    car.style.left = STOP;
    await sleep(3700);
  } else if (a == "crawl") {
    bubbleSet("🐢 Driving slowly");
    car.style.transition = "left 6s linear";
    car.style.left = END;
    await sleep(6200);
  } else {
    bubbleSet("🟢 Go!");
    car.style.transition = "left 1.8s ease-in";
    car.style.left = END;
    await sleep(1900);
  }
  bubbleSet("");
}

function buildRuler() {
  const t = $("#rtrack");
  if (!t) return;
  for (let m = 0; m <= 20; m++) {
    const k = document.createElement("div");
    k.className = "tk" + (m % 5 == 0 ? " mj" : "");
    k.style.left = m / 20 * 100 + "%";
    if (m % 5 == 0) {
      const l = document.createElement("b");
      l.textContent = m + " m";
      k.appendChild(l);
    }
    t.appendChild(k);
  }
}