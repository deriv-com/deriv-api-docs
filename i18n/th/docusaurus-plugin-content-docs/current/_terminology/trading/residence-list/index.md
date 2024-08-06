---
title: ลิสต์รายชื่อประเทศ
hide_title: false
draft: false
sidebar_label: ลิสต์รายชื่อประเทศ
sidebar_position: 2
tags:
  - concepts
  - ประเทศ
  - ผู้อยู่อาศัย
  - ลิสต์รายการ
  - terminology
keywords:
  - concepts
  - ประเทศ
  - ผู้อยู่อาศัย
  - ลิสต์รายการ
  - terminology
description: การเรียกใช้ API เพื่อลิสต์รายชื่อประเทศหรือ Countries List API คืออะไร?
---

### การเรียกใช้ API เพื่อลิสต์รายชื่อประเทศหรือ Countries List API คืออะไร?

ลิสต์รายชื่อประเทศและรหัสประเทศ 2 ตัวอักษร ที่เหมาะสำหรับใช้กรอกแบบฟอร์มเปิดบัญชี

ลิสต์รายการตัวอย่างอาจเป็นได้ดังนี้:

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

คุณสามารถอ่านเพิ่มเติมเกี่ยวกับ “รายชื่อประเทศ” ได้ที่ [API Explorer - รายชื่อประเทศ] (https://api.deriv.com/api-explorer#residence_list)
