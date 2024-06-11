---
title: 개방형 인증
hide_title: true
draft: false
sidebar_label: OAuth2
sidebar_position: 4
tags:
  - 개념
  - 받으세요
  - 수입
  - 커미션
  - 마크업
keywords:
  - 개념
  - 받으세요
  - 수입
  - 커미션
  - 마크업
description: OAuth 인증, API 토큰 없이 로그인하는 방법, 트레이딩 앱의 사용자 환경을 개선하는 데 사용하는 방법에 대해 알아보세요.
---

## OAuth2란 무엇인가요?

OAuth는 개방형 인증의 약자로, 클라이언트가 사용자의 로그인 자격 증명을 공개하지 않고도 서버의 사용자 리소스에 액세스할 수 있도록 하는 프로토콜입니다.

이러한 유형의 인증을 통해 클라이언트는 API 토큰을 만들지 않고도 자신의 파생 계정을 사용하여 타사 앱에 로그인할 수 있습니다. 이 경우 타사 앱은 사용자의 비밀번호나 영구 API 토큰을 볼 수 없으므로 더 안전합니다.

OAuth2 인증은 더 많은 설정 단계가 필요하지만 개발자가 클라이언트에 앱에 대한 액세스 권한을 부여할 수 있는 가장 안전한 방법입니다.

OAuth2에 대한 자세한 내용은 [이 가이드](https://aaronparecki.com/oauth-2-simplified/)를 참조하세요.

### OAuth 인증 사용 방법

1. 앱 등록 페이지의 **웹사이트 URL 필드**에 **OAuth 리디렉션 URL**로 사용할 URL을 지정합니다.

2. 웹사이트 또는 앱에 로그인 버튼을 추가하고 사용자를 'https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id'로 안내합니다(여기서 your_app_id는 앱의 ID).

3. 사용자가 가입하면 **리디렉션 URL**로 입력한 URL로 리디렉션됩니다. 이 URL에는 사용자의 세션 토큰으로 인수가 추가되며 다음과 비슷하게 보입니다: `https://[YOUR_WEBSITE_URL]/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=`

4. URL의 매개변수에서 모든 계정과 각 계정의 세션 토큰을 확인할 수 있습니다. 계정을 대신하여 작업을 수행하려면 이 토큰을 Authorize API 호출에 전달하세요.
