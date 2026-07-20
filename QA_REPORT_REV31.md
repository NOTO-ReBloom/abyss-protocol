# QA REPORT REV31

## Critical flow

- `startBtn` -> `prepareMission()` の接続を確認
- `briefingStart` -> `beginMission()` の接続を確認
- ブリーフィング画面で Enter キーによる開始経路を確認
- `game` 未生成時は再度 `prepareMission()` へ戻る保護を確認
- 二重押下時は開始ボタンを無効化

## Layout guarantees

- ブリーフィングカードは `calc(100vh - 74px)` 内に固定
- 開始CTAはカード最下段の独立行
- CTAは高さ46-50pxを確保
- ブリーフィング内の重複説明を削除
- 通知バナーは `.show` がない場合 `display:none`

## Movie typography

- 左右パネルは同じHTML階層、同じ幅、高さ、余白
- 「見えている。/ だが、分からない。」を意図した2行に固定
- 「分かっている。/ だが、見えない。」も同じ2行構成
- 各フレーズ行は `white-space:nowrap`

## Static verification

- game.html JavaScript syntax: PASS
- index.html JavaScript syntax: PASS
- analyst.html JavaScript syntax: PASS
- 重複ID: 0
- 重要ID 9件: 各1個
- マニュアル画像: 18ページ
- PDF原本: 存在
- 黄色い稲妻記号: 0件

## Limitation

実在プレイヤーによる通しプレイではなく、添付画面を起点としたシミュレーションレビュー、DOM検査、JavaScript構文検査、静的レイアウト検査です。
