---
title: Servizi di copy trading
hide_title: false
draft: false
sidebar_label: Copiare il trading
sidebar_position: 4
tags:
  - copy trading
  - trading
keywords:
  - trading
  - concetto
  - chiamate
  - anatomia
description: Copy Trading
---

## Che cos'è?

Il Copy Trading sta diventando popolare nei mercati finanziari; consente a un cliente (il Copier) di copiare automaticamente le operazioni di un altro cliente (il Trader).

## Diventare un trader

Per diventare un Trader (cioè per consentire ad altri di seguire le sue operazioni), imposti l'impostazione "allow_copiers" tramite la chiamata [set settings](/api-explorer#set_settings).

Il Trader crea quindi un token API di sola lettura e lo fornisce alla Copiatrice.

L'attivazione dell'impostazione allow_copiers farà funzionare anche la chiamata [copytrading statistics](/api-explorer#copytrading_statistics). La chiamata all'API delle statistiche fornisce le informazioni su un conto (in modo che i potenziali copiatori abbiano un'idea della performance passata del trader).

## Diventare copiatore

Per diventare copiatore, utilizzi la chiamata [copy start](/api-explorer#copy_start). Per interrompere la copia, utilizzi la chiamata [copy stop](/api-explorer#copy_stop).
