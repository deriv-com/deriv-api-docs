---
title: රටවල් ලැයිස්තුව
hide_title: false
draft: false
sidebar_label: රටවල් ලැයිස්තුව
sidebar_position: 2
tags:
  - සංකල්ප
  - රටවල්
  - පදිංචිකරු
  - ලැයිස්තුව
  - පාරිභාෂිතය
keywords:
  - සංකල්ප
  - රටවල්
  - පදිංචිකරු
  - ලැයිස්තුව
  - පාරිභාෂිතය
description: රටවල් ලැයිස්තු API ඇමතුම යනු කුමක්ද?
---

### රටවල් ලැයිස්තු API ඇමතුම යනු කුමක්ද?

ගිණුම් විවෘත කිරීමේ පෝරමය පිරවීම සඳහා සුදුසු රටවල් ලැයිස්තුව සහ අකුරු 2 රටවල්වල කේත.

උදාහරණ ලැයිස්තුව මෙවැනි දෙයක් විය හැකිය:

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

ඔබට [API Explorer - රටවල් ලැයිස්තුවෙන්](https://api.deriv.com/api-explorer#residence_list) 'රටවල් ලැයිස්තුව' ගැන වැඩිදුර කියවිය හැක
