import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { useState } from 'react';
import AccountSwitcher from '../AccountSwitcher';
import { IUserNavbarItemProps } from './item.types';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import styles from './UserNavbarItem.module.scss';
import SearchButton from '../SearchButton';
import Translate from '@docusaurus/Translate';

const UserNavbarDesktopItem = ({ authUrl, is_logged_in }: IUserNavbarItemProps) => {
  const [toggle_search, setToggleSearch] = useState<boolean>(false);
  const serverUrl = localStorage.getItem('config.server_url');

  const handleClick = async () => {
    // location.assign(authUrl);

    const oidc = `https://${serverUrl}/.well-known/openid-configuration`;

    try {
      const response = await fetch(oidc);
      const data = await response.json();

      const endpoints = {
        authorization_endpoint: data.authorization_endpoint,
        token_endpoint: data.token_endpoint,
        userinfo_endpoint: data.userinfo_endpoint,
        end_session_endpoint: data.end_session_endpoint,
      };

      localStorage.setItem('config.oidc_endpoints', JSON.stringify(endpoints));

      const userManager = new UserManager({
        authority: data.issuer,
        client_id: '1011',
        redirect_uri: 'http://localhost:3000/callback',
        response_type: 'code',
        scope: 'openid',
        stateStore: new WebStorageStateStore({ store: window.localStorage }),
        post_logout_redirect_uri: data.end_session_endpoint,
        metadata: {
          issuer: data.issuer,
          authorization_endpoint: data.authorization_endpoint,
          token_endpoint: data.token_endpoint,
          userinfo_endpoint: data.userinfo_endpoint,
          end_session_endpoint: data.end_session_endpoint,
        },
      });

      await userManager.signinRedirect();
    } catch (error) {
      console.log(error);
    }
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
