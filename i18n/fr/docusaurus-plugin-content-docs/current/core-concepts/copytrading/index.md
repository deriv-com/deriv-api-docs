---
title: Fonctionnalités de négociation par copie
hide_title: false
draft: false
sidebar_label: Copy trading
sidebar_position: 4
tags:
  - copy trading
  - transaction
keywords:
  - transaction
  - concept
  - appels
  - anatomie
description: Copiez le Trading
---

## Qu'est-ce que c'est ?

Le Copy Trading est de plus en plus populaire sur les marchés financiers ; il permet à un client (le Copieur) de copier automatiquement les transactions d'un autre client (le Trader).

## Devenir commerçant

Pour devenir trader (c'est-à-dire pour permettre à d'autres de suivre vos transactions), définissez le paramètre "allow_copiers" via l'appel [set settings](/api-explorer#set_settings).

L'opérateur crée alors un jeton API en lecture seule et le fournit au copieur.

L'activation du paramètre allow_copiers permettra également à l'appel [copytrading statistics](/api-explorer#copytrading_statistics) de fonctionner. L'appel à l'API "statistiques" fournit des informations sur un compte (afin que les copieurs potentiels aient une idée des performances passées du trader).

## Devenir copieur

Pour devenir copieur, utilisez l'appel [copy start](/api-explorer#copy_start). Pour arrêter la copie, utilisez l'appel [copy stop](/api-explorer#copy_stop).
