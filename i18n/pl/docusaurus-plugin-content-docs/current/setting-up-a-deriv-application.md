---
title: Tworzenie aplikacji Deriv
sidebar_label: Konfigurowanie aplikacji Deriv
sidebar_position: 7
sidebar_class_name: element ukrycia paska bocznego
tags:
  - wprowadzenie
  - aplikacja
  - konfiguracja
keywords:
  - wprowadzenie
  - aplikacja
  - konfiguracja
description: Przewodnik krok po kroku dotyczący tworzenia tokena API Deriv i budowania aplikacji handlowej za pomocą naszego interfejsu API handlowego. Dowiedz się więcej.
---

#### Konta Deriv

Jeśli nie masz jeszcze konta Deriv, możesz je łatwo utworzyć, odwiedzając naszą stronę rejestracji lub korzystając z połączenia API <a href="/api-explorer#new_account_virtual" target="_blank" rel="noopener noreferrer">new_account_virtual</a> . To całkowicie darmowe. A jeśli masz już konto, zaloguj się, używając danych konta. Aby uniknąć przypadkowej utraty środków podczas testowania, zalecamy użycie konta demo zamiast prawdziwego konta.

Jeśli chcesz zarabiać na marży, załóż konto rzeczywiste Deriv i otrzymuj miesięczne zarobki. Możesz także utworzyć prawdziwe konto za pomocą wywołań API <a href="/api-explorer#new_account_real" target="_blank" rel="noopener noreferrer">new_account_real</a> lub <a href="/api-explorer#new_account_maltainvest" target="_blank" rel="noopener noreferrer">new_account_maltainvest</a> .

:::caution
Aby utworzyć aplikacje Deriv, potrzebujesz tokena API z zakresem administratora dla konta, którego chcesz użyć w swojej aplikacji.
:::

## Jak utworzyć token Deriv API

Aby utworzyć token API, po prostu przejdź do pulpitu nawigacyjnego i wybierz kartę **Zarządzaj tokenami**. Stamtąd utwórz nowy token, który pasuje do poziomu dostępu potrzebnego do funkcji aplikacji.

Aby utworzyć nowy token API, wykonaj następujące kroki:

1. Wybierz potrzebne lunety.
2. Podaj nazwę tokena
3. Kliknij przycisk **Utworz**

Alternatywnie możesz utworzyć token API za pomocą wywołania API <a href="/api-explorer#api_token" target="_blank" rel="noopener noreferrer">api_token</a> .

:::caution
Do utworzenia aplikacji potrzebny jest token z zakresem `Admin`.
:::

## Jak utworzyć aplikację Deriv

Aby utworzyć aplikację z odpowiednimi opcjami konfiguracji, wybierz kartę **Zarejestruj aplikację** na pulpicie nawigacyjnym. Możesz wprowadzić zmiany w konfiguracji aplikacji w dowolnym momencie na karcie **Zarządzaj aplikacji**.

| Pole informacji o aplikacji | Opis                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| Konto                       | Konto, z którym chcesz utworzyć aplikację                                                            |
| Token API                   | Token API, za pomocą którego ma zostać utworzona aplikacja                                           |
| Nazwa aplikacji             | Nazwa aplikacji                                                                                      |
| Marża                       | Prowizja dodana do ceny handlowej, aby uzyskać dodatkowy dochód                                      |
| Adres URL autoryzacji       | Adres URL, który umożliwia klientom logowanie się do aplikacji przy użyciu kont Deriv bez tokena API |
| Adres URL weryfikacji       | Adres URL przekierowania OAuth dla autoryzacji OAuth                                                 |

\*\*Aby utworzyć aplikację, wykonaj następujące kroki: \*\*

1. Wybierz konto, z którym chcesz utworzyć aplikację.
2. Wybierz token API dodany do swojego konta (musi mieć zakres\ `Admin\ `).
3. Podaj nazwę aplikacji.
4. Wypełnij pola **Markup** i **Szczegóły OAuth**.
5. Wybierz zakresy autoryzacji\*\* potrzebne w Twoim zgłoszeniu.
6. Kliknij przycisk **Zarejestruj aplikację**.

Upewnij się, że adresy URL **Autoryzacja** i **Weryfikacja** są poprawne w zależności od implementacji.

Na przykład, jeśli Twoja domena to **`https://example.com`**, a Twoja**autoryzacja i uwierzytelnianie są obsługiwane przez** `verify`, Twoje adresy URL będą następujące:

**`https://example.com/verify`**
