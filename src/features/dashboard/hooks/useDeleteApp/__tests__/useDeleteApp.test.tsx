import useAppManager from '@site/src/hooks/useAppManager';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { cleanup, renderHook, act, waitFor } from '@testing-library/react';
import { WS } from 'jest-websocket-mock';
import { useDeleteApp } from '..';

jest.mock('@site/src/hooks/useAppManager');

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;

const mockGetApps = jest.fn();

mockUseAppManager.mockImplementation(() => ({
  getApps: mockGetApps,
}));

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
    const { result } = renderHook(() => useDeleteApp());

    act(() => {
      result.current.deleteApp(1234);
    });

    await expect(wsServer).toReceiveMessage({ app_delete: 1234, req_id: 1 });

    wsServer.send({
      app_delete: 1,
      echo_req: { app_delete: 1234, req_id: 1 },
      msg_type: 'app_delete',
      req_id: 1,
    });

    await waitFor(() => {
      expect(mockGetApps).toBeCalled();
      expect(result.current.data).toBe(1);
    });
  });
});
