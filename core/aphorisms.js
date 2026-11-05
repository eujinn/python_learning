/* =========================================================================
   APHORISMS (Jing Si Aphorism / JSY)
   Data source for the right-panel overlay shown on a code error.
   Content lives in assets/aphorisms.md so it can be replaced later without
   touching JS. Entries are separated by a line containing only "---";
   lines starting with "#" are comments.
   ========================================================================= */

const SOURCE = new URL("../assets/aphorisms.md", import.meta.url);

const FALLBACK = [
  "知识要用心体会，才能变成自己的智慧。\nKnowledge must be truly felt to become your own wisdom."
];

let aphorisms = FALLBACK.slice();
let loaded = false;

export function parseAphorisms(md) {
  return String(md || "")
    .split(/\n\s*---\s*\n/)
    .map(block => block
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"))
      .join("\n"))
    .filter(Boolean);
}

export async function loadAphorisms() {
  if (loaded) return aphorisms;
  loaded = true;
  try {
    const res = await fetch(SOURCE.href, { cache: "no-cache" });
    if (!res.ok) return aphorisms;
    const items = parseAphorisms(await res.text());
    if (items.length) aphorisms = items;
  } catch (e) { /* keep fallback (offline / fetch blocked) */ }
  return aphorisms;
}

export function randomAphorism() {
  if (!aphorisms.length) return FALLBACK[0];
  return aphorisms[Math.floor(Math.random() * aphorisms.length)];
}
