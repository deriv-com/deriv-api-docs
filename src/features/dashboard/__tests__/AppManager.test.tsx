import React from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useApiToken from '@site/src/hooks/useApiToken';
import useAppManager from '@site/src/hooks/useAppManager';
import { render, screen } from '@testing-library/react';
import { AppManager } from '..';
import { useTable } from 'react-table';

jest.mock('@site/src/hooks/useAuthContext');
jest.mock('@docusaurus/router', () => ({
  useLocation: jest.fn(),
}));

const mockUseAuthContext = useAuthContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAuthContext>>
>;

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

mockUseApiToken.mockImplementation(() => ({
  updateTokens: jest.fn(),
}));

jest.mock('@site/src/hooks/useAppManager');

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;

mockUseAppManager.mockImplementation(() => ({
  setIsDashboard: jest.fn(),
  getApps: jest.fn(),
  updateCurrentTab: jest.fn(),
}));

jest.mock('react-table');

const mockReactTable = useTable as jest.MockedFunction<() => Partial<ReturnType<typeof useTable>>>;

mockReactTable.mockImplementation(() => ({
  getTableProps: jest.fn(),
  getTableBodyProps: jest.fn(),
  rows: [],
  headerGroups: [],
}));

describe('AppManager', () => {
  it('shows the login screen', () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: false,
    }));

    render(<AppManager />);

    const login = screen.getByText(
      /Log in to your Deriv account to get the API token and start using our API./i,
    );
    expect(login).toBeInTheDocument();
  });

  it('shows the dashboard loader if app and token is undefined', () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: true,
    }));
    render(<AppManager />);
    const loader = screen.getByTestId('dt_spinner');
    expect(loader).toBeInTheDocument();
  });

  it('shows the dashboard if app and token is not undefined', () => {
    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: true,
    }));
    mockUseAppManager.mockImplementation(() => ({
      setIsDashboard: jest.fn(),
      apps: [],
      getApps: jest.fn(),
      updateCurrentTab: jest.fn(),
    }));
    mockUseApiToken.mockImplementation(() => ({
      tokens: [],
    }));

    render(<AppManager />);
    const dashboard_header = screen.getByText(
      /Start using Deriv API to bring custom integrations and powerful automation to your apps./i,
    );

    expect(dashboard_header).toBeInTheDocument();
  });
});
