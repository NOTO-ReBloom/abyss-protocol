# ABYSS PROTOCOL / 深層封鎖手順 — REV.23

西暦2096年、深度8,021mの海底観測施設 **PELAGIC CORE A-13** を舞台にした、2人専用の非対称協力ゲームです。

- **操作者**：`game.html` だけを見て、施設内の装置を操作します。
- **解析員**：`analyst.html` または `ABYSS_PROTOCOL_MANUAL.pdf` だけを見て、解除規則を調べます。
- 二人は同じ画面を見せ合わず、対面・電話・Discord等の音声で情報を交換します。

## ファイル

- `index.html`：世界観サイトと約56秒の導入映像
- `game.html`：操作者用ゲーム本体
- `analyst.html`：解析員用HTML手順書
- `ABYSS_PROTOCOL_MANUAL.pdf`：解析員用PDF手順書
- `404.html`：GitHub Pages用の復帰ページ
- `.nojekyll`：GitHub Pages用設定
- `REV23_CHANGELOG.md`：改修内容
- `QA_REPORT.md`：自動検査・表示検査結果
- `DESIGN_RESEARCH_NOTES.md`：再設計時の参考原則

CSS・JavaScript・主要背景画像は各HTMLへ埋め込んでいます。GitHub Pages上で外部アセットのパスが崩れても、画面デザインとゲームロジックが失われにくい構成です。

## 推奨環境

- 操作者：横幅1280px以上のPCブラウザ
- 解析員：PC、タブレット、スマートフォン
- Chrome / Edge / Firefox / Safariの比較的新しい版
- イヤホンまたはヘッドホン
- ゲーム音量は通話音量より小さく設定

## 公開サイトの更新

既存のGitHubリポジトリで **Add file → Upload files** を開き、このフォルダの中身を上書きアップロードします。`main` ブランチの `/ (root)` をGitHub Pagesの公開元にしている場合、コミット後に自動で更新されます。

公開直後に旧版が表示される場合は、URL末尾へ `?v=23` を付けるか、`Ctrl + Shift + R` で強制再読み込みしてください。
