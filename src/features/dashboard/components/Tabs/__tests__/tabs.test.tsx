import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import useAppManager from '@site/src/hooks/useAppManager';
import { render, cleanup, screen } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import React, { act } from 'react';
import DashboardTabs from '..';

jest.mock('@site/src/hooks/useAppManager');

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;

let mockCurrentTab: TDashboardTab = TDashboardTab.MANAGE_TOKENS;

const mockUpdateCurrentTab = jest.fn().mockImplementation((newTab: TDashboardTab) => {
  mockCurrentTab = newTab;
});

mockUseAppManager.mockImplementation(() => ({
  currentTab: mockCurrentTab,
  updateCurrentTab: mockUpdateCurrentTab,
}));

describe('Dashboard Tabs', () => {
  beforeEach(() => {
    render(<DashboardTabs />);
  });

  afterEach(() => {
    cleanup();
    mockCurrentTab = TDashboardTab.MANAGE_TOKENS;
    jest.clearAllMocks();
  });

  it.skip('Should render all tabs properly', () => {
    const tabs = screen.getAllByRole('tab');

    expect(tabs).toHaveLength(3);

    const registerApplicationTab = screen.getByRole('tab', { name: /register application/i });
    const manageApplicationsTab = screen.getByRole('tab', { name: /manage tokens/i });
    const manageTokensTab = screen.getByRole('tab', { name: /manage applications/i });

    expect(registerApplicationTab).toBeInTheDocument();
    expect(registerApplicationTab).toBeVisible();

    expect(manageApplicationsTab).toBeInTheDocument();
    expect(manageApplicationsTab).toBeVisible();

    expect(manageTokensTab).toBeInTheDocument();
    expect(manageTokensTab).toBeVisible();
  });

  it('Should change the current tab on tabs click', async () => {
    const registerApplicationTab = screen.getByRole('tab', { name: /register application/i });

    await act(async () => {
      await userEvent.click(registerApplicationTab);
    });

    expect(mockUpdateCurrentTab).toBeCalled();
    expect(mockUpdateCurrentTab).toBeCalledWith(TDashboardTab.REGISTER_APP.toString());
  });
});
