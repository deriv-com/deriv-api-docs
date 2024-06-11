---
title: Länderliste abrufen
sidebar_label: Eine Liste von Ländern erhalten
sidebar_position: 2
tags:
  - länder_liste
  - Javascript
keywords:
  - länder_liste
  - Javascript
description: Erhalten Sie Informationen über Ihre Nutzer, indem Sie eine Länderliste zu Ihrer Handels-App hinzufügen. Mit diesem JavaScript-API-Beispiel lernen Sie, wie das geht.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Um eine Liste der Länder zu erhalten, aktualisieren Sie den Listener für das Ereignis "Öffnen" mit dem folgenden Ansatz:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // wird in Millisekunden angegeben, was 120 Sekunden entspricht
let interval;
// abonnieren Sie das Ereignis 'open'
websocket.addEventListener('open', (event) => {
  console.log('Websocket-Verbindung hergestellt: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // um die Verbindung aufrecht zu erhalten
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});
```

Aktualisieren Sie nun den Ereignis-Listener `Nachricht`, um die Daten zu rendern:

```js title="index.js" showLineNumbers
//
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

Die Antwort sollte ein Objekt sein:

```json showLineNumbers
{
  "echo_req": {
    "req_id": 1,
    "residence_list": 1
  },
  "msg_type": "wohnsitz_liste",
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
      "text": "Aland Inseln",
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
                "display_name": "Führerschein"
              },
              "national_identity_card": {
                "display_name": "Nationale Identitätskarte"
              },
              "passport": {
                "display_name": "Reisepass"
              }
            },
            "is_country_supported": 1
          }
        }
      },
      "phone_idd": "355",
      "text": "Albanien",
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

Mit diesem Aufruf erhalten Sie nützliche Informationen über die unterstützten Länder, wie z.B.:

- Ein "2-Buchstaben-Code" für jedes Land
- Identity"-Dienstleister für jedes Land
- Format der Steueridentifikationsnummer des Landes (`tin_format`)
- usw.

Dies kann für Formulare zur Kontoerstellung nützlich sein, in denen Sie die Benutzer auffordern müssen, je nach Land, in dem sie wohnen, validierte Informationen über ihre Identitätsbasis anzugeben.

:::caution
Für die Überprüfung von Adressen und Steuer-IDs verwenden Sie bitte das angegebene 'tin_format' für das Land.
:::

Das Land des Benutzers ist wichtig für Ihre nächsten Schritte. Sie bestimmt, welche Assets und Funktionen sie nutzen können.

:::tip
Es ist besser, die Liste der Länder zu erhalten, bevor Sie Ihr Formular ausfüllen.
:::

:::danger
Sie benötigen detaillierte Inhalte über `IDV` und `ONFIDO` Identitätsdienste, ihre Unterschiede und Möglichkeiten.
:::

Ihr endgültiger Code lautet dann:

```js title="index.js" showLineNumbers
const app_id = 1089; // Ersetzen Sie durch Ihre app_id oder belassen Sie es zum Testen bei 1089.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // in Millisekunden, was 120 Sekunden entspricht
let interval;

// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // um die Verbindung aufrecht zu erhalten
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// Ereignis 'message' abonnieren
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('Liste der Länder', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong Antwort: ', receivedMessage.ping);
      break;
    default:
      console.log('empfangene Nachricht: ', receivedMessage);
      break;
  }
});

// Abonnieren Sie das Ereignis 'close'
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});

// Abonnieren Sie das Ereignis 'error'
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```
