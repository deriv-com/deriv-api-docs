import React, { useEffect } from 'react';
import useAppManager from '@site/src/hooks/useAppManager';
import { Heading, Modal } from '@deriv-com/quill-ui';
import useDeviceType from '@site/src/hooks/useDeviceType';
import './app-register-success-modal.scss';

interface IAppRegisterSuccessModalProps {
  onConfigure: () => void;
  onCancel: () => void;
}

export const AppRegisterSuccessModal = ({
  onConfigure,
  onCancel,
}: IAppRegisterSuccessModalProps) => {
  const { app_register_modal_open } = useAppManager();
  const { deviceType } = useDeviceType();

  useEffect(() => {
    if (app_register_modal_open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  return (
    <Modal
      isOpened={app_register_modal_open}
      primaryButtonLabel='Configure now'
      primaryButtonCallback={() => {
        onConfigure();
        onCancel();
      }}
      secondaryButtonLabel='Maybe later'
      secondaryButtonCallback={onCancel}
      isMobile={deviceType !== 'desktop'}
      showHandleBar
      showSecondaryButton
      showPrimaryButton
      disableCloseOnOverlay
    >
      <div className='icon'>
        <img src='img/circle_check_regular_icon.svg' alt='circle green check' />
      </div>
      <div className='modal__text'>
        <h3 className='modal__header'>Application registered successfully!</h3>
        <div className='modal__content'>
          <span>
            Ready to take the next step?
            <br></br>Optimise your app&apos;s capabilities by:
            <ul>
              <li>Creating an API token to use with your application.</li>
              <li>Adding OAuth authentication in your app.</li>
              <li>Selecting the scopes of OAuth authorisation for your app.</li>
            </ul>
            <div>Note: You can make these changes later through the dashboard.</div>
          </span>
        </div>
      </div>
    </Modal>
  );
};
