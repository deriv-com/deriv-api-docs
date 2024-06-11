---
title: Kopya ticaret olanakları
hide_title: false
draft: false
sidebar_label: Kopya ticareti
sidebar_position: 4
tags:
  - kopya ticareti
  - alım satım
keywords:
  - alım satım
  - konsept
  - çağrılar
  - anatomi
description: Kopya Ticareti
---

## Ne oldu?

Kopyalama Ticareti finans piyasalarında popüler hale gelmektedir; bir müşterinin (Kopyalayıcı) başka bir müşterinin (Tüccar) işlemlerini otomatik olarak kopyalamasına olanak tanır.

## Tüccar Olmak

Bir Trader olmak için (yani başkalarının işlemlerinizi takip etmesine izin vermek için), [set settings](/api-explorer#set_settings) çağrısı aracılığıyla "allow_copiers" ayarını yapın.

Tüccar daha sonra salt okunur bir API belirteci oluşturur ve bunu Kopyalayıcıya sağlar.

allow_copiers ayarının etkinleştirilmesi [copytrading statistics](/api-explorer#copytrading_statistics) çağrısının da çalışmasını sağlayacaktır. İstatistik API çağrısı, bir hesap hakkında bilgi sağlar (bu, potansiyel kopyalayıcıların yatırımcının geçmiş performansı hakkında fikir sahibi olması içindir).

## Fotokopici Olmak

Kopyalayıcı olmak için [copy start](/api-explorer#copy_start) çağrısını kullanın. Kopyalamayı durdurmak için [copy stop](/api-explorer#copy_stop) çağrısını kullanın.
