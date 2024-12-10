import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { cleanup, renderHook, act, waitFor } from '@testing-library/react';
import { WS } from 'jest-websocket-mock';
import useUpdateApp from '..';

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
    const { result } = renderHook(() => useUpdateApp());

    expect(result.current.is_loading).toBeFalsy();

    act(() => {
      result.current.updateApp({
        app_update: 1234,
        name: 'test update app',
        scopes: ['admin', 'trade'],
      });
    });

    expect(result.current.is_loading).toBeTruthy();

    await expect(wsServer).toReceiveMessage({
      app_update: 1234,
      name: 'test update app',
      req_id: 1,
      scopes: ['admin', 'trade'],
    });

    wsServer.send({
      app_update: {
        active: 1,
        app_id: 1234,
        app_markup_percentage: 0,
        appstore: '',
        github: '',
        googleplay: '',
        homepage: '',
        name: 'app',
        redirect_uri: 'https://example.com',
        scopes: ['admin', 'trade'],
        verification_uri: 'https://example.com',
      },
      echo_req: {
        app_update: 1234,
        name: 'test update app',
        req_id: 1,
        scopes: ['admin', 'trade'],
      },
      msg_type: 'app_update',
      req_id: 1,
    });

    await waitFor(() => {
      expect(result.current.is_loading).toBeFalsy();

      expect(result.current.data).toStrictEqual({
        active: 1,
        app_id: 1234,
        app_markup_percentage: 0,
        appstore: '',
        github: '',
        googleplay: '',
        homepage: '',
        name: 'app',
        redirect_uri: 'https://example.com',
        scopes: ['admin', 'trade'],
        verification_uri: 'https://example.com',
      });
    });
  });
});
