import React, { act } from 'react';
import '@testing-library/jest-dom';
import ApiExplorerFeatures from '..';
import userEvent from '@testing-library/user-event';
import useWS from '@site/src/hooks/useWs';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useDynamicImportJSON from '@site/src/hooks/useDynamicImportJSON';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';
import { cleanup, render, screen } from '@testing-library/react';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { IPlaygroundContext } from '@site/src/contexts/playground/playground.context';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';

jest.mock('@site/src/hooks/useScrollTo');

jest.mock('@docusaurus/router', () => ({
  useLocation: () => ({
    pathname: '/api-explorer',
    hash: '',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

jest.mock('@site/src/hooks/usePlaygroundContext');

const mockUsePlaygroundContext = usePlaygroundContext as jest.MockedFunction<
  () => Partial<IPlaygroundContext<TSocketEndpointNames>>
>;

mockUsePlaygroundContext.mockImplementation(() => ({
  setPlaygroundHistory: jest.fn(),
  playground_history: [
    {
      echo_req: { ping: 1, req_id: 1 },
      msg_type: 'ping',
      ping: 'pong',
      req_id: 1,
    },
  ],
}));

jest.mock('@site/src/hooks/useWs');

const mockuseWS = useWS as jest.MockedFunction<() => Partial<ReturnType<typeof useWS>>>;

const mockClear = jest.fn();

mockuseWS.mockImplementation(() => ({
  clear: mockClear,
  send: jest.fn(),
  full_response: {
    tick: 1,
    echo_req: { tick: 1 },
  },
  disableApiNameOnRequest: jest.fn(),
}));

jest.mock('@site/src/hooks/useDynamicImportJSON');

const mockUseDynamicImportJSON = useDynamicImportJSON as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDynamicImportJSON>>
>;

const mockHandleSelectChange = jest.fn();

describe('ApiExplorerFeatures', () => {
  describe('Empty request body', () => {
    beforeEach(() => {
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
        handleTextAreaInput: mockHandleSelectChange,
        handleSelectChange: jest.fn(),
        text_data: {
          name: null,
          selected_value: 'Select API Call - Version 3',
          request: '',
        },
      }));
      mockUseAuthContext.mockImplementation(() => {
        return {
          is_logged_in: false,
          is_authorized: false,
        };
      });
      render(<ApiExplorerFeatures />);
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it('Should disable the buttons when there is no data in the request body', () => {
      const request_button = screen.getByRole('button', { name: /Send request/i });
      const clear_button = screen.getByRole('button', { name: /Clear/i });

      expect(request_button).toBeDisabled();
      expect(clear_button).toBeDisabled();
    });
  });
  describe('Logged out', () => {
    beforeEach(() => {
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
        handleTextAreaInput: mockHandleSelectChange,
        handleSelectChange: jest.fn(),
        text_data: {
          name: null,
          selected_value: 'Select API Call - Version 3',
          request: '{ "echo_req": 1 } ',
        },
      }));
      mockUseAuthContext.mockImplementation(() => {
        return {
          is_logged_in: false,
          is_authorized: false,
        };
      });
      render(<ApiExplorerFeatures />);
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it('should render the title', () => {
      const title = screen.getByText('API Explorer');
      expect(title).toBeInTheDocument();
    });

    it('should be able to select from dropdown', async () => {
      const playground_select = screen.getByText(/select api call/i);
      await act(async () => {
        await userEvent.click(playground_select);
      });

      const select_option = screen.getByText(/active symbols/i);
      await act(async () => {
        await userEvent.click(select_option);
      });

      expect(select_option).not.toBeVisible();
    });

    it('should close the dropdown when clicking outside of it', async () => {
      const playground_select = screen.getByText(/select api call/i);
      await act(async () => {
        await userEvent.click(playground_select);
      });

      const select_option = screen.getByText(/active symbols/i);
      expect(select_option).toBeVisible();

      const page_title = screen.getByText('API Explorer');
      await act(async () => {
        await userEvent.click(page_title);
      });

      expect(select_option).not.toBeVisible();
    });

    it('should render LoginDialog and it can be closed', async () => {
      const playground_select = screen.getByText(/select api call/i);
      await act(async () => {
        await userEvent.click(playground_select);
      });

      const select_option = screen.getByText(/application: get details/i);
      expect(select_option).toBeVisible();

      await act(async () => {
        await userEvent.click(select_option);
      });

      const send_request = screen.getByText(/send request/i);
      await act(async () => {
        await userEvent.click(send_request);
      });

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeVisible();

      const close_button = screen.getByTestId('close-button');

      await act(async () => {
        await userEvent.click(close_button);
      });
      expect(dialog).not.toBeVisible();
    });
    it('should render ValidDialog and it can be closed', async () => {
      const playground_select = screen.getByText(/select api call/i);
      await act(async () => {
        await userEvent.click(playground_select);
      });

      const select_option = screen.getByText(/application: get details/i);
      expect(select_option).toBeVisible();

      await act(async () => {
        await userEvent.click(select_option);
      });

      const send_request = screen.getByText(/send request/i);
      await act(async () => {
        await userEvent.click(send_request);
      });

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeVisible();

      const close_button = screen.getByTestId('close-button');

      await act(async () => {
        await userEvent.click(close_button);
      });
      expect(dialog).not.toBeVisible();
    });
  });

  describe('Logged in', () => {
    beforeEach(() => {
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
        handleTextAreaInput: mockHandleSelectChange,
        handleSelectChange: jest.fn(),
        text_data: {
          name: null,
          selected_value: 'Select API Call - Version 3',
          request: '{ "echo_req": 1 } ',
        },
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it('should render the RequestResponseRenderer and can clear it', async () => {
      mockUseAuthContext.mockImplementation(() => {
        return {
          is_logged_in: true,
          is_authorized: true,
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
          currentLoginAccount: {
            name: 'account1',
            token: 'testtoken1',
            currency: 'USD',
          },
        };
      });

      render(<ApiExplorerFeatures />);

      const playground_select = screen.getByText(/select api call/i);
      await act(async () => {
        await userEvent.click(playground_select);
      });

      const select_option = screen.getByText(/active symbols/i);
      expect(select_option).toBeVisible();

      await act(async () => {
        await userEvent.click(select_option);
      });

      const send_request = await screen.getByTestId('send-request');
      expect(send_request).toBeVisible();
      await act(async () => {
        await userEvent.click(send_request);
      });

      const playground_console = await screen.getByTestId('dt_playground_section');

      expect(playground_console).toBeVisible();

      const clear_request = screen.getByRole('button', { name: /clear/i });
      await act(async () => {
        await userEvent.click(clear_request);
      });

      // Once during the send request and once during the clear request
      expect(mockClear).toHaveBeenCalledTimes(2);
    });
  });

  describe('Disabled send request button', () => {
    beforeEach(() => {
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
        handleTextAreaInput: mockHandleSelectChange,
        handleSelectChange: jest.fn(),
        text_data: {
          name: null,
          selected_value: 'Select API Call - Version 3',
          request: '{ "echo_req": 1 } ',
        },
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it('should not be able to click send request button when unauthorized', async () => {
      mockUseAuthContext.mockImplementation(() => {
        return {
          is_logged_in: true,
          is_authorized: false,
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
          currentLoginAccount: {
            name: 'account1',
            token: 'testtoken1',
            currency: 'USD',
          },
        };
      });

      render(<ApiExplorerFeatures />);

      const playground_select = screen.getByText(/select api call/i);
      await act(async () => {
        await userEvent.click(playground_select);
      });

      const select_option = screen.getByText(/active symbols/i);
      expect(select_option).toBeVisible();

      await act(async () => {
        await userEvent.click(select_option);
      });

      const send_request = screen.getByRole('button', { name: /send request/i });
      expect(send_request).toBeVisible();
      await act(async () => {
        await userEvent.click(send_request);
      });

      expect(mockClear).toHaveBeenCalledTimes(0);
    });
  });
});
