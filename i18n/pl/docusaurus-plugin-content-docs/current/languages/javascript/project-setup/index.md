---
title: Konfiguracja projektu | JavaScript
sidebar_label: Konfiguracja projektu
sidebar_position: 0
tags:
  - javascript
keywords:
  - js
  - project-setup
description: Utwórz katalog dla następnego projektu aplikacji handlowej API za pomocą WebSocket.
---

### Utwórz projekt

Zamierzamy utworzyć prostą stronę `HTML` zawierającą nasz plik JavaScript, który poradzi sobie z naszym połączeniem WebSocket. Najpierw utwórz katalog dla następnego projektu:

```bash
mkdir deriv-websocket-demo
```

Przejdź do folderu `deriv-websocket-demo`:

```bash
cd deriv-websocket-demo
```

Następnie utwórz wymagane pliki, jak widać poniżej:

```bash
touch index.html index.css index.js
```

:::tip
Sugerujemy użycie [Visual Studio Code] (https://code.visualstudio.com/) z włączonym [Live Server Extension] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). To bardzo pomoże w implementacjach.
:::

Teraz otwórz plik `index.html` lub użyj [Live Server Extension] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Teraz zmień zawartość plików za pomocą następującego podejścia:

```js title="index.js" showLineNumbers
console.log („tutaj utworzymy nasze połączenie z websocket”);
```

```html title="index.html" showLineNumbers
<DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deriv HTML JS Demo</title>
  </head>
  <body>
    <h2>Deriv WebSocket API demo</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Po dodaniu zawartości możemy uruchomić aplikację, po prostu wykonując plik `index.html` lub używając <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server Extension</a>. Podczas uruchamiania aplikacji sprawdź w konsoli, czy pojawia się „console.log”. Wtedy wiesz, że plik JavaScript działa, aby połączenie websocket można poprawnie zaimplementować.

W celu skonfigurowania gniazda internetowego Deriv można przejść do strony [Połączenie WebSocket] (/docs/languages/javascript/websocket-connection).
