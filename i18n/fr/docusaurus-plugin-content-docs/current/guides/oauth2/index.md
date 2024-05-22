---
title: Open authorisation
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - concept
  - gagner
  - gain
  - commission
  - majoration
keywords:
  - concept
  - gagner
  - gain
  - commission
  - majoration
description: Learn about OAuth authorisation, logging in without an API token, and how you can use it to improve the user experience of your trading app.
---

## Qu'est-ce que OAuth2 ?

OAuth signifie Open Authorization, un protocole qui permet à un client d'accéder aux ressources d'un utilisateur sur un serveur sans révéler ses identifiants de connexion.

Ce type d'autorisation permet aux clients de se connecter à des applications tierces à l'aide de leurs comptes Deriv sans créer de jeton API. Dans ce cas, l'application tierce n'accède pas au mot de passe ou au jeton API permanent de l'utilisateur, ce qui la rend plus sûre.

L'authentification OAuth2 nécessite des étapes de configuration supplémentaires, mais c'est le moyen le plus sûr pour les développeurs d'autoriser l'accès à leur application aux clients.

For more information on OAuth2, [see this guide](https://aaronparecki.com/oauth-2-simplified/).

### Comment utiliser l'autorisation OAuth

1. Specify the URL that will be used as the **OAuth Redirect URL** on the app registration page in the **Website URL field**.

2. Add a login button on your website or app and direct users to `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` where your_app_id is the ID of your app.

3. Once a user signs up, they will be redirected to the URL that you entered as the **Redirect URL**. This URL will have arguments added to it with the user's session tokens, and will look similar to: `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. Dans les paramètres de l'URL, vous verrez tous les comptes et le jeton de session de chaque compte. Passez ces jetons à l'appel d'API Authorize afin d'effectuer des actions au nom du compte.
