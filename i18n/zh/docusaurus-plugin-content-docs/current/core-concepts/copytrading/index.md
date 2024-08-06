---
title: 跟單交易設施
hide_title: false
draft: false
sidebar_label: 跟單交易
sidebar_position: 4
tags:
  - 跟單交易
  - 交易
keywords:
  - 交易
  - 概念
  - 呼叫
  - 剖析
description: 跟單交易
---

## 這是甚麽？

跟單交易在金融市場越來越受歡迎；它允許客戶（跟單者）自動跟單另一個客戶（交易者）的交易。

## 成為交易者

要成為交易者（即允許其他人跟隨您的交易），請透過 [設定](/api-explorer#set_settings) 呼叫設定 “allow_copiers”。

然後，交易者建立唯讀 API 權杖並提供給跟單者。

啟用 allow_copiers 設定也將使 [跟單交易統計資料] (/api-explorer #copytrading_statistics) 呼叫起作用。 統計資料 API 呼叫提供有關帳戶的資訊（這是為了讓潛在的跟單者了解交易者過去的表現）。

## 成為跟單者

要成為跟單者，請使用 [跟單開始] (/api-explorer #copy_start) 呼叫。 若要停止跟單，請使用 [停止跟單] (/api-explorer #copy_stop) 呼叫。
