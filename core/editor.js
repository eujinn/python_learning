/* Code editor line-number gutter renderer.
   Syncs .editor-gutter line numbers to textarea#code. Pure module-safe:
   finds the elements by class each call, so it works regardless of layout. */

export function renderGutter() {
  const ta = document.getElementById("code");
  const gutter = document.querySelector(".editor-gutter");
  if (!ta || !gutter) return;
  const lines = ta.value.split("\n").length;
  const more = Math.max(lines, 1);
  const frag = document.createDocumentFragment();
  for (let i = 1; i <= more; i++) {
    const d = document.createElement("div");
    d.textContent = i;
    frag.appendChild(d);
  }
  gutter.innerHTML = "";
  gutter.appendChild(frag);
}