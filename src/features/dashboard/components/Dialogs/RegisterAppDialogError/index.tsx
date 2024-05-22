import React from 'react';
import { TModalActionButton } from '@deriv/ui/dist/types/src/components/core/modal/types';
import { Modal } from '@deriv/ui';
import { translate } from '@docusaurus/Translate';

export type TError = {
  error?: {
    code: string;
    message: string;
  };
};

type TRegisterAppDialogError = {
  error: TError;
  onClose: () => void;
};

export const RegisterAppDialogError = ({ error, onClose }: TRegisterAppDialogError) => {
  const actionButtons: TModalActionButton[] = [
    {
      id: 1,
      text: 'Got it',
      color: 'secondary',
      onClick: () => {
        onClose();
      },
    },
  ];

  const catchError = () => {
    if (error && error.error?.code === 'InvalidToken') {
      return translate({
        message: 'Enter your API token (with the Admin scope) to register your app.',
      });
    } else if (error) {
      return error.error?.message;
    }
  };

  return (
    <Modal defaultOpen>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.DialogContent
            title='Error!'
            content={catchError()}
            action_buttons={actionButtons}
            has_close_button
          />
        </div>
      </Modal.Portal>
    </Modal>
  );
};
