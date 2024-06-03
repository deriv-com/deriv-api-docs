import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { cleanup, renderHook, act, waitFor } from '@testing-library/react';
import { WS } from 'jest-websocket-mock';
import useRegisterApp from '..';

const connection = makeMockSocket();

describe('Use Delete App', () => {
  let wsServer: WS;
  beforeEach(async () => {
    wsServer = await connection.setup();
    await wsServer.connected;
  });

  afterEach(() => {
    connection.tearDown();
    cleanup();
  });

  it('Should register app with provided values', async () => {
    const { result } = renderHook(() => useRegisterApp());

    expect(result.current.is_loading).toBeFalsy();

    act(() => {
      result.current.registerApp({
        name: 'app',
        scopes: ['admin', 'payments'],
        redirect_uri: 'https://example.com',
        verification_uri: 'https://example.com',
      });
    });

    expect(result.current.is_loading).toBeTruthy();

    await expect(wsServer).toReceiveMessage({
      app_register: 1,
      name: 'app',
      redirect_uri: 'https://example.com',
      req_id: 1,
      scopes: ['admin', 'payments'],
      verification_uri: 'https://example.com',
    });

    wsServer.send({
      app_register: {
        active: 1,
        app_id: 12345,
        app_markup_percentage: 0,
        appstore: '',
        github: '',
        googleplay: '',
        homepage: '',
        name: 'app',
        redirect_uri: 'https://example.com',
        scopes: ['admin', 'payments'],
        verification_uri: 'https://example.com',
      },
      echo_req: {
        app_register: 1,
        name: 'app',
        redirect_uri: 'https://example.com',
        req_id: 1,
        scopes: ['admin', 'payments'],
        verification_uri: 'https://example.com',
      },
      msg_type: 'app_register',
      req_id: 1,
    });

    await waitFor(() => {
      expect(result.current.is_loading).toBeFalsy();
      expect(result.current.data).toStrictEqual({
        active: 1,
        app_id: 12345,
        app_markup_percentage: 0,
        appstore: '',
        github: '',
        googleplay: '',
        homepage: '',
        name: 'app',
        redirect_uri: 'https://example.com',
        scopes: ['admin', 'payments'],
        verification_uri: 'https://example.com',
      });
    });
  });
});
