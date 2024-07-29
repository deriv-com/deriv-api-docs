import React, { useState, useRef } from 'react';
import { isNotDemoCurrency } from '@site/src/utils';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useOnClickOutside from '@site/src/hooks/useOnClickOutside';
import CurrencyIcon from '../CurrencyIcon';
import AccountDropdown from '../CustomSelectDropdown/account-dropdown/AccountDropdown';
import styles from './account_switcher.module.scss';
import { InputDropdown } from '@deriv-com/quill-ui';

const AccountSwitcher = () => {
  const [isToggleDropdown, setToggleDropdown] = useState(false);
  const { loginAccounts, currentLoginAccount } = useAuthContext();
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setToggleDropdown(false));

  const options = [
    {
      text: <AccountDropdown />,
      value: 'account_dropdown',
    },
  ];

  return (
    <div ref={dropdownRef} className={`right-navigation ${styles.accountSwitcher}`}>
      <InputDropdown
        label='Account type'
        options={options}
        leftIcon={<CurrencyIcon currency={isNotDemoCurrency(currentLoginAccount)} />}
        placeholder={currentLoginAccount.name}
        status='neutral'
        variant='outline'
        className={`${isToggleDropdown ? styles.active : styles.inactive}`}
        onSelectOption={() => setToggleDropdown((prev) => !prev)}
      />
      <div className={`${styles.dropdownMenu} ${isToggleDropdown ? 'active' : ''}`}>
        {loginAccounts.map((account) => (
          <div key={account.name}>
            <AccountDropdown />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSwitcher;
