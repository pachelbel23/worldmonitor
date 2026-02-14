# World Monitor UI 中文化完整任務清單

## 📋 總體進度追蹤

**當前狀態**: 規劃階段 (Plan)
**預計工作量**: 4-5 小時
**目標完成度**: 100% UI 多語系支持

---

## 🎯 Phase 1：無障礙和信任指標（高優先級）

### Task 1.1: 審計並更新 Panel.ts 無障礙文本

**位置**: `src/components/Panel.ts`

**需修改的文本**:
- [ ] Line ~84: `title="Show methodology info"` → 需翻譯
- [ ] Line ~116: `title="Drag to resize (double-click to reset)"` → 需翻譯
- [ ] `aria-label="Panel methodology"` → 需翻譯

**工作項**:
```
□ 1.1.1 在 src/utils/i18n.ts 中添加以下 keys:
        'en': {
          'Show methodology info': 'Show methodology info',
          'Methodology info': 'Methodology info',
          'Drag to resize (double-click to reset)': 'Drag to resize (double-click to reset)',
          'Panel resizable': 'Panel resizable',
        },
        'zh-TW': {
          'Show methodology info': '顯示方法論說明',
          'Methodology info': '方法論資訊',
          'Drag to resize (double-click to reset)': '拖動調整大小（雙擊重設）',
          'Panel resizable': '可調整大小面板',
        }

□ 1.1.2 修改 Panel.ts constructor 或 render 方法:
        this.methodologyBtn.title = t('Show methodology info');
        this.methodologyBtn.setAttribute('aria-label', t('Methodology info'));
        this.resizeHandle.title = t('Drag to resize (double-click to reset)');

□ 1.1.3 驗證 TypeScript 編譯無誤 (npm run typecheck)

□ 1.1.4 手動測試:
        - 切換到中文，確認 tooltip 顯示中文
        - 切換到英文，確認 tooltip 顯示英文
        - 檢查視覺上沒有文本換行問題
```

**狀態**: ⏳ 等待實施
**預計時間**: 20 分鐘

---

### Task 1.2: NewsPanel 信任指標翻譯

**位置**: `src/components/NewsPanel.ts`, `src/services/source-credibility.ts` (新建)

**需修改的文本**:
- [ ] "Wire Service - Highest reliability"
- [ ] "Major Outlet"
- [ ] "Official Government Source"
- [ ] "State-affiliated source"
- [ ] "Verified News Outlet"

**工作項**:
```
□ 1.2.1 創建 src/services/source-credibility.ts:
        export const SOURCE_CREDIBILITY_DESCRIPTIONS = {
          TIER_1: 'Wire Service - Highest reliability',
          TIER_2: 'Major News Outlet',
          TIER_3: 'Specialty Media',
          TIER_4: 'Blog or Aggregator',
          GOVERNMENT: 'Official Government Source',
          STATE_AFFILIATED: 'State-affiliated media source',
          VERIFIED: 'Verified News Outlet',
        };

□ 1.2.2 在 NewsPanel.ts 中使用這些 key:
        <span title={t(SOURCE_CREDIBILITY_DESCRIPTIONS[tier])}>
          {t(SOURCE_CREDIBILITY_DESCRIPTIONS[tier])}
        </span>

□ 1.2.3 添加翻譯到 i18n.ts:
        'en': {
          'Wire Service - Highest reliability': 'Wire Service - Highest reliability',
          'Major News Outlet': 'Major News Outlet',
          'Specialty Media': 'Specialty Media',
          'Blog or Aggregator': 'Blog or Aggregator',
          'Official Government Source': 'Official Government Source',
          'State-affiliated media source': 'State-affiliated media source',
          'Verified News Outlet': 'Verified News Outlet',
        },
        'zh-TW': {
          'Wire Service - Highest reliability': '通訊社 - 最高可信度',
          'Major News Outlet': '主流新聞媒體',
          'Specialty Media': '專業媒體',
          'Blog or Aggregator': '部落格或聚合網站',
          'Official Government Source': '官方政府來源',
          'State-affiliated media source': '政府附屬媒體來源',
          'Verified News Outlet': '已驗證新聞媒體',
        }

□ 1.2.4 驗證編譯和測試
□ 1.2.5 檢查新聞面板信任指標顯示正確
```

**狀態**: ⏳ 等待實施
**預計時間**: 25 分鐘

---

## 🎯 Phase 2：操作提示和工具提示（中優先級）

### Task 2.1: 飛行狀態標籤翻譯

**位置**: `src/services/flights.ts`, `src/components/FlightsPanel.ts` (如存在)

**需修改的文本**:
- [ ] "Ground delay"
- [ ] "Ground stop"
- [ ] "Airborne"
- [ ] "Landing"
- [ ] "Diverted"

**工作項**:
```
□ 2.1.1 在 flights.ts 中建立狀態鍵:
        const FLIGHT_STATUS_KEYS = {
          AIRBORNE: 'Airborne',
          GROUND_DELAY: 'Ground delay',
          GROUND_STOP: 'Ground stop',
          LANDING: 'Landing',
          DIVERTED: 'Diverted',
          CANCELLED: 'Cancelled',
          DELAYED: 'Delayed',
        };

□ 2.1.2 更新渲染邏輯使用 t() 函數:
        <StatusBadge>{t(FLIGHT_STATUS_KEYS[status])}</StatusBadge>

□ 2.1.3 添加翻譯到 i18n.ts:
        'en': {
          'Airborne': 'Airborne',
          'Ground delay': 'Ground delay',
          'Ground stop': 'Ground stop',
          'Landing': 'Landing',
          'Diverted': 'Diverted',
          'Cancelled': 'Cancelled',
          'Delayed': 'Delayed',
        },
        'zh-TW': {
          'Airborne': '飛行中',
          'Ground delay': '地面延誤',
          'Ground stop': '地面停止',
          'Landing': '著陸中',
          'Diverted': '轉向',
          'Cancelled': '已取消',
          'Delayed': '已延誤',
        }

□ 2.1.4 驗證編譯和測試飛行面板
```

**狀態**: ⏳ 等待實施
**預計時間**: 20 分鐘

---

### Task 2.2: 地圖交互文本翻譯

**位置**: 多個地圖相關檔案 (`Map.ts`, `DeckGLMap.ts`, `TechEventsPanel.ts` 等)

**需修改的文本**:
- [ ] "Show on map"
- [ ] "More info"
- [ ] "AIS Signal Lost"
- [ ] "Zoom in"
- [ ] "Zoom out"
- [ ] "Reset view"
- [ ] "Layer guide"

**工作項**:
```
□ 2.2.1 創建 src/constants/map-actions.ts:
        export const MAP_ACTION_KEYS = {
          SHOW_ON_MAP: 'Show on map',
          MORE_INFO: 'More info',
          AIS_SIGNAL_LOST: 'AIS Signal Lost',
          ZOOM_IN: 'Zoom in',
          ZOOM_OUT: 'Zoom out',
          RESET_VIEW: 'Reset view',
          LAYER_GUIDE: 'Layer guide',
          CLICK_TO_SELECT: 'Click to select',
          DOUBLE_CLICK_TO_ZOOM: 'Double-click to zoom',
        };

□ 2.2.2 在各地圖組件中搜索硬編碼文本:
        grep -r "Show on map" src/components/
        grep -r "More info" src/
        grep -r "AIS Signal Lost" src/

□ 2.2.3 將所有硬編碼文本替換為 t(MAP_ACTION_KEYS.*):
        showOnMapButton.textContent = t(MAP_ACTION_KEYS.SHOW_ON_MAP);
        moreInfoBtn.title = t(MAP_ACTION_KEYS.MORE_INFO);
        aisLostLabel.textContent = t(MAP_ACTION_KEYS.AIS_SIGNAL_LOST);

□ 2.2.4 添加翻譯到 i18n.ts:
        'en': {
          'Show on map': 'Show on map',
          'More info': 'More info',
          'AIS Signal Lost': 'AIS Signal Lost',
          'Zoom in': 'Zoom in',
          'Zoom out': 'Zoom out',
          'Reset view': 'Reset view',
          'Layer guide': 'Layer guide',
          'Click to select': 'Click to select',
          'Double-click to zoom': 'Double-click to zoom',
        },
        'zh-TW': {
          'Show on map': '在地圖上顯示',
          'More info': '更多資訊',
          'AIS Signal Lost': 'AIS 信號遺失',
          'Zoom in': '放大',
          'Zoom out': '縮小',
          'Reset view': '重設檢視',
          'Layer guide': '圖層指南',
          'Click to select': '點擊選擇',
          'Double-click to zoom': '雙擊放大',
        }

□ 2.2.5 編譯和完整測試
□ 2.2.6 在地圖上驗證所有 tooltip 和按鈕文本
```

**狀態**: ⏳ 等待實施
**預計時間**: 30 分鐘

---

### Task 2.3: 故事/日誌相關文本

**位置**: `src/components/StoryModal.ts` 和相關檔案

**需修改的文本**:
- [ ] "Generating story..."
- [ ] "Story saved"
- [ ] "Copy to clipboard"
- [ ] "Share story"

**工作項**:
```
□ 2.3.1 搜索所有故事相關硬編碼文本:
        grep -r "story" src/components/ -i

□ 2.3.2 添加缺失的翻譯到 i18n.ts (注意：某些可能已有):
        'en': {
          'Generating story...': 'Generating story...',
          'Story saved successfully': 'Story saved successfully',
          'Copy to clipboard': 'Copy to clipboard',
        },
        'zh-TW': {
          'Generating story...': '正在生成故事...',
          'Story saved successfully': '故事已成功保存',
          'Copy to clipboard': '複製到剪貼板',
        }

□ 2.3.3 更新組件使用 t() 函數:
        statusLabel.textContent = t('Generating story...');

□ 2.3.4 測試故事生成流程
```

**狀態**: ⏳ 等待實施
**預計時間**: 15 分鐘

---

## 🎯 Phase 3：複數形式和複雜邏輯（低優先級）

### Task 3.1: 實現複數形式輔助函數

**位置**: `src/utils/pluralize.ts` (新建)

**工作項**:
```
□ 3.1.1 創建 src/utils/pluralize.ts:
        export interface PluralForm {
          one: string;
          other: string;
          zh_tw?: string;
        }

        export function pluralize(
          count: number,
          forms: PluralForm,
          locale?: string
        ): string {
          const lang = locale || localStorage.getItem('worldmonitor-locale') || 'en';
          
          if (lang === 'zh-TW') {
            return forms.zh_tw || forms.other;
          }
          
          return count === 1 ? forms.one : forms.other;
        }

□ 3.1.2 找到所有使用複數形式的位置:
        grep -r "count > 1" src/
        grep -r "${.*} ? 's' : ''" src/

□ 3.1.3 更新這些位置使用 pluralize():
        // 之前
        const text = `${count} intelligence finding${count > 1 ? 's' : ''}`;
        
        // 之後
        const text = pluralize(count, {
          one: '1 intelligence finding',
          other: `${count} intelligence findings`,
          zh_tw: `${count} 個智能結果`
        });

□ 3.1.4 測試複數形式:
        - count = 0, 1, 2, 100 等多個值
        - 在 en 和 zh-TW 語言下
```

**狀態**: ⏳ 等待實施
**預計時間**: 25 分鐘

---

### Task 3.2: 動態日期和時間格式

**位置**: `src/utils/date-formatter.ts` (新建)

**工作項**:
```
□ 3.2.1 創建 src/utils/date-formatter.ts:
        export function formatDateTime(date: Date, locale?: string): string {
          const lang = locale || localStorage.getItem('worldmonitor-locale') || 'en';
          
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

        export function formatDate(date: Date, locale?: string): string {
          const lang = locale || localStorage.getItem('worldmonitor-locale') || 'en';
          const localeMap: Record<string, string> = {
            'en': 'en-US',
            'zh-TW': 'zh-TW'
          };
          
          return date.toLocaleDateString(localeMap[lang] || 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        }

□ 3.2.2 找到所有硬編碼日期格式的位置:
        grep -r "toLocaleString" src/
        grep -r "toLocaleDateString" src/
        grep -r "'en-US'" src/

□ 3.2.3 用新函數替換:
        // 之前
        date.toLocaleString('en-US', { ... })
        
        // 之後
        formatDateTime(date)

□ 3.2.4 測試日期格式:
        - 各種日期在 en 和 zh-TW 下的顯示
        - 確認時區正確（UTC）
```

**狀態**: ⏳ 等待實施
**預計時間**: 20 分鐘

---

## 🎯 Phase 4：資料源文本本地化（中優先級）

### Task 4.1: RSS 源語言配置

**位置**: `src/config/feeds.ts`, `src/services/rss.ts`

**工作項**:
```
□ 4.1.1 擴展 Feed 介面 (src/config/feeds.ts):
        interface Feed {
          name: string;
          url: string;
          category: FeedCategory;
          preferredLanguage?: 'en' | 'zh-TW' | 'auto';
          alternatives?: {
            'zh-TW'?: string;
            'en'?: string;
          };
        }

□ 4.1.2 為支持多語言的源添加配置:
        // 例如：中央通訊社
        {
          name: 'Central News Agency',
          url: 'https://cnaapi.cna.com.tw/v1/cna_main_news?limit=20&page=1',
          preferredLanguage: 'auto',
          alternatives: {
            'zh-TW': '原始 URL',
            'en': 'https://cnaapi.cna.com.tw/v1/enews?limit=20&page=1',
          }
        }

□ 4.1.3 修改 fetchFeed() 函數:
        export async function fetchFeed(
          feed: Feed,
          locale?: string
        ): Promise<NewsItem[]> {
          const lang = locale || localStorage.getItem('worldmonitor-locale') || 'en';
          
          let feedUrl = feed.url;
          if (feed.alternatives?.[lang as keyof typeof feed.alternatives]) {
            feedUrl = feed.alternatives[lang];
          }
          
          // 使用正確的 URL 獲取內容
          const response = await fetchWithProxy(...);
          // ...
        }

□ 4.1.4 更新 fetchCategoryFeeds() 傳遞語言參數:
        for (const feed of feedsByCategory[category]) {
          const items = await fetchFeed(feed, currentLanguage);
          // ...
        }

□ 4.1.5 測試:
        - 切換語言，驗證 RSS 源是否改變
        - 測試多語言源的加載和解析
```

**狀態**: ⏳ 等待實施
**預計時間**: 30 分鐘

---

### Task 4.2: 識別和配置多語言源

**位置**: 研究工作

**工作項**:
```
□ 4.2.1 識別有中文版本的新聞源:
        - 中央通訊社 (CNA)
        - 美國之音中文版 (VOA Chinese)
        - BBC 中文
        - 路透中文
        - 法新社中文
        - 其他...

□ 4.2.2 調查每個源的語言 URL 結構:
        [記錄表格]
        源名稱 | 英文 URL | 中文 URL | API 支持?

□ 4.2.3 為支持的源添加配置:
        添加到 src/config/feeds.ts

□ 4.2.4 建立文檔 docs/MULTI_LANGUAGE_SOURCES.md:
        說明如何添加新的多語言源

□ 4.2.5 測試:
        - 驗證各源在不同語言下的內容加載
```

**狀態**: ⏳ 等待實施
**預計時間**: 45 分鐘

---

## 🎯 Phase 5：架構改進和最佳實踐（低優先級）

### Task 5.1: 重組 i18n 文件結構

**位置**: `src/i18n/` (新建目錄結構)

**工作項**:
```
□ 5.1.1 建立新目錄結構:
        src/i18n/
        ├── index.ts
        ├── en/
        │   ├── index.ts
        │   ├── buttons.ts
        │   ├── labels.ts
        │   ├── panels.ts
        │   ├── messages.ts
        │   ├── accessibility.ts
        │   └── data-source.ts
        └── zh-TW/
            ├── index.ts
            ├── buttons.ts
            ├── labels.ts
            ├── panels.ts
            ├── messages.ts
            ├── accessibility.ts
            └── data-source.ts

□ 5.1.2 將現有翻譯拆分到相應檔案:
        - buttons.ts: Share, Export, Close 等
        - labels.ts: 面板名稱、狀態等
        - panels.ts: 各面板的特定文本
        - messages.ts: 錯誤、成功消息等
        - accessibility.ts: aria-label, title 等
        - data-source.ts: 資料來源相關文本

□ 5.1.3 建立 index.ts 聚合:
        export const translations = {
          'en': { ...buttons, ...labels, ...panels, ... },
          'zh-TW': { ...buttons, ...labels, ...panels, ... }
        };

□ 5.1.4 更新導入語句:
        import { t } from '@/i18n' 替代 '@/utils/i18n'

□ 5.1.5 驗證所有編譯和功能
```

**狀態**: ⏳ 等待實施
**預計時間**: 45 分鐘

---

### Task 5.2: 創建 i18n 檢查工具

**位置**: `scripts/i18n-check.js` (新建)

**工作項**:
```
□ 5.2.1 建立 scripts/i18n-check.js:
        // 功能：
        // 1. 掃描所有 .ts/.tsx 檔案
        // 2. 提取字符串字面量
        // 3. 檢查是否在 i18n.ts 中
        // 4. 生成缺失文本報告
        // 5. 檢查未翻譯的 key

□ 5.2.2 執行腳本測試:
        npm run i18n:check

□ 5.2.3 在 package.json 中添加命令:
        "scripts": {
          "i18n:check": "node scripts/i18n-check.js",
          "i18n:validate": "node scripts/i18n-validate.js"
        }

□ 5.2.4 建立文檔說明如何使用
```

**狀態**: ⏳ 等待實施
**預計時間**: 30 分鐘

---

### Task 5.3: GitHub Actions CI/CD 集成

**位置**: `.github/workflows/i18n-check.yml` (新建)

**工作項**:
```
□ 5.3.1 建立 .github/workflows/i18n-check.yml:
        name: i18n Audit
        
        on: [pull_request]
        
        jobs:
          check:
            runs-on: ubuntu-latest
            steps:
              - uses: actions/checkout@v3
              - uses: actions/setup-node@v3
              - run: npm install
              - run: npm run i18n:check
              - name: Report missing translations
                if: failure()
                run: echo "Missing translations found!"

□ 5.3.2 測試工作流:
        - 推送包含硬編碼文本的 PR
        - 驗證工作流捕捉到缺失翻譯

□ 5.3.3 文檔更新
```

**狀態**: ⏳ 等待實施
**預計時間**: 20 分鐘

---

## 📊 驗證檢查清單

### 翻譯完整性
```
□ 所有 UI 文本都在 i18n.ts 中定義
□ en 和 zh-TW 都有完整的翻譯對
□ 沒有遺漏的鍵值對
□ 字符串不包含變量（需使用佔位符）
```

### 代碼質量
```
□ npm run typecheck 通過無誤
□ npm run build 成功
□ npm run linter 通過（如果有）
□ 沒有新的 console 錯誤
```

### 功能測試
```
□ 所有語言切換工作正常
□ 工具提示在正確時機顯示
□ 無障礙屬性正確設置
□ 沒有 UI 文本溢出或換行問題
```

### 瀏覽器測試
```
□ Chrome 最新版本
□ Firefox 最新版本
□ Safari 最新版本（如可用）
□ 移動裝置（iOS/Android）
```

---

## 📈 進度追蹤表

| Phase | Task | 狀態 | 優先級 | 時間 | 負責人 |
|-------|------|------|--------|------|--------|
| 1 | Panel 無障礙 | ⏳ | 🚨 高 | 20m | - |
| 1 | NewsPanel 信任指標 | ⏳ | 🚨 高 | 25m | - |
| 2 | 飛行狀態 | ⏳ | ⚠️ 中 | 20m | - |
| 2 | 地圖交互 | ⏳ | ⚠️ 中 | 30m | - |
| 2 | 故事/日誌 | ⏳ | ✅ 低 | 15m | - |
| 3 | 複數形式 | ⏳ | ✅ 低 | 25m | - |
| 3 | 日期格式 | ⏳ | ✅ 低 | 20m | - |
| 4 | RSS 語言配置 | ⏳ | ⚠️ 中 | 30m | - |
| 4 | 多語言源識別 | ⏳ | ⚠️ 中 | 45m | - |
| 5 | i18n 重組 | ⏳ | ✅ 低 | 45m | - |
| 5 | 檢查工具 | ⏳ | ✅ 低 | 30m | - |
| 5 | CI/CD 集成 | ⏳ | ✅ 低 | 20m | - |
| **總計** | - | - | - | **345m** | - |

---

## 🎯 關鍵里程碑

```
週一：Phase 1 + Phase 2.1 完成 → PR #1
週二：Phase 2.2 + Phase 2.3 完成 → PR #2
週三：Phase 3 完成 → PR #3
週四：Phase 4 完成 → PR #4
週五：Phase 5 + 測試 → PR #5 + 合併
```

---

## 💡 注意事項

### 重要提醒
- ⚠️ **不要刪除舊的 i18n.ts** - 先新增，再遷移
- ⚠️ **保留向後相容性** - 現有的 `t()` 調用必須繼續工作
- ⚠️ **分階段提交** - 每個 Phase 一個 PR，便於審查
- ⚠️ **徹底測試** - 特別是語言切換功能

### 未來擴展
- 計劃添加：日文、韓文、德文、法文、西班牙文
- RTL 語言支持（阿拉伯文、希伯來文）
- 社區翻譯流程

---

## 📚 相關文檔

- `I18N_COMPREHENSIVE_PLAN.md` - 詳細的可行方案
- `DEPLOYMENT_CHECKLIST.md` - 部署檢查清單
- `README.zh-TW.md` - 繁體中文文檔

---

**準備開始實施？ → 請確認優先級和時間分配，然後從 Phase 1 Task 1.1 開始**
