import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { WS } from 'jest-websocket-mock';
import useAppManager from '..';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import useAuthContext from '../../useAuthContext';
import AppManagerContextProvider from '@site/src/contexts/app-manager/app-manager.provider';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import { cleanup } from '@testing-library/react';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';

const connection = makeMockSocket();

jest.mock('../../useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAuthContext>>
>;

mockUseAuthContext.mockImplementation(() => ({
  is_authorized: true,
}));

const wrapper = ({ children }) => (
  <AuthProvider>
    <AppManagerContextProvider>{children}</AppManagerContextProvider>
  </AuthProvider>
);

describe('use App Manager', () => {
  let wsServer: WS;
  beforeEach(async () => {
    wsServer = await connection.setup();
  });
  afterEach(async () => {
    connection.tearDown();
    cleanup();
  });

  it('Should have is_dashboard falsy', () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });
    expect(result.current.is_dashboard).toBeFalsy();
  });

  it('Should be able to getApps', async () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });
    act(() => {
      result.current.getApps();
    });

    await expect(wsServer).toReceiveMessage({ app_list: 1, req_id: 1 });
  });

  it('Should have MANAGE_APPS as initial value for currentTab', () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });
    expect(result.current.currentTab).toBe(TDashboardTab.MANAGE_APPS);
  });

  it('Should update currentTab value', () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });
    act(() => {
      result.current.updateCurrentTab(TDashboardTab.REGISTER_APP);
    });
    expect(result.current.currentTab).toBe(TDashboardTab.REGISTER_APP);
  });

  it('Should set is_dashboard to truthy when user visits dashboard tab', () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });
    act(() => {
      result.current.setIsDashboard(true);
    });
    expect(result.current.is_dashboard).toBeTruthy();
  });

  it('Should set is_dashboard to truthy when user visits dashboard tab', () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });
    act(() => {
      result.current.getApps();
    });
    expect(result.current.getApps).toBeTruthy();
  });
});
