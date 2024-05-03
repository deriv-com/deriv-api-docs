---
title: "Sell Contracts: Multiple Accounts"
hide_title: false
draft: false
sidebar_label: "Sell Contracts: Multiple Accounts"
sidebar_position: 4
tags:
  - concepts
  - sell
  - contract
  - multiple
  - accounts
  - terminology
keywords:
  - concepts
  - sell
  - contract
  - multiple
  - accounts
  - terminology
description: "What is the Sell Contracts: Multiple Accounts API call?"
---

### What is the Sell Contracts: Multiple Accounts API call?

Sell contracts for multiple accounts simultaneously.

Uses the shortcode response from `buy_contract_for_multiple_accounts` to identify the contract, and authorisation tokens to select which accounts to sell those contracts on.

Note that only the accounts identified by the tokens will be affected. This will not sell the contract on the currently-authorised account unless you include the token for the current account.
