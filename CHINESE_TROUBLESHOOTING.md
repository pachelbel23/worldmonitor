# 中文語言支持診斷指南

## 當前狀態

✅ **中文翻譯已包含在生產構建中**
✅ **語言選擇器 (EN / 繁中) 已實現**
✅ **自動語言檢測已啟用** (根據瀏覽器語言)

## 中文不顯示的可能原因

### 1. **localStorage 中保存了英文設置**

**問題**: 之前造訪時可能 localStorage 已經儲存了 `'en'` 設置。

**解決方案**:
- 打開瀏覽器開發者工具 (`F12` 或 `Cmd+Option+I`)
- 進入 **Application** 標籤
- 找到 **Local Storage** → 點擊該網址
- 搜尋並刪除 `worldmonitor-locale` 鍵
- 刷新頁面 (Ctrl+R 或 Cmd+R)
- 如果瀏覽器語言是中文，頁面應該自動顯示中文

### 2. **瀏覽器語言未設置為中文**

**檢查方式**:

在瀏覽器開發者工具的 **Console** 中輸入:
```javascript
window.i18nDebug.getDebugInfo()
```

這會顯示:
```
{
  currentLocale: 'en',           // 當前顯示的語言
  savedLocale: null,             // localStorage 中保存的語言
  browserLanguage: 'zh-TW',      // 瀏覽器檢測到的語言
  allStorageKeys: [...]          // 所有 localStorage 鍵
}
```

**如果 `browserLanguage` 不是中文**:
- 在瀏覽器設置中將語言改為中文 (Traditional Chinese / 繁體中文)
- 然後清除 localStorage 中的 `worldmonitor-locale`
- 刷新頁面

### 3. **使用語言選擇器手動切換**

頁面右上角有語言選擇器 (下拉菜單):
- **EN** = 英文
- **繁中** = 繁體中文

點擊並選擇 **繁中**，頁面應立即刷新並顯示中文。

在控制台驗證:
```javascript
window.i18nDebug.setLocale('zh-TW')
```

## 調試步驟

### 步驟 1: 打開開發者工具

- **Chrome/Edge/Firefox**: 按 `F12`
- **Safari**: 按 `Cmd+Option+I`

### 步驟 2: 查看 Console 日誌

進入 **Console** 標籤，查看初始化消息:

```
[i18n] Loaded translation keys: ["en", "zh-TW"]
[i18n] zh-TW entries: 482
[i18n] en entries: 489
[i18n] init() - savedLocale from localStorage: null
[i18n] init() - navigator.language: zh-TW
[i18n] init() - detected browser Chinese, using zh-TW
[i18n] init() - final locale: zh-TW
```

**如果 `final locale` 是 `zh-TW`** 但頁面仍顯示英文，可能是其他問題。

### 步驟 3: 檢查翻譯載入情況

```javascript
// 檢查翻譯是否正確載入
window.i18nDebug.getDebugInfo()
```

### 步驟 4: 強制設置中文

```javascript
// 強制設置為中文並刷新
window.i18nDebug.setLocale('zh-TW')
```

這應該會立即刷新頁面並顯示中文。

## 常見問題

### Q: 清除 localStorage 後仍是英文
**A**: 
1. 確保瀏覽器語言設置為中文
2. 在控制台執行 `console.log(navigator.language)` 檢查
3. 如果語言不是 `zh-*` 開頭，需要修改瀏覽器設置

### Q: 語言選擇器沒有反應
**A**: 
- 嘗試使用控制台命令: `window.i18nDebug.setLocale('zh-TW')`
- 如果有效果，問題在於 UI 綁定
- 檢查瀏覽器控制台是否有錯誤消息

### Q: 有些文本仍然是英文
**A**: 
- 這可能是未翻譯的字符串
- 請在 GitHub 提出 Issue
- 提供應該翻譯但未翻譯的文本截圖

## 翻譯文件位置

- **英文翻譯**: `/src/i18n/en/index.ts`
- **繁體中文翻譯**: `/src/i18n/zh-TW/index.ts`

## 測試確認

✅ 構建中包含中文: `npm run build` 成功
✅ 翻譯文件存在且完整: 482 個繁中條目
✅ i18n 系統運作正常
✅ 瀏覽器自動檢測邏輯已實現

## 最後手段: 強制清除所有數據

如果上述所有方法都不工作:

1. 打開 DevTools (F12)
2. 進入 **Application** → **Storage**
3. 點擊左側的 **Clear site data**
4. 選擇:
   - ☑ Cookies
   - ☑ Local Storage
   - ☑ Session Storage
   - ☑ IndexedDB
5. 點擊 **Clear**
6. 關閉瀏覽器並重新開啟
7. 訪問網站
8. 如果瀏覽器語言是中文，應該自動顯示中文

---

**有問題？** 在控制台保存此輸出:
```javascript
console.save = function(data, filename){
    if(!data) {
        console.error('Console.save: No data')
        return;
    }
    if(!filename) filename = 'console.json'
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2))
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

console.save(window.i18nDebug.getDebugInfo(), 'worldmonitor-i18n-debug.json')
```

在 GitHub Issue 中分享此 JSON 文件以獲得幫助。
