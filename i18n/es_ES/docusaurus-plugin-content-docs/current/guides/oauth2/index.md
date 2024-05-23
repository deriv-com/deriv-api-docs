---
title: Open authorisation
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - concepto
  - gane
  - ganando
  - comisión
  - marcado
keywords:
  - concepto
  - gane
  - ganando
  - comisión
  - marcado
description: Learn about OAuth authorisation, logging in without an API token, and how you can use it to improve the user experience of your trading app.
---

## ¿Qué es OAuth2?

OAuth son las siglas de Open Authorization, un protocolo que permite a un cliente acceder a los recursos de un usuario en un servidor sin revelar las credenciales de inicio de sesión del usuario.

Este tipo de autorización permite a los clientes iniciar sesión en aplicaciones de terceros con sus cuentas de Deriv sin crear un Token API. En este caso, la aplicación de terceros no ve la contraseña del usuario ni el Token API permanente, lo que la hace más segura.

La autenticación OAuth2 requiere más pasos de configuración, pero es la forma más segura para que los desarrolladores concedan acceso de sus aplicaciones a los clientes.

For more information on OAuth2, [see this guide](https://aaronparecki.com/oauth-2-simplified/).

### Cómo usar la autorización de OAuth

1. Specify the URL that will be used as the **OAuth Redirect URL** on the app registration page in the **Website URL field**.

2. Add a login button on your website or app and direct users to `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` where your_app_id is the ID of your app.

3. Once a user signs up, they will be redirected to the URL that you entered as the **Redirect URL**. This URL will have arguments added to it with the user's session tokens, and will look similar to: `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. En los parámetros de la URL, verá todas las cuentas y el token de sesión de cada cuenta. Debe pasar estos tokens a la llamada API de autorización para realizar acciones en nombre de la cuenta.
