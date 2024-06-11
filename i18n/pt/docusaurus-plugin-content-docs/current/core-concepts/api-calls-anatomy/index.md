---
title: Funções das chamadas API
hide_title: false
draft: false
sidebar_label: Funções das chamadas API
sidebar_position: 1
tags:
  - conceito
  - chamadas
  - anatomia
keywords:
  - aplicação de negociação
  - chamadas de API
  - exemplo de API
description: Configure chamadas de API para a sua aplicação de negociação utilizando a funcionalidade de chamadas de API. Com exemplos de API, aprenda a subscrever, enviar pedidos e obter dados de resposta.
---

## Subscrever e enviar

Todas as chamadas à API têm uma funcionalidade de envio para efetuar um pedido e receber uma resposta. Algumas chamadas à API também oferecem a funcionalidade de subscrição, permitindo que sejam enviadas atualizações para a sua aplicação quando as novas informações ficarem disponíveis.

### Subscrever

Várias chamadas API fornecem a funcionalidade `subscribe`. Quando subscreve a uma chamada à API, recebe um fluxo contínuo de dados dessa chamada à API em particular.

Algumas destas chamadas API subscrevem automaticamente (por exemplo, [ticks](/api-explorer#ticks)) e outras têm um campo `subscribe` opcional. Se você passar `1` para o campo `subscribe`, a subscrição será iniciada e o servidor continuará a enviar os dados solicitados até que você cancele a subscrição chamando as chamadas `Forget` ou `Forget all` da API.

Por exemplo, pode chamar [Tick History](/api-explorer#ticks_history) para receber dados do histórico de ticks. Mas quando adiciona a opção `subscribe` a esta chamada, receberá os dados do histórico de ticks que solicitou na primeira resposta e continuará a receber uma nova resposta sempre que houver um novo tick publicado pelo servidor para o símbolo em causa.

No fluxo de mensagens de `subscribe`, existe um campo chamado `subscription`. Este é o `ID do fluxo`. Com este ID, pode identificar o fluxo de mensagens na sua lógica e parar o fluxo com as chamadas API `Forget` e `Forget All`.

Os dados fornecidos pelas chamadas API com a funcionalidade `subscribe` podem ser utilizados como fonte de dados para outras chamadas e funcionalidades API.

### Enviar

Se chamar a API com a funcionalidade `send`, então o servidor só enviará de volta os dados solicitados uma vez. Para obter dados atualizados, tem de enviar novamente a chamada à API. Normalmente, este método é utilizado quando obtém outras respostas a chamadas API ou eventos UI, como `Click`, `Scroll`, entre outros.

### Esquecer

Se quiser parar o fluxo de mensagens criado por `subscribe`, terá de chamar a chamada da API `Forget` com o `Stream ID` correto. Caso contrário, pode utilizar a chamada da API `Forget All` para parar os fluxos pelo seu `Nome do método`.

:::caution
Para obter mais informações sobre a chamada `Forget` da API, consulte [Forget](/api-explorer#forget) e [Forget All](/api-explorer#forget_all) no explorador da API.
:::

## Solicitar dados

Para facilitar a gestão do fluxo de pedidos e respostas da ligação WebSocket, cada chamada à API Deriv WebSocket segue uma estrutura padronizada. Pode ser utilizado para armazenagem temporária, validação, pedidos e sincronização de respostas.

#### Nome do método de chamada à API

Cada `request` na API WebSocket inclui um campo `method name` que serve como um identificador único para o pedido. Na maioria dos casos, este `nome do método` terá um valor numérico de `1`. No entanto, existem alguns casos em que o identificador de propriedade pode ter um valor de string (cadeia de caracteres).

:::caution
O nome do método de chamada da API é sempre necessário. este campo determina os dados que irá receber do nosso servidor WebSocket.
:::

### Campos obrigatórios

Cada dado do pedido tem campos obrigatórios que deve preencher e pode também incluir campos opcionais. Vamos explorar isto com um exemplo da `Lista de Residências`.

Uma chamada `Residence List` devolve uma lista de países e códigos de país de 2 letras, adequados para preencher o formulário de abertura de conta.

Os dados do pedido para esta chamada são os seguintes:

```ts showLineNumbers
{
  residence_list: 1; // Api Call Method Name
  passthrough?: object; // Optional
  req_id?: number; // Optional
}
```

O campo `residence_list` é o `method name` da chamada e é obrigatório. Podem existir outros campos obrigatórios relacionados com o tipo de pedido que pretende enviar. Para saber mais sobre `Residence List` e outras chamadas API, consulte-as em [API Explorer](/api-explorer#residence_list).

### Campos opcionais

Cada chamada tem também vários campos `Opcionais`. `Passthrough` e `req_id` fazem sempre parte dos dados do pedido, mas pode optar por não os utilizar.

#### O campo \`passthrough

O que quer que passe para este campo ser-lhe-á devolvido dentro de um objeto `response`. Isso pode ser útil quando você precisa simular um fluxo com estado para os seus `pedidos` e `respostas`.

#### O campo \`req_id

Poderá ter de "etiquetar" os seus pedidos e passá-los através das nossas chamadas `WebSocket`. Pode fazê-lo passando um `número` para este campo. Pode ser útil quando precisa de mapear `pedidos` para `respostas`.

:::caution
Para saber mais sobre os campos opcionais adicionais específicos de cada chamada de API, consulte o nosso [API Explorer](/api-explorer).
:::

## Dados de resposta

Quando obtiver a resposta para a chamada, haverá um `Field` com o mesmo nome do `nome do método`, que contém os dados reais.

A resposta à chamada `Lista de Residências`:

```js showLineNumbers
{
  echo_req: {
    req_id: 1,
    residence_list: 1,
  },
  msg_type: 'residence_list',
  req_id: 1,
  residence_list: [
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
                                "display_name": "Carta de condução"
                            }
                        },
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
                                "display_name": "Carta de condução"
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
            "tin_format": [
                "^[A-Ta-t0-9]\\d{8}[A-Wa-w]$"
            ],
            "value": "al"
        },
        // ....
  ],
};
```

Aqui a `lista_de_residências` é o `nome do método`, e contém os dados reais que pediu. Resumindo, não incluímos o resto da matriz. Pode verificar a resposta real [aqui](/api-explorer#residence_list).

#### O campo \`echo_req

Este `Campo` contém exatamente os `Dados do Pedido` que você enviou para o servidor.

#### O campo `msg_type`

Este `Field` ajuda-o a determinar que dados `message` está a receber no evento de mensagem da ligação WebSocket. Por exemplo, o seu manipulador de eventos `onmessage` para a sua conexão WebSocket em `JavaScript` seria:

```js showLineNumbers
socket.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);

  switch (receivedMessage.msg_type) {
    case "residence_list":
      console.log("The residence list is : ",receivedMessage.residence_list)
      break;
    case "other_request_identifier"
      console.log("the response", receivedMessage.some_other_request_identifier)
    default:
      console.log("receivedMessage", receivedMessage)
      break;
  }
}
```

#### O campo \`req_id

Este é o `Optional` passado para o `Request Data`, pode utilizá-lo para `validação`, `sincronização`, `caching`, etc.

:::tip
O `msg_type` está sempre presente nos dados de resposta.
:::
