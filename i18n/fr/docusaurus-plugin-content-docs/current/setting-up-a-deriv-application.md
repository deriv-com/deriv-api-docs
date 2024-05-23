---
title: Create a Deriv application
sidebar_label: Configuration d'une application Deriv
sidebar_position: 7
sidebar_class_name: hide-sidebar-item
tags:
  - intro
  - application
  - configuration
keywords:
  - intro
  - application
  - configuration
description: A step-by-step guide on creating your Deriv API token and building your trading application with the help of our trading API. En savoir plus.
---

#### Compte Deriv

If you don't have a Deriv account yet, you can easily create one by visiting our signup page or using the <a href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a> API call. C'est totalement gratuit. En revanche, si vous avez déjà un compte, veuillez vous connecter à l'aide des identifiants de votre compte. Pour éviter toute perte accidentelle de fonds pendant les tests, nous vous recommandons d'utiliser votre compte de démo plutôt qu'un compte réel.

Pour gagner une majoration, ouvrez un compte réel Deriv pour recevoir vos gains mensuels. You can also create a real account using <a href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</a> or <a href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</a> API calls.

:::caution
To create Deriv applications, you'll need an API token with the Admin scope for the account you wish to use for your application.
:::

## Comment créer un jeton API Deriv

To create your API token, simply go to the Dashboard and select the **Manage Tokens** tab. Créez ensuite un nouveau jeton correspondant au niveau d'accès requis pour les fonctionnalités de votre application.

Pour créer un nouveau jeton API, procédez comme suit :

1. Sélectionnez les champs qu'il vous faut.
2. Nommez votre jeton
3. Click **Create**

Alternatively, you can create an API token via the <a href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a> API call.

:::caution
You need a token with the `Admin` scope to create an application.
:::

## Comment créer une application Deriv

To create your application with the appropriate configuration options, select the **Register Application** tab in the Dashboard. You can make changes to your application's configuration at anytime in the **Manage Applications** tab.

| Champ d'informations sur l'application | Description                                                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Compte                                 | Le compte avec lequel vous voulez créer l'application                                                           |
| Jeton d'API                            | Le jeton API avec lequel vous souhaitez créer l'application                                                     |
| Nom de l'application                   | Nom de l'application                                                                                            |
| Majoration                             | La commission ajoutée au prix de la transaction pour obtenir un revenu supplémentaire                           |
| URL d'autorisation                     | L'URL qui permet aux clients de se connecter à votre application à l'aide de leurs comptes Deriv sans jeton API |
| URL de vérification                    | L'URL de redirection OAuth pour l'autorisation OAuth                                                            |

**To create an application, follow these steps:**

1. Sélectionnez le compte avec lequel vous souhaitez créer l'application.
2. Sélectionnez le jeton API ajouté à votre compte (il doit avoir l'accès \`Admin\`).
3. Nommez votre application.
4. Fill the **Markup** and **OAuth details** fields.
5. Select the **Authorisation Scopes** needed by your application.
6. Click **Register Application**.

Make sure the **Authorisation** and **Verification** URLs are correct based on your implementation.

For example, if your domain is **`https://example.com`** and your **authorisation and authentication are handled by** `verify`, your URLs will be:

**`https://example.com/verify`**
