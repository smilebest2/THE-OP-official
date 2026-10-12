# 制作日記の記事追加手順

1. `articles.json` の先頭に新しい記事オブジェクトを追加します。
2. `slug`、`number`、`title`、`publishedAt`、`publishedLabel`、`summary`、`sections` を設定します。
3. 画像または関連楽曲がある場合だけ `image`、`relatedTrack` を設定します。ない場合は `null` のままにします。
4. `pnpm diary:build` を実行し、GitHub Pages用の `docs/diary/` を再生成します。
5. `pnpm build` と `pnpm test` で表示とリンクを確認します。

記事一覧は番号の新しい順に自動整列されます。React版とGitHub Pages版は同じ `articles.json` を正本として使います。
