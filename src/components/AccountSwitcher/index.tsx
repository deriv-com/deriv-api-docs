import React, { useState, useRef } from 'react';
import { InputDropdown } from '@deriv-com/quill-ui';
import { translate } from '@docusaurus/Translate';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { isNotDemoCurrency } from '@site/src/utils';
import useOnClickOutside from '@site/src/hooks/useOnClickOutside';
import useAccountSelector from '@site/src/hooks/useAccountSelector';
import CurrencyIcon from '../CurrencyIcon';
import styles from './account_switcher.module.scss';

interface AccountSwitcherProps {
  onChange?: (accountName?: string) => void;
}

const AccountSwitcher = ({ onChange }: AccountSwitcherProps) => {
  const { onSelectAccount } = useAccountSelector();
  const [isToggleDropdown, setToggleDropdown] = useState(false);
  const { loginAccounts, currentLoginAccount } = useAuthContext();
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setToggleDropdown(false));

  const options = loginAccounts.map((accountItem) => ({
    text: (
      <div
        className={styles.customSelectItem}
        onClick={() => {
          onSelectAccount(accountItem.name);
        }}
      >
        <CurrencyIcon currency={isNotDemoCurrency(accountItem)} />
        <div className={styles.accountInfoContainer}>
          <div className={styles.accountType}>{accountItem.name}</div>
        </div>
      </div>
    ),
    value: accountItem.name,
  }));

  return (
    <div ref={dropdownRef} className={styles.accountSwitcherWrapper}>
      <InputDropdown
        label={translate({ message: 'Account type' })}
        options={options}
        leftIcon={<CurrencyIcon currency={isNotDemoCurrency(currentLoginAccount)} />}
        value={currentLoginAccount.name}
        variant='outline'
        className={`${isToggleDropdown ? styles.active : styles.inactive}`}
        onSelectOption={() => {
          onChange?.(currentLoginAccount.name);
          setToggleDropdown((prev) => !prev);
        }}
      />
    </div>
  );
};

export default AccountSwitcher;
