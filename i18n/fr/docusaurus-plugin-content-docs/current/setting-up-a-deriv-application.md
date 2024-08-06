---
title: Créer une application Deriv
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
description: Un guide étape par étape sur la création de votre token Deriv API et la construction de votre application de trading avec l'aide de notre API de trading. En savoir plus.
---

```mdx-code-block
import Link from '@docusaurus/Link';
```

#### Compte Deriv

Si vous n'avez pas encore de compte Deriv, vous pouvez facilement en créer un en visitant notre page d'inscription ou en utilisant l'appel d'API <a href="api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a>. C'est totalement gratuit. En revanche, si vous avez déjà un compte, veuillez vous connecter à l'aide des identifiants de votre compte. Pour éviter toute perte accidentelle de fonds pendant les tests, nous vous recommandons d'utiliser votre compte de démo plutôt qu'un compte réel.

Pour gagner une majoration, ouvrez un compte réel Deriv pour recevoir vos gains mensuels. Vous pouvez également créer un compte réel en utilisant les appels d'API <Link href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</Link>ou <Link href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</Link>.

:::caution
Pour créer des applications Deriv, vous aurez besoin d'un jeton API avec l'étendue Admin du compte que vous souhaitez utiliser pour votre application.
:::

## Comment créer un jeton API Deriv

Pour créer votre jeton API, il vous suffit de vous rendre dans le tableau de bord et de sélectionner l'onglet **Gestion des jetons**. Créez ensuite un nouveau jeton correspondant au niveau d'accès requis pour les fonctionnalités de votre application.

Pour créer un nouveau jeton API, procédez comme suit :

1. Sélectionnez les champs qu'il vous faut.
2. Nommez votre jeton
3. Cliquez sur **Créer**

Vous pouvez également créer un jeton API via l'appel d'API <a href="api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a>.

:::caution
Pour créer une application, vous devez disposer d'un jeton ayant la portée `Admin`.
:::

## Comment créer une application Deriv

Pour créer votre application avec les options de configuration appropriées, sélectionnez l'onglet **Enregistrer une application** dans le tableau de bord. Vous pouvez à tout moment modifier la configuration de votre application dans l'onglet **Gestion des applications**.

| Champ d'informations sur l'application | Description                                                                                                                                                                                                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Compte                                 | Le compte avec lequel vous voulez créer l'application                                                                                                                                                                                                       |
| Jeton d'API                            | Le jeton API avec lequel vous souhaitez créer l'application                                                                                                                                                                                                 |
| Nom de l'application                   | Nom de l'application                                                                                                                                                                                                                                        |
| Majoration                             | La commission ajoutée au prix de la transaction pour obtenir un revenu supplémentaire                                                                                                                                                                       |
| URL d'autorisation                     | L'URL qui permet aux clients de se connecter à votre application à l'aide de leurs comptes Deriv sans jeton API                                                                                                                                             |
| URL de vérification                    | Utilisé pour la vérification de l'adresse électronique. Si elle est fournie, l'URL contenant le jeton de vérification est envoyée à l'adresse électronique de l'utilisateur ; sinon, l'URL d'authentification est utilisée. |

**Pour créer une application, suivez les étapes suivantes:**

1. Sélectionnez le compte avec lequel vous souhaitez créer l'application.
2. Sélectionnez le jeton API ajouté à votre compte (il doit avoir l'accès \`Admin\`).
3. Nommez votre application.
4. Remplissez les champs **Markup** et **OAuth details**.
5. Sélectionnez les **Authorisation Scopes** nécessaires à votre application.
6. Cliquez sur **Enregistrer la candidature**.

Assurez-vous que les URL **Autorisation** et **Vérification** sont correctes en fonction de votre implémentation.

Par exemple, si votre domaine est **`https://example.com`** et que votre **autorisation et authentification sont gérées par** `verify`, vos URLs seront :

**`https://example.com/verify`**
