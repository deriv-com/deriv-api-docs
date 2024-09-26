import useAppManager from '@site/src/hooks/useAppManager';
import { render, screen, cleanup } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { RegisterAppDialogSuccess } from '..';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';

jest.mock('@site/src/hooks/useAppManager');

const mockUpdateCurrentTab = jest.fn();

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;

mockUseAppManager.mockImplementation(() => ({
  updateCurrentTab: mockUpdateCurrentTab as jest.MockedFunction<(tab: TDashboardTab) => void>,
}));

describe('App Dialog Register Success', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<RegisterAppDialogSuccess onClose={mockOnClose} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render buttons properly', () => {
    const secondaryButton = screen.getByRole('button', { name: /got it/i });
    expect(secondaryButton).toBeInTheDocument();
  });

  it('Should display correct content on the modal', () => {
    const textContent = screen.getByText(/^You have successfully registered/i);
    expect(textContent).toHaveTextContent('You have successfully registered your application.');
  });

  it('Should close the modal on Secondary button click', async () => {
    const secondaryButton = screen.getByRole('button', { name: /got it/i });

    await userEvent.click(secondaryButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
