import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const content = JSON.parse(await readFile(path.join(projectRoot, "content", "okama-versions", "content.json"), "utf8"));
const outputDirectory = path.join(projectRoot, "docs", "okama-versions");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const navItems = [
  ["01", "STORY", "../index.html#story"],
  ["02", "FILM", "../index.html#film"],
  ["03", "MUSIC", "../index.html#music"],
  ["04", "GAME風", "../index.html#game"],
  ["05", "制作日記", "../diary/"],
];

const tracksHtml = content.tracks.map((track) => `<article class="versionTrack">
  <div class="versionTrackNumber" aria-hidden="true">${escapeHtml(track.number)}</div>
  <div class="versionTrackMain">
    <div class="versionTrackMeta"><span>ARRANGEMENT ${escapeHtml(track.number)}</span><span>${escapeHtml(track.duration)}</span></div>
    <h3>${escapeHtml(track.name)}</h3><p class="versionGenre">${escapeHtml(track.genre)}</p>
    ${track.available ? `<audio controls preload="metadata" aria-label="オカマは両方 ${escapeHtml(track.name)}"><source src="audio/${escapeHtml(track.fileName)}" type="audio/mpeg">お使いのブラウザは音声再生に対応していません。</audio>` : '<p class="versionUnavailable">音源未登録</p>'}
  </div>
</article>`).join("");

const lyricsHtml = content.lyrics.map((section) => `<section><h4>${escapeHtml(section.heading)}</h4>${section.stanzas.map((stanza) => `<p>${stanza.map((line) => `<span>${escapeHtml(line)}</span>`).join("")}</p>`).join("")}</section>`).join("");

const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="同じ歌詞から生まれた5つのアレンジを聴き比べる、THE O.Pの特設ページ。">
  <title>${escapeHtml(content.title)} | THE O.P</title>
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../styles.css">
</head>
<body><main class="versionPage">
  <header class="siteHeader versionHeader"><a class="miniMark" href="../index.html" aria-label="THE O.P ホーム">THE O.P</a><nav aria-label="メインナビゲーション">${navItems.map(([number, label, href]) => `<a href="${href}"><span>${number}</span>${label}</a>`).join("")}</nav></header>
  <section class="versionHero" aria-labelledby="version-title">
    <div class="versionHeroIndex" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span></div>
    <p class="eyebrow">ONE LYRIC / FIVE ARRANGEMENTS</p><h1 id="version-title">オカマは両方</h1><p class="versionHeroSub">同じ歌詞、<br>5つの顔。</p>
    <div class="versionIntro">${content.intro.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div>
  </section>
  <section class="versionCompare section" aria-labelledby="compare-title">
    <div class="sectionIndex"><span>05</span><p>LISTEN &amp; COMPARE / 5 VERSIONS</p></div>
    <div class="versionCompareHeading"><p class="eyebrow">SAME WORDS. DIFFERENT SOUND.</p><h2 id="compare-title">順番に、<br>聴き比べる。</h2><p>再生中に別のバージョンを選ぶと、前の曲は自動で停止します。</p></div>
    <div class="versionTrackList">${tracksHtml}</div>
  </section>
  <section class="versionLyrics section darkSection" aria-labelledby="lyrics-title">
    <div class="sectionIndex light"><span>＋</span><p>COMMON LYRICS / ALL VERSIONS</p></div>
    <div class="versionLyricsHeading"><p class="eyebrow">ONE LYRIC</p><h2 id="lyrics-title">共通歌詞</h2></div>
    <details class="versionLyricsDisclosure"><summary>歌詞を見る</summary><div class="versionLyricsText"><h3>オカマは両方</h3>${lyricsHtml}</div></details>
  </section>
  <footer><img src="../the-op-logo.png" alt="THE O.P"><div><p>THE O.P / OFFICIAL SITE</p><p>© 2026 THE O.P</p></div></footer>
</main>
<script>
document.addEventListener("play", function (event) {
  var startedTrack = event.target;
  if (!(startedTrack instanceof HTMLAudioElement)) return;
  document.querySelectorAll("audio").forEach(function (track) {
    if (track !== startedTrack && !track.paused) track.pause();
  });
}, true);
</script>
</body></html>
`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, "index.html"), html, "utf8");
console.log(`Generated special page with ${content.tracks.length} version(s).`);
