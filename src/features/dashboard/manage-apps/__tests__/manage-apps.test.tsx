import { ApplicationObject } from '@deriv/api-types';
import useAppManager from '@site/src/hooks/useAppManager';
import { render, screen, cleanup } from '@site/src/test-utils';
import React from 'react';
import AppManagement from '..';
import LoadingTable from '../../components/loading-table';

jest.mock('@site/src/hooks/useAppManager');

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;
const mockGetApps = jest.fn();
mockUseAppManager.mockImplementation(() => ({
  updateCurrentTab: jest.fn(),
}));

describe.skip('App Management', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render Loading Table with 5 rows when apps is null', () => {
    const fakeApps: ApplicationObject[] = null;

    mockUseAppManager.mockImplementationOnce(() => ({
      getApps: mockGetApps,
      apps: fakeApps,
    }));

    render(<AppManagement />);

    const loadingRow = screen.getAllByTestId('loading-skeleton-row');

    expect(mockGetApps).toBeCalledTimes(1);

    expect(loadingRow).toHaveLength(5);
  });

  it('Should render app table with proper application array', () => {
    const fakeApps: ApplicationObject[] = [
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
    ];

    mockUseAppManager.mockImplementationOnce(() => ({
      getApps: mockGetApps,
      apps: fakeApps,
    }));

    render(<AppManagement />);

    const appsTable = screen.getByRole('table');

    expect(appsTable).toBeInTheDocument();
  });
});
