---
title: إعداد اتصال WebSocket
sidebar_label: اتصال WebSocket
sidebar_position: 1
tags:
  - جافا سكريبت
keywords:
  - ياءات
  - اتصال مأخذ الويب
description: دليل حول كيفية إعداد اتصال WebSocket بواجهة برمجة تطبيقات WebSocket على تطبيق التداول الخاص بك.
---

:::caution

إذا لم تكن معتادًا على WebSockets، يُرجى مراجعة [وثائقنا] (/docs/core-concepts/websocket).

:::

### إعداد اتصال WebSocket

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

بعد ذلك، سننشئ اتصال WebSocket بخادم Deriv WebSocket كما هو موضح أدناه:

```js title="index.js" showLineNumbers
const app_id = 1089؛ // استبدلها بـ app_id الخاص بك أو اتركها على أنها 1089 للاختبار.
const websocket = WebSocket جديد (`wss://wss://ws.derivws.derivws.com/websockets/v3?app_id=${app_id}');
```

:::info
'app_id = 1089' لأغراض الاختبار فقط. يرجى تحديثه بمعرف التطبيق الخاص بك عند إطلاق تطبيقك على بيئة إنتاج. يرجى مراجعة [هذا الدليل](/docs/docs/ seting-up-a-deriv-application) لإنشاء تطبيق جديد لنفسك.
:::

عند هذه النقطة، نحن متصلون بـ "خادم WebSocket". لكننا لا نتلقى أي بيانات. لإرسال أو استقبال البيانات، علينا "الاشتراك" في <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">أحداث الويب سوكيت</a>.

بشكل عام، لدينا 4 أحداث على 'اتصالات WebSocket':

- **إغلاق**:
  يتم تشغيله عند إغلاق اتصال مع WebSocket. متاح أيضاً عبر خاصية onclose.
- **فتح**:
  يتم تشغيله عند فتح اتصال مع WebSocket. متاح أيضاً عبر خاصية "أونوبن".
- **رسالة**:
  يتم تشغيلها عند استلام البيانات من خلال WebSocket. متاح أيضًا عبر خاصية onmessage.
- **خطأ**:
  يتم تشغيله عندما يتم إغلاق اتصال مع WebSocket بسبب خطأ، مثل عندما يتعذر إرسال بعض البيانات. متاح أيضًا عبر خاصية onror.

لنضف مستمع أحداث لهذه الأحداث على اتصال WebSocket الخاص بنا.

```js title="index.js" showLineNumbers
// الاشتراك في حدث 'فتح'
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', ', event);
})؛

// الاشتراك في حدث 'رسالة'
websocket.addEventListener('message', (event) => {
  console.log('new message received from server: ', ', event);
})؛

// الاشتراك في حدث 'إغلاق'
websocket.addEventListener('close', (event) => (حدث) {
  console.log('websocket connection closed: ', ', event);
})؛

// الاشتراك في حدث 'خطأ'
websocket.addEventListener('error', (event) => (حدث) {
  console.log('an error happened in our websocket connection', event);
})؛ });
```

والآن، افتح ملف 'index.html' في متصفحنا وتحقق من وحدة تحكم المطورين. يجب أن ترى فقط سجل "تم إنشاء اتصال WebSocket".

### إرسال البيانات واستقبالها

يوفّر خادم WebSocket الخاص بنا وظيفة <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">التنصت/التدوير</a>. لنستخدمه في مشروعنا التجريبي لإرسال البيانات واستقبالها. قم بتغيير مستمعي الحدث ل 'فتح' و 'رسالة' على النحو التالي:

:::caution
لا تستقبل الدالة 'إرسال' على اتصال WebSocket سوى 'سلسلة' و 'مخزن صفيف' و 'بلوب' و 'مصفوفة نمطية' و 'عرض البيانات'. يمكنك قراءة المزيد عنها على موقع [MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send). هذا يعني أننا إذا أردنا إرسال "كائن"، فعلينا أن نوتره باستخدام "JSON.stringify" أولاً.
:::

```js title="index.js" showLineNumbers
// الاشتراك في حدث 'فتح'
websocket.addEventListener('open', (event) => {
  console.log('websocket connection established: ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);
})؛

// الاشتراك في حدث 'رسالة'
websocket.addEventListener('message', (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', ', receivedMessage);
});
```

ستكون "الرسالة المتلقاة" كائنًا على هذا النحو:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  }،
  msg_type: "ping",
  ping: "pong"
}
```

تهانينا :tada:

لقد قمت للتو بإنشاء أول مشروع تجريبي باستخدام WebSockets.

:::tip
يُستخدم طلب 'ping' في الغالب لاختبار الاتصال أو لإبقائه على قيد الحياة.
:::

### إبقاء اتصال WebSocket على قيد الحياة

بشكل افتراضي، سيتم إغلاق اتصالات 'WebSocket' عندما لا يتم إرسال أي حركة مرور بينهما لمدة **180 ثانية تقريبًا**. تتمثل إحدى طرق الحفاظ على الاتصال حيًا في إرسال طلبات [ping](/apiexplorer#ping) بفواصل زمنية **120 ثانية**. سيؤدي ذلك إلى إبقاء الاتصال حياً ونشطاً.

من أمثلة الإعداد البسيط ما يلي:

```js title="index.js" showLineNumbers
const ping_interval = 12000؛ // إنه بالمللي ثانية، وهو ما يساوي 120 ثانية
دع الفاصل الزمني؛
websocket.addEventListener('open', (الحدث) => {
  console.log('websocket اتصال تم تأسيسه: ', ', event);
  const sendMessage = JSON.stringify({ ping: 1 }) ؛
  websocket.send(sendMessage);

  // لإبقاء الاتصال حيًا
  الفاصل الزمني = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.إرسال (sendMessage)؛
  }، ping_interval)؛
})؛

// الاشتراك في حدث 'الإغلاق'
websocket.addEventListener('close', (الحدث) => {
  console.log('websocket connection closeded: "، الحدث)؛
  clearInterval(interval)؛
});
```

والآن، عندما يتم "إنشاء" الاتصال، نبدأ في إرسال طلبات "التصفح" بفواصل زمنية قدرها "12000 مللي ثانية".

يجب أن يكون الرمز النهائي الخاص بك هو

```js title="index.js" showLineNumbers
const app_id_id = 1089؛ // استبدلها بـ app_id الخاص بك أو اتركها على حالتها 1089 للاختبار.
const websocket = WebSocket جديد (`wss://wss://ws.derivws.com/websockets/v3?app_id=${app_id}')؛
const ping_interval = 12000؛ // إنها بالمللي ثانية، والتي تساوي 120 ثانية
دع الفاصل الزمني؛

// الاشتراك في حدث 'فتح'
websocket.addEventEventListener('open', (event) => (حدث) {
  console.log('websocket connection established: ', ', event);
  const sendMessage = JSON.stringify({ ping: 1 });
  websocket.send(sendMessage);

  // لإبقاء الاتصال حيًا
  الفاصل الزمني = setInterval((() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    websocket.send(sendMessage);
  }, ping_interval);
})؛

// الاشتراك في حدث 'رسالة'
websocket.addEventListener('message', (الحدث) => {
  const receivedMessage = JSON.parse(event.data);
  console.log('new message received from server: ', ', receivedMessage);
})؛

// الاشتراك في حدث 'إغلاق'
websocket.addEventListener('close', (event) => {
  console.log('websocket connection closeded: ',', event);
  clearInterval(interval);
})؛

// الاشتراك في حدث 'خطأ'
websocket.addEventListener('error', (event) => {
  console.log('an error happened in our websocket connection', event);
})؛ });
```
