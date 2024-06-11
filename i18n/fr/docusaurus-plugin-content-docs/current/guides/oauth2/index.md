---
title: Autorisation ouverte
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
description: Découvrez l'autorisation OAuth, la connexion sans jeton API, et comment vous pouvez l'utiliser pour améliorer l'expérience utilisateur de votre application de trading.
---

## Qu'est-ce que OAuth2 ?

OAuth signifie Open Authorization, un protocole qui permet à un client d'accéder aux ressources d'un utilisateur sur un serveur sans révéler ses identifiants de connexion.

Ce type d'autorisation permet aux clients de se connecter à des applications tierces à l'aide de leurs comptes Deriv sans créer de jeton API. Dans ce cas, l'application tierce n'accède pas au mot de passe ou au jeton API permanent de l'utilisateur, ce qui la rend plus sûre.

L'authentification OAuth2 nécessite des étapes de configuration supplémentaires, mais c'est le moyen le plus sûr pour les développeurs d'autoriser l'accès à leur application aux clients.

Pour plus d'informations sur OAuth2, [voir ce guide] (https://aaronparecki.com/oauth-2-simplified/).

### Comment utiliser l'autorisation OAuth

1. Spécifiez l'URL qui sera utilisée comme **OAuth Redirect URL** sur la page d'enregistrement de l'application dans le champ **Website URL**.

2. Ajoutez un bouton de connexion sur votre site web ou votre application et dirigez les utilisateurs vers `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` où your_app_id est l'ID de votre application.

3. Une fois qu'un utilisateur s'est inscrit, il est redirigé vers l'URL que vous avez saisie comme **Redirect URL**. Des arguments seront ajoutés à cette URL avec les jetons de session de l'utilisateur et ressembleront à ce qui suit : `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. Dans les paramètres de l'URL, vous verrez tous les comptes et le jeton de session de chaque compte. Passez ces jetons à l'appel d'API Authorize afin d'effectuer des actions au nom du compte.
