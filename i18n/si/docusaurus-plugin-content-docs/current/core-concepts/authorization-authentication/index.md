---
title: API සත්යාපනය
hide_title: false
draft: false
sidebar_label: API සත්යාපනය
sidebar_position: 2
tags:
  - සත්‍යාපනය
  - අවසරය
keywords:
  - deriv-සත්‍යාපනය
  - ව්යුත්පන්න බලය
description: API ටෝකනයක් සමඟ පරිශීලකයින් සත්යාපනය කිරීමෙන් ඔබේ වෙළඳ යෙදුමේ සම්පූර්ණ ඩෙරිව් API විශේෂාංග කට්ටලයට ප්රවේශ වන්න. API උදාහරණයකින් මෙය කිරීමට ඉගෙන ගන්න.
---

අවසරය සහ සත්‍යාපනය නොමැතිව ඔබට අපගේ API ඇමතුම් සහ විශේෂාංගවලින් දළ වශයෙන් අඩකට පමණක් ප්‍රවේශය ලැබෙනු ඇත. උදාහරණයක් ලෙස, කොන්ත්රාත් මිලදී ගැනීමට හෝ `පිටපත් වෙළඳාම` විශේෂාංග උපයෝගී කර ගැනීමට නම්, ඔබේ පරිශීලකයින් අපගේ **OAuth** සැපයුම්කරු සහ **WebSocket සේවාදායකය** විසින් සත්යාපනය කර බලය ලබා ගත යුතුය.

## අපි ආරම්භ කිරීමට පෙර

කරුණාකර ඉදිරියට යාමට පහත සඳහන් සියලු අවශ්‍යතා ඔබ සතුව ඇති බවට වග බලා ගන්න.

### අවශ්‍යතා

1. Deriv සේවාදායක ගිණුම
2. සුදුසු ප්‍රවේශ මට්ටම සහිත Deriv API ටෝකනය
3. Deriv යෙදුම් හැඳුනුම්පත

:::note
Deriv API ටෝකනයක් සහ යෙදුමක් නිර්මාණය කරන්නේ කෙසේද යන්න පිළිබඳ සවිස්තරාත්මක උපදෙස් සඳහා කරුණාකර [Deriv යෙදුමක් සැකසීම] (/docs/setting-up-a-deriv-application) වෙත යොමු වන්න.
:::

### API ටෝකනය

API ටෝකනයක් යනු සේවාදායකයකින් ප්‍රවේශය ඉල්ලා සිටින සේවාලාභියෙකුගේ අනන්‍ය හඳුනා ගැනීමකි. එය අවසර දීමේ සරලම ක්‍රමයයි.

එක් එක් API ටෝකන් සඳහා ප්රවේශ මට්ටම එක් එක් API ඇමතුමක අවශ්ය ප්රවේශ මට්ටමට ගැලපෙන අතර එය [API Explorer] (/api-explorer) හි ද සොයාගත හැකිය.

උදාහරණයක් ලෙස, පහත තිර රුවක් මත, ගිණුම් තත්ත්‍වය භාවිත කිරීමට හැකි වීම සඳහා, කියවීමට ප්‍රවේශ මට්ටමක් සහිත ටෝකනයක් භාවිත කළ යුතු බව ඔබට දැක ගත හැක.

![](/img/acc_status_scope_api_explorer.png)

WebSocket සම්බන්ධතාවයක අවසරය ලැබීමෙන් පසුව, එම සම්බන්ධතාවයේ පසුව ලැබෙන ඇමතුම් පරිශීලක ක්‍රියා ලෙස සලකනු ලැබේ.

කරුණාකර API ටෝකනය ඕනෑම යෙදුමක් සමඟ භාවිත කළ හැකි බව මතක තබා ගන්න, එබැවින් ඔබේ යෙදුම මෙන්ම ඔබේ සේවාදායකයින් ද එය ආරක්ෂිතව තබා ගත යුතුය.

### OAuth2

OAuth කියන්නේ `විවෘත අධිකරණය` - අක්තපත්ර හෙළි නොකර පරිශීලකයා වෙනුවෙන් සේවාදායකයෙකුට සේවාදායකයෙකුට සත්කාරකත්වය සපයන සම්පත් වෙත ප්රවේශ වීමට ඉඩ සලසන ප්රොටෝකෝලයක් වේ.

මෙම ආකාරයේ අවසරය API ටෝකනයක් සෑදීමෙන් තොරව ඔවුන්ගේ Deriv ගිණුම් භාවිතයෙන් තෙවන පාර්ශ්ව යෙදුම් වෙත පුරනය වීමට සේවාලාභීන්ට ඉඩ සලසයි. මෙම අවස්ථාවෙහිදී, තෙවන පාර්ශවීය යෙදුම පරිශීලකයාගේ මුරපදය හෝ එය ආරක්ෂා කරන ස්ථිර API ටෝකනය නොදකියි.

OAuth2 සත්‍යාපනය පිහිටුවීමට තවත් පියවර අවශ්‍ය වේ, නමුත් සංවර්ධකයින්ට ඔවුන්ගේ සේවාදායකයින් සමඟ ඔවුන්ගේ යෙදුමට ප්‍රවේශය බෙදා ගැනීම සඳහා ඇති ආරක්ෂිතම ක්‍රමය එයයි.

OAuth2 පිළිබඳ වැඩි විස්තර සඳහා, [මෙම මාර්ගෝපදේශය] වෙත පිවිසෙන්න (https://aaronparecki.com/oauth-2-simplified/).

OAuth අවසර සම්බන්ධතාවය ක්‍රියා කරන ආකාරය පිළිබඳ දෘශ්‍ය නිරූපණය මෙන්න:

! [OAuth ප්රවාහය] (/img/how_oauth_works.png 'OAuth flow')

## සත්‍යාපන ක්‍රියාවලිය

ඔබේ පරිශීලකයා සත්‍යාපනය කිරීම සඳහා, පාලක පුවරු පිටුවේ, **OAuth විස්තර** ක්ෂේත්‍රය තුළ **අයදුම්පත ලියාපදිංචි කරනුම** ටැබයේ යෙදුමෙහි OAuth යළි-යොමුවීම් URL එක ලෙස භාවිත කරනු ලබන URL එක සඳහන් කරන්න. එවිට, ඔබේ වෙබ් අඩවියේ හෝ යෙදුමේ පිවිසුම් බොත්තමක් එක් කර පරිශීලකයින්\*\*`https://oauth.deriv.com/oauth2/authorize?app_id=your_app_id`\*\* වෙත යොමු කරන්න, එහිදී your_app_id යනු ඔබේ යෙදුමේ හැඳුනුම්පත වේ.

! [Deriv OAuth පිවිසුම්] (/img/oauth_login.png 'ඩෙරිව් OAuth ලොගින් වීම')

පරිශීලකයෙකු ලියාපදිංචි වූ පසු/ලොග් වූ පසු, ඔවුන් ඔබ යළි-යොමුවීම් URL ලෙස ඇතුළත් කළ URL එක වෙත හරවා යවනු ලැබේ. මෙම URL එක පරිශීලකයාගේ සැසි ටෝකන සමඟ තර්ක එකතු කර ඇති අතර, පහත දැක්වෙන ආකාරයට සමාන වනු ඇත:

`https://[YOUR_WEBSITE_URL]/redirect/? acct1=cr799393& token1 = a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315 & token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd`

## අවසර ක්‍රියාවලිය

යළි-යොමුවීම් URL එකෙහි විමසුම් පරාමිති වන්නේ පරිශීලකගේ ගිණුම් සහ ඒවාට අදාළ සැසි ටෝකනයි. පහත ප්‍රවේශය භාවිතයෙන් ඔබට විමසුම් පරාමිති අරාවකට සිතියම්ගත කළ හැක:

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

පරිශීලකයාගේ **තෝරාගත්** ගිණුම මත පදනම්ව පරිශීලකයාට බලය පැවරීම සඳහා, පරිශීලකයාගේ **තෝරා** ගිණුම**සැසි ටෝකනය** සමඟ [autorize] (/api-explorer #authorize) API ඇමතුම අමතන්න:

```js showLineNumbers
{
  "authorize": "a1-f7pnteezo4jzhpxclctizt27hyeot"
}
```

`Authorize` ඇමතුම සඳහා ප්රතිචාරය පහත පරිදි වස්තුවක් වනු ඇත:

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

දැන්, පරිශීලකයාට අවසර දී ඇති අතර, ඔබට ගිණුම වෙනුවෙන් Deriv API ඇමතුම් භාවිත කළ හැක.
