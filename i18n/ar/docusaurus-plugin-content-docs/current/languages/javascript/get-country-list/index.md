---
title: الحصول على قائمة الدول
sidebar_label: احصل على قائمة بالدول
sidebar_position: 2
tags:
  - قائمة_البلدان
  - جافا سكريبت
keywords:
  - قائمة_البلدان
  - جافا سكريبت
description: احصل على معلومات حول المستخدمين من خلال إضافة قائمة بالبلدان إلى تطبيق التداول الخاص بك. تعرف على كيفية القيام بذلك من خلال مثال واجهة برمجة تطبيقات JavaScript هذا.
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

للحصول على قائمة البلدان، قم بتحديث مستمع الحدث المفتوح باستخدام الطريقة التالية:

```js title="index.js" showLineNumbers
const ping_interval = 12000؛ // إنه بالمللي ثانية، وهو ما يساوي 120 ثانية
دع الفاصل الزمني؛
// الاشتراك في حدث 'فتح'
websocket.addEventListener('open', (الحدث) => {
  console.log('websocket connection established: ', ', event);
  const const const payload = JSON.stringify({
    residence_list: 1,
  })؛
  websocket.send(payload);

  // لإبقاء الاتصال حيًا
  الفاصل الزمني = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 })؛
    websocket.send(sendMessage)؛
  }, ping_interval)؛
});
```

والآن، حدِّث مُستمع حدث "الرسالة" لعرض البيانات:

```js title="index.js" showLineNumbers
// الاشتراك في حدث 'الرسالة'
websocket.addEventListener('message', (event) => (الحدث) {
  const receivedMessage = JSON.parse(event.data);
  التبديل (receivedMessage.msg_type) {
    حالة 'residence_list':
      console.log('list of countries', receivedMessage.residence_list)؛
      فاصل؛
    حالة 'ping':
      وحدة التحكم .log('ping/pong response: ', ', receivedMessage.ping)؛
      فاصل؛ فاصل؛
    افتراضي:
      وحدة التحكم وحدة التحكم سجل ('تلقيت الرسالة: ', ', receivedMessage)؛
      فاصل؛
  }.
});
```

يجب أن يكون الرد كائنًا:

```json showLineNumbers
{
  "echo_req": {
    "req_id": 1,
    "قائمة_الإقامة": 1
  },
  "msg_type": "residence_list",
  "req_id": 1,
  "قائمة_الإقامة": [
    {
      "الهوية": {
        "الخدمات": {
          "idv": {
            "المستندات_مدعومة": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "المستندات_مدعومة": {},
            "is_country_supported": {}, "is_country_supported": 0
          }
        }
      },
      "phone_idd": "35818"،
      "النص": "جزر ألاند"،
      "القيمة": "ax"
    }،
    {
      "هوية": {
        "الخدمات": {
          "idv": {
            "المستندات_مدعومة": {},
            "has_visual_sample": 0,
            "is_country_supported": 0
          },
          "onfido": {
            "المستندات_مدعومة": {
              "رخصة_قيادة": {
                "اسم_العرض": "Driving Licence"
              },
              "national_identity_card": {
                "اسم_العرض": { "display_name": "بطاقة الهوية الوطنية"
              }،
              "جواز السفر": {
                "اسم_العرض": "جواز السفر"
              }.
            }،
            "is_country_supported": 1
          }
        }
      }،
      "phone_idd": "355"،
      "نص": "ألبانيا"،
      "tin_format": ["^ [A-Ta-ta-t0-9]\\d{8}[A-Wa-W] $"]،
      "القيمة": "al"
    } ]
  ]
}
```

من خلال هذه المكالمة، ستحصل على معلومات مفيدة حول البلدان المدعومة، مثل:

- رمز "2 حرف" لكل دولة
- مقدمو خدمات "الهوية" لكل دولة
- تنسيق معرّف ضريبة البلد (`Tin_format`)
- إلخ.

يمكن أن يكون هذا مفيدًا لنماذج إنشاء الحساب، والتي تحتاج فيها إلى أن تطلب من المستخدمين تقديم معلومات موثقة حول قاعدة هويتهم، اعتمادًا على بلد إقامتهم.

:: :: تنبيه
للتحقق من صحة العنوان ومعرف الضريبة، يرجى استخدام "tin_format" المقدم للبلد.
:::

بلد المستخدم مهم لخطواتك التالية. يحدد الأصول والميزات التي يمكنهم استخدامها.

:::tip
من الأفضل الحصول على قائمة البلدان قبل ملء النموذج الخاص بك.
:::

:::danger
ستحتاج إلى محتوى مفصّل حول خدمات الهوية "IDV" و"ONFIDO" والاختلافات بينهما وإمكانياتهما.
:::

سيكون رمزك النهائي هو

```js title="index.js" showLineNumbers
const app_id_id = 1089؛ // استبدله بـ app_id الخاص بك أو اتركه على حاله 1089 للاختبار.
const websocket = WebSocket جديد (`wss://wss://ws.derivws.com/websockets/v3?app_id=${app_id}')؛
const ping_interval = 12000؛ // إنه بالمللي ثانية، وهو ما يساوي 120 ثانية
دع الفاصل الزمني؛

// الاشتراك في حدث 'فتح'
websocket.addEventEventListener('open', (event) => (الحدث) {
  console.log('websocket connection established: ', ', event);
  const payload = JSON.stringify({
    residence_list: 1,
  });
  websocket.send(payload);

  // لإبقاء الاتصال حيًا
  الفاصل الزمني = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 })؛
    websocket.send(sendMessage);
  }, ping_interval);
})؛

// الاشتراك في حدث 'رسالة'
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  التبديل (receivedMessage.msg_type) {
    حالة 'residence_list':
      وحدة التحكم.log('list of countries', receivedMessage.residence_list);
      break;
    case 'ping':
      console.log('ping/pong response: ', ', receivedMessage.ping);
      break;
    break; default:
      console.log('received message: ', ', receivedMessage);
      break;
  }.


// الاشتراك في حدث 'الإغلاق'
websocket.addEventListener('close', (الحدث) => (الحدث): {
  console.log('websocket connection closeded: ', ', event);
  clearInterval(interval);
})؛

// الاشتراك في حدث 'الخطأ'
websocket.addEventListener('error', (الحدث) => {
  console.log('حدث خطأ في اتصال الويب سوكيت'، الحدث)؛
})؛ });
```
