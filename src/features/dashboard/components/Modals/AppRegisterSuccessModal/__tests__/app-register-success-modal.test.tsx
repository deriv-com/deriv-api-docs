import React from 'react';
import { cleanup, render, screen } from '@site/src/test-utils';
import { AppRegisterSuccessModal } from '..';
import useAppManager from '@site/src/hooks/useAppManager';

const mock_cancel = jest.fn();
const mock_configure = jest.fn();

jest.mock('@site/src/hooks/useAppManager');
const mockUseAppManager = useAppManager as jest.MockedFunction<
  () => Partial<ReturnType<typeof useAppManager>>
>;
mockUseAppManager.mockImplementation(() => ({
  app_register_modal_open: true,
}));

describe('AppRegisterSuccessModal', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('Should render the success modal in desktop', () => {
    render(
      <AppRegisterSuccessModal
        is_desktop={true}
        onCancel={mock_cancel}
        onConfigure={mock_configure}
      />,
    );

    const label = screen.getByText(/Application registered successfully!/i);
    expect(label).toBeInTheDocument();
    const imgElement = screen.getByAltText('check icon');
    expect(imgElement).toBeInTheDocument();
  });

  it('Should render the success modal in mobile', () => {
    render(
      <AppRegisterSuccessModal
        is_desktop={false}
        onCancel={mock_cancel}
        onConfigure={mock_configure}
      />,
    );

    const label = screen.getByText(/Application registered successfully!/i);
    expect(label).toBeInTheDocument();
    const imgElement = screen.queryByAltText('check icon');
    expect(imgElement).not.toBeInTheDocument();
  });

  it('Should handle click events properly', () => {
    render(
      <AppRegisterSuccessModal
        is_desktop={false}
        onCancel={mock_cancel}
        onConfigure={mock_configure}
      />,
    );
    const configure_btn = screen.getByText(/Configure now/i);
    const maybe_later_btn = screen.getByText(/Maybe later/i);
    configure_btn.click();
    expect(mock_configure).toBeCalled();
    maybe_later_btn.click();
    expect(mock_cancel).toBeCalled();
  });
});
