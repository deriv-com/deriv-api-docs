import React, { act } from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import SubscribeRenderer from '..';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useSubscription from '@site/src/hooks/useSubscription';
import useDynamicImportJSON from '@site/src/hooks/useDynamicImportJSON';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { IPlaygroundContext } from '@site/src/contexts/playground/playground.context';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';

jest.mock('@site/src/hooks/useScrollTo');
jest.mock('@docusaurus/router', () => ({
  useLocation: jest.fn(),
}));
jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

mockUseAuthContext.mockImplementation(() => ({
  is_logged_in: true,
  is_authorized: true,
  currentLoginAccount: {
    name: 'someAccount',
    token: 'asdf1234',
    currency: 'USD',
  },
}));

jest.mock('@site/src/hooks/usePlaygroundContext');

const mockUsePlaygroundContext = usePlaygroundContext as jest.MockedFunction<
  () => Partial<IPlaygroundContext<TSocketEndpointNames>>
>;

mockUsePlaygroundContext.mockImplementation(() => ({
  playground_history: [],
  setPlaygroundHistory: jest.fn(),
}));

jest.mock('@site/src/hooks/useDynamicImportJSON');

const mockUseDynamicImportJSON = useDynamicImportJSON as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDynamicImportJSON>>
>;

mockUseDynamicImportJSON.mockImplementation(() => ({
  request_info: {
    auth_required: 1,
    auth_scopes: [],
    description: 'this is a test with `echo_req` description',
    title: 'this is a test title',
  },
  response_info: {
    description: 'this is a test with `echo_req` description',
    title: 'this is a test title',
  },
  setSelected: jest.fn(),
  handleSelectChange: jest.fn(),
  text_data: {
    name: null,
    selected_value: 'Select API Call - Version 3',
    request: '',
  },
}));

jest.mock('@site/src/hooks/useSubscription');

const mockUseSubscription = useSubscription as jest.MockedFunction<
  () => Partial<ReturnType<typeof useSubscription>>
>;

const mockSubscribe = jest.fn();
const mockUnsubscribe = jest.fn();

mockUseSubscription.mockImplementation(() => ({
  subscribe: mockSubscribe,
  unsubscribe: mockUnsubscribe,
  error: { code: '' },
  full_response: {
    tick: 1,
    echo_req: { tick: 1 },
  },
}));

const request_data = `{
  "ticks": "R_50",
  "subscribe": 1
}`;

const false_data = `{
  "tickssss": "R_50",
  "subscribeeeee": 1asdfdsa
}`;

describe('SubscribeRenderer', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render properly', async () => {
    render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    const button = await screen.getByTestId('send-request');
    expect(button).toBeVisible();
  });

  it('should throw an error if incorrect json is being parsed', async () => {
    render(<SubscribeRenderer name='ticks' auth={1} reqData={false_data} />);
    const button = await screen.getByTestId('send-request');
    expect(button).toBeVisible();

    await act(async () => {
      await userEvent.click(button);
    });

    const popup = screen.getByText(/your json object is invalid/i);

    expect(popup).toBeVisible();
  });

  it('should call subscribe and unsubscribe when pressing the send request button', async () => {
    cleanup();
    jest.clearAllMocks();

    mockUseSubscription.mockImplementation(() => ({
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
      error: { code: '' },
      full_response: {
        tick: 1,
        echo_req: { tick: 1 },
      },
      is_subscribed: true,
    }));

    render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    const button = await screen.getByTestId('send-request');
    
    expect(button).toBeVisible();

    await act(async () => {
      await userEvent.click(button);
    });
    expect(mockUnsubscribe).toBeCalledTimes(1);
    expect(mockSubscribe).toBeCalledTimes(1);
    expect(mockSubscribe).toBeCalledWith({ ticks: 'R_50', subscribe: 1 });
  });

  it('should unsubscribe any subscriptions when switching accounts', () => {
    cleanup();
    jest.clearAllMocks();

    mockUseSubscription.mockImplementation(() => ({
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
      error: { code: '' },
      full_response: {
        tick: 1,
        echo_req: { tick: 1 },
      },
      is_subscribed: false,
    }));

    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: true,
      is_authorized: true,
      is_switching_account: true,
      currentLoginAccount: {
        name: 'someAccount',
        token: 'asdf1234',
        currency: 'USD',
      },
    }));

    render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it.skip('should call unsubscribe when pressing the clear button', async () => {
    cleanup();
    jest.clearAllMocks();

    mockUseSubscription.mockImplementation(() => ({
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
      error: { code: '' },
      full_response: {
        tick: 1,
        echo_req: { tick: 1 },
      },
      is_subscribed: true,
    }));

    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: true,
      is_authorized: true,
      is_switching_account: false,
      currentLoginAccount: {
        name: 'someAccount',
        token: 'asdf1234',
        currency: 'USD',
      },
    }));

    render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    const button = await screen.getByTestId('clear-request');
    expect(button).toBeVisible();

    await act(async () => {
      await userEvent.click(button);
    });
    expect(mockUnsubscribe).toBeCalledTimes(1);
  });
  it('should call unsubscribe when unmounting the component', async () => {
    const { unmount } = render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    unmount();
    expect(mockUnsubscribe).toBeCalledTimes(1);
  });
  it('should call login dialog when the error code is not authourized', async () => {
    cleanup();
    jest.clearAllMocks();

    mockUseAuthContext.mockImplementation(() => ({
      is_logged_in: false,
      is_authorized: true,
    }));
    mockUseSubscription.mockImplementation(() => ({
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
      error: { code: 'AuthorizationRequired' },
      full_response: {
        app_list: 1,
        echo_req: { app_list: 1 },
      },
    }));

    render(<SubscribeRenderer name='ticks' auth={1} reqData={request_data} />);
    const login_dialog = await screen.findByText(
      /This API call must be authorised because it requires access to your account information./i,
    );
    await waitFor(() => {
      expect(login_dialog).toBeVisible();
    });
  });
});
