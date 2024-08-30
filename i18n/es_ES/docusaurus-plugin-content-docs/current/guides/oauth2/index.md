---
title: Autorización abierta
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - concepto
  - ganando
  - gane
  - comisión
  - marcado
keywords:
  - concepto
  - gane
  - ganando
  - comisión
  - marcado
description: Obtenga información sobre la autorización OAuth, el inicio de sesión sin un token de API y cómo puede utilizarla para mejorar la experiencia de usuario de su aplicación de negociación.
---

## ¿Qué es OAuth2?

OAuth son las siglas de Open Authorization, un protocolo que permite a un cliente acceder a los recursos de un usuario en un servidor sin revelar las credenciales de inicio de sesión del usuario.

Este tipo de autorización permite a los clientes iniciar sesión en aplicaciones de terceros con sus cuentas de Deriv sin crear un Token API. En este caso, la aplicación de terceros no ve la contraseña del usuario ni el Token API permanente, lo que la hace más segura.

La autenticación OAuth2 requiere más pasos de configuración, pero es la forma más segura para que los desarrolladores concedan acceso de sus aplicaciones a los clientes.

Para más información sobre OAuth2, [consulte esta guía](https://aaronparecki.com/oauth-2-simplified/).

### Cómo usar la autorización de OAuth

1. Especifique la URL que se utilizará como la **URL de redireccionamiento de OAuth** en la página de registro de la aplicación en el campo **URL del sitio web**.

2. Añada un botón de inicio de sesión en su sitio web o aplicación y dirija a los usuarios a `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` donde your_app_id es el ID de su aplicación.

3. Una vez que el usuario se registre, será redirigido a la URL que usted ha ingresado como la **URL de redireccionamiento**. A esta URL se le añadirán argumentos con los tokens de sesión del usuario, y tendrá un aspecto similar al siguiente `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. En los parámetros de la URL, verá todas las cuentas y el token de sesión de cada cuenta. Debe pasar estos tokens a la llamada API de autorización para realizar acciones en nombre de la cuenta.
