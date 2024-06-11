---
title: "Verträge verkaufen: Mehrere Konten"
hide_title: false
draft: false
sidebar_label: "Verträge verkaufen: Mehrere Konten"
sidebar_position: 4
tags:
  - Konzepte
  - verkaufen
  - Kontrakt
  - mehrere
  - Konten
  - Terminologie
keywords:
  - Konzepte
  - verkaufen
  - Kontrakt
  - mehrere
  - Konten
  - Terminologie
description: "Was ist die Sell Contracts: Multiple Accounts API call?"
---

### Was ist die Sell Contracts: Multiple Accounts API call?

Verkaufen Sie Verträge für mehrere Kunden gleichzeitig.

Verwendet die Shortcode-Antwort von `buy_contract_for_multiple_accounts`, um den Vertrag zu identifizieren, und Autorisierungs-Token, um auszuwählen, an welche Konten diese Verträge verkauft werden sollen.

Beachten Sie, dass nur die durch die Token identifizierten Konten betroffen sind. Dadurch wird der Vertrag auf dem aktuell autorisierten Konto nicht verkauft, es sei denn, Sie geben den Token für das aktuelle Konto an.
