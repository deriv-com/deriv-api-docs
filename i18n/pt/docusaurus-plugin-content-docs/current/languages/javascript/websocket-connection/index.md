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

Se não estiver familiarizado com os WebSockets, consulte a [nossa documentação](/docs/core-concepts/websocket).

:::

### Configurar uma ligação WebSocket

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

Em seguida, vamos criar uma ligação WebSocket para o servidor WebSocket da Deriv, conforme demonstrado abaixo:

```js title="index.js" showLineNumbers
const app_id = 1089; // Substitua pelo seu app_id ou deixe como 1089 para teste.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
```

:::info
`app_id = 1089` é apenas para efeitos de teste. Por favor, atualize com o seu próprio app_id quando lançar a sua aplicação num ambiente de produção. Consulte [este guia] (/docs/setting-up-a-deriv-application) para criar uma nova aplicação para si.
:::

Neste ponto, estamos conectados ao servidor `WebSocket`. Mas não recebemos quaisquer dados. Para enviar ou receber dados, temos de "subscrever" <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">eventos websocket</a>.

Geralmente, temos 4 eventos em `Conexões WebSocket`:

- **close**:
  Disparado quando uma conexão com um WebSocket é fechada. Também disponível via propriedade onclose.
- **open**:
  Disparado quando uma conexão com um WebSocket é aberta. Também disponível via a propriedade onopen.
- **message**:
  Disparado quando os dados são recebidos através de um WebSocket. Também disponível via propriedade onmessage.
- **erro**:
  Disparado quando uma conexão com um WebSocket foi fechada devido a um erro, como quando alguns dados não puderam ser enviados. Também disponível via propriedade onerror.

Adicionemos um event listener para estes eventos na nossa ligação WebSocket.

```js title="index.js" showLineNumbers
// subscrever o evento `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
});

// subscrever o evento `message`
websocket.addEventListener('message', (event) => {
  console.log('new message received from server: ', event);
});

// subscrever o evento `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happens in our websocket connection', event);
});
```

Agora, abra o ficheiro `index.html` no nosso browser e verifique a sua consola de programador. Deverá ver apenas o registo para `WebSocket connection established`.

### Enviar e receber dados

O nosso servidor WebSocket fornece a funcionalidade <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a>. Vamos utilizá-la no nosso projeto demo para enviar e receber dados. Altere os ouvintes de eventos para `open` e `message` como abaixo:

:::caution
A função `send` na conexão WebSocket, recebe apenas `string`, `ArrayBuffer`, `Blob`, `TypedArray` e `DataView`. Pode ler mais sobre eles em [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). Isto significa que, se quisermos enviar um `objeto`, temos de o transformar em string com `JSON.stringify` primeiro.
:::

```js title="index.js" showLineNumbers
// subscrever o evento `open`
websocket.addEventListener('open', (event) => {
  console.log('conexão websocket estabelecida: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// subscrever o evento `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('nova mensagem recebida do servidor: ', receivedMessage);
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

Acabou de criar o seu primeiro projeto demo com o WebSockets.

:::tip
O pedido `ping` é utilizado principalmente para testar a ligação ou para a manter ativa.
:::

### Manter a ligação WebSocket ativa

Por defeito, as ligações `WebSocket` serão fechadas quando não for enviado qualquer tráfego entre elas durante cerca de **180 segundos**. Uma forma de manter a ligação ativa é enviar pedidos [ping](/api-explorer#ping) com intervalos de **120 segundos**. Esta ação irá manter a ligação ativa.

Um exemplo de configuração simples seria o seguinte:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // está em milissegundos, o que equivale a 120 segundos
let interval;
websocket.addEventListener('open', (event) => {
  console.log('conexão websocket estabelecida: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // para manter a ligação ativa
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// assine o evento `close`
websocket.addEventListener('close', (event) => {
  console.log('conexão websocket fechada: ', event);
  clearInterval(interval);
});
```

Agora, quando a conexão é `estabelecida`, começamos a enviar pedidos `ping` com intervalos de `12000ms`.

O seu código final deve ser:

```js title="index.js" showLineNumbers
const app_id = 1089; // Substitua pelo seu app_id ou deixe como 1089 para testes.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // é em milissegundos, o que equivale a 120 segundos
let interval;

// assine o evento `open`
websocket.addEventListener('open', (event) => {
  console.log('conexão websocket estabelecida: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // para manter a conexão viva
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// assine o evento `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('nova mensagem recebida do servidor: ', receivedMessage);
});

// assine o evento `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// subscrever o evento `error`
websocket.addEventListener('error', (event) => {
  console.log('an error happens in our websocket connection', event);
});
```
