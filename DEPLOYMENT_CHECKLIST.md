# 🚀 World Trade 部署檢查清單

## 每次部署後的標準流程

### ✅ 部署前檢查
- [ ] 確保本地代碼已同步 (`git pull`)
- [ ] 運行 TypeScript 檢查 (`npm run typecheck`)
- [ ] 本地構建驗證 (`npm run build`)
- [ ] 查看構建警告和錯誤

### ✅ 代碼修改提交
- [ ] 所有文件都已新增到 git (`git status`)
- [ ] 提交訊息清晰且描述性 (使用 `feat:`, `fix:`, `docs:` 等前綴)
- [ ] 推送到 GitHub (`git push origin main`)

### ✅ 部署執行
- [ ] Vercel: 確認自動部署已觸發（GitHub 推送後 1-3 分鐘）
- [ ] GitHub Pages: 檢查 Actions 工作流運行狀態
- [ ] 等待部署完成（查看綠色✅ 標記）

### ✅ 部署驗證
- [ ] 訪問部署的 URL 並驗證頁面加載
- [ ] 檢查基本功能（地圖、新聞面板、語言切換）
- [ ] 開啟瀏覽器開發者工具查看是否有 console 錯誤
- [ ] 測試新聞面板數據加載（等待 10-30 秒）

### ✅ 更新文檔

#### 1. 更新 README 文件
```bash
# 編輯以下文件，記錄新的部署信息
- README.md           (英文版本)
- README.zh-TW.md     (繁體中文版本)

# 通常需要更新的部分:
- Live Demos 表格 (新增部署 URL)
- 架構/功能說明 (如有重大改變)
- 部署選項說明 (部署方式、特點)
```

#### 2. 更新進度文檔
```bash
# 創建或更新今日進度文件
SESSION_PROGRESS_YYYY-MM-DD.md

# 記錄內容:
- 部署日期和時間
- 修改的代碼文件清單
- 新增/修改的功能
- 任何已知問題
- Git 提交 SHA
```

#### 3. 提交文檔更新
```bash
git add README.md README.zh-TW.md SESSION_PROGRESS_*.md
git commit -m "docs: update README and session progress after deployment"
git push origin main
```

---

## 部署命令快速參考

### Vercel 部署
```bash
# 首次登錄（需要瀏覽器授權）
vercel login

# 部署到生產環境
vercel deploy --prod --yes

# 部署並跳過交互提示
vercel deploy --prod --force
```

### GitHub Pages 部署
```bash
# 推送到 main 分支（自動觸發 Actions）
git push origin main

# 檢查部署狀態
# GitHub → Actions → Deploy to Pages (workflow)
```

### 本地構建
```bash
# 完整構建流程
npm run typecheck && npm run build

# 預覽構建結果
npm run preview
```

---

## 部署 URL 快速參考

| 部署方式 | URL | 更新頻率 |
|---------|-----|---------|
| **Vercel** | https://worldtrade-six.vercel.app | 自動（推送後 1-3 分鐘） |
| **GitHub Pages** | https://pachelbel23.github.io/worldtrade/ | 自動（Actions 完成後） |
| **原始網站** | https://worldtrade.app | 原始開發者維護 |

---

## 故障排除

### Vercel 部署失敗

**問題**: `Git author must have access to team`
```bash
# 解決方案：登出並重新登入
vercel logout
vercel login
vercel deploy --prod --yes
```

### GitHub Pages 顯示 404
```bash
# 檢查清單：
1. Settings → Pages → Source 設為 "GitHub Actions"
2. 檢查 .github/workflows/deploy.yml 是否存在
3. 檢查 vite.config.ts 的 base 設定
4. 硬刷新瀏覽器 (Ctrl+Shift+R)
```

### 新聞源不顯示（No news available）

**原因**: RSS 代理延遲或暫時故障
```bash
# 檢查：
1. 等待 30-60 秒讓數據加載
2. 打開瀏覽器控制台檢查 console 錯誤
3. 檢查 src/config/feeds.ts 中的 RSS 代理 URL
4. 驗證 rss2json.com API 可用性
```

---

## 文檔更新模板

### README.md / README.zh-TW.md 更新範例

```markdown
## Live Demos / 部署選項

| 部署方式 | URL | 特點 | 更新日期 |
|---------|-----|------|---------|
| **Vercel** | https://worldtrade-six.vercel.app | RSS 代理已集成 | 2026-02-11 |
| **GitHub Pages** | https://pachelbel23.github.io/worldtrade/ | 靜態部署，中文完整 | 2026-02-11 |
| **原始** | https://worldtrade.app | 完全功能 | - |
```

### SESSION_PROGRESS 記錄範例

```markdown
# World Trade 項目進度 - 2026年2月11日

## 📊 本次成果
- ✅ Vercel 部署完成
- ✅ RSS 代理集成（rss2json.com）
- ✅ README 多語言更新

## 🔧 修改文件
- src/config/feeds.ts - RSS 代理更新
- src/services/rss.ts - JSON 格式支持
- README.md, README.zh-TW.md - 部署信息

## 📋 Git 提交
- f75052e - docs: update README with Vercel deployment

## 🌐 部署 URL
- Vercel: https://worldtrade-six.vercel.app
- GitHub Pages: https://pachelbel23.github.io/worldtrade/
```

---

## 最佳實踐

1. **每次部署都要更新 README**
   - 添加新 URL
   - 更新特點說明
   - 記錄修改日期

2. **保持進度文檔最新**
   - 記錄今日工作成果
   - 列出修改文件清單
   - 記錄 Git commit SHA

3. **推送到 GitHub**
   - README 更新必須推送
   - 進度文檔也要提交
   - 保持 GitHub 倉庫為真實信息源

4. **驗證部署成功**
   - 不要跳過驗證步驟
   - 檢查新功能是否正常工作
   - 監控 console 是否有錯誤

---

## 檢查清單模板

```bash
# 部署前
[ ] npm run typecheck ✓
[ ] npm run build ✓
[ ] 代碼推送到 GitHub ✓

# 部署中
[ ] Vercel 自動部署完成 ✓
[ ] GitHub Pages Actions 成功 ✓

# 部署後
[ ] URL 可訪問 ✓
[ ] 基本功能正常 ✓
[ ] 無 console 錯誤 ✓
[ ] README 已更新 ✓
[ ] 進度文檔已更新 ✓
[ ] 文檔已推送到 GitHub ✓
```

---

**維護者**: GitHub Copilot CLI
**最後更新**: 2026-02-11
**版本**: 1.0
