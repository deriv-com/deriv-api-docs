---
title: قائمة الدول
hide_title: false
draft: false
sidebar_label: قائمة الدول
sidebar_position: 2
tags:
  - المفاهيم
  - الدول
  - مقيم
  - قائمة
  - مصطلحات
keywords:
  - المفاهيم
  - الدول
  - مقيم
  - قائمة
  - مصطلحات
description: ما هو ستدعاء API لقائمة الدول؟
---

### ما هو ستدعاء API لقائمة الدول؟

قائمة البلدان ورموز البلدان المكونة من حرفين، وهي مناسبة لملء نموذج فتح الحساب.

يمكن أن تكون قائمة الأمثلة على هذا النحو:

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

يمكنك قراءة المزيد حول "قائمة البلدان" على [مستكشف واجهة برمجة التطبيقات - قائمة البلدان] (https://api.deriv.com/api-explorer#residence_list)
