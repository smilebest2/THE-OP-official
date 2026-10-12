import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
});

test("renders the diary index and links to entry 01", async () => {
  const response = await render("/diary");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>制作日記 \| THE O\.P<\/title>/);
  assert.match(html, /iPhoneとAIで曲を作る。現在の制作方法と覚え書き/);
  assert.match(html, /href="\/diary\/01\/"/);
  assert.match(html, />公開前<\/time>/);
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
  assert.doesNotMatch(html, /datetime="2026-/);
});

test("generates matching GitHub Pages files", async () => {
  const [home, index, article] = await Promise.all([
    readFile(new URL("../docs/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/diary/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/diary/01/index.html", import.meta.url), "utf8"),
  ]);
  assert.match(home, /href="diary\/"/);
  assert.match(index, /href="01\/"/);
  assert.match(article, /自分の声量と張りが出る音域を重視し、次回からキーG主体で作曲する。/);
  assert.match(article, /<meta name="viewport" content="width=device-width,initial-scale=1">/);
  assert.doesNotMatch(article, /datetime="2026-/);
});
