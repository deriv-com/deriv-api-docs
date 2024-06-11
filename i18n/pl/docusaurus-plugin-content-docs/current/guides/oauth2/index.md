---
title: Otwarta autoryzacja
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - pojęcie
  - zarabiaj
  - dochód
  - prowizja
  - marża
keywords:
  - pojęcie
  - zarabiaj
  - dochód
  - prowizja
  - marża
description: Dowiedz się więcej o autoryzacji OAuth, logowaniu bez tokena API oraz o tym, jak możesz go wykorzystać do poprawy komfortu użytkowania aplikacji handlowej.
---

## Co to jest OAuth2?

OAuth oznacza Open Authorization — protokół, który umożliwia klientowi dostęp do zasobów użytkownika na serwerze bez ujawniania danych logowania użytkownika.

Ten rodzaj autoryzacji umożliwia klientom logowanie się do aplikacji innych firm przy użyciu kont Deriv bez tworzenia tokena API. W takim przypadku aplikacja innej firmy nie widzi hasła użytkownika ani stałego tokena API, co czyni go bezpieczniejszym.

Uwierzytelnianie OAuth2 wymaga więcej etapów konfiguracji, ale jest to najbezpieczniejszy sposób dla programistów na przyznanie klientom dostępu do swojej aplikacji.

Aby uzyskać więcej informacji na temat OAuth2, [zobacz ten przewodnik] (https://aaronparecki.com/oauth-2-simplified/).

### Jak stosować zezwolenie na oAuth

1. Określ adres URL, który będzie używany jako adres URL przekierowania OAuth Redirection\*\* na stronie rejestracji aplikacji w polu **Adres URL strony**.

2. Dodaj przycisk logowania w swojej witrynie lub aplikacji i skieruj użytkowników do `https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id` gdzie your_app_id jest identyfikatorem Twojej aplikacji.

3. Po zarejestrowaniu się użytkownika zostanie przekierowany na adres URL wprowadzony jako adres URL przekierowania\*\*. Ten adres URL będzie zawierał argumenty dodane do niego z tokenami sesji użytkownika i będzie wyglądał podobnie do: `https://[YOUR_WEBSITE_URL]/redirect/? acct1=cr799393& token1 = a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315 & token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. W parametrach adresu URL zobaczysz wszystkie konta i token sesji dla każdego konta. Przekaż te tokeny do wywołania Autorize API w celu wykonywania działań w imieniu konta.
