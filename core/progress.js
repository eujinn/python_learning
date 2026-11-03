/* Per-module learning record: progress, gated unlocking, badges, Journey modal.
   Access model (20-exercise modules):
     - indices 0..RECAP_COUNT-1  → recap, always freely selectable
     - indices RECAP_COUNT..N-1  → sequential; passing n unlocks n+1           */

const storageKey = moduleId => "plp_" + moduleId + "_record";

export const RECAP_COUNT = 4;

/* How many leading exercises are free-select recap (clamped to module size). */
export function recapCountFor(lessons) {
  return Math.min(RECAP_COUNT, lessons.length);
}

/* Highest gated index that is open. Equals the first not-yet-completed gated
   index (so that index is open), and equals lessons.length when all are done. */
export function unlockedThrough(lessons, done) {
  const total = lessons.length;
  let u = recapCountFor(lessons);
  while (u < total && done.has(u)) u++;
  return u;
}

/* Recap is always free-select; a gated exercise is open up to the unlock point. */
export function isUnlocked(lessons, done, i) {
  if (i < 0 || i >= lessons.length) return false;
  if (i < recapCountFor(lessons)) return true;
  return i <= unlockedThrough(lessons, done);
}

export function loadSavedProgress(moduleId, done) {
  try {
    const raw = localStorage.getItem(storageKey(moduleId));
    if (!raw) return;
    const data = JSON.parse(raw);
    if (Array.isArray(data.completed)) {
      data.completed.forEach(idx => {
        if (typeof idx === "number" && idx >= 0) done.add(idx);
      });
    }
  } catch (e) { /* ignore corrupted storage */ }
}

export function saveProgress(moduleId, done, badges, lessons) {
  try {
    const completed = Array.from(done);
    const earnedBadges = badges
      .filter(c => c.levels.every(l => done.has(l)))
      .map(c => c.id);
    const payload = {
      schemaVersion: 2,
      completed,
      earnedBadges,
      updatedAt: Date.now()
    };
    if (Array.isArray(lessons)) payload.unlockedThrough = unlockedThrough(lessons, done);
    localStorage.setItem(storageKey(moduleId), JSON.stringify(payload));
  } catch (e) { /* storage full / blocked */ }
}

/* Gated exercises are the ones that count toward mastery (recap is warm-up). */
export function challengeCount(lessons) {
  return lessons.length - recapCountFor(lessons);
}

export function updateProgressHeader(els, done, badges, lessons) {
  const recap = recapCountFor(lessons);
  const count = challengeCount(lessons);
  const completed = Array.from(done).filter(i => i >= recap && i < lessons.length).length;
  const pct = count ? Math.round((completed / count) * 100) : 0;
  const earnedCount = badges.filter(c => c.levels.every(l => done.has(l))).length;
  if (els.progText) els.progText.textContent = `Progress: ${completed} / ${count} Exercises (${pct}%)`;
  if (els.progFill) els.progFill.style.width = pct + "%";
  if (els.badgeSummary) els.badgeSummary.textContent = `🏅 ${earnedCount} / ${badges.length} Badges`;
}

export function renderLearningRecordModal(els, done, badges, lessons) {
  const recap = recapCountFor(lessons);
  const count = challengeCount(lessons);
  const completed = Array.from(done).filter(i => i >= recap && i < lessons.length).length;
  els.journeySummary.textContent = `⭐ ${completed} of ${count} Gated Exercises Completed`;

  els.skillList.innerHTML = "";
  els.badgeGrid.innerHTML = "";

  let nextSkill = null;
  badges.forEach(comp => {
    const mastered = comp.levels.every(l => done.has(l));
    if (!mastered && !nextSkill) nextSkill = comp;

    const row = document.createElement("div");
    row.className = "rec-row";
    const icon = document.createElement("span");
    icon.textContent = mastered ? "✅" : "⬜";
    row.appendChild(icon);
    const desc = document.createElement("div");
    const title = document.createElement("b");
    title.textContent = comp.title;
    desc.appendChild(title);
    const sep = document.createTextNode(" — ");
    desc.appendChild(sep);
    const detail = document.createElement("span");
    detail.style.cssText = "color:var(--ink-muted)";
    detail.textContent = comp.desc;
    desc.appendChild(detail);
    row.appendChild(desc);
    els.skillList.appendChild(row);

    const badge = document.createElement("span");
    badge.className = "badge-chip" + (mastered ? " earned" : "");
    badge.textContent = comp.badge;
    els.badgeGrid.appendChild(badge);
  });

  if (nextSkill) {
    const nextLvl = nextSkill.levels.find(l => !done.has(l)) + 1;
    els.nextSkillBanner.textContent = "";
    const icon = document.createElement("b");
    icon.textContent = "🎯 Next Skill:";
    els.nextSkillBanner.appendChild(icon);
    const sep = document.createTextNode(" ");
    els.nextSkillBanner.appendChild(sep);
    const name = document.createTextNode(`${nextSkill.title} — `);
    els.nextSkillBanner.appendChild(name);
    const desc = document.createElement("i");
    desc.textContent = `${nextSkill.desc} (Try Exercise ${nextLvl}!)`;
    els.nextSkillBanner.appendChild(desc);
  } else {
    els.nextSkillBanner.textContent = "";
    const icon = document.createElement("b");
    icon.textContent = `🏆 Congratulations! You have mastered every Python concept and earned all ${badges.length} badges!`;
    els.nextSkillBanner.appendChild(icon);
  }
}
