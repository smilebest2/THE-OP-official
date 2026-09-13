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
        <div className="specialFilmHeading">
          <div>
            <p className="eyebrow">SPECIAL FILM / 2026</p>
            <h3>PSYCHEDELIC<br />TRIP PV</h3>
          </div>
          <p>ギターと声が、幾何学と波形に変わる。<br />音に反応して変容する、約1分31秒の映像作品。</p>
        </div>
        <div className="videoFrame specialFilmFrame">
          <video controls playsInline preload="metadata" poster="/psychedelic-trip-pv-poster.webp">
            <source src="/psychedelic-trip-pv.mp4" type="video/mp4" />
            お使いのブラウザは動画再生に対応していません。
          </video>
          <p><span>THE O.P</span><span>AUDIO-REACTIVE VISUAL / 01:31</span></p>
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
              <b>2026</b>
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
        <div className="newTrack">
          <img
            className="newTrackArt"
            src="/question-cover.png"
            alt="受話器が外れた黒電話とコードを描いた、Questionの白黒ジャケット"
          />
          <div className="newTrackMain">
            <div className="newTrackNumber">
              <span>TRACK 03</span>
              <b>2026</b>
            </div>
            <p className="eyebrow">NEW RECORDING</p>
            <h3>Question</h3>
            <p className="credits">GUITAR &amp; VOCAL / THE O.P</p>
            <audio controls preload="metadata">
              <source src="/question.m4a" type="audio/mp4" />
              お使いのブラウザは音声再生に対応していません。
            </audio>
            <p className="note">クリア・音量調整版 / 1:56</p>
          </div>
        </div>
        <div className="newTrack">
          <img
            className="newTrackArt"
            src="/erimo-misaki-cover.png"
            alt="強風の岬に立つコート姿と荒波を描いた、えりも岬の白黒ジャケット"
          />
          <div className="newTrackMain">
            <div className="newTrackNumber">
              <span>TRACK 04</span>
              <b>2026</b>
            </div>
            <p className="eyebrow">NEW RECORDING</p>
            <h3>えりも岬</h3>
            <p className="credits">GUITAR &amp; VOCAL / THE O.P</p>
            <audio controls preload="metadata">
              <source src="/erimo-misaki.m4a" type="audio/mp4" />
              お使いのブラウザは音声再生に対応していません。
            </audio>
            <p className="note">クリア・音量調整版 / 1:28</p>
          </div>
        </div>
        <div className="newTrack">
          <img
            className="newTrackArt"
            src="/54-summer-arrange-cover.png"
            alt="午前7時を表示する古いラジオと二人のシルエットを描いた、54歳の夏 アレンジverの白黒ジャケット"
          />
          <div className="newTrackMain">
            <div className="newTrackNumber">
              <span>TRACK 05</span>
              <b>2026</b>
            </div>
            <p className="eyebrow">RADIO NEWS ARRANGE</p>
            <h3>54歳の夏<br />アレンジver</h3>
            <p className="credits">GUITAR &amp; VOCAL / THE O.P</p>
            <audio controls preload="metadata">
              <source src="/54-summer-arrange.m4a" type="audio/mp4" />
              お使いのブラウザは音声再生に対応していません。
            </audio>
            <p className="note">午前7時のニュース／中継回線アレンジ / 1:48</p>
          </div>
        </div>
        <div className="newTrack">
          <img
            className="newTrackArt"
            src="/namba-14-demo-cover.webp"
            alt="14時を示す街時計と難波を歩く二人を描いた、なんば14時（仮）デモ版の白黒ジャケット"
          />
          <div className="newTrackMain">
            <div className="newTrackNumber">
              <span>TRACK 06</span>
              <b>2026</b>
            </div>
            <p className="eyebrow">DEMO RECORDING</p>
            <h3>なんば14時（仮）<br />デモ版</h3>
            <p className="credits">GUITAR &amp; VOCAL / THE O.P</p>
            <audio controls preload="metadata">
              <source src="/namba-14-demo.m4a" type="audio/mp4" />
              お使いのブラウザは音声再生に対応していません。
            </audio>
            <p className="note">冒頭カット・クリア調整版 / 2:22</p>
          </div>
        </div>
        <div className="newTrack">
          <img
            className="newTrackArt"
            src="/august-rain-cover.webp"
            alt="傘の下に立つ二人とギターを描いた、八月の雨のシンプルな白黒ジャケット"
          />
          <div className="newTrackMain">
            <div className="newTrackNumber">
              <span>TRACK 07</span>
              <b>NEW</b>
            </div>
            <p className="eyebrow">LIVE RECORDING</p>
            <h3>八月の雨</h3>
            <p className="credits">GUITAR &amp; VOCAL / THE O.P</p>
            <audio controls preload="metadata">
              <source src="/august-rain.m4a" type="audio/mp4" />
              お使いのブラウザは音声再生に対応していません。
            </audio>
            <p className="note">カラオケボックス録音／声前クリア版 / 3:15</p>
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
