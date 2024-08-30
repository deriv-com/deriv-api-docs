---
title: Servicios de copy trading
hide_title: false
draft: false
sidebar_label: Copy trading
sidebar_position: 4
tags:
  - copy trading
  - operar
keywords:
  - operar
  - concepto
  - llamadas
  - anatomía
description: Copy Trading
---

## ¿De qué se trata?

El Copy Trading se está popularizando en los mercados financieros; permite a un cliente (el Copiador) copiar automáticamente las operaciones de otro cliente (el Trader).

## Convertirse en comerciante

Para convertirse en Trader (es decir, para permitir que otros sigan sus operaciones), establezca el ajuste "allow_copiers" a través de la llamada [set settings](/api-explorer#set_settings).

A continuación, el comerciante crea un token API de sólo lectura y se lo proporciona al copiador.

Activar el ajuste allow_copiers también hará que funcione la llamada [copytrading statistics](/api-explorer#copytrading_statistics). La llamada a la API de estadísticas proporciona la información sobre una cuenta (esto es para que los posibles copiadores tengan una idea sobre el rendimiento pasado del operador).

## Convertirse en copista

Para convertirse en copiador, utilice la llamada [copy start](/api-explorer#copy_start). Para detener la copia, utilice la llamada [copy stop](/api-explorer#copy_stop).
