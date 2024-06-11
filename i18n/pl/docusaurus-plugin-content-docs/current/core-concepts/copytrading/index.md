---
title: Kopiuj obiekty handlowe
hide_title: false
draft: false
sidebar_label: Kopiuj handel
sidebar_position: 4
tags:
  - handel kopiami
  - handel
keywords:
  - handel
  - pojęcie
  - zgłoszenia
  - anatomia
description: Handlowanie przez kopiowanie
---

## Co to jest?

Copy Trading staje się popularny na rynkach finansowych; umożliwia klientowi (kopiarce) automatyczne kopiowanie transakcji innego klienta (Tradera).

## Zostanie traderem

Aby zostać Traderem (tj. zezwolić innym na śledzenie Twoich transakcji), ustaw ustawienie „allow_copiers” za pomocą wywołania [set settings] (/api-explorer #set_settings).

Następnie Trader tworzy token API tylko do odczytu i udostępnia go kopiarce.

Włączenie ustawienia allow_copiers spowoduje również zadziałanie wywołania [statystyki handlu kopiami] (/api-explorer #copytrading_statistics). Wywołanie API statystyk dostarcza informacji o koncie (ma to na celu, aby potencjalni kopiarze mieli pojęcie o przeszłych wynikach tradera).

## Zostanie kopiarką

Aby zostać kopiarką, użyj wywołania [copy start] (/api-explorer #copy_start). Aby zatrzymać kopiowanie, użyj wywołania [copy stop] (/api-explorer #copy_stop).
