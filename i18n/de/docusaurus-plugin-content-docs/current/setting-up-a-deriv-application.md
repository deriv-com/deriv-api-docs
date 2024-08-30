---
title: Erstellen Sie eine Deriv-Anwendung
sidebar_label: Einrichten einer Deriv-Anwendung
sidebar_position: 7
sidebar_class_name: hide-sidebar-item
tags:
  - Einleitung
  - Anwendung
  - Einrichtung
keywords:
  - Einleitung
  - Anwendung
  - Einrichtung
description: Eine Schritt-für-Schritt-Anleitung zur Erstellung Ihres Deriv-API-Tokens und zum Aufbau Ihrer Handelsanwendung mit Hilfe unserer Handels-API. Mehr erfahren.
---

```mdx-code-block
import Link from '@docusaurus/Link';
```

#### Konto ableiten

Wenn Sie noch kein Deriv-Konto haben, können Sie ganz einfach eines erstellen, indem Sie unsere Anmeldeseite besuchen oder den <Link href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</Link> API-Aufruf verwenden. Es ist völlig kostenlos. Und wenn Sie bereits ein Konto haben, melden Sie sich bitte mit Ihren Kontodaten an. Um einen versehentlichen Verlust von Geldern während des Tests zu vermeiden, empfehlen wir Ihnen, Ihr Demokonto anstelle eines echten Kontos zu verwenden.

Um einen Aufschlag zu verdienen, eröffnen Sie ein Deriv-Echtgeldkonto, um Ihre monatlichen Erträge zu erhalten. Sie können auch ein echtes Konto mit den API-Aufrufen <Link href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</Link> or <Link href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</Link> erstellen.

:::caution
Um Deriv-Anwendungen zu erstellen, benötigen Sie ein API-Token mit dem Admin-Bereich für das Konto, das Sie für Ihre Anwendung verwenden möchten.
:::

## Wie Sie ein Deriv API-Token erstellen

Um Ihr API-Token zu erstellen, gehen Sie einfach zum Dashboard und wählen Sie die Registerkarte **Tokens verwalten**. Erstellen Sie von dort aus ein neues Token, das der für die Funktionen Ihrer Anwendung erforderlichen Zugriffsebene entspricht.

Um ein neues API-Token zu erstellen, gehen Sie folgendermaßen vor:

1. Wählen Sie die von Ihnen benötigten Bereiche aus.
2. Geben Sie einen Namen für Ihren Token an
3. Klicken Sie auf **Erstellen**.

Alternativ können Sie ein API-Token über den <Link href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</Link> API-Aufruf erstellen.

:::caution
Sie benötigen ein Token mit dem Geltungsbereich `Admin`, um eine Anwendung zu erstellen.
:::

## Wie Sie eine Deriv-Anwendung erstellen

Um Ihre Anwendung mit den entsprechenden Konfigurationsoptionen zu erstellen, wählen Sie im Dashboard die Registerkarte **Anwendung registrieren**. Sie können jederzeit Änderungen an der Konfiguration Ihrer Anwendung auf der Registerkarte **Anwendungen verwalten** vornehmen.

| App-Informationsfeld | Beschreibung                                                                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Konto                | Das Konto, mit dem Sie die Anwendung erstellen möchten                                                                                                                                                                   |
| API Token            | Das API-Token, mit dem Sie die Anwendung erstellen möchten                                                                                                                                                               |
| Name der App         | Name der Anwendung                                                                                                                                                                                                       |
| Markup               | Die zum Handelspreis hinzugefügte Provision zur Erzielung zusätzlicher Einnahmen                                                                                                                                         |
| URL umleiten         | Die URL, mit der sich Kunden ohne API-Token mit ihren Deriv-Konten bei Ihrer App anmelden können                                                                                                                         |
| Verifizierungs-URL   | Wird für die E-Mail-Überprüfung verwendet. Falls angegeben, wird die URL mit dem Verifizierungs-Token an die E-Mail des Benutzers gesendet; andernfalls wird die Redirect-URL verwendet. |

**Um eine Anwendung zu erstellen, gehen Sie folgendermaßen vor:**

1. Wählen Sie das Konto, mit dem Sie die Anwendung erstellen möchten.
2. Wählen Sie das zu Ihrem Konto hinzugefügte API-Token (es muss den Geltungsbereich "Admin" haben).
3. Geben Sie einen Namen für Ihre Anwendung an.
4. Füllen Sie die Felder **Markup** und **Authentifizierungsdetails** aus.
5. Wählen Sie die **Authorisation Scopes**, die Ihre Anwendung benötigt.
6. Klicken Sie auf **Bewerbung registrieren**.

Vergewissern Sie sich, dass die **Redirect**- und **Verification**-URLs für Ihre Implementierung korrekt sind.

Wenn Ihre Domain zum Beispiel **`https://example.com`** lautet und Ihre **Autorisierung und Authentifizierung von** `verify` übernommen wird, lauten Ihre URLs:

**`https://example.com/verify`**
