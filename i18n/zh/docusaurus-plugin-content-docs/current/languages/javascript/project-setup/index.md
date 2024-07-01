---
title: 專案設定 | JavaScript
sidebar_label: 專案設定
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - 專案設定
description: 使用 WebSocket 為下一個 API 交易應用程式專案建立目錄。
---

### 建立專案

我們要建立簡單的 `HTML` 頁面，其中包含處理 WebSocket 連線的 JavaScript 文件。 首先，為下一個專案建立目錄：

```bash
mkdir deriv-websocket-demo
```

前往 `deriv-websocket-demo` 資料夾：

```bash
cd deriv-websocket-demo
```

接下來，建立所需的文件，如下所示：

```bash
touch index.html index.css index.js
```

:::tip
建議使用啟用 [即時伺服器擴充功能] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 的 [視覺工作室程式碼] (https://code.visualstudio.com/)。 這將對實施工作大有幫助。
:::

現在，打開 `index.html` 檔案或使用 [即時伺服器擴充功能] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)。

現在，使用以下方法更改文件內容：

```js title="index.js" showLineNumbers
console.log（'將在這裡建立 websocket 連線'）;
```

```html title="index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deriv HTML JS Demo</title>
  </head>
  <body>
    <h2>Deriv WebSocket API demo</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

新增內容後，只需執行 `index.html` 檔案或使用 <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">即時伺服器擴充功能</a>即可執行應用程式。 運行應用程式時，請查看控制台是否出現了 `console.log`。 這樣就能知道 JavaScript 文件是否正常工作，從而正確實作 websocket 連線。

要設定 Deriv websocket，請前往 [WebSocket 連線](/docs/languages/javascript/websocket-connection) 頁面。
