---
title: 取得國家清單
sidebar_label: 取得國家清單
sidebar_position: 2
tags:
  - country_list
  - javascript
keywords:
  - country_list
  - javascript
description: 向交易應用程式新增國家/地區清單以取得有關使用者的資訊。 透過此 JavaScript API 範例學習做法。
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

若要取得國家/地區清單，請使用下列方法更新打開事件偵聽程式：

```js title="index.js" showLineNumbers
const ping_interval = 12000; // 以毫秒為單位，等於 120 秒
let interval;
// 訂閱 `打開` 事件
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  //保持連線狀態
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});
```

現在，更新`訊息`事件偵聽器以呈現資料：

```js title="index.js" showLineNumbers
// 訂閱 `訊息` 事件
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('list of countries', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong response: ', receivedMessage.ping);
      break;
    default:
      console.log('received message: ', receivedMessage);
      break;
  }
});
```

回應應該是物件：

```json showLineNumbers
{
  "echo_req": {
    "req_id": 1,
    "residence_list": 1
  },
  "msg_type": "residence_list",
  "req_id": 1,
  "residence_list": [
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {},
            "is_country_supported": 0
          }
        }
      },
      "phone_idd": "35818",
      "text": "Aland Islands",
      "value": "ax"
    },
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {
              "driving_licence": {
                "display_name": "Driving Licence"
              },
              "national_identity_card": {
                "display_name": "National Identity Card"
              },
              "passport": {
                "display_name": "Passport"
              }
            },
            "is_country_supported": 1
          }
        }
      },
      "phone_idd": "355",
      "text": "Albania",
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

透過此呼叫，將獲得有關支援國家/地區的有用訊息，例如：

- 每個國家的`2 字母`代碼
- 每個國家/地區的`標識`服務提供商
- 國家稅務識別碼格式 (`tin_format`)
- 等等。

這對於帳戶開立表單非常有用，這種表單需要使用者提供有關其身份基礎的已驗證資訊，具體取決於其居住國家/地區。

::: 注意
對於地址和稅務 ID 驗證，請使用為該國家提供的 'tin_format'。
:::

使用者的國家/地區對下一步的操作非常重要。 它對可以使用哪些資產和功能作出決定。

:::tip
最好在填寫表格前取得國家清單。
:::

:::danger
需要有關 `IDV` 和 `ONFIDO` 身份服務、其差異和可能性的詳細內容。
:::

最終程式碼將是：

```js title="index.js" showLineNumbers
const app_id = 1089; // 用 app_id 替換或保留為 1089 進行測試。
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; //以毫秒為單位，等於 120 秒
let interval;

// 訂閱`打開'事件
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // 保持連線狀態
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// 訂閱`訊息'事件
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('list of countries', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong response: ', receivedMessage.ping);
      break;
    default:
      console.log('received message: ', receivedMessage);
      break;
  }
});

// 訂閱`關閉'事件
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// 訂閱`錯誤`事件
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```
