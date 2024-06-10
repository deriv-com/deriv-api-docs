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
description: Obtenha informações sobre os seus utilizadores adicionando uma lista de países à sua aplicação de negociação. Saiba como o fazer com este exemplo de API JavaScript.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Para obter uma lista de países, atualize o open event listener com a seguinte abordagem:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // está em milissegundos, o que equivale a 120 segundos
let interval;
// assine o evento `open`
websocket.addEventListener('open', (event) => {
  console.log('conexão websocket estabelecida: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // para manter a ligação ativa
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});
```

Agora, atualize o ouvinte do evento `message` para renderizar os dados:

```js title="index.js" showLineNumbers
// subscrever o evento `message`
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

Com esta chamada, irá obter dados úteis sobre os países suportados, incluindo:

- Um código de duas letras para cada país
- Prestadores de serviços de "identidade" para cada país
- Formato do identificador fiscal do país (`tin_format`)
- etc.

Isto pode ser útil para formulários de criação de conta, nos quais é necessário pedir aos utilizadores que forneçam informações validadas sobre a sua identidade , dependendo do seu país de residência.

:::caution
Para validações de endereço e de ID fiscal, utilize o 'tin_format' fornecido para o país.
:::

O país do utilizador é importante para os passos seguintes. Determina quais são os ativos e funcionalidades que o mesmo pode utilizar.

:::tip
É preferível obter a lista de países antes de preencher o seu formulário.
:::

:::danger
Necessitará de conteúdos pormenorizados sobre os serviços de identidade `IDV` e `ONFIDO`, as suas diferenças e possibilidades.
:::

O seu código final será:

```js title="index.js" showLineNumbers
const app_id = 1089; // Substitua pelo seu app_id ou deixe como 1089 para testes.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // é em milissegundos, o que equivale a 120 segundos
let interval;

// assine o evento `open`
websocket.addEventListener('open', (event) => {
  console.log('conexão websocket estabelecida: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // para manter a conexão viva
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// subscreva o evento `message`
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

// assine o evento `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// assine o evento `error`
websocket.addEventListener('error', (event) => {
  console.log('um erro aconteceu na nossa conexão websocket', event);
});
```
