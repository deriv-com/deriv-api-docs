import React from 'react';
import useAppManager from '@site/src/hooks/useAppManager';
import { Heading, Modal, Text } from '@deriv-com/quill-ui';
import { StandaloneCircleCheckRegularIcon } from '@deriv/quill-icons';
import useDeviceType from '@site/src/hooks/useDeviceType';
import '../../Dialogs/DeleteAppDialog/delete-app-dialog.scss';
import useDisableScroll from '../../../hooks/useDisableScroll';
import Translate from '@docusaurus/Translate';

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
      <div className='modal__content'>
        <Heading.H4>
          <Translate>Application registered successfully!</Translate>
        </Heading.H4>
        <Text>
          <Translate>Ready to take the next step?</Translate>
        </Text>
        <Text>
          <Translate>Optimise your app&apos;s capabilities by:</Translate>
        </Text>
        <ul>
          <li>
            <Text>
              <Translate>Creating an API token to use with your application.</Translate>
            </Text>
          </li>
          <li>
            <Text>
              <Translate>Adding OAuth authentication in your app.</Translate>
            </Text>
          </li>
          <li>
            <Text>
              <Translate>Selecting the scopes of OAuth authorisation for your app.</Translate>
            </Text>
          </li>
        </ul>
        <Text>
          <Translate>Note: You can make these changes later through the dashboard.</Translate>
        </Text>
      </div>
    </Modal>
  );
};
