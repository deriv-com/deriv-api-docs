import React from 'react';
import useAccountSelector from '@site/src/hooks/useAccountSelector';
import useAuthContext from '@site/src/hooks/useAuthContext';
import CurrencyIcon from '@site/src/components/CurrencyIcon';
import { getCurrencyObject, isNotDemoCurrency } from '@site/src/utils';
import styles from './account_dropdown.module.scss';

const AccountDropdown = () => {
  const { onSelectAccount } = useAccountSelector();
  const { loginAccounts, currentLoginAccount } = useAuthContext();

  const isNotCurrentAccount = (account_name: string) => {
    return account_name !== currentLoginAccount?.name;
  };

  return (
    <React.Fragment>
      {loginAccounts.map((accountItem) => (
        <React.Fragment key={accountItem.name}>
          {isNotCurrentAccount(accountItem.name) && (
            <div
              tabIndex={0}
              className={styles.customSelectItem}
              role='menuitem'
              onClick={() => onSelectAccount(accountItem.name)}
              onKeyDown={(e) => e.key === 'Enter' && onSelectAccount(accountItem.name)}
            >
              <CurrencyIcon currency={isNotDemoCurrency(accountItem)} />
              <div className={styles.accountInfoContainer}>
                <div className={styles.accountType}>{accountItem.name}</div>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default AccountDropdown;
