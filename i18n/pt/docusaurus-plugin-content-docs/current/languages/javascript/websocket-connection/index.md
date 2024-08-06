---
title: Configurar uma ligação WebSocket
sidebar_label: Ligação WebSocket
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - websocket-connection
description: Um guia sobre como configurar uma ligação WebSocket a uma API WebSocket na sua aplicação de negociação.
---

:::caution

Se não estiver familiarizado com os WebSockets, por favor consulte a [nossa documentação](/docs/core-concepts/websocket).

:::

### Configurar uma ligação WebSocket

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

Vamos agora criar uma ligação WebSocket para o servidor WebSocket da Deriv, conforme demonstrado abaixo:

```js title="index.js" showLineNumbers
const app_id = 1089; // Substitua pelo seu app_id ou deixe como 1089 para testes.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
```

:::info
O `app_id = 1089` é apenas para efeitos de teste. Por favor, atualize com o seu próprio app_id quando lançar a sua aplicação num ambiente de produção. Por favor, consulte [este guia](/docs/setting-up-a-deriv-application) para criar uma nova aplicação para si.
:::

Neste momento, estamos ligados ao `servidor WebSocket`. No entanto, ainda não estamos a receber dados. Para enviar ou receber dados, temos de "subscrever" aos <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">eventos websocket</a>.

Geralmente, temos 4 eventos em `Ligações WebSocket`:

- **fechado**:
  Disparado quando uma ligação com um WebSocket é fechada. Também disponível através da propriedade `onclose`.
- **aberto**:
  Disparado quando uma lgação com um WebSocket é aberta. Também disponível através da propriedade `onopen`.
- **mensagem**:
  Disparado quando os dados são recebidos através de um WebSocket. Também disponível através da propriedade `onmessage`.
- **erro**:
  Disparado quando uma ligação com um WebSocket foi fechada devido a um erro, como quando alguns dados não puderam ser enviados. Também disponível através da propriedade `onerror`.

Vamos adicionar um "event listener" para estes eventos na nossa ligação WebSocket:

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

Agora, abra o ficheiro `index.html` no nosso navegador e verifique o seu terminal de desenvolvimento. Deverá ver apenas o registo `Ligação WebSocket estabelecida`.

### Enviar e receber dados

O nosso servidor WebSocket disponibiliza a funcionalidade <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a>. Vamos utilizá-la no nosso projeto demo para enviar e receber dados. Altere os "event listeners" para `aberto` e `mensagem` conforme abaixo:

:::caution
A funcionalidade `enviar` na ligação WebSocket, recebe apenas `string`, `ArrayBuffer`, `Blob`, `TypedArray` e `DataView`. Pode ler mais sobre eles em [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). Isto significa que, se quisermos enviar um `objeto`, temos de o transformar em string com `JSON.stringify` primeiro.
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

O `receivedMessage` seria um objeto como este:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

Parabéns :tada:

Acabou de criar o seu primeiro projeto demo com WebSockets.

:::tip
O pedido `ping` é utilizado principalmente para testar a ligação ou para a manter ativa.
:::

### Manter a ligação WebSocket ativa

Por defeito, as ligações `WebSocket` serão fechadas se não houver tráfego entre elas durante cerca de **180 segundos**. Uma forma de manter a ligação ativa é enviar pedidos [ping](/api-explorer#ping) com intervalos de **120 segundos**. Esta ação irá garantir que a ligação permanece ativa.

Um exemplo de configuração simples seria o seguinte:

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

Agora, quando a ligação é `estabelecida`, começamos a enviar pedidos `ping` com intervalos de `12000ms`.

O seu código final deve ser:

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
