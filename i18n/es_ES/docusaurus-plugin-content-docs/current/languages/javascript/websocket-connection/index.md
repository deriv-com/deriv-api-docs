---
title: Configurar una conexión WebSocket
sidebar_label: Conexión WebSocket
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - conexión websocket
description: Una guía sobre cómo configurar una conexión WebSocket a una API WebSocket en su aplicación de comercio.
---

:::caution

Si no está familiarizado con WebSockets, consulte [nuestra documentación](/docs/core-concepts/websocket).

:::

### Configurar una conexión WebSocket

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

A continuación, crearemos una conexión WebSocket a Deriv WebSocket Server como se muestra a continuación:

```js title="index.js" showLineNumbers
const app_id = 1089; // Sustitúyalo por su app_id o déjelo como 1089 para las pruebas.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
```

:::info
`app_id = 1089` es sólo a efectos de prueba. Actualícelo con su propio app_id cuando publique su aplicación en un entorno de producción. Consulte [esta guía](/docs/setting-up-a-deriv-application) para crear una nueva aplicación para usted.
:::

En este punto, estamos conectados al `WebSocket server`. Sin embargo, no recibimos ningún dato. Para enviar o recibir datos, tenemos que `suscribirnos` a <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">los eventos del websocket</a>.

Generalmente, tenemos 4 eventos en `WebSocket connections`:

- **cerrar**:
  Se dispara cuando se cierra una conexión con un WebSocket. También disponible a través de la propiedad onclose.
- **abrir**:
  Se dispara cuando se abre una conexión con un WebSocket. También disponible a través de la propiedad onopen.
- **mensaje**:
  Se dispara cuando se reciben datos a través de un WebSocket. También disponible a través de la propiedad onmessage.
- **error**:
  Se dispara cuando una conexión con un WebSocket se ha cerrado debido a un error, como cuando no se han podido enviar algunos datos. También está disponible mediante la propiedad onerror.

Vamos a añadir un detector de eventos para estos eventos en nuestra conexión WebSocket.

```js title="index.js" showLineNumbers
// suscribirse al evento `open`
websocket.addEventListener('open', (evento) => {
  console.log('conexión websocket establecida: ', evento);
});

// suscribirse al evento `message`
websocket.addEventListener('message', (evento) => {
  console.log('nuevo mensaje recibido del servidor: ', evento);
});

// suscribirse al evento `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```

Ahora, abra el archivo `index.html` en nuestro navegador y compruebe su consola de desarrollador. Debería ver sólo el registro de `Conexión WebSocket establecida`.

### Enviar y recibir datos

Nuestro servidor WebSocket proporciona la funcionalidad <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a>. Usémoslo en nuestro proyecto de demostración para enviar y recibir datos. Cambie los escuchadores de eventos para `open` y `message` como se indica a continuación:

:::caution
La función `send` en la conexión WebSocket, sólo recibe `string`, `ArrayBuffer`, `Blob`, `TypedArray` y `DataView`. Puede leer más sobre ellos en [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). Esto significa que, si queremos enviar un `objeto`, tenemos que encadenarlo primero con `JSON.stringify`.
:::

```js title="index.js" showLineNumbers
// suscribirse al evento `open`
websocket.addEventListener('open', (event) => {
  console.log('conexión websocket establecida: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// suscríbase al evento `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('nuevo mensaje recibido del servidor: ', receivedMessage);
});
```

El `receivedMessage` sería un objeto del tipo

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Felicidades :tada:

Acaba de crear su primer proyecto de demostración con WebSockets.

:::tip
La petición `ping` se utiliza sobre todo para probar la conexión o para mantenerla viva.
:::

### Mantenga viva la conexión WebSocket

Por defecto, las `conexiones WebSocket` se cerrarán cuando no se envíe tráfico entre ellas durante unos **180 segundos**. Una forma de mantener viva la conexión es enviar peticiones [ping](/api-explorer#ping) con intervalos de **120 segundos**. Esto mantendrá la conexión viva y activa.

Un ejemplo de configuración simple sería el siguiente:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // está en milisegundos, lo que equivale a 120 segundos
let interval;
websocket.addEventListener('open', (event) => {
  console.log('conexión websocket establecida: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // para mantener viva la conexión
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// suscribirse al evento `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});
```

Ahora, cuando la conexión está `establecida`, empezamos a enviar peticiones `ping` con intervalos de `12000ms`.

Su código final debería ser:

```js title="index.js" showLineNumbers
const app_id = 1089; // Sustitúyalo por su app_id o déjelo como 1089 para las pruebas.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // está en milisegundos, lo que equivale a 120 segundos
let interval;

// suscríbase al evento `open`
websocket.addEventListener('open', (event) => {
  console.log('conexión websocket establecida: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // para mantener viva la conexión
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// suscribirse al evento `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('nuevo mensaje recibido del servidor: ', receivedMessage);
});

// suscribirse al evento `close`
websocket.addEventListener('close', (event) => {
  console.log('conexión websocket cerrada: ', event);
  clearInterval(interval);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('ha ocurrido un error en nuestra conexión websocket', event);
});
```
