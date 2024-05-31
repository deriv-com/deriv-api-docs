import { ApplicationObject } from '@deriv/api-types';
import useApiToken from '@site/src/hooks/useApiToken';
import useAppManager from '@site/src/hooks/useAppManager';
import { render, screen, cleanup } from '@site/src/test-utils';
import makeMockSocket from '@site/src/__mocks__/socket.mock';
import userEvent from '@testing-library/user-event';
import { WS } from 'jest-websocket-mock';
import React, { act } from 'react';
import UpdateAppDialog from '..';

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

mockUseApiToken.mockImplementation(() => ({
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
      token: 'first_token',
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

const fakeApp: ApplicationObject = {
  active: 1,
  app_id: 12345,
  app_markup_percentage: 0,
  appstore: '',
  github: '',
  googleplay: '',
  homepage: '',
  name: 'testApp',
  redirect_uri: 'https://example.com',
  scopes: ['read', 'trade', 'trading_information'],
  verification_uri: 'https://example.com',
  last_used: '',
  official: 0,
};

describe('Update App Dialog', () => {
  const mockOnClose = jest.fn();

  let wsServer: WS;

  beforeEach(async () => {
    wsServer = await connection.setup();
    await wsServer.connected;
    render(<UpdateAppDialog onClose={mockOnClose} app={fakeApp} />);
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
    const secondaryButton = screen.getByRole('button', { name: /cancel/i });

    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });

  it('Should close the modal on cancel button click', async () => {
    const secondaryButton = screen.getByRole('button', { name: /cancel/i });
    await act(async () => {
      await userEvent.click(secondaryButton);
    });

    expect(mockOnClose).toBeCalled();
  });

  it('Should close the modal on modal close button click', async () => {
    const closeButton = screen.getByTestId('close-button');
    await act(async () => {
      await userEvent.click(closeButton);
    });

    expect(mockOnClose).toBeCalled();
  });

  it('Should update application on submit click', async () => {
    const submitButton = screen.getByText('Update Application');

    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });

    await act(async () => {
      await userEvent.clear(tokenNameInput);
      await userEvent.type(tokenNameInput, 'test app name updated');

      await userEvent.click(submitButton);
    });

    await expect(wsServer).toReceiveMessage({
      app_markup_percentage: 0,
      app_update: 12345,
      name: 'test app name updated',
      redirect_uri: 'https://example.com',
      req_id: 1,
      scopes: ['read', 'trade', 'trading_information'],
      verification_uri: 'https://example.com',
    });

    wsServer.send({
      app_update: {
        app_markup_percentage: 0,
        app_update: 12345,
        name: 'test app name updated',
        redirect_uri: 'https://example.com',
        req_id: 1,
        scopes: ['read', 'trade', 'trading_information'],
        verification_uri: 'https://example.com',
      },
      echo_req: {
        app_markup_percentage: 0,
        app_update: 35565,
        name: 'test app name updated',
        redirect_uri: 'https://example.com',
        req_id: 1,
        scopes: ['read', 'trade', 'trading_information'],
        verification_uri: 'https://example.com',
      },
      msg_type: 'app_update',
      req_id: 1,
    });

    await screen.findByText('Update App');
    expect(mockGetApps).toBeCalled();
    expect(mockOnClose).toBeCalled();
  });

  it('Should render error on error response', async () => {
    const submitButton = screen.getByText('Update Application');

    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });

    await act(async () => {
      await userEvent.clear(tokenNameInput);
      await userEvent.type(tokenNameInput, 'test app wrong name fake');

      await userEvent.click(submitButton);
    });

    await expect(wsServer).toReceiveMessage({
      app_markup_percentage: 0,
      app_update: 12345,
      name: 'test app wrong name fake',
      redirect_uri: 'https://example.com',
      req_id: 1,
      scopes: ['read', 'trade', 'trading_information'],
      verification_uri: 'https://example.com',
    });

    wsServer.send({
      echo_req: {
        app_markup_percentage: 0,
        app_update: 12345,
        name: 'test app wrong name fake',
        redirect_uri: 'https://example.com',
        req_id: 4,
        scopes: ['read', 'trade', 'trading_information'],
        verification_uri: 'https://example.com',
      },
      error: {
        code: 'InputValidationFailed',
        details: {
          name: "String does not match '^[\\w\\s-]{1,48}$'",
        },
        message: 'Input validation failed: name',
      },
      msg_type: 'app_update',
      req_id: 1,
    });

    const errorContent = await screen.findByText('Input validation failed: name');

    expect(errorContent).toBeInTheDocument();
  });
});
