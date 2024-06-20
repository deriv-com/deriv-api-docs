---
title: Creare un'applicazione Deriv
sidebar_label: Configurazione di un'applicazione Deriv
sidebar_position: 7
sidebar_class_name: hide-sidebar-item
tags:
  - introduzione
  - applicazione
  - configurazione
keywords:
  - introduzione
  - applicazione
  - configurazione
description: Una guida passo passo per creare il suo token API Deriv e costruire la sua applicazione di trading con l'aiuto della nostra API di trading. Ulteriori informazioni.
---

#### Conto Deriv

Se non ha ancora un conto Deriv, può crearlo facilmente visitando la nostra pagina di iscrizione o utilizzando la chiamata API <a href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a>. È completamente gratuito. Se hai già un conto, accedi utilizzando i dati. Per evitare qualsiasi perdita accidentale di fondi durante i test, ti consigliamo di utilizzare il conto demo invece di un conto reale.

Per guadagnare markup, crea un conto reale Deriv per riceverne i guadagni mensili. Può anche creare un conto reale utilizzando le chiamate API <a href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</a> o <a href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</a>.

:::caution
Per creare applicazioni Deriv, avrà bisogno di un token API con l'ambito Admin per l'account che desidera utilizzare per la sua applicazione.
:::

## Come creare un token API di Deriv

Per creare il suo token API, basta andare nella Dashboard e selezionare la scheda **Gestione dei token**. Da lì, crea un nuovo token che corrisponda al livello di accesso necessario per le funzionalità dell'applicazione.

Per creare un nuovo token API, segui questa procedura:

1. Seleziona gli ambiti di cui hai bisogno
2. Fornisci un nome per il token
3. Clicchi su **Crea**

In alternativa, può creare un token API tramite la chiamata API <a href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a>.

:::caution
Per creare un'applicazione, ha bisogno di un token con l'ambito `Admin`.
:::

## Come creare un'applicazione Deriv

Per creare la sua applicazione con le opzioni di configurazione appropriate, selezioni la scheda **Registra applicazione** nella Dashboard. Può apportare modifiche alla configurazione della sua applicazione in qualsiasi momento nella scheda **Gestione applicazioni**.

| Campo informativo dell'app | Descrizione                                                                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account                    | Il conto con cui desideri creare l'applicazione                                                                                                                                                                |
| Token API                  | Il token API con cui desideri creare l'applicazione                                                                                                                                                            |
| Nome dell'applicazione     | Nome dell'applicazione                                                                                                                                                                                         |
| Margine di profitto        | La commissione aggiunta al prezzo di vendita per ottenere un reddito aggiuntivo                                                                                                                                |
| URL di autorizzazione      | L'URL che consente ai clienti di accedere alla tua app utilizzando i loro conti Deriv senza un token API                                                                                                       |
| URL di verifica            | Utilizzato per la verifica dell'e-mail. Se fornito, l'URL con il token di verifica viene inviato all'e-mail dell'utente; altrimenti, viene utilizzato l'URL di autenticazione. |

**Per creare un'applicazione, segui questa procedura:**

1. Seleziona il conto con cui desideri creare l'applicazione.
2. Seleziona il token API aggiunto al conto (deve avere l'ambito \`Admin\`).
3. Fornisci un nome per la tua applicazione.
4. Riempia i campi **Markup** e **Dettagli di autorizzazione**.
5. Selezioni gli **Scopi di autorizzazione** necessari alla sua applicazione.
6. Clicchi su **Registrazione della domanda**.

Si assicuri che gli URL **Autorizzazione** e **Verifica** siano corretti in base alla sua implementazione.

Ad esempio, se il suo dominio è **`https://example.com`** e la sua **autorizzazione e autenticazione sono gestite da** `verify`, i suoi URL saranno:

**`https://example.com/verify`**
