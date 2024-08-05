---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - conceito
  - websocket
keywords:
  - app de negociação
  - protocolo websocket
  - ligações websocket
description: Saiba mais sobre o protocolo WebSocket e as ligações WebSocket, e como integrá-los para permitir trocas de dados na sua aplicação de negociação.
---

## O que são WebSockets?

O protocolo `WebSocket`, descrito na especificação [RFC 6455] (https://datatracker.ietf.org/doc/html/rfc6455), oferece uma forma de trocar dados entre o navegador e o servidor através de uma ligação persistente. Os dados podem ser transmitidos em ambas as direções como "pacotes" sem interromper a ligação ou necessitar de pedidos HTTP adicionais.

O WebSocket é especialmente adequado para serviços que requerem uma troca contínua de dados, como sistemas de negociação em tempo real, entre outros.

## Um exemplo simples

Para abrir uma ligação WebSocket, é necessário criar um `novo WebSocket` utilizando o protocolo especial `ws` ou `wss` no URL. Veja como pode fazer em `JavaScript`:

```js
let socket = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

Por outro lado, os dados `ws://` não são encriptados e podem ser visíveis para intermediários. Os servidores proxy antigos podem encontrar cabeçalhos "estranhos" e terminar a ligação.

`wss://` significa WebSocket sobre TLS, assim que HTTPS é HTTP sobre TLS. Com a camada de segurança de transporte, os dados são encriptados pelo remetente e desencriptados pelo destinatário. Isto significa que os pacotes de dados encriptados atravessem proxies com sucesso, sem serem inspecionados.
:::

Assim que o socket for criado, devemos ouvir os eventos que constam no mesmo. Existem 4 eventos no total:

- Abrir - Ligação estabelecida
- Mensagem - Dados recebidos
- Erro - Erro de WebSocket
- Fechar - Ligação fechada

Para enviar uma mensagem utilize "socket.send(data)".

Apresentamos a baixo um exemplo em `JavaScript`:

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

Os WebSockets são uma ferramenta crucial para a comunicação cliente-servidor.  Para aproveitar ao máximo o seu potencial, é importante entender quando são benéficos e quando devem ser evitados.  Vamos explorar isso em detalhe.

Quando utilizar WebSockets:

1. Desenvolvimento de Aplicações Web em Tempo Real:
   O uso mais comum do WebSocket é no desenvolvimento de aplicações em tempo real, onde este ajuda a exibir continuamente os dados no lado do cliente. Como o servidor back-end envia estes dados continuamente, o WebSocket permite o envio ou a transmissão ininterrupta destes dados na ligação já aberta. A utilização de WebSockets resulta numa transmissão de dados mais rápida e melhora o desempenho da aplicação.
2. Sites de negociação, como o da Deriv:
   Aqui, o WebSocket auxilia no tratamento de dados impelidos pelo servidor back-end implementado para o cliente.
3. Aplicações de chat:
   Os programadores de aplicações de chat utilizam WebSockets para operações como trocas únicas e publicação/transmissão de mensagens. Para possibilitar a troca instantânea de mensagens. Como a mesma ligação WebSocket é utilizada para enviar/receber mensagens, a comunicação torna-se simples e rápida.

Agora que já estabelecemos onde devem ser utilizados os WebSockets, vamos ver onde é melhor evitá-los. Isto irá ajudá-lo a evitar aborrecimentos operacionais desnecessários.

WebSockets não devem ser utilizados quando o objetivo é apenas buscar dados antigos ou quando os dados precisam ser processados uma única vez.  Para tais situações, o protocolo HTTP é mais apropriado.

## WebSocket vs HTTP

Os protocolos HTTP e WebSocket são utilizados para a comunicação entre aplicações e é comum que as pessoas se sintam confusas e tenham dificuldade em escolher entre eles.

Como mencionado, o WebSocket é um protocolo que permite comunicação bidirecional e contínua.  Em contraste, o HTTP é um protocolo unidirecional que opera sobre o protocolo TCP.

Devido à sua capacidade de suportar a transmissão contínua de dados, o WebSocket é amplamente utilizado no desenvolvimento de aplicações em tempo real. Já o HTTP, por não manter estado, é utilizado para o desenvolvimento de aplicações [RESTful](https://de.wikipedia.org/wiki/Representational_State_Transfer) e [SOAP](https://de.wikipedia.org/wiki/SOAP). Embora o SOAP possa usar HTTP na sua implementação, o REST é mais comum e amplamente adotado.

No WebSocket, a comunicação pode ocorrer em ambas as direções, tornando o protocolo mais rápido.  No HTTP, a ligação é construída numa única direção, o que o torna um pouco mais lento face ao WebSocket.

O WebSocket utiliza uma única ligação TCP que permanece ativa até que seja explicitamente encerrada.  Até isso acontecer, a ligação permanece ativa.  Em contraste, o HTTP cria uma nova ligação para cada pedido. Uma vez concluído o pedido, a ligação é interrompida automaticamente.

## Como se estabelecem as ligações WebSocket?

O processo inicia-se com um aperto de mão WebSocket, que utiliza um novo esquema (ws ou wss). Para facilitar a compreensão, considere que eles são equivalentes ao HTTP e ao HTTP seguro (HTTPS), respetivamente.

Com este esquema, espera-se que os servidores e clientes sigam o protocolo de ligação WebSocket padrão. O estabelecimento da ligação WebSocket começa com uma atualização de um pedido HTTP que inclui cabeçalhos como Ligação: Upgrade, Upgrade: WebSocket, Sec-WebSocket-Key, entre outros.

Veja como esta ligação é estabelecida:

1. **O Pedido:** O cabeçalho "Ligação Upgrade" indica o aperto de mão WebSocket, enquanto o Sec-WebSocket-Key apresenta um valor aleatório codificado em Base64. Este valor é gerado de forma arbitrária durante cada aperto de mão WebSocket. Além do que foi mencionado, o cabeçalho chave também faz parte deste pedido.

Os cabeçalhos mencionados, quando combinados, formam um pedido HTTP GET. O pedido terá dados semelhantes aos seguintes:

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

Para clarificar o conceito de Sec-WebSocket-Version, podemos dizer que se refere à versão do protocolo WebSocket preparada para ser utilizada pelo cliente.

2. **A resposta:** O cabeçalho de resposta, Sec-WebSocket-Accept, contém um valor derivado do cabeçalho de pedido Sec-WebSocket-Key. Este valor está associado a uma especificação particular do protocolo e é amplamente utilizado para evitar informações falsas. Em outras palavras, reforça a segurança da API e previne que servidores mal configurados causem erros durante o desenvolvimento da aplicação.

Se o pedido anterior for bem-sucedido, será recebida uma resposta semelhante à sequência de texto apresentada abaixo:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## Referências

- **[WebSockets APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)**
- **[WebSocket - Info Javascript](https://javascript.info/websocket)**
