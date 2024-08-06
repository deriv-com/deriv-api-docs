---
title: Facilidades de "Copy Trading"
hide_title: false
draft: false
sidebar_label: Copy trading
sidebar_position: 4
tags:
  - copy trading
  - negociação
keywords:
  - negociação
  - conceito
  - chamadas
  - anatomia
description: Copy Trading
---

## O que é o "Copy Trading"?

O "Copy Trading" está a ganhar popularidade nos mercados financeiros, permitindo que um cliente (o Copiador) copie automaticamente as negociações de outro cliente (o Trader).

## Tornar-se um Trader

Para se tornar um Trader (ou seja, para permitir que outros sigam as suas negociações), ative a opção "permitir_copiadores" através da chamada ["configurar definições"](/api-explorer#set_settings).

O Trader cria então um token de API apenas de leitura e fornece-o ao Copiador.

Ao ativar a definição "permitir_copiadores" também torna a chamada ["estatísticas de copytrading"](/api-explorer#copytrading_statistics) funcional. A chamada à API de estatísticas fornece as informações sobre a conta (permitindo que os potenciais copiadores avaliem o desempenho anterior do trader).

## Tornar-se um Copiador (Copier)

Para se tornar um Copiador, utilize a chamada ["começar a copiar"](/api-explorer#copy_start). Para parar a cópia, utilize a chamada ["parar de copiar"](/api-explorer#copy_stop).
