/* Progressive 3-tier hint system, driven by the active lesson. */

let hintTier = 0;

export function resetHints(els) {
  hintTier = 0;
  els.hintBtn.textContent = "💡 Hint 1: Concept Clue";
  els.hintPanel.hidden = true;
  els.hintPanel.innerHTML = "";
}

export function advanceHint(els, lesson) {
  const hints = lesson.hints || [];
  const panel = els.hintPanel;
  panel.hidden = false;
  panel.innerHTML = "";

  if (hintTier === 0) {
    hintTier = 1;
    const b = document.createElement("b");
    b.textContent = "💡 Hint 1 — Concept Clue: ";
    panel.append(b, document.createTextNode(hints[0] || ""));
    els.hintBtn.textContent = "💡 Hint 2: Structure Guide";
  } else if (hintTier === 1) {
    hintTier = 2;
    const b = document.createElement("b");
    b.textContent = "🧩 Hint 2 — Structure Guide:";
    const pre = document.createElement("pre");
    pre.textContent = hints[1] || "";
    panel.append(b, pre);
    els.hintBtn.textContent = "💡 Hint 3: Guided Correction";
  } else {
    hintTier = 0;
    const b = document.createElement("b");
    b.textContent = "🎯 Hint 3 — Guided Correction: ";
    panel.append(b, document.createTextNode(hints[2] || ""));
    if (Array.isArray(lesson.commonMistakes) && lesson.commonMistakes.length) {
      const ul = document.createElement("div");
      ul.style.marginTop = "6px";
      ul.style.fontSize = ".86rem";
      ul.textContent = "⚠️ Watch out for: " + lesson.commonMistakes.join(" · ");
      panel.appendChild(ul);
    }
    els.hintBtn.textContent = "💡 Restart Hints (Hint 1)";
  }
}