---
title: Autorizzazione aperta
hide_title: true
draft: false
sidebar_label: OAuth 2
sidebar_position: 4
tags:
  - concetto
  - guadagna
  - guadagnare
  - commissione
  - margine di profitto
keywords:
  - concetto
  - guadagna
  - guadagnare
  - commissione
  - margine di profitto
description: Scopra l'autorizzazione OAuth, l'accesso senza token API e come può utilizzarla per migliorare l'esperienza utente della sua app di trading.
---

## Cos'è l'OAuth2?

OAuth sta per Open Authorization, un protocollo che consente a un cliente di accedere alle risorse di un utente su un server senza rivelare le credenziali di accesso dell'utente.

Questo tipo di autorizzazione consente ai clienti di accedere ad app di terze parti utilizzando i propri conti Deriv senza creare un Token API. In questo caso, l'app di terze parti non vede la password o il Token API permanente dell'utente, rendendo la procedura più sicura.

L'autenticazione OAuth2 richiede più passaggi di configurazione, ma è il modo più sicuro per gli sviluppatori di concedere l'accesso alla propria app per i clienti.

Per maggiori informazioni su OAuth2, [veda questa guida](https://aaronparecki.com/oauth-2-simplified/).

### Come usare l'autorizzazione OAuth

1. Specifichi l'URL che sarà utilizzato come URL di reindirizzamento **OAuth** nella pagina di registrazione dell'app nel campo **URL del sito web**.

2. Aggiunga un pulsante di accesso sul suo sito web o sulla sua app e indirizzi gli utenti a `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` dove il suo_app_id è l'ID della sua app.

3. Una volta che un utente si iscrive, sarà reindirizzato all'URL che lei ha inserito come **Redirect URL**. Questo URL avrà degli argomenti aggiunti con i token di sessione dell'utente e avrà un aspetto simile: `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. Nei parametri dell'URL, vedrai tutti gli account e il token di sessione per ciascun conto. Passa questi token alla chiamata API Authorize per eseguire azioni per conto dell'account.
