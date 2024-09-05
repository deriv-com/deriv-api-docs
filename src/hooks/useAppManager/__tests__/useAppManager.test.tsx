import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { WS } from 'jest-websocket-mock';
import { cleanup } from '@testing-library/react';
import { ApplicationObject } from '@deriv/api-types';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import AppManagerContextProvider from '@site/src/contexts/app-manager/app-manager.provider';
import AuthProvider from '@site/src/contexts/auth/auth.provider';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import useAuthContext from '../../useAuthContext';
import useAppManager from '..';

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

  it('Should call handleCurrentUpdatingItem', () => {
    const { result } = renderHook(() => useAppManager(), { wrapper });

    const applicationItem: ApplicationObject = {
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
      official: 0,
    };

    act(() => {
      result.current.handleCurrentUpdatingItem(applicationItem);
    });
    expect(result.current.current_updating_item).toBe(applicationItem);
  });
});
