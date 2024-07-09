import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@site/src/test-utils';
import { AppRegisterSuccessModal } from '..';
import useAppManager from '@site/src/hooks/useAppManager';
import useDeviceType from '@site/src/hooks/useDeviceType';

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

  it('Should handle click events properly', () => {
    render(<AppRegisterSuccessModal onCancel={mock_cancel} onConfigure={mock_configure} />);

    const configure_btn = screen.getByText(/Configure now/i);
    const maybe_later_btn = screen.getByText(/Maybe later/i);

    userEvent.click(configure_btn);
    expect(mock_configure).toBeCalled();
    expect(mock_cancel).toBeCalled();

    userEvent.click(maybe_later_btn);
    expect(mock_cancel).toBeCalled();
  });
});
