/* =========================================================================
   PLACEHOLDER CORE PYTHON ENGINE (main branch)
   main intentionally carries only a minimal starter interpreter that can run
   the _template module's stub lesson (comments, assignment, zero-arg calls,
   if/elif/else, comparisons, and/or/not, True/False).

   Each module branch ships its OWN engine copy (core/engine.js), extended
   locally for that lesson's syntax needs — e.g. module/l12_for_loop adds
   call arguments (scoop("vanilla")) and sequence wants. Nothing on main
   should grow beyond this starter; put new syntax in the module branch.
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
   command names (e.g. ["stop","slow","go"]). Zero-argument calls only. */
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
    throw E(l.n, "I can’t read this line. Try if, elif, or a spell like go().");
  }
  function block(ind) {
    const out = [];
    while (p < L.length) {
      const l = L[p];
      if (l.ind < ind) break;
      if (l.ind > ind) throw E(l.n, "This line is pushed in too far.");
      p++;
      if (/^if\b/.test(l.s)) out.push(ifNode(l));
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

/* Execute a parsed AST against env, collecting called commands into acts. */
export function exec(ns, env, acts) {
  for (const x of ns) {
    if (x.t == "call") acts.push(x.f);
    else if (x.t == "set") env[x.k] = x.v(env);
    else {
      let hit = false;
      for (const b of x.br) {
        if (b.c(env)) { exec(b.b, env, acts); hit = true; break; }
      }
      if (!hit && x.els) exec(x.els, env, acts);
    }
  }
}

/* Collect trace events for the step-through view. */
export function tr(ns, env, ev) {
  for (const x of ns) {
    if (x.t == "call") ev.push({ k: "call", n: x.n, f: x.f });
    else if (x.t == "set") {
      env[x.k] = x.v(env);
      ev.push({ k: "set", n: x.n, key: x.k, val: env[x.k], env: Object.assign({}, env) });
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