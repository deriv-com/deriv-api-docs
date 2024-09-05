import React, { act } from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@site/src/test-utils';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import useAuthContext from '@site/src/hooks/useAuthContext';
import UserNavbarDesktopItem from '../item.desktop';

jest.mock('@site/src/hooks/useAuthContext');
const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

mockUseAuthContext.mockImplementation(() => ({
  is_logged_in: true,
}));

describe('User Navbar Desktop Item', () => {
  describe('Given user is logged out', () => {
    beforeEach(() => {
      render(<UserNavbarDesktopItem is_logged_in={false} authUrl={'https://www.example.com'} />);
    });

    afterEach(() => {
      cleanup();
    });

    it('Should render login link navbar item', async () => {
      const login_nav_button = screen.getByRole('button', { name: /log in/i });
      expect(login_nav_button).toBeVisible();

      await act(async () => {
        await userEvent.click(login_nav_button);
      });

      expect(location.href).toBe('https://www.example.com/');
    });
  });

  describe('Given user is logged in', () => {
    it('Should render logout link navbar item', () => {
      render(<UserNavbarDesktopItem is_logged_in={true} authUrl={'https://www.example.com'} />);
      expect(screen.getByTestId('da_logout')).toBeInTheDocument();
    });
  });

  describe('Search popup', () => {
    beforeEach(() => {
      render(
        <React.Fragment>
          <UserNavbarDesktopItem is_logged_in={false} authUrl={'https://www.example.com'} />
          <input type='text' placeholder='search' className='navbar__search-input' />
        </React.Fragment>,
      );
    });

    afterEach(() => {
      cleanup();
    });

    it('should be able to open search on hotkey command', async () => {
      await act(async () => {
        await userEvent.keyboard('{Meta>}[KeyK]{/Meta}');
      });

      const navigation = screen.getByRole('navigation');
      expect(navigation.classList.contains('search-open'));
    });

    it('should be able to close search on same hotkey command', async () => {
      await act(async () => {
        await userEvent.keyboard('{Meta>}[KeyK]{/Meta}');
      });

      const navigation = screen.getByRole('navigation');
      expect(navigation.classList.contains('search-open'));

      await act(async () => {
        await userEvent.keyboard('{Meta>}[KeyK]{/Meta}');
      });

      expect(navigation.classList.contains('search-closed'));
    });

    it('should be able to close search when pressing the Escape button', async () => {
      await act(async () => {
        await userEvent.keyboard('{Meta>}[KeyK]{/Meta}');
      });

      const navigation = screen.getByRole('navigation');
      expect(navigation.classList.contains('search-open'));

      await act(async () => {
        await userEvent.keyboard('{Escape}');
      });

      expect(navigation.classList.contains('search-closed'));
    });
  });

  describe('Bottom Actions Button', () => {
    const initialProps = {
      is_logged_in: true,
      authUrl: 'https://www.example.com',
    };

    const renderDashboardActions = (props = initialProps) => {
      render(<UserNavbarDesktopItem {...props} />);
    };

    it('should show dashboard button when user is logged in', () => {
      renderDashboardActions();
      const dashboard_button = screen.getByTestId('da_login');
      expect(dashboard_button).toBeInTheDocument();
    });

    it('should show signed In button when user is logged in', () => {
      const updatedProps = {
        ...initialProps,
        is_logged_in: false,
      };
      renderDashboardActions(updatedProps);
      const signedIn_button = screen.getByTestId('sa_login');
      expect(signedIn_button).toBeInTheDocument();
    });

    it('should click on dashboard button', async () => {
      renderDashboardActions();
      const dashboard_button = screen.getByTestId('da_login');
      expect(dashboard_button).toBeInTheDocument();
      await act(async () => {
        await userEvent.click(dashboard_button);
      });
      expect(location.pathname).toBe('/dashboard');
    });

    it('should click on sign up button', async () => {
      const updatedProps = {
        ...initialProps,
        is_logged_in: false,
      };
      renderDashboardActions(updatedProps);
      const signUp_button = screen.getByTestId('sa_signup');
      expect(signUp_button).toBeInTheDocument();
      await act(async () => {
        await userEvent.click(signUp_button);
      });
      expect(location.href).toBe('https://deriv.com/signup/');
    });
  });
});
