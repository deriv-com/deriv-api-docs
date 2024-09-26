import { render, screen, cleanup } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { RegisterAppDialogError, TError } from '..';

const fakeNormalError: TError = {
  error: {
    code: 'error_code',
    message: 'Fake Error message',
  },
};

const fakeInvalidError: TError = {
  error: {
    code: 'InvalidToken',
    message: 'Fake Invalid Error message',
  },
};

describe('Delete App Dialog', () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render proper message for generic error', () => {
    render(<RegisterAppDialogError error={fakeNormalError} onClose={mockOnClose} />);

    const errorContent = screen.getByText(/fake error message/i);
    expect(errorContent).toBeInTheDocument();
  });

  it('Should render proper message for invalid token error', () => {
    render(<RegisterAppDialogError error={fakeInvalidError} onClose={mockOnClose} />);

    const errorContent = screen.getByText(
      'Enter your API token (with the Admin scope) to register your app.',
    );
    expect(errorContent).toBeInTheDocument();
  });

  it('Should close dialog on got it button click', async () => {
    render(<RegisterAppDialogError error={fakeNormalError} onClose={mockOnClose} />);

    const gotItButton = screen.getByRole('button', { name: /got it/i });

    await userEvent.click(gotItButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
