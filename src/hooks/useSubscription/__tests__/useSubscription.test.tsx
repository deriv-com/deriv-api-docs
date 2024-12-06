import { act, renderHook } from '@testing-library/react';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import WS from 'jest-websocket-mock';
import useSubscription from '..';

const connection = makeMockSocket();

describe('Use WS', () => {
  let wsServer: WS;
  beforeEach(async () => {
    wsServer = await connection.setup();
  });

  afterEach(() => {
    connection.tearDown();
  });

  it('Should unsubscribe properly', async () => {
    const { result } = renderHook(() => useSubscription('exchange_rates'));

    expect(result.current.is_loading).toBeFalsy();

    act(() => {
      result.current.subscribe({
        base_currency: 'USD',
      });
    });
    expect(result.current.is_loading).toBeTruthy();
    expect(result.current.is_subscribed).toBeTruthy();

    act(() => {
      result.current.unsubscribe();
    });

    expect(result.current.is_subscribed).toBeFalsy();
  });

  it('Should subscribe to ticks stream', async () => {
    const { result } = renderHook(() => useSubscription('exchange_rates'));

    expect(result.current.is_loading).toBeFalsy();

    act(() => {
      result.current.subscribe({
        base_currency: 'USD',
      });
    });
    expect(result.current.is_loading).toBeTruthy();
    expect(result.current.is_subscribed).toBeTruthy();

    await expect(wsServer).toReceiveMessage({
      base_currency: 'USD',
      req_id: 1,
      subscribe: 1,
    });

    wsServer.send({
      echo_req: {
        base_currency: 'USD',
        exchange_rates: 1,
        req_id: 1,
        subscribe: 1,
      },
      exchange_rates: {
        base_currency: 'USD',
        date: 1675847038,
        rates: {
          AED: 3.6731,
          AFN: 89.0052,
          ALL: 107.4,
          AMD: 395.075,
          AOA: 509.2471,
          ARS: 113.9705,
          AUD: 1.43184421534937,
          AWG: 1.79,
          BAM: 1.819,
          BBD: 2,
          BDT: 106.465,
          BHD: 0.377,
          BMD: 1,
          BND: 1.3237,
        },
      },
      msg_type: 'exchange_rates',
      req_id: 1,
      subscription: {
        id: '2f39f7e7-d986-33f2-080a-b0ee50cfb85c',
      },
    });

    expect(result.current.is_loading).toBeFalsy();
    expect(result.current.data).toEqual({
      base_currency: 'USD',
      date: 1675847038,
      rates: {
        AED: 3.6731,
        AFN: 89.0052,
        ALL: 107.4,
        AMD: 395.075,
        AOA: 509.2471,
        ARS: 113.9705,
        AUD: 1.43184421534937,
        AWG: 1.79,
        BAM: 1.819,
        BBD: 2,
        BDT: 106.465,
        BHD: 0.377,
        BMD: 1,
        BND: 1.3237,
      },
    });

    wsServer.send({
      echo_req: {
        base_currency: 'USD',
        exchange_rates: 1,
        req_id: 1,
        subscribe: 1,
      },
      exchange_rates: {
        base_currency: 'USD',
        date: 1675847306,
        rates: {
          UGX: 3673,
          USB: 1,
          USDC: 0.995758070619162,
          USDK: 1,
          UST: 1.000005000025,
          UYU: 40.675,
          VND: 23600.05,
          XAF: 610.0564,
          XCD: 2.7,
          XOF: 610.0592,
          YER: 250.265,
          ZAR: 17.5162,
          ZMK: 17465,
          eUSDT: 1.000005000025,
          tUSDT: 1.000005000025,
        },
      },
      msg_type: 'exchange_rates',
      req_id: 1,
      subscription: {
        id: '0dee6bab-7e9e-fed0-069d-ae2747451b55',
      },
    });

    expect(result.current.data).toEqual({
      base_currency: 'USD',
      date: 1675847306,
      rates: {
        UGX: 3673,
        USB: 1,
        USDC: 0.995758070619162,
        USDK: 1,
        UST: 1.000005000025,
        UYU: 40.675,
        VND: 23600.05,
        XAF: 610.0564,
        XCD: 2.7,
        XOF: 610.0592,
        YER: 250.265,
        ZAR: 17.5162,
        ZMK: 17465,
        eUSDT: 1.000005000025,
        tUSDT: 1.000005000025,
      },
    });
  });

  it('Should catch errors', async () => {
    const { result } = renderHook(() => useSubscription('exchange_rates'));

    expect(result.current.is_loading).toBeFalsy();

    act(() => {
      result.current.subscribe({
        base_currency: 'USD',
      });
    });
    expect(result.current.is_loading).toBeTruthy();
    expect(result.current.is_subscribed).toBeTruthy();

    await expect(wsServer).toReceiveMessage({
      base_currency: 'USD',
      req_id: 1,
      subscribe: 1,
    });

    wsServer.send({
      echo_req: {
        base_currency: 'USD',
        exchange_rates: 1,
        req_id: 1,
        subscribe: 1,
      },
      error: {
        message: 'this is an error',
      },
      msg_type: 'exchange_rates',
      req_id: 1,
      subscription: {
        id: '2f39f7e7-d986-33f2-080a-b0ee50cfb85c',
      },
    });

    expect(result.current.error).toEqual({
      echo_req: {
        base_currency: 'USD',
        exchange_rates: 1,
        req_id: 1,
        subscribe: 1,
      },
      error: {
        message: 'this is an error',
      },
      msg_type: 'exchange_rates',
      req_id: 1,
      subscription: {
        id: '2f39f7e7-d986-33f2-080a-b0ee50cfb85c',
      },
    });
    expect(result.current.is_loading).toBeFalsy();
  });
});
