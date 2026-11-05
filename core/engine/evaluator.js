import { PyErr } from "./pyerr.js";

const MAX_STEPS = 500;
const MAX_DEPTH = 16;

export function evaluate(ast, env, events, ctx) {
  ctx = ctx || {};
  ctx.steps = 0;
  ctx.depth = 0;
  ctx.gates = ctx.gates || [];
  ctx.commands = ctx.commands || [];
  ctx.inputs = ctx.inputs || [];
  ctx.inputIdx = 0;
  ctx.stdout = ctx.stdout || [];
  evalNode(ast, env, events, ctx);
}

function checkSteps(ctx, n) {
  if (++ctx.steps > MAX_STEPS) throw new PyErr("Line " + n + ": Your program ran too many steps! Check for an infinite loop.");
}

function evalNode(node, env, events, ctx) {
  if (!node) return null;
  checkSteps(ctx, node.n || 1);

  switch (node.t) {
    case "program": return evalProgram(node, env, events, ctx);
    case "set": return evalSet(node, env, events, ctx);
    case "augset": return evalAugSet(node, env, events, ctx);
    case "idxset": return evalIdxSet(node, env, events, ctx);
    case "call": return evalCall(node, env, events, ctx);
    case "method_call": return evalMethodCall(node, env, events, ctx);
    case "if": return evalIf(node, env, events, ctx);
    case "for": return evalFor(node, env, events, ctx);
    case "while": return evalWhile(node, env, events, ctx);
    case "def": return evalDef(node, env, events, ctx);
    case "return": return evalReturn(node, env, events, ctx);
    case "break": throw new ControlFlow("break");
    case "continue": throw new ControlFlow("continue");
case "expr": return evalExpr(node.expr, env, events, ctx);

    case "num": case "str": case "bool": case "none":
    case "ident": case "list": case "index":
    case "range":
      return evalExpr(node, env, events, ctx);
    default:
      throw new PyErr("Line " + (node.n || "?") + ": Unknown construct.");
  }
}

function evalProgram(node, env, events, ctx) {
  const stmts = node.stmts || node;
  for (const s of (Array.isArray(stmts) ? stmts : [])) {
    env.pc = s.n || 0;
    try { evalNode(s, env, events, ctx); }
    catch (cf) {
      if (cf instanceof ControlFlow && (cf.type === "break" || cf.type === "continue")) {
        throw new PyErr("Line " + (s.n || "?") + ": '" + cf.type + "' outside a loop.");
      }
      throw cf;
    }
  }
}

function evalSet(node, env, events, ctx) {
  const val = evalExpr(node.v, env, events, ctx);
  env[node.k] = val;
  events.push({ k: "set", n: node.n, key: node.k, val, env: Object.assign({}, env) });
}

function evalAugSet(node, env, events, ctx) {
  const current = env[node.k] || 0;
  const delta = evalExpr(node.v, env, events, ctx);
  const val = node.op === "+=" ? current + delta : current - delta;
  env[node.k] = val;
  events.push({ k: "set", n: node.n, key: node.k, val, env: Object.assign({}, env) });
}

function evalIdxSet(node, env, events, ctx) {
  const obj = evalExpr({ t: "ident", v: node.k }, env, events, ctx);
  const idx = evalExpr(node.idx, env, events, ctx);
  const val = evalExpr(node.v, env, events, ctx);
  if (!Array.isArray(obj)) throw new PyErr("Line " + node.n + ": Can only index into a list.");
  obj[idx] = val;
  events.push({ k: "set", n: node.n, key: node.k + "[" + idx + "]", val, env: Object.assign({}, env) });
}

function evalCall(node, env, events, ctx) {
  const args = node.args ? node.args.map(a => evalExpr(a, env, events, ctx)) : [];

  if (node.f === "print") {
    events.push({ k: "call", n: node.n, f: node.f, args });
    const line = args.map(a => a === undefined ? "None" : a === null ? "None" : String(a)).join(" ");
    if (!ctx.stdout) ctx.stdout = [];
    ctx.stdout.push(line);
    return null;
  }

  if (node.f === "len") return args[0] ? args[0].length : 0;
  if (node.f === "type") {
    const v = args[0];
    if (typeof v === "string") return "str";
    if (typeof v === "number") return Number.isInteger(v) ? "int" : "float";
    if (typeof v === "boolean") return "bool";
    if (Array.isArray(v)) return "list";
    if (v === null) return "NoneType";
    return typeof v;
  }
  if (node.f === "int") return parseInt(args[0], 10);
  if (node.f === "float") return parseFloat(args[0]);
  if (node.f === "str") return String(args[0]);
  if (node.f === "abs") return Math.abs(args[0]);
  if (node.f === "min") return Math.min(...args);
  if (node.f === "max") return Math.max(...args);

  if (node.f === "range") {
    if (!ctx.gates.includes("for_range"))
      throw new PyErr("Line " + node.n + ": 'for' loops unlock in a later lesson.");
    let start = 0, stop, step = 1;
    if (args.length === 1) { stop = args[0]; }
    else if (args.length === 2) { start = args[0]; stop = args[1]; }
    else if (args.length === 3) { start = args[0]; stop = args[1]; step = args[2]; }
    const result = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) result.push(i);
    return result;
  }

  if (node.f === "input") {
    events.push({ k: "call", n: node.n, f: node.f, args });
    if (ctx.inputIdx < ctx.inputs.length) return ctx.inputs[ctx.inputIdx++];
    return "";
  }

  if (node.f === "time" || node.f === "time.sleep") {
    events.push({ k: "sleep", n: node.n, sec: args[0] || 1 });
    return null;
  }

  if (typeof env[node.f] === "object" && env[node.f] && env[node.f].t === "func") {
    const fn = env[node.f];
    if (ctx.depth >= MAX_DEPTH) throw new PyErr("Line " + node.n + ": Function call depth too deep.");
    ctx.depth++;
    const localEnv = Object.assign({}, env);
    fn.params.forEach((p, i) => localEnv[p] = i < args.length ? args[i] : null);
    let result = null;
    try {
      for (const s of fn.b) {
        localEnv.pc = s.n;
        checkSteps(ctx, s.n || 1);
        evalNode(s, localEnv, events, ctx);
      }
    } catch (ret) {
      if (ret instanceof ControlFlow && ret.type === "return") result = ret.value;
      else throw ret;
    }
    ctx.depth--;
    events.push({ k: "call", n: node.n, f: node.f, args });
    return result;
  }

  if (ctx.commands.includes(node.f)) {
    events.push({ k: "call", n: node.n, f: node.f, args });
    return null;
  }

  throw new PyErr("Line " + node.n + ": I don't know the spell \"" + node.f + "()\".");
}

function evalMethodCall(node, env, events, ctx) {
  const obj = evalExpr({ t: "ident", v: node.obj }, env, events, ctx);
  const args = node.args ? node.args.map(a => evalExpr(a, env, events, ctx)) : [];

  if (node.method === "append" && Array.isArray(obj)) {
    obj.push(args[0]);
    events.push({ k: "call", n: node.n, f: node.obj + ".append", args });
    return null;
  }

  if (node.method === "sleep" && node.obj === "time") {
    events.push({ k: "sleep", n: node.n, sec: args[0] || 1 });
    return null;
  }

  events.push({ k: "call", n: node.n, f: node.obj + "." + node.method, args });
  return null;
}

function evalIf(node, env, events, ctx) {
  let hit = false;
  for (const b of node.br) {
    const r = !!evalExpr(b.c, env, events, ctx);
    events.push({ k: "cond", n: b.n, s: formatExpr(b.c), r, env: Object.assign({}, env) });
    if (r) {
      for (const s of b.b) evalNode(s, env, events, ctx);
      hit = true;
      break;
    }
  }
  if (!hit && node.els) {
    events.push({ k: "else", n: node.elsN || 0 });
    for (const s of node.els) evalNode(s, env, events, ctx);
  }
}

function evalFor(node, env, events, ctx) {
  const iterable = evalExpr(node.iter, env, events, ctx);
  if (!Array.isArray(iterable)) throw new PyErr("Line " + node.n + ": Can only loop over a list or range.");
  let iter = 0;
  for (const val of iterable) {
    env[node.var] = val;
    events.push({ k: "for", n: node.n, var: node.var, val, iter: ++iter, total: iterable.length, env: Object.assign({}, env) });
    try {
      for (const s of node.b) evalNode(s, env, events, ctx);
    } catch (cf) {
      if (cf instanceof ControlFlow && cf.type === "break") break;
      if (cf instanceof ControlFlow && cf.type === "continue") continue;
      throw cf;
    }
  }
}

function evalWhile(node, env, events, ctx) {
  let iter = 0;
  while (!!evalExpr(node.c, env, events, ctx)) {
    events.push({ k: "cond", n: node.n, s: formatExpr(node.c), r: true, env: Object.assign({}, env) });
    try {
      for (const s of node.b) evalNode(s, env, events, ctx);
    } catch (cf) {
      if (cf instanceof ControlFlow && cf.type === "break") break;
      if (cf instanceof ControlFlow && cf.type === "continue") continue;
      throw cf;
    }
    iter++;
    if (iter > 500) throw new PyErr("Line " + node.n + ": Loop ran too many times. Did you forget to update the condition?");
  }
  events.push({ k: "cond", n: node.n, s: formatExpr(node.c), r: false, env: Object.assign({}, env) });
}

function evalDef(node, env, events, ctx) {
  env[node.name] = { t: "func", params: node.params, b: node.b, n: node.n };
  events.push({ k: "set", n: node.n, key: node.name, val: "<function " + node.name + ">", env: Object.assign({}, env) });
}

function evalReturn(node, env, events, ctx) {
  const val = node.v ? evalExpr(node.v, env, events, ctx) : null;
  throw new ControlFlow("return", val);
}

class ControlFlow extends Error {
  constructor(type, value) { super(type); this.type = type; this.value = value; }
}

function evalExpr(node, env, events, ctx) {
  ctx = ctx || {};
  if (!node) return null;

  switch (node.t) {
    case "num": return node.v;
    case "str": return node.v;
    case "bool": return node.v;
    case "none": return null;

    case "call": return evalCall(node, env, events, ctx || {});

    case "ident": {
      const name = node.v;
      if (name in env) return env[name];
      if (name === "time") return { _isTimeModule: true };
      throw new PyErr("Line " + node.n + ": I don't know the word \"" + name + "\".");
    }

    case "list": return node.items.map(i => evalExpr(i, env, events, ctx));

    case "index": {
      const obj = evalExpr(node.obj, env, events, ctx);
      const idx = evalExpr(node.idx, env, events, ctx);
      if (!Array.isArray(obj)) throw new PyErr("Line " + node.n + ": Can only index into a list.");
      return obj[idx];
    }

    case "binop": {
      const left = evalExpr(node.left, env, events, ctx);
      const right = node.right ? evalExpr(node.right, env, events, ctx) : null;
      switch (node.op) {
        case "+": return left + right;
        case "-": return left - right;
        case "*": return left * right;
        case "/": return left / right;
        case "//": return Math.floor(left / right);
        case "%": return left % right;
        case "==": return left === right;
        case "!=": return left !== right;
        case "<": return left < right;
        case ">": return left > right;
        case "<=": return left <= right;
        case ">=": return left >= right;
        case "in": return Array.isArray(right) ? right.includes(left) : (typeof right === "string" ? right.includes(left) : false);
        case "and": return !left ? left : right;
        case "or": return !!left ? left : right;
        default: throw new PyErr("Line " + node.n + ": Unknown operator " + node.op);
      }
    }

    case "unary": return -evalExpr(node.expr, env, events, ctx);
    case "not": return !evalExpr(node.expr, env, events, ctx);
    case "range": return node.args.length ? node.args.map(a => evalExpr(a, env, events, ctx)) : [];

    default:
      throw new PyErr("Line " + (node.n || "?") + ": Can't evaluate this expression.");
  }
}

function formatExpr(node) {
  if (!node) return "";
  switch (node.t) {
    case "num": return String(node.v);
    case "str": return '"' + node.v + '"';
    case "bool": return node.v ? "True" : "False";
    case "none": return "None";
    case "ident": return node.v;
    case "binop": return formatExpr(node.left) + " " + node.op + " " + formatExpr(node.right);
    case "unary": return "-" + formatExpr(node.expr);
    case "not": return "not " + formatExpr(node.expr);
    case "list": return "[" + node.items.map(formatExpr).join(", ") + "]";
    default: return "?";
  }
}

export function py(val) {
  if (val === true) return "True";
  if (val === false) return "False";
  if (val === null) return "None";
  if (typeof val === "string") return JSON.stringify(val);
  if (Array.isArray(val)) return "[" + val.map(py).join(", ") + "]";
  return String(val);
}

export function setContextGates(ctx, gates) { ctx.gates = gates || []; }
export function setContextCommands(ctx, cmds) { ctx.commands = cmds || []; }
export function setContextInputs(ctx, inputs) { ctx.inputs = inputs || []; ctx.inputIdx = 0; }