---
title: OAuth - Open authorisation (autorização aberta)
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
description: Saiba mais sobre a autorização OAuth, o início de sessão sem um token de API e como pode utilizá-lo para melhorar a experiência do utilizador na sua aplicação de negociação.
---

## O que é o OAuth2?

OAuth, que significa "Open Authorisation" (Autorização Aberta), é um protocolo que permite que um cliente aceda a recursos de um utilizador num servidor sem revelar as credenciais de início de sessão do utilizador.

Este tipo de autorização permite aos clientes iniciar sessão em aplicações de terceiros através das suas contas Deriv sem a necessidade de criar um token de API. Desta forma, a aplicação de terceiros não tem acesso à palavra-passe do utilizador nem a um token de API permanente, aumentando a segurança.

A autenticação OAuth2 requer mais passos de configuração, mas é a forma mais segura de os programadores permitirem que os clientes acedam à sua aplicação.

Para mais informações sobre OAuth2, [consulte este guia](https://aaronparecki.com/oauth-2-simplified/).

### Como utilizar a autorização OAuth

1. Especifique o URL que será utilizado como o **URL de autorização OAuth** na página de registo da aplicação no campo **URL do site**.

2. Adicione um botão de início de sessão no seu site ou aplicação e direcione os utilizadores para `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` onde "your_app_id" é o ID da sua aplicação.

3. Quando o utilizador se registar, será redirecionado para o URL que introduziu como **URL de autorização**. Este URL terá argumentos adicionados com os tokens de sessão do utilizador e será semelhante a: `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. Nos parâmetros do URL, irá encontrar todas as contas e o token de sessão para cada conta. Passe esses tokens para a chamada à API "Autorizar" para executar ações em nome da conta.
