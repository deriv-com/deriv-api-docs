---
title: إعداد المشروع | جافا سكريبت
sidebar_label: إعداد المشروع
sidebar_position: 0
tags:
  - جافا سكريبت
keywords:
  - ياءات
  - إعداد المشروع
description: أنشئ دليلاً لمشروع تطبيق تداول واجهة برمجة التطبيقات (API) التالي باستخدام WebSocket.
---

### إنشاء مشروع

سنقوم بإنشاء صفحة "HTML" بسيطة تحتوي على ملف JavaScript الخاص بنا، والذي سيتعامل مع اتصال WebSocket الخاص بنا. أولاً، قم بإنشاء دليل لمشروعك التالي:

```bash
mkdir deriv-websocket-demo التجريبي
```

انتقل إلى مجلد "deriv-websocket-demo":

```bash
cd deriv-websocket-demo التجريبي
```

بعد ذلك، قم بإنشاء الملفات المطلوبة كما ترى أدناه:

```bash
اللمس index.html index.css index.js
```

:::tip
نقترح استخدام [Visual Studio Code] (https://code.visualstudio.com/) مع تمكين [ملحق الخادم المباشر] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). سيساعدك هذا كثيرًا في عمليات التنفيذ.
:::

والآن، افتح ملف 'index.html' أو استخدم [ملحق الخادم المباشر] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

الآن، قم بتغيير محتوى الملفات باستخدام الطريقة التالية:

```js title="index.js" showLineNumbers
console.log('سننشئ اتصال الويب سوكيت الخاص بنا هنا');
```

```html title="index.html" showLineNumbers
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>العرض التوضيحي ل HTML JS المشتق</title>
  </head>
  <body>
    <h2>عرض توضيحي لواجهة برمجة تطبيقات ويب سوكيت المشتقة</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

بعد إضافة المحتوى، يمكننا تشغيل التطبيق ببساطة عن طريق تنفيذ ملف 'index.html' أو باستخدام <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">ملحق الخادم المباشر</a>. عند تشغيل تطبيقك، انظر في وحدة التحكم إذا كان 'console.log' يظهر في وحدة التحكم. ثم تعرف أن ملف JavaScript يعمل بحيث يمكن تنفيذ اتصال الويب سوكيت بشكل صحيح.

لإعداد مقبس الويب المشتق، يمكنك المتابعة إلى صفحة [اتصال ويب سوكيت] (/docs/languages/javascript/websocket-connection).
