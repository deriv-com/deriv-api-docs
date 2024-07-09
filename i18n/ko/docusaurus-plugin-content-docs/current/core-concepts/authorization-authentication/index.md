---
title: API 인증
hide_title: false
draft: false
sidebar_label: API 인증
sidebar_position: 2
tags:
  - 인증
  - 파생 권한
keywords:
  - 파생 인증
  - 파생 권한
description: API 토큰으로 사용자를 인증하여 트레이딩 앱에서 전체 파생 API 기능 세트에 액세스하세요. API 예제를 통해 이 작업을 수행하는 방법을 알아보세요.
---

권한 부여 및 인증이 없으면 API 호출 및 기능의 약 절반만 액세스할 수 있습니다. 예를 들어, 계약을 구매하거나 '복사 거래' 기능을 이용하려면 **OAuth** 공급자와 **웹소켓 서버**의 인증 및 권한이 있어야 합니다.

## 시작하기 전에

계속하려면 아래에 언급된 모든 요구 사항을 충족하는지 확인하세요.

### 요구 사항

1. 파생 클라이언트 계정
2. 적절한 액세스 레벨로 API 토큰 파생
3. 파생 앱 ID

:::note
파생 API 토큰과 애플리케이션을 만드는 방법에 대한 자세한 지침은 [파생 애플리케이션 설정](/docs/setting-up-a-deriv-application)을 참조하세요.
:::

### API 토큰

API 토큰은 서버에 액세스를 요청하는 클라이언트의 고유 식별자입니다. 가장 간단한 인증 방법입니다.

각 API 토큰의 액세스 수준은 각 API 호출의 필수 액세스 수준과 일치해야 하며, 이는 [API 탐색기](/api-explorer)에서도 확인할 수 있습니다.

예를 들어 아래 스크린샷에서 계정 상태를 사용하려면 읽기 액세스 권한이 있는 토큰을 사용해야 한다는 것을 알 수 있습니다.

![](/img/acc_status_scope_api_explorer.png)

웹소켓 연결이 승인된 후 해당 연결에 대한 후속 호출은 사용자 작업으로 간주됩니다.

API 토큰은 모든 앱에서 사용할 수 있으므로 앱과 클라이언트 모두 보안을 유지해야 한다는 점에 유의하세요.

### OAuth2

OAuth는 '개방형 인증'의 약자로, 클라이언트가 사용자 대신 자격 증명을 공개하지 않고 서버에서 호스팅되는 리소스에 액세스할 수 있도록 하는 프로토콜입니다.

이러한 유형의 인증을 통해 클라이언트는 API 토큰을 만들지 않고도 자신의 파생 계정을 사용하여 타사 앱에 로그인할 수 있습니다. 이 경우 타사 앱은 사용자의 비밀번호나 영구 API 토큰을 볼 수 없으므로 더 안전합니다.

OAuth2 인증은 설정하는 데 더 많은 단계가 필요하지만 개발자가 앱에 대한 액세스 권한을 클라이언트와 공유할 수 있는 가장 안전한 방법입니다.

OAuth2에 대한 자세한 내용은 [이 가이드](https://aaronparecki.com/oauth-2-simplified/)를 참조하세요.

다음은 OAuth 인증 연결이 작동하는 방식을 시각적으로 표현한 것입니다:

![OAuth 흐름](/img/how_oauth_works.png "OAuth 흐름")

## 인증 프로세스

사용자 인증을 위해 [대시보드](/대시보드) 페이지의 **애플리케이션 등록** 탭의 **OAuth 세부 정보** 필드에서 OAuth 리디렉션 URL로 사용할 URL을 지정합니다. 그런 다음 웹사이트나 앱에 로그인 버튼을 추가하고 사용자를 \*\*`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`\*\*로 안내합니다(여기서 your_app_id는 앱의 ID).

![파생 OAuth 로그인](/img/oauth_login.png "파생 OAuth 로그인")

사용자가 가입/로그인하면 리디렉션 URL로 입력한 URL로 리디렉션됩니다. 이 URL에는 사용자의 세션 토큰으로 인수가 추가되며, 다음과 비슷하게 보입니다:

`https://[YOUR_WEB_SITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## 인증 프로세스

리디렉션 URL의 쿼리 매개변수는 사용자의 계정과 관련 세션 토큰입니다. 다음 접근 방식을 사용하여 쿼리 매개변수를 배열에 매핑할 수 있습니다:

```js showLineNumbers
const user_accounts = [
  {
    계좌: 'cr799393',
    토큰: 'a1-f7pnteezo4jzhpxclctizt27hyeot',
    통화: 'usd',
  },
  {
    계좌: 'vrtc1859315',
    토큰: 'a1clwe3vfuuus5kraceykdsoqm4snfq',
    통화: 'usd',
  },
];
```

사용자의 **선택** 계정을 기반으로 사용자를 인증하려면 사용자의 **선택** 계정 **세션 토큰**을 사용하여 [authorize](/api-explorer#authorize) API 호출을 호출합니다:

```js showLineNumbers
{
  "authorize": "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

authorize\\\\\\` 호출에 대한 응답은 아래와 같은 객체입니다:

```js showLineNumbers
{
    "account_list": [
      {
        "account_type": "trading",
        "created_at": 1647509550,
        "통화": "USD",
        "is_disabled": 0,
        "is_virtual": 0,
        "landing_company_name": "svg",
        "로그인id": "CR799393",
        "트레이딩": {}
      },
      {
        "account_type": "trading",
        "created_at": 1664132232,
        "통화": "ETH",
        "is_disabled": 0,
        "is_virtual": 0,
        "landing_company_name": "svg",
        "로그인id": "VRTC1859315",
        "트레이딩": {}
      },
    ],
    "잔고": 0,
    "국가": "id",
    "통화": "USD",
    "이메일": "user_mail@email_provider.com",
    "성명": " John Doe",
    "is_virtual": 0,
    "landing_company_fullname": "Deriv (SVG) LLC",
    "landing_company_name": "svg",
    "local_currencies": {
      "IDR": {
        "fractional_digits": 2
      }
    },
    "로그인id": "CR799393",
    "preferred_language": "EN",
    "범위": [
      "읽기",
      "트레이드",
      "trading_information",
      "결제",
      "관리자"
    ],
    "트레이딩": {},
    "upgradeable_landing_companies": [
      "svg"
    ],
    "user_id": 12345678
  }
```

이제 사용자에게 권한이 부여되었으며 계정을 대신하여 Deriv API 호출을 사용할 수 있습니다.
