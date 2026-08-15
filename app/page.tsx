const navItems = [
  ["01", "STORY", "#story"],
  ["02", "FILM", "#film"],
  ["03", "MUSIC", "#music"],
  ["04", "GAME風", "#game"],
] as const;

export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <a className="miniMark" href="#top" aria-label="THE O.P ホーム">
          THE O.P
        </a>
        <nav aria-label="メインナビゲーション">
          {navItems.map(([number, label, href]) => (
            <a key={href} href={href}>
              <span>{number}</span>{label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <img
          className="heroPortrait"
          src="/the-op-silhouette.png"
          alt="白黒で描かれたTHE O.Pのダンディな二人のシルエット"
        />
        <div className="heroTopline" aria-hidden="true">
          <span>THE OFFICIAL SITE</span>
          <span>OSAKA / 2026</span>
        </div>
        <div className="heroCopy">
          <p className="eyebrow">SUIT. GUITAR. VOICE.</p>
          <h1 id="hero-title">
            <span>54歳、</span>
            <span>まだ夏の途中。</span>
          </h1>
          <a className="filmCta" href="#film">
            <span className="play" aria-hidden="true">▶</span>
            映画予告編を見る
          </a>
        </div>
        <div className="heroLogoWrap">
          <img src="/the-op-logo.png" alt="THE O.P" className="heroLogo" />
        </div>
        <p className="scrollHint" aria-hidden="true">SCROLL TO BEGIN</p>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          THE O.P — DANDYISM AFTER FIFTY — THE O.P — DANDYISM AFTER FIFTY —
        </div>
      </div>

      <section className="story section" id="story" aria-labelledby="story-title">
        <div className="sectionIndex">
          <span>01</span>
          <p>STORY / 54歳の夏</p>
        </div>
        <div className="storyBody">
          <p className="storyLead">54歳の夏、<br />難波で結成。</p>
          <div className="storyText">
            <h2 id="story-title">まだ、終われない。</h2>
            <p>
              時代の流れに思い知らされても、<br />
              瞳にキスして、歯をくいしばる。
            </p>
            <p>
              どこに向かうのか。<br />
              そんなにしてまで鳴らす理由が、まだある。
            </p>
          </div>
        </div>
      </section>

      <section className="film section darkSection" id="film" aria-labelledby="film-title">
        <div className="sectionIndex light">
          <span>02</span>
          <p>FILM / OFFICIAL TRAILER</p>
        </div>
        <div className="filmHeading">
          <h2 id="film-title">「54歳の夏」</h2>
          <p>全米が泣いた——かもしれない。<br />この夏一番の、熱い思い。</p>
        </div>
        <div className="videoFrame">
          <video controls playsInline preload="metadata" poster="/the-op-silhouette.png">
            <source src="/the-op-trailer.mp4" type="video/mp4" />
            お使いのブラウザは動画再生に対応していません。
          </video>
          <p><span>THE O.P</span><span>54歳の夏 — OFFICIAL TRAILER</span></p>
        </div>
      </section>

      <section className="music section" id="music" aria-labelledby="music-title">
        <div className="sectionIndex">
          <span>03</span>
          <p>MUSIC / THE O.P RECORDINGS</p>
        </div>
        <div className="record">
          <div className="recordArt" aria-hidden="true">
            <span>THE O.P</span>
            <div className="disc"><i /></div>
            <small>SIDE A / 2026</small>
          </div>
          <div className="trackInfo">
            <p className="eyebrow">DEBUT RECORDING</p>
            <h2 id="music-title">54歳の夏</h2>
            <p className="credits">GUITAR &amp; VOCAL / THE O.P</p>
            <audio controls preload="metadata">
              <source src="/54-summer.m4a" type="audio/mp4" />
              お使いのブラウザは音声再生に対応していません。
            </audio>
            <p className="note">iPhoneで録音された、二人の最初の記録。</p>
          </div>
        </div>
        <div className="newTrack">
          <img
            className="newTrackArt"
            src="/wachugonadu-cover.png"
            alt="海岸線を走るクラシックカーを描いた、わちゅごなどぅの白黒ジャケット"
          />
          <div className="newTrackMain">
            <div className="newTrackNumber">
              <span>TRACK 02</span>
              <b>NEW</b>
            </div>
            <p className="eyebrow">NEW RECORDING</p>
            <h3>わちゅごなどぅ</h3>
            <p className="credits">GUITAR &amp; VOCAL / THE O.P</p>
            <audio controls preload="metadata">
              <source src="/wachugonadu.m4a" type="audio/mp4" />
              お使いのブラウザは音声再生に対応していません。
            </audio>
            <p className="note">Aメロ接続版 / 1:16</p>
          </div>
        </div>
      </section>

      <section className="gameTeaser section darkSection" id="game" aria-labelledby="game-title">
        <div className="sectionIndex light">
          <span>04</span>
          <p>GAME風 / MUSIC EXPERIENCE</p>
        </div>
        <div className="gameTeaserBody">
          <div className="gameTeaserCopy">
            <p className="eyebrow">YAMECHIMAE × DONMAI</p>
            <h2 id="game-title">押して、<br />押し返す。</h2>
            <p>「やめちまえ」と「どんまい」。<br />楽曲の掛け声に合わせて二つの勢力がぶつかる、THE O.PのGAME風ミュージック体験。</p>
            <a className="gameCta" href="/game">GAME風を始める <span aria-hidden="true">↗</span></a>
          </div>
          <a className="gameVisual" href="/game" aria-label="やめちまえ × どんまい GAME風を開く">
            <span>RED CROWD</span><b>VS</b><span>BLUE CROWD</span>
          </a>
        </div>
      </section>

      <section className="manifesto" aria-label="THE O.Pのステートメント">
        <p>年齢は、終わる理由にならない。</p>
        <p>格好よさは、若さではない。</p>
        <p className="inverse">THE O.Pは、いま始まる。</p>
      </section>

      <footer>
        <img src="/the-op-logo.png" alt="THE O.P" />
        <div>
          <p>THE O.P / OFFICIAL SITE</p>
          <p>© 2026 THE O.P</p>
        </div>
      </footer>
    </main>
  );
}
