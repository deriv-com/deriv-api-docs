---
title: WebSocket
hide_title: false
draft: false
sidebar_label: WebSocket
sidebar_position: 0
tags:
  - pojęcie
  - websocket
keywords:
  - aplikacja handlowa
  - protokół websocket
  - połączenia websocket
description: Dowiedz się więcej o protokole WebSocket i połączeniach WebSocket oraz o tym, jak je zintegrować, aby umożliwić wymianę danych w aplikacji handlowej.
---

## Czym są WebSockets?

Protokół „WebSocket” opisany w specyfikacji [RFC 6455] (https://datatracker.ietf.org/doc/html/rfc6455) umożliwia wymianę danych między przeglądarką a serwerem poprzez trwałe połączenie. Dane mogą być przekazywane w obu kierunkach jako „pakiety” bez przerywania połączenia lub potrzeby dodatkowych żądań HTTP.

WebSocket doskonale nadaje się szczególnie do usług wymagających ciągłej wymiany danych, np. systemów transakcyjnych w czasie rzeczywistym i tak dalej.

## Prosty przykład

Aby otworzyć połączenie WebSocket, musimy utworzyć `new WebSocket` używając specjalnego protokołu `ws`lub `wss` w adresie URL. Oto jak możesz to zrobić w „JavaScript”:

```js
let socket = nowy WebSocket ('wss: //ws.derivws.com/websockets/ v3?app_id=1089 ');
```

:::caution
Using `wss://` is always the better choice. The `wss://` protocol is not only encrypted, but also more reliable.

Z drugiej strony dane `ws: //` nie są szyfrowane i mogą być widoczne dla pośredników. Stare serwery proxy mogą napotkać „dziwne” nagłówki i zakończyć połączenie.

`wss: //` oznacza WebSocket over TLS, podobnie jak HTTPS to HTTP over TLS. Dzięki warstwie bezpieczeństwa transportu dane są szyfrowane przez nadawcę i odszyfrowane przez odbiorcę. Oznacza to, że zaszyfrowane pakiety danych mogą pomyślnie przechodzić przez serwery proxy bez kontroli.
::

Po utworzeniu gniazda powinniśmy słuchać wydarzeń na nim. W sumie są 4 wydarzenia:

- Otwarte — nawiązano połączenie
- Wiadomość — Otrzymane dane
- Błąd - błąd WebSocket
- Zamknij — połączenie zamknięte

Wysłanie wiadomości można wykonać za pośrednictwem socket.send (dane).

Oto przykład w „JavaScript”:

```js showLineNumbers
const app_id = 1089;//Zastąp na swój app_id lub pozostaw jako 1089 do testowania.
const socket = new WebSocket (`wss: //ws.derivws.com/websockets/v3? app_id=${app_id}`);

socket.onopen = function (e) {
  console.log ('[open] Połączenie ustanowione');
  console.log ('Wysyłanie do serwera');
  const sendMessage = JSON.stringify ({ ping: 1 });
  socket.send (sendMessage);
};

socket.onmessage = function (event) {
  console.log (`[message] Dane otrzymane z serwera: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    consloe.log (`[close] Połączenie zamknięte czysto, code=${event.code} powód =${event.reason}`);
  } else {
    //np. zabity proces serwera lub wyłączenie sieci
    //event.code zwykle wynosi 1006 w tym przypadku
    console.log ('[close] Connection died');
  }
};

socket.onerror = function (error) {
  console.log (` [error] `);
};
```

## Dlaczego potrzebujemy WebSockets i kiedy powinniśmy ich unikać?

WebSockets to niezbędne narzędzie komunikacji klient-serwer. Aby jak najlepiej wykorzystać ich potencjał, ważne jest, aby zrozumieć, w jaki sposób mogą być pomocne i kiedy najlepiej ich unikać. Jest to obszernie wyjaśnione w następnej sekcji.

Użyj WebSockets w następujących przypadkach:

1. ‍Kiedy tworzysz aplikację internetową w czasie rzeczywistym.
   Najbardziej powszechnym użyciem WebSocket jest tworzenie aplikacji w czasie rzeczywistym, w którym pomaga on w ciągłym wyświetlaniu danych na końcu klienta. Ponieważ serwer zaplecza wysyła te dane w sposób ciągły, WebSocket umożliwia nieprzerwane przesyłanie lub przesyłanie tych danych w już otwartym połączeniu. Korzystanie z WebSockets sprawia, że taka transmisja danych jest szybka i wykorzystuje wydajność aplikacji.
2. Dla witryn handlowych, takich jak Deriv.
   W tym przypadku WebSocket pomaga w obsłudze danych, które są uruchamiane przez wdrożony serwer zaplecza do klienta.
3. ‍ Podczas tworzenia aplikacji czatu.
   Twórcy aplikacji do czatu wzywają WebSockets, aby uzyskać pomoc w operacjach takich jak jednorazowa wymiana i publikowanie/nadawanie wiadomości. Ponieważ to samo połączenie WebSocket jest używane do wysyłania/odbierania wiadomości, komunikacja staje się łatwa i szybka.

Teraz, gdy ustaliliśmy, gdzie należy używać WebSockets, zobaczmy, gdzie najlepiej ich unikać. Pomoże Ci to uniknąć niepotrzebnych kłopotów operacyjnych.

WebSockets nie powinien być wbudowany, gdy wszystko, co jest potrzebne, to pobieranie starych danych lub danych, które mają być przetwarzane tylko raz. W takich przypadkach korzystanie z protokołów HTTP jest mądrym wyborem.

## WebSocket vs HTTP

Ponieważ zarówno protokoły HTTP, jak i WebSocket są wykorzystywane do komunikacji aplikacji, ludzie często się mylą i trudno im wybrać jeden.

Jak wspomniano wcześniej, WebSocket jest protokołem ramkowym i dwukierunkowym. Z drugiej strony HTTP jest protokołem jednokierunkowym działającym powyżej protokołu TCP.

Ponieważ protokół WebSocket jest w stanie obsługiwać ciągłą transmisję danych, jest głównie używany w tworzeniu aplikacji w czasie rzeczywistym. HTTP jest bezpaństwowcem i jest używany do tworzenia aplikacji [RESTful] (https://de.wikipedia.org/wiki/Representational_State_Transfer) i [SOAP] (https://de.wikipedia.org/wiki/SOAP). SOAP nadal może używać HTTP do implementacji, ale REST jest szeroko rozpowszechniony i używany.

W WebSocket komunikacja odbywa się na obu końcach, co czyni go szybszym protokołem. W HTTP połączenie jest zbudowane na jednym końcu, co czyni go nieco powolniejszym niż WebSocket.

WebSocket korzysta z ujednoliconego połączenia TCP i potrzebuje jednej strony do zakończenia połączenia. Dopóki tak się nie stanie, połączenie pozostaje aktywne. HTTP musi zbudować odrębne połączenie dla oddzielnych żądań. Po zakończeniu żądania połączenie automatycznie się przerywa.

## Jak ustanawiane są połączenia WebSocket?

Proces rozpoczyna się od uścisku dłoni WebSocket, który obejmuje użycie nowego schematu (ws lub wss). Aby pomóc Ci zrozumieć, uznaj je odpowiednio za równoważne HTTP i bezpiecznym HTTP (HTTPS).

Korzystając z tego schematu, oczekuje się, że serwery i klienci będą przestrzegać standardowego protokołu połączenia WebSocket. Ustanowienie połączenia WebSocket rozpoczyna się od aktualizacji żądania HTTP, które zawiera kilka nagłówków, takich jak Połączenie: Aktualizacja, Aktualizacja: WebSocket, SEC-WebSocket- Key i tak dalej.

Oto jak nawiązuje się to połączenie:

1. \*\*Żądanie: \*\* Nagłówek Uaktualnienia połączenia oznacza uścisk dłoni WebSocket, podczas gdy klucz SEC WebSocket zawiera losową wartość zakodowaną w Base64. Wartość ta jest dowolnie generowana podczas każdego uścisku dłoni WebSocket. Oprócz powyższego, nagłówek klucza jest również częścią tego żądania.

Wyżej wymienione nagłówki po połączeniu tworzą żądanie HTTP GET. Będzie on zawierał podobne dane:

```
GET ws: //websocketexample.com:8181/ HTTP/1.1
Host: localhost:8181
Połączenie: Aktualizacja
Pragma: brak pamięci podręcznej
Kontrola pamięci podręcznej: bez pamięci podręcznej
Aktualizacja: websocket
SEC-WebSocket-Version: 13
SEC-WebSocket-key: b6gjht32u488lpurwkaows==
```

Aby wyjaśnić wersję SEC-WebSocket, można wyjaśnić wersję protokołu WebSocket gotową do użycia dla klienta.

2. \*\*Odpowiedź: \*\* Nagłówek odpowiedzi, SEC-WebSocket-Accept, zawiera resztę wartości przesłanej w nagłówku żądania klucza SEC-WebSocket-key. Jest to związane z określoną specyfikacją protokołu i jest szeroko stosowane do powstrzymania wprowadzających w błąd informacji. Innymi słowy, zwiększa bezpieczeństwo interfejsu API i zapobiega tworzeniu błędów w tworzeniu aplikacji źle skonfigurowanych serwerów.

Po powodzeniu wysłanego wcześniej żądania otrzymamy odpowiedź podobną do poniższej sekwencji tekstowej:

```
Protokoły przełączania HTTP/1.1 101
Aktualizacja: websocket
Połączenie: Aktualizacja
SEC-WebSocket-Accept: RG8WSSWMHTJ85LJGAE3M5RTMCCE=
```

## Referencje

- \*\* [Interfejsy API WebSockets - MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) \*\*
- \*\* [WebSocket - Informacje Javascript] (https://javascript.info/websocket) \*\*
