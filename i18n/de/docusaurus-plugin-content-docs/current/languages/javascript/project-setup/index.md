---
title: Projekt einrichten | JavaScript
sidebar_label: Projekt einrichten
sidebar_position: 0
tags:
  - Javascript
keywords:
  - js
  - Projekt-Einrichtung
description: Erstellen Sie ein Verzeichnis für Ihr nächstes API-Handelsapplikationsprojekt unter Verwendung eines WebSockets.
---

### Ein Projekt erstellen

Wir werden eine einfache HTML-Seite erstellen, die unsere JavaScript-Datei enthält, die unsere WebSocket-Verbindung verarbeiten wird. Erstellen Sie zunächst ein Verzeichnis für Ihr nächstes Projekt:

```bash
mkdir deriv-websocket-demo
```

Navigieren Sie zum Ordner `deriv-websocket-demo`:

```bash
cd deriv-websocket-demo
```

Als Nächstes erstellen Sie die erforderlichen Dateien, wie Sie unten sehen:

```bash
index.html index.css index.js berühren
```

:::tip
Wir empfehlen die Verwendung von [Visual Studio Code](https://code.visualstudio.com/) mit aktivierter [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Dies wird Ihnen bei der Implementierung sehr helfen.
:::

Öffnen Sie nun die Datei `index.html` oder verwenden Sie die [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Ändern Sie nun den Inhalt der Dateien mit der folgenden Methode:

```js title="index.js" showLineNumbers
console.log('hier erstellen wir unsere Websocket-Verbindung');
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
    <h2>Deriv WebSocket API Demo</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

Nachdem wir den Inhalt hinzugefügt haben, können wir die Anwendung ausführen, indem wir einfach die Datei `index.html` ausführen oder die <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server Extension</a> verwenden. Wenn Sie Ihre Anwendung ausführen, sehen Sie in der Konsole nach, ob die Datei `console.log` angezeigt wird. Dann wissen Sie, dass die JavaScript-Datei funktioniert und die Websocket-Verbindung richtig implementiert werden kann.

Um den Deriv Websocket einzurichten, können Sie die Seite [WebSocket-Verbindung](/docs/languages/javascript/websocket-connection) aufrufen.
