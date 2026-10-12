import type { Metadata } from "next";
import ArticleBody from "../ArticleBody";
import DiaryChrome from "../DiaryChrome";
import { diaryArticles, getDiaryArticle } from "../articles";

const article = getDiaryArticle("01");

export const metadata: Metadata = {
  title: article ? `${article.title} | THE O.P 制作日記` : "制作日記 | THE O.P",
  description: article?.summary,
};

export default function DiaryArticle01() {
  if (!article) return null;
  const articleIndex = diaryArticles.findIndex((entry) => entry.slug === article.slug);
  const newerArticle = diaryArticles[articleIndex - 1];
  const olderArticle = diaryArticles[articleIndex + 1];

  return (
    <DiaryChrome>
      <article className="diaryArticle">
        <header className="diaryArticleHeader">
          <a className="diaryBack" href="/diary/">← 制作日記一覧</a>
          <div className="diaryArticleMeta"><span>THE O.P 制作日記</span><b>{article.number}</b><time dateTime={article.publishedAt ?? undefined}>{article.publishedLabel}</time></div>
          <h1>{article.title}</h1>
        </header>
        <ArticleBody sections={article.sections} />
        <nav className="diaryPager" aria-label="制作日記の記事間ナビゲーション">
          {olderArticle ? <a href={`/diary/${olderArticle.slug}/`}>← {olderArticle.number} {olderArticle.title}</a> : <span />}
          {newerArticle ? <a href={`/diary/${newerArticle.slug}/`}>{newerArticle.number} {newerArticle.title} →</a> : <span />}
        </nav>
        <a className="diaryBack diaryBackBottom" href="/diary/">← 制作日記一覧へ戻る</a>
      </article>
    </DiaryChrome>
  );
}
