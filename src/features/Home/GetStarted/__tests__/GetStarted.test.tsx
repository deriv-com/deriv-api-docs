import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { GetStarted } from '../GetStarted';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

jest.mock('@site/src/hooks/useSignUp', () => ({
  __esModule: true,
  default: () => ({
    handleSignUp: jest.fn(),
  }),
}));

describe('GetStarted', () => {
  let handleSignUpMock;

  beforeEach(() => {
    handleSignUpMock = jest.fn();
    jest.spyOn(require('@site/src/hooks/useSignUp'), 'default').mockImplementation(() => ({
      handleSignUp: handleSignUpMock,
    }));
    render(<GetStarted />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    const get_started = screen.getByTestId('started-header');
    expect(get_started).toBeInTheDocument();
  });

  it('should render title properly', () => {
    const started_header = screen.getByRole('heading', { level: 2, name: /Get started with/ });
    expect(started_header).toHaveTextContent('Get started with our API in 3 simple steps:');
  });

  it('should handle sign up button click correctly', async () => {
    const signUpButton = screen.getByTestId('signUp');
    await act(async () => {
      await userEvent.click(signUpButton);
    });

    expect(handleSignUpMock).toHaveBeenCalled();
  });

  it('should navigate to correct links for guide and register', () => {
    expect(screen.getByTestId('register').closest('a')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByTestId('guide').closest('a')).toHaveAttribute(
      'href',
      'https://developers.deriv.com',
    );
  });
});
