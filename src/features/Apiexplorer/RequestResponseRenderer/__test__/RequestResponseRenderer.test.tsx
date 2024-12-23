import React from 'react';
import RequestResponseRenderer from '..';
import useWS from '@site/src/hooks/useWs';
import useAuthContext from '@site/src/hooks/useAuthContext';
import usePlaygroundContext from '@site/src/hooks/usePlaygroundContext';
import { IAuthContext } from '@site/src/contexts/auth/auth.context';
import { render, waitFor } from '@testing-library/react';
import { TSocketEndpointNames } from '@site/src/configs/websocket/types';
import { IPlaygroundContext } from '@site/src/contexts/playground/playground.context';

jest.mock('react', () => {
  return {
    ...jest.requireActual<typeof React>('react'),
    useRef: jest.fn(),
  };
});

jest.mock('@site/src/hooks/useAuthContext');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<() => Partial<IAuthContext>>;

mockUseAuthContext.mockImplementation(() => ({
  is_logged_in: true,
  is_authorized: true,
}));

jest.mock('@site/src/hooks/usePlaygroundContext');

const mockUsePlaygroundContext = usePlaygroundContext as jest.MockedFunction<
  () => Partial<IPlaygroundContext<TSocketEndpointNames>>
>;

const mockSetPlayHistory = jest.fn();

mockUsePlaygroundContext.mockImplementation(() => ({
  setPlaygroundHistory: mockSetPlayHistory,
  playground_history: [],
}));

jest.mock('@site/src/hooks/useWs');

const mockUseWS = useWS as jest.MockedFunction<() => Partial<ReturnType<typeof useWS>>>;

mockUseWS.mockImplementation(() => ({
  full_response: {
    echo_req: { ping: 1, req_id: 1 },
    msg_type: 'ping',
    ping: 'pong',
    req_id: 1,
  },
  disableApiNameOnRequest: jest.fn(),
}));

describe('RequestResponseRenderer', () => {
  it('should call setPlaygroundHistory', async () => {
    render(<RequestResponseRenderer auth={1} reqData='test' name='ping' />);
    await waitFor(() => expect(mockSetPlayHistory).toHaveBeenCalledTimes(1));
  });
});
