---
title: Pobierz listę krajów
sidebar_label: Pobierz listę krajów
sidebar_position: 2
tags:
  - Lista krajów
  - javascript
keywords:
  - Lista krajów
  - javascript
description: Uzyskaj informacje o swoich użytkownikach, dodając listę krajów do swojej aplikacji handlowej. Dowiedz się, jak to zrobić, korzystając z tego przykładu interfejsu JavaScript API.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Aby uzyskać listę krajów, zaktualizuj otwarty detektor zdarzeń przy użyciu następującego podejścia:

```js title="index.js" showLineNumbers
const ping_interval = 12000;//jest w milisekundach, co równa się 120 sekund
let interval;
//subskrybuj zdarzenie `open`
websocket.addEventListener ('open', (event) => {
  console.log ('ustanowiono połączenie websocket: ', event);
  const payload = JSON.stringify ({
    residence_list: 1,
  });
  websocket.send (payload);

  //aby utrzymać połączenie przy życiu
  interval = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});
```

Teraz zaktualizuj odbiornik zdarzeń `message`, aby renderować dane:

```js title="index.js" showLineNumbers
//subskrybuj zdarzenie `message`
WebSocket.addEventListener ('message', (event) => {
  const receivedMessage = JSON.parse (event.data);
  switch (ReceivedMessage.msg_type) {
    case 'residence_list':
      console.log ('lista krajów', ReceivedMessage.residence_list);
      break;
    case 'ping':
      console.log ('odpowiedź ping/ponga: ', ReceivedMessage.ping);
      break;
    default:
      console.log ('odebrana wiadomość:', ReceivedMessage);
      break;
  }
});
```

Odpowiedź powinna być przedmiotem:

```json showLineNumbers
{
  „echo_req”: {
    „req_id”: 1,
    „lista_rezydencji”: 1
  },
  „msg_type”: „lista_rezydencji”,
  „req_id”: 1,
  „residence_list”: [
    {
      „tożsamość”: {
        „usługi”: {
          „idv”: {
            „documents_supported”: {},
            „has_visual_sample”: 0,
            „is_country_supported”: 0
          },
          „onfido”: {
            „documents_supported”: {},
            „is_country_supported”: 0
          }
        }
      },
      „phone_idd”: „35818",
      „text”: „Wyspy Alandzkie”,
      „value”: „ax”
    },
    {
      „tożsamość”: {
        „usługi”: {
          „idv”: {
            „documents_supported”: {},
            „has_visual_sample”: 0,
            „is_country_supported”: 0
          },
          „onfido”: {
            „documents_supported”: {
              „driving_licence”: {
                „display_name”: „Prawo jazdy”
              },
              „national_identificty_card”: {
                „display_name”: „Krajowy dowód tożsamości”
              },
              „paszport”: {
                „display_name”: „Paszport”
              }
            },
            „is_country_supported”: 1
          }
        }
      },
      „phone_idd”: „355",
      „text”: „Albania”,
      „tin_format”: ["^ [A-ta-T0-9]\\ d{8}[A-wa-W] $"],
      „value”: „al”
    }
  ]
}
```

Dzięki temu połączeniu otrzymasz przydatne informacje o obsługiwanych krajach, takie jak:

- Kod „2-literowy” dla każdego kraju
- Dostawcy usług „tożsamości” dla każdego kraju
- Format identyfikatora podatkowego kraju (`tin_format`)
- itd.

Może to być przydatne w przypadku formularzy tworzenia konta, w których należy poprosić użytkowników o podanie sprawdzonych informacji o ich bazie tożsamości, w zależności od kraju zamieszkania.

:: :warning
Aby sprawdzić poprawność adresu i identyfikatora podatkowego, należy użyć podanego „tin_format” dla danego kraju.
::

Kraj użytkownika jest ważny dla kolejnych kroków. Określa, jakich zasobów i funkcji mogą korzystać.

:::tip
:::tip
:::tip
Lepiej jest uzyskać listę krajów przed wypełnieniem formularza.
:::

:::danger
Będziesz potrzebował szczegółowych treści dotyczących usług tożsamości `IDV` i `ONFIDO`, ich różnic i możliwości.
:::

Twój ostateczny kod będzie:

```js title="index.js" showLineNumbers
const app_id = 1089;//Zastąp na swój app_id lub pozostaw jako 1089 do testowania.
const websocket = new WebSocket (`wss: //ws.derivws.com/websockets/v3? app_id=${app_id}`);
const ping_interval = 12000;//jest w milisekundach, co równa się 120 sekund
let interval;

//subskrybuj zdarzenie `open`
WebSocket.addEventListener ('open', (event)
  => {console.log ('websocket' ustanowione połączenie:”, zdarzenie);
  const payload = JSON.stringify ({
    residence_list: 1,
  });
  websocket.send (payload);

  //to Utrzymuj połączenie przy życiu
  interval = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//subskrybuj zdarzenie `message`
WebSocket.addEventListener ('message', (event) => {
  const receivedMessage = JSON.parse (event.data);
  switch (ReceivedMessage.msg_type) {
    case 'residence_list':
      console.log ('lista krajów', ReceivedMessage.residence_list)
      ; przerwa;
    przypadek 'ping':
      console.log ('odpowiedź ping/ponga: ', ReceivedMessage.ping);
      break;
    default:
      console.log ('odebrana wiadomość:', receivedMessage);
      break;
  }
});

//subskrybuj wydarzenie `close`
WebSocket.addEventListener ('close', (event) => {
  console.log ('websocket połączony zamknięty: ', zdarzenie);
  clearInterval (interval);
});

//subskrybuj zdarzenie `error`
WebSocket.addEventListener (' error ', (event) => {
  console.log ('zdarzył się błąd w naszym połączeniu websocket, event);};

```
