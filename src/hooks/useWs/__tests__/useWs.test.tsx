import { act, renderHook, waitFor } from '@testing-library/react';
import useWS from '..';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import WS from 'jest-websocket-mock';

const connection = makeMockSocket();

describe('Use WS', () => {
  let wsServer: WS;
  beforeEach(async () => {
    wsServer = await connection.setup();
  });

  afterEach(() => {
    connection.tearDown();
  });

  it('Should send ping message', async () => {
    const { result } = renderHook(() => useWS('ping'));

    expect(result.current.is_loading).toBeFalsy();

    act(() => {
      result.current.send();
    });
    expect(result.current.is_loading).toBeTruthy();

    await expect(wsServer).toReceiveMessage({ ping: 1, req_id: 1 });

    wsServer.send({
      echo_req: {
        ping: 1,
        req_id: 1,
      },
      msg_type: 'ping',
      ping: 'pong',
      req_id: 1,
    });

    await waitFor(() => {
      expect(result.current.is_loading).toBeFalsy();
      expect(result.current.data).toBe('pong');
    });
  });

  it('Should get active symbols properly', async () => {
    const { result } = renderHook(() => useWS('active_symbols'));

    expect(result.current.is_loading).toBeFalsy();

    act(() => {
      result.current.send({
        active_symbols: 'brief',
        product_type: 'basic',
      });
    });

    expect(result.current.is_loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();

    await expect(wsServer).toReceiveMessage({
      active_symbols: 'brief',
      product_type: 'basic',
      req_id: 1,
    });

    wsServer.send({
      active_symbols: [
        {
          allow_forward_starting: 0,
          display_name: 'AUD/JPY',
          display_order: 1,
          exchange_is_open: 1,
          is_trading_suspended: 0,
          market: 'forex',
          market_display_name: 'Forex',
          pip: 0.001,
          subgroup: 'none',
          subgroup_display_name: 'None',
          submarket: 'major_pairs',
          submarket_display_name: 'Major Pairs',
          symbol: 'frxAUDJPY',
          symbol_type: 'forex',
        },
        {
          allow_forward_starting: 0,
          display_name: 'AUD/USD',
          display_order: 2,
          exchange_is_open: 1,
          is_trading_suspended: 0,
          market: 'forex',
          market_display_name: 'Forex',
          pip: 0.00001,
          subgroup: 'none',
          subgroup_display_name: 'None',
          submarket: 'major_pairs',
          submarket_display_name: 'Major Pairs',
          symbol: 'frxAUDUSD',
          symbol_type: 'forex',
        },
      ],
      echo_req: {
        active_symbols: 'brief',
        product_type: 'basic',
        req_id: 1,
      },
      msg_type: 'active_symbols',
      req_id: 1,
    });

    await waitFor(() => {
      expect(result.current.is_loading).toBeFalsy();
      expect(result.current.error).toBeUndefined();

      expect(result.current.data).toEqual(
        expect.arrayContaining([
          {
            allow_forward_starting: 0,
            display_name: 'AUD/JPY',
            display_order: 1,
            exchange_is_open: 1,
            is_trading_suspended: 0,
            market: 'forex',
            market_display_name: 'Forex',
            pip: 0.001,
            subgroup: 'none',
            subgroup_display_name: 'None',
            submarket: 'major_pairs',
            submarket_display_name: 'Major Pairs',
            symbol: 'frxAUDJPY',
            symbol_type: 'forex',
          },
          {
            allow_forward_starting: 0,
            display_name: 'AUD/USD',
            display_order: 2,
            exchange_is_open: 1,
            is_trading_suspended: 0,
            market: 'forex',
            market_display_name: 'Forex',
            pip: 0.00001,
            subgroup: 'none',
            subgroup_display_name: 'None',
            submarket: 'major_pairs',
            submarket_display_name: 'Major Pairs',
            symbol: 'frxAUDUSD',
            symbol_type: 'forex',
          },
        ]),
      );
    });
  });

  it('Should handle error', async () => {
    const { result } = renderHook(() => useWS('active_symbols'));

    expect(result.current.is_loading).toBeFalsy();

    act(() => {
      result.current.send({
        active_symbols: 'brief',
        product_type: 'basic',
      });
    });

    expect(result.current.is_loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();

    await expect(wsServer).toReceiveMessage({
      active_symbols: 'brief',
      product_type: 'basic',
      req_id: 1,
    });

    wsServer.send({
      echo_req: {
        active_symbols: 'brief',
        product_type: 'basic',
        req_id: 1,
      },
      error: {
        code: 'InputValidationFailed',
        details: {
          product_type: 'Not in enum list: basic.',
        },
        message: 'Input validation failed: product_type',
      },
      msg_type: 'active_symbols',
      req_id: 1,
    });

    await waitFor(() => {
      expect(result.current.is_loading).toBeFalsy();

      expect(result.current.error).toEqual({
        echo_req: { active_symbols: 'brief', product_type: 'basic', req_id: 1 },
        error: {
          code: 'InputValidationFailed',
          details: { product_type: 'Not in enum list: basic.' },
          message: 'Input validation failed: product_type',
        },
        msg_type: 'active_symbols',
        req_id: 1,
      });
    });
  });

  it('Should be able to clear the websocket call', async () => {
    const { result } = renderHook(() => useWS('ping'));

    expect(result.current.is_loading).toBeFalsy();

    act(() => {
      result.current.send();
    });
    expect(result.current.is_loading).toBeTruthy();

    await expect(wsServer).toReceiveMessage({ ping: 1, req_id: 1 });

    wsServer.send({
      echo_req: {
        ping: 1,
        req_id: 1,
      },
      msg_type: 'ping',
      ping: 'pong',
      req_id: 1,
    });

    await waitFor(() => {
      expect(result.current.is_loading).toBeFalsy();
      expect(result.current.data).toBe('pong');
    });

    act(() => {
      result.current.clear();
    });

    expect(result.current.data).toBe(null);
  });
});
