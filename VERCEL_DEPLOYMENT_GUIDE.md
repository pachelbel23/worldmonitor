# 🚀 Vercel 部署 - 中文支持已修復但需要重新部署

## 📊 當前狀態對比

```
✅ GitHub Pages (中文已可用)
   https://pachelbel23.github.io/worldmonitor/
   JS: index-*.js (最新代碼)
   
❌ Vercel (仍需更新)
   https://worldmonitor-six.vercel.app/
   JS: index-CJ_dBFUW.js (舊版本)
   需要重新部署以獲取最新代碼
```

## 🔍 技術診斷

### 原因分析

GitHub Pages 部署已成功，新代碼包含中文翻譯。但 Vercel 仍在使用舊的 JavaScript 檔案（哈希值不同）。

**可能的原因:**
1. Vercel GitHub webhook 未及時觸發
2. Vercel 構建隊列中有延遲
3. Vercel GitHub 應用可能需要重新授權

## 🛠️ 解決方案

### ✅ 方案 1: 通過 Vercel Dashboard 手動重新部署 (最簡單)

1. 訪問 https://vercel.com/dashboard
2. 登錄您的 Vercel 帳戶
3. 選擇 **worldmonitor** 項目
4. 進入 **Deployments** 標籤
5. 找到最新的部署（應該是 main 分支，可能顯示為灰色/進行中/已完成）
6. 點擊 **三點菜單** (⋯) → **Redeploy**
7. 點擊 **Redeploy** 按鈕確認
8. 等待 1-3 分鐘，直到新部署完成（會顯示綠色 ✓）

### ✅ 方案 2: 通過 Vercel CLI 手動部署

```bash
# 步驟 1: 安裝 Vercel CLI (如果還沒安裝)
npm install -g vercel

# 步驟 2: 進入項目目錄
cd /home/shawc/worldmonitor

# 步驟 3: 部署到生產環境
vercel deploy --prod

# 步驟 4: 等待完成（應該看到新的 URL）
```

### ✅ 方案 3: 推送空提交觸發部署

```bash
git commit --allow-empty -m "trigger: redeploy to vercel"
git push origin main
```

然後等待 Vercel webhook 觸發新部署（通常 5-10 分鐘）。

## 🧪 部署完成後的驗證

### 1️⃣ 檢查是否已部署新版本

訪問 https://worldmonitor-six.vercel.app/ 並開啟開發者工具 (F12)

在 **Console** 執行:
```javascript
window.i18nDebug.getDebugInfo()
```

**預期結果:**
```javascript
{
  currentLocale: 'zh-TW',        // 如果瀏覽器語言是中文
  savedLocale: null,
  browserLanguage: 'zh-TW',
  allStorageKeys: [...]
}
```

### 2️⃣ 檢查中文翻譯是否可用

在 **Console** 執行:
```javascript
window.i18nDebug.setLocale('zh-TW')
```

頁面應立即以中文刷新。

### 3️⃣ 檢查語言選擇器

頁面右上角應該有 EN / 繁中 選擇器，可以點擊 "繁中" 立即切換。

## ⏱️ 預期時間表

| 時間 | 事件 |
|------|------|
| ✅ 已完成 | 代碼修復並推送到 GitHub main |
| ✅ 已完成 | GitHub Pages 自動部署完成 |
| ⏳ 進行中 | Vercel 等待重新部署 |
| 🎯 目標 | 手動觸發或等待自動部署 (5-30 分鐘) |
| 📱 完成 | 中文在 worldmonitor-six.vercel.app 上可用 |

## 📋 推薦步驟

### 立即執行 (推薦方案 1 - 最快)

1. 打開 https://vercel.com/dashboard
2. 進入 worldmonitor 項目
3. 點擊最新部署旁的 ⋯ → Redeploy
4. 等待 2 分鐘

### 或者等待自動部署

- Vercel 通常在 5-10 分鐘內自動部署
- 如果 15 分鐘後仍未更新，使用方案 1 手動觸發

## 🔗 相關資源

- **Vercel 文檔**: https://vercel.com/docs/deployments/redeploy
- **本地構建驗證**: ✅ 已完成 - npm run build 成功
- **中文翻譯驗證**: ✅ 已確認 - 482 條繁中翻譯已包含在構建中

## 💡 核心要點

- ✅ **代碼已修復** - TypeScript 錯誤已解決
- ✅ **GitHub Pages 已更新** - 中文已可用
- ⏳ **Vercel 需要重新部署** - 手動觸發或等待自動 webhook
- 🎯 **預期結果** - Vercel 部署完成後中文將可用

## 🆘 如果仍有問題

1. **檢查 Vercel 構建日誌**
   - Vercel Dashboard → Deployments → 點擊部署 → View Build Logs
   - 查找任何錯誤信息

2. **檢查是否是瀏覽器緩存**
   - 打開隱私瀏覽窗口再試一次
   - 或手動清除 LocalStorage: `localStorage.removeItem('worldmonitor-locale')`

3. **驗證 Vercel 環境配置**
   - 確保 Vercel 項目的環境變數設置正確
   - 檢查 Build Command: `npm run build`
   - 檢查 Output Directory: `dist`

---

**推薦操作**: 現在手動觸發 Vercel 重新部署 (方案 1)，預計 2 分鐘內完成。

**更新時間**: 2026-02-13 00:06 UTC
