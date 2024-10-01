import React from 'react';
import Translate from '@docusaurus/Translate';
import { Button, Modal } from '@deriv/ui';
import styles from './register-app-dialog-success.module.scss';

interface IRegisterAppDialogSuccessProps {
  onClose: () => void;
}

const RegisterAppDialogSuccess = ({ onClose }: IRegisterAppDialogSuccessProps) => {
  return (
    <Modal defaultOpen>
      <Modal.Portal>
        <div className='modal-overlay'>
          <Modal.Overlay />
          <Modal.PageContent has_close_button className={styles.wrapper}>
            <div className={styles.modal}>
              <img src='/img/register_success.svg' />
              <h4 className={styles.title}>
                <Translate>Success!</Translate>
              </h4>
              <p>
                <Translate>You have successfully registered your application.</Translate>
              </p>
              <p>
                <Translate>You can now start using Deriv API</Translate>
              </p>
            </div>
            <div className={styles.buttonWrapper}>
              <Button color='secondary' onClick={onClose} className={styles.btn}>
                <Translate>Got it</Translate>
              </Button>
            </div>
          </Modal.PageContent>
        </div>
      </Modal.Portal>
    </Modal>
  );
};

export default RegisterAppDialogSuccess;
