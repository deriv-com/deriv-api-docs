---
title: "Vender Contratos: Múltiplas Contas"
hide_title: false
draft: false
sidebar_label: "Vender Contratos: Múltiplas Contas"
sidebar_position: 4
tags:
  - conceitos
  - vender
  - contrato
  - múltiplas
  - contas
  - terminologia
keywords:
  - conceitos
  - vender
  - contrato
  - múltiplas
  - contas
  - terminologia
description: 'O que é a chamada à API "Vender Contratos: Múltiplas Contas?'
---

### O que é a chamada à API "Vender Contratos: Múltiplas Contas"?

Vender contratos para múltiplas contas em simultâneo.

Utiliza a resposta shortcode de "comprar_contrato_para_várias_contas" (buy_contract_for_multiple_accounts) para identificar o contrato e os tokens de autorização que permitem selecionar as contas em que esses contratos serão vendidos.

Observe que apenas as contas identificadas pelos tokens serão afetadas. Esta ação não irá vender o contrato na conta atualmente autorizada, a menos que inclua o token para a conta atual.
