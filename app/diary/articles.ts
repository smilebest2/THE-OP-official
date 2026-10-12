import articleData from "@/content/diary/articles.json";

export type DiaryParagraph = { type: "paragraph"; text: string };
export type DiaryStep = { type: "step"; number: string; title: string; paragraphs: string[] };
export type DiaryMemo = { type: "memo"; title: string; paragraphs: string[] };
export type DiaryTable = { type: "table"; headers: string[]; rows: string[][] };
export type DiaryBlock = DiaryParagraph | DiaryStep | DiaryMemo | DiaryTable;
export type DiaryArticle = {
  slug: string;
  number: string;
  title: string;
  publishedAt: string | null;
  publishedLabel: string;
  summary: string;
  image: string | null;
  relatedTrack: { label: string; href: string } | null;
  sections: { heading: string; blocks: DiaryBlock[] }[];
};

export const diaryArticles = (articleData as DiaryArticle[]).toSorted((a, b) =>
  b.slug.localeCompare(a.slug, "ja", { numeric: true }),
);

export function getDiaryArticle(slug: string) {
  return diaryArticles.find((article) => article.slug === slug);
}
