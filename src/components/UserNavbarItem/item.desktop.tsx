import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { useState } from 'react';
import AccountSwitcher from '../AccountSwitcher';
import { IUserNavbarItemProps } from './item.types';
import { requestOidcAuthentication } from '@deriv-com/auth-client';
import styles from './UserNavbarItem.module.scss';
import SearchButton from '../SearchButton';
import Translate from '@docusaurus/Translate';

const UserNavbarDesktopItem = ({ authUrl, is_logged_in }: IUserNavbarItemProps) => {
  const [toggle_search, setToggleSearch] = useState<boolean>(false);

  const handleClick = async () => {
    // location.assign(authUrl);
    const app_id = localStorage.getItem('config.app_id');
    const redirect_uri = `${window.location.origin}/dashboard`;
    const post_logout_redirect_uri = `${window.location.origin}/`;

    await requestOidcAuthentication(app_id, redirect_uri, post_logout_redirect_uri);
  };

  const logInButtonClasses = clsx(
    'navbar__item navbar__link',
    styles.UserNavbarItem,
    styles.LogInButton,
  );
  const signUpButtonClasses = clsx(
    'navbar__item navbar__link',
    styles.UserNavbarItem,
    styles.SignUpButton,
  );

  return is_logged_in ? (
    <AccountSwitcher />
  ) : (
    <nav className={`right-navigation ${toggle_search ? 'search-open' : 'search-closed'}`}>
      <button onClick={handleClick} className={logInButtonClasses}>
        <Translate>Log in</Translate>
      </button>
      <Link to={'https://deriv.com/signup/'} className={signUpButtonClasses}>
        <Translate>Sign up</Translate>
      </Link>
      <SearchButton setToggleSearch={setToggleSearch} toggle_search={toggle_search} />
    </nav>
  );
};

export default UserNavbarDesktopItem;
