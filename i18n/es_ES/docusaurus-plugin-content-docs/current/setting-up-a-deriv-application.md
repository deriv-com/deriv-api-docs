---
title: Crear una aplicación de Deriv
sidebar_label: Configuración de una aplicación de Deriv
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
description: Una guía paso a paso para crear su token API Deriv y construir su aplicación de trading con la ayuda de nuestra API de trading. Conozca más.
---

```mdx-code-block
import Link from '@docusaurus/Link';
```

#### Cuenta Deriv

Si aún no tiene una cuenta Deriv, puede crear una fácilmente visitando nuestra página de registro o utilizando la llamada a la API <a href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a>. Es completamente gratuito. Y si ya tiene una cuenta, por favor inicie sesión con los datos de su cuenta. Para evitar cualquier pérdida accidental de fondos durante las pruebas, le recomendamos que utilice su cuenta demo en lugar de una cuenta real.

Para ganar markup, obtenga una cuenta real de Deriv para recibir sus ganancias mensuales. También puede crear una cuenta real mediante las llamadas a la API <a href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</a> o <a href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</a>.

:::caution
Para crear aplicaciones Deriv, necesitará un token de API con el alcance de Admin de la cuenta que desee utilizar para su aplicación.
:::

## Cómo crear un token de la API Deriv

Para crear su token de API, sólo tiene que ir al Panel de control y seleccionar la pestaña **Gestionar tokens**. A partir de ahí, cree un nuevo token que coincida con el nivel de acceso necesario para las funciones de su aplicación.

Para crear un nuevo token de API, siga estos pasos:

1. Seleccione los alcances que necesite.
2. Proporcione un nombre para su token
3. Pulse **Crear**.

Alternativamente, puede crear un token de API a través de la llamada a la API <a href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a>.

:::caution
Necesita un token con el alcance de `Admin` para crear una aplicación.
:::

## Cómo crear una aplicación de Deriv

Para crear su aplicación con las opciones de configuración adecuadas, seleccione la pestaña **Registrar aplicación** en el Panel de control. Puede realizar cambios en la configuración de su aplicación en cualquier momento en la pestaña **Gestionar aplicaciones**.

| Campo de información de la aplicación | Descripción                                                                                                                                                                                                                                   |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cuenta                                | La cuenta con la que desea crear la aplicación                                                                                                                                                                                                |
| Token API                             | El token de API con el que desea crear la aplicación                                                                                                                                                                                          |
| Nombre de la aplicación               | Nombre de la aplicación                                                                                                                                                                                                                       |
| Recargo                               | La comisión añadida al precio de la operación para obtener ingresos adicionales                                                                                                                                                               |
| URL de Redirección                    | La URL que permite a los clientes iniciar sesión en su aplicación utilizando sus cuentas Deriv sin un token de API.                                                                                                           |
| URL de verificación                   | Se utiliza para la verificación del correo electrónico. Si se proporciona, la URL con el token de verificación se envía al correo electrónico del usuario; de lo contrario, se utiliza la URL de redirección. |

**Para crear una aplicación, siga estos pasos:**

1. Seleccione la cuenta con la que desea crear la aplicación.
2. Seleccione el token de API añadido a su cuenta ( debe tener el alcance de \`Admin\` ).
3. Proporcione un nombre para su aplicación.
4. Rellene los campos **Marcado** y **Detalles de autenticación**.
5. Seleccione los **alcances de autorización** necesarios para su aplicación.
6. Haga clic en **Registrar solicitud**.

Asegúrese de que las URL de **Redirección** y **Verificación** son correctas en función de su implementación.

Por ejemplo, si su dominio es **`https://example.com`** y su **autorización y autenticación son gestionadas por** `verify`, sus URL serán:

**`https://example.com/verify`**
