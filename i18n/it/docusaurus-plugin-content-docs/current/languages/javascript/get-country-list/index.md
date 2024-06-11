---
title: Ottenere l'elenco dei Paesi
sidebar_label: Ottenere un elenco di Paesi
sidebar_position: 2
tags:
  - elenco_paesi
  - javascript
keywords:
  - elenco_paesi
  - javascript
description: Ottenga informazioni sui suoi utenti aggiungendo un elenco di Paesi alla sua app di trading. Scopra come farlo con questo esempio di API JavaScript.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Per ottenere un elenco di Paesi, aggiorna l'open event listener utilizzando il seguente approccio:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // è in millisecondi, che equivale a 120 secondi
let interval;
// sottoscrivere l'evento `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // per mantenere viva la connessione
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});
```

Ora, aggiorni il listener di eventi `message` per rendere i dati:

```js title="index.js" showLineNumbers
// sottoscrivere l'evento `messaggio`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('elenco di Paesi', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('risposta ping/pong: ', receivedMessage.ping);
      break;
    default:
      console.log('messaggio ricevuto: ', receivedMessage);
      break;
  } }; } }; } } }; } } } }.
});
```

La risposta deve essere un oggetto:

```json showLineNumbers
{
  "echo_req": {
    "req_id": 1,
    "lista_di_residenza": 1
  },
  "msg_type": "residence_list",
  "req_id": 1,
  "residence_list": [
    {
      "identity": {
        "servizi": {
          "idv": {
            "documenti_supportati": {},
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
      "text": "Isole Aland",
      "valore": "ax"
    },
    {
      "identity": {
        "servizi": {
          "idv": {
            "documenti_supportati": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documenti_supportati": {
              "driving_licence": {
                "display_name": "Patente di guida"
              },
              "carta_identità_nazionale": {
                "display_name": "Carta d'identità nazionale"
              },
              "passaporto": {
                "nome visualizzato": "Passaporto"
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

Con questa chiamata, otterrai informazioni utili sui Paesi supportati, come ad esempio:

- Un codice di `2 lettere` per ogni Paese.
- Fornitori di servizi `Identity` per ogni Paese
- Formato dell'identificatore fiscale del Paese (`tin_format`)
- ecc.

Questo può essere utile per i moduli di creazione di un conto, in cui è necessario chiedere agli utenti di fornire informazioni convalidate sulla loro identità, a seconda del Paese di residenza.

:::attenzione
Per la convalida dell'indirizzo e del codice fiscale, utilizzi il 'tin_format' fornito per il Paese.
:::

Il Paese dell'utente è importante per i passi successivi. Determina quali attività e funzioni possono essere utilizzate.

:::tip
È meglio ottenere l'elenco dei Paesi prima di compilare il modulo.
:::

:::danger
Avrà bisogno di contenuti dettagliati sui servizi di identità `IDV` e `ONFIDO`, le loro differenze e possibilità.
:::

Il tuo codice finale sarà:

```js title="index.js" showLineNumbers
const app_id = 1089; // Sostituisca con il suo app_id o lo lasci come 1089 per i test.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // è in millisecondi, che equivale a 120 secondi
let interval;

// sottoscrive l'evento `open`
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // per mantenere viva la connessione
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// sottoscrivere l'evento `message`
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  switch (receivedMessage.msg_type) {
    case 'residence_list':
      console.log('elenco di Paesi', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('risposta ping/pong: ', receivedMessage.ping);
      break;
    default:
      console.log('messaggio ricevuto: ', receivedMessage);
      break;
  } }; // sottoscrivere il messaggio: ', receivedMessage'; break; }.
});

// sottoscrivere l'evento `close`
websocket.addEventListener('close', (event) => {
  console.log('websocket connessa chiusa: ', event);
  clearInterval(interval);
});

// sottoscrivere l'evento `error`
websocket.addEventListener('error', (event) => {
  console.log('si è verificato un errore nella nostra connessione websocket', event);
});
```
