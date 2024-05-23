---
title: Setup a WebSocket connection
sidebar_label: WebSocket connection
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - websocket-connection
description: A guide on how to set up a WebSocket connection to a WebSocket API on your trading app.
---

:::caution

If you're not familiar with WebSockets, please check out [our documentation](/docs/core-concepts/websocket).

:::

### Set up a WebSocket connection

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

Next, we'll create a WebSocket connection to Deriv WebSocket Server as seen below:

```js title="index.js" showLineNumbers
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
```

:::info
`app_id = 1089` is just for testing purposes. Please update it with your own app_id when releasing your application on a production environment. Please check [this guide](/docs/setting-up-a-deriv-application) to create a new app for yourself.
:::

At this point, we are connected to the `WebSocket server`. But, we do not receive any data. To send or receive data, we have to `subscribe` to <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">websocket events</a>.

Generally, we have 4 events on `WebSocket connections`:

- **close**:
  Fired when a connection with a WebSocket is closed. Also available via the onclose property.
- **open**:
  Fired when a connection with a WebSocket is opened. Also available via the onopen property.
- **message**:
  Fired when data is received through a WebSocket. Also available via the onmessage property.
- **error**:
  Fired when a connection with a WebSocket has been closed because of an error, such as when some data couldn't be sent. Also available via the onerror property.

Let's add an event listener for these events on our WebSocket connection.

```js title="index.js" showLineNumbers
// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  console.log('new message received from server: ', event);
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```

Now, open the `index.html` file in our browser and check your developer console. You should see only the log for `WebSocket connection established`.

### Send and receive data

Our WebSocket server provides <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a> functionality. Let's use it in our demo project to send and receive data. Change the event listeners for `open` and `message` as below:

:::caution
The `send` function on the WebSocket connection, only receives `string`, `ArrayBuffer`, `Blob`, `TypedArray` and `DataView`. You can read more about them on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). This means, if we want to send an `object`, we have to stringify it with `JSON.stringify` first.
:::

```js title="index.js" showLineNumbers
// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});
```

The `receivedMessage` would be an object like so:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Congratulations :tada:

You just created your first demo project with WebSockets.

:::tip
The `ping` request is mostly used to test the connection or to keep it alive.
:::

### Keep WebSocket connection alive

By default, `WebSocket connections` will be closed when no traffic is sent between them for around **180 seconds**. One way to keep the connection alive is to send [ping](/api-explorer#ping) requests with intervals of **120 seconds**. This will keep the connection alive and active.

A simple setup example would be the following:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // it's in milliseconds, which equals to 120 seconds
let interval;
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // to Keep the connection alive
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});
```

Now, when the connection is `established`, we start sending `ping` requests with `12000ms` intervals.

Your final code should be:

```js title="index.js" showLineNumbers
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // it's in milliseconds, which equals to 120 seconds
let interval;

// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // to Keep the connection alive
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```
