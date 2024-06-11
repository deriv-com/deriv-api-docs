---
title: Crie uma aplicação Deriv
sidebar_label: Configuração da aplicação Deriv
sidebar_position: 7
sidebar_class_name: item da barra lateral
tags:
  - introdução
  - a quem se aplica
  - configuração
keywords:
  - introdução
  - a quem se aplica
  - configuração
description: Um guia passo a passo sobre como criar o seu token Deriv API e construir a sua aplicação de negociação com a ajuda da nossa API de negociação. Saiba mais.
---

#### Conta Deriv

Se ainda não tem uma conta Deriv, pode criar uma facilmente visitando a nossa página de registo ou utilizando a chamada API <a href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a>. É totalmente gratuita. Se já tem uma conta, por favor inicie sessão com os seus dados. Para evitar qualquer perda acidental de fundos durante a fase de teste, recomendamos que utilize a sua conta demo em vez da conta real.

Para obter markup, crie uma conta real na Deriv para receber os seus ganhos mensais. Também pode criar uma conta real utilizando as chamadas API <a href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</a> ou <a href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</a>.

:::caution
Para criar aplicações Deriv, necessitará de um token de API com o âmbito Admin da conta que pretende utilizar para a sua aplicação.
:::

## Como criar um token de API

Para criar o seu token de API, basta ir ao Painel de Controlo e selecionar o separador **Gerir Tokens**. A partir daí, crie um novo token que corresponda ao nível de acesso necessário para as funcionalidades da sua aplicação.

Para criar um novo token de API, siga os seguintes passos:

1. Selecione os âmbitos necessários.
2. Forneça um nome para o seu token.
3. Clique em **Criar**

Em alternativa, pode criar um token de API através da chamada à API <a href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a>.

:::caution
Precisa de um token com o âmbito `Admin` para criar uma aplicação.
:::

## Como criar uma aplicação Deriv

Para criar a sua aplicação com as opções de configuração adequadas, seleccione o separador **Registar aplicação** no Painel de controlo. Pode fazer alterações à configuração da sua aplicação em qualquer altura no separador **Gerir aplicações**.

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
4. Preencha os campos **Marcação** e **Detalhes de autenticação**.
5. Seleccione os **âmbitos de autorização** necessários para a sua aplicação.
6. Clique em **Registar candidatura**.

Certifique-se de que os URLs de **Autorização** e **Verificação** estão correctos com base na sua implementação.

Por exemplo, se o seu domínio for **`https://example.com`** e a sua **autorização e autenticação forem tratadas por** `verify`, os seus URLs serão:

**`https://example.com/verify`**
