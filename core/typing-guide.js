/* =========================================================================
   TYPING GUIDE MODULE (v1)
   Provides interactive character-by-character guided typing to build
   tactile muscle memory for Python syntax without hardcoding lesson data.
   ========================================================================= */

let activeLesson = null;
let targetCode = "";
let currentInput = "";
let isGuidedMode = false;
let clueCallback = null;
let completeCallback = null;

/* Map Python punctuation & syntax to kid-friendly detective clues */
export function getSyntaxClue(expectedChar, typedChar) {
  if (expectedChar === "#") {
    return "A comment starts with # — Python ignores it, but humans read it!";
  }
  if (expectedChar === "\n") {
    return "End of this line — press [Enter ↵] to start the next line!";
  }
  if (expectedChar === " ") {
    return "Space needed here — press [Spacebar] between words and after commands.";
  }
  if (expectedChar === '"' || expectedChar === "'") {
    return `Strings need quotation marks ${expectedChar}...${expectedChar} so Python knows they are words!`;
  }
  if (expectedChar === "(" || expectedChar === ")") {
    return `Commands use parentheses '${expectedChar}' to hold arguments or inputs.`;
  }
  if (expectedChar === "[" || expectedChar === "]") {
    return `Square brackets '${expectedChar}' are used for Python lists.`;
  }
  if (expectedChar === ":") {
    return "Don't forget the colon ':' at the end of if, for, while, or def!";
  }
  if (expectedChar === "=") {
    return "One '=' saves a value into a variable. Two '==' checks if values match!";
  }
  if (expectedChar === "+" || expectedChar === "-" || expectedChar === "*" || expectedChar === "/" || expectedChar === "%") {
    return `Math operator '${expectedChar}' needed here.`;
  }
  if (expectedChar === "<" || expectedChar === ">" || expectedChar === "!") {
    return `Comparison operator '${expectedChar}' needed here.`;
  }
  if (typedChar && expectedChar.toLowerCase() === typedChar.toLowerCase()) {
    return `Check letter case: expected '${expectedChar}' (hold Shift for capital letters).`;
  }
  return `Type '${expectedChar}' to continue. Follow the glowing cursor!`;
}

/* Build boolean mask indicating which characters belong to comments */
export function buildCommentMask(code) {
  const mask = [];
  let offset = 0;
  const lines = code.split("\n");
  lines.forEach((line) => {
    const isComment = line.trimStart().startsWith("#");
    for (let i = 0; i < line.length; i++) {
      mask[offset + i] = isComment;
    }
    // newline char
    mask[offset + line.length] = isComment;
    offset += line.length + 1;
  });
  return mask;
}

/* Render character-by-character display */
export function renderTypingDisplay(dispElem, target, inputVal) {
  if (!dispElem) return;
  dispElem.innerHTML = "";
  const commentMask = buildCommentMask(target);

  for (let i = 0; i < target.length; i++) {
    const span = document.createElement("span");
    const ch = target[i];
    span.textContent = ch;

    let cls = "tg-char ";
    if (ch === "\n") cls += "tg-nl ";

    if (i < inputVal.length) {
      cls += (inputVal[i] === ch) ? "tg-ok " : "tg-bad ";
    } else if (i === inputVal.length) {
      cls += "tg-cur ";
    } else {
      cls += "tg-pending ";
    }

    if (commentMask[i] && i !== inputVal.length && !(i < inputVal.length && inputVal[i] !== ch)) {
      cls += "tg-comment ";
    }

    span.className = cls.trim();
    dispElem.appendChild(span);
  }
}

/* Assess typing input against target */
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
      if (inputVal[lastIdx] !== target[lastIdx]) {
        clue = getSyntaxClue(target[lastIdx], inputVal[lastIdx]);
      }
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
  activeLesson = lesson;
  // Use solution as target; fallback to starterCode if needed
  targetCode = (lesson && (lesson.solution || lesson.starterCode || "")).trim();
  currentInput = "";
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
