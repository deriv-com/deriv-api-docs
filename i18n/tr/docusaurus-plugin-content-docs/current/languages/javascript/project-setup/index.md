---
title: Proje kurulumu | JavaScript
sidebar_label: Proje kurulumu
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - proje kurulumu
description: WebSocket kullanarak bir sonraki API ticaret uygulaması projeniz için bir dizin oluşturun.
---

### Bir proje oluşturun

WebSocket bağlantımızı idare edecek JavaScript dosyamızı içeren basit bir `HTML` sayfası oluşturacağız. İlk olarak, bir sonraki projeniz için bir dizin oluşturun:

```bash
mkdir deriv-websocket-demo
```

`deriv-websocket-demo` klasörüne gidin:

```bash
cd deriv-websocket-demo
```

Ardından, aşağıda gördüğünüz gibi gerekli dosyaları oluşturun:

```bash
touch index.html index.css index.js
```

:::tip
Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) etkinleştirilmiş olarak [Visual Studio Code](https://code.visualstudio.com/) kullanmanızı öneririz. Bu, uygulamalarda size çok yardımcı olacaktır.
:::

Şimdi, `index.html` dosyasını açın veya [Live Server Extension] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) kullanın.

Şimdi, aşağıdaki yaklaşımı kullanarak dosyaların içeriğini değiştirin:

```js title="index.js" showLineNumbers
console.log('websocket bağlantımızı burada oluşturacağız');
```

```html title="index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deriv HTML JS Demo</title>
  </head>
  <body>
    <h2>Deriv WebSocket API demosu</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

İçeriği ekledikten sonra, uygulamayı sadece `index.html` dosyasını çalıştırarak veya <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server Extension</a> kullanarak çalıştırabiliriz. Uygulamanızı çalıştırırken, konsolda `console.log`un görünüp görünmediğine bakın. O zaman JavaScript dosyasının çalıştığını bilirsiniz, böylece websocket bağlantısı düzgün bir şekilde uygulanabilir.

Deriv websocket kurulumu için [WebSocket connection](/docs/languages/javascript/websocket-connection) sayfasına geçebilirsiniz.
