---
title: API authentication
hide_title: false
draft: false
sidebar_label: API authentication
sidebar_position: 2
tags:
  - autentificación
  - autorización
keywords:
  - autenticación deriv
  - deriv-authorisatio
description: Access the complete set of Deriv API features on your trading app by authenticating users with an API token. Learn to do this with an API example.
---

Sin autorización ni autenticación, solo tendrá acceso a aproximadamente la mitad de nuestras funciones y llamadas API. For example, in order to buy contracts or utilise the `Copy Trading` features, your users must be authenticated and authorised by our **OAuth** provider and **WebSocket Server**.

## Antes de empezar

Asegúrese de cumplir con todos los requisitos que se mencionan a continuación para continuar.

### Requisitos

1. Deriv Client account
2. Token de Deriv API con el nivel de acceso adecuado
3. ID de aplicación Deriv

:::note
Please refer to [Setting up a Deriv application](/docs/setting-up-a-deriv-application) for detailed instructions on how to create a Deriv API token and application.
:::

### Token API

Un Token API es un identificador único de un cliente que solicita acceso desde un servidor. Es la forma más sencilla de autorización.

The access level for each API token has to match the required access level of each API call, which can be found in the [API Explorer](/api-explorer) as well.

Por ejemplo, en la captura de pantalla siguiente, puede ver que para poder usar el Estado de Cuenta, se debe usar un token con nivel de acceso de lectura.

![](/img/acc_status_scope_api_explorer.png)

Tras la autorización de una conexión de WebSocket, las llamadas posteriores a esa conexión se considerarán acciones del usuario.

Tenga en cuenta que el Token API se puede usar con cualquier aplicación, por lo que tanto su aplicación como sus clientes deben mantenerla segura.

### OAuth2

OAuth stands for `Open Authorisation` — a protocol that allows a client to access resources hosted on a server on behalf of the user without revealing the credentials.

Este tipo de autorización permite a los clientes iniciar sesión en aplicaciones de terceros con sus cuentas de Deriv sin crear un Token API. En este caso, la aplicación de terceros no ve la contraseña del usuario ni el Token API permanente, lo que la hace más segura.

La autenticación OAuth2 requiere más pasos para configurarla, pero es la forma más segura para que los desarrolladores compartan el acceso a su aplicación con sus clientes.

For more information on OAuth2, visit [this guide](https://aaronparecki.com/oauth-2-simplified/).

Esta es la representación visual de cómo funciona la conexión de autorización OAuth:

![OAuth flow](/img/how_oauth_works.png "OAuth flow")

## El proceso de autenticación

In order to authenticate your user, specify the URL that will be used as the OAuth Redirect URL on the [Dashboard](/dashboard) page, **Register application** tab in the **OAuth details** fields. Then, add a login button on your website or app and direct users to **`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`** where your_app_id is the ID of your app.

![Deriv OAuth Login](/img/oauth_login.png "Deriv OAuth Login")

Una vez que un usuario se registre o inicie sesión, se le redirigirá a la URL que haya introducido como URL de redireccionamiento. A esta URL se le agregarán argumentos con los tokens de sesión del usuario y tendrá un aspecto similar al siguiente:

`https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## El proceso de autorización

Los parámetros de consulta de la URL de redireccionamiento son las cuentas del usuario y sus tokens de sesión relacionados. Puede asignar los parámetros de consulta a una matriz mediante el siguiente enfoque:

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

Ahora, el usuario está autorizado y puede usar las llamadas de Deriv API en nombre de la cuenta.
