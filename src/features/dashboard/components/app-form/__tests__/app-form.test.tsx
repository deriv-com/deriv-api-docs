import useApiToken from '@site/src/hooks/useApiToken';
import { render, screen, cleanup } from '@site/src/test-utils';
import { TTokensArrayType } from '@site/src/types';
import userEvent from '@testing-library/user-event';
import React, { act } from 'react';
import AppForm from '..';
import { ApplicationObject } from '@deriv/api-types';
import useAppManager from '@site/src/hooks/useAppManager';
import { app_name_error_map } from '../../app-register/types';

jest.mock('@site/src/hooks/useApiToken');
jest.mock('@site/src/utils', () => ({
  ...jest.requireActual('@site/src/utils'),
}));
jest.mock('@site/src/hooks/useAppManager');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

mockUseApiToken.mockImplementation(() => ({
  tokens: [],
  updateCurrentToken: jest.fn(),
}));

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;
mockUseAppManager.mockImplementation(() => ({
  apps: [],
  getApps: jest.fn(),
}));

describe('App Form', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<AppForm submit={mockOnSubmit} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should show error message for using an appname that already exists', async () => {
    const fakeApps: ApplicationObject[] = [
      {
        active: 1,
        app_id: 12345,
        app_markup_percentage: 0,
        appstore: '',
        github: '',
        googleplay: '',
        homepage: '',
        name: 'duplicate_app',
        redirect_uri: 'https://example.com',
        scopes: ['read', 'trade', 'trading_information'],
        verification_uri: 'https://example.com',
        last_used: '',
        official: 1,
      },
      {
        active: 1,
        app_id: 12345,
        app_markup_percentage: 0,
        appstore: '',
        github: '',
        googleplay: '',
        homepage: '',
        name: 'testApp',
        redirect_uri: 'https://example.com',
        scopes: ['read', 'trade'],
        verification_uri: 'https://example.com',
        last_used: '',
        official: 1,
      },
    ];
    const mockGetApps = jest.fn();

    mockUseAppManager.mockImplementation(() => ({
      apps: fakeApps,
      getApps: mockGetApps,
    }));

    const submitButton = screen.getByText('Register Application');

    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });

    await act(async () => {
      await userEvent.type(tokenNameInput, 'duplicate_app');
      await userEvent.click(submitButton);
      await userEvent.clear(tokenNameInput);
      await userEvent.type(tokenNameInput, 'duplicate_app');
    });

    const appNameErrorText = await screen.findByText('That name is taken. Choose another.');

    expect(appNameErrorText).toBeInTheDocument();
  });

  it('Should show error message for having no admin token', async () => {
    const fakeTokens: TTokensArrayType = [
      {
        display_name: 'first',
        last_used: '',
        scopes: ['read', 'trade', 'admin'],
        token: 'first_token',
        valid_for_ip: '',
      },
      {
        display_name: 'second',
        last_used: '',
        scopes: ['read', 'trade'],
        token: 'second_token',
        valid_for_ip: '',
      },
    ];

    mockUseApiToken.mockImplementation(() => ({
      tokens: fakeTokens,
      updateCurrentToken: jest.fn(),
    }));

    const errorText = screen.getByText(
      /This account doesn't have API tokens with the admin scope. Choose another account./i,
    );

    expect(errorText).toBeInTheDocument();
  });

  it('Should show error message for empty app name', async () => {
    const submitButton = screen.getByText('Register Application');
    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });

    await act(async () => {
      await userEvent.clear(tokenNameInput);
      await userEvent.click(submitButton);
    });

    const appNameErrorText = await screen.findByText('Enter your app name.');

    expect(appNameErrorText).toBeInTheDocument();
  });

  it('Should show error for long app name', async () => {
    const submitButton = screen.getByText('Register Application');

    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });
    await act(async () => {
      await userEvent.type(
        tokenNameInput,
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi corrupti neque ratione repudiandae in dolores reiciendis sequi',
      );
      await userEvent.click(submitButton);
    });

    const appNameErrorText = await screen.findByText(app_name_error_map.error_code_2);

    expect(appNameErrorText).toBeInTheDocument();
  });

  it('Should show error for using non alphanumeric characters except underscore or space', async () => {
    const submitButton = screen.getByText('Register Application');

    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });

    await act(async () => {
      await userEvent.type(tokenNameInput, 'invalid-token...');
      await userEvent.click(submitButton);
    });

    const appNameErrorText = await screen.findByText(app_name_error_map.error_code_1);

    expect(appNameErrorText).toBeInTheDocument();
  });

  it('Should show error message for long app markup percentage', async () => {
    const submitButton = screen.getByText('Register Application');

    const appMarkupPercentageInput = screen.getByRole<HTMLInputElement>('spinbutton', {
      name: 'Markup percentage (optional)',
    });

    await act(async () => {
      await userEvent.type(appMarkupPercentageInput, '12.222222');
      await userEvent.click(submitButton);
    });

    const appMarkupPercentageError = await screen.findByText(
      'The name can contain up to 48 characters.',
    );

    expect(appMarkupPercentageError).toBeInTheDocument();
  });

  it('Should show error for invalid Auth url', async () => {
    const submitButton = screen.getByText('Register Application');

    const authURLInput = screen.getByRole('textbox', {
      name: 'Redirect URL (optional)',
    });

    await act(async () => {
      await userEvent.type(authURLInput, 'http:invalidAUTHurl.com');
      await userEvent.click(submitButton);
    });

    const authURLInputError = await screen.queryByText(
      'Enter a valid URL. (Example: https://www.[YourDomainName].com)',
    );

    expect(authURLInputError).toBeInTheDocument();
  });

  it('Should show error for invalid Verification url', async () => {
    const submitButton = screen.getByText('Register Application');

    const authURLInput = screen.getByRole('textbox', {
      name: 'Verification URL (optional)',
    });

    await act(async () => {
      await userEvent.type(authURLInput, 'http:invalidVERIurl.com');
      await userEvent.click(submitButton);
    });

    const authURLInputError = await screen.queryByText(
      'Enter a valid URL. (Example: https://www.[YourDomainName].com)',
    );

    expect(authURLInputError).toBeInTheDocument();
  });

  it('Should show error message for wrong value', async () => {
    const fakeTokens: TTokensArrayType = [
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
    ];

    mockUseApiToken.mockImplementation(() => ({
      tokens: fakeTokens,
      updateCurrentToken: jest.fn(),
    }));

    const submitButton = screen.getByText('Register Application');

    const appMarkupPercentageInput = screen.getByRole<HTMLInputElement>('spinbutton', {
      name: 'Markup percentage (optional)',
    });

    await act(async () => {
      await userEvent.type(appMarkupPercentageInput, '5.01');
      await userEvent.click(submitButton);
    });

    const appMarkupPercentageError = await screen.findByText(
      'Your markup value must be no more than 3.00.',
    );

    expect(appMarkupPercentageError).toBeInTheDocument();
  });
  it('Should call onSubmit on submitting the form', async () => {
    const submitButton = screen.getByText('Register Application');

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
      await userEvent.click(selectTokenOption);
    });

    const tokenOption = screen.getByText('second');

    await act(async () => {
      await userEvent.click(tokenOption);
      await userEvent.type(tokenNameInput, 'test app name');
      await userEvent.type(appRedirectUrlInput, 'https://example.com');
      await userEvent.type(appVerificationUrlInput, 'https://example.com');
      await userEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('Should display restrictions when app name is in focus', async () => {
    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });

    await act(async () => {
      await userEvent.type(tokenNameInput, 'Lorem ipsum dolor sit amet');
    });

    const restrictionsList = screen.queryByRole('list');
    expect(restrictionsList).toBeInTheDocument();
  });

  it('Should hide restrictions when error occurs', async () => {
    const tokenNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'App name (required)',
    });

    await act(async () => {
      await userEvent.type(
        tokenNameInput,
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi corrupti neque ratione repudiandae in dolores reiciendis sequi nvrohgoih iuhwr uiwhrug uwhiog iouwhg ouwhg',
      );
    });

    const restrictionsList = screen.queryByRole('list');
    expect(restrictionsList).not.toBeInTheDocument();
  });
});
