import type { DiaryBlock } from "./articles";

export default function ArticleBody({ sections }: { sections: { heading: string; blocks: DiaryBlock[] }[] }) {
  return (
    <div className="diaryArticleBody">
      {sections.map((section) => (
        <section key={section.heading} className="diaryArticleSection">
          <h2>{section.heading}</h2>
          {section.blocks.map((block, index) => {
            if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
            if (block.type === "step") return (
              <div className="diaryStep" key={block.number}>
                <div className="diaryStepHeading"><span>{block.number}</span><h3>{block.title}</h3></div>
                {block.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
              </div>
            );
            if (block.type === "memo") return (
              <aside className="diaryMemo" key={`${block.title}-${index}`}>
                <h3>{block.title}</h3>
                {block.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
              </aside>
            );
            return (
              <div className="diaryTableWrap" key={index} role="region" aria-label={`${section.heading}の表`}>
                <table>
                  <thead><tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
                  <tbody>{block.rows.map((row) => <tr key={row[0]}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
