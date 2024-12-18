import { translate } from '@docusaurus/Translate';

export interface IProduct {
  [key: string]: {
    title: string;
    description: string[];
    id: string;
    imgName: string;
    redirectUrl: string;
  };
}

export const products: IProduct = {
  Websocket: {
    title: translate({ message: 'Websocket API' }),
    description: [
      translate({
        message: `Use Deriv’s WebSocket API to create and share custom trading applications tailored for Options, Multipliers, and Accumulators. Build dynamic, responsive solutions with seamless access to real-time market data and trade execution functionality—optimised for speed and reliability.`,
      }),
      translate({
        message: `Share your applications with a global trading community and transform your technical expertise into new revenue opportunities.`,
      }),
    ],
    id: 'WebsocketAPI',
    imgName: 'websocket',
    redirectUrl: 'https://developers.deriv.com/docs/getting-started'

  },
  DerivFIX: {
    title: translate({ message: 'Deriv FIX API' }),
    description: [
      translate({
        message:
          'Experience consistent performance and ultra-low latency with Deriv FIX, the API specifically engineered for professional and institutional CFDs trading.',
      }),
      translate({
        message:
          'Powered by FIX Protocol 4.4, it offers direct market access and real-time data accuracy, enabling you to create applications that deliver unmatched precision, speed, and control for trading.',
      }),
    ],
    id: 'derivFix',
    imgName: 'derivFix',
    redirectUrl: 'https://developers.deriv.com/docs/getting-started'
  },
};
