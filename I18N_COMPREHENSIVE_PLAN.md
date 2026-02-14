# World Trade UI 多語系完整化方案

## 📋 執行摘要

目前專案的 i18n 完成度：**81-86%**

**現狀**:
- ✅ 已翻譯: ~155 個字符串
- ❌ 缺失翻譯: ~25-35 個字符串  
- ⚠️ 待處理複雜場景: 複數形式、日期格式、動態內容

**目標**: 達到 **100% UI 多語系支持**，同時保留未來擴展性

---

## 🎯 可行方案概覽

### 方案選擇: **漸進式迭代方案**

| 階段 | 工作項 | 時間 | 優先級 |
|------|--------|------|--------|
| **Phase 1** | 無障礙和信任指標文本 | 1 小時 | 🚨 高 |
| **Phase 2** | 操作提示和工具提示 | 1 小時 | ⚠️ 中 |
| **Phase 3** | 複數/日期/複雜邏輯 | 1 小時 | ✅ 低 |
| **Phase 4** | 資料源文本本地化 | 2-3 小時 | 📊 中 |
| **總計** | - | **4-5 小時** | - |

---

## 📍 詳細可行方案

### **Phase 1: 無障礙和信任指標（高優先級）**

#### 1.1 無障礙文本 (Panel.ts)

**現狀**:
```typescript
// Panel.ts:84
<div 
  title="Show methodology info"  // ❌ 硬編碼
  aria-label="Methodology"        // ❌ 硬編碼
>

// Panel.ts:116  
<div title="Drag to resize (double-click to reset)">  // ❌ 硬編碼
```

**方案**:
```typescript
// Panel.ts - 更新方法
constructor() {
  this.methodologyBtn.title = t('Show methodology info');
  this.methodologyBtn.setAttribute('aria-label', t('Methodology info'));
  
  this.resizeHandle.title = t('Drag to resize (double-click to reset)');
}
```

**需添加到 i18n.ts**:
```typescript
{
  'en': {
    'Show methodology info': 'Show methodology info',
    'Methodology info': 'Methodology info',
    'Drag to resize (double-click to reset)': 'Drag to resize (double-click to reset)',
  },
  'zh-TW': {
    'Show methodology info': '顯示方法論說明',
    'Methodology info': '方法論資訊',
    'Drag to resize (double-click to reset)': '拖動調整大小（雙擊重設）',
  }
}
```

#### 1.2 新聞可信度指標 (NewsPanel.ts:230-240)

**現狀**:
```typescript
// NewsPanel.ts:230
return {
  ...item,
  source: {
    tier: SOURCE_TIERS[item.source],
    description: 'Wire Service - Highest reliability',  // ❌ 硬編碼
    stateAffiliated: value > 0.3,
  }
}
```

**方案**:
```typescript
// 建立 source credibility 字典
const SOURCE_CREDIBILITY_KEYS: Record<number, string> = {
  1: 'Wire Service - Highest reliability',
  2: 'Major News Outlet',
  3: 'Specialty Media',
  4: 'Blog or Aggregator'
};

// 使用 i18n key
return {
  ...item,
  source: {
    tier: SOURCE_TIERS[item.source],
    credibilityKey: SOURCE_CREDIBILITY_KEYS[SOURCE_TIERS[item.source]],
    // 在渲染時使用 t(credibilityKey)
  }
}
```

**需添加到 i18n.ts**:
```typescript
{
  'en': {
    'Wire Service - Highest reliability': 'Wire Service - Highest reliability',
    'Major News Outlet': 'Major News Outlet',
    'Specialty Media': 'Specialty Media',
    'Blog or Aggregator': 'Blog or Aggregator',
    'Official Government Source': 'Official Government Source',
    'Verified News Outlet': 'Verified News Outlet',
  },
  'zh-TW': {
    'Wire Service - Highest reliability': '通訊社 - 最高可信度',
    'Major News Outlet': '主流新聞媒體',
    'Specialty Media': '專業媒體',
    'Blog or Aggregator': '部落格或聚合網站',
    'Official Government Source': '官方政府來源',
    'Verified News Outlet': '已驗證新聞媒體',
  }
}
```

---

### **Phase 2: 操作提示和工具提示（中優先級）**

#### 2.1 飛行狀態標籤 (flights.ts)

**現狀**:
```typescript
// flights.ts:78-89
const flightStatusMap = {
  AIRBORNE: 'Airborne',
  GROUND_DELAY: 'Ground delay',      // ❌ 硬編碼
  GROUND_STOP: 'Ground stop',        // ❌ 硬編碼
  LANDING: 'Landing',
  DIVERTED: 'Diverted'
};
```

**方案 A - 簡單（推薦）**:
```typescript
// flights.ts
const FLIGHT_STATUS_KEYS = {
  AIRBORNE: 'Airborne',
  GROUND_DELAY: 'Ground delay',
  GROUND_STOP: 'Ground stop',
  LANDING: 'Landing',
  DIVERTED: 'Diverted'
};

// 在組件渲染時使用
<span title={t(FLIGHT_STATUS_KEYS[status])}>
  {t(FLIGHT_STATUS_KEYS[status])}
</span>
```

**需添加到 i18n.ts**:
```typescript
{
  'en': {
    'Ground delay': 'Ground delay',
    'Ground stop': 'Ground stop',
  },
  'zh-TW': {
    'Ground delay': '地面延誤',
    'Ground stop': '地面停止',
  }
}
```

#### 2.2 地圖交互文本

**現狀**:
```typescript
// Map 相關文件
showOnMapButton.title = "Show on map";      // ❌ 硬編碼
moreInfoBtn.textContent = "More info";      // ❌ 硬編碼
aisSignalSpan.textContent = "AIS Signal Lost";  // ❌ 硬編碼
```

**方案**:
```typescript
// 建立常量檔案或在組件中
const MAP_ACTION_KEYS = {
  SHOW_ON_MAP: 'Show on map',
  MORE_INFO: 'More info',
  AIS_SIGNAL_LOST: 'AIS Signal Lost',
  ZOOM_IN: 'Zoom in',
  ZOOM_OUT: 'Zoom out',
  RESET_VIEW: 'Reset view',
};

// 在組件中使用
showOnMapButton.title = t(MAP_ACTION_KEYS.SHOW_ON_MAP);
```

**需添加到 i18n.ts**:
```typescript
{
  'en': {
    'Show on map': 'Show on map',
    'More info': 'More info',
    'AIS Signal Lost': 'AIS Signal Lost',
  },
  'zh-TW': {
    'Show on map': '在地圖上顯示',
    'More info': '更多資訊',
    'AIS Signal Lost': 'AIS 信號遺失',
  }
}
```

---

### **Phase 3: 複數形式和複雜邏輯（低優先級但必需）**

#### 3.1 複數形式處理

**問題**: 繁體中文沒有複數形式

**現狀**:
```typescript
// IntelligenceGapBadge.ts:58
`${count} intelligence finding${count > 1 ? 's' : ''}`  // ❌ 不適用於中文
```

**方案 - 創建複數形式輔助函數**:

```typescript
// src/utils/pluralize.ts
export interface PluralForm {
  one: string;
  other: string;
  zh_tw?: string;  // 中文不用複數，統一使用
}

export function pluralize(count: number, forms: PluralForm, locale?: string): string {
  const lang = locale || localStorage.getItem('worldtrade-locale') || 'en';
  
  if (lang === 'zh-TW') {
    // 中文：直接返回統一形式
    return forms.zh_tw || forms.other;
  }
  
  // 英文：使用複數邏輯
  return count === 1 ? forms.one : forms.other;
}

// 使用方式
const findings = pluralize(count, {
  one: '1 intelligence finding',
  other: `${count} intelligence findings`,
  zh_tw: `${count} 個智能結果`
});
```

**在 i18n.ts 中定義**:
```typescript
export const PLURAL_FORMS = {
  'intelligence_findings': {
    en: { one: '1 intelligence finding', other: '${count} intelligence findings' },
    'zh-TW': '${count} 個智能結果'
  },
  'conflicts': {
    en: { one: '1 conflict', other: '${count} conflicts' },
    'zh-TW': '${count} 個衝突'
  }
};
```

#### 3.2 日期和時間格式

**問題**: 硬編碼 'en-US' 區域

**現狀**:
```typescript
// PlaybackControl.ts:68
date.toLocaleString('en-US', {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})  // ❌ 硬編碼語言
```

**方案**:
```typescript
// src/utils/date-formatter.ts
export function formatDateTime(date: Date, locale?: string): string {
  const lang = locale || localStorage.getItem('worldtrade-locale') || 'en';
  
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'zh-TW': 'zh-TW'
  };
  
  return date.toLocaleString(localeMap[lang] || 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}

// 使用
const formatted = formatDateTime(new Date());  // 自動使用當前語言
```

---

### **Phase 4: 資料源文本本地化（中優先級）**

#### 4.1 RSS 新聞標題和摘要

**問題**: RSS 源返回多語言內容，如何對應？

**分析**:
- ✅ Reuters, BBC, CNN 等主要源：通常只有英文
- ✅ 繁體中文源：需要識別並提取
- ⚠️ 某些源有多語言版本（例如中央社有中英兩版）

**方案 A - 源偏好語言配置**:

```typescript
// src/config/feeds.ts - 擴展
interface Feed {
  name: string;
  url: string;
  preferredLanguage?: 'en' | 'zh-TW' | 'auto';  // 新增
  alternatives?: {
    'zh-TW'?: string;  // 繁體中文版本 URL
    'en'?: string;     // 英文版本 URL
  };
}

export const FEEDS: Feed[] = [
  {
    name: 'Reuters',
    url: 'https://feeds.reuters.com/...',
    preferredLanguage: 'en',  // 只有英文
  },
  {
    name: 'Central News Agency (CNA)',
    url: 'https://cna.tw/...',
    preferredLanguage: 'auto',
    alternatives: {
      'zh-TW': 'https://cna.tw/zh-tw/...',
      'en': 'https://cna.tw/english/...',
    }
  }
];
```

**方案 B - 動態語言切換**:

```typescript
// src/services/rss.ts - 修改 fetchFeed 函數
export async function fetchFeed(feed: Feed, locale?: string): Promise<NewsItem[]> {
  const lang = locale || localStorage.getItem('worldtrade-locale') || 'en';
  
  // 選擇適當的 URL
  let feedUrl = feed.url;
  if (feed.alternatives && feed.alternatives[lang as keyof typeof feed.alternatives]) {
    feedUrl = feed.alternatives[lang as keyof typeof feed.alternatives];
  }
  
  // 使用正確的 URL 獲取內容
  const response = await fetchWithProxy(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
  
  // ... 解析邏輯
}
```

#### 4.2 軍事/基礎設施數據標籤

**現狀 - 已解決 ✅**:
```typescript
// 軍事資產名稱已在 i18n.ts
'Fighters': '戰鬥機',
'Carriers': '航母',
'Submarines': '潛艇',
```

**待評估**:
- 事件狀態描述（"Airborne", "Landed"）
- 地理標籤（國家名稱已在 geo.ts）

---

### **Phase 5: 架構改進和最佳實踐**

#### 5.1 i18n 字典檔組織（推薦結構）

**當前結構** (`src/utils/i18n.ts`):
```typescript
translations: Record<string, TranslationDict> = {
  'en': { ...全部EN },
  'zh-TW': { ...全部ZH }
}
```

**推薦未來結構** (支持擴展):
```typescript
// src/i18n/index.ts
export const translations = {
  'en': { ...en },
  'zh-TW': { ...zh_TW },
  // 'ja': { ...ja },
  // 'ko': { ...ko },
};

// src/i18n/en/index.ts
export const en = {
  ...buttons,
  ...labels,
  ...panels,
  ...messages,
  ...accessibility,
  ...dataSource,
};

// src/i18n/en/buttons.ts
export const buttons = {
  'Share': 'Share',
  'Export': 'Export',
  'Close': 'Close',
};

// src/i18n/en/accessibility.ts
export const accessibility = {
  'Show methodology info': 'Show methodology info',
  'Drag to resize': 'Drag to resize (double-click to reset)',
};
```

**優勢**:
- 易於維護和擴展
- 支持未來增加新語言
- 按功能領域組織，易於查找

#### 5.2 文本檢查工具

**建議創建檢查腳本** (`scripts/i18n-check.js`):

```typescript
// 檢查所有硬編碼文本
// 1. 掃描所有 .ts/.tsx 檔案
// 2. 提取字符串字面量
// 3. 檢查是否在 i18n.ts 中
// 4. 生成缺失文本報告

// 執行: npm run i18n:check
```

#### 5.3 CI/CD 集成

**建議添加到 GitHub Actions**:
```yaml
# .github/workflows/i18n-check.yml
name: i18n Audit

on: [pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run i18n:check
      - name: Validate translations
        run: npm run i18n:validate
```

---

## 🔧 實施路線圖

### **Week 1**
```
Day 1-2: Phase 1 (無障礙文本)
  ✓ 更新 Panel.ts 中的 aria-label
  ✓ 新增 NewsPanel 可信度文本
  ✓ 提交 PR #1: "i18n: add accessibility and credibility labels"

Day 3-4: Phase 2 (操作提示)
  ✓ 更新 flights.ts 狀態文本
  ✓ 更新地圖交互文本
  ✓ 提交 PR #2: "i18n: add UI action tooltips"

Day 5: Phase 3 (複雜邏輯)
  ✓ 創建 pluralize.ts 輔助函數
  ✓ 創建 date-formatter.ts 輔助函數
  ✓ 提交 PR #3: "i18n: add pluralization and date formatting"
```

### **Week 2**
```
Day 1-2: Phase 4 (資料源)
  ✓ 配置 RSS 源語言偏好
  ✓ 實現動態語言切換邏輯
  ✓ 提交 PR #4: "i18n: enable content-source language selection"

Day 3-4: Phase 5 (架構改進)
  ✓ 重組 i18n 文件結構
  ✓ 創建檢查工具
  ✓ 添加 CI/CD 集成
  ✓ 提交 PR #5: "refactor: improve i18n architecture"

Day 5: 測試和驗證
  ✓ 完整 QA：en 和 zh-TW 語言
  ✓ 驗證所有新文本翻譯
  ✓ 檢查無障礙合規性
```

---

## 📊 實施檢查清單

### **Phase 1 實施清單**
```bash
□ src/utils/i18n.ts - 添加無障礙文本 (12 個新 key)
□ src/components/Panel.ts - 更新 title 和 aria-label
□ src/components/NewsPanel.ts - 添加可信度指標翻譯
□ 驗證 TypeScript 編譯 (npm run typecheck)
□ 本地測試：切換語言驗證顯示正確
□ 提交和推送
```

### **Phase 2 實施清單**
```bash
□ src/utils/i18n.ts - 添加操作提示 (8-10 個新 key)
□ src/services/flights.ts - 使用翻譯字典
□ Map 相關組件 - 使用翻譯函數
□ 驗證 TypeScript 編譯
□ 瀏覽器測試：工具提示和按鈕文本
□ 提交和推送
```

### **Phase 3 實施清單**
```bash
□ src/utils/pluralize.ts - 創建新檔案
□ src/utils/date-formatter.ts - 創建新檔案
□ src/utils/i18n.ts - 添加複數形式定義
□ 更新組件使用 pluralize() 和 formatDateTime()
□ 測試各種計數場景
□ 測試日期格式在不同語言
□ 提交和推送
```

### **Phase 4 實施清單**
```bash
□ src/config/feeds.ts - 擴展 Feed 介面
□ src/services/rss.ts - 添加語言參數
□ 測試語言切換時 RSS 源變更
□ 測試多語言源的加載
□ 文檔更新：說明如何添加多語言源
□ 提交和推送
```

### **Phase 5 實施清單**
```bash
□ 建立 src/i18n/ 目錄結構
□ 遷移翻譯到模組化檔案
□ 創建 scripts/i18n-check.js
□ 創建 src/utils/pluralize-forms.ts
□ 更新 package.json scripts
□ 添加 GitHub Actions 工作流
□ 完整測試和驗證
□ 提交和推送
```

---

## 💡 重要考量因素

### 1. **向後相容性**
- 現有 `t()` 函數調用保持不變
- 新增功能作為選擇式改進
- 穩妥遷移現有代碼

### 2. **多語言展開計劃**
```
當前: en, zh-TW
未來: 
  + ja (日文) - 亞洲市場
  + ko (韓文) - 亞洲市場  
  + de (德文) - 歐洲市場
  + fr (法文) - 歐洲市場
  + es (西班牙文) - 全球市場
```

### 3. **資料源策略**

| 源類型 | 策略 | 例子 |
|--------|------|------|
| **單語言** | 保持原樣 | Reuters, Bloomberg |
| **多語言** | 基於用戶語言選擇 | CNA, BBC |
| **本地源** | 優先使用本地語言 | 台灣新聞源（zh-TW） |

### 4. **文化差異考量**
- 日期格式（中文：年月日 vs 英文：月日年）
- 時間區域（UTC vs 本地時區）
- 數字格式（1,000 vs 1.000）
- 貨幣符號和單位

---

## 📈 預期成果

### 完成後
✅ **100% UI 多語系支持**
- 無遺漏的硬編碼英文
- 完整的繁體中文翻譯
- 無障礙標準合規

✅ **可擴展架構**
- 模組化的 i18n 結構
- 易於添加新語言
- 自動化的文本檢查

✅ **更好的用戶體驗**
- 自動檢測用戶語言
- 流暢的語言切換
- 本地化的資料源內容

---

## 📝 文檔更新清單

需更新的文檔：
```
□ README.md - 添加 i18n 章節
□ README.zh-TW.md - 同上（中文版本）
□ docs/INTERNATIONALIZATION.md - 新建，詳細 i18n 指南
□ docs/CONTRIBUTING.md - 添加翻譯貢獻指南
```

---

## 🎯 成功標準

| 檢查點 | 通過標準 |
|--------|---------|
| **翻譯完成度** | >= 100% of UI text |
| **無障礙檢查** | WCAG 2.1 AA 級 |
| **多語言測試** | en, zh-TW 完整驗證 |
| **性能測試** | i18n 不增加包大小 >5KB |
| **自動化** | i18n 檢查通過 GitHub Actions |

---

**準備開始實施？**
聯繫 → 提交 → Phase 1 實施計畫
