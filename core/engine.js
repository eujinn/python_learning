import { PyLexer } from "./engine/lexer.js";
import { parse as parseAST } from "./engine/parser.js";
import { evaluate, py as fmtVal, setContextGates, setContextCommands, setContextInputs } from "./engine/evaluator.js";
export { PyErr } from "./engine/pyerr.js";

export function parse(src, names, commands, gates) {
  const lexer = new PyLexer(src);
  const tokens = lexer.tokenize();
  return parseAST(tokens, { names, commands, gates: gates || [] });
}

export function tr(ast, env, events, opts) {
  opts = opts || {};
  const ctx = {
    gates: opts.gates || [],
    commands: opts.commands || [],
    inputs: opts.inputs || [],
    stdout: opts.stdout || [],
    maxSteps: opts.maxSteps || 500,
    maxDepth: opts.maxDepth || 16
  };
  evaluate(ast, env, events, ctx);
}

export const py = fmtVal;