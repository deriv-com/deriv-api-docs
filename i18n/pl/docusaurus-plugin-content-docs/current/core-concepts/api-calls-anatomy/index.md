---
title: Funkcje wywołań API
hide_title: false
draft: false
sidebar_label: Funkcje wywołań API
sidebar_position: 1
tags:
  - pojęcie
  - zgłoszenia
  - anatomia
keywords:
  - aplikacja handlowa
  - wywołania api
  - Przykład api
description: Skonfiguruj wywołania API dla swojej aplikacji handlowej za pomocą funkcji wywołania API. Dzięki przykładom interfejsu API naucz się subskrybować, wysyłać żądania i otrzymywać dane odpowiedzi.
---

## Subskrybuj i wyślij

Wszystkie wywołania API mają funkcję wysyłania do składania żądania i otrzymywania odpowiedzi. Niektóre połączenia API oferują również funkcję subskrypcji umożliwiającą wysyłanie aktualizacji do aplikacji, gdy pojawią się nowe informacje.

### Subskrybuj

Kilka wywołań API zapewnia funkcjonalność „subskrybuj”. Kiedy subskrybujesz połączenie API, otrzymasz ciągły strumień z danych tego konkretnego wywołania API.

Niektóre z tych wywołań API automatycznie subskrybują się (np. [ticks] (/api-explorer #ticks)), a niektóre mają opcjonalne pole `subskrypcji`. Jeśli przekażesz „1” do pola „subskrybuj”, subskrypcja rozpocznie się, a serwer będzie nadal wysyłał żądane dane, dopóki nie zrezygnujesz z subskrypcji, wywołując wywołania API „Zapomnij” lub „Zapomnij o wszystkim'.

Na przykład można wywołać [Tick History] (/api-explorer #ticks_history), aby otrzymać dane historii zaznaczenia. Ale kiedy dodasz opcję „subskrybuj” do tego połączenia, otrzymasz dane historii zaznaczeń, które poprosiłeś w pierwszej odpowiedzi, i będziesz nadal otrzymywać nową odpowiedź za każdym razem, gdy serwer opublikuje nowy zaznaczenie dla danego symbolu.

W strumieniu wiadomości z `subskrypcja` znajduje się pole o nazwie `subskrypcja`. To jest „Stream ID”. Za pomocą tego identyfikatora możesz zidentyfikować strumień wiadomości w swojej logice i zatrzymać strumień za pomocą wywołań API „Zapomnij” i „Zapomnij o wszystkim”.

Dane dostarczane przez wywołania API z funkcją „subskrybuj” mogą być wykorzystywane jako źródło danych dla innych wywołań i funkcji API.

### Wyślij

Jeśli wywołasz interfejs API z funkcją „send”, serwer odesła żądane dane tylko raz. Aby uzyskać zaktualizowane dane, musisz ponownie wysłać wywołanie API. Zwykle ta metoda jest używana, gdy otrzymujesz inne odpowiedzi wywołania API lub zdarzenia interfejsu użytkownika, takie jak `Click`, `Scroll` i inne.

### Zapomnij

Jeśli chcesz zatrzymać strumień wiadomości utworzony przez `subskrypcja`, będziesz musiał wywołać wywołanie API `Forget` z prawidłowym `Stream ID`. W przeciwnym razie możesz użyć wywołania API `Zapomnij wszystkie', aby zatrzymać strumienie według ich `nazwy metody\\\\\`.

:::caution
Aby uzyskać więcej informacji na temat wywołania API „Forget”, zajrzyj do [Forget] (/api-explorer #forget) i [Forget All] (/api-explorer #forget_all) w eksploratorze API.
:::

## Żądanie danych

Aby ułatwić obsługę przepływu żądań i odpowiedzi połączenia WebSocket, każde wywołanie interfejsu API Deriv WebSocket ma znormalizowaną strukturę. Można go używać do buforowania, sprawdzania poprawności, synchronizacji żądań i odpowiedzi.

#### Nazwa metody wywołania API

Każde „żądanie” w interfejsie API WebSocket zawiera pole `nazwa metody „, które służy jako unikalny identyfikator żądania. W większości przypadków ta „nazwa metody” otrzyma wartość liczbową `1\\\\\`. Istnieją jednak przypadki, w których właściwość identyfikatora może mieć wartość ciągu znaków.

:::caution
Nazwa metody wywołania API jest zawsze wymagana. To pole określa dane, które otrzymasz z naszego serwera WebSocket.
:::

### Wymagane pola

Każde dane żądania zawiera obowiązkowe pola, które musisz podać, a także mogą zawierać pola opcjonalne. Zbadajmy to na przykładzie z „Lista rezydencji”.

Połączenie „Lista zamieszkania” zwraca listę krajów i 2-literowe kody krajów, odpowiednie do wypełnienia formularza otwarcia konta.

Dane dotyczące żądania tego zaproszenia są następujące:

```ts showLineNumbers
{
  residence_list: 1; // Nazwa metody wywoływania Api
  passthrough?: object; // Opcjonalnie
  req_id?: number; // Opcjonalnie
}
```

Pole `lista_rezydencja' jest `nazwą metody „dla wywołania i jest wymagane. Mogą istnieć inne wymagane pola związane z tym typem żądania, które chcesz wysłać. Aby dowiedzieć się więcej o „Lista rezydencji” i innych wywołaniach API, sprawdź je w [API Explorer] (/api-explorer #residence_list).

### Pola opcjonalne

Każde połączenie ma również kilka pól „opcjonalnych”. „Passthrough” i „req_id” są zawsze częścią danych żądania, ale możesz zrezygnować z nich i nie używać ich.

#### Pole „przejście”

Cokolwiek przekażesz do tego pola, zostanie zwrócone z powrotem wewnątrz obiektu `response`. Może to być pomocne, gdy musisz symulować przepływ stanowy dla swoich „żądań” i „odpowiedzi”.

#### Pole `req_id`

Być może będziesz musiał „oznaczyć” swoje prośby i przekazać je przez nasze połączenia `WebSocket`. Możesz to zrobić, przekazując „liczbę” do tego pola. Może to być pomocne, gdy trzeba zmapować „prośby” na „odpowiedzi”.

:::caution
Aby dowiedzieć się więcej o dodatkowych opcjonalnych polach specyficznych dla każdego wywołania API, zapoznaj się z naszym [API Explorer] (/api-explorer).
:::

## Dane odpowiedzi

Po otrzymaniu odpowiedzi na wywołanie pojawi się „Pole” o tej samej nazwie co „nazwa metody”, które zawiera rzeczywiste dane.

Odpowiedź na wezwanie „Lista zamieszkania”:

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
            „tożsamość”: {
                „usługi”: {
                    „idv”: {
                        „documents_supported”: {},
                        „has_visual_ sample”: 0,
                        „is_country_supported”: 0
                    },
                    „onfido”: {
                        „documents_supported”: {
                            „driving_licence”: {
                                „display_name”: „Prawo jazdy”
                            }
                        },
                        „is_country_supported”: 0
                    }
                }
            },
            „phone_idd”: „35818",
            „text”: „Wyspy Alandzkie”,
            „value”: „ax”
        },
        {
            „identity”: {
                „services”: {
                    „idv”: {
                        „documents_supported”: {},
                        „has_visual_sample”: 0,
                        „is_country_supported”: 0
                    },
                    „onfido”: {
                        „documents_supported”: {
                            „driving_licence”: {
                                „display_name”: „Prawo jazdy”
                            },
                            „national_identity card”: {
                                „display_name” : „Krajowy dowód tożsamości”
                            },
                            „paszport”: {
                                „display_name”: „Paszport”
                            }
                        },
                        „is_country_supported”: 1
                    }
                }
            },
            „phone_idd”: „355",
            „text”: „Albania”,
            „tin_format”: [
                „^ [A-ta-T0-9]\\ d{8}[A-wa-W] $”
            ],
            „value”: „al”
        },
        //...
  ],
};
```

Tutaj „lista_rezydencji” jest „nazwą metody” i zawiera rzeczywiste żądane dane. Aby było krótko, nie uwzględniliśmy reszty tablicy. Możesz sprawdzić rzeczywistą odpowiedź [tutaj] (/api-explorer #residence_list).

#### Pole `echo_req`

To „Pole” zawiera dokładne „Dane żądania” wysłane do serwera.

#### Pole \\\\\`msg_type'

To „Pole” pomaga określić, które dane „wiadomości” otrzymujesz w zdarzeniu komunikatu połączenia WebSocket. Na przykład Twój program obsługi zdarzeń `onmessage` dla połączenia WebSocket w `JavaScript` będzie następujący:

```js showLineNumbers
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse (event.data);

  switch (receivedMessage.msg_type) {
    case „residence_list”:
      console.log („Lista zamieszkania to: „, ReceivedMessage.Residence_List)
      break;
    przypadek „other_request_identity”
      console.log („odpowiedź”, Wiadmessage.some_inny_ request_identificator)
    default:
      console.log („ReceivedMessage”, ReceivedMessage)
      break;
  }
}
```

#### Pole `req_id`

To jest „Opcjonalne” przekazywane do „Żądania danych”, można go użyć do `walidacji`, `synchronizacji`, \\\\\`buforowanie' itp.

:::tip
„msg_type” jest zawsze obecny w danych odpowiedzi.
:::
