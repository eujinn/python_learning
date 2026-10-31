import { readFileSync } from "node:fs";
import { parse, tr } from "../core/engine.js";
import { adaptLesson } from "../core/lessons.js";
import { checkAll } from "../core/assertions.js";

const rootDir = new URL("../", import.meta.url);

async function loadModule(id) {
  const base = new URL("modules/" + id + "/", rootDir);
  const infoPath = new URL("module.json", base);
  const info = JSON.parse(readFileSync(infoPath, "utf8"));
  const dataMod = await import(new URL("data.js", base).href);
  return { info, lessons: dataMod.LESSONS || [] };
}

async function run() {
  const manifestPath = new URL("modules.json", rootDir);
  const ids = JSON.parse(readFileSync(manifestPath, "utf8"));
  let totalPassed = 0, totalFailed = 0, totalLessons = 0;

  for (const id of ids) {
    console.log(`\n=== Module: ${id} ===`);
    const { info, lessons } = await loadModule(id);
    if (!lessons.length) { console.log("  (no lessons)"); continue; }

    for (const doc of lessons) {
      totalLessons++;
      const L = adaptLesson(doc);
      const commands = info.commands || [];
      const gates = info.allowedSyntax || [];
      let lessonPassed = true;

      try {
        const ast = parse(doc.solution, L.names, commands, gates);

        for (const sc of (L.free ? [{}] : L.sc)) {
          const env0 = Object.assign({}, L.base || {}, sc);
          delete env0.want; delete env0.label; delete env0.expect; delete env0.constraints;
          const env = Object.assign({}, env0), ev = [];
          const ctx = { gates, commands, stdout: [] };
          tr(ast, env, ev, ctx);
          const calls = ev.filter(x => x.k == "call").map(c => c.f);
          const result = checkAll(sc.want, calls, sc.expect, sc.constraints, ast, ev, env, ctx);

          if (!result.ok) {
            lessonPassed = false;
            const label = sc.label || Object.entries(sc).filter(([k]) => !["want","label","expect","constraints"].includes(k)).map(([k,v]) => `${k}=${v}`).join(", ");
            console.log(`  ❌ ${doc.title || "?"} — ${label || "test"}: ${result.failures.join("; ")}`);
          }
        }

        if (lessonPassed) {
          console.log(`  ✅ ${doc.title} — ${L.sc.length} test(s) passed`);
          totalPassed++;
        } else {
          totalFailed++;
        }
      } catch (e) {
        console.log(`  💥 ${doc.title} — Parse/run error: ${e.message || e}`);
        totalFailed++;
      }
    }
  }

  console.log(`\n${"=".repeat(40)}`);
  console.log(`Lessons: ${totalLessons}  |  Passed: ${totalPassed}  |  Failed: ${totalFailed}`);
  process.exit(totalFailed ? 1 : 0);
}

run();