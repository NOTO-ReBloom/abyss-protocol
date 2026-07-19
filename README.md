# ABYSS PROTOCOL — GitHub Pages Edition

2人協力コミュニケーションゲーム **ABYSS PROTOCOL** の公開用静的サイトです。

## ファイル構成

- `index.html` — ストーリー導入・約52秒のオープニング・遊び方・章紹介
- `game.html` — ゲーム本体
- `ABYSS_PROTOCOL_MANUAL.pdf` — 解析員用手順書
- `assets/abyss-key-art.png` — サムネイル / キービジュアル
- `assets/site.css` — サイトデザイン
- `assets/intro.js` — オープニング演出・音響・粒子演出
- `.github/workflows/pages.yml` — GitHub Pages 自動公開

## GitHub Pagesで公開する

1. GitHubで新しいリポジトリを作成します。
2. このフォルダ内のファイルをすべてリポジトリ直下へアップロードします。
3. リポジトリの **Settings → Pages** を開きます。
4. **Build and deployment → Source** を **GitHub Actions** にします。
5. `main` ブランチへ反映すると、Actionsが自動で公開します。

公開URLは通常、`https://ユーザー名.github.io/リポジトリ名/` です。

## ローカル確認

ファイルを直接開いても動きます。より正確に確認する場合は、このフォルダで簡易サーバーを起動します。

```bash
python -m http.server 8000
```

その後、ブラウザで `http://localhost:8000/` を開きます。
