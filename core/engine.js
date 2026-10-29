/* =========================================================================
   CORE PYTHON ENGINE (branch module/l1_pyprint)
   Extended for print() with call arguments and multi-arg support.
   ========================================================================= */

export class PyErr extends Error {}

const E = (n, m) => new PyErr("Line " + n + ": " + m);

function splitArgs(s) {
  if (!s.trim()) return [];
  const args = [];
  let start = 0, inStr = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (c === '\\') i++;
      else if (c === inStr) inStr = null;
    } else if (c === '"' || c === "'") {
      inStr = c;
    } else if (c === ',' && !inStr) {
      args.push(s.slice(start, i).trim());
      start = i + 1;
    }
  }
  args.push(s.slice(start).trim());
  return args;
}

export function cond(txt, names, n) {
  if (!txt) throw E(n, 'Add a question after if, like light == "red"');
  const re = /\s+|"[^"\\]*"|'[^'\\]*'|\d+(?:\.\d+)?|[A-Za-z_]\w*|==|!=|>=|<=|>|<|\(|\)/y;
  let js = "", p = 0, m;
  while (p < txt.length) {
    re.lastIndex = p; m = re.exec(txt);
    if (!m) throw E(n, txt[p] == "=" ? "Use two equals == to compare. One = is for saving a value."
      : txt[p] == "!" ? "Use != for \u201cis not equal\u201d, or the word not."
      : "I don\u2019t understand \u201c" + txt[p] + "\u201d here.");
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
      if (!names.includes(t)) throw E(n, "I don\u2019t know the word \u201c" + t + "\u201d. Words you compare need quotes, like \"red\". Names I know: " + names.join(", "));
      js += "e." + t;
    }
    else js += t;
  }
  try { return new Function("e", "return (" + js + ")");
  } catch (x) { throw E(n, "This question doesn\u2019t look right. Check your quotes and brackets."); }
}

export function parse(src, names, allowedCalls) {
  const L = [];
  src.replace(/[\u201c\u201d]/g, '"').replace(/[\u2018\u2019]/g, "'").replace(/\t/g, "    ").split("\n")
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
    if (!l.s.endsWith(":")) throw E(l.n, "Don\u2019t forget the colon : at the end.");
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
    if (m = l.s.match(/^([a-z_]+)\((.*)\)$/)) {
      if (!allowedCalls.includes(m[1])) {
        const suggestions = allowedCalls.map(c => c + "()").join(", ");
        throw E(l.n, "I don\u2019t know the spell \u201c" + m[1] + "()\u201d. Try " + suggestions + ".");
      }
      const argStr = m[2].trim();
      return argStr
        ? { t: "call", f: m[1], n: l.n, a: splitArgs(argStr).map(p => cond(p, nm, l.n)) }
        : { t: "call", f: m[1], n: l.n, a: [] };
    }
    if (m = l.s.match(/^([A-Za-z_]\w*)\s*=\s*([^=].*)$/)) {
      const v = cond(m[2], nm, l.n);
      if (!nm.includes(m[1])) nm.push(m[1]);
      return { t: "set", k: m[1], v, n: l.n };
    }
    throw E(l.n, "I can\u2019t read this line. Try print(...), if, elif, or a variable like name = value.");
  }
  function block(ind) {
    const out = [];
    while (p < L.length) {
      const l = L[p];
      if (l.ind < ind) break;
      if (l.ind > ind) throw E(l.n, "This line is pushed in too far.");
      p++;
      if (/^if\b/.test(l.s)) out.push(ifNode(l));
      else if (/^(elif|else)\b/.test(l.s)) throw E(l.n, "\u201c" + l.s.split(/\W/)[0] + "\u201d needs an if above it, in the same column.");
      else out.push(simple(l));
    }
    return out;
  }
  if (!L.length) throw new PyErr("Type some code first!");
  const top = block(L[0].ind);
  if (p < L.length) throw E(L[p].n, "This line is not lined up with the code above.");
  return top;
}

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

export function tr(ns, env, ev) {
  for (const x of ns) {
    if (x.t == "call") {
      const argValues = x.a ? x.a.map(fn => fn(env)) : [];
      const outStr = argValues.length ? argValues.map(printFmt).join(" ") : undefined;
      ev.push({ k: "call", n: x.n, f: x.f, out: outStr, a: argValues });
    } else if (x.t == "set") {
      env[x.k] = x.v(env);
      ev.push({ k: "set", n: x.n, key: x.k, val: env[x.k], env: Object.assign({}, env) });
    } else {
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

export const py = v => v === true ? "True" : v === false ? "False" : JSON.stringify(v);

export const printFmt = v => {
  if (v === true) return "True";
  if (v === false) return "False";
  if (typeof v === "string") return v;
  return String(v);
};
