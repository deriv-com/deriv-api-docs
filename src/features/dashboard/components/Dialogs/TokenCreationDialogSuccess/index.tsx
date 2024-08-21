import React, { useEffect, useState } from 'react';
import { Modal } from '@deriv-com/quill-ui';
import styles from '../../ApiTokenTable/token-cell.module.scss';
import useApiToken from '@site/src/hooks/useApiToken';
import CopyButton from '../../ApiTokenTable/CopyButton';
import { StandaloneCircleCheckRegularIcon } from '@deriv/quill-icons';
import useAppManager from '@site/src/hooks/useAppManager';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import useDeviceType from '@site/src/hooks/useDeviceType';

type ITokenCreationDialogSuccessProps = {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TokenCreationDialogSuccess = ({
  setToggleModal,
}: ITokenCreationDialogSuccessProps) => {
  const { tokens, lastTokenDisplayName } = useApiToken();
  const [latestToken, setLatestToken] = useState('');
  const { deviceType } = useDeviceType();

  const { updateCurrentTab } = useAppManager();
  const handleToggle = () => {
    setToggleModal(false);
    updateCurrentTab(TDashboardTab.MANAGE_TOKENS);
  };

  useEffect(() => {
    if (tokens.length > 0) {
      tokens.forEach((token) => {
        if (token.display_name.toLowerCase() === lastTokenDisplayName.toLowerCase()) {
          setLatestToken(token.token);
        }
      });
    }
  }, [tokens, lastTokenDisplayName]);

  return (
    <Modal
      isOpened={true}
      showHandleBar
      disableCloseOnOverlay
      // toggleModal={handleToggle}
      isMobile={deviceType !== 'desktop'}
      showPrimaryButton={true}
      showSecondaryButton={false}
      primaryButtonLabel='Ok'
      primaryButtonCallback={handleToggle}
    >
      <div
        className={styles.modal__icon}
        style={{ background: 'var(--core-color-solid-green-100)' }}
      >
        <StandaloneCircleCheckRegularIcon fill='#007A22' iconSize='2xl' />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.title}>Token created successfully!</div>
        <div className={styles.modal}>
          <p>
            Please save this token key. For security reasons, it can&apos;t be viewed or copied
            again. If you lose this key, you&apos;ll need to generate a new token.
          </p>
        </div>
        <div className={styles.textField}>
          <div>
            <div className={styles.key}>Key</div>
            {latestToken}
          </div>
          <div data-testid={'token-cell'} className={styles.token_cell}>
            <CopyButton value={latestToken} has_admin={false} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TokenCreationDialogSuccess;
