---
title: Autorização aberta
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
description: Saiba mais sobre a autorização OAuth, iniciando sessão sem um token de API, e como pode utilizá-la para melhorar a experiência do utilizador da sua aplicação de negociação.
---

## O que é OAuth2?

OAuth significa "Open Authorisation" (Autorização Aberta) — um protocolo que permite a um cliente aceder aos recursos de um utilizador num servidor sem revelar as credenciais de início de sessão do utilizador.

Este tipo de autorização permite aos clientes iniciar sessão em aplicações de terceiros através das suas contas Deriv sem criar um token de API. Neste caso, a aplicação de terceiros não vê a palavra-passe do utilizador ou o token permanente da API, o que a torna mais segura.

A autenticação OAuth2 requer mais passos de configuração, mas é a forma mais segura de os programadores concederem acesso à sua aplicação para os clientes.

Para obter mais informações sobre o OAuth2, [consulte este guia] (https://aaronparecki.com/oauth-2-simplified/).

### Como utilizar a autorização OAuth

1. Especifique o URL que será utilizado como **OAuth Redirect URL** na página de registo da aplicação no campo **Website URL**.

2. Adicione um botão de início de sessão no seu sítio Web ou aplicação e direccione os utilizadores para `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` onde your_app_id é o ID da sua aplicação.

3. Quando um utilizador se inscrever, será redireccionado para o URL que introduziu como **Redirect URL**. Este URL terá argumentos adicionados com os tokens de sessão do utilizador e será semelhante a: `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. Nos parâmetros do URL, irá encontrar todas as contas e o token de sessão para cada conta. Passe esses tokens para a chamada à API Authorize para executar ações em nome da conta.
