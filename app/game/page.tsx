import type { Metadata } from "next";
import "./game.css";

const title = "やめちまえ × どんまい | THE O.P GAME風";
const description = "THE O.Pの楽曲に合わせて二つの勢力が押し合う、GAME風 MUSIC EXPERIENCE。";
const image = "https://the-op-official.xotaken47.chatgpt.site/game/assets/crowd-battle-v2.webp";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [{ url: image, width: 1600, height: 900 }], type: "website" },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export default function GamePage() {
  return (
    <main className="gamePage">
      <iframe
        className="gameFrame"
        src="/game/index.html"
        title="やめちまえ × どんまい GAME風 MUSIC EXPERIENCE"
        allow="autoplay"
      />
    </main>
  );
}
