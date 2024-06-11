---
title: වෙබ්සොකට් සම්බන්ධතාවයක් සැකසීම
sidebar_label: WebSocket සම්බන්ධතාවය
sidebar_position: 1
tags:
  - ජාවාස්ක්රිප්ට්
keywords:
  - js
  - websocket සම්බන්ධතාවය
description: ඔබේ වෙළඳ යෙදුමේ වෙබ්සොකට් API එකකට වෙබ්සොකට් සම්බන්ධතාවයක් සැකසන්නේ කෙසේද යන්න පිළිබඳ මාර්ගෝපදේශයක්.
---

:::caution

ඔබ වෙබ්සොකට් වලට හුරු නොවී නම්, කරුණාකර [අපගේ ලියකියවිලි] (/ඩොක්ස්/කෝර්-සංකල්ප/වෙබ්සොකට්) පරීක්ෂා කරන්න.

:::

### WebSocket සම්බන්ධතාවයක් සකසන්න

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

ඊළඟට, අපි පහත දැක්වෙන පරිදි Deriv WebSocket සේවාදායකය වෙත WebSocket සම්බන්ධතාවයක් සාදන්නෙමු:

```js title="index.js" showLineNumbers
const app_id = 1089;//ඔබගේ app_id සමඟ ප්රතිස්ථාපනය කරන්න හෝ පරීක්ෂා කිරීම සඳහා 1089 ලෙස තබන්න.
const වෙබ්සොකට් = නව වෙබ්සොකට් (`wss: //ws.derivws.com/websockets/v3? app_id =${app_id}`);
```

:::info
`app_id = 1089` යනු පරීක්ෂණ කටයුතු සඳහා පමණි. නිෂ්පාදන පරිසරයක් මත ඔබේ යෙදුම නිකුත් කරන විට කරුණාකර එය ඔබේම app_id සමඟ යාවත්කාලීන කරන්න. කරුණාකර පරීක්ෂා කරන්න [මෙම මාර්ගෝපදේශය] (/docs/setting-up-a-deriv-application) ඔබම සඳහා නව යෙදුමක් නිර්මාණය කිරීම සඳහා.
:::

මෙම අවස්ථාවේදී, අපි `වෙබ්සොකට් සේවාදායකයට සම්බන්ධ වී සිටිමු. නමුත්, අපට කිසිදු දත්තයක් ලැබෙන්නේ නැත. දත්ත යැවීමට හෝ ලැබීමට අපට <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">වෙබ්සොකට් සිදුවීම්</a>වලට `Subscribe\` කළ යුතුව ඇත.

සාමාන්යයෙන්, අපට `වෙබ්සොකට් සම්බන්ධතාවන්` හි සිදුවීම් 4 ක් ඇත:

- **වසන්න**:
  වෙබ්සොකට්ටුවක් සමඟ සම්බන්ධතාවයක් වසා දැමූ විට ප්රහාර එල්ල වේ. onclose දේපළ හරහා ද ලබා ගත හැකි ය.
- **open**:
  වෙබ්සොකට් එකක් සමඟ සම්බන්ධතාවයක් විවෘත කරන විට ෆ්රයිඩ් වේ. onopen දේපළ හරහා ද ලබා ගත හැකි ය.
- **පණිවිඩය**:
  වෙබ්සොකට්ටුවක් හරහා දත්ත ලැබුණු විට ෆ්රයිඩ් වේ. onmessage දේපළ හරහා ද ලබා ගත හැකි ය.
- **දෝෂ**:
  සමහර දත්ත යැවීමට නොහැකි වූ විට වැනි දෝෂයක් නිසා වෙබ්සොකට් එකක් සමඟ සම්බන්ධතාවයක් වසා දමා ඇති විට දැවී ඇත. onerror දේපළ හරහා ද ලබා ගත හැකි ය.

අපගේ WebSocket සම්බන්ධතාවය මත මෙම සිදුවීම් සඳහා සිදුවීම් සවන්දෙන්නෙකු එක් කරමු.

```js title="index.js" showLineNumbers
//`open` සිදුවීමට දායක වන්න
WebSocket.addEventListener ('විවෘත', (සිදුවීම) => {
  console.log ('වෙබ් සොකට් සම්බන්ධතාවය ස්ථාපිත: ', සිදුවීම);
});

//`message` සිදුවීමට දායක වන්න
WebSocket.addEventListener (' පණිවිඩය ', (සිදුවීම) => {
  console.log ('සේවාදායකයෙන් ලැබුණු නව පණිවිඩය:', සිදුවීම);


//`close` සිදුවීමට දායක වන්න
WebSocket.addEventListener ('close', (event) => {
  console.log ('වෙබ්සොකට් සම්බන්ධතා වසා ඇත: ', සිදුවීම);
});

//`දෝෂ` සිදුවීමට දායක වන්න
WebSocket.addEventListener (' error ', (event) => {
  console.log ('අපගේ වෙබ්සොකට් සම්බන්ධතාවයේ දෝෂයක් හටගත්ත', සිදුවීම);
});
```

දැන්, අපගේ බ්රවුසරයේ `index.html` ගොනුව විවෘත කර ඔබේ සංවර්ධක කොන්සෝලය පරීක්ෂා කරන්න. ඔබ දැකිය යුත්තේ `WebSocket සම්බන්ධතාවය ස්ථාපිත කෙරුණ` සඳහා වන ලොග් එක පමණි.

### දත්ත යැවීම සහ ලැබීම

අපගේ වෙබ්සොකට් සේවාදායකය <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">පිං/පොන්ග්</a> ක්රියාකාරිත්වය සපයයි. අපගේ ආදර්ශන​ ව්‍යාපෘතිය තුළ දත්ත යැවීමට සහ ලබා ගැනීමට අපි එය භාවිත කරමු. පහත පරිදි `open` සහ `message` සඳහා සිදුවීම් අසන්නන් වෙනස් කරන්න:

:::caution
WebSocket සම්බන්ධතාවයේ `send` ශ්රිතය, ලැබෙන්නේ `string `, `ArrayBuffer`, `Blob`, `TypeDarray` සහ `DataView` පමණි. ඒවා ගැන වැඩිදුර විස්තර [MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) ඔස්සේ කියවන්න පුළුවන්. මෙයින් අදහස් කරන්නේ, අපට `object` යැවීමට අවශ්ය නම්, අපට එය මුලින්ම `JSON.stringify` සමඟ stringify කිරීමට සිදු වේ.
:::

```js title="index.js" showLineNumbers
//`open` සිදුවීමට දායක වන්න
WebSocket.addEventListener ('විවෘත', (සිදුවීම) => {
  console.log ('වෙබ්සොකට් සම්බන්ධතාවය ස්ථාපිත: ', සිදුවීම);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);
});

//`message` සිදුවීමට දායක වන්න
WebSocket.addEventListener ( 'message', (event) => {
  const ReceivedMessage = JSON.parse (event.data);
  console.log ('සේවාදායකයෙන් ලැබුණු නව පණිවිඩය: ', ලැබුණුපණිවිඩය);
});
```

“ලැබුණු පණිවිඩය” වැනි වස්තුවක් වනු ඇත:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: "ping",
  ping: "pong"
}
```

සුභ පැතුම් :tada:

ඔබ මේ දැන් WebSockets සමඟින් ඔබේ පළමු ආදර්ශන ව්‍යාපෘතිය නිර්මාණය කළා.

:::tip
`පිං` ඉල්ලීම බොහෝ දුරට භාවිතා කරනු ලබන්නේ සම්බන්ධතාවය පරීක්ෂා කිරීමට හෝ එය ජීවතුන් අතර තබා ගැනීමට ය.
:::

### WebSocket සම්බන්ධතාවය සජීවීව තබා ගන්න

පෙරනිමියෙන්, `WebSocket සම්බන්ධතා `තත්පර 180\*\* පමණ කාලයක් ඔවුන් අතර ගමනාගමනයක් නොයැවූ විට වසා දැමෙනු ඇත. සම්බන්ධතාවය ජීවතුන් අතර තබා ගැනීමට එක් ක්රමයක් වනුයේ [ping] (/api-explorer #ping) ඉල්ලීම් **තත්පර 120** ක කාල පරාසයන් සහිතව යැවීමයි. මෙමඟින් සම්බන්ධතාවය සජීවීව සහ සක්‍රීයව තබා ගනී.

සරල සැකසුම් උදාහරණයක් පහත පරිදි වේ:

```js title="index.js" showLineNumbers
const ping_interval = 12000;//එය මිලිතත්පර වලින්, එය තත්පර 120 ට සමාන වේ
ඉඩ පරතරය;
WebSocket.addEventListener ('විවෘත', (සිදුවීම) => {
  console.log ('websocket සම්බන්ධතාවය ස්ථාපිත: ', සිදුවීම);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);

  //සම්බන්ධතාවය ජීවතුන් අතර තබා ගැනීමට
  interval = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//`වසී` සිදුවීමට දායක වන්න
WebSocket.addEventListener ('close', (event) => {
  console.log ('වෙබ්සොකට් සම්බන්ධීකරණය වසා ඇත: ', සිදුවීම);
  clearInterval (පරතරය);
});
```

දැන්, සම්බන්ධතාවය `ස්ථාපිත වූ විට, `12000ms`කාල පරාසයන් සහිතව`ping\` ඉල්ලීම් යැවීම ආරම්භ කරමු.

ඔබේ අවසාන කේතය විය යුත්තේ:

```js title="index.js" showLineNumbers
const app_id = 1089;//ඔබගේ app_id සමඟ ප්රතිස්ථාපනය කරන්න හෝ පරීක්ෂා කිරීම සඳහා 1089 ලෙස තබන්න.
const websocket = නව වෙබ්සොකට් (`wss: //ws.derivws.com/websockets/v3? app_id=${app_id}`);
const ping_interval = 12000;//එය මිලිතත්පර වලින් වේ, එය තත්පර 120 ට සමාන වන
පරතරය ඉඩ;

//` open` සිදුවීම සඳහා දායක වන්න
WebSocket.addEventListener ('විවෘත', (සිදුවීම) => {console.log ('websocket සම්බන්ධතාවය ස්ථාපිත කර ඇත:',
  සිදුවීම);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (SendMessage);

  //සම්බන්ධතාවය ජීවතුන් අතර තබා ගැනීමට
  පරතරය = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//`message` සිදුවීමට දායක වන්න
WebSocket.addEventListener ('පණිවිඩය', (සිදුවීම) => {
  const receivedMessage = JSON.parse (event.data);
  console.log ('සේවාදායකයෙන් ලැබුණු නව පණිවිඩය: ', ReceivedMessage);
}});

//`close` සිදුවීමට දායක වන්න
WebSocket.addEventListener (' close', (event) => {
  console.log ('වෙබ්සොකට් සම්බන්ධතා වසා ඇත: ', සිදුවීම);
  ClearInterval (interval);
});

//`error` සිදුවීමට දායක වන්න
WebSocket.addEventListener (' error ', (event) => {
  console.log ('අපගේ වෙබ් සොකට් සම්බන්ධතාවයේ දෝෂයක් හටගත්තේ', සිදුවීම);

```
