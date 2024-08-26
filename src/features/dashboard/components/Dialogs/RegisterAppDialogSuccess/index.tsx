import React from 'react';
import { Button, Modal } from '@deriv/ui';
import styles from './register-app-dialog-success.module.scss';

interface IRegisterAppDialogSuccessProps {
  onClose: () => void;
}

export const RegisterAppDialogSuccess = ({ onClose }: IRegisterAppDialogSuccessProps) => {
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
