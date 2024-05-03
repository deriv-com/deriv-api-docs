---
title: API authentication
hide_title: false
draft: false
sidebar_label: API authentication
sidebar_position: 2
tags:
  - autenticação
  - autorização
keywords:
  - autenticação-deriv
  - deriv-authorisatio
description: Access the complete set of Deriv API features on your trading app by authenticating users with an API token. Learn to do this with an API example.
---

Sem autorização e autenticação, só terá acesso a cerca de metade das nossas chamadas e funcionalidades API. For example, in order to buy contracts or utilise the `Copy Trading` features, your users must be authenticated and authorised by our **OAuth** provider and **WebSocket Server**.

## Antes de começarmos

Por favor, certifique-se de que tem todos os requisitos mencionados abaixo para continuar.

### Requisitos

1. Deriv Client account
2. Token da Deriv API com o nível de acesso adequado
3. ID da aplicação da Deriv

:::note
Please refer to [Setting up a Deriv application](/docs/setting-up-a-deriv-application) for detailed instructions on how to create a Deriv API token and application.
:::

### Token de API

Um token de API é um identificador único de um cliente que solicita acesso a um servidor. É a forma mais simples de obter uma autorização.

The access level for each API token has to match the required access level of each API call, which can be found in the [API Explorer](/api-explorer) as well.

Por exemplo, na captura de ecrã abaixo, pode ver que, para poder utilizar o Estado da conta, tem de ser utilizado um token com nível de acesso, permissão de leitura.

![](/img/acc_status_scope_api_explorer.png)

Após a autorização de uma ligação WebSocket, as chamadas subsequentes nessa ligação serão consideradas ações do utilizador.

Por favor, não se esqueça de que o token da API pode ser utilizado com qualquer aplicação, o que significa que tanto a sua aplicação como os seus clientes têm de o manter seguro.

### OAuth2

OAuth stands for `Open Authorisation` — a protocol that allows a client to access resources hosted on a server on behalf of the user without revealing the credentials.

Este tipo de autorização permite aos clientes iniciar sessão em aplicações de terceiros através das suas contas Deriv sem criar um token de API. Neste caso, a aplicação de terceiros não vê a palavra-passe do utilizador ou o token permanente da API, o que a torna mais segura.

A autenticação OAuth2 requer mais passos para ser configurada, mas é a forma mais segura de os programadores partilharem o acesso à sua aplicação com os seus clientes.

For more information on OAuth2, visit [this guide](https://aaronparecki.com/oauth-2-simplified/).

Segue-se a representação visual de como funciona a ligação de autorização OAuth:

![OAuth flow](/img/how_oauth_works.png "OAuth flow")

## Processo de autenticação

In order to authenticate your user, specify the URL that will be used as the OAuth Redirect URL on the [Dashboard](/dashboard) page, **Register application** tab in the **OAuth details** fields. Then, add a login button on your website or app and direct users to **`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`** where your_app_id is the ID of your app.

![Deriv OAuth Login](/img/oauth_login.png "Deriv OAuth Login")

Quando um utilizador se regista/inicia sessão será redirecionado para o URL que introduziu como URL de redirecionamento. Este URL terá parâmetros adicionados com os tokens de sessão do utilizador e terá um aspeto semelhante a este:

`https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## Processo de autorização

Os parâmetros de consulta no URL de redirecionamento são as contas do utilizador e os respetivos tokens de sessão. Pode mapear os parâmetros de consulta para uma matriz através da seguinte abordagem:

```js showLineNumbers
const user_accounts = [
  {
    account: 'cr799393',
    token: 'a1-f7pnteezo4jzhpxclctizt27hyeot',
    currency: 'usd',
  },
  {
    account: 'vrtc1859315',
    token: 'a1clwe3vfuuus5kraceykdsoqm4snfq',
    currency: 'usd',
  },
];
```

To authorise the user based on the user's **selected** account, call the [authorize](/api-explorer#authorize) API call with the user's **selected** account **session token**:

```js showLineNumbers
{
  "authorize": "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

The response for the `authorize` call would be an object as below:

```js showLineNumbers
{
    "account_list": [
      {
        "account_type": "trading",
        "created_at": 1647509550,
        "currency": "USD",
        "is_disabled": 0,
        "is_virtual": 0,
        "landing_company_name": "svg",
        "loginid": "CR799393",
        "trading": {}
      },
      {
        "account_type": "trading",
        "created_at": 1664132232,
        "currency": "ETH",
        "is_disabled": 0,
        "is_virtual": 0,
        "landing_company_name": "svg",
        "loginid": "VRTC1859315",
        "trading": {}
      },
    ],
    "balance": 0,
    "country": "id",
    "currency": "USD",
    "email": "user_mail@email_provider.com",
    "fullname": " John Doe",
    "is_virtual": 0,
    "landing_company_fullname": "Deriv (SVG) LLC",
    "landing_company_name": "svg",
    "local_currencies": {
      "IDR": {
        "fractional_digits": 2
      }
    },
    "loginid": "CR799393",
    "preferred_language": "EN",
    "scopes": [
      "read",
      "trade",
      "trading_information",
      "payments",
      "admin"
    ],
    "trading": {},
    "upgradeable_landing_companies": [
      "svg"
    ],
    "user_id": 12345678
  }
```

Agora, o utilizador está autorizado e pode utilizar as chamadas à API da Deriv em nome da conta.
