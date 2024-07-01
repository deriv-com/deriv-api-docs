---
title: API 呼叫的功能
hide_title: false
draft: false
sidebar_label: API 呼叫的功能
sidebar_position: 1
tags:
  - 概念
  - 呼叫
  - 剖析
keywords:
  - 交易應用程式
  - api 呼叫
  - api 範例
description: 使用 API 呼叫功能為交易應用程式設定 API 呼叫。 透過 API 範例，學習訂閱、傳送請求和獲取回應資料。
---

## 訂閱並傳送

所有 API 呼叫都具有傳送請求和接收回應的功能。 某些 API 呼叫也提供訂閱功能，允許在有新資訊可用時向應用程式傳送更新。

### 訂閲

多個 API 呼叫提供`訂閱`功能。 訂閱 API 呼叫時，會從此特定 API 呼叫的資料收到連續串流。

其中一些 API 呼叫會自動訂閱 (例如 [跳動點](/api-explorer#ticks))，有些則具有可選的`訂閱`欄位。 如果將`1`傳遞至`訂閱`欄位，訂閱將啟動，伺服器將繼續傳送所請求的資料，直到透過呼叫`忽略`或`忽略所有` API 呼叫取消訂閱為止。

例如，可以呼叫 [跳動點歷史](/api-explorer#ticks_history) 以接收跳動點歷史資料。 但是，在呼叫新增`訂閱`選項時，將收到第一個回應中請求的跳動點歷史資料，並且每次伺服器為給定交易符號發布新的跳動點時，都會繼續收到新的回應。

在來自`訂閱`的訊息串流中，有個名為`訂閱`的欄位。 這是`串流 ID`。 使用此 ID，可以識別邏輯中的訊息串流，並使用`忽略`和`忽略所有` API 呼叫停止串流。

具有`訂閱`功能的 API 呼叫所提供的資料可用作其他 API 呼叫和功能的資料來源。

### 傳送

如果使用`傳送`功能呼叫 API，則伺服器將只傳送一次請求的資料。 為了獲取更新的資料，必須再次傳送 API 呼叫。 通常，收到其他 API 呼叫回應或 UI 事件（例如`點選`、`捲動`等）時，會使用此方法。

### 忽略

如果想停止`訂閱`建立的訊息串流，必須使用正確的`串流 ID`呼叫`忽略` API 呼叫。 否則，可以使用`忽略所有` API 呼叫透過訊息串流的`方法名稱`來停止串流。

:::caution
有關`忽略` API 呼叫的更多資訊，請查看 API 資源管理器中的 [忽略](/api-explorer#forget) 和 [忽略所有](/api-explorer#forget_all)。
:::

## 請求資料

為了方便處理 WebSocket 連線的請求和回應流程，每個 Deriv WebSocket API 呼叫都遵循標準化結構。 可以將其用於緩存、驗證、請求和回應同步。

#### API 呼叫方法名稱

WebSocket API 中的每個`請求`都包含`方法名稱`欄位，可做為請求的唯一識別碼。 大多數情況下，此`方法名稱`的數值為`1`。 但是，在某些情況下，識別碼屬性可能具有字符串值。

:::caution
一律必須使用 API 呼叫方法名稱。 此欄位將決定從 WebSocket 伺服器獲得的資料。
:::

### 必填欄位

每個請求資料都有必須提供的必要欄位，也可能包含選擇性欄位。 讓我們用`住處清單`的例子來探索這一點。

`住處清單`呼叫返回國家/地區和 2 個字母的國家/地區代碼清單，適合填寫開戶表格。

此呼叫的要求資料如下：

```ts showLineNumbers
{
  residence_list: 1; // Api 呼叫方法名稱
  passthrough?: object; // 選擇性
  req_id?: number; // 選擇性
}
```

`residence_list`欄位是呼叫的`方法名稱` ，是必需的。 可能還有其他與要傳送的此類請求相關的必需欄位。 要了解有關`住處清單`和其他 API 呼叫的更多資訊，請在 [API Explorer](/api-explorer#residence_list) 中查看。

### 選擇性欄位

每個呼叫也有幾個`選擇性`欄位。 `Passthrough` 和 `req_id` 始終是請求資料的一部分，但可以選擇排除而不使用它們。

#### `passthrough` 欄位

無論給這個欄位傳遞什麼，都會返回至`回應`物件。 當需要模擬`請求`和`回應`的可狀態流程時，這會很有幫助。

#### `req_id` 欄位

可能需要`標記`請求並透過 `WebSocket` 呼叫傳遞。 可以向該欄位傳遞`數字`以完成此操作。 當需要將`請求`映射到`回應`時，這會很有幫助。

:::caution
要了解每個 API 呼叫特定的其他選擇性欄位，請參閱 [API 總管](/api-explorer)。
:::

## 回應資料

得到呼叫的回應時，會有一個`欄位` ，其名稱與`方法名稱`相同，其中包含實際資料。

對`住處清單`呼叫的回應：

```js showLineNumbers
{
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  residence_list: [
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
                                "display_name": "駕駛執照"
                            }
                        },
                        "is_country_supported": 0
                    }
                }
            },
            "phone_idd": "35818",
            "text": "奧蘭群島",
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
                                "display_name": "駕駛執照"
                            },
                            "national_identity_card": {
                                "display_name": "國民身分證"
                            },
                            "passport": {
                                "display_name": "護照"
                            }
                        },
                        "is_country_supported": 1
                    }
                }
            },
            "phone_idd": "355",
            "text": "阿爾巴尼亞",
            "tin_format": [
                "^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"
            ],
            "value": "al"
        },
        // ....
  ],
};
```

這裡的 `residence_list` 是`方法名稱`，它包含請求的實際資料。 簡而言之，這沒有包括數組的其餘部分。 可以在 [此處](/api-explorer #residence_list) 查看實際回應。

#### `echo_req` 欄位

此`欄位`包含傳送到伺服器的確切`請求資料`。

#### `msg_type` 欄位

此`欄位`可協助判斷在 WebSocket 連線的訊息事件上取得哪些`訊息`資料。 例如，WebSocket 連線的 `onmessage` 事件處理程序的 `JavaScript` 將是：

```js showLineNumbers
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);

  switch (receivedMessage.msg_type) {
    case "residence_list":
      console.log("The residence list is : ",receivedMessage.residence_list)
      break;
    case "other_request_identifier"
      console.log("the response", receivedMessage.some_other_request_identifier)
    default:
      console.log("receivedMessage", receivedMessage)
      break;
  }
}
```

#### `req_id` 欄位

這是傳遞至`請求資料`的`選擇`項 ，可以用作`驗證`、 `同步`、 `緩存`等。

:::tip
`msg_type` 一律存在於回應資料。
:::
