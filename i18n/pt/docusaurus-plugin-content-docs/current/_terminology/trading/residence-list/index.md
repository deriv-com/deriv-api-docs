---
title: Lista de países
hide_title: false
draft: false
sidebar_label: Lista de países
sidebar_position: 2
tags:
  - conceitos
  - países
  - residentes
  - lista
  - terminologia
keywords:
  - conceitos
  - países
  - residentes
  - lista
  - terminologia
description: O que é a chamada à API "Lista de países"?
---

### O que é a chamada à API "Lista de países"?

Lista de países e códigos de país de 2 letras, adequados para preencher o formulário de abertura de conta.

A lista de exemplos pode ser algo do género:

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
```

You can read more about the `Countries List` on [API Explorer - Countries List](https://api.deriv.com/api-explorer#residence_list)
