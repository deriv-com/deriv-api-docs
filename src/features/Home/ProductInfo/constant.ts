export interface IProduct {
  [key: string]: {
    title: string;
    description: string;
    id: string;
    imgName: string;
    btnString?: string;
  };
}

export const products: IProduct = {
  Websocket: {
    title: 'Websocket API',
    description:
      'Our Websocket API is flexible, powerful, and ready to support your unique trading platform, including trading with Options, Multipliers, and Accumulators.',
    id: 'WebsocketAPI',
    imgName: 'websocket',
  },
  DerivFIX: {
    title: 'DerivFIX engineered for stability and speed',
    description:
      'DerivFIX - Engineered for speed, built for control. Experience unmatched stability and low latency with DerivFIX, crafted for professional and institutional CFD trading.',
    id: 'derivFix',
    imgName: 'derivFix',
  },
};
