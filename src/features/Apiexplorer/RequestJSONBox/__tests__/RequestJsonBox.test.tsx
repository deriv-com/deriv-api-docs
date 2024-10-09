import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useSubscription from '@site/src/hooks/useSubscription';
import useWS from '@site/src/hooks/useWs';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import userEvent from '@testing-library/user-event';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';
import RequestJSONBox from '..';

jest.mock('@site/src/hooks/useScrollTo');

const fakeHookObject = {
  clear: jest.fn(),
  send: jest.fn(),
  full_response: {
    tick: 1,
    echo_req: { tick: 1 },
  },
};

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

jest.mock('@site/src/hooks/usePlaygroundContext');

const mockUsePlaygroundContext = usePlaygroundContext as jest.MockedFunction<
  () => Partial<ReturnType<typeof usePlaygroundContext>>
>;

mockUsePlaygroundContext.mockImplementation(() => ({
  playground_history: [],
  setPlaygroundHistory: jest.fn(),
}));

jest.mock('@site/src/hooks/useSubscription');

const mockUseSubscription = useSubscription as jest.MockedFunction<
  () => Partial<ReturnType<typeof useSubscription>>
>;

mockUseSubscription.mockImplementation(() => fakeHookObject);

jest.mock('@site/src/hooks/useWs');

const mockuseWS = useWS as jest.MockedFunction<() => Partial<ReturnType<typeof useWS>>>;

mockuseWS.mockImplementation(() => fakeHookObject);

describe('RequestResponseRenderer', () => {
  const mockProps = {
    handleChange: jest.fn(),
    request_example: '{"app_list": 1}',
    name: 'app_list' as TSocketEndpointNames,
    auth: 1,
  };

  beforeEach(() => {
    mockUseAuthContext.mockImplementation(() => {
      return {
        is_logged_in: true,
      };
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render textarea', () => {
    const newProps = {
      handleChange: jest.fn(),
      request_example: '',
      name: '' as TSocketEndpointNames,
      auth: 0,
    };
    cleanup();
    render(<RequestJSONBox {...newProps} />);
    const textarea = screen.getByLabelText('Request JSON');
    expect(textarea).toBeInTheDocument();
  });

  it('should disable text box if no api call is selected in the dropdown', async () => {
    const newProps = {
      handleChange: jest.fn(),
      request_example: 'asdfaewfaewfaewfd',
      name: null as TSocketEndpointNames,
      auth: 0,
    };
    render(<RequestJSONBox {...newProps} />);
    const send = screen.getByRole('button', { name: /send request/i });
    userEvent.click(send);

    const popup = await screen.findByText(/your json object is invalid/i);
    expect(popup).toBeVisible();

    const close_icon = screen.getByAltText(/close-icon/i);
    userEvent.click(close_icon);

    await waitFor(() => expect(popup).not.toBeVisible());
  });

  it('should render response renderer component', async () => {
    render(<RequestJSONBox {...mockProps} />);
    const primaryButton = screen.getByRole('button', { name: /Send Request/i });
    const secondaryButton = screen.getByRole('button', { name: /clear/i });
    userEvent.click(primaryButton);
    const playgroundSection = await screen.findByTestId('dt_playground_section');
    expect(playgroundSection).toBeInTheDocument();
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });
  it('should show  request api json of the call selected from dropdown inside the text area', async () => {
    render(<RequestJSONBox {...mockProps} />);
    const textarea = screen.getByRole('textbox', { name: /Request JSON/i });
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('{"app_list": 1}');
  });
});
