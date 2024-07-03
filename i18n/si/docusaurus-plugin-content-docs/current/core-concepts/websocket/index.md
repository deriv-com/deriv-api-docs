---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - සංකල්පය
  - websocket
keywords:
  - ගනුදෙනු යෙදුම
  - වෙබ් සොකට් ප්රොටෝකෝලය
  - වෙබ්සොකට් සම්බන්ධතා
description: WebSocket ප්‍රොටෝකෝලය සහ WebSocket සම්බන්ධතා සහ ඒවා ඒකාබද්ධ කරන ආකරාය ඉගෙන ගන්න එවිට ඔබට ඔබේ ගනුදෙනු යෙදුමේ දත්ත හුවමාරු සක්‍රීය කළ හැකිය.
---

## WebSocket යනු මොනවාද?

[RFC 6455] (https://datatracker.ietf.org/doc/html/rfc6455) පිරිවිතරයේ විස්තර කර ඇති `WebSocket` ප්රොටෝකෝලය, නොනැවතී සම්බන්ධතාවයක් හරහා බ්රවුසරය සහ සේවාදායකය අතර දත්ත හුවමාරු කර ගැනීමට ක්රමයක් සපයයි. සම්බන්ධතාවය බිඳ දැමීමකින් තොරව හෝ අතිරේක HTTP ඉල්ලීම් අවශ්‍ය නොවී "packets" ලෙස දෙපැත්තටම දත්ත යැවිය හැක.

අඛණ්ඩ දත්ත හුවමාරුව අවශ්‍ය වන සේවා සඳහා WebSocket විශේෂයෙන් ගැළපෙයි, උදා. තත්‍ය කාලීන ගනුදෙනු පද්ධති යනාදිය.

## සරල උදාහරණයක්

WebSocket සම්බන්ධතාවයක් විවෘත කිරීම සඳහා, අපි url එකේ ඇති විශේෂ ප්රොටෝකෝලය `ws`හෝ `wss` භාවිතා කරමින් `new WebSocket` නිර්මාණය කළ යුතුයි. “ජාවාස්ක්රිප්ට්” හි ඔබට එය කළ හැකි ආකාරය මෙන්න:

```js
let socket = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

අනෙක් අතට, `ws: //` දත්ත සංකේතාත්මක නොවන අතර අතරමැදියන්ට දෘශ්යමාන විය හැකිය. පැරණි ප්‍රොක්සි සේවාදායකයන්ට "අමුතු" ශීර්ෂ හමු වී සම්බන්ධතාවය අවසන් විය හැක.

`wss: //` යනු ටීඑල්එස් හරහා වෙබ්සොකට් සඳහා අදහස් දක්වයි, HTTPS යනු ටීඑල්එස් හරහා HTTP වන ආකාරය හා සමාන වේ. ප්‍රවාහන ආරක්ෂණ ස්ථරය සමඟ, දත්ත යවන්නා විසින් සංකේතනය කර ග්‍රාහකයා විසින් විකේතනය කරනු ලැබේ. මෙයින් අදහස් කරන්නේ සංකේතනය කරන ලද දත්ත පැකට්වලට පරීක්ෂා කිරීමකින් තොරව ප්‍රොක්සි හරහා සාර්ථකව ගමන් කළ හැකි බවයි.
:::

Socket එක නිර්මාණය කළ පසු, අපි එහි සිදුවීම්වලට සවන් දිය යුතු ය. සිදුවීම් 4 ක් ඇත:

- විවෘතයි - සම්බන්ධතාවය ස්ථාපිත කර ඇත
- පණිවුඩය - දත්ත ලැබී ඇත
- දෝෂය - WebSocket දෝෂයකි
- වසන්න - සම්බන්ධතාවය වසා ඇත

පණිවුඩ​යක් යැවීම socket.send(data) හරහා සිදු කළ හැක.

මෙන්න “ජාවාස්ක්රිප්ට්” හි උදාහරණයක්:

```js showLineNumbers
const app_id = 1089;//ඔබගේ app_id සමඟ ප්රතිස්ථාපනය කරන්න හෝ පරීක්ෂා කිරීම සඳහා 1089 ලෙස තබන්න.
const සොකට් = නව වෙබ්සොකට් (`wss: //ws.derivws.com/websockets/v3? app_id =${app_id}`);

socket.onopen = කාර්යය (ඉ) {
  console.log ('[විවෘත] සම්බන්ධතාවය ස්ථාපිත කෙරුණ');
  console.log ('සේවාදායකයට යැවීම');
  const sendMessage = JSON.stringify ({ ping: 1 });

};

socket.onmessage = කාර්යය (සිදුවීම) {
  console.log (`[පණිවිඩය] සේවාදායකයෙන් ලැබුණු දත්ත: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    consloe.log (`[වසා] සම්බන්ධතාවය පිරිසිදුව වසා ඇත, කේතය =${event.code} හේතුව =${event.reason}`);
  } else {
    //උදා: සේවාදායකය ක්රියාවලිය මරා හෝ ජාලය පහළ
    //event.code සාමාන්යයෙන් 1006 වේ මෙම නඩුවේ
    console.log ('[කිට්ටු] සම්බන්ධතාවය මිය ගියා');
  }
};

socket.onerror = කාර්යය (දෝෂය) {
  console.log (` [දෝෂය] `);
};
```

## අපට WebSockets අවශ්‍ය වන්නේ ඇයි සහ අප එය භාවිත කිරීමෙන් වැළකිය යුත්තේ කුමන අවස්ථාවලදී ද?

WebSockets අත්‍යවශ්‍ය සේවාලාභි-සේවාදායක සන්නිවේදන මෙවලමකි. ඔවුන්ගේ හැකියාවන්ගෙන් උපරිම ප්‍රයෝජන ගැනීම සඳහා, ඒවා ප්‍රයෝජනවත් විය හැකි ආකාරය සහ ඒවා භාවිත කිරීමෙන් වැළකී සිටිය යුතු අවස්ථා අවබෝධ කර ගැනීම වැදගත්ය. එය ඊළඟ කොටසේ පුළුල් ලෙස විස්තර කෙරේ.

පහත අවස්ථාවලදී WebSockets භාවිත කරන්න:

1. ඔබ තත්‍ය කාලීන වෙබ් යෙදුමක් සංවර්ධනය කරන විට.
   WebSocket හි වඩාත් සාමාන්‍ය භාවිත අවස්ථාව වන්නේ තත්‍ය කාලීන යෙදුම් සංවර්ධනය කිරීමයි; එය සේවාදායක අන්තයේ දත්ත අඛණ්ඩව ප්‍රදර්ශනය කිරීමට සහාය වේ. පසු-අන්ත සේවාදායකය මෙම දත්ත අඛණ්ඩව ආපසු යවන බැවින්, WebSocket එකක් මඟින් දැනටමත් විවෘතව ඇති සම්බන්ධතාවය තුළ මෙම දත්ත බාධාවකින් තොරව තල්ලු කිරීමට හෝ සම්ප්‍රේෂණය කිරීමට ඉඩ සලසයි. WebSockets භාවිතය එවැනි දත්ත සම්ප්‍රේෂණය ඉක්මන් කරන අතර යෙදුමේ ක්‍රියාකාරිත්වය උත්තේජනය කරයි.
2. Deriv වැනි ගනුදෙනු වෙබ් අඩවි සඳහා.
   මෙහිදී, WebSocket සේවාලාභියා වෙත යොදවා ඇති පසු-අන්ත සේවාදායකය මඟින් ප්‍රේරණය වන දත්ත හැසිරවීමට සහාය වේ.
3. කතාබස් යෙදුමක් නිර්මාණය කරන විට.
   කථාබස් යෙදුම් සංවර්ධකයින් එක් වරක් හුවමාරු කිරීම සහ පණිවුඩ ප්‍රකාශ කිරීම/විකාශනය කිරීම වැනි මෙහෙයුම් සඳහා උපකාර ලබා ගැනීමට WebSockets අමතයි. එකම WebSocket සම්බන්ධතාවය පණිවුඩ​ යැවීමට/ලැබීමට භාවිත කරන බැවින්, සන්නිවේදනය පහසු සහ ඉක්මන් වේ.

දැන් අපි WebSockets භාවිත කළ යුත්තේ කොතැනදී ද යන්න තහවුරු කර ඇති බැවින්, එය භාවිත කිරීමෙන් වැළකිය යුත්තේ කොතැනදී දැයි බලමු. මෙය ඔබට අනවශ්‍ය මෙහෙයුම් කරදරවලින් මිදීමට උපකාරී වේ.

අවශ්‍ය වන්නේ පැරණි දත්ත හෝ එක් වරක් පමණක් සැකසිය යුතු දත්ත ලබා ගැනීම පමණක් නම් WebSockets භාවිත නොකළ යුතු ය. මෙම අවස්ථාවලදී, HTTP ප්‍රොටෝකෝල භාවිත කිරීම ඥානවන්ත තේරීමකි.

## WebSocket එදිරිව HTTP

යෙදුම් සන්නිවේදනය සඳහා HTTP සහ WebSocket ප්‍රොටෝකෝල දෙකම භාවිත කරන බැවින්, පරිශීලකයින් බොහෝ විට ව්‍යාකූල වන අතර ඔවුන්ට එකක් තෝරා ගැනීමට අපහසු වේ.

කලින් පැවසූ පරිදි, WebSocket යනු රාමුගත සහ ද්විපාර්ශ්වික ප්‍රොටෝකෝලයකි. අනෙක් අතට, HTTP යනු TCP ප්‍රොටෝකෝලයට ඉහළින් ක්‍රියාත්මක වන ඒක දිශානුගත ප්‍රොටෝකෝලයකි.

WebSocket ප්‍රොටෝකෝලය අඛණ්ඩ දත්ත සම්ප්‍රේෂණයට සහාය වීමට හැකි බැවින්, එය ප්‍රධාන වශයෙන් තත්‍ය කාලීන යෙදුම් සංවර්ධනයේදී භාවිත වේ. HTTP රාජ්ය රහිත වන අතර [RESTful] (https://de.wikipedia.org/wiki/Representational_State_Transfer) සහ [SOAP] (https://de.wikipedia.org/wiki/SOAP) යෙදුම් සංවර්ධනය සඳහා භාවිතා වේ. ක්‍රියාත්මක කිරීම සඳහා SOAP හට තවමත් HTTP භාවිත කළ හැක, නමුත් REST බහුලව ව්‍යාප්ත වී ඇත.

WebSocket හි, සන්නිවේදනය දෙපසටම සිදු වන අතර, එමඟින් එය වේගවත් ප්‍රොටෝකෝලයක් බවට පත් කරයි. HTTP හි, සම්බන්ධතාවය එක් කෙළවරක ගොඩනගා ඇති අතර, එය WebSocket වලට වඩා මඳක් මන්දගාමී වේ.

WebSocket ඒකාබද්ධ TCP සම්බන්ධතාවයක් භාවිත කරන අතර සම්බන්ධතාවය අවසන් කිරීමට එක් පාර්ශ්වයක් අවශ්‍ය වේ. එය සිදු වන තුරු, සම්බන්ධතාවය ක්‍රියාකාරීව පවතී. HTTP වෙනම ඉල්ලීම් සඳහා වෙනම සම්බන්ධතාවයක් ගොඩනගා ගැනීමට අවශ්‍ය වේ. ඉල්ලීම සම්පූර්ණ වූ පසු, සම්බන්ධතාවය ස්වයංක්‍රීයව බිඳී යයි.

## WebSocket සම්බන්ධතා ස්ථාපිත කරන්නේ කෙසේද?

ක්‍රියාවලිය ආරම්භ වන්නේ නව යෝජනා ක්‍රමයක් (ws හෝ wss) භාවිත කිරීම සම්බන්ධ 'WebSocket handshake' සමඟිනි. ඔබට අවබෝධ කර ගැනීමට උපකාර කිරීම සඳහා, ඒවා පිළිවෙලින් HTTP සහ සුරක්ෂිත HTTP (HTTPS) ට සමාන ලෙස සලකන්න.

මෙම යෝජනා ක්‍රමය භාවිත කරමින්, සේවාදායකයින් සහ සේවාලාභීන් සම්මත WebSocket සම්බන්ධතා ප්‍රොටෝකෝලය අනුගමනය කිරීමට බලාපොරොත්තු වේ. WebSocket සම්බන්ධතා පිහිටුවීම ආරම්භ වන්නේ HTTP ඉල්ලීම් උත්ශ්‍රේණිගත කිරීමකින් වන අතර ඊට Connection: Upgrade, Upgrade: WebSocket, Sec-WebSocket- Key යනාදී ශීර්ෂ කිහිපයක් ඇතුළත් වේ.

මෙම සම්බන්ධතාවය ස්ථාපිත කරන ආකාරය මෙන්න:

1. \*\*මෙම ඉල්ලීම: \*\* සම්බන්ධතා උත්ශ්රේණි ශීර්ෂය වෙබ්සොකට් අත්පොත දක්වයි අතර SEC-WebSocket-ප්රධාන විශේෂාංග Base64-කේතනය අහඹු අගය. සෑම WebSocket handshake එකක් තුළම මෙම අගය අත්තනෝමතික ලෙස ජනනය වේ. ඉහත කරුණුවලට අමතරව, යතුරු ශීර්ෂය ද මෙම ඉල්ලීමෙහි කොටසකි.

ඉහත ලැයිස්තුගත කර ඇති ශීර්ෂ ඒකාබද්ධ වූ විට, HTTP GET ඉල්ලීමක් සාදයි. එහි සමාන දත්ත ඇත:

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

Sec-WebSocket-අනුවාදය පැහැදිලි කිරීම සඳහා, සේවාදායකයා සඳහා භාවිත කිරීමට සූදානම් WebSocket ප්‍රොටෝකෝල අනුවාදය පැහැදිලි කළ හැකිය.

2. \*\* ප්රතිචාරය: \*\* ප්රතිචාර ශීර්ෂය, SEC-WebSocket-පිළිගන්න, Sec-WebSocket-යතුරු ඉල්ලීම ශීර්ෂය ඉදිරිපත් වටිනාකම ඉතිරි විශේෂාංග. මෙය විශේෂිත ප්‍රොටෝකෝල පිරිවිතරයක් සමඟ සම්බන්ධ වී ඇති අතර නොමඟ යවන තොරතුරු වළක්වා ගැනීමට බහුලව භාවිත වේ. වෙනත් වචනවලින් කිවහොත්, එය API ආරක්ෂාව වැඩි දියුණු කරන අතර යෙදුම් සංවර්ධනයේදී වැරදි ලෙස වින්‍යාස කර ඇති සේවාදායක මඟින් වැරදි සිදු වීම වළක්වයි.

කලින් යැවූ ඉල්ලීමේ සාර්ථකත්වය මත, පහත සඳහන් පෙළ අනුපිළිවෙලට සමාන ප්‍රතිචාරයක් ලැබෙනු ඇත:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## යොමු

- \*\* [වෙබ්සොකට් ඒපීඅයි - එම්ඩීඑන්] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) \*\*
- \*\* [වෙබ්සොකට් - ජාවාස්ක්රිප්ට් තොරතුරු] (https://javascript.info/websocket) \*\*