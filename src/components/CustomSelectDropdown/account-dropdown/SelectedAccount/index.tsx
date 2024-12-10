import React from 'react';
import useAuthContext from '@site/src/hooks/useAuthContext';
import CurrencyIcon from '@site/src/components/CurrencyIcon';
import { isNotDemoCurrency, getCurrencyObject } from '@site/src/utils';
import styles from './selected_account.module.scss';

const SelectedAccount = () => {
  const { currentLoginAccount } = useAuthContext();
  return (
    <div className={styles.selectedAccount}>
      <CurrencyIcon currency={isNotDemoCurrency(currentLoginAccount)} />
      <div className={styles.accountInfoContainer}>
        <span className={styles.accountType}>
          {getCurrencyObject(isNotDemoCurrency(currentLoginAccount)).name}
        </span>
        <span className={styles.accountId}>{currentLoginAccount?.name}</span>
      </div>
    </div>
  );
};

export default SelectedAccount;
