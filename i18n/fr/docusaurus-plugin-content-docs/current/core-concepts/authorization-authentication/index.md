---
title: API authentication
hide_title: false
draft: false
sidebar_label: API authentication
sidebar_position: 2
tags:
  - authentification
  - autorisation
keywords:
  - deriv-authentication
  - deriv-authorisatio
description: Access the complete set of Deriv API features on your trading app by authenticating users with an API token. Learn to do this with an API example.
---

Sans autorisation ni authentification, vous n'aurez accès qu'à une partie de nos appels et fonctionnalités d'API. For example, in order to buy contracts or utilise the `Copy Trading` features, your users must be authenticated and authorised by our **OAuth** provider and **WebSocket Server**.

## Avant de commencer...

Assurez-vous que vous remplissez toutes les conditions ci-dessous pour continuer.

### Exigences

1. Deriv Client account
2. Jeton API Deriv avec le niveau d'accès approprié
3. Identifiant de l'application Deriv

:::note
Please refer to [Setting up a Deriv application](/docs/setting-up-a-deriv-application) for detailed instructions on how to create a Deriv API token and application.
:::

### Token de l'API

Un jeton API est l'identifiant unique d'un client qui demande l'accès à un serveur. C'est la méthode d'autorisation la plus simple.

The access level for each API token has to match the required access level of each API call, which can be found in the [API Explorer](/api-explorer) as well.

Par exemple, sur la capture d'écran ci-dessous, vous constaterez qu'un jeton avec un niveau d'accès en lecture est nécessaire pour pouvoir accéder au statut du compte.

![](/img/acc_status_scope_api_explorer.png)

Suite à l'autorisation d'une connexion WebSocket, les appels suivants de cette connexion seront considérés comme des actions de l'utilisateur.

N'oubliez pas que le jeton API peut être utilisé avec n'importe quelle application. Votre application et vos clients doivent donc la sécuriser.

### OAuth2

OAuth stands for `Open Authorisation` — a protocol that allows a client to access resources hosted on a server on behalf of the user without revealing the credentials.

Ce type d'autorisation permet aux clients de se connecter à des applications tierces à l'aide de leurs comptes Deriv sans créer de jeton API. Dans ce cas, l'application tierce n'accède pas au mot de passe ou au jeton API permanent de l'utilisateur, ce qui la rend plus sûre.

La configuration de l'authentification OAuth2 nécessite des étapes supplémentaires, mais c'est le moyen le plus sûr pour les développeurs de partager l'accès à leur application avec leurs clients.

For more information on OAuth2, visit [this guide](https://aaronparecki.com/oauth-2-simplified/).

Voici la représentation visuelle du fonctionnement de la connexion d'autorisation OAuth :

![OAuth flow](/img/how_oauth_works.png "OAuth flow")

## Processus d'authentification

In order to authenticate your user, specify the URL that will be used as the OAuth Redirect URL on the [Dashboard](/dashboard) page, **Register application** tab in the **OAuth details** fields. Then, add a login button on your website or app and direct users to **`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`** where your_app_id is the ID of your app.

![Deriv OAuth Login](/img/oauth_login.png "Deriv OAuth Login")

Après l'inscription ou la connexion d'un utilisateur, il est redirigé vers l'URL que vous avez saisi comme URL de redirection. Des arguments seront ajoutés à cet URL avec les jetons de session de l'utilisateur et ressemblera à ceci :

`https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## Processus d'autorisation

Les paramètres de requête figurant dans l'URL de redirection correspondent aux comptes de l'utilisateur et les jetons de session associés. Vous pouvez mapper les paramètres de requête à un tableau au moyen de l'approche suivante :

```js showLineNumbers
const user_accounts = [
  {
    account : 'cr799393',
    token : 'a1-f7pnteezo4jzhpxclctizt27hyeot',
    currency : 'usd',
  },
  {
    account : 'vrtc1859315',
    token : 'a1clwe3vfuuus5kraceykdsoqm4snfq',
    currency : 'usd',
  },
] ;
```

To authorise the user based on the user's **selected** account, call the [authorize](/api-explorer#authorize) API call with the user's **selected** account **session token**:

```js showLineNumbers
{
  "authorize" : "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

The response for the `authorize` call would be an object as below:

```js showLineNumbers
{
    "account_list" : [
      {
        "account_type" : "trading",
        "created_at" : 1647509550,
        "currency" : "USD",
        "is_disabled" : 0,
        "is_virtual" : 0,
        "landing_company_name" : "svg",
        "loginid" : "CR799393",
        "trading" : {}
      },
      {
        "account_type" : "trading",
        "created_at" : 1664132232,
        "currency" : "ETH",
        "is_disabled" : 0,
        "is_virtual" : 0,
        "landing_company_name" : "svg",
        "loginid" : "VRTC1859315",
        "trading" : {}
      },
    ],
    "balance" : 0,
    "country" : "id",
    "currency" : "USD",
    "email" : "user_mail@email_provider.com",
    "fullname" : " John Doe",
    "is_virtual" : 0,
    "landing_company_fullname" : "Deriv (SVG) LLC",
    "landing_company_name" : "svg",
    "local_currencies" : {
      "IDR" : {
        "fractional_digits" : 2
      }
    },
    "loginid" : "CR799393",
    "preferred_language" : "EN",
    "scopes" : [
      "read",
      "trade",
      "trading_information",
      "payments",
      "admin"
    ],
    "trading" : {},
    "upgradeable_landing_companies" : [
      "svg"
    ],
    "user_id" : 12345678
}
```

L'utilisateur est désormais autorisé et vous pouvez utiliser les appels d'API Deriv pour ce compte.
