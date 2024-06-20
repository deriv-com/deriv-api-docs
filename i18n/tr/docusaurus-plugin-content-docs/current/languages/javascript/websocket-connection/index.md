---
title: WebSocket bağlantısı kurma
sidebar_label: WebSocket bağlantısı
sidebar_position: 1
tags:
  - javascript
keywords:
  - js
  - websocket-bağlantısı
description: Ticaret uygulamanızda bir WebSocket API'sine WebSocket bağlantısının nasıl kurulacağına ilişkin bir kılavuz.
---

:::caution

WebSockets'e aşina değilseniz, lütfen [belgelerimize] (/docs/core-concepts/websocket) göz atın.

:::

### WebSocket connection kurma

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

Ardından, Deriv WebSocket Server'a aşağıda görüldüğü gibi bir WebSocket connection oluşturacağız:

```js title="index.js" showLineNumbers
const app_id = 1089; // App_id ile değiştirin veya test için 1089 olarak bırakın.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
```

:::info
app_id = 1089\\` sadece test amaçlıdır. Uygulamanızı bir üretim ortamında yayınlarken lütfen kendi app_id dosyanızla güncelleyin. Kendiniz için yeni bir uygulama oluşturmak için lütfen [bu kılavuzu] (/docs/setting-up-a-deriv-application) kontrol edin.
:::

Bu noktada, `WebSocket sunucusuna` bağlanmış durumdayız. Ancak, herhangi bir veri almıyoruz. Veri göndermek veya almak için <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">websocket olaylarına</a>`abone` olmamız gerekir.

Genel olarak, `WebSocket bağlantıları` üzerinde 4 olayımız var:

- **kapat**:
  Bir WebSocket ile bağlantı kapatıldığında ateşlenir. Onclose tesisi aracılığıyla da mevcuttur.
- **open**:
  WebSocket ile bir bağlantı açıldığında ateşlenir. Ayrıca onopen özelliği aracılığıyla da mevcuttur.
- **message**:
  Bir WebSocket aracılığıyla veri alındığında ateşlenir. Onmessage özelliği aracılığıyla da mevcuttur.
- **hata**:
  Bir WebSocket ile bağlantı, bazı verilerin gönderilememesi gibi bir hata nedeniyle kapatıldığında ateşlenir. Onerror özelliği aracılığıyla da kullanılabilir.

WebSocket bağlantımıza bu olaylar için bir olay dinleyicisi ekleyelim.

```js title="index.js" showLineNumbers
// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  console.log('new message received from server: ', event);
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
});

// subscribe to `error` event
websocket.addEventListener('error', (event) => {
  console.log('an error happend in our websocket connection', event);
});
```

Şimdi tarayıcımızda `index.html` dosyasını açın ve geliştirici konsolunuzu kontrol edin. Yalnızca `WebSocket bağlantısı kuruldu` günlüğünü görmelisiniz.

### Veri gönderme ve alma

WebSocket sunucumuz <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">ping/pong</a> işlevselliği sağlar. Veri göndermek ve almak için demo projemizde kullanalım. open`ve`message\\` için olay dinleyicilerini aşağıdaki gibi değiştirin:

:::caution
WebSocket bağlantısındaki `send` işlevi yalnızca `string`, `ArrayBuffer`, `Blob`, `TypedArray` ve `DataView` alır. Onlar hakkında daha fazla bilgiyi [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) adresinden okuyabilirsiniz. Bu, bir `nesne` göndermek istiyorsak, önce onu `JSON.stringify` ile dizeleştirmemiz gerektiği anlamına gelir.
:::

```js title="index.js" showLineNumbers
// subscribe to `open` event
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
});
```

ReceivedMessage\\` aşağıdaki gibi bir nesne olacaktır:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: “ping”, ping: “pong”}


```

Tebrikler :tada:

WebSockets ile ilk demo projenizi oluşturdunuz.

:::tip
ping\\` isteği çoğunlukla bağlantıyı test etmek veya canlı tutmak için kullanılır.
:::

### WebSocket bağlantısını canlı tutun

Varsayılan olarak, `WebSocket bağlantıları` aralarında yaklaşık **180 saniye** boyunca herhangi bir trafik gönderilmediğinde kapatılacaktır. Bağlantıyı canlı tutmanın bir yolu **120 saniye** aralıklarla [ping](/api-explorer#ping) istekleri göndermektir. Bu, bağlantıyı canlı ve aktif tutacaktır.

Basit bir kurulum örneği aşağıdaki gibi olacaktır:

```js title="index.js" showLineNumbers
const ping_interval = 12000; // milisaniye cinsindendir, bu da 120 saniyeye eşittir
let interval;
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // bağlantıyı canlı tutmak için
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// subscribe to `close` event
websocket.addEventListener('close', (event) => {
  console.log('websocket connectioned closed: ', event);
  clearInterval(interval);
});
```

Şimdi, bağlantı `kurulduğunda`, `12000ms` aralıklarla `ping` istekleri göndermeye başlıyoruz.

Son kodunuz şöyle olmalıdır:

```js title="index.js" showLineNumbers
const app_id = 1089; // app_id ile değiştirin veya test için 1089 olarak bırakın.
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const ping_interval = 12000; // milisaniye cinsindendir, bu da 120 saniyeye eşittir
let interval;

// `open` olayına abone olun
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // bağlantıyı canlı tutmak için
  interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
});

// subscribe to `message` event
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', receivedMessage);
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
