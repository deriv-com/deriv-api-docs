---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - Konzept
  - Websocket
keywords:
  - Handels-App
  - Websocket-Protokoll
  - Websocket-Verbindungen
description: Lernen Sie das WebSocket-Protokoll und WebSocket-Verbindungen kennen und erfahren Sie, wie Sie diese integrieren können, um den Datenaustausch in Ihrer Trading App zu ermöglichen.
---

## Was sind WebSockets?

Das in der Spezifikation [RFC 6455] (https://datatracker.ietf.org/doc/html/rfc6455) beschriebene `WebSocket`-Protokoll bietet eine Möglichkeit, Daten zwischen dem Browser und dem Server über eine dauerhafte Verbindung auszutauschen. Die Daten können in beide Richtungen als „Pakete“ übergeben werden, ohne dass die Verbindung unterbrochen wird oder zusätzliche HTTP-Anfragen erforderlich sind.

WebSocket eignet sich besonders gut für Dienste, die einen kontinuierlichen Datenaustausch erfordern, z.B. Echtzeit-Handelssysteme und so weiter.

## Ein einfaches Beispiel

Um eine WebSocket-Verbindung zu öffnen, müssen wir einen neuen WebSocket mit dem speziellen Protokoll "ws" oder "wss" in der Url erstellen. Hier sehen Sie, wie Sie das in `JavaScript` machen können:

```js
let socket = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

Auf der anderen Seite sind die `ws://`-Daten nicht verschlüsselt und können für Zwischenhändler sichtbar sein. Alte Proxyserver stoßen möglicherweise auf „seltsame“ Header und beenden die Verbindung.

Wss://" steht für WebSocket über TLS, ähnlich wie HTTPS für HTTP über TLS steht. Bei der Transportsicherheitsschicht werden die Daten vom Absender verschlüsselt und vom Empfänger entschlüsselt. Das bedeutet, dass verschlüsselte Datenpakete Proxys erfolgreich passieren können, ohne inspiziert zu werden.
:::

Sobald der Socket erstellt ist, sollten wir auf Ereignisse auf diesem Socket hören. Es gibt insgesamt 4 Veranstaltungen:

- Offen - Verbindung hergestellt
- Nachricht - Empfangene Daten
- Fehler - WebSocket-Fehler
- Schließen - Verbindung geschlossen

Das Versenden einer Nachricht kann über socket.send(data) erfolgen.

Hier ist ein Beispiel in `JavaScript`:

```js showLineNumbers
const app_id = 1089; // Ersetzen Sie durch Ihre app_id oder belassen Sie es zum Testen bei 1089.
const socket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

socket.onopen = function (e) {
  console.log('[open] Verbindung hergestellt');
  console.log('An den Server senden');
  const sendMessage = JSON.stringify({ ping: 1 });
  socket.send(sendMessage);
};

socket.onmessage = function (event) {
  console.log(`[message] Daten vom Server empfangen: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    consloe.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // z.B. Serverprozess beendet oder Netzwerk ausgefallen
    // event.code ist in diesem Fall normalerweise 1006
    console.log('[close] Connection died');
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};
```

## Warum brauchen wir WebSockets und wann sollten wir sie vermeiden?

WebSockets sind ein wichtiges Tool für die Client-Server-Kommunikation. Um ihr Potenzial optimal zu nutzen, ist es wichtig zu verstehen, wie sie hilfreich sein können und wann es am besten ist, sie nicht zu verwenden. Dies wird im nächsten Abschnitt ausführlich erklärt.

Verwenden Sie WebSockets in den folgenden Fällen:

1. ‍Wenn Sie eine Echtzeit-Webanwendung entwickeln.
   Am häufigsten wird WebSocket in der Entwicklung von Echtzeitanwendungen verwendet, wo es die kontinuierliche Anzeige von Daten auf der Client-Seite unterstützt. Da der Backend-Server diese Daten kontinuierlich zurücksendet, ermöglicht ein WebSocket das ununterbrochene Schieben oder Übertragen dieser Daten in der bereits geöffneten Verbindung. Die Verwendung von WebSockets macht eine solche Datenübertragung schnell und nutzt die Leistung der Anwendung.
2. Für Handelswebseiten, wie Deriv.
   Hier hilft WebSocket bei der Verarbeitung von Daten, die vom eingesetzten Backend-Server an den Client übermittelt werden.
3. ‍Wenn Sie eine Chat-Anwendung erstellen.
   Entwickler von Chat-Anwendungen rufen WebSockets zu Hilfe, wenn es um Vorgänge wie den einmaligen Austausch und die Veröffentlichung/Broadcasting von Nachrichten geht. Da für das Senden und Empfangen von Nachrichten dieselbe WebSocket-Verbindung verwendet wird, ist die Kommunikation einfach und schnell.

Nachdem wir nun festgestellt haben, wo WebSockets verwendet werden sollten, sehen wir uns an, wo es am besten ist, sie zu vermeiden. Auf diese Weise können Sie sich unnötigen Ärger ersparen.

WebSockets sollten nicht eingesetzt werden, wenn es nur darum geht, alte Daten oder Daten, die nur einmal verarbeitet werden sollen, abzurufen. In diesen Fällen ist die Verwendung von HTTP-Protokollen eine kluge Wahl.

## WebSocket vs. HTTP

Da sowohl HTTP- als auch WebSocket-Protokolle für die Anwendungskommunikation verwendet werden, ist es oft verwirrend und schwierig, sich für eines zu entscheiden.

Wie bereits erwähnt, handelt es sich bei WebSocket um ein gerahmtes und bidirektionales Protokoll. Andererseits ist HTTP ein unidirektionales Protokoll, das oberhalb des TCP-Protokolls funktioniert.

Da das WebSocket-Protokoll eine kontinuierliche Datenübertragung unterstützt, wird es vor allem bei der Entwicklung von Echtzeitanwendungen eingesetzt. HTTP ist zustandslos und wird für die Entwicklung von [RESTful](https://de.wikipedia.org/wiki/Representational_State_Transfer) und [SOAP](https://de.wikipedia.org/wiki/SOAP) Anwendungen verwendet. SOAP kann immer noch HTTP für die Implementierung verwenden, aber REST ist weit verbreitet und wird genutzt.

Bei WebSocket findet die Kommunikation an beiden Enden statt, was es zu einem schnelleren Protokoll macht. Bei HTTP wird die Verbindung an einem Ende aufgebaut, wodurch sie etwas langsamer ist als bei WebSocket.

WebSocket verwendet eine einheitliche TCP-Verbindung und benötigt eine Partei, um die Verbindung zu beenden. Solange dies nicht geschieht, bleibt die Verbindung aktiv. HTTP muss für einzelne Anfragen eine eigene Verbindung aufbauen. Sobald die Anfrage abgeschlossen ist, wird die Verbindung automatisch unterbrochen.

## Wie werden WebSocket-Verbindungen hergestellt?

Der Prozess beginnt mit einem WebSocket-Handshake, bei dem ein neues Schema (ws oder wss) verwendet wird. Zum besseren Verständnis betrachten Sie sie als Äquivalent zu HTTP und sicherem HTTP (HTTPS).

Bei diesem Schema wird von Servern und Clients erwartet, dass sie das Standard-WebSocket-Verbindungsprotokoll verwenden. Der Aufbau einer WebSocket-Verbindung beginnt mit einer HTTP-Anfrage, die eine Reihe von Kopfzeilen enthält, z.B. Connection: Upgrade, Upgrade: WebSocket, Sec-WebSocket-Key, und so weiter.

Hier sehen Sie, wie diese Verbindung hergestellt wird:

1. **Die Anfrage :** Der Header Connection Upgrade bezeichnet den WebSocket-Handshake, während der Sec-WebSocket-Key einen Base64-kodierten Zufallswert enthält. Dieser Wert wird bei jedem WebSocket-Handshake willkürlich erzeugt. Außerdem ist die Kopfzeile des Schlüssels ein Teil dieser Anfrage.

Die oben aufgelisteten Header bilden zusammen eine HTTP-GET-Anfrage. Sie wird ähnliche Daten enthalten:

```
GET ws://websocketexample.com:8181/ HTTP/1.1
Host: localhost:8181
Verbindung: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: b6gjhT32u488lpuRwKaOWs==
```

Um Sec-WebSocket-Version zu verdeutlichen, kann man die für den Client einsatzbereite WebSocket-Protokollversion erklären.

2. **Die Antwort:** Der Antwort-Header, Sec-WebSocket-Accept, enthält den Rest der Werte, die im Sec-WebSocket-Key-Anfrage-Header übermittelt wurden. Dies ist mit einer bestimmten Protokollspezifikation verbunden und wird häufig verwendet, um irreführende Informationen zu verhindern. Mit anderen Worten: Es erhöht die API-Sicherheit und verhindert, dass schlecht konfigurierte Server Fehler bei der Anwendungsentwicklung verursachen.

Wenn die zuvor gesendete Anfrage erfolgreich war, erhalten Sie eine Antwort ähnlich der unten stehenden Textfolge:

```
HTTP/1.1 101 Umschalten von Protokollen
Upgrade: websocket
Verbindung: Upgrade
Sec-WebSocket-Accept: rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

## Referenzen

- \*\* [WebSockets APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)\*\*
- \*\* [WebSocket - Javascript Info](https://javascript.info/websocket)\*\*
