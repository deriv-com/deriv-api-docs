---
title: Get country list
sidebar_label: Obtenir une liste de pays
sidebar_position: 2
tags:
  - country_list
  - javascript
keywords:
  - country_list
  - javascript
description: Get information about your users by adding a list of countries to your trading app. Learn how to do that with this JavaScript API example.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Pour obtenir une liste de pays, actualisez l'écouteur d'événements Open à l'aide de l'approche suivante :

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

Now, update the `message` event listener to render the data:

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

La réponse doit être un objet :

```json showLineNumbers
{
  "echo_req" : {
    "req_id" : 1,
    "residence_list" : 1
  },
  "msg_type" : "residence_list",
  "req_id" : 1,
  "residence_list" : [
    {
      "identity" : {
        "services" : {
          "idv" : {
            "documents_supported" : {},
            "has_visual_sample" : 0,
            "is_country_supported" : 0
          },
          "onfido" : {
            "documents_supported" : {},
            "is_country_supported" : 0
          }
        }
      },
      "phone_idd" : "35818",
      "text" : "Îles Aland",
      "value" : "ax"
    },
    {
      "identity" : {
        "services" : {
          "idv" : {
            "documents_supported" : {},
            "has_visual_sample" : 0,
            "is_country_supported" : 0
          },
          "onfido" : {
            "documents_supported" : {
              "driving_licence" : {
                "display_name" : "Driving Licence"
              },
              "national_identity_card" : {
                "display_name" : "Carte nationale d'identité"
              },
              "passport" : {
                "display_name" : "Passeport"
              }
            },
            "is_country_supported" : 1
          }
        }
      },
      "phone_idd" : "355",
      "text" : "Albanie",
      "tin_format" : ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value" : "al"
    }
  ]
}
```

Grâce à cet appel, vous obtiendrez des informations utiles sur les pays pris en charge, comme :

- A `2-letter` code for each country
- `Identity` service providers for each country
- Country Tax Identifier Format (`tin_format`)
- Etc.

Cela peut être utile pour les formulaires de création de compte, dans lesquels vous devez demander aux utilisateurs de fournir des informations approuvées sur leur base d'identité, en fonction de leur pays de résidence.

:::caution
For address and tax ID validations, please use the provided 'tin_format' for the country.
:::

Le pays de l'utilisateur est important pour les étapes suivantes. Il indique les actifs et les fonctionnalités qu'ils peuvent utiliser.

:::tip
It's better to get the list of countries before populating your form.
:::

:::danger
You will need detailed content about `IDV` and `ONFIDO` identity services, their differences and possibilities.
:::

Votre code final ressemblera à ceci :

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
