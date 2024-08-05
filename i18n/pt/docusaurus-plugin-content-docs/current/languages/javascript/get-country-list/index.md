---
title: Obter lista de países
sidebar_label: Obter uma lista de países
sidebar_position: 2
tags:
  - country_list
  - javascript
keywords:
  - country_list
  - javascript
description: Adicione uma lista de países à sua aplicação de negociação para recolher informações sobre os seus utilizadores. Aprenda a fazê-lo com este exemplo de API em JavaScript.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Para obter a lista de países, modifique o "open event listener" com a abordagem seguinte:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // it's in milliseconds, which equals to 120 seconds
let interval;
// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // to Keep the connection alive
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});
```

Depois, atualize o "`message` event listener" para processar os dados:

```js title="index.js" showLineNumbers
// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('list of countries', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong response: ', receivedMessage.ping);
      break;
    default:
      console.log('received message: ', receivedMessage);
      break;
  }
});
```

A resposta deve ser um objeto:

```json showLineNumbers
{
  "echo_req": {
    "req_id": 1,
    "residence_list": 1
  },
  "msg_type": "residence_list",
  "req_id": 1,
  "residence_list": [
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {},
            "is_country_supported": 0
          }
        }
      },
      "phone_idd": "35818",
      "text": "Aland Islands",
      "value": "ax"
    },
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {
              "driving_licence": {
                "display_name": "Driving Licence"
              },
              "national_identity_card": {
                "display_name": "National Identity Card"
              },
              "passport": {
                "display_name": "Passport"
              }
            },
            "is_country_supported": 1
          }
        }
      },
      "phone_idd": "355",
      "text": "Albania",
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

Com esta chamada, irá adquirir informações úteis sobre os países suportados, incluindo:

- Um código de `duas letras`correspondente a cada país
- Prestadores de serviços de `identidade` para cada país
- Formato do identificador fiscal do país (`tin_format`)
- etc.

Estas informações podem ser úteis para formulários de criação de conta, onde é necessário que os utilizadores forneçam dados de identidade validados, dependendo do seu país de residência.

:::caution
Para validações de morada e de ID fiscal, utilize o 'tin_format' fornecido para cada país.
:::

O país do utilizador é crucial para os próximos passos. Determina quais são os ativos e funcionalidades que o mesmo pode utilizar.

:::tip
Recomenda-se obter a lista de países antes de preencher o formulário.
:::

:::danger
Precisará de informações detalhadas sobre os serviços de identidade `IDV` e `ONFIDO`, bem como as suas diferenças e possibilidades.
:::

O seu código final será:

```js title="index.js" showLineNumbers
const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // it's in milliseconds, which equals to 120 seconds
let interval;

// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // to Keep the connection alive
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('list of countries', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong response: ', receivedMessage.ping);
      break;
    default:
      console.log('received message: ', receivedMessage);
      break;
  }
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
