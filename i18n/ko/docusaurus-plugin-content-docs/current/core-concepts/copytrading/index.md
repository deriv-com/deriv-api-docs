---
title: 복사 거래 시설
hide_title: false
draft: false
sidebar_label: 복사 거래
sidebar_position: 4
tags:
  - 트레이딩
  - 트레이딩
keywords:
  - 트레이딩
  - 개념
  - 통화
  - 해부학
description: 복사 거래
---

## 무슨 일이죠?

카피 트레이딩은 금융 시장에서 인기를 얻고 있으며, 한 고객(복사기)이 다른 고객(트레이더)의 거래를 자동으로 복사할 수 있습니다.

## 트레이더 되기

트레이더가 되려면(즉, 다른 사람이 내 트레이딩을 팔로우할 수 있도록 허용하려면) [설정](/api-explorer#set_settings) 호출을 통해 "allow_copiers" 설정을 설정하세요.

그런 다음 트레이더는 읽기 전용 API 토큰을 생성하여 복사기에 제공합니다.

허용_복사기 설정을 활성화하면 [복사 거래 통계](/api-explorer#copytrading_statistics) 호출도 작동합니다. 통계 API 호출은 계좌에 대한 정보를 제공합니다(이는 잠재적 복사자가 트레이더의 과거 실적에 대해 알 수 있도록 하기 위함입니다).

## 복사기 되기

복사기가 되려면 [복사 시작](/api-explorer#copy_start) 호출을 사용하세요. 복사를 중지하려면 [복사 중지](/api-explorer#copy_stop) 호출을 사용하세요.
