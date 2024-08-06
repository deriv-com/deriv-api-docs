---
title: Autorisierung öffnen
hide_title: true
draft: false
sidebar_label: OAuth 2
sidebar_position: 4
tags:
  - Konzept
  - verdienen Sie
  - verdienen
  - Provision
  - Markup
keywords:
  - Konzept
  - verdienen Sie
  - verdienen
  - Provision
  - Markup
description: Erfahren Sie mehr über die OAuth-Autorisierung, die Anmeldung ohne API-Token und wie Sie damit die Benutzerfreundlichkeit Ihrer Trading App verbessern können.
---

## Was ist OAuth2?

OAuth steht für Open Authorisation — ein Protokoll, das es einem Client ermöglicht, auf die Ressourcen eines Benutzers auf einem Server zuzugreifen, ohne die Anmeldeinformationen des Benutzers preiszugeben.

Diese Art der Autorisierung ermöglicht es Kunden, sich mit ihren Deriv-Konten bei Apps von Drittanbietern anzumelden, ohne ein API-Token zu erstellen. In diesem Fall sieht die Drittanbieter-App das Passwort oder das permanente API-Token des Benutzers nicht, was sie sicherer macht.

Die OAuth2-Authentifizierung erfordert mehr Einrichtungsschritte, ist aber die sicherste Methode für Entwickler, Kunden Zugriff auf ihre App zu gewähren.

Weitere Informationen zu OAuth2 finden Sie [in diesem Leitfaden](https://aaronparecki.com/oauth-2-simplified/).

### So verwenden Sie die OAuth-Autorisierung

1. Geben Sie die URL, die als **OAuth Redirect URL** auf der App-Registrierungsseite verwendet wird, im Feld **Website URL** an.

2. Fügen Sie eine Login-Schaltfläche auf Ihrer Website oder App hinzu und leiten Sie die Benutzer zu `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`, wobei Ihre_app_id die ID Ihrer App ist.

3. Sobald sich ein Benutzer anmeldet, wird er zu der URL weitergeleitet, die Sie als **Weiterleitungs-URL** eingegeben haben. Dieser URL werden Argumente mit den Sitzungs-Tokens des Benutzers hinzugefügt, und sie sieht ähnlich aus wie: `https://[IHRE_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. In den Parametern der URL sehen Sie alle Konten und das Sitzungstoken für jedes Konto. Übergeben Sie diese Token an den Authorize-API-Aufruf, um Aktionen im Namen des Kontos auszuführen.
