---
title: Autenticação API
hide_title: false
draft: false
sidebar_label: Autenticação API
sidebar_position: 2
tags:
  - autenticação
  - autorização
keywords:
  - autenticação-deriv
  - derivação-autorização
description: Aceda ao conjunto completo de funcionalidades da API Deriv na sua aplicação de negociação, autenticando os utilizadores com um token de API. Aprenda a fazê-lo com um exemplo de API.
---

Sem autorização e autenticação, só terá acesso a cerca de metade das nossas chamadas e funcionalidades API. Por exemplo, para comprar contratos ou utilizar as funcionalidades `Copy Trading`, os seus utilizadores devem ser autenticados e autorizados pelo nosso fornecedor **OAuth** e pelo **WebSocket Server**.

## Antes de começarmos

Por favor, certifique-se de que tem todos os requisitos mencionados abaixo para continuar.

### Requisitos

1. Deriv Conta de cliente
2. Token da Deriv API com o nível de acesso adequado
3. ID da aplicação da Deriv

:::note
Consulte [Configurar uma aplicação Deriv] (/docs/setting-up-a-deriv-application) para obter instruções detalhadas sobre como criar um token e uma aplicação da API Deriv.
:::

### Token de API

Um token de API é um identificador único de um cliente que solicita acesso a um servidor. É a forma mais simples de obter uma autorização.

O nível de acesso para cada token de API tem de corresponder ao nível de acesso necessário de cada chamada de API, que também pode ser encontrado no [API Explorer](/api-explorer).

Por exemplo, na captura de ecrã abaixo, pode ver que, para poder utilizar o Estado da conta, tem de ser utilizado um token com nível de acesso, permissão de leitura.

![](/img/acc_status_scope_api_explorer.png)

Após a autorização de uma ligação WebSocket, as chamadas subsequentes nessa ligação serão consideradas ações do utilizador.

Por favor, não se esqueça de que o token da API pode ser utilizado com qualquer aplicação, o que significa que tanto a sua aplicação como os seus clientes têm de o manter seguro.

### OAuth2

OAuth significa `Open Authorisation` - um protocolo que permite a um cliente aceder a recursos alojados num servidor em nome do utilizador sem revelar as credenciais.

Este tipo de autorização permite aos clientes iniciar sessão em aplicações de terceiros através das suas contas Deriv sem criar um token de API. Neste caso, a aplicação de terceiros não vê a palavra-passe do utilizador ou o token permanente da API, o que a torna mais segura.

A autenticação OAuth2 requer mais passos para ser configurada, mas é a forma mais segura de os programadores partilharem o acesso à sua aplicação com os seus clientes.

Para obter mais informações sobre o OAuth2, visite [este guia] (https://aaronparecki.com/oauth-2-simplified/).

Segue-se a representação visual de como funciona a ligação de autorização OAuth:

![Fluxo OAuth](/img/how_oauth_works.png "Fluxo OAuth")

## Processo de autenticação

Para autenticar o seu utilizador, especifique o URL que será utilizado como URL de redireccionamento do OAuth na página [Dashboard](/dashboard), separador **Registar aplicação** nos campos **Detalhes do OAuth**. Em seguida, adicione um botão de início de sessão no seu sítio Web ou aplicação e direccione os utilizadores para **`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`** onde your_app_id é o ID da sua aplicação.

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

Para autorizar o utilizador com base na conta **selecionada** do utilizador, chame a chamada à API [authorize](/api-explorer#authorize) com o **session token** da conta **selecionada** do utilizador:

```js showLineNumbers
{
  "authorize": "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

A resposta para a chamada `authorize` seria um objeto como o que se segue:

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
