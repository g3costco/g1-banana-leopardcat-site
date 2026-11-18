# 蕉換未來：點燃石虎棲地與農業的共生革命

數位人文地方策展專題實作｜第一組　蕭宇庭、王韋婷、王婕羽（中文四A）

網站網址：https://組長帳號.github.io/repo名稱/ 【待補：發布後貼上】

> 這個 repo 已經放好**可以直接上線的網站初稿**：三個展廳的文字、圖片和 5 個互動元件都能運作。
> 你們的任務是把頁面上的 **【待補】虛線框** 換成自己的訪談、照片與文字，並把標示「待確認」的圖片授權查清楚。

## 站圖與分工

```
index.html 首頁
├── hall1.html 展廳一 土地的呼吸（石虎 × 友善農作）
├── hall2.html 展廳二 綠色的重生（香蕉假莖變身術）
├── hall3.html 展廳三 永續的未來（雙循環 × 低碳計算 × 承諾牆）
├── about.html 關於本展（理念、觀眾、SDGs、團隊）
└── sources.html 參考資料與授權
```

| 檔名 | 頁面 | 負責人 | 已完成的互動元件 | 你要補的【待補】 |
|---|---|---|---|---|
| index.html | 首頁 | 蕭宇庭（組長） | 展廳入口卡片 | 實地照片＋一句話 |
| hall1.html | 展廳一 土地的呼吸 | 王韋婷 | 示意地圖（點選看說明）、翻牌卡、時間軸 | 農友的聲音（訪談 100–150 字＋照片） |
| hall2.html | 展廳二 綠色的重生 | 王婕羽 | 大數字卡、變身五步驟 | 第 5 步作品照、植物染查證、職人故事 |
| hall3.html | 展廳三 永續的未來 | 蕭宇庭 | 雙循環互動圖、低碳里程計算機、承諾牆 | 低碳路線實測距離與照片 |
| about.html | 關於本展 | 王婕羽 | — | 三人自我介紹、確認 SDG 12.8 |
| sources.html | 參考資料與授權 | 王韋婷 | — | 補文字來源連結、確認 4 張待確認圖片 |

> 分工是老師的建議，組內可以調整；調整後請改這張表，Copilot 會參考它。

## 待辦清單（建議開成 Issues）

- [ ] 首頁：放一張實地照片，刪除虛線框
- [ ] 展廳一：訪問友善農友，完成「農友的聲音」
- [ ] 展廳一：（選做）用 Google 我的地圖做真實地圖，取代示意地圖
- [ ] 展廳二：拍攝蕉織作品，放進「第 5 步」
- [ ] 展廳二：訪談工坊，改寫「植物染」段落（目前【待查證】）
- [ ] 展廳二：完成「職人故事」
- [ ] 展廳三：實際走一次低碳路線，補距離與照片
- [ ] 展廳三：（選做）把承諾牆換成 Google 表單，讓大家看得到彼此的承諾
- [ ] 關於本展：三人自我介紹
- [ ] 參考資料：補齊文字來源網址
- [ ] 參考資料：確認 banana-fiber-peeling、banana-fiber-hammering、banana-fiber、natural-dye-skeins 的授權與作者；查不到就換成自己拍的照片
- [ ] 全站：把文字改寫成自己的語氣，手機版檢查一次
- [ ] 發布 v1.0 Release（展覽開幕）

## 工作規則

1. 只修改自己負責的頁面；共用的 `css/style.css`、`js/main.js` 由組長修改（或先在群組說一聲）。
2. 開始工作前，先在原始檔控制按「同步變更」。
3. 圖片放在 `images/`，檔名用英文小寫加連字號（例如 `jiji-banana-farm-01.jpg`），每張 300 KB 以內。
4. 連結與圖片一律使用相對路徑，例如 `images/leopard-cat-specimen.jpg`，不要以 `/` 開頭。
5. 新增圖片時，同時把出處寫進 `sources.html`。
6. 重要的 Copilot 提示詞記在 `PROMPTS.md`。
7. 完成 Issue 時，在提交訊息最後加上 `closes #編號`。

## 互動元件怎麼改？

所有互動都寫在 `js/main.js`，每一段都有中文註解：

| 想改的東西 | 改哪裡 |
|---|---|
| 翻牌卡的文字 | `hall1.html` 裡的 `<button class="flip">` |
| 地圖上的點與說明 | `hall1.html` 裡 `<g class="map-point">` 的 `data-name`、`data-desc` |
| 變身步驟 | `hall2.html` 裡的 `<div class="step-panel">`，多加一個就多一步 |
| 雙循環節點 | `hall3.html` 裡 `<button class="loop-node">` 的 `data-title`、`data-detail` |
| 碳排係數 | `js/main.js` 裡的 `FACTORS` |
| 承諾選項 | `hall3.html` 裡的 `<input name="pledge">` |

**承諾牆說明**：目前資料只存在每個人自己的瀏覽器（別人看不到）。要讓全班共享，建立一份 Google 表單＋回應試算表，把表單的「嵌入 HTML」貼到 hall3.html 取代承諾牆即可。

## 檔案說明

| 檔案或資料夾 | 用途 |
|---|---|
| `*.html` | 網站的各個頁面 |
| `css/style.css` | 所有頁面共用的外觀（配色在檔案開頭） |
| `js/main.js` | 所有互動元件 |
| `images/` | 圖片 |
| `PROMPTS.md` | AI 協作紀錄 |
| `.devcontainer/` | Codespaces 設定（預覽工具、Copilot、自動同步），請勿刪除 |
| `.github/copilot-instructions.md` | 給 Copilot 的共同規則，請勿刪除 |
| `.github/workflows/pages.yml` | 每次提交後自動發布網站，請勿刪除 |
| `.github/ISSUE_TEMPLATE/` | Bug 回報、頁面任務表單 |
