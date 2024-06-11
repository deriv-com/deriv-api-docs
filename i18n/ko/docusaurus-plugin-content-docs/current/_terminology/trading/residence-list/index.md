---
title: 국가 목록
hide_title: false
draft: false
sidebar_label: 국가 목록
sidebar_position: 2
tags:
  - 개념
  - 국가
  - 거주자
  - 목록
  - 용어
keywords:
  - 개념
  - 국가
  - 거주자
  - 목록
  - 용어
description: 국가 목록 API 호출이란 무엇인가요?
---

### 국가 목록 API 호출이란 무엇인가요?

계좌 개설 양식을 채우는 데 적합한 국가 목록 및 2글자 국가 코드입니다.

예제 목록은 다음과 같을 수 있습니다:

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

'국가 목록'에 대한 자세한 내용은 [API 탐색기 - 국가 목록](https://api.deriv.com/api-explorer#residence_list)에서 확인할 수 있습니다.
