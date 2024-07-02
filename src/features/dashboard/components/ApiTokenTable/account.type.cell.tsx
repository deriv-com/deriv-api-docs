import React from 'react';
import { getCurrencyObject } from '@site/src/utils';
import styles from './account.module.scss';

const AccountTypeCell = ({
  currency,
  accountType,
  accountNumber,
}: {
  currency: string;
  accountType: string;
  accountNumber: string;
}) => {
  const icon = getCurrencyObject(currency)?.icon || 'defaultIcon';

  console.log(currency, accountType, accountNumber);

  return (
    <div>
      <img data-testid='currency-icon' alt={`${currency}-icon`} src={`/img/usdollar.svg`} />
      <span>
        <div>CR00329</div>
      </span>
    </div>
  );
};

export default AccountTypeCell;
