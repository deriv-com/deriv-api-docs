---
title: API-Authentifizierung
hide_title: false
draft: false
sidebar_label: API-Authentifizierung
sidebar_position: 2
tags:
  - Authentifizierung
  - Autorisierung
keywords:
  - Deriv-Authentifizierung
  - Deriv-authorisatio
description: Greifen Sie auf alle Deriv-API-Funktionen in Ihrer Trading-App zu, indem Sie die Benutzer mit einem API-Token authentifizieren. Lernen Sie dies anhand eines API-Beispiels.
---

Ohne Autorisierung und Authentifizierung erhalten Sie nur Zugriff auf etwa die Hälfte unserer API-Aufrufe und Funktionen. Um beispielsweise Kontrakte zu kaufen oder die Funktionen des Kopierhandels zu nutzen, müssen Ihre Benutzer von unserem **OAuth**-Anbieter und **WebSocket Server** authentifiziert und autorisiert werden.

## Bevor wir anfangen

Bitte stellen Sie sicher, dass Sie alle unten genannten Anforderungen erfüllen, um fortzufahren.

### Anforderungen

1. Deriv Kundenkonto
2. Deriv-API-Token mit der entsprechenden Zugriffsebene
3. Deriv App-ID

:::note
Eine ausführliche Anleitung zur Erstellung eines Deriv-API-Tokens und einer Anwendung finden Sie unter [Einrichten einer Deriv-Anwendung](/docs/setting-up-a-deriv-application).
:::

### API-Token

Ein API-Token ist eine eindeutige Kennung eines Clients, der Zugriff von einem Server anfordert. Das ist die einfachste Art der Autorisierung.

Die Zugriffsstufe für jedes API-Token muss mit der erforderlichen Zugriffsstufe für jeden API-Aufruf übereinstimmen, die Sie ebenfalls im [API Explorer](/api-explorer) finden.

In der Abbildung unten können Sie beispielsweise sehen, dass ein Token mit Lesezugriffsebene verwendet werden muss, um den Kontostatus verwenden zu können.

![](/img/acc_status_scope_api_explorer.png)

Nach der Autorisierung einer WebSocket-Verbindung werden nachfolgende Aufrufe dieser Verbindung als Benutzeraktionen betrachtet.

Bitte beachten Sie, dass das API-Token mit jeder App verwendet werden kann, sodass sowohl Ihre App als auch Ihre Kunden es schützen müssen.

### OAuth 2

OAuth steht für `Open Authorisation` - ein Protokoll, das es einem Client ermöglicht, im Namen des Benutzers auf Ressourcen zuzugreifen, die auf einem Server gehostet werden, ohne die Anmeldedaten preiszugeben.

Diese Art der Autorisierung ermöglicht es Kunden, sich mit ihren Deriv-Konten bei Apps von Drittanbietern anzumelden, ohne ein API-Token zu erstellen. In diesem Fall sieht die Drittanbieter-App das Passwort oder das permanente API-Token des Benutzers nicht, was sie sicherer macht.

Die OAuth2-Authentifizierung erfordert mehr Schritte zur Einrichtung, ist jedoch die sicherste Methode für Entwickler, den Zugriff auf ihre App mit ihren Kunden zu teilen.

Weitere Informationen zu OAuth2 finden Sie in [diesem Leitfaden] (https://aaronparecki.com/oauth-2-simplified/).

Hier ist die visuelle Darstellung, wie die OAuth-Autorisierungsverbindung funktioniert:

![OAuth flow](/img/how_oauth_works.png "OAuth flow")

## Der Authentifizierungsprozess

Um Ihren Benutzer zu authentifizieren, geben Sie auf der Seite [Dashboard](/dashboard), Registerkarte **Anwendung registrieren** in den Feldern **OAuth-Details** die URL an, die als OAuth-Redirect-URL verwendet werden soll. Fügen Sie dann eine Login-Schaltfläche auf Ihrer Website oder App hinzu und leiten Sie die Benutzer zu **`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`**, wobei your_app_id die ID Ihrer App ist.

![Deriv OAuth Login](/img/oauth_login.png "Deriv OAuth Login")

Sobald sich ein Benutzer anmeldet, wird er zu der URL weitergeleitet, die Sie als Autorisierungs-URL eingegeben haben. Zu dieser URL werden Argumente mit den Sitzungstoken des Benutzers hinzugefügt und sie sieht etwa so aus:

`https://[IHRE_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## Das Autorisierungsverfahren

Die Abfrageparameter in der Autorisierungs-URL sind die Benutzerkonten und die zugehörigen Sitzungs-Tokens. Sie können die Abfrageparameter mit dem folgenden Ansatz einem Array zuordnen:

```js showLineNumbers
const user_accounts = [
  {
    account: 'cr799393',
    token: 'a1-f7pnteezo4jzhpxclctizt27hyeot',
    currency: 'usd',
  },
  {
    account: 'vrtc1859315',
    token: 'a1clwe3vfuuus5kraceykdsoqm4snfq',
    currency: 'usd',
  },
];
```

Um den Benutzer auf der Grundlage seines **ausgewählten** Kontos zu autorisieren, rufen Sie den API-Aufruf [authorize](/api-explorer#authorize) mit dem **Session-Token** des **ausgewählten** Kontos des Benutzers auf:

```js showLineNumbers
{
  "authorize": "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

Die Antwort auf den Aufruf `authorize` wäre ein Objekt wie unten:

```js showLineNumbers
{
    "account_list": [
      {
        "account_type": "trading",
        "created_at": 1647509550,
        "currency": "USD",
        "is_disabled": 0,
        "is_virtual": 0,
        "landing_company_name": "svg",
        "loginid": "CR799393",
        "trading": {}
      },
      {
        "account_type": "trading",
        "created_at": 1664132232,
        "currency": "ETH",
        "is_disabled": 0,
        "is_virtual": 0,
        "landing_company_name": "svg",
        "loginid": "VRTC1859315",
        "trading": {}
      },
    ],
    "balance": 0,
    "country": "id",
    "currency": "USD",
    "email": "user_mail@email_provider.com",
    "fullname": " John Doe",
    "is_virtual": 0,
    "landing_company_fullname": "Deriv (SVG) LLC",
    "landing_company_name": "svg",
    "local_currencies": {
      "IDR": {
        "fractional_digits": 2
      }
    },
    "loginid": "CR799393",
    "preferred_language": "EN",
    "scopes": [
      "read",
      "trade",
      "trading_information",
      "payments",
      "admin"
    ],
    "trading": {},
    "upgradeable_landing_companies": [
      "svg"
    ],
    "user_id": 12345678
  }
```

Jetzt ist der Benutzer autorisiert und Sie können Deriv-API-Aufrufe im Namen des Kontos verwenden.
