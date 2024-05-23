---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - conceito
  - Websocket
keywords:
  - trading app
  - websocket protocol
  - websocket connections
description: Learn about WebSocket protocol and WebSocket connections, and how to integrate them so you can enable data exchanges on your trading app.
---

## O que são WebSockets?

The `WebSocket` protocol, described in the specification [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455), provides a way to exchange data between the browser and the server via a persistent connection. Os dados podem ser transmitidos em ambas as direções como "pacotes" sem quebrar a ligação ou necessitar de pedidos HTTP adicionais.

O WebSocket é especialmente adequado para serviços que requerem uma troca contínua de dados, por exemplo, sistemas de negociação em tempo real, etc.

## Um exemplo simples

To open a WebSocket connection, we need to create `new WebSocket` using the special protocol `ws`or `wss` in the url. Here is how you can do that in `JavaScript`:

```js
let socket = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

On the other hand, the `ws://` data is not encrypted and can be visible to intermediaries. Os servidores proxy antigos podem encontrar cabeçalhos "estranhos" e terminar a ligação.

`wss://` stands for WebSocket over TLS, similar to how HTTPS is HTTP over TLS. Com a camada de segurança de transporte, os dados são encriptados pelo remetente e desencriptados pelo destinatário. Isto significa que os pacotes de dados encriptados podem passar com sucesso pelos proxies sem serem inspecionados.
:::

Assim que o socket for criado, devemos ouvir os eventos que constam no mesmo. Existem 4 eventos no total:

- Abrir - Ligação estabelecida
- Mensagem - Dados recebidos
- Erro - Erro de WebSocket
- Fechar - Ligação fechada

Para enviar uma mensagem, basta utilizar socket.send(data).

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

## Por que motivo necessitamos de WebSockets e em que circunstâncias devemos evitá-los?

Os WebSockets são uma ferramenta de comunicação cliente-servidor essencial. Para explorar ao máximo o seu potencial, é importante compreender como podem ser úteis e quando devem ser evitados. Será explicado de forma detalhada na próxima secção.

Deve utilizar WebSockets nos seguintes casos:

1. ‍Quando está a desenvolver uma aplicação web em tempo real.
   Normalmente, o WebSocket é utilizado para o desenvolvimento de aplicações em tempo real, o que permite que os dados sejam continuamente transmitidos ao cliente. Como o servidor back-end envia estes dados continuamente, um WebSocket permite o envio ou a transmissão ininterrupta destes dados na ligação já aberta. A utilização de WebSockets torna essa transmissão de dados mais rápida e potencia o desempenho da aplicação.
2. Para sites de negociação, como o da Deriv.
   Aqui, o WebSocket auxilia no tratamento de dados impelidos pelo servidor back-end implementado para o cliente.
3. ‍Ao criar uma aplicação de chat.
   Os criadores de aplicações de chat pedem ajuda aos WebSockets para operações como trocas únicas e publicação/transmissão de mensagens. Como a mesma ligação WebSocket é utilizada para enviar/receber mensagens, a comunicação torna-se fácil e rápida.

Agora que já estabelecemos onde devem ser utilizados os WebSockets, vamos ver onde é melhor evitá-los. Isto irá ajudá-lo a evitar aborrecimentos operacionais desnecessários.

Os WebSockets não devem ser utilizados quando tudo o que é necessário é ir buscar dados antigos ou dados que devem ser processados apenas uma vez. Nestes casos, a utilização de protocolos HTTP é uma escolha acertada.

## WebSocket vs HTTP

Como os protocolos HTTP e WebSocket são utilizados para a comunicação entre aplicações, é comum as pessoas ficarem confusas e terem dificuldade em escolher um deles.

Como já foi referido, o WebSocket é um protocolo enquadrado e bidirecional. Por outro lado, o HTTP é um protocolo unidirecional que funciona acima do protocolo TCP.

Uma vez que o protocolo WebSocket consegue suportar a transmissão contínua de dados, é maioritariamente utilizado no desenvolvimento de aplicações em tempo real. HTTP is stateless and is used for the development of [RESTful](https://de.wikipedia.org/wiki/Representational_State_Transfer) and [SOAP](https://de.wikipedia.org/wiki/SOAP) applications. O SOAP ainda pode utilizar o HTTP para implementação, mas o REST é amplamente difundido e utilizado.

No WebSocket, a comunicação ocorre em ambas as extremidades, o que o torna um protocolo mais rápido. No HTTP, a ligação é construída numa extremidade, o que o torna um pouco mais lento face ao WebSocket.

O WebSocket utiliza uma ligação TCP unificada e necessita de uma parte para terminar a ligação. Até isso acontecer, a ligação permanece ativa. O HTTP precisa de criar uma ligação distinta para pedidos separados. Uma vez concluído o pedido, a ligação é interrompida automaticamente.

## Como são estabelecidas as ligações WebSocket?

O processo começa com um aperto de mão WebSocket que envolve a utilização de um novo esquema (ws ou wss). Para o ajudar a compreender, considere-os equivalentes a HTTP e HTTP seguro (HTTPS), respetivamente.

Com este esquema, espera-se que os servidores e clientes sigam o protocolo de ligação WebSocket padrão. O estabelecimento da ligação WebSocket começa com uma atualização de um pedido HTTP que inclui alguns cabeçalhos, como Connection: Upgrade, Upgrade: WebSocket, Sec-WebSocket- Key e assim por diante.

Veja como se estabelece esta ligação:

1. **The Request :** The Connection Upgrade header denotes the WebSocket handshake while the Sec-WebSocket-Key features Base64-encoded random value. Este valor é gerado arbitrariamente durante cada aperto de mão WebSocket. Para além do acima exposto, o cabeçalho da key também faz parte deste pedido.

Os cabeçalhos acima listados, quando combinados, formam um pedido HTTP GET. Terá dados semelhantes:

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

Para esclarecer o conceito de Sec-WebSocket-Version, pode explicar-se que se trata da versão do protocolo WebSocket pronta a ser utilizada pelo cliente.

2. **The Response:** The response header, Sec-WebSocket-Accept, features the rest of value submitted in the Sec-WebSocket-Key request header. Está ligado a uma determinada especificação de protocolo e é amplamente utilizado para evitar informações enganosas. Por outras palavras, reforça a segurança da API e impede que servidores mal configurados criem erros no desenvolvimento da aplicação.

Se o pedido anteriormente enviado for bem-sucedido, será recebida uma resposta semelhante à sequência de texto abaixo mencionada:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## Referências

- \*\* [WebSockets APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)\*\*
- \*\* [WebSocket - Javascript Info](https://javascript.info/websocket)\*\*
