# World Monitor 中文化版本

這是 [World Monitor](https://github.com/koala73/worldmonitor) 的繁體中文（Traditional Chinese）版本。

## 🌍 關於 World Monitor

World Monitor 是一個實時全球智能儀表板，整合了 50+ 個數據源，提供：
- 🗞️ **即時新聞聚合** - 來自 100+ 個精選信息源
- 🗺️ **地理空間可視化** - 交互式地圖，25 層可切換數據
- 🤖 **AI 摘要生成** - 自動化焦點檢測和摘要
- 📊 **多維度監控** - 地緣政治、經濟、技術、軍事數據
- 🔄 **實時更新** - WebSocket 實時數據流

## 🚀 中文化功能

- ✅ **完整繁體中文 UI** - 200+ 個翻譯字符串
- ✅ **雙語支持** - 中文/英文無縫切換
- ✅ **地區本地化** - 針對繁體中文用戶優化
- ✅ **響應式設計** - 支持各種屏幕尺寸

## 📋 快速開始

### 前置條件
- Node.js 18+ 或 20+
- npm 或 yarn

### 開發

```bash
# 安裝依賴
npm install

# 開發服務器（默認端口 5173）
npm run dev

# 開發科技變體
npm run dev:tech
```

### 生產構建

```bash
# 構建地緣政治版本
npm run build

# 構建科技版本
npm run build:tech

# 類型檢查
npm run typecheck

# 預覽構建結果
npm run preview
```

## 🏗️ 項目結構

```
src/
├── App.ts              # 主應用邏輯（含中文化）
├── components/         # UI 組件（中文化版本）
│   ├── Panel.ts       # 基礎面板組件
│   ├── NewsPanel.ts   # 新聞面板
│   └── SearchModal.ts # 搜索模態框
├── config/            # 配置文件
│   └── panels.ts      # 面板配置（中文化）
├── services/          # 數據服務層
├── utils/             # 工具函數
│   └── i18n.ts        # 國際化（i18n）系統
└── styles/            # 樣式文件
```

## 🌐 國際化 (i18n)

所有用戶界面文本都通過 `i18n.ts` 集中管理：

```typescript
// 使用翻譯函數
import { t } from '@/utils';

const label = t('Global Map');  // 自動返回中文或英文
```

支持的語言：
- `en` - English
- `zh-TW` - 繁體中文

## 🔧 構建變體

項目支持兩種構建變體（通過 `VITE_VARIANT` 環境變量）：

- **full** - 地緣政治版本（所有數據源）
- **tech** - 科技版本（聚焦創業、AI、科技）

## 📊 CI/CD 工作流

所有 push 和 pull request 都會觸發自動化測試：

- ✅ TypeScript 類型檢查
- ✅ 多變體構建測試
- ✅ ESLint 代碼質量檢查
- ✅ npm 依賴安全掃描
- ✅ 密鑰檢測（Gitleaks）
- ✅ GitHub Pages 自動部署

## 🚢 部署

此版本配置為自動部署到 GitHub Pages：

**訪問地址**：`https://pachelbel23.github.io/worldmonitor/`

部署工作流在 `main` 分支有新 commit 時自動運行。

## 🔒 安全性

- **Dependabot** - 週一自動檢查依賴更新
- **npm audit** - 定期安全掃描（每日 UTC 2:00）
- **Gitleaks** - 防止硬編碼敏感信息
- **TypeScript 嚴格模式** - 類型安全

## 📝 許可證

本項目基於 [World Monitor](https://github.com/koala73/worldmonitor) 的 **MIT License**。

中文化部分由 pachelbel23 貢獻，遵循相同的 MIT License。

## 👏 致謝

- 原始項目：[koala73/worldmonitor](https://github.com/koala73/worldmonitor)
- 中文化：pachelbel23

## 📧 反饋與貢獻

如有任何建議或問題，歡迎開設 Issue 或提交 Pull Request！

---

**最後更新**：2026年2月11日
**構建狀態**：查看 [GitHub Actions](https://github.com/pachelbel23/worldmonitor/actions)
