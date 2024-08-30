---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - 概念
  - websocket
keywords:
  - 交易應用程式
  - websocket 通訊協定
  - websocket 連線
description: 了解 WebSocket 通訊協定和 WebSocket 連線，以及如何整合它們，以便在交易應用程式啟用資料交換。
---

## 什麼是 WebSockets？

規範 [RFC 6455] (https://datatracker.ietf.org/doc/html/rfc6455) 中所述的 `WebSocket` 通訊協定提供了一種透過持久連線在瀏覽器和伺服器之間交換資料的方法。 資料可以雙向傳遞為“資料包”，而不會中斷連線或需要額外的 HTTP 請求。

WebSocket 特別適用於例如即時交易系統等需要持續交換資料的服務。

## 簡單範例

要打開 WebSocket 連線，需要使用特殊通訊協定 `ws` 或 `wss` 在 url 建立 `新 WebSocket`。 以下顯示如何使用 `JavaScript` 執行此操作：

```js
let socket = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

另一方面，`ws://` 資料沒有加密，中間人可以看到。 舊的代理伺服器可能會遇到 "奇怪 "的標題並終止連線。

`wss: //` 代表基於 TLS 的 WebSocket，類似於 HTTPS 是基於 TLS 的 HTTP。 使用傳輸安全層，資料由傳送者加密並由接收方解密。 這意味著加密資料包可以成功透過代理，而無需檢查。
:::

建立套接字後，我們應該監聽其上的事件。 總共有 4 個事件：

- 開啟 — 已建立連線
- 訊息 — 收到的資料
- 錯誤 — WebSocket 錯誤
- 關閉 — 連線已關閉

傳送訊息可透過 socket.send(data) 完成。

下面是 `JavaScript` 範例：

```js showLineNumbers
const app_id = 1089; //用應用程序 ID 替換或保留為 1089 進行測試。
const socket = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);

socket.onopen = function (e) {
  console.log('[open] Connection established');
  console.log('Sending to server');
  const sendMessage = JSON.stringify({ ping: 1 });
  socket.send(sendMessage);
};

socket.onmessage = function (event) {
  console.log(`[message] 從伺服器收到的資料: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    consloe.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // 例如，伺服器過程被殺或網絡癱瘓
    // 在這種情況下，event.code 通常為 1006
    console.log('[close] Connection died');
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};
```

## 為什麼需要 WebSockets，什麼時候應該避免使用？

WebSockets 是客戶與伺服器之間重要的通訊工具。 為了充分利用它的潛力，重要的是要了解它如何提供幫助，以及最好何時避免使用它。 下一節將對此詳細說明。

在以下情況下使用 WebSockets：

1. 開發即時 Web 應用程式時。
   WebSocket 最常見的用途是開發即時應用程式時在客戶端幫助持續顯示資料。 由於後端伺服器會不斷傳回這些資料，因此 WebSocket 允許在已開啟的連線中不間斷推送或傳輸此資料。 使用 WebSockets 可以快速傳輸資料，並充分利用應用程式的性能。
2. 交易網站如 Deriv 等使用。
   WebSocket 協助處理由部署的後端伺服器向客戶傳送的資料。
3. 建立聊天應用程式時。
   聊天應用程式開發人員在進行一次性交換和發布/廣播訊息等操作時，會呼叫 WebSockets。 由於傳送/接收訊息使用同一個 WebSocket 連線，因此通訊變得簡單快捷。

現在已經確定了應該在哪裡使用 WebSockets，接下來看看在哪裡最好避開它。 這可幫助避免不必要的操作麻煩。

如果只需要獲取舊資料或只需處理一次的資料，則不應使用 WebSockets。 在這些情況下，使用 HTTP 協定是明智的選擇。

## WebSocket 與 HTTP

由於 HTTP 和 WebSocket 通訊協定都用於應用程式通訊，人們常常會感到困惑，難以選擇其中一種。

如前所述，WebSocket 是框架雙向協定。 另一方面，HTTP 是在 TCP 通訊協定上方運行的單向協定。

由於 WebSocket 通訊協定能夠支持持續的資料傳輸，因此主要用於即時應用程式開發。 HTTP 是無狀態的，用於開發 [RESTful] (https://de.wikipedia.org/wiki/Representational_State_Transfer) 和 [SOAP] (https://de.wikipedia.org/wiki/SOAP) 應用程式。 SOAP 仍可使用 HTTP 實作，但 REST 已被廣泛傳播和使用。

WebSocket 的通訊在兩端進行，因此它是速度更快的協定。 HTTP 的連線是在一端建立的，因此比 WebSocket 更加慢。

WebSocket 使用統一的 TCP 連線，需要一方終止連線。 終止之前，連線會一直保持活動狀態。 HTTP 需要為單獨的請求建立不同的連線。 請求完成後，連線會自動中斷。

## 如何建立 WebSocket 連線？

這個過程以 WebSocket 握手開始，涉及使用新方案（ws 或 wss）。 為幫助理解，可分別視為 HTTP 和安全 HTTP (HTTPS)。

使用此方案時，伺服器和客戶應遵循標準 WebSocket 連線協定。 WebSocket 連線的建立始於 HTTP 請求升級，其中包含幾個標頭，如連線：升級、升級：WebSocket、Sec-WebSocket- Key 等。

以下是建立此連線的方式：

1. **請求：** 連線升級標頭表示 WebSocket 握手，而 Sec-WebSocket-Key 則是 Base64 編碼的隨機值。 這個值是在每個 WebSocket 握手期間任意產生的。 除了上述內容之外， passkey 標題也是此要求的一部分。

上面列出的標頭組合在一起後會形成 HTTP GET 要求。 它將包含類似的資料：

```
GET ws://websocketexample.com:8181/ HTTP/1.1
Host: localhost:8181
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: b6gjhT32u488lpuRwKaOWs==
```

為了說明 Sec-WebSocket-Version，可以解釋供客戶使用的 WebSocket 通訊協定版本。

2. **回應：** 回應標頭 Sec-Websocket-Accept 包含在 Sec-Websocket-Key 請求標頭中提交的其餘值。 這與特定的通訊協定規範有關，被廣泛用於防止誤導資訊。 換句話說，它能增強 API 的安全性，並阻止配置不當的伺服器在應用程式開發中造成錯誤。

先前傳送的要求成功後，將收到類似於以下文字序列的回應：

```
HTTP/1.1 101 通訊協定切換
升級：websocket
連線：升級
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## 參考

- **[WebSockets APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)**
- **[WebSocket - Javascript Info](https://javascript.info/websocket)**
