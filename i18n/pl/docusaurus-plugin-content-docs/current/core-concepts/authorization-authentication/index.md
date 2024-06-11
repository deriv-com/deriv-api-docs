---
title: Uwierzytelnianie API
hide_title: false
draft: false
sidebar_label: Uwierzytelnianie API
sidebar_position: 2
tags:
  - weryfikacja
  - upoważnienie
keywords:
  - uwierzytelnianie pochodne
  - autoryzacja pochodna
description: Uzyskaj dostęp do pełnego zestawu funkcji API Deriv w swojej aplikacji handlowej, uwierzytelniając użytkowników za pomocą tokena API. Naucz się tego robić na przykładzie API.
---

Bez autoryzacji i uwierzytelniania uzyskasz dostęp tylko do około połowy naszych połączeń i funkcji API. Na przykład, aby kupować umowy lub korzystać z funkcji „Copy Trading”, użytkownicy muszą być uwierzytelnieni i autoryzowani przez naszego dostawcę **OAuth** i **WebSocket Server**.

## Zanim zaczniemy

Upewnij się, że masz wszystkie wymagania wymienione poniżej, aby kontynuować.

### Wymogi

1. Konto klienta Deriv
2. Deriv token API z odpowiednim poziomem dostępu
3. Identyfikator aplikacji Deriv

:::note
Szczegółowe instrukcje dotyczące tworzenia tokena i aplikacji Deriv API można znaleźć w sekcji [Konfigurowanie aplikacji Deriv] (/docs/setting-up-a-deriv-application).
:::

### Token API

Token API to unikalny identyfikator klienta, który żąda dostępu z serwera. To najprostszy sposób autoryzacji.

Poziom dostępu dla każdego tokena API musi odpowiadać wymaganemu poziomowi dostępu każdego wywołania API, który można znaleźć również w [API Explorer] (/api-explorer).

Na przykład na poniższym zrzucie ekranu widać, że aby móc korzystać ze statusu konta, należy użyć tokena z poziomem dostępu do odczytu.

! [] (/img/acc_status_scope_api_explorer.png)

Po autoryzacji połączenia WebSocket kolejne wywołania tego połączenia będą traktowane jako działania użytkownika.

Należy pamiętać, że token API może być używany z dowolną aplikacją, więc zarówno aplikacja, jak i klienci muszą zapewnić jej bezpieczeństwo.

### OAuth2

OAuth oznacza „Open Authorization” — protokół, który umożliwia klientowi dostęp do zasobów hostowanych na serwerze w imieniu użytkownika bez ujawniania danych uwierzytelniających.

Ten rodzaj autoryzacji umożliwia klientom logowanie się do aplikacji innych firm przy użyciu kont Deriv bez tworzenia tokena API. W takim przypadku aplikacja innej firmy nie widzi hasła użytkownika ani stałego tokena API, co czyni go bezpieczniejszym.

Uwierzytelnianie OAuth2 wymaga więcej kroków, aby skonfigurować, ale jest to najbezpieczniejszy sposób dla programistów na udostępnianie dostępu do swojej aplikacji swoim klientom.

Aby uzyskać więcej informacji na temat OAuth2, odwiedź [ten przewodnik] (https://aaronparecki.com/oauth-2-simplified/).

Oto wizualna reprezentacja działania połączenia autoryzacji OAuth:

! [Przepływ OAuth] (/img/how_oauth_works.png 'Przepływ OAuth ')

## Proces uwierzytelniania

Aby uwierzytelnić użytkownika, określ adres URL, który będzie używany jako adres URL przekierowania OAuth na stronie [Dashboard] (/dashboard), na karcie **Zarejestruj aplikację** w polach**Szczegóły OAuth**. Następnie dodaj przycisk logowania w swojej witrynie lub aplikacji i skieruj użytkowników do **`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`**, gdzie your_app_id jest identyfikatorem Twojej aplikacji.

! [Logowanie Deriv OAuth] (/img/oauth_login.png 'Logowanie Deriv OAuth ')

Gdy użytkownik zarejestruje się/zaloguje się, zostanie przekierowany na adres URL wprowadzony jako adres URL przekierowania. Ten adres URL będzie zawierał argumenty dodane do niego z tokenami sesji użytkownika i będzie wyglądał podobnie do tego:

`https://[YOUR_WEBSITE_URL]/redirect/? acct1=cr799393& token1 = a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315 & token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## Proces autoryzacji

Parametry zapytania w adresie URL przekierowania to konta użytkownika i powiązane z nimi tokeny sesji. Można mapować parametry zapytania do tablicy przy użyciu następującego podejścia:

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

Aby autoryzować użytkownika na podstawie konta **wybranego** użytkownika, wywołaj wywołanie API [authorize] (/api-explorer #authorize) za pomocą **wybranego** konta**tokenu sesji** użytkownika\*\*:

```js showLineNumbers
{
  "authorize": "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

Odpowiedź na wywołanie „authorize” byłaby obiektem, jak poniżej:

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

Teraz użytkownik jest autoryzowany i możesz korzystać z wywołań Deriv API w imieniu konta.
