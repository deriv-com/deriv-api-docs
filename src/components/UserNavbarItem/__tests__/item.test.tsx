import React from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useLoginUrl from '@site/src/hooks/useLoginUrl';
import useLogout from '@site/src/hooks/useLogout';
import { cleanup, render, screen } from '@site/src/test-utils';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import UserNavbarItem from '..';

jest.mock('@site/src/hooks/useAuthContext');
jest.mock('@site/src/hooks/useLogout');
jest.mock('@site/src/hooks/useLoginUrl');

const mockLogout = jest.fn();
const mockGetUrl = jest.fn().mockReturnValue('https://www.example.com');

const mockUseLogout = useLogout as jest.MockedFunction<typeof useLogout>;
const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;
const mockUseLoginUrl = useLoginUrl as jest.MockedFunction<typeof useLoginUrl>;

mockUseLogout.mockImplementation(() => {
  return {
    logout: mockLogout,
  };
});

mockUseLoginUrl.mockImplementation(() => {
  return {
    getUrl: mockGetUrl,
  };
});

describe('Given device type is desktop', () => {
  mockUseAuthContext.mockImplementation(() => {
    return {
      is_logged_in: true,
    };
  });

  beforeEach(() => {
    render(<UserNavbarItem mobile={false} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    expect(screen.getByTestId('da_login')).toBeInTheDocument();
  });
});
