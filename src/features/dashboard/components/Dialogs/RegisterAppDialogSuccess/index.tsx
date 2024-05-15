import React from 'react';
import { Button, Modal } from '@deriv/ui';
import useAppManager from '@site/src/hooks/useAppManager';
import styles from './register-app-dialog-success.module.scss';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';

interface IRegisterAppDialogSuccessProps {
  onClose: () => void;
}

export const RegisterAppDialogSuccess = ({ onClose }: IRegisterAppDialogSuccessProps) => {
  const { updateCurrentTab } = useAppManager();

  const onSuccessfulClick = () => {
    updateCurrentTab(TDashboardTab.MANAGE_APPS);
    window.open('https://t.me/+g6FV5tFY1u9lZGE1', '_blank');
    onClose();
  };

  return (
    <Modal defaultOpen>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.PageContent has_close_button className={styles.wrapper}>
            <div className={styles.modal}>
              <img src='/img/register_success.svg' />
              <h4 className={styles.title}>Success!</h4>
              <p>You have successfully registered your application.</p>
              <p>You can now start using Deriv API</p>
            </div>
            <div className={styles.buttonWrapper}>
              <Button color='secondary' onClick={onClose} className={styles.btn}>
                Got it
              </Button>
            </div>
          </Modal.PageContent>
        </div>
      </Modal.Portal>
    </Modal>
  );
};
