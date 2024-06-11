---
title: 國家清單
hide_title: false
draft: false
sidebar_label: 國家清單
sidebar_position: 2
tags:
  - 概念
  - 國家
  - 居民
  - 清單
  - 術語
keywords:
  - 概念
  - 國家
  - 居民
  - 清單
  - 術語
description: 什麼是國家清單 API 呼叫？
---

### 什麼是國家清單 API 呼叫？

國家清單和 2 個字母的國家/地區代碼，適用於填寫開戶表格。

範例清單可以是這樣的：

```json
[
  {
    "識別": {
      "服務": {
        "idv": {
          "documents_supported": {},
          "has_visual_sample": 0,
          "is_country_supported": 0
        },
        "onfido": {
          "documents_supported": {
            "護照": {
              "display_name": "護照"
            }
          },
          "is_country_supported": 0
        }
      }
    },
    "phone_idd": "93",
    "文字": "阿富汗",
    "數值": "af"
  },
  {
    "識別": {
      "服務": {
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
    "文字": "奧蘭群島",
    "數值": "ax"
  }
]
```

您可以在 [API 總管 - 國家清單] 中閱讀更多關於`國家清單`的詳細資料(https://api.deriv.com/api-explorer#residence_list)
