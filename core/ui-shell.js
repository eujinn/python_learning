/* =========================================================================
   UI SHELL — orchestrates the shared two-pane learning UI.
   Manages module loading, lesson rendering, the step-through runner,
   and wires all shared controls (hints, vocab, teacher, journey).
   ========================================================================= */

import { PyErr, parse, tr, py } from "./engine.js";
import { adaptLesson, label, exprOf, used, describeWant } from "./lessons.js";
import { checkWant, checkExpect, checkConstraints, checkAll } from "./assertions.js";
import { loadSavedProgress, saveProgress, updateProgressHeader, renderLearningRecordModal } from "./progress.js";
import { resetHints, advanceHint } from "./hints.js";
import { renderLearnFirst, renderVocabulary } from "./vocabulary.js";
import { renderGutter } from "./editor.js";
import { initEditorScrollSync } from "./editor.js";
import {
  verifyTeacherPassword, setTeacherMode, renderTeacherSolution, renderTeacherNotes,
  demonstrateStepExecution, renderExpectedTestResults, resetStudentView, isTeacherActive
} from "./teacher.js";

/* ---- DOM elements ----------------------------------------------------- */
const els = {
  appTitle: document.getElementById("appTitle"),
  modulePicker: document.getElementById("modulePicker"),
  progText: document.getElementById("progText"),
  progFill: document.getElementById("progFill"),
  badgeSummary: document.getElementById("badgeSummary"),
  tabs: document.getElementById("tabs"),
  conceptTag: document.getElementById("conceptTag"),
  title: document.getElementById("title"),
  task: document.getElementById("task"),
  teacherBtn: document.getElementById("teacherBtn"),
  teacherDrawer: document.getElementById("teacherDrawer"),
  lockTeacherBtn: document.getElementById("lockTeacherBtn"),
  teacherOut: document.getElementById("teacherOut"),
  tRevealBtn: document.getElementById("tRevealBtn"),
  tNotesBtn: document.getElementById("tNotesBtn"),
  tDemoBtn: document.getElementById("tDemoBtn"),
  tTestsBtn: document.getElementById("tTestsBtn"),
  tResetBtn: document.getElementById("tResetBtn"),
  teacherModal: document.getElementById("teacherModal"),
  closeTeacherBtn: document.getElementById("closeTeacherBtn"),
  teacherPwdInput: document.getElementById("teacherPwdInput"),
  teacherAuthForm: document.getElementById("teacherAuthForm"),
  teacherAuthError: document.getElementById("teacherAuthError"),
  learnCard: document.getElementById("learnCard"),
  learnHdr: document.getElementById("learnHdr"),
  learnToggleIcon: document.getElementById("learnToggleIcon"),
  learnBody: document.getElementById("learnBody"),
  vocabBar: document.getElementById("vocabBar"),
  vocabPop: document.getElementById("vocabPop"),
  hintBtn: document.getElementById("hintBtn"),
  hintPanel: document.getElementById("hintPanel"),
  peek: document.getElementById("peek"),
  ex: document.getElementById("ex"),
  code: document.getElementById("code"),
  keys: document.getElementById("keys"),
  run: document.getElementById("run"),
  next: document.getElementById("next"),
  msg: document.getElementById("msg"),
  reflBox: document.getElementById("reflBox"),
  sceneRoot: document.getElementById("module-scene"),
  legend: document.getElementById("legend"),
  view: document.getElementById("view"),
  expl: document.getElementById("expl"),
  stepbar: document.getElementById("stepbar"),
  step: document.getElementById("step"),
  skip: document.getElementById("skip"),
  edit: document.getElementById("edit"),
  vars: document.getElementById("vars"),
  res: document.getElementById("res"),
  journeyBtn: document.getElementById("journeyBtn"),
  journeyModal: document.getElementById("journeyModal"),
  closeJourneyBtn: document.getElementById("closeJourneyBtn"),
  journeySummary: document.getElementById("journeySummary"),
  skillList: document.getElementById("skillList"),
  badgeGrid: document.getElementById("badgeGrid"),
  nextSkillBanner: document.getElementById("nextSkillBanner")
};

/* ---- Shared runner state --------------------------------------------- */
const st = {
  moduleInfo: null,   // module.json contents (id, name, commands, badges, …)
  LESSONS: [],        // rich lesson documents from data.js
  LV: [],             // adapted lessons consumed by the engine
  cur: 0,
  done: new Set(),    // completed lesson indices (per module)
  api: null,          // module scene API { init, render, reset, play }
  S: null,            // live run state
  running: false
};

const sleep = ms => new Promise(r => setTimeout(r, ms));
const setBubble = txt => {
  const b = els.sceneRoot.querySelector("#bubble");
  if (b) b.textContent = txt || "";
};
const msg = (t, c) => { const m = els.msg; m.className = "msg " + c; m.textContent = t; };
const hl = n => els.view.querySelectorAll(".ln").forEach(d => d.classList.toggle("hl", +d.dataset.n === n));

/* ---- Editor helpers (Tab, smart Enter, virtual keys) ------------------ */
const ta = els.code;
function ins(t) { ta.setRangeText(t, ta.selectionStart, ta.selectionEnd, "end"); ta.focus(); }
ta.addEventListener("input", renderGutter);
ta.addEventListener("keydown", e => {
  if (e.key == "Tab") { e.preventDefault(); ins("    "); }
  else if (e.key == "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
  else if (e.key == "Enter") {
    e.preventDefault();
    const s = ta.selectionStart, ls = ta.value.lastIndexOf("\n", s - 1) + 1, line = ta.value.slice(ls, s);
    let ind = line.match(/^ */)[0];
    if (line.trim().endsWith(":")) ind += "    ";
    ins("\n" + ind);
  }
});
els.keys.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  ins(b.dataset.i);
  if (b.dataset.i == "()") ta.setSelectionRange(ta.selectionStart - 1, ta.selectionStart - 1);
});
els.peek.onclick = () => { els.ex.hidden = !els.ex.hidden; };

/* ---- Step-through runner ---------------------------------------------- */
function exitStep() {
  st.S = null;
  els.view.hidden = true;
  els.code.hidden = false;
  els.keys.hidden = false;
  els.stepbar.hidden = true;
  els.run.hidden = false;
  els.expl.textContent = "Press Run to watch your code, one step at a time.";
}

function run() {
  if (st.running) return;
  const L = st.LV[st.cur];
  els.res.innerHTML = "";
  els.next.hidden = true;
  msg("", "");
  let prog;
  try {
    prog = parse(els.code.value, L.names, st.moduleInfo.commands || [], st.moduleInfo.allowedSyntax || []);
  } catch (e) {
    if (e instanceof PyErr) { msg("🐞 " + e.message, "bad"); return; }
    throw e;
  }
  const T = [];
  for (const sc of (L.free ? [{}] : L.sc)) {
    const env0 = Object.assign({}, L.base || {}, sc);
    delete env0.want; delete env0.label; delete env0.expect; delete env0.constraints;
    const env = Object.assign({}, env0), ev = [];
    const ctx = { gates: st.moduleInfo.allowedSyntax || [], commands: st.moduleInfo.commands || [], stdout: [] };
    try { tr(prog, env, ev, ctx); }
    catch (e) { msg("🐞 Something went wrong inside your spell.", "bad"); return; }
    const calls = ev.filter(x => x.k == "call").map(c => c.f);
    const got = calls[calls.length - 1];
    const result = checkAll(sc.want, calls, sc.expect, sc.constraints, prog, ev, env, ctx);
    T.push({ sc, env0, ev, got, calls, good: L.free || result.ok, lab: sc.label || label(env0), result });
  }

  const v = els.view;
  v.innerHTML = "";
  els.code.value.split("\n").forEach((t, i) => {
    const d = document.createElement("div");
    d.className = "ln"; d.dataset.n = i + 1;
    const n = document.createElement("i");
    n.textContent = i + 1;
    d.append(n, document.createTextNode(t));
    v.appendChild(d);
  });
  st.S = { L, T, si: 0, ei: -1, rows: 0, testDone: false };
  els.code.hidden = true;
  els.keys.hidden = true;
  v.hidden = false;
  els.run.hidden = true;
  els.stepbar.hidden = false;
  intro();
  const target = els.sceneRoot.querySelector(".scene") || els.sceneRoot;
  target.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function intro() {
  const t = st.S.T[st.S.si];
  st.S.ei = -1;
  st.S.testDone = false;
  hl(0);
  if (st.api.render) st.api.render(t.env0);
  if (st.api.reset) st.api.reset();
  setBubble("");
  els.expl.textContent = "Test " + (st.S.si + 1) + " of " + st.S.T.length + ": " + t.lab + ". Press Next step to see what your code does.";
  els.step.textContent = "Next step ▶";
}

function addRow(i) {
  const t = st.S.T[i], r = document.createElement("div");
  const want = t.sc.want;
  r.className = "chip";
  if (st.S.L.free) {
    r.textContent = "Program did: " + t.calls.map(c => c + "()").join(", ") + (t.calls.length ? "" : " (nothing)");
  } else if (t.good) {
    r.textContent = "✅ " + t.lab + " → " + (want == null ? describeWant(t.got) : describeWant(want));
  } else {
    const yourCalls = t.calls.length ? t.calls.map(c => c + "()").join(", ") : "nothing";
    const failures = t.result && t.result.failures;
    if (failures && failures.length) {
      r.textContent = "❌ " + t.lab + " → " + failures.join("; ");
    } else {
      r.textContent = "❌ " + t.lab + " → " + yourCalls + "  (needed " + describeWant(want) + ")";
    }
  }
  els.res.appendChild(r);
  st.S.rows = i + 1;
}

function finish() {
  const L = st.S.L, ok = st.S.T.every(t => t.good);
  exitStep();
  if (L.free) { msg("Change the code and run again.", "info"); return; }
  if (ok) {
    st.done.add(st.cur);
    tabs();
    msg("🎉 Every test passed!", "ok");
    if (st.cur < st.LV.length - 1) els.next.hidden = false;
    saveProgress(st.moduleInfo.id, st.done, st.moduleInfo.badges || []);
    updateProgressHeader(els, st.done, st.moduleInfo.badges || [], st.LESSONS);
    els.reflBox.hidden = false;
    els.reflBox.textContent = `🌟 What you learned: "${st.LESSONS[st.cur].studentReflection}"`;
  } else {
    msg("Almost! Look at the ❌ lines, fix your code and try again.", "info");
  }
}

function skip() {
  if (!st.S || st.running) return;
  for (let i = st.S.rows; i < st.S.T.length; i++) addRow(i);
  finish();
}

async function step() {
  if (!st.S || st.running) return;
  if (st.S.testDone) {
    if (st.S.si < st.S.T.length - 1) { st.S.si++; intro(); }
    else finish();
    return;
  }
  const t = st.S.T[st.S.si], e = t.ev[++st.S.ei], X = els.expl;
  st.running = true;
  els.step.disabled = true;
  hl(e.n);
  const labels = st.moduleInfo.labels || {};

  if (e.k == "cond") {
    const ex = exprOf(e.s), u = used(ex, e.env), q = "Is " + ex + "?  (" + u + ")";
    setBubble("🤔 " + ex + " ?");
    X.textContent = q;
    await sleep(900);
    setBubble(e.r ? "✅ True" : "❌ False");
    X.textContent = q + (e.r ? "  → ✅ True! Run the lines inside." : "  → ❌ False. Skip the lines inside.");
  } else if (e.k == "set") {
    if (st.api.render) st.api.render(e.env);
    setBubble("💾 " + e.key + " = " + py(e.val));
    X.textContent = "Save! " + e.key + " is now " + py(e.val) + ". One = means “save this value”.";
  } else if (e.k == "else") {
    setBubble("↪️ else");
    X.textContent = "None of the questions above were True, so the else lines run.";
  } else if (e.k == "for") {
    if (st.api.render) st.api.render(e.env);
    setBubble("🔁 " + e.var + " = " + py(e.val));
    X.textContent = "Start loop " + e.iter + "/" + e.total + ": save " + e.var + " = " + py(e.val) + " and run the lines inside.";
  } else {
    X.textContent = e.auto ? "No spell was cast, so the program just continues." : "Cast " + e.f + "()! " + (labels[e.f] || "");
    if (st.api.play) await st.api.play(e.f, { setBubble });
    else setBubble("▶ " + e.f + "()");
  }

  if (st.S.ei >= t.ev.length - 1) {
    st.S.testDone = true;
    addRow(st.S.si);
    hl(0);
    X.textContent += st.S.L.free ? "" : (t.good ? "  ✅ Test passed!" : "  ❌ This test needed " + describeWant(t.sc.want) + " but your code " + (t.calls.length ? "cast " + t.calls.map(c => c + "()").join(", ") : "cast nothing") + ".");
  }
  st.running = false;
  els.step.disabled = false;
  els.step.textContent = st.S.testDone ? (st.S.si < st.S.T.length - 1 ? "Next test ▶" : "See results ▶") : "Next step ▶";
}

/* ---- Lesson navigation & rendering ------------------------------------ */
function tabs() {
  els.tabs.innerHTML = "";
  st.LV.forEach((L, i) => {
    const b = document.createElement("button");
    b.className = "level-tab";
    if (i == st.cur) b.classList.add("active");
    if (st.done.has(i)) b.classList.add("completed");
    b.title = L.t;
    b.textContent = i == st.LV.length - 1 ? "🎮" : (i + 1);
    b.onclick = () => { if (!st.running) load(i); };
    els.tabs.appendChild(b);
  });
}

function load(i) {
  exitStep();
  st.cur = i;
  const L = st.LV[i];
  els.title.textContent = L.t;
  els.task.textContent = L.task;
  els.ex.textContent = L.ex || "";
  els.ex.hidden = true;
  els.peek.hidden = true;
  els.peek.style.display = "none";
  els.code.value = L.start || "";
  renderGutter();
  els.res.innerHTML = "";
  els.next.hidden = true;
  msg("", "");

  const f = Object.assign({}, L.base || {}, L.sc ? L.sc[0] : {});
  delete f.want; delete f.label;
  if (st.api.render) st.api.render(f);
  if (st.api.reset) st.api.reset();

  /* Educational decorators */
  els.reflBox.hidden = !st.done.has(i);
  if (st.done.has(i)) els.reflBox.textContent = `🌟 What you learned: "${st.LESSONS[i].studentReflection}"`;
  renderLearnFirst(st.LESSONS[i]);
  resetHints(els);
  renderVocabulary(st.LESSONS[i]);
  updateProgressHeader(els, st.done, st.moduleInfo.badges || [], st.LESSONS);
  if (isTeacherActive()) renderTeacherNotes(els, st);
  tabs();
}

/* ---- Module loading ---------------------------------------------------- */
const cssLinks = new Set();
function injectCss(path) {
  const href = new URL(path, document.baseURI).href;
  if (cssLinks.has(href)) return;
  cssLinks.add(href);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

async function loadModule(id) {
  const base = new URL("../modules/" + encodeURIComponent(id) + "/", import.meta.url);
  try {
    const info = await (await fetch(new URL("module.json", base))).json();
    const dataMod = await import(new URL("data.js", base).href);
    const sceneMod = await import(new URL("scene.js", base).href);

    st.moduleInfo = info;
    st.LESSONS = dataMod.LESSONS || [];
    st.LV = st.LESSONS.map(adaptLesson);
    st.cur = 0;
    st.done.clear();
    loadSavedProgress(info.id, st.done);
    st.api = {
      init: sceneMod.init,
      render: sceneMod.render,
      reset: sceneMod.reset,
      play: sceneMod.play
    };

    injectCss(info.css || "modules/" + id + "/scene.css");
    if (els.appTitle) els.appTitle.textContent = (info.icon || "") + " " + info.name;
    document.title = info.name;

    els.sceneRoot.innerHTML = "";
    if (st.api.init) st.api.init(els.sceneRoot);
    els.legend.innerHTML = info.legend || "";
    els.legend.hidden = !(info.legend || "").trim();
    els.vars.textContent = info.idleText || "The program is waiting for your code.";
    els.expl.textContent = "Press Run to watch your code, one step at a time.";
    updateProgressHeader(els, st.done, info.badges || [], st.LESSONS);
    load(0);
  } catch (err) {
    console.error("Failed to load module", id, err);
    els.sceneRoot.innerHTML = "<p style='color:var(--bad)'>Failed to load module “" + id + "”. Check the module files.</p>";
  }
}

async function buildPicker() {
  try {
    const list = await (await fetch(new URL("../modules.json", import.meta.url))).json();
    const ids = list.map(m => (typeof m === "string" ? m : m.id));
    els.modulePicker.innerHTML = "";
    for (const id of ids) {
      const opt = document.createElement("option");
      opt.value = id;
      try {
        const cfg = await (await fetch(new URL("../modules/" + encodeURIComponent(id) + "/module.json", import.meta.url))).json();
        opt.textContent = (cfg.icon || "") + " " + (cfg.name || id);
      } catch (e) { opt.textContent = id; }
      els.modulePicker.appendChild(opt);
    }
    els.modulePicker.onchange = () => loadModule(els.modulePicker.value);
    if (ids.length) loadModule(ids[0]);
  } catch (err) {
    console.error("Failed to load modules.json", err);
  }
}

/* ---- Event wiring ------------------------------------------------------ */
els.run.onclick = run;
els.step.onclick = step;
els.skip.onclick = skip;
els.edit.onclick = exitStep;
els.next.onclick = () => load(st.cur + 1);

els.learnHdr.onclick = () => {
  const card = els.learnCard;
  card.classList.toggle("closed");
  els.learnToggleIcon.textContent = card.classList.contains("closed") ? "◀" : "▼";
};
els.hintBtn.onclick = () => advanceHint(els, st.LESSONS[st.cur]);

els.journeyBtn.onclick = () => {
  renderLearningRecordModal(els, st.done, st.moduleInfo.badges || [], st.LESSONS);
  els.journeyModal.hidden = false;
};
els.closeJourneyBtn.onclick = () => { els.journeyModal.hidden = true; };

els.teacherBtn.onclick = () => {
  msg("👩‍🏫 Teacher Mode coming soon — stay tuned!", "info");
};
els.closeTeacherBtn.onclick = () => { els.teacherModal.hidden = true; };
els.teacherAuthForm.onsubmit = () => { return false; };
els.lockTeacherBtn.onclick = () => {};
els.tRevealBtn.onclick = () => {};
els.tNotesBtn.onclick = () => {};
els.tDemoBtn.onclick = () => {};
els.tTestsBtn.onclick = () => {};
els.tResetBtn.onclick = () => {};

/* Expose runner entry points to teacher module */
st.exitStep = exitStep;
st.run = run;

/* Boot */
initEditorScrollSync();
buildPicker();