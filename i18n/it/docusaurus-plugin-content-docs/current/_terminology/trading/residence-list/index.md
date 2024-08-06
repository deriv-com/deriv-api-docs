---
title: Elenco dei Paesi
hide_title: false
draft: false
sidebar_label: Elenco dei Paesi
sidebar_position: 2
tags:
  - concetti
  - paesi
  - residente
  - elenco
  - terminologia
keywords:
  - concetti
  - paesi
  - residente
  - elenco
  - terminologia
description: cos'è la chiamata API Elenco dei Paesi?
---

### Cos'è la chiamata API Elenco dei Paesi?

Elenca i Paesi e i codici nazionali a 2 lettere, adatti per compilare il modulo di apertura del conto.

l'elenco di esempio può essere qualcosa del genere:

```json
[
  {
    «identity»: {
      «services»: {«idv»: {
        «documents_supported»: {},
          «has_visual_sample»: 0,
          «is_country_supported»: 0},
          «onfido»: {


          «documents_supported»: {
            «passport»: {«display_name»:
              «Passport»}},
          «
            is_country_supported»:
          0}}},



    «phone_idd»: «93", «text»:
    «Afghanistan», «value»:
    «af»
  },
  {«identity»: {
    «services»: {
      «idv»: {
        «documents_supported»: {}
          ,
          «has_visual_sample»: 0,
          «is_country_supported»: 0}, «onfido»: {«documents_supported»: {

          },
        «is_country_supported»: 0}}},




    «phone_idd»: «35818", «text»:
    «Isole Aland», «value»:
    «ax»}]


```

Può leggere di più sulla `Lista dei Paesi` su [API Explorer - Lista dei Paesi](https://api.deriv.com/api-explorer#residence_list)
