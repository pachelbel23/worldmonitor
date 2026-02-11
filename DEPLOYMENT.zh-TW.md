# 部署指南 (繁體中文)

本項目已配置自動化 CI/CD 和部署流程。本文件說明如何完成 Vercel 部署設置。

## 目錄
- [快速開始](#快速開始)
- [Vercel 部署步驟](#vercel-部署步驟)
- [GitHub Secrets 配置](#github-secrets-配置)
- [本地測試](#本地測試)
- [故障排除](#故障排除)

## 快速開始

本項目使用 Vercel 進行生產部署，使用 GitHub Actions 進行 CI/CD 測試。

### 已配置的工作流：
- ✅ **test.yml** - TypeScript 和多版本 Node.js 測試
- ✅ **lint.yml** - ESLint 和類型檢查
- ✅ **security.yml** - npm audit 和 Gitleaks 安全掃描
- ✅ **i18n-check.yml** - 中文翻譯驗證 (204 個翻譯鍵)
- ✅ **deploy.yml** - Vercel 自動部署

## Vercel 部署步驟

### 第 1 步：在 Vercel 上連接倉庫

1. 訪問 [Vercel Dashboard](https://vercel.com/dashboard)
2. 登錄或註冊 Vercel 賬戶（建議使用 GitHub 賬戶登錄）
3. 點擊 **Add New...** 按鈕，選擇 **Project**
4. 在 **Import Git Repository** 區域，搜尋並選擇你的倉庫：
   ```
   pachelbel23/worldmonitor
   ```
5. 確保 **Framework Preset** 已自動設置為 **Vite**（如果沒有，手動選擇）
6. **Build & Output Settings** 應該是：
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. 點擊 **Deploy**

Vercel 會自動構建並部署你的項目！部署完成後，你會看到一個 URL，類似於：
```
https://worldmonitor-[random-id].vercel.app
```

### 第 2 步：配置自定義域名（可選）

如果你想使用自定義域名：

1. 在 Vercel 項目設置中，進入 **Domains**
2. 點擊 **Add Custom Domain**
3. 輸入你想使用的域名（例如 `worldmonitor.yourdomain.com`）
4. 按照 Vercel 提供的 DNS 配置說明進行設置

## GitHub Secrets 配置

要啟用自動化部署，你需要在 GitHub 中配置三個秘密。

### 第 1 步：獲取 Vercel 認證信息

#### 獲取 `VERCEL_TOKEN`：
1. 訪問 [Vercel Account Settings](https://vercel.com/account)
2. 進入 **Tokens** 部分
3. 點擊 **Create Token**
4. 輸入令牌名稱（例如 `worldmonitor-github-ci`）
5. 設置過期時間（可選）
6. 點擊 **Create** 並複製生成的令牌

#### 獲取 `VERCEL_ORG_ID` 和 `VERCEL_PROJECT_ID`：
1. 進入 [Vercel 項目設置](https://vercel.com/projects)
2. 選擇 **worldmonitor** 項目
3. 進入 **Settings** 標籤
4. 向下滾動找到 **Project ID** - 複製此值作為 `VERCEL_PROJECT_ID`
5. 你的 **VERCEL_ORG_ID** 是你的 Vercel 用戶名或組織名稱
   - 你可以在頁面頂部的 URL 中看到：`https://vercel.com/[ORG_ID]/worldmonitor/settings`

### 第 2 步：在 GitHub 中添加 Secrets

1. 進入你的 GitHub 倉庫
2. 點擊 **Settings** 標籤
3. 進入 **Secrets and variables** → **Actions**
4. 點擊 **New repository secret**
5. 添加以下三個秘密：

| 秘密名稱 | 值 | 描述 |
|---------|---|-----|
| `VERCEL_TOKEN` | [從步驟 1 複製] | Vercel 個人訪問令牌 |
| `VERCEL_ORG_ID` | 你的用戶名或組織名稱 | Vercel 組織 ID |
| `VERCEL_PROJECT_ID` | [從步驟 1 複製] | Vercel 項目 ID |

### 第 3 步：驗證部署

1. 進入倉庫的 **Actions** 標籤
2. 你應該會看到最新的工作流運行（triggered by the earlier commits）
3. 所有工作流應該通過綠色 ✅
4. 部署完成後，訪問你的 Vercel URL 測試應用

## 本地測試

在部署前，建議本地測試應用：

### 開發環境
```bash
# 安裝依賴
npm install

# 啟動開發服務器 (http://localhost:5173)
npm run dev

# 測試中文界面：
# 1. 打開應用
# 2. 查看右上角的語言切換按鈕
# 3. 點擊切換到繁體中文
# 4. 驗證所有 UI 文本已翻譯
```

### 生產構建測試
```bash
# 構建應用
npm run build

# 本地預覽生產構建
npm run preview

# 訪問 http://localhost:4173 測試
```

### 代碼質量檢查
```bash
# 運行 TypeScript 類型檢查
npm run typecheck

# 運行 ESLint 檢查代碼風格
npm run lint

# 運行所有測試
npm test
```

## CI/CD 工作流詳情

### test.yml - 類型檢查和構建測試
- 在 Node.js 18, 20, 22 上運行
- 執行 TypeScript 類型檢查
- 執行完整構建
- 確保多版本兼容性

### lint.yml - 代碼質量檢查
- 運行 ESLint 檢查
- 執行 TypeScript 類型檢查
- 確保代碼風格一致

### security.yml - 安全掃描
- `npm audit` - 檢查依賴漏洞
- `Gitleaks` - 掃描提交中的敏感信息（API 密鑰等）
- 防止安全問題進入倉庫

### i18n-check.yml - 翻譯驗證
- 驗證所有 204 個翻譯鍵
- 確保英文和繁體中文都有翻譯
- 防止缺失翻譯

### deploy.yml - 部署流程
- 在 `main` 分支上自動觸發
- 安裝依賴
- 構建應用
- 部署到 Vercel（如果設置了 secrets）
- 生成部署 URL

## 故障排除

### 部署工作流失敗："Error: VERCEL_TOKEN is not set"
**解決方案:** 檢查你是否正確添加了所有三個 GitHub secrets。秘密需要完全匹配上方列出的名稱。

### 部署到 Vercel 後得到 404 錯誤
**解決方案:** 
1. 檢查 Vercel 構建日誌，確保構建成功
2. 驗證 `dist` 目錄存在且有 `index.html`
3. 清除瀏覽器緩存
4. 等待 1-2 分鐘讓 CDN 緩存更新

### 中文文本顯示不正確
**解決方案:**
1. 刷新頁面（Ctrl+F5 完全刷新）
2. 清除瀏覽器緩存
3. 檢查瀏覽器主題 - 某些主題可能影響字體渲染

### npm audit 警告
**解決方案:**
- 大多數警告是來自大型依賴（如 deck.gl 等科學可視化庫）
- 這些警告通常不是關鍵的（大多數是開發時依賴）
- 運行 `npm audit fix` 可以自動修復一些問題
- 重大漏洞會阻止部署

## 監控和維護

### 監控部署
1. 訪問 [Vercel Dashboard](https://vercel.com/dashboard)
2. 選擇 **worldmonitor** 項目
3. 查看 **Deployments** 標籤獲取歷史部署記錄
4. 檢查部署日誌排除問題

### 監控 CI/CD
1. 進入 GitHub 倉庫的 **Actions** 標籤
2. 查看最新的工作流運行
3. 點擊任何失敗的工作流查看詳細日誌

### 依賴更新
本項目配置了 **Dependabot**：
- 自動掃描依賴更新
- 為每個更新創建 Pull Request
- 自動運行 CI/CD 測試
- 檢查並合並安全無誤的 PR

## 常見問題

**Q: 我需要購買 Vercel？**
A: 不需要！Vercel 的免費計劃足以應對大多數個人和開源項目。Hobby 計劃包括無限制部署、自定義域名等。

**Q: 如何回到 GitHub Pages？**
A: 編輯 `.github/workflows/deploy.yml` 並恢復為使用 `peaceiris/actions-gh-pages`，然後配置 GitHub 倉庫設置回 Pages。

**Q: 我可以同時部署到多個平台嗎？**
A: 可以！你可以添加多個部署步驟到 `deploy.yml`，同時部署到 Vercel、GitHub Pages、Netlify 等。

**Q: 如何配置自定義域名？**
A: 參見上方 [第 2 步：配置自定義域名](#第-2-步配置自定義域名可選)。

## 技術棧

- **框架:** Vite + TypeScript
- **語言支持:** English (en) + 繁體中文 (zh-TW)
- **CI/CD:** GitHub Actions
- **部署:** Vercel
- **代碼質量:** ESLint + TypeScript
- **安全掃描:** npm audit + Gitleaks

## 項目統計

- 📝 **204 個翻譯鍵** - 完整的中英文支持
- 🔒 **5 個 CI/CD 工作流** - 全面的質量保證
- 🌍 **響應式設計** - 支持所有設備
- ⚡ **Vite 構建** - 快速構建和加載

## 獲取幫助

- 📚 [Vercel 文檔](https://vercel.com/docs)
- 📚 [GitHub Actions 文檔](https://docs.github.com/en/actions)
- 💬 [原始項目 GitHub Issues](https://github.com/koala73/worldmonitor/issues)
- 🐛 [這個 Fork 的 Issues](https://github.com/pachelbel23/worldmonitor/issues)

---

**最後更新:** 2025 年 2 月 11 日
**維護者:** pachelbel23
**基礎項目:** koala73/worldmonitor
