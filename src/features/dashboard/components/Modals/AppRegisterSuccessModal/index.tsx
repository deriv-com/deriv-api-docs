import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import { Modal } from '@deriv-com/quill-ui';
import { StandaloneCircleCheckRegularIcon } from '@deriv/quill-icons';
import useAppManager from '@site/src/hooks/useAppManager';
import useDeviceType from '@site/src/hooks/useDeviceType';
import useDisableScroll from '../../../hooks/useDisableScroll';
import '../../Dialogs/DeleteAppDialog/delete-app-dialog.scss';

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
      primaryButtonLabel={translate({ message: 'Configure now' })}
      primaryButtonCallback={() => {
        onConfigure();
        onCancel();
      }}
      secondaryButtonLabel={translate({ message: 'Maybe later' })}
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
        <h3 className='modal__header'>
          <Translate>Application registered successfully!</Translate>
        </h3>
        <div className='modal__content' style={{ textAlign: 'left', padding: '0px 0px' }}>
          <span>
            <Translate>Ready to take the next step?</Translate>
            <br></br>
            <Translate>Optimise your app&apos;s capabilities by:</Translate>
            <ul>
              <li>
                <Translate>Creating an API token to use with your application.</Translate>
              </li>
              <li>
                <Translate>Adding OAuth authentication in your app.</Translate>
              </li>
              <li>
                <Translate>Selecting the scopes of OAuth authorisation for your app.</Translate>
              </li>
            </ul>
            <div>
              <Translate>Note: You can make these changes later through the dashboard.</Translate>
            </div>
          </span>
        </div>
      </div>
    </Modal>
  );
};
