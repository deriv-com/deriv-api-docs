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
  const { loginAccounts, userAccounts, currentLoginAccount } = useAuthContext();
  const [accountList, setAccountList] = useState(loginAccounts);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setToggleDropdown(false));

  React.useEffect(() => {
    const isNonCurrencyAccount = loginAccounts.filter((account) => account.currency === '').length > 0;
    if (isNonCurrencyAccount) {
      const updatedAccountList = loginAccounts.map((account) => {
        const userAccount = userAccounts.find((userAccount) => userAccount.loginid === account.name);
        if (userAccount) {
          return { ...account, currency: userAccount.currency };
        }
        return account;
      });
      setAccountList(updatedAccountList);
    }
  }, []);

  const options = accountList.filter((x) => x.currency != '').map((accountItem) => ({
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

