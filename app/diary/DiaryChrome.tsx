import type { ReactNode } from "react";
import Link from "next/link";

const diaryNav = [
  ["01", "STORY", "/#story"],
  ["02", "FILM", "/#film"],
  ["03", "MUSIC", "/#music"],
  ["04", "GAME風", "/#game"],
  ["05", "制作日記", "/diary/"],
] as const;

export default function DiaryChrome({ children }: { children: ReactNode }) {
  return (
    <main className="diaryPage">
      <header className="siteHeader diaryHeader">
        <Link className="miniMark" href="/" aria-label="THE O.P ホーム">THE O.P</Link>
        <nav aria-label="メインナビゲーション">
          {diaryNav.map(([number, label, href]) => (
            <a key={href} href={href}><span>{number}</span>{label}</a>
          ))}
        </nav>
      </header>
      {children}
      <footer>
        <img src="/the-op-logo.png" alt="THE O.P" />
        <div><p>THE O.P / OFFICIAL SITE</p><p>© 2026 THE O.P</p></div>
      </footer>
    </main>
  );
}
