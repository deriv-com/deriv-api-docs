---
title: "Vendita contratti: Conti multipli"
hide_title: false
draft: false
sidebar_label: "Vendita contratti: Conti multipli"
sidebar_position: 4
tags:
  - concetti
  - vendi
  - contratto
  - multiplo
  - conti
  - terminologia
keywords:
  - concetti
  - vendi
  - contratto
  - multiplo
  - conti
  - terminologia
description: "Cos'è la chiamata API Vendita contratti: Conti multipli?"
---

### Cos'è la chiamata API Vendita contratti: Conti multipli?

Vende contratti per più conti contemporaneamente.

Utilizza la risposta dello shortcode di `buy_contract_for_multiple_accounts` per identificare il contratto e i token di autorizzazione per selezionare i conti su cui vendere i contratti.

Importante: saranno interessati solo i conti identificati dai token. Questa chiamata non venderà il contratto sul conto attualmente autorizzato, a meno che non includa il token per il conto corrente.
