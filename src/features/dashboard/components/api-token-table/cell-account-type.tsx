import React from 'react';
import { translate } from '@docusaurus/Translate';
import { isNotDemoCurrency } from '@site/src/utils';
import CurrencyIcon from '@site/src/components/CurrencyIcon';
import useAuthContext from '@site/src/hooks/useAuthContext';
import styles from './cells.module.scss';

const AccountTypeCell = () => {
  const { currentLoginAccount } = useAuthContext();

  return (
    <div className={styles.Currency}>
      <CurrencyIcon currency={isNotDemoCurrency(currentLoginAccount)} />
      {currentLoginAccount.name && currentLoginAccount.currency
        ? `${currentLoginAccount.name}`
        : translate({ message: 'Accounts' })}
    </div>
  );
};

export default AccountTypeCell;
