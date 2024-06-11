---
title: 設定 WebSocket 連線
sidebar_label: WebSocket 連線
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - websocket-連線
description: 關於在交易應用程式設定與 WebSocket API 的 WebSocket 連線的方法指南。
---

:::caution

如果不熟悉 WebSockets，請查看 [我們的文件](/docs/core-concepts/websocket)。

:::

### 設定 WebSocket 連線

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

接下來，建立與 Deriv WebSocket 伺服器連線的 WebSocket，如下所示：

```js title="index.js" showLineNumbers
const app_id = 1089; // 用 app_id 替換或保留為 1089 進行測試。
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
```

:::info
`app_id = 1089` 僅用於測試目的。 在生產環境發布應用程式時，請使用自己的 app_id 更新它。 請查看 [本指南](/docs/setting-up-a-deriv-application) 為自己建立新的應用程式。
:::

此時，我們已與 `WebSocket 伺服器`連線。 但是，不會收到任何資料。 要傳送或接收資料，必須`訂閱`<a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">websocket 事件</a>。

一般來說， `WebSocket 連線`有 4 個事件：

- **關閉**：
  與 WebSocket 的連線被關閉時觸發。 也可以透過 onclose 屬性啟用。
- **打開**：
  與 WebSocket 的連線被打開時觸發。 也可以透過 onopen 屬性啟用。
- **訊息**：
  透過 WebSocket 接收資料時觸發。 也可以透過 onmessage 屬性啟用。
- **錯誤**：
  與 WebSocket 的連線因錯誤而關閉（例如某些資料無法傳送）時觸發。 也可以透過 onerror 屬性啟用。

讓我們在 WebSocket 連線為這些事件新增事件偵聽器。

```js title="index.js" showLineNumbers
// 訂閱`打開`事件
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
});

// 訂閱`訊息`事件
websocket.addEventListener('message', (event) => {
  console.log('new message received from server: ', event);
});

// 訂閱`關閉`事件
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
});

// 訂閱`錯誤`事件
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```

現在，在瀏覽器中打開 `index.html` 文件，並檢查開發人員控制台。 應該只看到`建立了 WebSocket 連線`的日誌。

### 傳送和接收資料

WebSocket 伺服器提供 <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a> 功能。 讓我們在示範專案中使用它來傳送和接收資料。 更改`打開`和`訊息`的事件偵聽器，如下所示：

:::caution
WebSocket 連線上的`傳送`函數僅接收 `string`、`ArrayBuffer`、`Blob`、`TypedArray` 和 `DataView`。 可以在 [MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) 閱讀更多相關的資訊。 這意味著，如果想要傳送`物件`，必須先使用 `JSON.stringify` 對其進行字符串化。
:::

```js title="index.js" showLineNumbers
// 訂閱 `打開` 事件
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// 訂閱 `訊息` 事件
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});
```

`receivedMessage` 將是這樣的物件：

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

恭喜 :tada:

您剛剛使用 WebSockets 建立了第一個示範專案。

:::tip
`ping` 要求主要用於測試連線或使連線保持活動狀態。
:::

### 使 WebSocket 連線保持活動狀態

預設情況下，當大約 **180 秒** 內 `WebSocket 連線`之間沒有任何流量傳送時，連線將會關閉。 讓連線保持活動狀態的一種方法是傳送 [ping](/api-explorer#ping) 請求，間隔為 **120 秒**。 這將使連線保持活動和活躍狀態。

下面是簡單的設定範例：

```js title="index.js" showLineNumbers
const ping_interval = 12000; // 以毫秒為單位，等於 120 秒
let interval;
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // 讓連線保持活躍
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// 訂閱 `關閉 '事件
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});
```

現在，當連線`已建立`後，開始以 `12000毫秒`的間隔傳送 `ping` 請求。

最終程式碼應該是：

```js title="index.js" showLineNumbers
const app_id = 1089; // 用 app_id 替換或保留為 1089 進行測試。
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // it's in milliseconds, which equals to 120 seconds
let interval;

// 訂閱'打開'事件 
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  //保持連線狀態
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// 訂閱`訊息`事件
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// 訂閱`關閉`事件
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```
