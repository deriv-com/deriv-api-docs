import useAppManager from '@site/src/hooks/useAppManager';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { cleanup, renderHook, act, waitFor } from '@testing-library/react';
import { WS } from 'jest-websocket-mock';
import useGetApps from '..';

jest.mock('@site/src/hooks/useAppManager');

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;

const mockGetApps = jest.fn();

mockUseAppManager.mockImplementation(() => ({
  getApps: mockGetApps,
}));

const fakeAppsResponse = {
  app_list: [
    {
      active: 1,
      app_id: 11111,
      app_markup_percentage: 0,
      appstore: '',
      github: '',
      googleplay: '',
      homepage: '',
      name: 'first app',
      redirect_uri: 'https://example.com',
      scopes: ['admin', 'payments', 'read', 'trade', 'trading_information'],
      verification_uri: 'https://example.com',
      last_used: '',
    },
    {
      active: 1,
      app_id: 22222,
      app_markup_percentage: 0,
      appstore: '',
      github: '',
      googleplay: '',
      homepage: '',
      name: 'second app',
      redirect_uri: 'https://example.com',
      scopes: ['payments', 'read', 'trade', 'trading_information'],
      verification_uri: 'https://example.com',
      last_used: '',
    },
  ],
  echo_req: { app_list: 1, req_id: 1 },
  msg_type: 'app_list',
  req_id: 1,
};

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

  it('Should delete app with appId', async () => {
    const { result } = renderHook(() => useGetApps());

    expect(result.current.is_loading).toBeFalsy();

    act(() => {
      result.current.getAllApps();
    });

    expect(result.current.is_loading).toBeTruthy();

    await expect(wsServer).toReceiveMessage({ app_list: 1, req_id: 1 });

    wsServer.send(fakeAppsResponse);

    await waitFor(() => {
      expect(result.current.apps).toHaveLength(2);
      expect(result.current.is_loading).toBeFalsy();
    });
  });
});
