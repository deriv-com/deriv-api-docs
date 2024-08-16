import { ApplicationObject } from '@deriv/api-types';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { render, screen, within } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import React, { act } from 'react';
import AppsTable from '..';
import useDeviceType from '@site/src/hooks/useDeviceType';
import useAppManager from '@site/src/hooks/useAppManager';

jest.mock('@site/src/hooks/useAuthContext');
const mockUseAuthContext = useAuthContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAuthContext>>
>;

jest.mock('@site/src/hooks/useDeviceType');
const mockDeviceType = useDeviceType as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDeviceType>>
>;
mockDeviceType.mockImplementation(() => ({
  deviceType: 'desktop',
}));

mockUseAuthContext.mockImplementation(() => ({
  is_authorized: true,
  currentLoginAccount: {
    currency: 'USD',
    name: 'CR111111',
    token: 'first_token',
  },
}));

jest.mock('@site/src/hooks/useAppManager');
const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;
const mockUpdateCurrentTab = jest.fn();
mockUseAppManager.mockImplementation(() => ({
  getApps: jest.fn(),
  apps: undefined,
  tokens: undefined,
  updateCurrentTab: mockUpdateCurrentTab,
  handleCurrentUpdatingItem: jest.fn(),
}));

const fakeApplications: ApplicationObject[] = [
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
    official: 0,
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
    official: 0,
  },
  {
    active: 1,
    app_id: 44444,
    app_markup_percentage: 0,
    appstore: '',
    github: '',
    googleplay: '',
    homepage: '',
    name: 'app 2',
    redirect_uri: 'https://example.com',
    scopes: ['payments'],
    verification_uri: 'https://example.com',
    last_used: '',
    official: 0,
  },
  {
    active: 1,
    app_id: 33333,
    app_markup_percentage: 0,
    appstore: '',
    github: '',
    googleplay: '',
    homepage: '',
    name: 'app 1',
    redirect_uri: 'https://example.com',
    scopes: ['no_scope'],
    verification_uri: 'https://example.com',
    last_used: '',
    official: 0,
  },
];

describe('Apps Table', () => {
  const renderAppTable = () => {
    render(<AppsTable apps={fakeApplications} />);
  };

  it('Should render all applications properly', () => {
    renderAppTable();
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(5);
  });

  it('Should open delete dialog for the application row properly', async () => {
    renderAppTable();
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await act(async () => {
      await userEvent.click(openDeleteDialogButton);
    });

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();
  });

  it('Should open edit dialog for the application row properly', async () => {
    renderAppTable();
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openEditDialogButton = withinActionCell.getByTestId('update-app-button');
    await act(async () => {
      await userEvent.click(openEditDialogButton);
    });
    expect(mockUpdateCurrentTab.mock.calls.length).toBe(1);
  });

  it('Should close delete dialog on cancel ', async () => {
    renderAppTable();
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await act(async () => {
      await userEvent.click(openDeleteDialogButton);
    });

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();

    const closeDeleteDialog = await screen.findByText(/cancel/i);
    await act(async () => {
      await userEvent.click(closeDeleteDialog);
    });

    expect(deleteDialogTitle).not.toBeInTheDocument();
  });

  it('Should close delete dialog when pressing the delete button', async () => {
    renderAppTable();
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await act(async () => {
      await userEvent.click(openDeleteDialogButton);
    });

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();

    const closeDeleteDialog = screen.getByText(/yes, delete/i);
    await act(async () => {
      await userEvent.click(closeDeleteDialog);
    });

    expect(deleteDialogTitle).not.toBeInTheDocument();
  });

  it('Should opens modal for delete app and closes it with close button', async () => {
    renderAppTable();
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await act(async () => {
      await userEvent.click(openDeleteDialogButton);
    });

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();

    // test-id provided by Deriv UI library component
    const modal_button = screen.getByText('Cancel');
    await act(async () => {
      await userEvent.click(modal_button);
    });

    expect(deleteDialogTitle).not.toBeInTheDocument();
  });

  it('Should render responsive view properly', () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'mobile',
    }));
    renderAppTable();
    const accordion = screen.getAllByTestId('dt_accordion_root');
    expect(accordion.length).toBe(1);
  });

  it('Should update current tab on clicking Register new application button', async () => {
    renderAppTable();
    const registerButton = screen.getByText('Register new application');
    await userEvent.click(registerButton);
    expect(mockUpdateCurrentTab).toBeCalled();
  });

  it('Should open first accordion on item click', async () => {
    renderAppTable();
    const item = screen.getByText('first app');
    await act(async () => {
      await userEvent.click(item);
    });
    const content = screen.getByText('11111');
    expect(content).toBeInTheDocument();
  });

  it('Should render sort option dialog on mobile', async () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'mobile',
    }));
    renderAppTable();
    const sortButton = screen.getByTestId('mb-sort-button');
    await act(async () => {
      await userEvent.click(sortButton);
    });
    const sortDialog = screen.getByText('Sort by');
    expect(sortDialog).toBeInTheDocument();
  });

  it('Should render filter option dialog on mobile', async () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'mobile',
    }));
    renderAppTable();
    const filterButton = screen.getByTestId('mb-filter-button');
    await act(async () => {
      await userEvent.click(filterButton);
    });
    const filterDialog = screen.getByText('Filter by OAuth scopes');
    expect(filterDialog).toBeInTheDocument();
  });

  it('Should close the filter dialog on mobile when clicked on apply', async () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'mobile',
    }));
    renderAppTable();
    const filterButton = screen.getByTestId('mb-filter-button');
    await act(async () => {
      await userEvent.click(filterButton);
    });
    const filterDialog = screen.getByText('Filter by OAuth scopes');
    expect(filterDialog).toBeInTheDocument();
    const checkbox = screen.getByTestId('admin');
    const applyButton = screen.getByText('Apply');
    await act(async () => {
      await userEvent.click(checkbox);
      await userEvent.click(applyButton);
    });
    expect(filterDialog).not.toBeInTheDocument();
  });

  it('Should close the sort dialog on mobile when clicked on apply', async () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'mobile',
    }));
    renderAppTable();
    const sortButton = screen.getByTestId('mb-sort-button');
    await act(async () => {
      await userEvent.click(sortButton);
    });
    const filterDialog = screen.getByText('Sort by');
    expect(filterDialog).toBeInTheDocument();
    const radioBtn = screen.getByTestId('appNameAscending');
    const applyButton = screen.getByText('Apply');
    await act(async () => {
      await userEvent.click(radioBtn);
      await userEvent.click(applyButton);
    });
    expect(filterDialog).not.toBeInTheDocument();
  });

  it('Should sort the table by app id in ascending order', async () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'desktop',
    }));
    renderAppTable();
    const tableColumn = screen.getByTestId(`appId`);
    await act(async () => {
      await userEvent.click(tableColumn);
    });
    expect(screen.getByText('first app')).toBeInTheDocument();
  });

  it('Should sort the table by app name in ascending order', async () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'desktop',
    }));
    renderAppTable();
    const tableColumn = screen.getByTestId(`appName`);
    await act(async () => {
      await userEvent.click(tableColumn);
    });
    expect(screen.getByText('first app')).toBeInTheDocument();
  });

  it('Should sort the table by app name in descending order', async () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'desktop',
    }));
    renderAppTable();
    const tableColumn = screen.getByTestId(`appName`);
    await act(async () => {
      await userEvent.click(tableColumn);
    });
    await act(async () => {
      await userEvent.click(tableColumn);
    });
    expect(screen.getByText('first app')).toBeInTheDocument();
  });

  it('Should filter the table', async () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'desktop',
    }));
    renderAppTable();
    const filterDropdown = screen.getByTestId(`filter-dropdown`);
    await act(async () => {
      await userEvent.click(filterDropdown);
    });
    expect(screen.getByText('Filter by OAuth scopes')).toBeInTheDocument();
    const checkbox = screen.getByTestId('filter-no_scope');
    await act(async () => {
      await userEvent.click(checkbox);
    });
    let rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4);

    const checkbox2 = screen.getByTestId('filter-payments');
    await act(async () => {
      await userEvent.click(checkbox2);
    });
    rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);

    const checkbox3 = screen.getByTestId('filter-no_scope');
    await act(async () => {
      await userEvent.click(checkbox3);
    });
    rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4);

    const checkbox4 = screen.getByTestId('filter-payments');
    await act(async () => {
      await userEvent.click(checkbox4);
    });
    rows = screen.getAllByRole('row');
    expect(rows.length).toBe(5);
  });

  it('Should reset filter to all when clicked', async () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'desktop',
    }));
    renderAppTable();
    const filterDropdown = screen.getByTestId(`filter-dropdown`);
    await act(async () => {
      await userEvent.click(filterDropdown);
    });

    const checkbox1 = screen.getByTestId('filter-no_scope');
    await act(async () => {
      await userEvent.click(checkbox1);
    });
    let rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4);

    const checkbox2 = screen.getByTestId('filter-all');
    await act(async () => {
      await userEvent.click(checkbox2);
    });
    rows = screen.getAllByRole('row');
    expect(rows.length).toBe(5);
  });
});
