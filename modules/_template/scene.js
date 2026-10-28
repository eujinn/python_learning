/* Template module scene — a minimal proof that the scene API works.
   Copy this file into your module and replace with your own visuals. */

let counter = 0;
let root;

export function init(container) {
  root = container;
  root.innerHTML = `
    <div class="scene tpl-scene">
      <div class="bubble" id="bubble"></div>
      <div class="tpl-card">
        <div class="tpl-title">Template Output</div>
        <div class="tpl-row" id="tpl-mode">mode = "idle"</div>
        <div class="tpl-row" id="tpl-count">steps: 0 · last command: —</div>
      </div>
    </div>
  `;
  counter = 0;
}

export function render(env) {
  const el = root.querySelector("#tpl-mode");
  if (el) el.textContent = "mode = " + JSON.stringify(env.mode);
  const count = root.querySelector("#tpl-count");
  if (count) count.textContent = "steps: " + counter + " · last command: —";
}

export function reset() {
  const el = root.querySelector("#tpl-count");
  if (el) el.textContent = "steps: 0 · last command: —";
}

export async function play(name, { setBubble }) {
  counter++;
  if (setBubble) setBubble("▶ " + name + "()");
  const count = root.querySelector("#tpl-count");
  if (count) count.textContent = "steps: " + counter + " · last command: " + name + "()";
  await new Promise(r => setTimeout(r, 400));
  if (setBubble) setBubble("");
}