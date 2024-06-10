---
title: প্রকল্প সেটআপ | জাভাস্
sidebar_label: প্রকল্প সেটআপ
sidebar_position: 0
tags:
  - জাভাস্ক্রিপ্ট
keywords:
  - js
  - প্রকল্প-সেটআপ
description: একটি ওয়েবসকেট ব্যবহার করে আপনার পরবর্তী API ট্রেডিং অ্যাপ প্রকল্পের জন্য একটি ডিরেক্টরি তৈরি করুন।
---

### একটি প্রকল্প তৈরি করুন

আমরা একটি সহজ `এইচটিএমএল` পৃষ্ঠা তৈরি করতে যাচ্ছি যাতে আমাদের জাভাস্ক্রিপ্ট ফাইল রয়েছে, যা আমাদের ওয়েবসকেট সংযোগটি পরিচালনা করবে। প্রথমে, আপনার পরবর্তী প্রকল্পের জন্য একটি ডিরেক্টরি তৈরি করুন:

```bash
mkdir Deriv-ওয়েবসকেট-ডেমো
```

`ডেরিভ-ওয়েবসকেট-ডেমো` ফোল্ডারে নেভিগেট করুন:

```bash
সিডি Deriv-ওয়েবসকেট-ডেমো
```

পরবর্তী, প্রয়োজনীয় ফাইলগুলি তৈরি করুন যেমনটি আপনি নীচে দেখেন:

```bash
স্পর্শ index.html index.css index.js
```

:::tip
আমরা [লাইভ সার্ভার এক্সটেনশন] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) সক্রিয় করে [ভিজ্যুয়াল স্টুডিও কোড] (https://code.visualstudio.com/) ব্যবহার করার পরামর্শ দিই। এটি বাস্তবায়নের সাথে আপনাকে অনেক সাহায্য করবে।
:::

এখন, `index.html` ফাইলটি খুলুন অথবা [লাইভ সার্ভার এক্সটেনশন] (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) ব্যবহার করুন।

এখন, নিম্নলিখিত পদ্ধতি ব্যবহার করে ফাইলের বিষয়বস্তু পরিবর্তন করুন:

```js title="index.js" showLineNumbers
console.log ('আমরা এখানে আমাদের ওয়েবসকেট সংযোগ তৈরি করব ');
```

```html title="index.html" showLineNumbers
<DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ডেরিভ এইচটিএমএল জেএস ডেমো</title>
  </head>
  <body>
    <h2>ডেরিভ ওয়েবসকেট এপিআই ডেমো</h2>
    <script src="index.js" async defer />
  </body>
</html>
```

সামগ্রী যুক্ত করার পরে, আমরা কেবল `index.html` ফাইলটি কার্যকর করে বা <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">লাইভ সার্ভার এক্সটেনশন</a>ব্যবহার করে অ্যাপ্লিকেশনটি চালাতে পারি। আপনার অ্যাপটি চালানোর সময়, কনসোলে দেখুন `console.log` প্রদর্শিত হচ্ছে কিনা। তারপর আপনি জানেন যে জাভাস্ক্রিপ্ট ফাইলটি কাজ করছে যাতে ওয়েবসকেট সংযোগটি সঠিকভাবে প্রয়োগ করা যায়।

ডেরিভ ওয়েবসকেট সেট আপ করার জন্য, আপনি [ওয়েবসকেট সংযোগ] (/ডকস/ভাষাসমূহ/জাভাস্ক্রিপ্ট/ওয়েবসকেট-সংযোগ) পৃষ্ঠায় এগিয়ে যেতে পারেন।
