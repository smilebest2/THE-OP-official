import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("keeps the existing homepage and adds the making-journal navigation", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>THE O\.P \| Official Site<\/title>/);
  assert.match(html, /href="\/diary\/"[^>]*><span>05<\/span>制作日記/);
  assert.match(html, /id="music"/);
  assert.match(html, /id="game"/);
  assert.match(html, /href="\/okama-versions\/"/);
  assert.match(html, /お疲れ様です。— 取りなおし版/);
  assert.match(html, /\/otsukaresama-retake\.mp3/);
});

test("renders all five comparison tracks and the approved common lyrics", async () => {
  const response = await render("/okama-versions");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>オカマは両方 — 同じ歌詞、5つの顔。 \| THE O\.P<\/title>/);
  assert.equal((html.match(/<audio/g) ?? []).length, 5);
  assert.equal((html.match(/class="versionGenre"/g) ?? []).length, 5);
  assert.match(html, /\/okama-versions\/audio\/version-01\.mp3/);
  assert.match(html, /\/okama-versions\/audio\/version-05\.mp3/);
  assert.match(html, /どっちでもない日も/);
  assert.match(html, /<details class="versionLyricsDisclosure">/);
});

test("renders the diary index and links to entry 01", async () => {
  const response = await render("/diary");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>制作日記 \| THE O\.P<\/title>/);
  assert.match(html, /iPhoneとAIで曲を作る。現在の制作方法と覚え書き/);
  assert.match(html, /href="\/diary\/01\/"/);
  assert.match(html, /<time dateTime="2026-10-12">2026\.10\.12<\/time>/);
});

test("renders article 01 with the approved text, steps and table", async () => {
  const response = await render("/diary/01");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /自分の声量と張りが出る音域を重視し、次回からキーG主体で作曲する。/);
  assert.match(html, /音程を外さないように伴奏を聴いてから歌い出す癖があり、歌声が微妙に遅れることに気づいた。次回はリズムを先に体に入れ、拍に合わせて歌い出すことを意識する。/);
  assert.match(html, /<span>①<\/span>/);
  assert.match(html, /<span>⑥<\/span>/);
  assert.match(html, /<table>/);
  assert.match(html, /href="\/diary\/">← 制作日記一覧/);
  assert.match(html, /dateTime="2026-10-12"/);
});

test("generates matching GitHub Pages files", async () => {
  const [home, index, article, special, ...audioStats] = await Promise.all([
    readFile(new URL("../docs/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/diary/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/diary/01/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/okama-versions/index.html", import.meta.url), "utf8"),
    ...Array.from({ length: 5 }, (_, index) => stat(new URL(`../docs/okama-versions/audio/version-0${index + 1}.mp3`, import.meta.url))),
  ]);
  assert.match(home, /href="diary\/"/);
  assert.match(index, /href="01\/"/);
  assert.match(article, /自分の声量と張りが出る音域を重視し、次回からキーG主体で作曲する。/);
  assert.match(article, /<meta name="viewport" content="width=device-width,initial-scale=1">/);
  assert.match(article, /datetime="2026-10-12"/);
  assert.match(home, /href="okama-versions\/"/);
  assert.match(home, /otsukaresama-retake\.mp3/);
  assert.equal((special.match(/<audio/g) ?? []).length, 5);
  assert.match(special, /document\.addEventListener\("play"/);
  assert.ok(audioStats.every((audio) => audio.size > 4_000_000));
});
