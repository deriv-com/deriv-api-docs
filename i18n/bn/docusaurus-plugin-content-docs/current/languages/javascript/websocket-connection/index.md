---
title: একটি ওয়েবসকেট সংযোগ সেটআপ করুন
sidebar_label: ওয়েবসকেট সংযোগ
sidebar_position: 1
tags:
  - জাভাস্ক্রিপ্ট
keywords:
  - js
  - ওয়েবসকেট-সংযোগ
description: আপনার ট্রেডিং অ্যাপে ওয়েবসকেট এপিআইতে কীভাবে ওয়েবসকেট সংযোগ সেট আপ করবেন সে সম্পর্কে একটি গাইড।
---

:::caution

আপনি যদি ওয়েবসকেটগুলির সাথে পরিচিত না হন তবে দয়া করে [আমাদের ডকুমেন্টেশন] (/ডকস/কোর-ধারণা/ওয়েবসকেট) দেখুন।

:::

### একটি Websocket সংযোগ সেট আপ করুন

<!-- To create a websocket connection, we want to use the Deriv websocket URL with an `app_id`. You can create your own app_id within your [dashboard](/dashboard) or keep the default `1089` app_id for testing. Keep in mind that eventually, you should make your own app_id. Especially if you would like to monetize your application. -->

পরবর্তী, আমরা Deriv WebSocket সার্ভারে একটি WebSocket সংযোগ তৈরি করব যা নীচে দেখানো হয়েছে:

```js title="index.js" showLineNumbers
const app_id = 1089;//আপনার অ্যাপ_আইডি দিয়ে প্রতিস্থাপন করুন বা পরীক্ষার জন্য 1089 হিসাবে ছেড়ে দিন।
কনস্ট ওয়েবসকেট = নতুন ওয়েবসকেট (`wss: //ws.deriws.com/websockets/v3? app_id =${app_id}`);
```

:::info
`app_id = 1089` শুধু পরীক্ষার উদ্দেশ্যে। একটি উত্পাদন পরিবেশে আপনার অ্যাপ্লিকেশন প্রকাশ করার সময় দয়া করে আপনার নিজস্ব app_id দিয়ে এটি আপডেট করুন। নিজের জন্য একটি নতুন অ্যাপ তৈরি করতে দয়া করে [এই গাইড] (/docs/setting-up-a-deriv-application) পরীক্ষা করুন।
:::

এই মুহুর্তে, আমরা `ওয়েবসকেট সার্ভার` এর সাথে সংযুক্ত আছি। কিন্তু, আমরা কোনও তথ্য পাই না। ডেটা প্রেরণ বা গ্রহণ করতে, আমাদের <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events" target="_blank">ওয়েবসকেট ইভেন্টস</a>এ 'সাবস্ক্রাইব করতে হবে'।

সাধারণত, আমাদের \`ওয়েবসকেট সংযোগসমূহ'তে 4 টি ইভেন্ট রয়েছে:

- **বন্ধ করুন**:
  ওয়েবসকেটের সাথে সংযোগ বন্ধ হয়ে গেলে ফায়ার করা হয়। এছাড়াও onclose সম্পত্তি মাধ্যমে উপলব্ধ।
- **খোলা**:
  ওয়েবসকেটের সাথে সংযোগ খোলা হলে ফায়ার করা হয়। এছাড়াও onopen সম্পত্তি মাধ্যমে উপলব্ধ।
- **বার্তা**:
  ওয়েবসকেটের মাধ্যমে ডেটা প্রাপ্ত হলে ফায়ার করা হয়। এছাড়াও onmessage সম্পত্তি মাধ্যমে উপলব্ধ।
- **ত্রুটি**:
  যখন কোনও ওয়েবসকেটের সাথে সংযোগ বন্ধ হয়ে যায় তখন কোনও ত্রুটির কারণে যেমন কিছু ডেটা প্রেরণ করা যায়নি তখন ফাঁস করা হয়। এছাড়াও onerror সম্পত্তি মাধ্যমে উপলব্ধ।

আসুন আমাদের Websocket সংযোগে এই ইভেন্টগুলির জন্য একটি ইভেন্ট শ্রোতা যোগ করুন।

```js title="index.js" showLineNumbers
//`open` ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('খোলা', (ইভেন্ট) => {
  console.log ('ওয়েবসকেট সংযোগ স্থাপিত: ', ইভেন্ট);
});

//`message` ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener (' message ', (event) => {
  console.log ('সার্ভার থেকে নতুন বার্তা প্রাপ্ত:', ইভেন্ট);


//`ক্লোজ` ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('close', (event) => {
  console.log ('ওয়েবসকেট সংযোগ বন্ধ: ', ইভেন্ট);
});

//' error 'ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener (' error ', (event) => {
  console.log ('আমাদের ওয়েবসকেট সংযোগের ত্রুটি ঘটেছে, ইভেন্ট);
});
```

এখন, আমাদের ব্রাউজারে `index.html` ফাইলটি খুলুন এবং আপনার বিকাশকারী কনসোলটি পরীক্ষা করুন। আপনার শুধুমাত্র \`ওয়েবসকেট সংযোগ স্থাপিত হয়' এর লগটি দেখতে হবে।

### ডাটা পাঠান এবং গ্রহণ করুন

আমাদের ওয়েবসকেট সার্ভার <a href="/api-explorer#ping" target="_blank" rel="noopener noreferrer">পিং/পং</a> কার্যকারিতা সরবরাহ করে। আসুন ডেটা পাঠাতে এবং গ্রহণ করার জন্য আমাদের ডেমো প্রকল্পে এটি ব্যবহার করি। নীচের মতো `ওপেন` এবং `বার্তা` এর জন্য ইভেন্ট শ্রোতাদের পরিবর্তন করুন:

:::caution
ওয়েবসকেট সংযোগের `প্রেরণ` ফাংশন শুধুমাত্র `স্ট্রিং`, `অ্যারেবাফার`, `ব্লব`, `টাইপড্যার্য` এবং `ডেটাভিউ `গ্রহণ করে। আপনি [MDN] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send) এ তাদের সম্পর্কে আরও পড়তে পারেন। এর অর্থ, আমরা যদি কোনও `অবজেক্ট` পাঠাতে চাই তবে আমাদের প্রথমে এটি `JSON.stringify` দিয়ে স্ট্রিংইফাই করতে হবে।
:::

```js title="index.js" showLineNumbers
//`ওপেন` ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('খোলা', (ইভেন্ট) => {
  console.log ('ওয়েবসকেট সংযোগ স্থাপিত: ', ইভেন্ট);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (sendMessage);
});

//`বার্তা` ইভেন্ট সাবস্ক্রাইব
WebSocket.addEventListener ( 'বার্তা', (ইভেন্ট) => {
  const receivedMessage = JSON.parse (event.data);
  console.log ('সার্ভার থেকে নতুন বার্তা প্রাপ্ত: ', রিভিডমেসেজ);
});
```

'প্রাপ্ত বার্তা' এমন একটি বস্তু হবে:

```js showLineNumbers
{
  echo_req: {
      ping: 1
  },
  msg_type: “পিং”,
  পিং: “পং”}

```

অভিনন্দন :tada:

আপনি শুধু Websockets সঙ্গে আপনার প্রথম ডেমো প্রকল্প তৈরি।

:::tip
`পিং` অনুরোধটি বেশিরভাগই সংযোগটি পরীক্ষা করতে বা এটিকে জীবিত রাখতে ব্যবহৃত হয়।
:::

### Websocket সংযোগ জীবিত রাখুন

ডিফল্টরূপে, `ওয়েবসকেট সংযোগসমূহ` বন্ধ হয়ে যাবে যখন প্রায় ১৮০ সেকেন্ড\*\* এর মধ্যে কোন ট্র্যাফিক পাঠানো হয় না। সংযোগটি বাঁচিয়ে রাখার একটি উপায় হ'ল **120 সেকেন্ড** ব্যবধানের সাথে [ping] (/api-explorer #ping) অনুরোধ পাঠানো। এই সংযোগ জীবিত এবং সক্রিয় রাখা হবে।

একটি সহজ সেটআপ উদাহরণ নিম্নলিখিত হবে:

```js title="index.js" showLineNumbers
const ping_interval = 12000;//এটি মিলিসেকেন্ডে, যা 120 সেকেন্ডের সমান
let interval;
websocket.addEventListener ('খোলা', (ইভেন্ট) => {
  console.log ('ওয়েবসকেট সংযোগ স্থাপিত: ', ইভেন্ট);
  const sendMessage = json.stringify ({ ping: 1 });
  websocket.send (sendMessage);

  //সংযোগটি বাঁচতে
  ব্যবধান = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    ওয়েবসকেট. সেন্ড (সেন্ডমেসেজ);
  }, পিং_ইন্টারভেল);
});

//`ক্লোজ` ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('ক্লোজ', (ইভেন্ট) => {
  console.log ('ওয়েবসকেট সংযুক্ত বন্ধ: ', ইভেন্ট);
  ক্লিয়ারইন্টারভেল (ব্যবধান);
});
```

এখন, যখন সংযোগটি 'প্রতিষ্ঠিত হয়', আমরা `12000ms` ব্যবধানের সাথে `পিং` অনুরোধ পাঠাতে শুরু করি।

আপনার চূড়ান্ত কোড হতে হবে:

```js title="index.js" showLineNumbers
const app_id = 1089;//আপনার অ্যাপ_আইডি দিয়ে প্রতিস্থাপন করুন বা পরীক্ষার জন্য 1089 হিসাবে ছেড়ে দিন।
const websocket = নতুন ওয়েবসকেট (`wss: //ws.deriws.com/websockets/v3? app_id =${app_id}`);
const ping_interval = 12000;//এটি মিলিসেকেন্ডে, যা 120 সেকেন্ডের সমান
বিরতি দিন;

//`open` ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('open', (event)
  {console.log ('websocket) সংযোগ স্থাপিত:', ইভেন্ট);
  const sendMessage = JSON.stringify ({ ping: 1 });
  websocket.send (সেন্ডমেসেজ);

  //সংযোগটি বাঁচিয়ে রাখতে
  ব্যবধান = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (সেন্ডমেসেজ);
  }, ping_interval);
});

//`বার্তা` ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('বার্তা', (ইভেন্ট) => {
  const receivedMessage = JSON.parse (event.data);
  console.log ('সার্ভার থেকে নতুন বার্তা প্রাপ্ত: ', রিসিভেডমেসেজ);
});

//`বন্ধ' ইভেন্ট
WebSocket.addEventListener (' close ', (event) => {
  console.log ('ওয়েবসকেট সংযোগ বন্ধ:', ইভেন্ট);
  ClearInterval (ব্যবধান);
});

//`ত্রুটি' ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('ত্রুটি', (ইভেন্ট) => {
  console.log ('আমাদের ওয়েবসকেট সংযোগে ত্রুটি ঘটনা', ইভেন্ট);
});
```
