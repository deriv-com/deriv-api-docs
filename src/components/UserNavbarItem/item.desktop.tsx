import React, { useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Button } from '@deriv-com/quill-ui';
import {
  LabelPairedGridLgRegularIcon,
  StandaloneRightFromBracketBoldIcon,
} from '@deriv/quill-icons';
import useLogout from '@site/src/hooks/useLogout';
import useDeviceType from '@site/src/hooks/useDeviceType';

import { IUserNavbarItemProps } from './item.types';
import styles from './UserNavbarItem.module.scss';
import Cookies from 'js-cookie';
import { useHandleLogin } from '@site/src/hooks/useHandleLogin';
import useAuthContext from '@site/src/hooks/useAuthContext';
import CustomTooltip from '../CustomTooltip';
import useTMB from '@site/src/hooks/useTmb';

interface IActionProps {
  handleClick: () => void;
  isDesktop: boolean;
  siteActive: boolean;
}

const siteDownErrMsg = translate({
  message:
    'The server is currently unable to handle the request due to a temporary overload or maintenance of the server. Please try again later.',
});

const DashboardActions: React.FC<IActionProps> = ({ handleClick, isDesktop, siteActive }) => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const onClickDashboard = () => {
    const is_en = currentLocale === 'en';
    const pathInfo = `${!is_en ? `/${currentLocale}` : ''}/dashboard`;
    location.assign(pathInfo);
  };

  const renderDashboardBtn = () => {
    return (
      <React.Fragment>
        <Button
          onClick={onClickDashboard}
          type='button'
          className={styles.dashboardButton}
          variant='tertiary'
          color='black'
          icon={<LabelPairedGridLgRegularIcon />}
          data-testid='da_login'
          disabled={!siteActive}
        >
          <Translate>Dashboard</Translate>
        </Button>
        {isDesktop && (
          <Button
            onClick={handleClick}
            type='button'
            variant='tertiary'
            color='black'
            className={styles.logoutButton}
            icon={<StandaloneRightFromBracketBoldIcon />}
            data-testid='da_logout'
            disabled={!siteActive}
          >
            <Translate>Log out</Translate>
          </Button>
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {siteActive ? (
        renderDashboardBtn()
      ) : (
        <CustomTooltip text={siteDownErrMsg}>
          <span>{renderDashboardBtn()}</span>
        </CustomTooltip>
      )}
    </React.Fragment>
  );
};

const SignedInActions: React.FC<IActionProps> = ({ handleClick, isDesktop, siteActive }) => {
  const signedInButtonClasses = clsx('navbar__item', styles.UserNavbarItem, styles.SignedInButton);

  const { handleLogin } = useHandleLogin({
    onClickLogin: handleClick,
  });

  const renderSignupBtn = () => {
    return (
      <nav className='right-navigation'>
        <Button
          variant='secondary'
          color='black'
          onClick={handleLogin}
          className={signedInButtonClasses}
          data-testid='sa_login'
          disabled={!siteActive}
        >
          <Translate>Log in</Translate>
        </Button>
        {isDesktop && (
          <Button
            variant='primary'
            onClick={() => location.assign('https://deriv.com/signup/')}
            className={signedInButtonClasses}
            data-testid='sa_signup'
            disabled={!siteActive}
          >
            <Translate>Sign up</Translate>
          </Button>
        )}
      </nav>
    );
  };

  return (
    <React.Fragment>
      {siteActive ? (
        renderSignupBtn()
      ) : (
        <CustomTooltip text={siteDownErrMsg}>
          <span>{renderSignupBtn()}</span>
        </CustomTooltip>
      )}
    </React.Fragment>
  );
};

const UserNavbarDesktopItem = ({ authUrl, is_logged_in }: IUserNavbarItemProps) => {
  const { deviceType } = useDeviceType();
  const { is_tmb_enabled_ff } = useAuthContext();
  const { onRenderTMBCheck } = useTMB();
  const isDesktop = deviceType === 'desktop';
  const { siteActive } = useAuthContext();
  const isTMBEnabled = JSON.parse(localStorage.getItem('is_tmb_enabled')) ?? is_tmb_enabled_ff;
  const initRef = useRef(false);

  const initSession = useCallback(async () => {
    // Check both the module-level flag and the ref
    if (initRef.current) return;

    await onRenderTMBCheck();

    initRef.current = true;
  }, [onRenderTMBCheck]);

  useEffect(() => {
    isTMBEnabled && initSession();
  }, [initSession, isTMBEnabled]);

  const handleClick = () => {
    location.assign(authUrl);
  };

  const { handleLogin } = useHandleLogin({
    onClickLogin: handleClick,
  });

  const { logout } = useLogout();

  const loggedState = Cookies.get('logged_state');

  const loginAccountsSessionStorage = JSON.parse(sessionStorage.getItem('login-accounts'));

  const isLoginAccountsPopulated =
    loginAccountsSessionStorage && loginAccountsSessionStorage.length > 0;

  console.log(isTMBEnabled, 'isTMBEnabled');
  React.useEffect(() => {
    if (
      loggedState === 'true' &&
      !isLoginAccountsPopulated &&
      !window.location.pathname.includes('callback') &&
      !window.location.pathname.includes('endpoint') &&
      !isTMBEnabled
    ) {
      handleLogin();
    }
    if (loggedState === 'false' && isLoginAccountsPopulated && !isTMBEnabled) {
      console.log('logout item desktop');
      logout();
    }
  }, [loggedState, logout, handleLogin, isLoginAccountsPopulated, isTMBEnabled]);

  return is_logged_in ? (
    <DashboardActions handleClick={logout} isDesktop={isDesktop} siteActive={siteActive} />
  ) : (
    <SignedInActions handleClick={handleClick} isDesktop={isDesktop} siteActive={siteActive} />
  );
};

export default UserNavbarDesktopItem;
