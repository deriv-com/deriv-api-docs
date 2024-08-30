---
title: Autenticazione API
hide_title: false
draft: false
sidebar_label: Autenticazione API
sidebar_position: 2
tags:
  - convalida
  - autorizzazione
keywords:
  - autenticazione derivata
  - derivazione-autorizzazione
description: Acceda alla serie completa di funzioni API di Deriv sulla sua app di trading autenticando gli utenti con un token API. Impari a farlo con un esempio di API.
---

Senza autorizzazione e autenticazione avrai accesso solo a circa la metà delle nostre chiamate e funzionalità API. Ad esempio, per acquistare contratti o utilizzare le funzioni di `Copy Trading`, i suoi utenti devono essere autenticati e autorizzati dal nostro provider **OAuth** e dal **WebSocket Server**.

## Prima di iniziare

Assicurati di avere tutti i requisiti indicati di seguito per continuare.

### Requisiti

1. Conto cliente Deriv
2. Token API Deriv con il livello di accesso appropriato
3. ID dell'app Deriv

:::note
Faccia riferimento a [Impostazione di un'applicazione Deriv] (/docs/setting-up-a-deriv-application) per istruzioni dettagliate su come creare un token API Deriv e un'applicazione.
:::

### Token API

Un Token API è un identificatore univoco di un client che richiede l'accesso da un server. È il modo più semplice di autorizzazione.

Il livello di accesso per ogni token API deve corrispondere al livello di accesso richiesto per ogni chiamata API, che si può trovare anche in [API Explorer](/api-explorer).

Ad esempio, nella schermata qui sotto, noterai che per poter utilizzare lo stato dell'account, è necessario utilizzare un token con livello di accesso in lettura.

![](/img/acc_status_scope_api_explorer.png)

Dopo l'autorizzazione di una connessione WebSocket, le chiamate successive su tale connessione verranno considerate azioni dell'utente.

Tieni presente che il token API può essere utilizzato con qualsiasi app, quindi sia la tua app che i tuoi clienti devono tenerlo al sicuro.

### OAuth 2

OAuth è l'acronimo di `Open Authorisation` (Autorizzazione aperta) - un protocollo che consente a un cliente di accedere alle risorse ospitate su un server per conto dell'utente senza rivelare le credenziali.

Questo tipo di autorizzazione consente ai clienti di accedere ad app di terze parti utilizzando i propri conti Deriv senza creare un Token API. In questo caso, l'app di terze parti non vede la password o il Token API permanente dell'utente, rendendo la procedura più sicura.

L'autenticazione OAuth2 richiede più passaggi per la configurazione, ma è il modo più sicuro per gli sviluppatori di condividere l'accesso alla propria app con i propri clienti.

Per maggiori informazioni su OAuth2, visiti [questa guida](https://aaronparecki.com/oauth-2-simplified/).

Ecco la rappresentazione visiva di come funziona la connessione di autorizzazione OAuth:

![Flusso OAuth](/img/how_oauth_works.png "flusso OAuth")

## Processo di autenticazione

Per autenticare l'utente, specifica l'URL che verrà utilizzato come URL di reindirizzamento OAuth nella pagina [Dashboard](/dashboard), nella scheda **Registrazione applicazione** nei campi **Dettagli OAuth**. Quindi, aggiunga un pulsante di accesso sul suo sito web o sulla sua app e indirizzi gli utenti a **`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`** dove il suo_app_id è l'ID della sua app.

![Deriv OAuth Login](/img/oauth_login.png "Deriv OAuth Login")

Una volta che un utente si registra o accede, verrà reindirizzato all'URL che hai inserito come URL di reindirizzamento. A questo URL verranno aggiunti argomenti con i token di sessione dell'utente, come puoi vedere di seguito:

`https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuus5kraceykdsoqm4snfq& cur2=usd`.

## Processo di autorizzazione

I parametri di query nell'URL di reindirizzamento sono i conti dell'utente e i relativi token di sessione. È possibile mappare i parametri della query su un array utilizzando il seguente approccio:

```js showLineNumbers
const user_accounts = [
  {
    account: 'cr799393', token: 'a1-f7pnteezo4jzhpxclctizt27hyeot', valuta: 'usd',}, {account: 'vrtc1859315',
    token: 'a1clwe3vfuuus5kraceykdsoqm4snfq',





    valuta: 'usd',
  },
];
```

Per autorizzare l'utente in base all'account **selezionato** dell'utente, chiami la chiamata API [authorize](/api-explorer#authorize) con il **token di sessione** dell'account **selezionato** dell'utente:

```js showLineNumbers
{
  «authorize»: «a1-f7pnteezo4jzhpxclctizt27hyeot»}

```

La risposta per la chiamata `authorize` sarà un oggetto come quello che segue:

```js showLineNumbers
{
    «account_list»: [
      {
        «account_type»: «trading», «created_at»: 1647509550,
        «currency»: «USD», «is_disabled»: 0,
        «is_virtual»: 0,
        «landing_company_name»:
        «svg»,

        «loginid»: «CR799393", «trading»: {}
      }, {
        «account_type»: «trading»,
        «created_at»: 1664132232,
        «currency»: «ETH», «is_disabled»:
      0,
        «è_virtuale»: 0

        ,
        «landing_company_name»: «svg», «loginid»:
        «VRTC1859315", «trading»: {}
      },
    ],
        «balance»: 0, «country»: «id»,
    «currency»:
    «USD», «email»: «user_»

    mail@email_provider.com «,
    «nome completo»: "John Doe»,
    «is_virtual»: 0, «landing_company_fullname»:
    «Deriv (SVG) LLC», «landing_company_name»: «svg»,
    «local_currency»: {«IDR»: {«fractional_digits»: 2



      }
    },
    «loginid»: «CR799393", «preferred_language»:
    «IT», «scopes»: [«read»,
    «trade»,
      «trading_information»,
      «payments»,


      «admin»
    ],
    «trading»: {}, «upgradeable_landing_companies»: [
    «svg»],
      «id_utente»: 12345678}



```

Ora l'utente è autorizzato e puoi utilizzare le chiamate API Deriv per conto dell'account.
