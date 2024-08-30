---
title: Criar uma aplicação Deriv
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
description: Um guia passo a passo sobre como criar o seu token Deriv API e construir a sua aplicação de negociação com a ajuda da nossa API de negociação. Saiba mais.
---

```mdx-code-block
import Link from '@docusaurus/Link';
```

#### Conta Deriv

Se ainda não tem uma conta Deriv, pode criar uma visitando a nossa página de registo ou através da chamada à API <Link href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</Link>. É totalmente gratuita. Caso já tenha uma conta, por favor inicie sessão com os seus dados. Para evitar qualquer perda acidental de fundos durante a fase de teste, recomendamos que utilize a sua conta demo em vez da conta real.

Para obter uma margem, crie uma conta real na Deriv para receber os seus ganhos mensais. Também pode criar uma conta real através das chamadas à API <Link href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</Link> ou <Link href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</Link>.

:::caution
Para criar aplicações Deriv, necessitará de um token de API com o nívvel de acesso Admin da conta que pretende utilizar na sua aplicação.
:::

## Como criar um token de API

Para criar o seu token API, aceda ao Painel de controlo e selecione o separador **Gerir Tokens**. A partir daí, crie um novo token que corresponda ao nível de acesso necessário para as funcionalidades da sua aplicação.

Para criar um novo token de API, siga os seguintes passos:

1. Selecione os níveis necessários.
2. Atribua um nome ao seu token.
3. Clique em **Criar**

Em alternativa, pode criar um token API através da chamada à API <Link href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</Link>.

:::caution
Para criar uma aplicação, é necessário um token com o nível de acesso Admin.
:::

## Como criar uma aplicação Deriv

Para criar a sua aplicação com as opções de configuração adequadas, selecione o separador **Registar Aplicação** no Painel de controlo. Pode efetuar alterações à configuração da sua aplicação a qualquer momento no separador **Gerir Aplicações**.

| Campo de informação da app | Descrição                                                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Conta                      | A conta com a qual pretende criar a aplicação                                                                                                                                                                            |
| Token de API               | O token da API com que pretende criar a aplicação                                                                                                                                                                        |
| Nome da app                | O nome da aplicação                                                                                                                                                                                                      |
| Margem                     | A comissão adicionada ao preço da negociação para obter rendimentos adicionais                                                                                                                                           |
| URL de redirecionamento    | O URL que permite aos clientes iniciar sessão na sua aplicação através das suas contas Deriv sem necessitar de um token de API                                                                                           |
| URL de verificação         | Utilizado para a verificação do e-mail. Se for fornecido, o URL com o token de verificação é enviado para o e-mail do utilizador; caso contrário, é utilizado o URL de redirecionamento. |

**Para criar uma aplicação, siga os seguintes passos:**

1. Selecione a conta com a qual pretende criar a aplicação.
2. Selecione o token de API adicionado à sua conta (deve conter o nível de acesso \`Admin\`).
3. Forneça um nome para a sua aplicação.
4. Preencha os campos **Margem** e **Dados de autenticação**.
5. Seleccione os **nível de acessos de autorização** necessários para a sua aplicação.
6. Clique em **Registar Aplicação**.

Certifique-se de que os URLs de **Redirecionamento** e **Verificação** estão corretos de acordo com a sua implementação.

Por exemplo, se o seu domínio for **`https://example.com`** e a sua **autorização e autenticação forem tratadas por** `verify`, os seus URLs serão:

**`https://example.com/verify`**
