import React, { useCallback } from 'react';
import styles from './no-apps.module.scss';
import { Button, Text } from '@deriv/ui';
import useAppManager from '@site/src/hooks/useAppManager';
import Translate from '@docusaurus/Translate';

const NoApps = () => {
  const { updateCurrentTab } = useAppManager();

  const onRegisterClick = useCallback(() => {
    updateCurrentTab('REGISTER_APP');
  }, [updateCurrentTab]);

  return (
    <div className={styles.noAppsWrapper} data-testid={'no-apps'}>
      <div className={styles.noApps}>
        <div className={styles.noAppsIcon} />
        <div className={styles.noAppsText}>
          <Text as={'p'} type={'paragraph-1'} data-testid={'no-apps-description'}>
            <Translate>
              To see your details reflected, please register your app via the registration form.
            </Translate>
          </Text>
        </div>
        <Button color='secondary' onClick={onRegisterClick}>
          <Translate>Register now</Translate>
        </Button>
      </div>
    </div>
  );
};

export default NoApps;
