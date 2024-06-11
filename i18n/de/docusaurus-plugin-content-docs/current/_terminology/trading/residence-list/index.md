---
title: Liste der Länder
hide_title: false
draft: false
sidebar_label: Liste der Länder
sidebar_position: 2
tags:
  - Konzepte
  - Länder
  - Bewohner
  - Liste
  - Terminologie
keywords:
  - Konzepte
  - Länder
  - Bewohner
  - Liste
  - Terminologie
description: Was ist der API-Aufruf für die Länderliste?
---

### Was ist der API-Aufruf für die Länderliste?

Liste der Länder und 2-Buchstaben-Ländercodes, die zum Ausfüllen des Kontoeröffnungsformulars geeignet sind.

Die Beispielliste kann ungefähr so aussehen:

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

Mehr über die `Länderliste` erfahren Sie unter [API Explorer - Länderliste](https://api.deriv.com/api-explorer#residence_list)
