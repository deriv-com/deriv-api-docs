---
title: Função das chamadas à API
hide_title: false
draft: false
sidebar_label: Função das chamadas à API
sidebar_position: 1
tags:
  - conceito
  - chamadas
  - anatomia
keywords:
  - app de negociação
  - chamadas à API
  - exemplo de API
description: Configure chamadas à API para a sua aplicação de negociação utilizando a funcionalidade de chamadas à API. Com exemplos de API, aprenda a subscrever, enviar pedidos e obter dados de resposta.
---

## Subscrever e enviar

Todas as chamadas à API incluem a funcionalidade de envio para realizar um pedido e receber uma resposta. Algumas chamadas à API também oferecem a funcionalidade de subscrever, permitindo que a sua aplicação receba atualizações quando novas informações estiverem disponíveis.

### Subscrever

Diversas chamadas à API fornecem a funcionalidade `subscrever`. Quando subscreve a uma chamada à API, recebe um fluxo contínuo de dados dessa chamada específica.

Algumas destas chamadas à API subscrevem automaticamente (por exemplo, [ticks](/api-explorer#ticks)) e outras possuem um campo opcional de `subscrever`. Se passar `1` para o campo `subscrever`, a subscrição será iniciada e o servidor irá continuar a enviar os dados solicitados até que cancele a subscrição através das chamadas à API `Esquecer` ou `Esquecer tudo`.

Por exemplo, pode fazer a chamada à API "[Histórico de Ticks](/api-explorer#ticks_history)" para receber dados do histórico de ticks. No entanto, ao adicionar a opção `subscrever` a esta chamada, irá receber os dados do histórico de ticks solicitados na primeira resposta e continuará a receber uma nova resposta sempre que houver um novo tick publicado pelo servidor para o símbolo em questão.

No fluxo de mensagens provenientes de `subscrever` existe um campo denominado `subscrição`. Este é o `ID de Fluxo`. Com este ID, pode identificar o fluxo de mensagens na sua lógica e parar o fluxo com as chamadas à API `Esquecer` e `Esquecer tudo`.

Os dados fornecidos pelas chamadas à API com a funcionalidade `subscrever` podem ser utilizados como fonte de dados para outras chamadas e funcionalidades da API.

### Enviar

Se chamar a API com a funcionalidade `enviar`, então o servidor só enviará de volta os dados solicitados uma vez. Para obter dados atualizados, tem de enviar novamente a chamada à API. Normalmente, este método é utilizado quando obtém outras respostas a chamadas à API ou eventos UI, como `Clique`, `Scroll`, entre outros.

### Esquecer

Se pretender parar o fluxo de mensagens criado por `subscrever`, terá de fazer a chamada à API `Esquecer` com o `ID de fluxo` correto. Caso contrário, pode utilizar a chamada à API `Esquecer tudo` para parar os fluxos por `Nome do método`.

:::caution
Para obter mais informações sobre a chamada à API `Esquecer`, consulte "[Esquecer](/api-explorer#forget)" e "[Esquecer tudo](/api-explorer#forget_all)" na API explorer.
:::

## Solicitar dados

Para facilitar a gestão do fluxo de pedidos e respostas da ligação WebSocket, cada chamada ao WebSocket da Deriv API segue uma estrutura padronizada. Pode ser utilizado para armazenagem temporária, validação, pedidos e sincronização de respostas.

#### Chamada à API "Nome do método"

Cada `pedido` no WebSocket da API inclui um campo denominado `nome do método` que serve como um identificador único para o pedido. Na maior parte dos casos, este `nome do método` terá um valor numérico de `1`. No entanto, existem alguns casos em que o identificador de propriedade pode ter um valor de string (sequência de caracteres).

:::caution
A chamada à API "Nome do método" é sempre obrigatória. Este campo determina os dados que irá receber do nosso servidor WebSocket.
:::

### Campos obrigatórios

Cada dado do pedido tem campos obrigatórios que deve preencher e pode também incluir campos opcionais. Vamos explorar com um exemplo `Lista de Residências`.

A chamada `Lista de Residências` devolve uma lista de países e respetivos códigos de 2 letras, adequados para preencher o formulário de abertura de conta.

Os dados do pedido para esta chamada são os seguintes:

```ts showLineNumbers
{
  residence_list: 1; // Api Call Method Name
  passthrough?: object; // Optional
  req_id?: number; // Optional
}
```

Os campos `lista_de_residências` e `nome do método` para a chamada são obrigatórios. Podem existir outros campos obrigatórios relacionados com o tipo de pedido que pretende enviar. Para saber mais sobre `Lista de Residências` e outras chamadas à API, consulte a [API Explorer](/api-explorer#residence_list).

### Campos opcionais

As chamadas têm também vários campos `Opcionais`. Os campos `Passthrough` e `req_id` fazem sempre parte dos dados do pedido, mas pode optar por não os utilizar.

#### O campo `passthrough`

O que quer que passe para este campo será devolvido dentro do objeto `resposta`. Isto pode ser útil quando precisa de simular um regime de fluxo com estado para os seus `pedidos` e `respostas`.

#### O campo `req_id`

Pode ser necessário `etiquetar` os seus pedidos e enviá-los através das nossas chamadas `WebSocket`. Pode fazê-lo ao passar um `número` para este campo. Pode ser útil quando precisa de mapear `pedidos` para `respostas`.

:::caution
Para saber mais sobre os campos opcionais adicionais específicos de cada chamada à API, consulte a nossa [API Explorer](/api-explorer).
:::

## Dados de resposta

Quando obtiver a resposta para a chamada, haverá um `Campo` com o mesmo nome do `nome do método`, que contém os dados reais.

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
                                "display_name": "Driving Licence"
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
                                "display_name": "Driving Licence"
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

Aqui, a `lista_de_residências` é o `nome do método` e contém os dados reais que solicitou. Resumindo, não incluímos o resto da matriz. Pode verificar a resposta real [aqui](/api-explorer#residence_list).

#### O campo `echo_req`

Este `Campo` contém os `Dados do Pedido` exatos que enviou para o servidor.

#### O campo `msg_type`

Este `Campo` ajuda-o a determinar que dados da `mensagem` está a receber na mensagem do evento da ligação WebSocket. Por exemplo, o seu manipulador de eventos `onmessage` para a sua ligação WebSocket em `JavaScript` seria:

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

#### O campo `req_id`

Este é o campo `Opcional` passado para o campo `Dados do Pedido`, pode utilizá-lo para `validação`, `sincronização`, `caching`, etc.

:::tip
O campo `msg_type` está sempre presente nos dados de resposta.
:::
