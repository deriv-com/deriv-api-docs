---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - concept
  - websocket
keywords:
  - trading app
  - websocket protocol
  - websocket connections
description: Learn about WebSocket protocol and WebSocket connections, and how to integrate them so you can enable data exchanges on your trading app.
---

## What are WebSockets?

The `WebSocket` protocol, described in the specification [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455), provides a way to exchange data between the browser and the server via a persistent connection. The data can be passed in both directions as “packets” without breaking the connection or needing additional HTTP requests.

WebSocket is especially great for services that require continuous data exchange, e.g. real-time trading systems and so on.

## A simple example

To open a WebSocket connection, we need to create `new WebSocket` using the special protocol `ws`or `wss` in the url. Here is how you can do that in `JavaScript`:

```js
let socket = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

On the other hand, the `ws://` data is not encrypted and can be visible to intermediaries. Old proxy servers may encounter "strange" headers and terminate the connection.

`wss://` stands for WebSocket over TLS, similar to how HTTPS is HTTP over TLS. With the transport security layer, data is encrypted by the sender and decrypted by the receiver. This means that encrypted data packets can successfully pass through proxies without being inspected.
:::

Once the socket is created, we should listen to events on it. There are 4 events altogether:

- Open – Connection established
- Message – Data received
- Error – WebSocket error
- Close – Connection closed

Sending a message can be done via socket.send(data).

Here’s an example in `JavaScript`:

```js showLineNumbers
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const socket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

socket.onopen = function (e) {
  console.log('[open] Connection established');
  console.log('Sending to server');
  const sendMessage = JSON.stringify({ ping: 1 });
  socket.send(sendMessage);
};

socket.onmessage = function (event) {
  console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    consloe.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};
```

## Why do we need WebSockets and when should we avoid them?

WebSockets are an essential client-server communication tool. To benefit the most from their potential, it's important to understand how they can be helpful and when it's best to avoid using them. It’s explained extensively in the next section.

Use WebSockets in the following cases:

1. ‍When you're developing a real-time web application.
   The most customary use of WebSocket is in real-time application development wherein it assists in a continual display of data at the client end. As the back-end server sends back this data continuously, a WebSocket allows uninterrupted pushing or transmitting of this data in the already open connection. The use of WebSockets makes such data transmission quick and leverages the application's performance.
2. For trading websites, such as Deriv.
   Here, WebSocket assists in data handling that is impelled by the deployed back-end server to the client.
3. ‍When creating a chat application.
   Chat application developers call out WebSockets for help in operations like a one-time exchange and publishing/broadcasting messages. As the same WebSocket connection is used for sending/receiving messages, communication becomes easy and quick.

Now that we've established where WebSockets should be used, let's see where it is best to avoid them. This will help you steer clear of unnecessary operational hassles.

WebSockets shouldn't be taken onboard when all that is needed is fetching old data or data that's to be processed only once. In these cases, using HTTP protocols is a wise choice.

## WebSocket vs HTTP

As both HTTP and WebSocket protocols are employed for application communication, people often get confused and find it difficult to pick one.

As told previously, WebSocket is a framed and bidirectional protocol. On the other hand, HTTP is a unidirectional protocol functioning above the TCP protocol.

As the WebSocket protocol is capable of supporting continual data transmission, it’s majorly used in real-time application development. HTTP is stateless and is used for the development of [RESTful](https://de.wikipedia.org/wiki/Representational_State_Transfer) and [SOAP](https://de.wikipedia.org/wiki/SOAP) applications. SOAP can still use HTTP for implementation, but REST is widely spread and used.

In WebSocket, communication occurs at both ends, which makes it a faster protocol. In HTTP, the connection is built at one end, making it a bit more sluggish than WebSocket.

WebSocket uses a unified TCP connection and needs one party to terminate the connection. Until it happens, the connection remains active. HTTP needs to build a distinct connection for separate requests. Once the request is completed, the connection breaks automatically.

## How are WebSocket connections established?

The process starts with a WebSocket handshake that involves using a new scheme (ws or wss). To help you understand, consider them equivalent to HTTP and secure HTTP (HTTPS) respectively.

Using this scheme, servers and clients are expected to follow the standard WebSocket connection protocol. The WebSocket connection establishment begins with a HTTP request upgrading that features a couple of headers such as Connection: Upgrade, Upgrade: WebSocket, Sec-WebSocket- Key, and so on.

Here is how this connection is established:

1. **The Request :** The Connection Upgrade header denotes the WebSocket handshake while the Sec-WebSocket-Key features Base64-encoded random value. This value is arbitrarily generated during every WebSocket handshake. Besides the above, the key header is also a part of this request.

The above-listed headers, when combined, form an HTTP GET request. It will have similar data in it:

```
GET ws://websocketexample.com:8181/ HTTP/1.1
Host: localhost:8181
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: b6gjhT32u488lpuRwKaOWs==
```

To clarify Sec-WebSocket-Version, one can explain the WebSocket protocol version ready to use for the client.

2. **The Response:** The response header, Sec-WebSocket-Accept, features the rest of value submitted in the Sec-WebSocket-Key request header. This is connected with a particular protocol specification and is used widely to keep misleading information at bay. In other words, it enhances the API security and stops ill-configured servers from creating blunders in the application development.

On the success of the previously-sent request, a response similar to the below-mentioned text sequence will be received:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## References

- **[WebSockets APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)**
- **[WebSocket - Javascript Info](https://javascript.info/websocket)**
