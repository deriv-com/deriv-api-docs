---
title: نسخ تسهيلات التداول
hide_title: false
draft: false
sidebar_label: نسخ التداول
sidebar_position: 4
tags:
  - نسخ التداول
  - التداول
keywords:
  - التداول
  - مفهوم
  - استدعاءات
  - ترتيب عناصر
description: التداول بالنسخ
---

## ما الأمر؟

أصبح التداول بنسخ الصفقات شائعًا في الأسواق المالية؛ فهو يسمح للعميل (الناسخ) بنسخ صفقات عميل آخر (المتداول) تلقائيًا.

## أن تصبح متداولاً

لكي تصبح متداولاً (أي للسماح للآخرين بمتابعة تداولاتك)، قم بتعيين إعداد "السماح_للناسخين" عبر استدعاء [ضبط الإعدادات] (/api-explorer#set_settings).

ثم ينشئ المتداول رمزاً مميزاً لواجهة برمجة التطبيقات للقراءة فقط ويوفره للناسخ.

سيؤدي تمكين إعداد السماح بالناسخات أيضًا إلى جعل استدعاء [إحصائيات التداول بالنسخ] (/api-explorer#copytrading_statistics) يعمل. يوفر استدعاء واجهة برمجة التطبيقات الإحصائية المعلومات حول الحساب (وذلك حتى يكون لدى الناسخين المحتملين فكرة عن الأداء السابق للمتداول).

## أن تصبح ناسخاً

لكي تصبح ناسخًا، استخدم استدعاء [بدء النسخ] (/api-explorer#copy_start). لإيقاف النسخ، استخدم استدعاء [إيقاف النسخ] (/api-explorer#copy_stop).