---
title: Create a Deriv application
sidebar_label: Configuração da aplicação Deriv
sidebar_position: 7
sidebar_class_name: hide-sidebar-item
tags:
  - introdução
  - a quem se aplica
  - configuração
keywords:
  - introdução
  - a quem se aplica
  - configuração
description: A step-by-step guide on creating your Deriv API token and building your trading application with the help of our trading API. Saiba mais.
---

#### Conta Deriv

If you don't have a Deriv account yet, you can easily create one by visiting our signup page or using the <a href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a> API call. É totalmente gratuita. Se já tem uma conta, por favor inicie sessão com os seus dados. Para evitar qualquer perda acidental de fundos durante a fase de teste, recomendamos que utilize a sua conta demo em vez da conta real.

Para obter markup, crie uma conta real na Deriv para receber os seus ganhos mensais. You can also create a real account using <a href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</a> or <a href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</a> API calls.

:::caution
To create Deriv applications, you'll need an API token with the Admin scope for the account you wish to use for your application.
:::

## Como criar um token de API

To create your API token, simply go to the Dashboard and select the **Manage Tokens** tab. A partir daí, crie um novo token que corresponda ao nível de acesso necessário para as funcionalidades da sua aplicação.

Para criar um novo token de API, siga os seguintes passos:

1. Selecione os âmbitos necessários.
2. Forneça um nome para o seu token.
3. Click **Create**

Alternatively, you can create an API token via the <a href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a> API call.

:::caution
You need a token with the `Admin` scope to create an application.
:::

## Como criar uma aplicação Deriv

To create your application with the appropriate configuration options, select the **Register Application** tab in the Dashboard. You can make changes to your application's configuration at anytime in the **Manage Applications** tab.

| Campo de informação da app | Descrição                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Conta                      | A conta com a qual pretende criar a aplicação                                                                    |
| Token de API               | O token da API com que pretende criar a aplicação                                                                |
| Nome da app                | Nome da aplicação                                                                                                |
| Markup                     | A comissão adicionada ao preço da negociação para obter rendimentos adicionais                                   |
| URL de autorização         | O URL que permite aos clientes iniciar sessão na sua aplicação através das suas contas Deriv sem um token de API |
| URL de verificação         | O URL de redirecionamento OAuth para a autorização OAuth                                                         |

**Para criar uma aplicação, siga os seguintes passos:**

1. Selecione a conta com a qual pretende criar a aplicação.
2. Selecione o token de API adicionado à sua conta (deve conter o âmbito \`Admin\`).
3. Forneça um nome para a sua aplicação.
4. Fill the **Markup** and **OAuth details** fields.
5. Select the **Authorisation Scopes** needed by your application.
6. Click **Register Application**.

Make sure the **Authorisation** and **Verification** URLs are correct based on your implementation.

For example, if your domain is **`https://example.com`** and your **authorisation and authentication are handled by** `verify`, your URLs will be:

**`https://example.com/verify`**
