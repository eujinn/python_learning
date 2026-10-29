/* For Loop — Ice Cream Machine scene: serve scoops of ice cream to Customer Bear.
   Implements the module scene API: init(root), render(env), reset(), play(name, arg). */

const sleep = ms => new Promise(r => setTimeout(r, ms));
const py = v => v === true ? "True" : v === false ? "False" : JSON.stringify(v);

let root = null;
const $ = s => root ? root.querySelector(s) : null;

const FLAVOR_COLORS = {
  vanilla: "#fef3c7",
  strawberry: "#f9a8d4",
  mango: "#fcd34d",
  chocolate: "#a16207",
  mint: "#86efac",
  blueberry: "#93c5fd"
};

export function init(container) {
  root = container;
  root.innerHTML = `
    <div class="scene ic-scene">
      <div class="ic-awning">🍦 Bear's Ice Cream Academy</div>
      <div class="bubble" id="bubble"></div>
      <div class="ic-stage">
        <div class="ic-customer" id="icCustomer">🧸</div>
        <div class="ic-bowl">
          <div class="ic-cone" id="icCone"></div>
          <div class="ic-scoops" id="icScoops"></div>
          <div class="ic-sauce" id="icSauce"></div>
          <div class="ic-toppings" id="icToppings"></div>
        </div>
      </div>
      <div class="ic-hud">
        <span class="fl-hud-chip" id="icCount">🍦 Scoops: 0</span>
        <span class="fl-hud-chip" id="icOrder">🧾 Order: —</span>
      </div>
    </div>
  `;
}

export function render(env) {
  const count = $("#icCount");
  if (count) {
    const scoops = $("#icScoops");
    const n = scoops ? scoops.children.length : 0;
    count.textContent = "🍦 Scoops: " + n;
  }
  const order = $("#icOrder");
  if (order) {
    order.textContent = env.n !== undefined ? `🧾 Order: ${py(env.n)} scoops` : "🧾 Order: —";
  }
  const customer = $("#icCustomer");
  if (customer) {
    if (env.i !== undefined) customer.textContent = "🧸";
  }
}

export function reset() {
  const scoops = $("#icScoops");
  if (scoops) scoops.innerHTML = "";
  const sauce = $("#icSauce");
  if (sauce) sauce.innerHTML = "";
  const toppings = $("#icToppings");
  if (toppings) toppings.innerHTML = "";
  render({});
  const bubble = $("#bubble");
  if (bubble) bubble.textContent = "";
}

function addScoop(flavor) {
  const wrap = $("#icScoops");
  if (!wrap) return;
  const d = document.createElement("div");
  d.className = "ic-scoop";
  d.style.background = FLAVOR_COLORS[flavor] || "#f8fafc";
  d.style.borderColor = FLAVOR_COLORS[flavor] || "#cbd5e1";
  d.textContent = "🍨";
  wrap.appendChild(d);
}

function addSauce(flavor) {
  const wrap = $("#icSauce");
  if (!wrap) return;
  const d = document.createElement("div");
  d.className = "ic-sauce-drop";
  d.style.background = flavor === "chocolate" ? "#78350f" : "#c2410c";
  wrap.appendChild(d);
}

function addTopping(item) {
  const wrap = $("#icToppings");
  if (!wrap) return;
  const d = document.createElement("div");
  d.className = "ic-topping";
  d.textContent = item === "sprinkles" ? "✨" : item === "cherry" ? "🍒" : "🍫";
  wrap.appendChild(d);
}

export async function play(name, arg, { setBubble } = {}) {
  const bubbleSet = setBubble || (t => { const b = $("#bubble"); if (b) b.textContent = t; });
  const a = arg === undefined || arg === null ? "" : String(arg);
  if (name == "scoop") {
    bubbleSet("🍨 scoop(" + a + ")!");
    addScoop(a);
    render({});
    await sleep(700);
  } else if (name == "sauce") {
    bubbleSet("🍫 sauce(" + a + ")!");
    addSauce(a);
    await sleep(800);
  } else {
    bubbleSet("✨ topping(" + a + ")!");
    addTopping(a);
    await sleep(600);
  }
  bubbleSet("");
}