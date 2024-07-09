---
title: Funciones de las llamadas a la API
hide_title: false
draft: false
sidebar_label: Funciones de las llamadas a la API
sidebar_position: 1
tags:
  - concepto
  - llamadas
  - anatomía
keywords:
  - aplicación de comercio
  - llamadas api
  - ejemplo de api
description: Establezca llamadas API para su aplicación de negociación utilizando la función de llamada API. Con ejemplos de API, aprenda a suscribirse, enviar solicitudes y obtener datos de respuesta.
---

## Suscríbete y envía

Todas las llamadas API tienen una funcionalidad de envío para realizar una solicitud y recibir una respuesta. Algunas llamadas API también ofrecen una funcionalidad de suscripción que permite enviar actualizaciones a su aplicación cuando haya nueva información disponible.

### Suscribirse

Varias llamadas a la API proporcionan la funcionalidad `subscribe`. Cuando se suscribe a una llamada API, recibirá un flujo continuo de los datos de esa llamada API en particular.

Algunas de estas llamadas a la API se suscriben automáticamente (por ejemplo, [ticks](/api-explorer#ticks)) y otras tienen un campo `subscribe` opcional. Si pasa `1` al campo `subscribe`, se iniciará la suscripción y el servidor seguirá enviando los datos solicitados hasta que cancele la suscripción llamando a las llamadas a la API `Forget` u `Forget all`.

Por ejemplo, puede llamar a [Historial de ticks](/api-explorer#ticks_history) para recibir los datos del historial de ticks. Pero si añade la opción `subscribe` a esta llamada, recibirá los datos del historial de ticks que solicitó en la primera respuesta, y seguirá recibiendo una nueva respuesta cada vez que haya un nuevo tick publicado por el servidor para el símbolo dado.

En el flujo de mensajes de `subscribe`, hay un campo llamado `subscription`. Este es el `ID del flujo`. Con este ID, puede identificar el flujo de mensajes en su lógica y detener el flujo con las llamadas a la API `Forget` y `Forget All`.

Los datos proporcionados por las llamadas a la API con la funcionalidad `subscribe` pueden utilizarse como fuente de datos para otras llamadas y funciones de la API.

### Enviar

Si llama a la API con la función `enviar`, el servidor sólo le devolverá los datos solicitados una vez. Para obtener datos actualizados, debe volver a enviar la llamada API. Normalmente, este método se utiliza cuando se obtienen otras respuestas de llamadas a la API o eventos de interfaz de usuario como `Click`, `Scroll`, etc.

### Olvidar

Si desea detener el flujo de mensajes creado por `subscribe`, tendrá que realizar la llamada a la API `Forget` con el `Stream ID` correcto. De lo contrario, puede utilizar la llamada a la API `Olvidar todo` para detener los flujos por su `nombre de método`.

:::caution
Para más información sobre la llamada a la API `Forget`, eche un vistazo a [Forget](/api-explorer#forget) y [Forget All](/api-explorer#forget_all) en el explorador de API.
:::

## Solicitar datos

Para facilitarle la gestión del flujo de solicitudes y respuestas de su conexión de WebSocket, cada llamada API de Deriv WebSocket sigue una estructura estandarizada. Puede usarlo para el almacenamiento en caché, la validación, además de la sincronización de solicitudes y respuestas.

#### Nombre del método de llamada API

Cada `petición` en la API WebSocket incluye un campo `nombre de método` que sirve como identificador único para la petición. En la mayoría de los casos, este `nombre de método` obtendrá un valor numérico de `1`. Sin embargo, hay algunos casos en los que la propiedad del identificador puede tener un valor de cadena.

:::caution
El nombre del método de llamada a la API es siempre obligatorio. este campo determina los datos que obtendrá de nuestro servidor WebSocket.
:::

### Campos obligatorios

Los datos de cada solicitud tienen campos obligatorios que debe proporcionar, también pueden incluir campos opcionales. Exploremos esto con un ejemplo de `Residence List`.

Una llamada a la `Lista de residencia` devuelve una lista de países y códigos de país de 2 letras, adecuada para rellenar el formulario de apertura de cuenta.

Los datos de solicitud para esta llamada son los siguientes:

```ts showLineNumbers
{
  residence_list: 1; // Api Call Method Name
  passthrough?: object; // Optional
  req_id?: number; // Optional
}
```

El campo `residence_list` es el `nombre del método` para la llamada y es obligatorio. Es posible que haya otros campos obligatorios relacionados con este tipo de solicitud que desee enviar. Para saber más sobre `Residence List` y otras llamadas a la API, consúltelas en [API Explorer](/api-explorer#residence_list).

### Campos opcionales

Cada llamada tiene también varios campos `Opcionales`. `Passthrough` y `req_id` siempre forman parte de los datos de la solicitud, pero puede optar por no utilizarlos.

#### El campo \\\\\\`passthrough

Lo que pase a este campo le será devuelto dentro de un objeto `response`. Esto puede ser útil cuando necesite simular un flujo con estado para sus `solicitudes` y `respuestas`.

#### El campo \\\\\`req_id

Puede que necesite `etiquetar` sus peticiones y pasarlas a través de nuestras llamadas `WebSocket`. Puede hacerlo pasando un `número` a este campo. Puede ser útil cuando necesite asignar `solicitudes` a `respuestas`.

:::caution
Para conocer los campos opcionales adicionales específicos de cada llamada a la API, consulte nuestro [API Explorer](/api-explorer).
:::

## Datos de respuesta

Cuando obtenga la respuesta de la llamada, habrá un `Campo` con el mismo nombre que el `nombre del método`, que contiene los datos reales.

La respuesta para la llamada a la `Lista de Residentes`:

```js showLineNumbers
{
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  residence_list: [
       {
            "identidad": {
                "servicios": {
                    "idv": {
                        "documentos_apoyados": {},
                        "has_visual_sample": 0,
                        "is_country_supported": 0
                    },
                    "onfido": {
                        "documentos_apoyados": {
                            "permiso_de_conduccion": {
                                "display_name": "Permiso de conducir"
                            }
                        },
                        "is_country_supported": 0
                    }
                }
            },
            "phone_idd": "35818",
            "text": "Islas Aland",
            "value": "ax"
        },
        {
            "identity": {
                "servicios": {
                    "idv": {
                        "documentos_soportados": {},
                        "has_visual_sample": 0,
                        "is_country_supported": 0
                    },
                    "onfido": {
                        "documentos_apoyados": {
                            "permiso_de_conduccion": {
                                "display_name": "Permiso_de_conducción"
                            },
                            "documento_nacional_de_identidad": {
                                "display_name": "Documento nacional de identidad"
                            },
                            "pasaporte": {
                                "display_name": "Pasaporte"
                            }
                        },
                        "is_country_supported": 1
                    }
                }
            },
            "phone_idd": "355",
            "text": "Albania",
            "tin_format": [
                "^[A-Ta-t0-9]\\\d{8}[A-Wa-w]$"
            ],
            "valor": "al"
        },
        // ....
  ],
};
```

Aquí `residence_list` es el `method name`, y contiene los datos reales que ha solicitado. Para resumir, no hemos incluido el resto de la matriz. Puede comprobar la respuesta real [aquí](/api-explorer#residence_list).

#### El campo \\\\\\`echo_req

Este `Campo` contiene los `Datos de Solicitud` exactos que usted envió al servidor.

#### El campo \\\\\\`msg_type

Este `Campo` le ayuda a determinar qué datos de `mensaje` está recibiendo en el evento de mensaje de la conexión WebSocket. Por ejemplo, su manejador de eventos `onmessage` para su conexión WebSocket en `JavaScript` sería:

```js showLineNumbers
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);

  switch (receivedMessage.msg_type) {
    case "residence_list":
      console.log("La lista de residencia es : ",receivedMessage.residence_list)
      break;
    case "other_request_identifier"
      console.log("la respuesta", receivedMessage.some_other_request_identifier)
    default:
      console.log("receivedMessage", receivedMessage)
      break;
  }
}
```

#### El campo \`req_id

Es el `Opcional` que se pasa a la `Request Data`, puede utilizarlo para `validación`, `sincronización`, `caching`, etc.

:::tip
El `msg_type` siempre está presente en los datos de respuesta.
:::
