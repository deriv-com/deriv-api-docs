---
title: Lista de países
hide_title: false
draft: false
sidebar_label: Lista de países
sidebar_position: 2
tags:
  - conceptos
  - países
  - residente
  - lista
  - terminología
keywords:
  - conceptos
  - países
  - residente
  - lista
  - terminología
description: ¿Qué es la llamada API de la Lista de países?
---

### ¿Qué es la llamada a la API de la Lista de Países?

Lista de países y códigos de país de 2 letras, adecuados para rellenar el formulario de apertura de cuenta.

la lista de ejemplos puede ser algo así:

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
