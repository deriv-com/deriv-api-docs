---
title: Funzioni delle chiamate API
hide_title: false
draft: false
sidebar_label: Funzioni delle chiamate API
sidebar_position: 1
tags:
  - concetto
  - chiamate
  - anatomia
keywords:
  - app di trading
  - chiamate api
  - esempio di api
description: Configuri le chiamate API per la sua app di trading utilizzando la funzione di chiamata API. Con esempi di API, impara a iscriversi, inviare richieste e ottenere dati di risposta.
---

## Iscrizione e invio

Tutte le chiamate API dispongono di una funzionalità di invio per effettuare una richiesta e ricevere una risposta. Alcune chiamate API offrono anche una funzionalità di sottoscrizione che consente l'invio di aggiornamenti all'applicazione non appena diventano disponibili nuove informazioni.

### Iscriviti

Diverse chiamate API forniscono la funzionalità `subscribe`. Quando ti iscrivi a una chiamata API, riceverai un flusso continuo dai dati di questa particolare chiamata API.

Alcune di queste chiamate API si iscrivono automaticamente (ad esempio, [ticks](/api-explorer#ticks)) e alcune hanno un campo `subscribe` opzionale. Se passa `1` al campo `subscribe`, la sottoscrizione inizierà e il server continuerà a inviare i dati richiesti fino a quando non annullerà la sottoscrizione chiamando le chiamate API `Forget` o \`Forget all\`\\\`.

Ad esempio, può chiamare [Tick History](/api-explorer#ticks_history) per ricevere i dati della cronologia dei tick. Ma quando aggiunge l'opzione `subscribe` a questa chiamata, riceverà i dati della cronologia dei tick che ha richiesto nella prima risposta e continuerà a ricevere una nuova risposta ogni volta che il server pubblica un nuovo tick per il simbolo dato.

Nel flusso di messaggi da `subscribe`, c'è un campo chiamato `subscription`. Questo è l'"ID del flusso". Con questo ID, può identificare il flusso di messaggi nella sua logica e interrompere il flusso con le chiamate API `Forget` e `Forget All`.

I dati forniti dalle chiamate API con la funzionalità `subscribe` possono essere utilizzati come fonte di dati per altre chiamate API e funzionalità.

### Invia

Se chiama l'API con la funzionalità `invio`, il server invierà i dati richiesti una sola volta. Per ottenere dati aggiornati, devi inviare nuovamente la chiamata API. Di solito, questo metodo viene utilizzato quando si ottengono altre risposte alle chiamate API o eventi UI come `Click`, `Scroll` e altri.

### Dimentica

Se desidera interrompere il flusso di messaggi creato da `subscribe`, dovrà richiamare la chiamata API `Forget` con il corretto `Stream ID`. Altrimenti, può utilizzare la chiamata API `Dimentica tutto` per interrompere i flussi in base al loro `nome di metodo`.

:::caution
Per maggiori informazioni sulla chiamata API `Forget`, dia un'occhiata a [Forget](/api-explorer#forget) e [Forget All](/api-explorer#forget_all) nell'esploratore API.
:::

## Richiesta dati

Per semplificare la gestione del flusso di richieste e risposte della connessione WebSocket, ogni chiamata API Deriv WebSocket segue una struttura standardizzata. Puoi usarla per la memorizzazione nella cache delle richieste e delle risposte, la loro convalida e sincronizzazione.

#### Nome del metodo di chiamata API

Ogni `richiesta` nell'API WebSocket include un campo `nome del metodo` che serve come identificatore unico per la richiesta. Nella maggior parte dei casi, questo `nome di metodo` avrà un valore numerico di `1`. Tuttavia, ci sono alcuni casi in cui la proprietà identificatrice può avere un valore di stringa.

:::caution
Il nome del metodo di chiamata API è sempre richiesto. Questo campo determina i dati che riceverai dal nostro server WebSocket.
:::

### Campi obbligatori

I dati di ogni richiesta hanno campi obbligatori che è necessario fornire e possono includere anche campi opzionali. Esploriamo questo aspetto con un esempio tratto da `Lista di residenza`.

La chiamata `Lista di residenza` restituisce un elenco di Paesi e di codici paese di 2 lettere, adatti a popolare il modulo di apertura del conto.

I dati della richiesta per questa chiamata sono i seguenti:

```ts showLineNumbers
{
  residence_list: 1; // Api Call Method Name
  passthrough?: object; // Optional
  req_id?: number; // Optional
}
```

Il campo `lista_di_residenza` è il `nome del metodo` per la chiamata ed è obbligatorio. Potrebbero esserci altri campi obbligatori relativi a questo tipo di richiesta che vuoi inviare. Per saperne di più su `Lista di residenza` e altre chiamate API, le consigliamo di consultarle in [API Explorer](/api-explorer#residence_list).

### Campi opzionali

Ogni chiamata ha anche diversi campi `Optional`. `Passthrough` e `req_id` fanno sempre parte dei dati della richiesta, ma può scegliere di non utilizzarli.

#### Il campo \\\`passthrough

Qualsiasi cosa passi a questo campo le verrà restituita all'interno di un oggetto `response`. Questo può essere utile quando deve simulare un flusso statico per le sue `richieste` e `risposte`.

#### Il campo \\\`req_id

Potrebbe essere necessario `tagare` le sue richieste e passarle attraverso le nostre chiamate `WebSocket`. Può farlo passando un `numero` a questo campo. Può essere utile quando deve mappare le `richieste` con le `risposte`.

:::caution
Per conoscere i campi opzionali aggiuntivi specifici per ogni chiamata API, faccia riferimento al nostro [API Explorer](/api-explorer).
:::

## Dati di risposta

Quando si ottiene la risposta alla chiamata, ci sarà un `Campo` con lo stesso nome del `nome del metodo`, che contiene i dati effettivi.

La risposta per la chiamata `Lista di residenza`:

```js showLineNumbers
{
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  lista_di_residenza: [
       {
            "identità": {
                "servizi": {
                    "idv": {
                        "documenti_supportati": {},
                        "has_visual_sample": 0,
                        "is_country_supported": 0
                    },
                    "onfido": {
                        "documenti_supportati": {
                            "driving_licence": {
                                "display_name": "Patente di guida"
                            }
                        },
                        "is_country_supported": 0
                    }
                }
            },
            "phone_idd": "35818",
            "testo": "Isole Aland",
            "valore": "ax"
        },
        {
            "identity": {
                "servizi": {
                    "idv": {
                        "documenti_supportati": {},
                        "has_visual_sample": 0,
                        "is_country_supported": 0
                    },
                    "onfido": {
                        "documenti_supportati": {
                            "driving_licence": {
                                "display_name": "Patente di guida"
                            },
                            "carta_identità_nazionale": {
                                "display_name": "Carta d'identità nazionale"
                            },
                            "passaporto": {
                                "nome visualizzato": "Passaporto"
                            }
                        },
                        "is_country_supported": 1
                    }
                }
            },
            "phone_idd": "355",
            "text": "Albania",
            "tin_format": [
                "^[A-Ta-t0-9]\\\d{8}[A-Wa-w]$"
            ],
            "valore": "al"
        },
        // ....
  ],
};
```

In questo caso, `lista_di_residenza` è il `nome del metodo` e contiene i dati effettivi richiesti. Per farla breve, non abbiamo incluso il resto dell'array. Può verificare la risposta effettiva [qui] (/api-explorer#residence_list).

#### Il campo \\\`echo_req

Questo `campo` contiene gli esatti `dati della richiesta` che ha inviato al server.

#### Il campo \\\`tipo_msg

Questo `campo` la aiuta a determinare quali dati `messaggio` sta ricevendo sull'evento messaggio della connessione WebSocket. Per esempio, il suo gestore di eventi `onmessage` per la sua connessione WebSocket in `JavaScript` sarebbe:

```js showLineNumbers
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);

  switch (receivedMessage.msg_type) {
    case "residence_list":
      console.log("La lista di residenza è : ",receivedMessage.residence_list)
      break;
    case "other_request_identifier"
      console.log("the response", receivedMessage.some_other_request_identifier)
    default:
      console.log("receivedMessage", receivedMessage)
      break;
  }
}
```

#### Il campo \`req_id

Questo è l'`Opzionale` passato alla `Richiesta di dati`, si può utilizzare per la `validazione`, la `sincronizzazione`, il `caching`, ecc.

:::tip
Il \\\`tipo di msg_ è sempre presente nei dati di risposta.
:::
