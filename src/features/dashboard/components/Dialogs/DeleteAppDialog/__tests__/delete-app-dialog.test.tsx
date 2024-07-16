import { useDeleteApp } from '@site/src/features/dashboard/hooks/useDeleteApp';
import { render, screen, cleanup, within } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DeleteAppDialog from '..';

jest.mock('@site/src/features/dashboard/hooks/useDeleteApp');

const mockUseDeleteApp = useDeleteApp as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDeleteApp>>
>;

const mockDeleteApp = jest.fn();

mockUseDeleteApp.mockImplementation(() => ({
  deleteApp: mockDeleteApp,
  isLoading: false,
}));

describe('Delete App Dialog', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<DeleteAppDialog appId={1234} onClose={mockOnClose} />);
  });
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render modal title', () => {
    const titleText = screen.getByText('Delete app');
    expect(titleText).toBeInTheDocument();
  });

  it('Should render modal content', () => {
    const descriptionContent = screen.getByText('Are you sure you want to delete this app?');
    expect(descriptionContent).toBeInTheDocument();
  });

  it('Should render proper buttons', () => {
    const okButton = screen.getByRole('button', { name: /yes, delete/i });
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    expect(okButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('Should call onClose on cancel button click', async () => {
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await userEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('Should call deleteApp on ok button click', async () => {
    const okButton = screen.getByRole('button', { name: /yes, delete/i });

    await userEvent.click(okButton);

    expect(mockDeleteApp).toHaveBeenCalledTimes(1);

    expect(mockDeleteApp).toHaveBeenCalledWith(1234);
  });
});
