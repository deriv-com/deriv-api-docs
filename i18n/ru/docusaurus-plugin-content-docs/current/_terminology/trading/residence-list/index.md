---
title: Список стран
hide_title: false
draft: false
sidebar_label: Список стран
sidebar_position: 2
tags:
  - концепции
  - стран
  - резидент
  - список
  - терминология
keywords:
  - концепции
  - стран
  - резидент
  - список
  - терминология
description: Что такое API-вызов "Список стран"?
---

### Что такое API-вызов "Список стран"?

Список стран и 2-буквенных кодов стран, подходящих для заполнения формы открытия счета.

Примерный список может выглядеть примерно так:

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
          } },
          "is_country_supported": 0
        }
      }
    } },
    "phone_idd": "93",
    "text": "Афганистан",
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
    } },
    "phone_idd": "35818",
    "text": "Аландские острова",
    "value": "ax"
  } }
]
```

Вы можете прочитать больше о `Списке стран` на [API Explorer - Список стран](https://api.deriv.com/api-explorer#residence_list)
