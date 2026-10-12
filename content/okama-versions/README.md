# 「オカマは両方」バージョン管理

- 表示名、ジャンル、長さ、音源ファイル名は `content.json` の `tracks` で管理します。
- 正式なアレンジ名・ジャンルが確定したら、対象トラックの `name` と `genre` だけを変更します。
- 音源は `public/okama-versions/audio/` と `docs/okama-versions/audio/` に同じファイル名で配置します。
- 歌詞は `content.json` の `lyrics` が正本です。文章を変更せず、行単位で登録します。
- 変更後は `pnpm special:build` を実行してGitHub Pages用HTMLを再生成します。
