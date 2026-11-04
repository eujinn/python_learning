/* Echo Parrot scene — the right-pane display for L1 PyPrint. */

let root;
let consoleEl;
let parrotEl;
let lineCount = 0;

export function init(container) {
  root = container;
  root.innerHTML = `
    <div class="scene ep-scene">
      <div class="ep-bubble" id="bubble"></div>
      <div class="ep-sky">
        <div class="ep-parrot" id="ep-parrot">\ud83e\udd9c</div>
        <div class="ep-console-wrap">
          <div class="ep-console-hdr">\ud83d\udce2 Parrot Output</div>
          <div class="ep-console" id="ep-console">
            <div class="ep-line ep-idle">\u25b6 Waiting for your message...</div>
          </div>
        </div>
        <div class="ep-hint">Type a print() command and press Run!</div>
      </div>
    </div>
  `;
  parrotEl = root.querySelector("#ep-parrot");
  consoleEl = root.querySelector("#ep-console");
  lineCount = 0;
}

export function render(env) {
  const idle = root.querySelector(".ep-idle");
  if (idle) return;
  const msg = root.querySelector(".ep-line:last-child");
  if (msg && !msg.classList.contains("ep-idle")) {
    const newIdle = document.createElement("div");
    newIdle.className = "ep-line ep-idle";
    newIdle.textContent = "\u25b6 Waiting for your message...";
    consoleEl.appendChild(newIdle);
  }
}

export function reset() {
  if (!consoleEl) return;
  consoleEl.innerHTML = "";
  lineCount = 0;
  if (parrotEl) {
    parrotEl.classList.remove("ep-bounce");
    void parrotEl.offsetWidth;
  }
  const idle = document.createElement("div");
  idle.className = "ep-line ep-idle";
  idle.textContent = "\u25b6 Waiting for your message...";
  consoleEl.appendChild(idle);
}

export async function play(name, { setBubble, out }) {
  if (name !== "print") {
    await new Promise(r => setTimeout(r, 100));
    return;
  }

  if (parrotEl) {
    parrotEl.classList.remove("ep-bounce");
    void parrotEl.offsetWidth;
    parrotEl.classList.add("ep-bounce");
  }

  const line = document.createElement("div");
  line.className = "ep-line ep-new";
  line.textContent = out !== undefined ? "\u25b6 " + out : "\u25b6 (empty)";
  if (consoleEl) {
    const idle = consoleEl.querySelector(".ep-idle");
    if (idle) idle.remove();
    consoleEl.appendChild(line);
    lineCount++;
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  if (setBubble) {
    const shown = out !== undefined ? (out.length > 50 ? out.slice(0, 50) + "\u2026" : out) : "(empty)";
    setBubble('\ud83e\udd9c The parrot repeats: "' + shown + '"');
  }

  await new Promise(r => setTimeout(r, 500));

  if (setBubble) setBubble("");

  if (parrotEl) {
    setTimeout(() => parrotEl.classList.remove("ep-bounce"), 300);
  }
}