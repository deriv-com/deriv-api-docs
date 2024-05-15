import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import MemoizedManageDashboard from '..';
import useAppManager from '@site/src/hooks/useAppManager';
import useDeviceType from '@site/src/hooks/useDeviceType';
import userEvent from '@testing-library/user-event';
import apiManager from '@site/src/configs/websocket';

jest.mock('@site/src/hooks/useAppManager');
const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;
mockUseAppManager.mockImplementation(() => ({
  getApps: jest.fn(),
  apps: undefined,
  tokens: undefined,
  updateCurrentTab: jest.fn(),
}));

jest.mock('@site/src/hooks/useDeviceType');
const mockDeviceType = useDeviceType as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDeviceType>>
>;
mockDeviceType.mockImplementation(() => ({
  deviceType: 'desktop',
}));

jest.mock('@site/src/configs/websocket');
const mockApiManager = apiManager as jest.Mocked<typeof apiManager>;

describe('ManageDashboard', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render the initial compoent with loader', () => {
    const { container } = render(<MemoizedManageDashboard />);
    expect(container).toBeInTheDocument();
    const loader = screen.getByTestId('dt_spinner');
    expect(loader).toBeInTheDocument();
  });

  it('Should render the content App Register page in mobile device - if no token or app is available', () => {
    mockUseAppManager.mockImplementation(() => ({
      apps: [],
      tokens: [],
      getApps: jest.fn(),
      updateCurrentTab: jest.fn(),
    }));
    mockDeviceType.mockImplementation(() => ({
      deviceType: 'mobile',
    }));
    render(<MemoizedManageDashboard />);
    const register_button = screen.getByText(/Register now/i);
    expect(register_button).toBeInTheDocument();
  });

  it('Should call getApps on submit button press if all the fields are filled up', async () => {
    const mockGetApps = jest.fn();
    mockUseAppManager.mockImplementation(() => ({
      apps: [],
      tokens: [],
      getApps: mockGetApps,
      updateCurrentTab: jest.fn(),
    }));
    render(<MemoizedManageDashboard />);

    const name_input = screen.getByRole('textbox');
    await userEvent.type(name_input, 'test create token');
    const tnc_input = screen.getByRole('checkbox');
    await userEvent.click(tnc_input);
    const register_button = screen.getByText(/Register now/i);
    await userEvent.click(register_button);

    expect(mockGetApps).toHaveBeenCalled();
  });

  it('Should trigger the success modal in desktop', async () => {
    const mockModalOpenSetter = jest.fn();
    mockApiManager.augmentedSend.mockResolvedValue({
      app_register: {
        active: 1,
        app_id: 1234,
        app_markup_percentage: 0,
        appstore: '',
        github: '',
        googleplay: '',
        homepage: '',
        name: 'TestApp1',
        redirect_uri: '',
        scopes: [],
        verification_uri: '',
      },
      echo_req: {
        app_markup_percentage: 0,
        app_register: 1,
        name: 'TestApp1',
        req_id: 4,
        scopes: [],
      },
      msg_type: 'app_register',
      req_id: 4,
    });

    mockUseAppManager.mockImplementation(() => ({
      getApps: jest.fn(),
      apps: [],
      tokens: [],
      setAppRegisterModalOpen: mockModalOpenSetter,
      updateCurrentTab: jest.fn(),
    }));

    render(<MemoizedManageDashboard />);

    const name_input = screen.getByRole('textbox');
    await userEvent.type(name_input, 'test create token');
    const tnc_input = screen.getByRole('checkbox');
    await userEvent.click(tnc_input);
    const register_button = screen.getByText(/Register now/i);
    await userEvent.click(register_button);

    expect(mockModalOpenSetter).toBeCalledWith(true);
  });

  it('Should close the modal on config button click', async () => {
    const mockModalOpenSetter = jest.fn();
    mockUseAppManager.mockImplementation(() => ({
      getApps: jest.fn(),
      apps: [],
      tokens: [],
      setAppRegisterModalOpen: mockModalOpenSetter,
      app_register_modal_open: true,
      updateCurrentTab: jest.fn(),
    }));

    render(<MemoizedManageDashboard />);

    const config_button = screen.getByText(/Config/i);
    await userEvent.click(config_button);

    expect(mockModalOpenSetter).toBeCalledWith(false);
  });

  it('Should close the modal on cancel button click', async () => {
    const mockModalOpenSetter = jest.fn();
    mockUseAppManager.mockImplementation(() => ({
      getApps: jest.fn(),
      apps: [],
      tokens: [],
      setAppRegisterModalOpen: mockModalOpenSetter,
      app_register_modal_open: true,
      updateCurrentTab: jest.fn(),
    }));

    render(<MemoizedManageDashboard />);

    const cancel_button = screen.getByText(/Maybe Later/i);
    await userEvent.click(cancel_button);

    expect(mockModalOpenSetter).toBeCalledWith(false);
  });
});
