---
title: Create a Deriv application
sidebar_label: Configuración de una aplicación Deriv
sidebar_position: 7
sidebar_class_name: hide-sidebar-item
tags:
  - intro
  - aplicación
  - configuración
keywords:
  - intro
  - aplicación
  - configuración
description: A step-by-step guide on creating your Deriv API token and building your trading application with the help of our trading API. Conozca más.
---

#### Cuenta Deriv

If you don't have a Deriv account yet, you can easily create one by visiting our signup page or using the <a href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a> API call. Es completamente gratuito. Y si ya tiene una cuenta, por favor inicie sesión con los datos de su cuenta. Para evitar cualquier pérdida accidental de fondos durante las pruebas, le recomendamos que utilice su cuenta demo en lugar de una cuenta real.

Para ganar markup, obtenga una cuenta real Deriv para recibir sus ganancias mensuales. You can also create a real account using <a href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</a> or <a href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</a> API calls.

:::caution
To create Deriv applications, you'll need an API token with the Admin scope for the account you wish to use for your application.
:::

## Cómo crear un token de la API Deriv

To create your API token, simply go to the Dashboard and select the **Manage Tokens** tab. A partir de ahí, cree un nuevo token que coincida con el nivel de acceso necesario para las funciones de su aplicación.

Para crear un nuevo token de API, siga estos pasos:

1. Seleccione los alcances que necesite.
2. Proporcione un nombre para su token
3. Click **Create**

Alternatively, you can create an API token via the <a href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a> API call.

:::caution
You need a token with the `Admin` scope to create an application.
:::

## Cómo crear una aplicación de Deriv

To create your application with the appropriate configuration options, select the **Register Application** tab in the Dashboard. You can make changes to your application's configuration at anytime in the **Manage Applications** tab.

| Campo de información de la aplicación | Descripción                                                                                                                         |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Cuenta                                | La cuenta con la que desea crear la aplicación                                                                                      |
| Token API                             | El token de API con el que desea crear la aplicación                                                                                |
| Nombre de la aplicación               | Nombre de la aplicación                                                                                                             |
| Marcado                               | La comisión añadida al precio comercial para obtener ingresos adicionales                                                           |
| URL de autorización                   | La URL que permite a los clientes iniciar sesión en su aplicación utilizando sus cuentas Deriv sin un token de API. |
| URL de verificación                   | La URL de redirección de OAuth para la autorización OAuth                                                                           |

**Para crear una aplicación, siga estos pasos:**

1. Seleccione la cuenta con la que desea crear la aplicación.
2. Seleccione el token de API añadido a su cuenta ( debe tener el alcance de \`Admin\` ).
3. Proporcione un nombre para su aplicación.
4. Fill the **Markup** and **OAuth details** fields.
5. Select the **Authorisation Scopes** needed by your application.
6. Click **Register Application**.

Make sure the **Authorisation** and **Verification** URLs are correct based on your implementation.

For example, if your domain is **`https://example.com`** and your **authorisation and authentication are handled by** `verify`, your URLs will be:

**`https://example.com/verify`**
