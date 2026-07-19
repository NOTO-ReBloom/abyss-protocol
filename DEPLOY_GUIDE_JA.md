# 公開手順

## 1. リポジトリを作成

GitHub右上の「+」から **New repository** を選びます。

推奨リポジトリ名：`abyss-protocol`

公開サイトにする場合、FreeプランではPublicリポジトリが簡単です。

## 2. ファイルをアップロード

リポジトリの **Add file → Upload files** から、このフォルダの中身をすべてアップロードします。フォルダそのものではなく、`index.html` がリポジトリ直下にある状態にしてください。

## 3. Pagesを有効化

**Settings → Pages → Build and deployment → Source → GitHub Actions** を選択します。

`.github/workflows/pages.yml` が自動的に実行されます。

## 4. 公開URLを確認

**Actions** タブで緑色のチェックが表示された後、**Settings → Pages** に公開URLが表示されます。

## 更新方法

ファイルを変更して `main` ブランチへアップロードまたはpushすると、自動で再公開されます。
