import type { Metadata } from "next";
import Link from "next/link";
import AudioPlaybackGuard from "../AudioPlaybackGuard";
import content from "@/content/okama-versions/content.json";

export const metadata: Metadata = {
  title: "オカマは両方 — 同じ歌詞、5つの顔。 | THE O.P",
  description: "同じ歌詞から生まれた5つのアレンジを聴き比べる、THE O.Pの特設ページ。",
};

const navItems = [
  ["01", "STORY", "/#story"],
  ["02", "FILM", "/#film"],
  ["03", "MUSIC", "/#music"],
  ["04", "GAME風", "/#game"],
  ["05", "制作日記", "/diary/"],
] as const;

export default function OkamaVersionsPage() {
  return (
    <main className="versionPage">
      <AudioPlaybackGuard />
      <header className="siteHeader versionHeader">
        <Link className="miniMark" href="/" aria-label="THE O.P ホーム">THE O.P</Link>
        <nav aria-label="メインナビゲーション">
          {navItems.map(([number, label, href]) => (
            <Link key={href} href={href}><span>{number}</span>{label}</Link>
          ))}
        </nav>
      </header>

      <section className="versionHero" aria-labelledby="version-title">
        <div className="versionHeroIndex" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span></div>
        <p className="eyebrow">ONE LYRIC / FIVE ARRANGEMENTS</p>
        <h1 id="version-title">オカマは両方</h1>
        <p className="versionHeroSub">同じ歌詞、<br />5つの顔。</p>
        <div className="versionIntro">
          {content.intro.map((line) => <p key={line}>{line}</p>)}
        </div>
      </section>

      <section className="versionCompare section" aria-labelledby="compare-title">
        <div className="sectionIndex"><span>05</span><p>LISTEN &amp; COMPARE / 5 VERSIONS</p></div>
        <div className="versionCompareHeading">
          <p className="eyebrow">SAME WORDS. DIFFERENT SOUND.</p>
          <h2 id="compare-title">順番に、<br />聴き比べる。</h2>
          <p>再生中に別のバージョンを選ぶと、前の曲は自動で停止します。</p>
        </div>
        <div className="versionTrackList">
          {content.tracks.map((track) => (
            <article className="versionTrack" key={track.number}>
              <div className="versionTrackNumber" aria-hidden="true">{track.number}</div>
              <div className="versionTrackMain">
                <div className="versionTrackMeta"><span>ARRANGEMENT {track.number}</span><span>{track.duration}</span></div>
                <h3>{track.name}</h3>
                <p className="versionGenre">{track.genre}</p>
                {track.available ? (
                  // The complete common lyrics are provided immediately below the players.
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <audio controls preload="metadata" aria-label={`オカマは両方 ${track.name}`}>
                    <source src={`/okama-versions/audio/${track.fileName}`} type="audio/mpeg" />
                    お使いのブラウザは音声再生に対応していません。
                  </audio>
                ) : <p className="versionUnavailable">音源未登録</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="versionLyrics section darkSection" aria-labelledby="lyrics-title">
        <div className="sectionIndex light"><span>＋</span><p>COMMON LYRICS / ALL VERSIONS</p></div>
        <div className="versionLyricsHeading">
          <p className="eyebrow">ONE LYRIC</p>
          <h2 id="lyrics-title">共通歌詞</h2>
        </div>
        <details className="versionLyricsDisclosure">
          <summary>歌詞を見る</summary>
          <div className="versionLyricsText">
            <h3>オカマは両方</h3>
            {content.lyrics.map((section, sectionIndex) => (
              <section key={`${section.heading}-${sectionIndex}`}>
                <h4>{section.heading}</h4>
                {section.stanzas.map((stanza, stanzaIndex) => (
                  <p key={stanzaIndex}>{stanza.map((line) => <span key={line}>{line}</span>)}</p>
                ))}
              </section>
            ))}
          </div>
        </details>
      </section>

      <footer>
        <img src="/the-op-logo.png" alt="THE O.P" />
        <div><p>THE O.P / OFFICIAL SITE</p><p>© 2026 THE O.P</p></div>
      </footer>
    </main>
  );
}
