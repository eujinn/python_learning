/* Per-module learning record: progress, badges, and the Journey modal. */

const storageKey = moduleId => "plp_" + moduleId + "_record";

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

export function saveProgress(moduleId, done, badges) {
  try {
    const completed = Array.from(done);
    const earnedBadges = badges
      .filter(c => c.levels.every(l => done.has(l)))
      .map(c => c.id);
    localStorage.setItem(storageKey(moduleId), JSON.stringify({ completed, earnedBadges, updatedAt: Date.now() }));
  } catch (e) { /* storage full / blocked */ }
}

export function challengeCount(lessons) {
  const freeIdx = lessons.findIndex(l => l.free);
  return freeIdx >= 0 ? freeIdx : lessons.length;
}

export function updateProgressHeader(els, done, badges, lessons) {
  const count = challengeCount(lessons);
  const completed = Array.from(done).filter(i => i < count).length;
  const pct = Math.round((completed / count) * 100);
  const earnedCount = badges.filter(c => c.levels.every(l => done.has(l))).length;
  if (els.progText) els.progText.textContent = `Progress: ${completed} / ${count} Challenges (${pct}%)`;
  if (els.progFill) els.progFill.style.width = pct + "%";
  if (els.badgeSummary) els.badgeSummary.textContent = `🏅 ${earnedCount} / ${badges.length} Badges`;
}

export function renderLearningRecordModal(els, done, badges, lessons) {
  const count = challengeCount(lessons);
  const completed = Array.from(done).filter(i => i < count).length;
  els.journeySummary.textContent = `⭐ ${completed} of ${count} Challenge Levels Completed`;

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
    detail.style.cssText = "color:var(--muted)";
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