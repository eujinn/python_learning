/* =========================================================================
   CORE PYTHON ENGINE
   A small Python-like interpreter for educational purposes.
   Understands: function calls, variable assignment (=), if/elif/else,
   comparisons (==, !=, <, >, <=, >=), and / or / not, True / False.
   Pure language layer — no DOM access.
   ========================================================================= */

export class PyErr extends Error {}

const E = (n, m) => new PyErr("Line " + n + ": " + m);

/* Compile one condition expression like  light == "red" and not siren
   into a JS function of the environment object `e`. */
export function cond(txt, names, n) {
  if (!txt) throw E(n, 'Add a question after if, like light == "red"');
  const re = /\s+|"[^"\\]*"|'[^'\\]*'|\d+(?:\.\d+)?|[A-Za-z_]\w*|==|!=|>=|<=|>|<|\(|\)/y;
  let js = "", p = 0, m;
  while (p < txt.length) {
    re.lastIndex = p; m = re.exec(txt);
    if (!m) throw E(n, txt[p] == "=" ? "Use two equals == to compare. One = is for saving a value."
      : txt[p] == "!" ? "Use != for “is not equal”, or the word not."
      : "I don’t understand “" + txt[p] + "” here.");
    const t = m[0]; p = re.lastIndex;
    if (/^\s+$/.test(t)) { js += " "; continue; }
    if (t == "and") js += "&&";
    else if (t == "or") js += "||";
    else if (t == "not") js += "!";
    else if (t == "True") js += "true";
    else if (t == "False") js += "false";
    else if (t == "==") js += "===";
    else if (t == "!=") js += "!==";
    else if (/^[A-Za-z_]/.test(t)) {
      if (!names.includes(t)) throw E(n, "I don’t know the word “" + t + "”. Words you compare need quotes, like \"red\". Names I know: " + names.join(", "));
      js += "e." + t;
    }
    else js += t;
  }
  try { return new Function("e", "return (" + js + ")"); }
  catch (x) { throw E(n, "This question doesn’t look right. Check your quotes and brackets."); }
}

/* Parse source code into a small AST. `allowedCalls` is the module's list of
   command names (e.g. ["stop","slow","crawl","go"]). */
export function parse(src, names, allowedCalls) {
  const L = [];
  src.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\t/g, "    ").split("\n")
    .forEach((raw, i) => {
      const s = raw.trim();
      if (s && s[0] != "#") L.push({ n: i + 1, ind: raw.length - raw.trimStart().length, s });
    });
  const nm = names.slice();
  let p = 0;
  function sub(h) {
    if (p >= L.length || L[p].ind <= h.ind) throw E(h.n, "After the colon : the next line must be pushed in. Press Tab.");
    return block(L[p].ind);
  }
  function head(l, kw) {
    if (!l.s.endsWith(":")) throw E(l.n, "Don’t forget the colon : at the end.");
    return cond(l.s.slice(kw.length, -1).trim(), nm, l.n);
  }
  function ifNode(l) {
    const br = [{ c: head(l, "if"), b: sub(l), n: l.n, s: l.s }];
    let els = null, elsN = 0;
    while (p < L.length && L[p].ind == l.ind) {
      const x = L[p];
      if (/^elif\b/.test(x.s)) { p++; br.push({ c: head(x, "elif"), b: sub(x), n: x.n, s: x.s }); }
      else if (/^else\b/.test(x.s)) { p++; if (!/^else\s*:$/.test(x.s)) throw E(x.n, "else stands alone, like this: else:"); els = sub(x); elsN = x.n; break; }
      else break;
    }
    return { t: "if", br, els, elsN };
  }
  function forNode(l) {
    if (!l.s.endsWith(":")) throw E(l.n, "Don’t forget the colon : at the end.");
    const m = l.s.match(/^for\s+([A-Za-z_]\w*)\s+in\s+range\(([^)]*)\)\s*:$/);
    if (!m) throw E(l.n, "Use: for i in range(3): — put the loop name before in, and a whole number in range().");
    const varName = m[1];
    const args = m[2].split(",").map(a => a.trim()).filter(Boolean);
    if (!args.length || args.length > 2) throw E(l.n, "range() takes one number (or two: start, stop).");
    const rargs = args.map(a => {
      if (/^\d+$/.test(a)) return { n: parseInt(a, 10) };
      if (/^[A-Za-z_]\w*$/.test(a)) return { v: a };
      throw E(l.n, "range() needs a whole number like 3, or a variable like count.");
    });
    if (!nm.includes(varName)) nm.push(varName);
    return { t: "for", v: varName, rargs, b: sub(l), n: l.n, s: l.s };
  }
  function simple(l) {
    let m;
    if (allowedCalls.some(c => new RegExp("^" + c + "$").test(l.s))) throw E(l.n, "Add brackets: " + l.s + "()");
    if (m = l.s.match(/^([a-z_]+)\(\s*\)$/)) {
      if (!allowedCalls.includes(m[1])) {
        const suggestions = allowedCalls.map(c => c + "()").join(", ");
        throw E(l.n, "I don’t know the spell “" + m[1] + "()”. Try " + suggestions + ".");
      }
      return { t: "call", f: m[1], n: l.n };
    }
    if (m = l.s.match(/^([A-Za-z_]\w*)\s*=\s*([^=].*)$/)) {
      const v = cond(m[2], nm, l.n);
      if (!nm.includes(m[1])) nm.push(m[1]);
      return { t: "set", k: m[1], v, n: l.n };
    }
    throw E(l.n, "I can’t read this line. Try if, elif, for, or a spell like go().");
  }
  function block(ind) {
    const out = [];
    while (p < L.length) {
      const l = L[p];
      if (l.ind < ind) break;
      if (l.ind > ind) throw E(l.n, "This line is pushed in too far.");
      p++;
      if (/^if\b/.test(l.s)) out.push(ifNode(l));
      else if (/^for\b/.test(l.s)) out.push(forNode(l));
      else if (/^(elif|else)\b/.test(l.s)) throw E(l.n, "“" + l.s.split(/\W/)[0] + "” needs an if above it, in the same column.");
      else out.push(simple(l));
    }
    return out;
  }
  if (!L.length) throw new PyErr("Type some code first!");
  const top = block(L[0].ind);
  if (p < L.length) throw E(L[p].n, "This line is not lined up with the code above.");
  return top;
}

/* Resolve a range() argument list to an array of integer values. */
function rangeVals(x, env) {
  const get = a => {
    if ("n" in a) return a.n;
    const v = env[a.v];
    if (typeof v !== "number" || !Number.isFinite(v) || !Number.isInteger(v))
      throw new PyErr("Line " + x.n + ": range(" + a.v + ") needs a whole number, like 3.");
    return v;
  };
  const a = get(x.rargs[0]);
  const b = x.rargs.length === 2 ? get(x.rargs[1]) : undefined;
  if (!Number.isInteger(a) || (b !== undefined && !Number.isInteger(b)))
    throw new PyErr("Line " + x.n + ": range() needs whole numbers.");
  const start = b === undefined ? 0 : a;
  const stop = b === undefined ? a : b;
  const out = [];
  for (let k = start; k < stop; k++) out.push(k);
  return out;
}

/* Execute a parsed AST against env, collecting called commands into acts. */
export function exec(ns, env, acts) {
  for (const x of ns) {
    if (x.t == "call") acts.push(x.f);
    else if (x.t == "set") env[x.k] = x.v(env);
    else if (x.t == "for") {
      for (const k of rangeVals(x, env)) { env[x.v] = k; exec(x.b, env, acts); }
    }
    else {
      let hit = false;
      for (const b of x.br) {
        if (b.c(env)) { exec(b.b, env, acts); hit = true; break; }
      }
      if (!hit && x.els) exec(x.els, env, acts);
    }
  }
}

/* Collect trace events for the step-through view.
   (Generates trace events in order, unrolling for-loops into per-iteration events.) */
export function tr(ns, env, ev) {
  for (const x of ns) {
    if (x.t == "call") ev.push({ k: "call", n: x.n, f: x.f });
    else if (x.t == "set") {
      env[x.k] = x.v(env);
      ev.push({ k: "set", n: x.n, key: x.k, val: env[x.k], env: Object.assign({}, env) });
    }
    else if (x.t == "for") {
      const vals = rangeVals(x, env);
      for (let k = 0; k < vals.length; k++) {
        const v = vals[k];
        env[x.v] = v;
        ev.push({ k: "for", n: x.n, var: x.v, val: v, iter: k + 1, total: vals.length, env: Object.assign({}, env) });
        tr(x.b, env, ev);
      }
    }
    else {
      let hit = false;
      for (const b of x.br) {
        const r = !!b.c(env);
        ev.push({ k: "cond", n: b.n, s: b.s, r, env: Object.assign({}, env) });
        if (r) { tr(b.b, env, ev); hit = true; break; }
      }
      if (!hit && x.els) { ev.push({ k: "else", n: x.elsN }); tr(x.els, env, ev); }
    }
  }
}

/* Format a runtime value the way the lesson UI shows it. */
export const py = v => v === true ? "True" : v === false ? "False" : JSON.stringify(v);