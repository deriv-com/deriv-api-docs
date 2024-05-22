---
title: "Contrats de vente : Comptes multiples"
hide_title: false
draft: false
sidebar_label: "Contrats de vente : Comptes multiples"
sidebar_position: 4
tags:
  - concepts
  - vendre
  - contrat
  - multiples
  - comptes
  - terminologie
keywords:
  - concepts
  - vendre
  - contrat
  - multiples
  - comptes
  - terminologie
description: Qu'est-ce que l'appel d'API de contrats de vente pour des comptes multiples ?
---

### Qu'est-ce que l'appel d'API de contrats de vente pour des comptes multiples ?

Contrats de vente pour comptes multiples simultanément.

Uses the shortcode response from `buy_contract_for_multiple_accounts` to identify the contract, and authorisation tokens to select which accounts to sell those contracts on.

Notez que seuls les comptes identifiés par les jetons seront affectés. Le contrat ne sera pas vendu sur le compte actuellement autorisé, à moins que vous n'incluiez le jeton pour le compte actuel.
