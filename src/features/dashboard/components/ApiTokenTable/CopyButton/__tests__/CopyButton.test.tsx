import React, { act } from 'react';
import CopyButton from '..';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

Object.assign(navigator, {
  clipboard: {
    writeText: () => jest.fn().mockImplementation(() => Promise.resolve()),
    readText: () => jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('CopyButton', () => {
  jest.spyOn(navigator.clipboard, 'writeText');

  it('should render the CopyButton', () => {
    render(<CopyButton value='testvalue' has_admin />);

    const copy_button = screen.getByRole('button');
    expect(copy_button).toBeInTheDocument();
  });

  it('opens modal for admin token and copies it when pressing OK', async () => {
    render(<CopyButton value='testvalue' has_admin />);

    const copy_button = screen.getByRole('button');
    await act(async () => {
      await userEvent.click(copy_button);
    });

    const modal = screen.getByText(/Be careful who you share this token with/i);
    expect(modal).toBeInTheDocument();

    const modal_button = screen.getByRole('button', { name: 'OK' });
    await act(async () => {
      await userEvent.click(modal_button);
    });

    expect(modal).not.toBeInTheDocument();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('testvalue');
  });

  it('opens modal for admin token and closes it with close button', async () => {
    render(<CopyButton value='testvalue' has_admin />);

    const copy_button = screen.getByRole('button');
    await act(async () => {
      await userEvent.click(copy_button);
    });

    const modal = screen.getByText(/Be careful who you share this token with/i);
    expect(modal).toBeInTheDocument();

    // test-id provided by Deriv UI library component
    const modal_button = screen.getByTestId('close-button');
    await act(async () => {
      await userEvent.click(modal_button);
    });

    expect(modal).not.toBeInTheDocument();
  });

  it("opens modal for admin token and closes it with 'Nevermind' button", async () => {
    render(<CopyButton value='testvalue' has_admin />);

    const copy_button = screen.getByRole('button');
    await act(async () => {
      await userEvent.click(copy_button);
    });

    const modal = screen.getByText(/Be careful who you share this token with/i);
    expect(modal).toBeInTheDocument();

    const modal_button = screen.getByRole('button', { name: 'Nevermind' });
    await act(async () => {
      await userEvent.click(modal_button);
    });

    expect(modal).not.toBeInTheDocument();
  });

  it('should show a green check for 2 seconds when copied', async () => {
    const user = userEvent.setup({ delay: null });
    jest.useFakeTimers();

    render(<CopyButton value='testvalue' />);

    const copy_button = screen.getByRole('button');
    await act(async () => {
      await user.click(copy_button);
    });

    expect(copy_button.classList.contains('is_copying')).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(copy_button.classList.contains('is_copying')).toBe(false);
  });
});
