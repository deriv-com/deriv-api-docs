---
title: Funktionen der API-Aufrufe
hide_title: false
draft: false
sidebar_label: Funktionen der API-Aufrufe
sidebar_position: 1
tags:
  - Konzept
  - Anrufe
  - Anatomie
keywords:
  - Trading-App
  - Api-Aufrufe
  - api-Beispiel
description: Richten Sie mit der Funktion API-Aufrufe für Ihre Handelsanwendung ein. Anhand von API-Beispielen lernen Sie, wie Sie sich anmelden, Anfragen senden und Antwortdaten erhalten.
---

## Abonnieren und senden

Alle API-Aufrufe verfügen über eine Sendefunktion, um eine Anfrage zu stellen und eine Antwort zu empfangen. Bestimmte API-Aufrufe bieten auch eine Abonnementfunktion, mit der Updates an Ihre Anwendung gesendet werden können, sobald neue Informationen verfügbar sind.

### Abonnieren

Mehrere API-Aufrufe bieten die Funktion `Abonnieren`. Wenn Sie einen API-Aufruf abonnieren, erhalten Sie einen kontinuierlichen Stream von Daten dieses bestimmten API-Aufrufs.

Einige dieser API-Aufrufe werden automatisch abonniert (z.B. [ticks](/api-explorer#ticks)) und einige haben ein optionales Feld `subscribe`. Wenn Sie im Feld `Abonnement` die Zahl `1` übergeben, wird das Abonnement gestartet und der Server sendet die angeforderten Daten so lange, bis Sie das Abonnement mit den API-Aufrufen `Vergessen` oder `Alle vergessen` abbestellen.

Sie können zum Beispiel [Tick History](/api-explorer#ticks_history) aufrufen, um Tick History-Daten zu erhalten. Wenn Sie jedoch die Option `subscribe` zu diesem Aufruf hinzufügen, erhalten Sie die Tick-Historie-Daten, die Sie in der ersten Antwort angefordert haben, und Sie werden weiterhin jedes Mal eine neue Antwort erhalten, wenn ein neuer Tick vom Server für das gegebene Symbol veröffentlicht wird.

In dem Nachrichtenstrom von `subscribe` gibt es ein Feld namens `subscription`. Dies ist die `Stream ID`. Mit dieser ID können Sie den Nachrichtenstrom in Ihrer Logik identifizieren und den Strom mit den API-Aufrufen `Forget` und `Forget All` anhalten.

Die durch API-Aufrufe mit der Funktion `Abonnement` bereitgestellten Daten können als Datenquelle für andere API-Aufrufe und Funktionen verwendet werden.

### Senden

Wenn Sie die API mit der Funktion `Senden` aufrufen, dann sendet der Server die angeforderten Daten nur einmal zurück. Um aktualisierte Daten zu erhalten, müssen Sie den API-Aufruf erneut senden. Normalerweise wird diese Methode verwendet, wenn Sie andere Antworten auf API-Aufrufe oder UI-Ereignisse wie `Click`, `Scroll` und andere erhalten.

### Vergessen

Wenn Sie den von `subscribe` erzeugten Nachrichtenstrom stoppen möchten, müssen Sie den API-Aufruf `Forget` mit der richtigen `Stream ID` aufrufen. Andernfalls können Sie den API-Aufruf `Alles vergessen` verwenden, um Streams nach ihrem `Methodennamen` zu stoppen.

:::caution
Weitere Informationen über den API-Aufruf `Forget` finden Sie unter [Forget](/api-explorer#forget) und [Forget All](/api-explorer#forget_all) im API-Explorer.
:::

## Daten anfordern

Um Ihnen die Bearbeitung des Anfrage- und Antwortflusses Ihrer WebSocket-Verbindung zu erleichtern, folgt jeder Deriv WebSocket-API-Aufruf einer standardisierten Struktur. Sie können es für Caching, Validierung, Anfrage- und Antwortsynchronisierung verwenden.

#### Name der API-Aufrufmethode

Jede Anfrage in der WebSocket-API enthält ein Feld `Methodenname`, das als eindeutiger Bezeichner für die Anfrage dient. In den meisten Fällen wird dieser `Methodenname` einen numerischen Wert von `1` erhalten. Es gibt jedoch einige Fälle, in denen die Identifier-Eigenschaft einen Zeichenfolgenwert haben kann.

:::caution
API Call Method Name ist immer erforderlich. Dieses Feld bestimmt die Daten, die Sie von unserem WebSocket-Server erhalten.
:::

### Erforderliche Felder

Alle Anfragedaten enthalten Pflichtfelder, die Sie angeben müssen, und sie können auch optionale Felder enthalten. Lassen Sie uns dies anhand eines Beispiels von `Residence List` untersuchen.

Ein Aufruf von `Residence List` gibt eine Liste von Ländern und 2-Buchstaben-Ländercodes zurück, die für das Ausfüllen des Kontoeröffnungsformulars geeignet sind.

Die Anforderungsdaten für diesen Anruf lauten wie folgt:

```ts showLineNumbers
{
  residence_list: 1; // Api Call Method Name
  passthrough?: object; // Optional
  req_id?: number; // Optional
}
```

Das Feld `Residence_list` ist der `Methodenname` für den Aufruf und ist erforderlich. Möglicherweise gibt es weitere Pflichtfelder für diese Art der Anfrage, die Sie senden möchten. Um mehr über `Residence List` und andere API-Aufrufe zu erfahren, sehen Sie sich diese bitte im [API Explorer](/api-explorer#residence_list) an.

### Optionale Felder

Jeder Aufruf hat auch mehrere `Optional`-Felder. Passthrough" und "req_id" sind immer Teil der Anfragedaten, aber Sie können sich dafür entscheiden, sie nicht zu verwenden.

#### Das Feld `Passthrough`

Was auch immer Sie in dieses Feld eingeben, wird in einem `Response'-Objekt an Sie zurückgegeben. Dies kann hilfreich sein, wenn Sie einen zustandsbehafteten Fluss für Ihre `Anfragen`und`Antworten\` simulieren müssen.

#### Das Feld `req_id`.

Möglicherweise müssen Sie Ihre Anfragen "taggen" und sie durch unsere "WebSocket"-Aufrufe leiten. Sie können dies tun, indem Sie diesem Feld eine "Zahl" übergeben. Es kann hilfreich sein, wenn Sie `Anfragen` auf `Antworten` zuordnen müssen.

:::caution
Weitere optionale Felder, die für jeden API-Aufruf spezifisch sind, finden Sie in unserem [API Explorer](/api-explorer).
:::

## Antwortdaten

Wenn Sie die Antwort auf den Aufruf erhalten, gibt es ein `Feld` mit demselben Namen wie der `Methodenname`, das die eigentlichen Daten enthält.

Die Antwort für den Aufruf `Residenzliste`:

```js showLineNumbers
{
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  residence_list: [
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
                                "display_name": "Führerschein"
                            }
                        },
                        "is_country_supported": 0
                    }
                }
            },
            "phone_idd": "35818",
            "text": "Aland Inseln",
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
                                "display_name": "Führerschein"
                            },
                            "national_identity_card": {
                                "display_name": "Nationale Identitätskarte"
                            },
                            "passport": {
                                "display_name": "Reisepass"
                            }
                        },
                        "is_country_supported": 1
                    }
                }
            },
            "phone_idd": "355",
            "text": "Albanien",
            "tin_format": [
                "^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"
            ],
            "value": "al"
        },
        // ....
  ],
};
```

Hier ist `residence_list` der `Methodenname` und enthält die eigentlichen Daten, die Sie angefordert haben. Um es kurz zu halten, haben wir den Rest des Arrays nicht aufgenommen. Sie können die aktuelle Antwort [hier](/api-explorer#residence_list) überprüfen.

#### Das Feld `echo_req`

Dieses `Feld` enthält die genauen `Anfragedaten`, die Sie an den Server gesendet haben.

#### Das Feld `msg_type`.

Mit Hilfe dieses Feldes können Sie feststellen, welche Daten Sie über das Nachrichtenereignis der WebSocket-Verbindung erhalten. Ihr `onmessage`-Ereignishandler für Ihre WebSocket-Verbindung in `JavaScript` würde zum Beispiel so aussehen:

```js showLineNumbers
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);

  switch (receivedMessage.msg_type) {
    case "residence_list":
      console.log("Die Aufenthaltsliste ist : ",receivedMessage.residence_list)
      break;
    case "other_request_identifier"
      console.log("die Antwort", receivedMessage.some_other_request_identifier)
    default:
      console.log("receivedMessage", receivedMessage)
      break;
  }
}
```

#### Das Feld `req_id`.

Dies ist das `Optional`, das an die `Request Data` übergeben wird. Sie können es für `Validierung`, `Synchronisierung`, `Caching`, etc. verwenden.

:::tip
Der "msg_type" ist immer in den Antwortdaten enthalten.
:::
