---
title: Liste des pays
hide_title: false
draft: false
sidebar_label: Liste des pays
sidebar_position: 2
tags:
  - concepts
  - pays
  - résident
  - liste
  - terminologie
keywords:
  - concepts
  - pays
  - résident
  - liste
  - terminologie
description: Qu'est-ce que l'appel d'API de la liste des pays ?
---

### Qu'est-ce que l'appel d'API de la liste des pays ?

Liste des pays et codes de pays à deux lettres, adaptés pour remplir le formulaire d'ouverture de compte.

La liste d'exemples peut ressembler à ceci :

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

You can read more about the `Countries List` on [API Explorer - Countries List](https://api.deriv.com/api-explorer#residence_list)
