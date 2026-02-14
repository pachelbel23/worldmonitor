# World Trade - 繁體中文版本

<p align="center">
  <a href="https://worldtrade.app"><strong>線上示範</strong></a> &nbsp;·&nbsp;
  <a href="https://tech.worldtrade.app"><strong>科技變體</strong></a> &nbsp;·&nbsp;
  <a href="./docs/DOCUMENTATION.md"><strong>完整文檔</strong></a> &nbsp;·&nbsp;
  <a href="https://worldtrade-six.vercel.app"><strong>Vercel 部署版</strong></a> &nbsp;·&nbsp;
  <a href="https://pachelbel23.github.io/worldtrade/"><strong>GitHub Pages</strong></a>
</p>

---

## 🌍 關於 World Trade

World Trade 是一個實時全球智能儀表板，整合了 50+ 個數據源，提供：
- 🗞️ **即時新聞聚合** - 來自 100+ 個精選信息源
- 🗺️ **地理空間可視化** - 交互式地圖，25 層可切換數據
- 🤖 **AI 摘要生成** - 自動化焦點檢測和摘要
- 📊 **多維度監控** - 地緣政治、經濟、技術、軍事數據
- 🔄 **實時更新** - WebSocket 實時數據流

## 🚀 中文化功能

- ✅ **完整繁體中文 UI** - 350+ 個翻譯字符串
- ✅ **雙語支持** - 中文/英文無縫切換
- ✅ **地區本地化** - 針對繁體中文用戶優化
- ✅ **響應式設計** - 支持各種屏幕尺寸
- ✅ **新聞來源中文化** - 160+ 個 RSS 來源名稱翻譯（路透社、美聯社、半島電視台等）
- ✅ **中文 RSS 自動切換** - BBC 中文、聯合國中文等來源自動切換
- ✅ **AI 標題翻譯** - Groq 批次翻譯新聞標題，Redis 快取 24 小時

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
const source = t('Reuters');    // → '路透社'（中文）或 'Reuters'（英文）
```

支持的語言：
- `en` - English
- `zh-TW` - 繁體中文

### 新聞內容中文化

除了 UI 字串翻譯外，新聞內容也支持中文化：

- **來源名稱翻譯** — 160+ 個 RSS 來源名稱靜態翻譯（如 Reuters → 路透社）
- **中文 RSS 自動切換** — 有中文版 RSS 的來源（BBC 中文、聯合國中文）在中文語系下自動切換
- **AI 標題翻譯** — 無中文 RSS 的來源，透過 Groq API 批次翻譯標題，Redis 快取 24 小時

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

## 🚢 部署選項

### GitHub Pages（靜態部署）
- **訪問地址**：https://pachelbel23.github.io/worldtrade/
- **特點**：完全免費，自動部署，純靜態站點
- **部署方式**：GitHub Actions 工作流

### Vercel（推薦）
- **訪問地址**：https://worldtrade-six.vercel.app
- **特點**：使用 rss2json.com RSS 代理，新聞源正常顯示
- **部署方式**：GitHub 自動部署（連接到 Vercel）
- **費用**：免費 Personal 方案

### 原始網站
- **訪問地址**：https://worldtrade.app
- **特點**：完整功能，所有數據源可用
- **部署方式**：Vercel 原始部署

## 🔒 安全性

- **Dependabot** - 週一自動檢查依賴更新
- **npm audit** - 定期安全掃描（每日 UTC 2:00）
- **Gitleaks** - 防止硬編碼敏感信息
- **TypeScript 嚴格模式** - 類型安全

## 📝 許可證

本項目基於 [World Trade](https://github.com/koala73/worldtrade) 的 **MIT License**。

中文化部分由 pachelbel23 貢獻，遵循相同的 MIT License。

## 👏 致謝

- 原始項目：[koala73/worldtrade](https://github.com/koala73/worldtrade)
- 中文化：pachelbel23

## 📧 反饋與貢獻

如有任何建議或問題，歡迎開設 Issue 或提交 Pull Request！

---

**最後更新**：2026年2月14日
**構建狀態**：查看 [GitHub Actions](https://github.com/pachelbel23/worldtrade/actions)

---

# World Trade - English Version

<p align="center">
  <a href="https://worldtrade.app"><strong>Live Demo</strong></a> &nbsp;·&nbsp;
  <a href="https://tech.worldtrade.app"><strong>Tech Variant</strong></a> &nbsp;·&nbsp;
  <a href="./docs/DOCUMENTATION.md"><strong>Full Documentation</strong></a> &nbsp;·&nbsp;
  <a href="https://worldtrade-six.vercel.app"><strong>Vercel Deployment</strong></a> &nbsp;·&nbsp;
  <a href="https://pachelbel23.github.io/worldtrade/"><strong>GitHub Pages</strong></a>
</p>

## 🌍 About World Trade

World Trade is a real-time global intelligence dashboard that integrates 50+ data sources, providing:
- 🗞️ **Real-time News Aggregation** - From 100+ curated information sources
- 🗺️ **Geospatial Visualization** - Interactive maps with 25 toggleable data layers
- 🤖 **AI-powered Summaries** - Automated hotspot detection and summarization
- 📊 **Multi-dimensional Monitoring** - Geopolitical, economic, technical, and military data
- 🔄 **Real-time Updates** - WebSocket-based data streaming

## 🚀 Features

- ✅ **Complete English/Chinese UI** - 350+ translation strings
- ✅ **Dual Language Support** - Seamless switching between Chinese and English
- ✅ **Region Localization** - Optimized for Traditional Chinese (zh-TW) users
- ✅ **Responsive Design** - Supports various screen sizes

## 📋 Quick Start

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Development

```bash
# Install dependencies
npm install

# Development server (default port 5173)
npm run dev

# Development tech variant
npm run dev:tech
```

### Production Build

```bash
# Build geopolitical version
npm run build

# Build tech version
npm run build:tech

# Type check
npm run typecheck

# Preview build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── App.ts              # Main application logic
├── components/         # UI components
│   ├── Panel.ts       # Base panel component
│   ├── NewsPanel.ts   # News panel
│   └── SearchModal.ts # Search modal
├── config/            # Configuration files
│   └── panels.ts      # Panel configuration
├── services/          # Data service layer
├── utils/             # Utility functions
│   └── i18n.ts        # Internationalization (i18n) system
└── styles/            # Stylesheets
```

## 🌐 Internationalization (i18n) - 國際化

### 翻譯覆蓋

- **Phase 1-2**: 195+ 核心 UI 字符串完全翻譯
  - 無障礙標籤和工具提示
  - 新聞來源可信度指標
  - 飛行狀態標籤和地圖交互文本

- **Phase 3**: 複雜語言邏輯
  - `pluralize.ts` - 語言感知複數形式
    - 英文：支持單/複數形式分別
    - 中文：統一使用不分複數形式
  - `date-formatter.ts` - 多語言日期時間格式化
    - 支持 en-US 和 zh-TW 地區設定
    - 5 種不同場景的格式化函數

- **Phase 5**: 模組化架構
  - `src/i18n/{en,zh-TW}/` 目錄結構
  - TypeScript 類型安全的翻譯鍵
  - 為未來新語言奠定基礎

- **Phase 6**: 新聞內容中文化
  - 160+ 個 RSS 來源名稱翻譯
  - 中文 RSS 自動切換（BBC 中文、聯合國中文）
  - Groq AI 批次標題翻譯 + Redis 快取
  - 前端翻譯服務（記憶體快取）

### 支持的語言

```typescript
import { t } from '@/utils';

const label = t('Global Map');  // 自動返回中文或英文
```

- `en` - English (英文)
- `zh-TW` - Traditional Chinese (繁體中文)

## 🔧 Build Variants

The project supports two build variants (controlled via `VITE_VARIANT` environment variable):

- **full** - Geopolitical version (all data sources)
- **tech** - Tech variant (focused on startups, AI, tech companies)

## 📊 CI/CD Workflow

All pushes and pull requests trigger automated testing:

- ✅ TypeScript type checking
- ✅ Multi-variant build testing
- ✅ ESLint code quality checks
- ✅ npm dependency security scanning
- ✅ Secret detection (Gitleaks)
- ✅ GitHub Pages automatic deployment

## 🚢 Deployment Options

### GitHub Pages (Static Deployment)
- **URL**: https://pachelbel23.github.io/worldtrade/
- **Features**: Completely free, auto-deployed, pure static site
- **Method**: GitHub Actions workflow

### Vercel (Recommended)
- **URL**: https://worldtrade-six.vercel.app
- **Features**: Uses rss2json.com RSS proxy for working news sources
- **Method**: Auto-deployed from GitHub
- **Cost**: Free Personal plan

### Original Site
- **URL**: https://worldtrade.app
- **Features**: Full functionality, all data sources available
- **Method**: Original Vercel deployment

## 🔒 Security

- **Dependabot** - Automated dependency updates check every Monday
- **npm audit** - Regular security scanning (daily at 2:00 UTC)
- **Gitleaks** - Prevention of hardcoded sensitive information
- **TypeScript Strict Mode** - Type safety

## 📝 License

This project is based on [World Trade](https://github.com/koala73/worldtrade) under the **MIT License**.

The Chinese localization is contributed by pachelbel23 under the same MIT License.

## 👏 Acknowledgments

- Original project: [koala73/worldtrade](https://github.com/koala73/worldtrade)
- Chinese localization: pachelbel23

## 📧 Feedback and Contributions

Feel free to open an Issue or submit a Pull Request for any suggestions or questions!

---

**Last Updated**: February 14, 2026
**Latest**: Phase 6 news content localization - 160+ source name translations, Chinese RSS auto-switching, Groq batch title translation with Redis cache
**Build Status**: Check [GitHub Actions](https://github.com/pachelbel23/worldtrade/actions)
