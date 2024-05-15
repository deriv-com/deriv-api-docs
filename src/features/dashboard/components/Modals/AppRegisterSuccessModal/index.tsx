import React from 'react';
import useAppManager from '@site/src/hooks/useAppManager';
import SwipeableBottomSheet from '@site/src/components/SwipeableBottomSheet';
import { Heading } from '@deriv/quill-design';
import './app-register-success-modal.scss';

interface IAppRegisterSuccessModalProps {
  onConfigure: () => void;
  onCancel: () => void;
  is_desktop: boolean;
}

export const AppRegisterSuccessModal = ({
  onConfigure,
  onCancel,
  is_desktop,
}: IAppRegisterSuccessModalProps) => {
  const { app_register_modal_open } = useAppManager();

  return (
    <div className='app_register_success_modal'>
      <SwipeableBottomSheet
        action_sheet_open={app_register_modal_open}
        primary_action={{
          label: 'Configure now',
          onClick: onConfigure,
        }}
        secondary_action={{
          label: 'Maybe later',
          onClick: onCancel,
        }}
        is_desktop={is_desktop}
        disable_drag
        on_close={onCancel}
      >
        <div>
          {is_desktop && (
            <div className='app_register_success_modal__icon'>
              <img src='/img/circle_check_regular_icon.svg' alt='check icon' />
            </div>
          )}
          <Heading.H3 className='app_register_success_modal__header'>
            Application registered successfully!
          </Heading.H3>
          <div className='app_register_success_modal__content'>
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
      </SwipeableBottomSheet>
    </div>
  );
};
