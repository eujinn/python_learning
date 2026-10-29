/* Interactive vocabulary pills + popup, driven by the active lesson. */

export function renderLearnFirst(lesson) {
  const els = {
    conceptTag: document.getElementById("conceptTag"),
    learnBody: document.getElementById("learnBody")
  };
  els.conceptTag.textContent = `📘 Concept: ${lesson.concept || ""}`;
  const lf = lesson.learnFirst || {};
  const body = els.learnBody;
  body.innerHTML = "";
  const items = [
    ["1. What is the problem?", lf.problem],
    ["2. What information do we know?", lf.knownInfo],
    ["3. What question does Python ask?", lf.pythonQuestion, true],
    ["4. Why does Python choose this path?", lf.whyPath],
    ["5. What action happens?", lf.action],
    ["6. What did we learn?", lf.learned]
  ];
  items.forEach(([labelText, text, isCode]) => {
    const d = document.createElement("div");
    d.className = "q6-item";
    const b = document.createElement("b");
    b.textContent = labelText;
    const span = document.createElement(isCode ? "code" : "span");
    span.textContent = text || "";
    d.append(b, span);
    body.appendChild(d);
  });
}

export function renderVocabulary(lesson) {
  const vBar = document.getElementById("vocabBar");
  const vPop = document.getElementById("vocabPop");
  vBar.innerHTML = "";
  vPop.hidden = true;
  if (Array.isArray(lesson.vocabulary) && lesson.vocabulary.length) {
    const lbl = document.createElement("span");
    lbl.style.fontSize = ".85rem";
    lbl.style.fontWeight = "700";
    lbl.style.color = "var(--muted)";
    lbl.textContent = "🔑 Python Words (tap to explain):";
    vBar.appendChild(lbl);
    lesson.vocabulary.forEach(v => {
      const btn = document.createElement("button");
      btn.className = "vocab-pill";
      btn.textContent = v.term;
      btn.onclick = () => {
        const already = btn.classList.contains("active") && !vPop.hidden;
        vBar.querySelectorAll(".vocab-pill").forEach(p => p.classList.remove("active"));
        if (already) {
          vPop.hidden = true;
        } else {
          btn.classList.add("active");
          vPop.hidden = false;
          vPop.textContent = `${v.term} → ${v.meaning}`;
        }
      };
      vBar.appendChild(btn);
    });
  }
}