import React from 'react';
import useAppManager from '@site/src/hooks/useAppManager';
import { Heading, Modal } from '@deriv-com/quill-ui';
import { StandaloneCircleCheckRegularIcon } from '@deriv/quill-icons';
import useDeviceType from '@site/src/hooks/useDeviceType';
import '../../Dialogs/DeleteAppDialog/delete-app-dialog.scss';
import useDisableScroll from '../../../hooks/useDisableScroll';

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

  useDisableScroll(app_register_modal_open);

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
      <div className='modal__icon' style={{ background: 'var(--core-color-solid-green-100)' }}>
        <StandaloneCircleCheckRegularIcon fill='#007A22' iconSize='2xl' />
      </div>
      <div className='modal__text'>
        <h3 className='modal__header'>Application registered successfully!</h3>
        <div className='modal__content' style={{ textAlign: 'left', padding: '0px 0px' }}>
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
