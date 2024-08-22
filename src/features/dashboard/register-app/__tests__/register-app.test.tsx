import React, { act } from 'react';
import userEvent from '@testing-library/user-event';
import useApiToken from '@site/src/hooks/useApiToken';
import useAppManager from '@site/src/hooks/useAppManager';
import useAuthContext from '@site/src/hooks/useAuthContext';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import AppRegistration from '..';
import { WS } from 'jest-websocket-mock';
import { render, screen, cleanup } from '@site/src/test-utils';

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAuthContext>>
>;

mockUseAuthContext.mockImplementation(() => ({
  updateCurrentLoginAccount: () => jest.fn(),
  currentLoginAccount: {
    name: 'account1',
    token: 'testtoken1',
    currency: 'USD',
  },
  loginAccounts: [
    {
      name: 'account1',
      token: 'testtoken1',
      currency: 'USD',
    },
    {
      name: 'account2',
      token: 'testtoken2',
      currency: 'USD',
    },
  ],
}));

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

mockUseApiToken.mockImplementation(() => ({
  updateCurrentToken: () => jest.fn(),
  tokens: [
    {
      display_name: 'first',
      last_used: '',
      scopes: ['read', 'trade'],
      token: 'first_token',
      valid_for_ip: '',
    },
    {
      display_name: 'second',
      last_used: '2023-01-19 15:09:39',
      scopes: ['read', 'trade', 'payments', 'trading_information', 'admin'],
      token: 'second_token',
      valid_for_ip: '',
    },
    {
      display_name: 'third',
      last_used: '',
      scopes: ['read', 'trade', 'payments', 'admin'],
      token: 'third_token',
      valid_for_ip: '',
    },
  ],
}));

const connection = makeMockSocket();

jest.mock('@site/src/hooks/useAppManager');

const mockGetApps = jest.fn();

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;

mockUseAppManager.mockImplementation(() => ({
  getApps: mockGetApps,
}));

describe('Update App Dialog', () => {
  let wsServer: WS;

  beforeEach(async () => {
    wsServer = await connection.setup();
    await wsServer.connected;
    render(<AppRegistration />);
  });

  afterEach(() => {
    connection.tearDown();
    cleanup();
  });

  it('Should render the form', () => {
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('Should render button properly ', () => {
    const primaryButton = screen.getByRole('submit');

    expect(primaryButton).toBeInTheDocument();
    expect(primaryButton).toHaveTextContent(/register application/i);
  });

  it('Should register application on submit click', async () => {
    const submitButton = screen.getByRole('submit');

    const selectTokenOption = screen.getByTestId('select-token');

    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });

    const appRedirectUrlInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'Redirect URL (optional)',
    });

    const appVerificationUrlInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'Verification URL (optional)',
    });

    const selectAccountOption = screen.getByTestId('select-account');

    await act(async () => {
      await userEvent.click(selectAccountOption);
    });

    const userAccount = screen.getByText('account2');

    await act(async () => {
      await userEvent.click(userAccount);

      await userEvent.click(selectTokenOption);
    });

    const selectToken = screen.getByText('second');

    await act(async () => {
      await userEvent.click(selectToken);

      await userEvent.click(selectTokenOption);
      await userEvent.clear(tokenNameInput);
      await userEvent.type(tokenNameInput, 'test app name updated');
      await userEvent.type(appRedirectUrlInput, 'https://example.com');
      await userEvent.type(appVerificationUrlInput, 'https://example.com');
    });

    await act(async () => {
      await userEvent.click(submitButton);

      await expect(wsServer).toReceiveMessage({
        app_markup_percentage: 0,
        app_register: 1,
        name: 'test app name updated',
        redirect_uri: 'https://example.com',
        req_id: 1,
        scopes: [],
        verification_uri: 'https://example.com',
      });
    });

    await act(async () => {
      wsServer.send({
        app_register: {
          app_markup_percentage: 0,
          app_register: 1,
          name: 'test app name updated',
          redirect_uri: 'https://example.com',
          req_id: 1,
          scopes: [],
          verification_uri: 'https://example.com',
        },
        echo_req: {
          app_markup_percentage: 0,
          app_register: 1,
          name: 'test app name updated',
          redirect_uri: 'https://example.com',
          req_id: 1,
          scopes: [],
          verification_uri: 'https://example.com',
        },
        msg_type: 'app_register',
        req_id: 1,
      });
    });

    expect(screen.getByText('App information')).toBeInTheDocument();
  });

  it('Should render error on error response', async () => {
    const submitButton = screen.getByRole('submit');

    const selectAccountOption = screen.getByTestId('select-account');

    const selectTokenOption = screen.getByTestId('select-token');

    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });
    const appRedirectUrlInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'Redirect URL (optional)',
    });

    const appVerificationUrlInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'Verification URL (optional)',
    });

    await act(async () => {
      await userEvent.click(selectAccountOption);
    });

    const userAccount = screen.getByText('account2');

    await act(async () => {
      await userEvent.click(userAccount);

      await userEvent.click(selectTokenOption);
    });

    const selectToken = screen.getByText('second');

    await act(async () => {
      await userEvent.click(selectToken);

      await userEvent.click(selectTokenOption);
      await userEvent.clear(tokenNameInput);
      await userEvent.type(tokenNameInput, 'test app wrong name fake');
      await userEvent.type(appRedirectUrlInput, 'https://example.com');
      await userEvent.type(appVerificationUrlInput, 'https://example.com');

      await userEvent.click(submitButton);
    });

    await expect(wsServer).toReceiveMessage({
      app_markup_percentage: 0,
      app_register: 1,
      name: 'test app wrong name fake',
      redirect_uri: 'https://example.com',
      req_id: 1,
      scopes: [],
      verification_uri: 'https://example.com',
    });

    wsServer.send({
      echo_req: {
        app_markup_percentage: 0,
        name: 'test app wrong name fake',
        app_register: 1,
        redirect_uri: 'https://example.com',
        req_id: 1,
        scopes: [],
        verification_uri: 'https://example.com',
      },
      error: {
        code: 'InputValidationFailed',
        details: {
          name: "String does not match '^[\\w\\s-]{1,48}$'",
        },
        message: 'Input validation failed: name',
      },
      msg_type: 'app_register',
      req_id: 1,
    });

    const errorContent = await screen.findByText('Input validation failed: name');

    expect(errorContent).toBeInTheDocument();
  });
});
