import useAppManager from '@site/src/hooks/useAppManager';
import { render, cleanup, screen } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NoApps from '..';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';

jest.mock('@site/src/hooks/useAppManager');

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;

const mockUpdateCurrentTab = jest.fn();

mockUseAppManager.mockImplementation(() => ({
  updateCurrentTab: mockUpdateCurrentTab,
}));

describe('No Apps', () => {
  beforeEach(() => {
    render(<NoApps />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render description', () => {
    const descriptionText = screen.getByTestId('no-apps-description');
    expect(descriptionText).toHaveTextContent(
      'To see your details reflected, please register your app via the registration form.',
    );
  });

  it('Should navigate to REGISTER_APP Tab on Register now click', async () => {
    const registerNowButton = screen.getByRole('button');

    await userEvent.click(registerNowButton);

    expect(mockUpdateCurrentTab).toHaveBeenCalledTimes(1);
    expect(mockUpdateCurrentTab).toHaveBeenCalledWith(TDashboardTab.REGISTER_APP);
  });
});
