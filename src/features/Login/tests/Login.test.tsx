import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Login } from '../Login';
import userEvent from '@testing-library/user-event';
import useLoginUrl from '@site/src/hooks/useLoginUrl';

jest.mock('@site/src/hooks/useLoginUrl');
const mockUseLoginUrl = useLoginUrl as jest.MockedFunction<typeof useLoginUrl>;

const mockGetUrl = jest.fn().mockReturnValue('https://www.example.com');

mockUseLoginUrl.mockImplementation(() => {
  return {
    getUrl: mockGetUrl,
  };
});

describe('Login', () => {
  beforeEach(() => {
    render(<Login />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    const login = screen.getByTestId('login');
    expect(login).toBeInTheDocument();
  });
  it('should render title properly', () => {
    const login_text = screen.getByRole('heading', {
      name: /Log in to your Deriv account to get the API token and start using our API./i,
    });
    expect(login_text).toBeInTheDocument();
  });
  it('should render image properly', () => {
    const login_img = screen.getByRole('image');
    expect(login_img).toHaveStyle('background: /img/login.svg');
  });

  it('Should should navigate to example url on login button click', async () => {
    const login_button = screen.getByRole('button', { name: /log in/i });
    await userEvent.click(login_button);

    expect(window.location.assign).toHaveBeenCalledTimes(1);
    expect(window.location.assign).toHaveBeenCalledWith('https://www.example.com');
  });
});
