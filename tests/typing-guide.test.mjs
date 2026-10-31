import assert from "node:assert";
import {
  evaluateTyping,
  getSyntaxClue,
  buildCommentMask
} from "./core/typing-guide.js";
import { parse } from "./core/engine.js";

console.log("=== Testing core/typing-guide.js ===");

// 1. Single line test
const singleTarget = 'print("Hello World!")';
const singleInputGood = 'print("Hello';
const singleInputBad = 'print("Helo';
const singleInputFull = 'print("Hello World!")';

const evalGood = evaluateTyping(singleTarget, singleInputGood);
assert.strictEqual(evalGood.isMatch, false);
assert.strictEqual(evalGood.isCorrectPrefix, true);
assert.strictEqual(evalGood.clue, "");

const evalBad = evaluateTyping(singleTarget, singleInputBad);
assert.strictEqual(evalBad.isMatch, false);
assert.strictEqual(evalBad.isCorrectPrefix, false);
assert.strictEqual(evalBad.firstMismatchIndex, 10);
assert.ok(evalBad.clue.length > 0);

const evalFull = evaluateTyping(singleTarget, singleInputFull);
assert.strictEqual(evalFull.isMatch, true);
assert.strictEqual(evalFull.isCorrectPrefix, true);
console.log("✔ Single line evaluation test passed");

// 2. Multiline code with indentation test
const multiTarget = `for i in range(3):\n    go()`;
const multiInput = `for i in range(3):\n  `;
const evalMulti = evaluateTyping(multiTarget, multiInput);
assert.strictEqual(evalMulti.isCorrectPrefix, true);
assert.strictEqual(evalMulti.progress, 20);

// Test clue for space in indentation
const evalSpaceClue = getSyntaxClue(" ", "a");
assert.ok(evalSpaceClue.includes("[Spacebar]"));
console.log("✔ Multiline with indentation test passed");

// 3. Comments test
const commentTarget = `# Note\nx = 10`;
const mask = buildCommentMask(commentTarget);
assert.strictEqual(mask[0], true);  // '#'
assert.strictEqual(mask[1], true);  // ' '
assert.strictEqual(mask[5], true);  // 'e'
assert.strictEqual(mask[6], true);  // '\n'
assert.strictEqual(mask[7], false); // 'x'
assert.strictEqual(mask[9], false); // '='
console.log("✔ Comment mask test passed");

// 4. Quotes & Operators clue test
assert.ok(getSyntaxClue('"', 'a').includes("quotation"));
assert.ok(getSyntaxClue(':', 'a').includes("colon"));
assert.ok(getSyntaxClue('(', 'a').includes("parentheses"));
assert.ok(getSyntaxClue('=', 'a').includes("One '=' saves"));
assert.ok(getSyntaxClue('+', 'a').includes("Math operator"));
assert.ok(getSyntaxClue('<', 'a').includes("Comparison operator"));
assert.ok(getSyntaxClue('A', 'a').includes("letter case"));
console.log("✔ Punctuation & operators clues test passed");

// 5. Engine v2 compatibility test
// Verify that targetCode output from typing guide parses 100% cleanly in Engine v2
const ast = parse(singleInputFull, ["x"], ["print"], ["print", "strings"]);
assert.strictEqual(ast.t, "program");
assert.strictEqual(ast.stmts.length, 1);
assert.strictEqual(ast.stmts[0].t, "call");
assert.strictEqual(ast.stmts[0].f, "print");
console.log("✔ Engine v2 parse compatibility test passed");

console.log("All Typing Guide tests passed successfully!");
