import React, { act } from 'react';
import userEvent from '@testing-library/user-event';
import ApiTokenTable from '..';
import { cleanup, render, screen } from '@site/src/test-utils';
import { TTokensArrayType } from '@site/src/types';
import useApiToken from '@site/src/hooks/useApiToken';
import useDeviceType from '@site/src/hooks/useDeviceType';
import useDeleteToken from '../../../hooks/useDeleteToken';

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

jest.mock('@site/src/hooks/useDeviceType');
const mockDeviceType = useDeviceType as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDeviceType>>
>;
mockDeviceType.mockImplementation(() => ({
  deviceType: 'desktop',
}));

const fakeTokens: TTokensArrayType = [
  {
    display_name: 'This is my first token',
    last_used: '',
    scopes: ['read', 'trade'],
    token: 'first_token',
    valid_for_ip: '',
  },
];

describe('Api Token Table', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render loading when isLoadingTokens is truthy ', async () => {
    mockUseApiToken.mockImplementation(() => ({
      tokens: [] as TTokensArrayType,
      isLoadingTokens: true,
    }));
    render(<ApiTokenTable />);

    const loadingElement = await screen.findByTestId('dt_spinner');
    expect(loadingElement).toBeVisible();
  });

  it('Should render table token items on responsive view', async () => {
    mockUseApiToken.mockImplementation(() => ({
      tokens: fakeTokens,
      isLoadingTokens: false,
    }));
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'mobile',
    }));
    render(<ApiTokenTable />);

    const token_row = await screen.findByText(/This is my first token/i);
    expect(token_row).toBeInTheDocument();
  });
});

describe('DeleteTokenDialog', () => {
  beforeEach(() => {
    mockUseApiToken.mockImplementation(() => ({
      tokens: fakeTokens,
      isLoadingTokens: false,
    }));
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'desktop',
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

  it('Should have the table headers and the header description', async () => {
    const header_text = await screen.findByText(/API token manager/i);
    expect(header_text).toBeInTheDocument();

    const header_descr = await screen.findByText(/Access all your API token details here/i);
    expect(header_descr).toBeInTheDocument();
  });

  it('Shows the dialog when pressing the delete button', async () => {
    const delete_button = await screen.findByTestId('delete-token-button');
    await userEvent.click(delete_button);
    expect(delete_button).toBeInTheDocument();
  });

  it('Should delete the token or cancel and close the modal', async () => {
    const actions_token = await screen.findByTestId('token-action-cell');
    await userEvent.click(actions_token);
    expect(actions_token).toBeInTheDocument();
  });

  it('Should close delete modal', async () => {
    const delete_button = await screen.findByTestId('delete-token-button');
    await act(async () => {
      await userEvent.click(delete_button);
    });

    const dialog_title = screen.getByTestId('dt_overlay');
    expect(dialog_title).toBeInTheDocument();

    const actions_modal = await screen.findByText('Cancel');
    await userEvent.click(actions_modal);

    expect(dialog_title).not.toBeInTheDocument();
  });

  it('Should close delete modal when pressed delete btn', async () => {
    const delete_button = await screen.findByTestId('delete-token-button');
    await act(async () => {
      await userEvent.click(delete_button);
    });

    const dialog_title = screen.getByTestId('dt_overlay');
    expect(dialog_title).toBeInTheDocument();

    const actions_modal = await screen.findByText('Yes, delete');
    await userEvent.click(actions_modal);

    expect(dialog_title).not.toBeInTheDocument();
  });

  it('Should have a create new token button', async () => {
    const new_tokenbutton = await screen.findByTestId('create-new-token-button');
    expect(new_tokenbutton).toBeInTheDocument();

    const new_tokenbutton_text = await screen.findByText(/Create new token/i);
    expect(new_tokenbutton_text).toBeInTheDocument();
  });

  it('Should redirect to create new token', async () => {
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'mobile',
    }));
    const token_row = await screen.findByText(/This is my first token/i);
    const createBtn = await screen.findByTestId('create-new-token-button');
    await act(async () => {
      await userEvent.click(createBtn);
    });
    expect(token_row).not.toBeInTheDocument();
  });
});
