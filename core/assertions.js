export function checkWant(want, calls) {
  if (want == null) return true;
  const w = String(want);
  let m;
  if (m = w.match(/^([a-z_]+)\*\s*(\d+)$/))
    return (tallyCalls(calls)[m[1]] || 0) === +m[2];
  if (m = w.match(/^([a-z_]+)\+$/))
    return (tallyCalls(calls)[m[1]] || 0) >= 1;
  return calls[calls.length - 1] === w;
}

function tallyCalls(calls) {
  return calls.reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), {});
}

export function describeWant(want) {
  if (want == null) return "free play";
  const w = String(want);
  let m;
  if (m = w.match(/^([a-z_]+)\*\s*(\d+)$/)) return m[1] + "() \u00d7 " + m[2];
  if (m = w.match(/^([a-z_]+)\+$/)) return m[1] + "() (at least once)";
  return w + "()";
}

export function checkExpect(expect, events, env, ctx) {
  if (!expect) return { ok: true };
  const failures = [];
  if (expect.stdout !== undefined) {
    const actual = (ctx && ctx.stdout || []).join("\n");
    if (actual !== expect.stdout)
      failures.push("stdout: expected " + JSON.stringify(expect.stdout) + " but got " + JSON.stringify(actual));
  }
  if (expect.vars) {
    for (const [k, v] of Object.entries(expect.vars)) {
      const actual = env[k];
      if (JSON.stringify(actual) !== JSON.stringify(v))
        failures.push(k + ": expected " + JSON.stringify(v) + " but got " + JSON.stringify(actual));
    }
  }
  if (expect.return !== undefined) {
    const lastReturn = (ctx && ctx.returnValue);
    if (JSON.stringify(lastReturn) !== JSON.stringify(expect.return))
      failures.push("return: expected " + JSON.stringify(expect.return) + " but got " + JSON.stringify(lastReturn));
  }
  return { ok: !failures.length, failures };
}

export function checkConstraints(constraints, ast, calls) {
  if (!constraints) return { ok: true };
  const failures = [];
  const found = collectConstructs(ast);
  if (constraints.mustUse) {
    constraints.mustUse.forEach(c => {
      if (!found.includes(c)) failures.push("must use '" + c + "'");
    });
  }
  if (constraints.forbid) {
    constraints.forbid.forEach(c => {
      if (found.includes(c)) failures.push("must not use '" + c + "'");
    });
  }
  if (constraints.minCalls !== undefined && (calls || []).length < constraints.minCalls)
    failures.push("too few commands (min " + constraints.minCalls + ")");
  if (constraints.maxCalls !== undefined && (calls || []).length > constraints.maxCalls)
    failures.push("too many commands (max " + constraints.maxCalls + ")");
  if (constraints.exactCalls !== undefined && (calls || []).length !== constraints.exactCalls)
    failures.push("expected " + constraints.exactCalls + " commands but got " + (calls || []).length);
  return { ok: !failures.length, failures };
}

function collectConstructs(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(collectConstructs);
  const types = [];
  if (node.t) types.push(node.t);
  if (node.br) types.push(...node.br.flatMap(b => collectConstructs(b.c).concat(collectConstructs(b.b))));
  if (node.b) types.push(...collectConstructs(node.b));
  if (node.els) types.push(...collectConstructs(node.els));
  if (node.stmts) types.push(...collectConstructs(node.stmts));
  if (node.expr) types.push(...collectConstructs(node.expr));
  if (node.left) types.push(...collectConstructs(node.left));
  if (node.right) types.push(...collectConstructs(node.right));
  if (node.iter) types.push(...collectConstructs(node.iter));
  if (node.c) types.push(...collectConstructs(node.c));
  if (node.v) types.push(...collectConstructs(node.v));
  if (node.idx) types.push(...collectConstructs(node.idx));
  if (node.items) types.push(...node.items.flatMap(collectConstructs));
  if (node.args) types.push(...node.args.flatMap(collectConstructs));
  return types;
}

export function checkAll(want, calls, expect, constraints, ast, events, env, ctx) {
  const wantResult = checkWant(want, calls);
  const expectResult = checkExpect(expect, events, env, ctx);
  const constraintsResult = checkConstraints(constraints, ast, calls);
  const allOk = wantResult && expectResult.ok && constraintsResult.ok;
  const allFailures = (wantResult ? [] : ["want: expected " + describeWant(want) + " but got " + (calls.length ? calls.join(", ") : "nothing")])
    .concat(expectResult.ok ? [] : expectResult.failures)
    .concat(constraintsResult.ok ? [] : constraintsResult.failures);
  return { ok: allOk, failures: allFailures, want: wantResult, expect: expectResult.ok, constraints: constraintsResult.ok };
}