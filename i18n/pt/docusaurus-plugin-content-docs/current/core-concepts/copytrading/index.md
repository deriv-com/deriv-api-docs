---
title: Facilidades de negociação de cópias
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
description: Negociações de cópia
---

## O que é que quer?

O Copy Trading está a tornar-se popular nos mercados financeiros; permite que um cliente (o Copiador) copie automaticamente as transacções de outro cliente (o Negociador).

## Tornar-se um comerciante

Para se tornar um Negociador (ou seja, para permitir que outros sigam as suas transacções), defina a definição "allow_copiers" através da chamada [set settings](/api-explorer#set_settings).

O comerciante cria então um token API só de leitura e fornece-o à copiadora.

A ativação da definição allow_copiers também fará com que a chamada [copytrading statistics](/api-explorer#copytrading_statistics) funcione. A chamada à API de estatísticas fornece as informações sobre uma conta (para que os potenciais copiadores tenham uma ideia do desempenho anterior do comerciante).

## Como se tornar um copiador

Para se tornar uma copiadora, utilize a chamada [copy start](/api-explorer#copy_start). Para parar a cópia, utilize a chamada [copy stop](/api-explorer#copy_stop).
