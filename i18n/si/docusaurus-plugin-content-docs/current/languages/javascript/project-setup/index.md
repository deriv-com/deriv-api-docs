---
title: ව්‍යාපෘති සැකසුම | JavaScript
sidebar_label: ව්‍යාපෘති සැකසුම
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - ව්‍යාපෘති සැකසුම
description: WebSocket භාවිතා කරමින් ඔබේ ඊළඟ API වෙළඳ යෙදුම් ව්යාපෘතිය සඳහා නාමාවලියක් සාදන්න.
---

### ව්‍යාපෘතියක් සාදන්න

අපි අපගේ ජාවාස්ක්රිප්ට් ගොනුව අඩංගු සරල `HTML` පිටුවක් නිර්මාණය කිරීමට යන්නේ, එය අපගේ WebSocket සම්බන්ධතාවය හසුරුවනු ඇත. පළමුව, ඔබගේ ඊළඟ ව්‍යාපෘතිය සඳහා නාමාවලියක් සාදන්න:

```bash
mkdir deriv-websocket-demo
```

`deriv-websocket-demo` ෆෝල්ඩරය වෙත යන්න:

```bash
cd deriv-websocket-demo
```

ඊළඟට, ඔබ පහත දකින පරිදි අවශ්‍ය ගොනු සාදන්න:

```bash
touch index.html index.css index.js
```

:::tip
[සජීවී සේවාදායක දිගුව] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) සක්රීය කර ඇති [දෘශ්ය ස්ටුඩියෝ කේතය] (https://code.visualstudio.com/) භාවිතා කිරීමට අපි යෝජනා කරමු. මෙය ක්‍රියාත්මක කිරීම සඳහා ඔබට බොහෝ උපකාර වනු ඇත.
:::

දැන්, `index.html` ගොනුව විවෘත කරන්න හෝ [සජීවී සේවාදායක දිගුව] භාවිතා කරන්න (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

දැන්, පහත ප්‍රවේශය භාවිත කර ගොනුවල අන්තර්ගතය වෙනස් කරන්න:

```js title="index.js" showLineNumbers
console.log ('අපි මෙහි අපගේ වෙබ්සොකට් සම්බන්ධතාවය නිර්මාණය කරන්නෙමු');
```

```html title="index.html" showLineNumbers
<DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ඩෙරිව් එච්ටීඑච්එම්එල් JS ඩෙමෝ</title>
  </head>
  <body>
    <h2>ඩෙරිව් වෙබ්සොකට් ඒපීඅයි ඩිමෝ</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

අන්තර්ගතය එකතු කිරීමෙන් පසු, අපට `index.html` ගොනුව සරලව ක්රියාත්මක කිරීමෙන් හෝ <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server Extension</a>භාවිතා කිරීමෙන් යෙදුම ධාවනය කළ හැකිය. ඔබේ ඇප් එක ධාවනය කරන විට, `console.log` දිස්වන්නේ දැයි කොන්සෝලය තුළ බලන්න. Websocket සම්බන්ධතාවය නිසි ලෙස ක්‍රියාත්මක කළ හැකි වන පරිදි JavaScript ගොනුව ක්‍රියා කරන බව එවිට ඔබ දන්නවා.

ඩෙරිව් වෙබ්සොකට් සැකසීම සඳහා, ඔබට [WebSocket සම්බන්ධතාවය] (/docs/langues/javascript/websocket-connection) පිටුව වෙත ඉදිරියට යා හැකිය.
