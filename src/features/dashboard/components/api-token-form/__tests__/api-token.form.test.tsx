import React, { act } from 'react';
import { cleanup, render, screen, waitFor, within } from '@site/src/test-utils';
import userEvent from '@testing-library/user-event';
import ApiTokenForm from '../api-token-form';
import useCreateToken from '../../../hooks/useCreateToken';
import useApiToken from '@site/src/hooks/useApiToken';

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

jest.mock('@site/src/features/dashboard/hooks/useCreateToken');

const mockUseCreateToken = useCreateToken as jest.MockedFunction<typeof useCreateToken>;

const mockCreateToken = jest.fn();

mockUseCreateToken.mockImplementation(() => {
  return {
    createToken: mockCreateToken,
    errorCreatingToken: undefined,
    isCreatingToken: false,
  };
});

const scopes = [
  {
    name: 'read',
    description:
      'This scope will allow third-party apps to view your account activity, settings, limits, balance sheets, trade purchase history, and more.',
    label: 'Read',
  },
  {
    name: 'trade',
    description:
      'This scope will allow third-party apps to buy and sell contracts for you, renew your expired purchases, and top up your demo accounts.',
    label: 'Trade',
  },
  {
    name: 'payments',
    description:
      'This scope will allow third-party apps to withdraw to payment agents and make inter-account transfers for you.',
    label: 'Payments',
  },
  {
    name: 'trading_information',
    description: 'This scope will allow third-party apps to view your trading history.',
    label: 'Trading Information',
  },
  {
    name: 'admin',
    description:
      'This scope will allow third-party apps to open accounts for you, manage your settings and token usage, and more.',
    label: 'Admin',
  },
];

describe('Home Page', () => {
  describe('General tests', () => {
    beforeEach(() => {
      mockUseApiToken.mockImplementation(() => ({
        tokens: [
          {
            display_name: 'testtoken1',
            last_used: '',
            scopes: ['read', 'trade', 'payments', 'admin'],
            token: 'asdf1234',
            valid_for_ip: '',
          },
          {
            display_name: 'testtoken2',
            last_used: '',
            scopes: ['read', 'trade', 'payments', 'admin'],
            token: 'asdf1235',
            valid_for_ip: '',
          },
        ],
        lastTokenDisplayName: '',
      }));

      render(<ApiTokenForm />);
    });

    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    it('Should render first step title', () => {
      const firstStep = screen.getByTestId('first-step-title');
      expect(firstStep).toBeVisible();
    });

    it('should show spinner when in token creation process', () => {
      cleanup();
      mockUseCreateToken.mockImplementation(() => {
        return {
          createToken: mockCreateToken,
          errorCreatingToken: undefined,
          isCreatingToken: true,
        };
      });

      render(<ApiTokenForm />);

      const spinner = screen.getByTestId('dt_spinner');
      expect(spinner).toBeVisible();
    });

    it('Should render all of scopes checkbox cards', () => {
      scopes.forEach((item) => {
        const apiTokenCard = screen.getByTestId(`api-token-card-${item.name}`);
        expect(apiTokenCard).toBeInTheDocument();
      });
    });

    it('Should check the checkbox when clicked on api token card', async () => {
      const adminTokenCard = screen.getByTestId('api-token-card-admin');
      const withinAdminTokenCard = within(adminTokenCard);
      const adminCheckbox = withinAdminTokenCard.getByRole<HTMLInputElement>('checkbox');

      expect(adminCheckbox.checked).toBeFalsy();

      await act(async () => {
        await userEvent.click(adminTokenCard);
      });

      expect(adminCheckbox.checked).toBeTruthy();
    });
    
    it('Should create token on form submit', async () => {
      const nameInput = screen.getByRole('textbox');

      await act(async () => {
        await userEvent.type(nameInput, 'test create token');
      });

      const submitButton = screen.getByRole('button', { name: /Create/i });
      await act(async () => {
        await userEvent.click(submitButton);
      });

      expect(mockCreateToken).toHaveBeenCalledTimes(1);
      expect(mockCreateToken).toHaveBeenCalledWith('test create token', []);
    });

    it('Should not be able to create a token if name already exists', async () => {
      const nameInput = screen.getByRole('textbox');

      await act(async () => {
        await userEvent.type(nameInput, 'testtoken1');
      });

      const error = screen.getByText(/That name is taken. Choose another./i);
      expect(error).toBeVisible;
    });

    it.skip('should hide restrictions if error is present', async () => {
      const nameInput = screen.getByRole('textbox');
      const restrictions = screen.getAllByRole('list');
      expect(restrictions).toBeVisible();
      await act(async () => {
        await userEvent.type(nameInput, 'testtoken1');
      });
      expect(restrictions).not.toBeVisible();
    });

    it('Should not create token when name input is empty', async () => {
      const nameInput = screen.getByRole('textbox');
      await act(async () => {
        await userEvent.clear(nameInput);
        await userEvent.click(nameInput);
      });

      expect(mockCreateToken).not.toHaveBeenCalled();
    });

    it('Should have create button disabled in case of empty input or error message', async () => {
      const submitButton = screen.getByRole('button', { name: /Create/i });
      expect(submitButton).toBeDisabled();

      const nameInput = screen.getByRole('textbox');

      await act(async () => {
        await userEvent.type(nameInput, 'token-text');
      });
      expect(submitButton).toBeDisabled();

      await act(async () => {
        await userEvent.clear(nameInput);
      });
      expect(submitButton).toBeDisabled();
    });
  });
  describe('Token limit', () => {
    const createMaxTokens = () => {
      const token_array = [];
      for (let i = 0; i < 30; i++) {
        token_array.push({
          display_name: `testtoken${i}`,
          last_used: '',
          scopes: ['read', 'trade', 'payments', 'admin'],
          token: 'asdf1234',
          valid_for_ip: '',
        });
      }
      return token_array;
    };

    it('Should show an error when the user tries to create more than 30 tokens', async () => {
      mockUseApiToken.mockImplementation(() => ({ tokens: createMaxTokens(), lastTokenDisplayName: '' }));
      render(<ApiTokenForm />);

      const nameInput = screen.getByRole('textbox');

      await act(async () => {
        await userEvent.type(nameInput, 'example text');
      });

      const error = screen.getByText(/created the maximum number of tokens/i);
      expect(error).toBeVisible();
    });
  });
});
