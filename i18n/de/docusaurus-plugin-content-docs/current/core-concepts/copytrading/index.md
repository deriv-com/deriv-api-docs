---
title: Copy Trading-Einrichtungen
hide_title: false
draft: false
sidebar_label: Copy-Trading
sidebar_position: 4
tags:
  - copy-Trading
  - Handel
keywords:
  - Handel
  - Konzept
  - Anrufe
  - Anatomie
description: Kopierter Handel
---

## Was ist das?

Copy Trading wird auf den Finanzmärkten immer beliebter. Es ermöglicht einem Kunden (dem Kopierer), die Geschäfte eines anderen Kunden (des Händlers) automatisch zu kopieren.

## Trader werden

Um ein Trader zu werden (d.h. um anderen zu erlauben, Ihren Handel zu verfolgen), setzen Sie die Einstellung "allow_copiers" über den Aufruf [set settings](/api-explorer#set_settings).

Der Händler erstellt dann ein schreibgeschütztes API-Token und gibt es an den Kopierer weiter.

Wenn Sie die Einstellung allow_copiers aktivieren, wird auch der Aufruf [copytrading statistics](/api-explorer#copytrading_statistics) funktionieren. Der Statistik-API-Aufruf liefert die Informationen über ein Konto (damit potenzielle Kopierer eine Vorstellung von der bisherigen Performance des Händlers haben).

## Kopierer werden

Um ein Kopierer zu werden, verwenden Sie den Aufruf [copy start](/api-explorer#copy_start). Um das Kopieren zu beenden, verwenden Sie den Aufruf [copy stop](/api-explorer#copy_stop).
