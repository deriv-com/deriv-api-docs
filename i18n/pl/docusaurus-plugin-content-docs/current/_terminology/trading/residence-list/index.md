---
title: Lista krajów
hide_title: false
draft: false
sidebar_label: Lista krajów
sidebar_position: 2
tags:
  - pojęcia
  - kraje
  - mieszkaniec
  - lista
  - terminologia
keywords:
  - pojęcia
  - kraje
  - mieszkaniec
  - lista
  - terminologia
description: co to jest wywołanie API listy krajów?
---

### Co to jest wywołanie API listy krajów?

Lista krajów i 2-literowe kody krajów, odpowiednie do wypełnienia formularza otwarcia konta.

przykładowa lista może wyglądać mniej więcej tak:

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

Więcej informacji na temat listy krajów można przeczytać na stronie [API Explorer - Lista krajów] (https://api.deriv.com/api-explorer#residence_list)
