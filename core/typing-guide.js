/* =========================================================================
   TYPING GUIDE (Guided Typing)
   Character-by-character guidance to build tactile muscle memory for Python
   syntax. The target is the lesson's canonical solution. The student types
   into the normal editor; this module renders which characters are correct,
   where the cursor is, and a kid-friendly clue for the next keystroke.
   ========================================================================= */

let targetCode = "";
let isGuidedMode = false;

/* Map Python punctuation & syntax to kid-friendly detective clues. */
export function getSyntaxClue(expectedChar, typedChar) {
  if (expectedChar === "#") return "A comment starts with # — Python ignores it, but humans read it!";
  if (expectedChar === "\n") return "End of this line — press [Enter ↵] to start the next line!";
  if (expectedChar === " ") return "Space needed here — press [Spacebar] between words and after commands.";
  if (expectedChar === '"' || expectedChar === "'") return `Strings need quotation marks ${expectedChar}...${expectedChar} so Python knows they are words!`;
  if (expectedChar === "(" || expectedChar === ")") return `Commands use parentheses '${expectedChar}' to hold arguments or inputs.`;
  if (expectedChar === "[" || expectedChar === "]") return `Square brackets '${expectedChar}' are used for Python lists.`;
  if (expectedChar === ":") return "Don't forget the colon ':' at the end of if, for, while, or def!";
  if (expectedChar === "=") return "One '=' saves a value into a variable. Two '==' checks if values match!";
  if (expectedChar === "+" || expectedChar === "-" || expectedChar === "*" || expectedChar === "/" || expectedChar === "%") return `Math operator '${expectedChar}' needed here.`;
  if (expectedChar === "<" || expectedChar === ">" || expectedChar === "!") return `Comparison operator '${expectedChar}' needed here.`;
  if (typedChar && expectedChar.toLowerCase() === typedChar.toLowerCase()) return `Check letter case: expected '${expectedChar}' (hold Shift for capital letters).`;
  if (expectedChar === " " || expectedChar === "\t") return "Indentation needed — press [Tab] (4 spaces) to start a block.";
  return `Type '${expectedChar}' to continue. Follow the glowing cursor!`;
}

/* Boolean mask: which characters belong to a comment (# ... to end of line). */
export function buildCommentMask(code) {
  const mask = [];
  let offset = 0;
  code.split("\n").forEach(line => {
    const isComment = line.trimStart().startsWith("#");
    for (let i = 0; i < line.length; i++) mask[offset + i] = isComment;
    mask[offset + line.length] = isComment;
    offset += line.length + 1;
  });
  return mask;
}

/* Render the target character-by-character with typed/pending/current states.
   Newlines are rendered as an end-of-line ↵ marker plus a real <br>, so the
   following line stays aligned with what the student types. */
export function renderTypingDisplay(dispElem, target, inputVal) {
  if (!dispElem) return;
  dispElem.innerHTML = "";
  const commentMask = buildCommentMask(target);
  const lines = target.split("\n");
  let idx = 0;

  lines.forEach((line, li) => {
    for (let j = 0; j < line.length; j++, idx++) {
      const span = document.createElement("span");
      const ch = line[j];
      let cls = "tg-char ";
      if (idx < inputVal.length) {
        cls += (inputVal[idx] === ch) ? "tg-ok " : "tg-bad ";
      } else if (idx === inputVal.length) {
        cls += "tg-cur ";
      } else {
        cls += "tg-pending ";
      }
      if (commentMask[idx] && !(idx < inputVal.length)) cls += "tg-comment ";
      span.className = cls.trim();
      span.textContent = ch;
      dispElem.appendChild(span);
    }

    if (li < lines.length - 1) {
      const nl = document.createElement("span");
      let cls = "tg-char tg-nlmark ";
      if (idx < inputVal.length) cls += (inputVal[idx] === "\n") ? "tg-ok " : "tg-bad ";
      else if (idx === inputVal.length) cls += "tg-cur ";
      else cls += "tg-pending ";
      nl.className = cls.trim();
      nl.textContent = "↵";
      dispElem.appendChild(nl);
      dispElem.appendChild(document.createElement("br"));
      idx++;
    }
  });
}

/* Compare typed input against the target and produce a clue. */
export function evaluateTyping(target, inputVal) {
  const isMatch = (target === inputVal);
  let isCorrectPrefix = true;
  let firstMismatchIndex = -1;

  const checkLen = Math.min(target.length, inputVal.length);
  for (let i = 0; i < checkLen; i++) {
    if (target[i] !== inputVal[i]) {
      isCorrectPrefix = false;
      firstMismatchIndex = i;
      break;
    }
  }

  let clue = "";
  if (!isMatch && inputVal.length > 0) {
    const lastIdx = inputVal.length - 1;
    if (lastIdx < target.length) {
      if (inputVal[lastIdx] !== target[lastIdx]) clue = getSyntaxClue(target[lastIdx], inputVal[lastIdx]);
    } else {
      clue = "Too much text typed! Press Backspace to match the solution.";
    }
  }

  return {
    isMatch,
    isCorrectPrefix,
    firstMismatchIndex,
    clue,
    progress: Math.min(inputVal.length, target.length),
    total: target.length
  };
}

/* State controller */
export function setTypingLesson(lesson) {
  const src = lesson && (lesson.solution || lesson.starterCode || "");
  targetCode = String(src || "").replace(/\s+$/, "");
}

export function getTargetCode() {
  return targetCode;
}

export function setGuidedMode(active) {
  isGuidedMode = !!active;
}

export function getGuidedMode() {
  return isGuidedMode;
}
