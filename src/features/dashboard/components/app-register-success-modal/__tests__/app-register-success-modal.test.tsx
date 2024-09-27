import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import AppRegisterSuccessModal from '../app-register-success-modal';
import useAppManager from '@site/src/hooks/useAppManager';
import useDeviceType from '@site/src/hooks/useDeviceType';
import userEvent from '@testing-library/user-event';

const mock_cancel = jest.fn();
const mock_configure = jest.fn();

jest.mock('@site/src/hooks/useAppManager');
jest.mock('@site/src/hooks/useDeviceType');

const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;
mockUseAppManager.mockImplementation(() => ({
  app_register_modal_open: true,
}));

const mockUseDeviceType = useDeviceType as jest.MockedFunction<
  () => Partial<ReturnType<typeof useDeviceType>>
>;
mockUseDeviceType.mockImplementation(() => ({
  deviceType: 'desktop',
}));

describe('AppRegisterSuccessModal', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render the success modal in desktop', () => {
    render(<AppRegisterSuccessModal onCancel={mock_cancel} onConfigure={mock_configure} />);

    const label = screen.getByText(/Application registered successfully!/i);
    expect(label).toBeInTheDocument();
  });

  it('Should render the success modal in mobile', () => {
    mockUseDeviceType.mockImplementationOnce(() => ({
      deviceType: 'mobile',
    }));

    render(<AppRegisterSuccessModal onCancel={mock_cancel} onConfigure={mock_configure} />);

    const label = screen.getByText(/Application registered successfully!/i);
    expect(label).toBeInTheDocument();
  });

  it('Should handle click events properly', async () => {
    render(<AppRegisterSuccessModal onCancel={mock_cancel} onConfigure={mock_configure} />);

    const configure_btn = await screen.findByText(/configure now/i);
    await userEvent.click(configure_btn);
    expect(mock_configure).toHaveBeenCalledTimes(1);
    expect(mock_cancel).toHaveBeenCalledTimes(1);

    const maybe_later_btn = await screen.findByText(/maybe later/i);
    await userEvent.click(maybe_later_btn);
    expect(mock_cancel).toHaveBeenCalledTimes(2);
  });
});
