import type { Metadata } from "next";
import DiaryChrome from "./DiaryChrome";
import { diaryArticles } from "./articles";

export const metadata: Metadata = {
  title: "制作日記 | THE O.P",
  description: "THE O.Pの制作工程、使用機材、費用、失敗、改善点を記録する制作日記。",
};

export default function DiaryIndex() {
  return (
    <DiaryChrome>
      <section className="diaryHero" aria-labelledby="diary-title">
        <p className="eyebrow">THE O.P / MAKING JOURNAL</p>
        <h1 id="diary-title">制作日記</h1>
        <p>曲ができるまでの、<br />試行錯誤と覚え書き。</p>
      </section>
      <section className="diaryIndex section" aria-label="制作日記の記事一覧">
        <div className="sectionIndex"><span>05</span><p>MAKING JOURNAL / ALL ENTRIES</p></div>
        <div className="diaryEntries">
          {diaryArticles.map((article) => (
            <article className="diaryEntry" key={article.slug}>
              <div className="diaryEntryMeta"><b>{article.number}</b><time dateTime={article.publishedAt ?? undefined}>{article.publishedLabel}</time></div>
              <div>
                <h2><a href={`/diary/${article.slug}/`}>{article.title}</a></h2>
                <p>{article.summary}</p>
                <a className="diaryReadMore" href={`/diary/${article.slug}/`}>全文を読む <span aria-hidden="true">→</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </DiaryChrome>
  );
}
