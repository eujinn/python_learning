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