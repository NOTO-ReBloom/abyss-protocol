# REV31 10-cycle UX review and improvement log

> このレビューは、実在する10組のユーザーによるテストではありません。添付画面、既存実装、情報非対称型協力ゲームのプレイ状況を基にした、役割別・解像度別のシミュレーションレビューです。

## 評価軸

- 進行可能性: 次の操作が常に見え、入力できるか
- 視認性: 文字の衝突・折り返し・隠れがないか
- 情報密度: 必要情報に集中できるか
- 没入感: 操作の反応と世界観が一致しているか
- 誤操作耐性: 二重入力・未生成状態・画面遷移に耐えられるか

| 段階 | 進行可能性 | 視認性 | 情報密度 | 没入感 | 誤操作耐性 |
|---|---:|---:|---:|---:|---:|
| 修正前 | 1/5 | 2/5 | 2/5 | 3/5 | 2/5 |
| Cycle 5後 | 5/5 | 4/5 | 4/5 | 4/5 | 4/5 |
| Cycle 10後 | 5/5 | 5/5 | 5/5 | 4/5 | 5/5 |

没入感を5/5としていないのは、実在プレイヤーによる通しテストと複数イヤホンでの音量検証を未実施だからです。

## Cycle 1: 開始ボタンの常時表示
- 客観的な観察: 1366×768ではブリーフィング本文が縦に伸び、開始ボタンが画面外へ押し出されていた。
- 実装した改善: ブリーフィングを固定高グリッドへ再構成し、CTAを独立した最下段に配置。
- 確認項目: briefingStart は introScreen 内に1個のみ / briefing-actions がカード最下段 / button type=button

## Cycle 2: 情報密度の削減
- 客観的な観察: 重複していた「遊び方」「推奨設定」「開始前確認」がCTAを下へ押し、視線を分散させていた。
- 実装した改善: ブリーフィングを4情報カード＋役割＋章ルール＋3条件に限定。
- 確認項目: first-play-strip をブリーフィングから削除 / prep-strip を削除 / 主要情報は4カード

## Cycle 3: 章ルールの可読性
- 客観的な観察: 長い共通ルールと章ルールが一つの箱に入り、重要な追加条件が埋もれていた。
- 実装した改善: 章ごとに一文だけの必須ルールへ短縮し、詳細はヘルプと手順書に残した。
- 確認項目: BRIEFING_RULE_SHORT 5章分 / 章固有条件を欠落させない / 一文表示

## Cycle 4: 開始処理の耐障害性
- 客観的な観察: ボタンが押せてもgame状態が未生成の場合の保護がなく、二重操作時の状態も不明瞭だった。
- 実装した改善: game未生成時の再準備、二重押下防止、明確な接続中表示を追加。
- 確認項目: game null guard / button disabled during transition / prepare後focus

## Cycle 5: 入力経路の冗長化
- 客観的な観察: 開始操作が一つのクリックだけに依存すると、視認・フォーカス・操作環境による失敗が起きやすい。
- 実装した改善: クリックに加え、ブリーフィング画面ではEnterキーでも開始可能にした。
- 確認項目: click listener / Enter listener / modal open時は無効

## Cycle 6: 謎の長方形と残留表示
- 客観的な観察: 非表示通知がvisibilityだけで残ると、合成や古いキャッシュ条件で枠が表示される可能性があった。
- 実装した改善: 非show状態をdisplay:noneにし、画面遷移時に通知クラスを明示的に初期化。
- 確認項目: event-banner:not(.show) display:none / 画面遷移時reset / aria-hidden切替

## Cycle 7: 開始時の手応え
- 客観的な観察: ボタン押下からゲームへの遷移が唐突で、反応しているか分かりにくかった。
- 実装した改善: 接続音、接続中表示、短い有線起動シーケンスとスキップ表記を日本語化。
- 確認項目: start SFX / 180ms transition / boot click skip

## Cycle 8: 開始と終了の感情曲線
- 客観的な観察: 開始・完了の表示がシステム情報だけで、二人の会話が重要という作品の核が薄かった。
- 実装した改善: 時計開始時に会話維持を促し、成功表記を「封鎖完了」に統一。
- 確認項目: start banner story-aligned / success wording / failure wording maintained

## Cycle 9: ムービー文字の左右対称
- 客観的な観察: 左右の文章量と折り返しが異なり、「見えているが分からない」側だけ二行の崩れ方が不自然だった。
- 実装した改善: 両側を完全同構造・同寸法にし、2つの意図的なフレーズ行として左右対称化。
- 確認項目: same markup hierarchy / same grid dimensions / white-space nowrap per line

## Cycle 10: 最終回帰確認
- 客観的な観察: 修正を重ねた結果、ID重複・イベント未接続・古い表示文言が再発する危険がある。
- 実装した改善: ビルド識別、load時CTA可視化、ID・リスナー・JS構文・記号整合性を最終検査。
- 確認項目: unique critical IDs / node JS parse / manual/game glyph columns / REV31 build marker

## Final static checks
```json
{
  "critical_id_counts": {
    "startBtn": 1,
    "briefingStart": 1,
    "briefingBack": 1,
    "briefingCopy": 1,
    "briefingRule": 1,
    "gameScreen": 1,
    "introScreen": 1,
    "setupScreen": 1,
    "eventBanner": 1
  },
  "all_critical_ids_unique": true,
  "briefing_start_listener": true,
  "enter_start_listener": true,
  "briefing_cta_visible_css": true,
  "obsolete_briefing_strips_absent_in_intro": true,
  "event_banner_hidden": true,
  "movie_split_symmetrical": true,
  "movie_phrases_present": true,
  "build_marker": true,
  "glyph_no_yellow_lightning": true,
  "manual_pages_count": 18,
  "manual_pdf_exists": true
}
```
