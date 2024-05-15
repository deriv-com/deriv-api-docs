import { ApplicationObject } from '@deriv/api-types';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { render, screen, within } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
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

describe('Apps Table', () => {
  const renderAppTable = () => {
    render(<AppsTable apps={fakeApplications} />);
  };

  it('Should render all applications properly', () => {
    renderAppTable();
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });

  it.skip('Should open delete dialog for the application row properly', async () => {
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await userEvent.click(openDeleteDialogButton);

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();
  });

  it.skip('Should close delete dialog on cancel ', async () => {
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await userEvent.click(openDeleteDialogButton);

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();

    const closeDeleteDialog = await screen.findByText(/cancel/i);
    await userEvent.click(closeDeleteDialog);

    expect(deleteDialogTitle).not.toBeInTheDocument();
  });

  it.skip('Should close delete dialog when pressing the delete button', async () => {
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await userEvent.click(openDeleteDialogButton);

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();

    const closeDeleteDialog = screen.getByText(/yes, delete/i);
    await userEvent.click(closeDeleteDialog);

    expect(deleteDialogTitle).not.toBeInTheDocument();
  });

  it.skip('opens modal for delete app and closes it with close button', async () => {
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openDeleteDialogButton = withinActionCell.getByTestId('delete-app-button');
    await userEvent.click(openDeleteDialogButton);

    const deleteDialogTitle = await screen.findByText('Are you sure you want to delete this app?');
    expect(deleteDialogTitle).toBeInTheDocument();

    // test-id provided by Deriv UI library component
    const modal_button = screen.getByTestId('close-button');
    await userEvent.click(modal_button);

    expect(deleteDialogTitle).not.toBeInTheDocument();
  });

  it.skip('Should open edit dialog form on edit button', async () => {
    const actionCells = await screen.findAllByTestId('app-action-cell');
    const firstActionCell = actionCells[0];

    const withinActionCell = within(firstActionCell);
    const openEditDialog = withinActionCell.getByTestId('update-app-button');
    await userEvent.click(openEditDialog);

    const updateDialogTitle = await screen.findByText('Update App');
    expect(updateDialogTitle).toBeInTheDocument();
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
    await userEvent.click(item);
    const content = screen.getByText('11111');
    expect(content).toBeInTheDocument();
  });
});
