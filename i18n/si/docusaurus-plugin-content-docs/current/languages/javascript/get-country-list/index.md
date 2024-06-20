---
title: රටවල ලැයිස්තුව ලබා ගන්න
sidebar_label: රටවල් ලැයිස්තුවක් ලබා ගන්න
sidebar_position: 2
tags:
  - රටවල්_ලැයිස්තුව
  - javascript
keywords:
  - රටවල්_ලැයිස්තුව
  - javascript
description: ඔබේ වෙළඳ යෙදුමට රටවල් ලැයිස්තුවක් එක් කිරීමෙන් ඔබේ පරිශීලකයින් පිළිබඳ තොරතුරු ලබා ගන්න. මෙම JavaScript API උදාහරණයෙන් එය කරන්නේ කෙසේදැයි ඉගෙන ගන්න.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

රටවල් ලැයිස්තුවක් ලබා ගැනීමට, පහත ප්‍රවේශය භාවිතයෙන් විවෘත සිදුවීම් සවන්දෙන්නා යාවත්කාලීන කරන්න:

```js title="index.js" showLineNumbers
const ping_interval = 12000;//එය මිලිතත්පර වලින්, එය තත්පර 120 ට සමාන වේ
පරතරය ඉඩ;
//`open` සිදුවීමට දායක වන්න
WebSocket.addEventListener ('විවෘත', (සිදුවීම) => {
  console.log ('websocket සම්බන්ධතාවය ස්ථාපිත: ', සිදුවීම);
  const payload = JSON.stringify ({
    residence_list: 1,
  });
  websocket.send (payload);

  //සම්බන්ධතාවය ජීවතුන් අතර තබා ගැනීමට
  පරතරය = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});
```

දැන්, දත්ත විදහා දැක්වීම සඳහා `පණිවිඩය` සිදුවීම් සවන් දෙන්නා යාවත්කාලීන කරන්න:

```js title="index.js" showLineNumbers
//`message` සිදුවීමට දායක වන්න
WebSocket.addEventListener ('පණිවිඩය', (සිදුවීම) => {
  const ReceivedMessage = JSON.parse (event.data);
  මාරු (ReceivedMessage.msg_type) {
    නඩුව 'residence_list':
      console.log ('රටවල් ලැයිස්තුව', ReceivedMessage.residence_list);
      විවේකය; නඩුව 'පිං':

      console.log ('පිං/පොං ප්රතිචාරය: ', ReceivedMessage.ping);
      කැඩීම;
    පෙරනිමි:
      console.log ('ලැබුණු පණිවිඩය:', ලැබුනු පණිවිඩය);
      කැඩීම;
  }
});
```

ප්‍රතිචාරය වස්තුවක් විය යුතුය:

```json showLineNumbers
{
  "echo_req": {
    "req_id": 1,
    "residence_list": 1
  },
  "msg_type": "residence_list",
  "req_id": 1,
  "residence_list": [
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {},
            "is_country_supported": 0
          }
        }
      },
      "phone_idd": "35818",
      "text": "Aland Islands",
      "value": "ax"
    },
    {
      "identity": {
        "services": {
          "idv": {
            "documents_supported": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "documents_supported": {
              "driving_licence": {
                "display_name": "Driving Licence"
              },
              "national_identity_card": {
                "display_name": "National Identity Card"
              },
              "passport": {
                "display_name": "Passport"
              }
            },
            "is_country_supported": 1
          }
        }
      },
      "phone_idd": "355",
      "text": "Albania",
      "tin_format": ["^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"],
      "value": "al"
    }
  ]
}
```

මෙම ඇමතුම සමඟ, ඔබට සහාය දක්වන රටවල් පිළිබඳ මෙවැනි ප්‍රයෝජනවත් තොරතුරු ලැබෙනු ඇත:

- සෑම රටකටම `අකුරු 2` කේතයක්
- සෑම රටකටම 'අනන්යතාව' සේවා සපයන්නන්
- රට බදු හඳුනාගැනීමේ ආකෘතිය (`tin_format`)
- ආදිය

ගිණුම් සෑදීමේ පෝරම සඳහා මෙය ප්‍රයෝජනවත් විය හැකි අතර, පරිශීලකයන් පදිංචි රට අනුව ඔවුන්ගේ අනන්‍යතා පදනම පිළිබඳ වලංගු තොරතුරු සපයන මෙන් ඔබ ඔවුන්ගෙන් ඉල්ලා සිටිය යුතුය.

:: :warning
ලිපින සහ බදු හැඳුනුම්පත් වලංගු කිරීම් සඳහා කරුණාකර රට සඳහා සපයා ඇති 'tin_format' භාවිතා කරන්න.
:::

ඔබේ ඊළඟ පියවර සඳහා පරිශීලකයාගේ රට වැදගත් වේ. එය ඔවුන්ට භාවිත කළ හැකි වත්කම් සහ විශේෂාංග තීරණය කරයි.

:::tip
ඔබේ පෝරමය ජනගත කිරීමට පෙර රටවල ලැයිස්තුව ලබා ගැනීම වඩා හොඳය.
:::

:::danger
`IDV` සහ `ONFIDO` අනන්යතා සේවා, ඒවායේ වෙනස්කම් සහ හැකියාවන් ගැන සවිස්තරාත්මක අන්තර්ගතයක් ඔබට අවශ්ය වනු ඇත.
:::

ඔබගේ අවසාන කේතය වනුයේ:

```js title="index.js" showLineNumbers
const app_id = 1089;//ඔබගේ app_id සමඟ ප්රතිස්ථාපනය කරන්න හෝ පරීක්ෂා කිරීම සඳහා 1089 ලෙස තබන්න.
const websocket = නව වෙබ්සොකට් (`wss: //ws.derivws.com/websockets/v3? app_id=${app_id}`);
const ping_interval = 12000;//එය මිලිතත්පර වලින් වේ, එය තත්පර 120 ට සමාන වන
පරතරය ඉඩ;

//` open` සිදුවීමට දායක වන්න
WebSocket.addEventListener ('විවෘත', (event) => {console.log ('websocket) සම්බන්ධතාවය ස්ථාපිත කර ඇත:',
  සිදුවීම);
  const payload = JSON.stringify ({
    residence_list: 1,
  });
  websocket.send (payload);

  //සම්බන්ධතාවය ජීවතුන් අතර තබා ගැනීමට
  පරතරය = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (sendMessage);
  }, ping_interval);
});

//`message` සිදුවීමට දායක වන්න
WebSocket.addEventListener ('පණිවිඩය', (සිදුවීම) => {
  const ReceivedMessage = JSON.parse (event.data);
  මාරු (ReceivedMessage.msg_type) {
    නඩුව 'Residence_list':
      console.log ('රටවල් ලැයිස්තුව', ReceivedMessage.residence_list); කැඩීම;

    නඩුව 'පිං':
      console.log ('පිං/පොං ප්රතිචාරය: ', ReceivedMessage.ping);
      විවේකය;
    පෙරනිමි:
      console.log ('ලැබුණු පණිවිඩය:', ලැබුනු පණිවිඩය);
      විවේකය;
  }
});

//`වසන්න` සිදුවීමට දායක වන්න
WebSocket.addEventListener ('close', (event) => {
  console.log ('වෙබ්සොකට් සම්බන්ධතා වසා ඇත: ', සිදුවීම);
  ClearInterval (interval);
});

//`දෝෂ` සිදුවීමට දායක වන්න
WebSocket.addEventListener (' error ', (event) => {
  console.log ('අපගේ වෙබ් සොකට් සම්බන්ධතාවයේ දෝෂයක් හටගත්ත', සිදුවීම);;

```
