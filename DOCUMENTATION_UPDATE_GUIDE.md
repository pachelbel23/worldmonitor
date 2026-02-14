# 部署後文檔更新指南

## 快速流程（每次部署後執行）

```bash
# 1️⃣ 更新 README 文件
nano README.md          # 編輯英文版本
nano README.zh-TW.md    # 編輯繁體中文版本

# 需要更新的部分：
# - Live Demos 表格（新增部署 URL）
# - 部署說明（部署方式、特點）
# - 更新日期

# 2️⃣ 創建或更新進度文件
nano SESSION_PROGRESS_YYYY-MM-DD.md

# 記錄內容：
# - 部署日期和時間
# - 修改的代碼文件
# - 新增/修改的功能
# - Git 提交 SHA
# - 部署 URL

# 3️⃣ 提交文檔
git add README.md README.zh-TW.md SESSION_PROGRESS_*.md
git commit -m "docs: update README and session progress after [feature] deployment"
git push origin main
```

---

## 更新內容模板

### README 中新增部署版本時

```markdown
| **World Monitor (Vercel)** | https://worldmonitor-six.vercel.app | ✅ RSS 代理 | 2026-02-11 |
```

### 部署選項說明範例

```markdown
## 🚢 部署選項

### Vercel（推薦）
- **URL**: https://worldmonitor-six.vercel.app
- **特點**: 新聞源正常，rss2json.com 代理，自動部署
- **更新日期**: 2026-02-11

### GitHub Pages
- **URL**: https://pachelbel23.github.io/worldmonitor/
- **特點**: 免費，靜態部署，中文完整
- **更新日期**: 2026-02-11

### 原始網站
- **URL**: https://worldmonitor.app
- **特點**: 完整功能，所有數據源
```

### SESSION_PROGRESS 記錄範例

```markdown
# World Monitor 項目進度 - YYYY年MM月DD日

## 📊 本次成果
- ✅ [功能或修復描述]
- ✅ [功能或修復描述]

## 🔧 修改文件
- src/path/file.ts - 修改說明
- src/path/file.ts - 修改說明

## 🌐 部署信息
- **Vercel**: https://worldmonitor-six.vercel.app
- **GitHub Pages**: https://pachelbel23.github.io/worldmonitor/

## 📋 Git 提交
- COMMIT_SHA - commit message

## ✅ 驗證結果
- [x] 構建成功
- [x] 部署完成
- [x] URL 可訪問
- [x] 功能正常
```

---

## 文檔清單

本專案應維護的文檔：

| 文檔 | 用途 | 更新頻率 |
|------|------|---------|
| `README.md` | 英文版主文檔 | 每次部署 |
| `README.zh-TW.md` | 繁體中文版本 | 每次部署 |
| `DEPLOYMENT_CHECKLIST.md` | 部署標準流程 | 按需 |
| `SESSION_PROGRESS_YYYY-MM-DD.md` | 開發日誌 | 每個會話 |
| `GITHUB_DEPLOYMENT.skill` | 部署參考指南 | 按需 |
| `.github/copilot-instructions.md` | Copilot 上下文 | 按需 |

---

## 推送檢查清單

每次推送文檔前：

```bash
# ✅ 檢查 git 狀態
git status

# ✅ 檢查修改內容
git diff README.md

# ✅ 添加修改文件
git add README.md README.zh-TW.md SESSION_PROGRESS_*.md

# ✅ 提交（使用清晰的訊息）
git commit -m "docs: update README and session progress"

# ✅ 推送到 GitHub
git push origin main
```

---

## 常見更新場景

### 場景 1：新增部署版本

**修改**:
1. README.md - Live Demos 表格添加新行
2. README.zh-TW.md - 同上（英文和中文兩個版本）
3. 添加部署選項說明

**提交訊息**:
```
docs: add [deployment-name] deployment to README
```

### 場景 2：功能更新

**修改**:
1. 創建新的 SESSION_PROGRESS_YYYY-MM-DD.md
2. 記錄修改文件和功能說明
3. 如有架構改變，更新 README 相關部分

**提交訊息**:
```
docs: record session progress for [feature-name]
```

### 場景 3：修復問題

**修改**:
1. 添加到現有 SESSION_PROGRESS 文件
2. 記錄問題和解決方案
3. 如適用，更新 DEPLOYMENT_CHECKLIST.md

**提交訊息**:
```
docs: update progress - fixed [issue-description]
```

---

## 自動化建議

未來可考慮建立：

```bash
# 部署後自動執行的檢查清單
./scripts/post-deploy.sh

# 內容包括：
# 1. 驗證部署 URL 可訪問
# 2. 檢查構建輸出大小
# 3. 記錄部署時間戳
# 4. 提醒更新 README
```

---

## 重要提示

1. **README 必須同步更新**
   - 不要讓文檔和實際部署不同步
   - 新增 URL 後立即更新

2. **進度文檔要詳細**
   - 記錄每次會話的工作成果
   - 包含 Git commit SHA 便於追蹤
   - 記錄部署 URL 供驗證

3. **推送到 GitHub**
   - README 和進度文檔都是項目的重要部分
   - GitHub 倉庫應為真實信息源
   - 不要只保存在本地

4. **保持格式一致**
   - 使用相同的 Markdown 格式
   - 使用相同的文檔結構
   - 便於未來維護和搜索

---

**維護者**: GitHub Copilot CLI
**最後更新**: 2026-02-11
**版本**: 1.0
