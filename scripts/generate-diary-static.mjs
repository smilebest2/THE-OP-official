import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const articlesPath = path.join(projectRoot, "content", "diary", "articles.json");
const docsDiaryPath = path.join(projectRoot, "docs", "diary");
const articles = JSON.parse(await readFile(articlesPath, "utf8")).toSorted((a, b) =>
  b.slug.localeCompare(a.slug, "ja", { numeric: true }),
);

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function siteHeader(root) {
  const items = [
    ["01", "STORY", `${root}index.html#story`],
    ["02", "FILM", `${root}index.html#film`],
    ["03", "MUSIC", `${root}index.html#music`],
    ["04", "GAME風", `${root}index.html#game`],
    ["05", "制作日記", root === "../" ? "./" : "../"],
  ];
  return `<header class="siteHeader diaryHeader">
    <a class="miniMark" href="${root}index.html" aria-label="THE O.P ホーム">THE O.P</a>
    <nav aria-label="メインナビゲーション">${items.map(([number, label, href]) => `<a href="${href}"><span>${number}</span>${label}</a>`).join("")}</nav>
  </header>`;
}

function siteFooter(root) {
  return `<footer><img src="${root}the-op-logo.png" alt="THE O.P"><div><p>THE O.P / OFFICIAL SITE</p><p>© 2026 THE O.P</p></div></footer>`;
}

function documentShell({ title, description, root, body }) {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <title>${escapeHtml(title)}</title>
  <link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${root}styles.css">
</head>
<body><main class="diaryPage">${siteHeader(root)}${body}${siteFooter(root)}</main></body>
</html>
`;
}

function renderBlock(block, sectionHeading) {
  if (block.type === "paragraph") return `<p>${escapeHtml(block.text)}</p>`;
  if (block.type === "step") return `<div class="diaryStep">
    <div class="diaryStepHeading"><span>${escapeHtml(block.number)}</span><h3>${escapeHtml(block.title)}</h3></div>
    ${block.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
  </div>`;
  if (block.type === "memo") return `<aside class="diaryMemo">
    <h3>${escapeHtml(block.title)}</h3>${block.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
  </aside>`;
  const head = block.headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join("");
  const rows = block.rows.map((row) => `<tr>${row.map((cell, cellIndex) => cellIndex === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("");
  return `<div class="diaryTableWrap" tabindex="0" role="region" aria-label="${escapeHtml(sectionHeading)}の表"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderSections(article) {
  return article.sections.map((section) => `<section class="diaryArticleSection">
    <h2>${escapeHtml(section.heading)}</h2>
    ${section.blocks.map((block) => renderBlock(block, section.heading)).join("")}
  </section>`).join("");
}

const indexBody = `<section class="diaryHero" aria-labelledby="diary-title">
  <p class="eyebrow">THE O.P / MAKING JOURNAL</p><h1 id="diary-title">制作日記</h1><p>曲ができるまでの、<br>試行錯誤と覚え書き。</p>
</section>
<section class="diaryIndex section" aria-label="制作日記の記事一覧">
  <div class="sectionIndex"><span>05</span><p>MAKING JOURNAL / ALL ENTRIES</p></div>
  <div class="diaryEntries">${articles.map((article) => `<article class="diaryEntry">
    <div class="diaryEntryMeta"><b>${escapeHtml(article.number)}</b><time${article.publishedAt ? ` datetime="${escapeHtml(article.publishedAt)}"` : ""}>${escapeHtml(article.publishedLabel)}</time></div>
    <div><h2><a href="${escapeHtml(article.slug)}/">${escapeHtml(article.title)}</a></h2><p>${escapeHtml(article.summary)}</p><a class="diaryReadMore" href="${escapeHtml(article.slug)}/">全文を読む <span aria-hidden="true">→</span></a></div>
  </article>`).join("")}</div>
</section>`;

await mkdir(docsDiaryPath, { recursive: true });
await writeFile(path.join(docsDiaryPath, "index.html"), documentShell({
  title: "制作日記 | THE O.P",
  description: "THE O.Pの制作工程、使用機材、費用、失敗、改善点を記録する制作日記。",
  root: "../",
  body: indexBody,
}), "utf8");

for (const [articleIndex, article] of articles.entries()) {
  const newer = articles[articleIndex - 1];
  const older = articles[articleIndex + 1];
  const pager = `<nav class="diaryPager" aria-label="制作日記の記事間ナビゲーション">
    ${older ? `<a href="../${escapeHtml(older.slug)}/">← ${escapeHtml(older.number)} ${escapeHtml(older.title)}</a>` : "<span></span>"}
    ${newer ? `<a href="../${escapeHtml(newer.slug)}/">${escapeHtml(newer.number)} ${escapeHtml(newer.title)} →</a>` : "<span></span>"}
  </nav>`;
  const articleBody = `<article class="diaryArticle">
    <header class="diaryArticleHeader">
      <a class="diaryBack" href="../">← 制作日記一覧</a>
      <div class="diaryArticleMeta"><span>THE O.P 制作日記</span><b>${escapeHtml(article.number)}</b><time${article.publishedAt ? ` datetime="${escapeHtml(article.publishedAt)}"` : ""}>${escapeHtml(article.publishedLabel)}</time></div>
      <h1>${escapeHtml(article.title)}</h1>
    </header>
    <div class="diaryArticleBody">${renderSections(article)}</div>
    ${pager}<a class="diaryBack diaryBackBottom" href="../">← 制作日記一覧へ戻る</a>
  </article>`;
  const articleDirectory = path.join(docsDiaryPath, article.slug);
  await mkdir(articleDirectory, { recursive: true });
  await writeFile(path.join(articleDirectory, "index.html"), documentShell({
    title: `${article.title} | THE O.P 制作日記`,
    description: article.summary,
    root: "../../",
    body: articleBody,
  }), "utf8");
}

console.log(`Generated ${articles.length + 1} diary page(s).`);
