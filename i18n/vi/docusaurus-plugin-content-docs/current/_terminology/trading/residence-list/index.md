---
title: Danh sách các quốc gia
hide_title: false
draft: false
sidebar_label: Danh sách các quốc gia
sidebar_position: 2
tags:
  - các khái niệm
  - quốc gia
  - cư trú
  - danh sách
  - thuật ngữ
keywords:
  - các khái niệm
  - quốc gia
  - cư trú
  - danh sách
  - thuật ngữ
description: Countries List API call là gì?
---

### Countries List API call là gì?

Danh sách các quốc gia và mã quốc gia 2 chữ cái, phù hợp để điền vào biểu mẫu mở tài khoản.

danh sách ví dụ có thể như sau:

```json
[
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
            "passport": {
              "display_name": "Passport"
            }
          },
          "is_country_supported": 0
        }
      }
    },
    "phone_idd": "93",
    "text": "Afghanistan",
    "value": "af"
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
          "documents_supported": {},
          "is_country_supported": 0
        }
      }
    },
    "phone_idd": "35818",
    "text": "Aland Islands",
    "value": "ax"
  }
]
```

Bạn có thể đọc thêm về \`Danh sách quốc gia' trên [API Explorer - Danh sách quốc gia] (https://api.deriv.com/api-explorer#residence_list)
