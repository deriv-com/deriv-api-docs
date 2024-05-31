import React, { act } from 'react';
import userEvent from '@testing-library/user-event';
import ApiTokenTable from '..';
import useApiToken from '@site/src/hooks/useApiToken';
import useDeleteToken from '../../../hooks/useDeleteToken';
import { cleanup, render, screen } from '@site/src/test-utils';
import { TTokensArrayType } from '@site/src/types';

jest.mock('@site/src/hooks/useApiToken');

const mockUseApiToken = useApiToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useApiToken>>
>;

jest.mock('../../../hooks/useDeleteToken');

const mockUseDeleteToken = useDeleteToken as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDeleteToken>>
>;

const mockDeleteToken = jest.fn();

mockUseDeleteToken.mockImplementation(() => ({
  deleteToken: mockDeleteToken,
}));

describe('Api Token Table', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render loading when isLoadingTokens is truthy ', async () => {
    mockUseApiToken.mockImplementationOnce(() => ({
      tokens: [],
      isLoadingTokens: true,
    }));

    render(<ApiTokenTable />);

    const loadingElement = await screen.findByTestId('dt_spinner');
    expect(loadingElement).toBeVisible();
  });
});

describe('DeleteTokenDialog', () => {
  const fakeTokens: TTokensArrayType = [
    {
      display_name: 'This is my first token',
      last_used: '',
      scopes: ['read', 'trade'],
      token: 'first_token',
      valid_for_ip: '',
    },
  ];

  beforeEach(() => {
    mockUseApiToken.mockImplementation(() => ({
      tokens: fakeTokens,
      isLoadingTokens: true,
    }));
    render(<ApiTokenTable />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render table token items', async () => {
    const token_row = await screen.findByText(/This is my first token/i);
    expect(token_row).toBeInTheDocument();
  });

  it('Shows the dialog when pressing the delete button', async () => {
    const delete_button = await screen.findByTestId('dt_delete_button_0');
    expect(delete_button).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(delete_button);
    });

    const delete_modal = await screen.findByText(/Are you sure you want to delete this token?/i);
    expect(delete_modal).toBeInTheDocument();
  });

  it('Should close the dialog when pressing the close button', async () => {
    const delete_button = await screen.findByTestId('dt_delete_button_0');
    expect(delete_button).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(delete_button);
    });

    const delete_modal = await screen.findByText(/Are you sure you want to delete this token?/i);
    expect(delete_modal).toBeInTheDocument();

    // Using test id provided from UI library
    const close_button = await screen.findByTestId('close-button');
    await act(async () => {
      await userEvent.click(close_button);
    });

    expect(delete_modal).not.toBeInTheDocument();
  });

  it("Should close the dialog when pressing the 'No, keep it' button", async () => {
    const delete_button = await screen.findByTestId('dt_delete_button_0');
    expect(delete_button).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(delete_button);
    });

    const delete_modal = await screen.findByText(/Are you sure you want to delete this token?/i);
    expect(delete_modal).toBeInTheDocument();

    const cancel_button = await screen.findByRole('button', { name: 'Cancel' });
    await act(async () => {
      await userEvent.click(cancel_button);
    });

    expect(delete_modal).not.toBeInTheDocument();
  });

  it("Deletes the token and closes the dialog when pressing the 'Yes, delete' button", async () => {
    const delete_button = await screen.findByTestId('dt_delete_button_0');
    expect(delete_button).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(delete_button);
    });

    const delete_modal = await screen.findByText(/Are you sure you want to delete this token?/i);
    expect(delete_modal).toBeInTheDocument();

    const cancel_button = await screen.findByRole('button', { name: 'Yes, delete' });
    await act(async () => {
      await userEvent.click(cancel_button);
    });

    expect(mockDeleteToken).toHaveBeenCalledTimes(1);
    expect(mockDeleteToken).toHaveBeenCalledWith('first_token');

    expect(delete_modal).not.toBeInTheDocument();
  });
});
