---
title: Open authorisation
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - conceito
  - ganhar
  - ganho
  - comissão
  - margem
keywords:
  - conceito
  - ganhar
  - ganho
  - comissão
  - margem
description: Learn about OAuth authorisation, logging in without an API token, and how you can use it to improve the user experience of your trading app.
---

## O que é OAuth2?

OAuth significa "Open Authorisation" (Autorização Aberta) — um protocolo que permite a um cliente aceder aos recursos de um utilizador num servidor sem revelar as credenciais de início de sessão do utilizador.

Este tipo de autorização permite aos clientes iniciar sessão em aplicações de terceiros através das suas contas Deriv sem criar um token de API. Neste caso, a aplicação de terceiros não vê a palavra-passe do utilizador ou o token permanente da API, o que a torna mais segura.

A autenticação OAuth2 requer mais passos de configuração, mas é a forma mais segura de os programadores concederem acesso à sua aplicação para os clientes.

For more information on OAuth2, [see this guide](https://aaronparecki.com/oauth-2-simplified/).

### Como utilizar a autorização OAuth

1. Specify the URL that will be used as the **OAuth Redirect URL** on the app registration page in the **Website URL field**.

2. Add a login button on your website or app and direct users to `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` where your_app_id is the ID of your app.

3. Once a user signs up, they will be redirected to the URL that you entered as the **Redirect URL**. This URL will have arguments added to it with the user's session tokens, and will look similar to: `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. Nos parâmetros do URL, irá encontrar todas as contas e o token de sessão para cada conta. Passe esses tokens para a chamada à API Authorize para executar ações em nome da conta.
