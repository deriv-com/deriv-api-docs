---
title: দেশের তালিকা পান
sidebar_label: দেশগুলির একটি তালিকা পান
sidebar_position: 2
tags:
  - দেশের তালিকা (_l)
  - জাভাস্ক্রিপ্ট
keywords:
  - দেশের তালিকা (_l)
  - জাভাস্ক্রিপ্ট
description: আপনার ট্রেডিং অ্যাপে দেশগুলির একটি তালিকা যুক্ত করে আপনার ব্যবহারকারীদের সম্পর্কে তথ্য পান। এই জাভাস্ক্রিপ্ট এপিআই উদাহরণ দিয়ে কীভাবে এটি করবেন তা শিখুন।
---

<!-- :::caution
You can learn more about countries [here](/docs/terminology/trading/residence-list)
::: -->

দেশগুলির একটি তালিকা পেতে, নিম্নলিখিত পদ্ধতি ব্যবহার করে খোলা ইভেন্ট শ্রোতা আপডেট করুন:

```js title="index.js" showLineNumbers
const ping_interval = 12000;//এটি মিলিসেকেন্ডে, যা 120 সেকেন্ডের সমান
let interval;
//`open` ইভেন্টে সাবস্ক্রাইব করুন
websocket.addEventListener ('ওপেন', (ইভেন্ট) => {
  console.log ('ওয়েবসকেট সংযোগ স্থাপিত: ', ইভেন্ট);
  const payload = JSON.stringify ({
    residence_list: 1,
  });
  websocket.send (payload);

  //সংযোগটি বাঁচিয়ে রাখতে
  ব্যবধান = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    ওয়েবসকেট. সেন্ড (সেন্ডমেসেজ);
  }, পিং_ইন্টারভেল);
});
```

এখন, ডেটা রেন্ডার করতে `বার্তা` ইভেন্ট শ্রোতা আপডেট করুন:

```js title="index.js" showLineNumbers
//`বার্তা` ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('বার্তা', (ইভেন্ট) => {
  const receivedMessage = JSON.parse (event.data);
  সুইচ (ReceivedMessage.msg_type) {
    case 'residence_list':
      console.log ('দেশের তালিকা', ReceivedMessage.residence_list);
      বিরতি;
    কেস 'পিং':
      console.log ('পিং/পং প্রতিক্রিয়া: ', রিভিডমেসেজ. পিং);
      বিরতি;
    ডিফল্ট:
      console.log ('প্রাপ্ত বার্তা:', প্রাপ্ত বার্তা);
      বিরতি;
  }
});
```

প্রতিক্রিয়া একটি বস্তু হতে হবে:

```json showLineNumbers
{
  “echo_req”: {
    “req_id”: 1, “residence_list”: 1
  },
    “msg_type”: “residence_list”,
  “req_id”: 1, “residence_list”: [{
  “পরিচয়”: {



        “পরিষেবাদি”: {
          “idv”: {“documents_সমর্থিত”: {},
            “has_visual_sনমুনা”: 0,
            “is_country_সমর্থিত”: 0},
            “onfido”: {“documents_সমর্থিত”: {
          },
          “is_

            country_সমর্থিত”: 0
          }
        }
      },
      “phone_idd”: “35818", “টেক্সট”:
      “অ্যালান্ড দ্বীপপুঞ্জ”, “মান”:
      “ax”}, {“পরিচয়”
    : {


        “পরিষেবাদি”: {
          “idv”: {“documents_সমর্থিত”: {},
            “has_visual_sনমুনা”: 0,
            “is_country_সমর্থিত”: 0},
            “onfido”: {“documents_সমর্থিত”: {”



              ড্রাইভিং_লাইসেন্স”: {
                “প্রদর্শন নাম”: “ড্রাইভিং লাইসেন্স”
              }, “national_identity_card”: {
              “প্রদর্শন নাম”: “জাতীয় পরিচয়পত্র”
              },

              “পাসপোর্ট”: {“প্রদর্শন_নাম”: “পাসপোর্ট”}


            },
            “is_country_সমর্থিত”: 1
          }}

      },
      “phone_idd”: “355", “টেক্সট”: “আলবেনিয়া”,

      “টিন_ফরম্যাট”: ["^\\ d[A-Ta-t0-9]{8}[A-Wa-w]$ "],
      “মান”: “al”
    }
  ]
}
```

এই কল দিয়ে, আপনি সমর্থিত দেশগুলির সম্পর্কে দরকারী তথ্য পাবেন, যেমন:

- প্রতিটি দেশের জন্য একটি `2-লেটার` কোড
- প্রতিটি দেশের জন্য 'পরিচয়' পরিষেবা সরবরাহকারী
- দেশ ট্যাক্স সনাক্তকারী বিন্যাস (`টিন_ফর্ম্যাট`)
- প্রভৃতি

এটি অ্যাকাউন্ট তৈরির ফর্মগুলির জন্য উপযোগী হতে পারে, যেখানে আপনাকে ব্যবহারকারীদের তাদের পরিচয় বেস সম্পর্কে যাচাই করা তথ্য প্রদান করতে হবে, তাদের বসবাসের দেশের উপর নির্ভর করে।

:: :সতর্কতা
ঠিকানা এবং ট্যাক্স আইডি বৈধতার জন্য, দয়া করে দেশের জন্য প্রদত্ত 'tin_format' ব্যবহার করুন।
:::

আপনার পরবর্তী পদক্ষেপের জন্য ব্যবহারকারীর দেশ গুরুত্বপূর্ণ। এটি কোন সম্পদ এবং বৈশিষ্ট্যগুলি তারা ব্যবহার করতে পারে তা নির্ধারণ করে।

:::tip
আপনার ফর্মটি পোস্ট করার আগে দেশগুলির তালিকা পাওয়া ভাল।
:::

:::danger
আপনার `IDV` এবং `ONFIDO` পরিচয় পরিষেবাগুলি, তাদের পার্থক্য এবং সম্ভাবনা সম্পর্কে বিস্তারিত সামগ্রীর প্রয়োজন হবে।
:::

আপনার চূড়ান্ত কোড হবে:

```js title="index.js" showLineNumbers
const app_id = 1089;//আপনার অ্যাপ_আইডি দিয়ে প্রতিস্থাপন করুন বা পরীক্ষার জন্য 1089 হিসাবে ছেড়ে দিন।
const websocket = নতুন ওয়েবসকেট (`wss: //ws.deriws.com/websockets/v3? app_id =${app_id}`);
const ping_interval = 12000;//এটি মিলিসেকেন্ডে, যা 120 সেকেন্ডের সমান
বিরতি দিন;

//`open` ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('open', (event)
  {console.log ('websocket) সংযোগ স্থাপিত:', ইভেন্ট);
  const পেলোড = JSON.stringify ({
    residence_list: 1,
  });
  websocket.send (পেলোড);

  //সংযোগটি বেঁচে রাখতে
  ব্যবধান = setInterval (() => {
    const sendMessage = JSON.stringify ({ ping: 1 });
    websocket.send (সেন্ডমেসেজ);
  }, ping_interval);
});

//'মেসেজ' ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('বার্তা', (ইভেন্ট) => {
  const receivedMessage = json.parse (event.data);
  স্যুইচ (ReceivedMessage.msg_type) {
    case 'residence_list':
      console.log ('দেশের তালিকা', ReceivedMessage.residence_list); বিরতি;

    কেস 'পিং':
      console.log ('পিং/পং প্রতিক্রিয়া: ', রিভিডমেসেজ. পিং);
      বিরতি;
    ডিফল্ট:
      console.log ('প্রাপ্ত বার্তা:', প্রাপ্ত বার্তা);
      বিরতি;
  }
});

//`বন্ধ 'ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener ('বন্ধ', (ইভেন্ট) => {
  console.log ('ওয়েবসকেট সংযোগ বন্ধ: ', ইভেন্ট);
  ClearInterval (ব্যবধান);
});

//`ত্রুটি' ইভেন্টে সাবস্ক্রাইব করুন
WebSocket.addEventListener (' ত্রুটি ', (ইভেন্ট) => {
  console.log ('আমাদের ওয়েবসকেট সংযোগের ত্রুটি ঘটেছে, ইভেন্ট);;

```
