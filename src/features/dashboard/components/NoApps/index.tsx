import React, { useCallback } from 'react';
import styles from './no-apps.module.scss';
import { Button, Text } from '@deriv/ui';
import useAppManager from '@site/src/hooks/useAppManager';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';

const NoApps = () => {
  const { updateCurrentTab } = useAppManager();

  const onRegisterClick = useCallback(() => {
    updateCurrentTab(TDashboardTab.REGISTER_APP);
  }, [updateCurrentTab]);

  return (
    <div className={styles.noAppsWrapper} data-testid={'no-apps'}>
      <div className={styles.noApps}>
        <div className={styles.noAppsIcon} />
        <div className={styles.noAppsText}>
          <Text as={'p'} type={'paragraph-1'} data-testid={'no-apps-description'}>
            To see your details reflected, please register your app via the registration form.
          </Text>
        </div>
        <Button color='secondary' onClick={onRegisterClick}>
          Register now
        </Button>
      </div>
    </div>
  );
};

export default NoApps;
