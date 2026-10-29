import { py } from "./engine.js";

/* Adapt a rich lesson document (GoldenTraffic schema) into the compact
   runtime shape the engine consumes. */
export function adaptLesson(L) {
  return {
    t: L.title,
    task: L.storyProblem,
    ex: L.solution,
    names: L.variables,
    base: L.base || {},
    free: !!L.free,
    start: L.starterCode || "",
    sc: (L.tests || []).map(t => Object.assign({}, t.environment || {}, { want: t.want, label: t.label }))
  };
}

/* Build a human-readable label from a test environment object. */
export const label = sc =>
  Object.entries(sc)
    .filter(([k]) => k != "want" && k != "label")
    .map(([k, v]) => k + " = " + py(v))
    .join(", ");

/* Strip if/elif keywords + colon from a condition line. */
export const exprOf = t => t.replace(/^(if|elif)\s+/, "").replace(/:$/, "").trim();

/* List which known variables a condition expression reads, with values. */
export const used = (ex, env) => {
  const o = [];
  (ex.match(/[A-Za-z_]\w*/g) || []).forEach(w => {
    if (w in env && !o.includes(w)) o.push(w);
  });
  return o.map(w => w + " is " + py(env[w])).join(", ");
};

/* Count how many times every command was called during a run. */
export const tallyCalls = calls =>
  calls.reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), {});

/* Does a run's command list satisfy a lesson's want spec?
   - "go"            → the LAST command called is go
   - "go*3"          → go is called exactly 3 times
   - "go+"           → go is called at least once
   - null/undefined  → always satisfied (free play) */
export const matchesWant = (want, calls) => {
  if (want == null) return true;
  const w = String(want);
  let m;
  if (m = w.match(/^([a-z_]+)\*\s*(\d+)$/)) {
    return tallyCalls(calls)[m[1]] === +m[2];
  }
  if (m = w.match(/^([a-z_]+)\+$/)) {
    return (tallyCalls(calls)[m[1]] || 0) >= 1;
  }
  return calls[calls.length - 1] === w;
};

/* Human-readable description of a want spec (for result chips/expl). */
export const describeWant = want => {
  const w = String(want);
  let m;
  if (m = w.match(/^([a-z_]+)\*\s*(\d+)$/)) return m[1] + "() × " + m[2];
  if (m = w.match(/^([a-z_]+)\+$/)) return m[1] + "() (at least once)";
  return w + "()";
};