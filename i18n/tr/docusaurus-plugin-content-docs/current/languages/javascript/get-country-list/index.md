---
title: Ülke listesini al
sidebar_label: Ülkelerin bir listesini alın
sidebar_position: 2
tags:
  - ülke_listesi
  - javascript
keywords:
  - ülke_listesi
  - javascript
description: Ticaret uygulamanıza bir ülke listesi ekleyerek kullanıcılarınız hakkında bilgi alın. Bu JavaScript API örneği ile bunu nasıl yapacağınızı öğrenin.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

Ülkelerin bir listesini almak için aşağıdaki yaklaşımı kullanarak open etkinlik dinleyicisini güncelleyin:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // milisaniye cinsindendir, bu da 120 saniyeye eşittir
let interval;
// `open` olayına abone olun
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // bağlantıyı canlı tutmak için
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});
```

Şimdi, verileri işlemek için `message` olay dinleyicisini güncelleyin:

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

Yanıt bir nesne olmalıdır:

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
      "text": "Aland Adaları",
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
                "display_name": "Ulusal Kimlik Kartı"
              },
              "pasaport": {
                "display_name": "Pasaport"
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

Bu call ile, desteklenen ülkeler hakkında yararlı bilgiler alacaksınız, örneğin:

- Her ülke için `2 harfli` bir kod
- Her ülke için `Kimlik` hizmet sağlayıcıları
- Ülke Vergi Tanımlayıcı Formatı (`tin_format`)
- vs.

Bu, kullanıcılardan ikamet ettikleri ülkeye bağlı olarak kimlik tabanları hakkında doğrulanmış bilgiler vermelerini istemeniz gereken hesap oluşturma formları için yararlı olabilir.

:::caution
Adres ve vergi kimliği doğrulamaları için lütfen ülke için sağlanan 'tin_format'ı kullanın.
:::

Kullanıcının ülkesi sonraki adımlarınız için önemlidir. Hangi varlıkları ve özellikleri kullanabileceklerini belirler.

:::tip
Formunuzu doldurmadan önce ülkelerin listesini almak daha iyidir.
:::

:::danger
IDV`ve`ONFIDO\\` kimlik hizmetleri, farklılıkları ve olanakları hakkında ayrıntılı içeriğe ihtiyacınız olacak.
:::

Son kodunuz şöyle olacak:

```js title="index.js" showLineNumbers
const app_id = 1089; // app_id ile değiştirin veya test için 1089 olarak bırakın.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // milisaniye cinsindendir, bu da 120 saniyeye eşittir
let interval;

// `open` olayına abone olun
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // bağlantıyı canlı tutmak için
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
      console.log('ülkelerin listesi', receivedMessage.residence_list);
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
