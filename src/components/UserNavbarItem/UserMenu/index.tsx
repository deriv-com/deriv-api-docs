import useDeviceType from '@site/src/hooks/useDeviceType';
import { useMemo } from 'react';
import {
  LabelPairedCircleUserLgRegularIcon,
  LabelPairedDerivLgIcon,
  StandaloneRightFromBracketRegularIcon,
  LabelPairedGrid2LgRegularIcon,
} from '@deriv/quill-icons';
import { Button, Text } from '@deriv-com/quill-ui';
import useAuthContext from '@site/src/hooks/useAuthContext';
// @ts-ignore
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import styles from '../UserNavbarItem.module.scss';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import useLogout from '@site/src/hooks/useLogout';
import Routes from '@site/src/utils/routes';

const UserMenu = () => {
  const { deviceType } = useDeviceType();
  const { siteActive, is_logged_in, user, userAccounts } = useAuthContext();
  const { logout } = useLogout();
  const isRealAccountAvailable = userAccounts?.some((account) => account.is_virtual === 0);

  const hasWalletAccount = userAccounts?.some((account) => account.loginid?.includes('VRW'));

  // Custom dropdown content
  const customDropdownContent = () => {
    return (
      <div className={styles.userMenuDropdown}>
        <div className={styles.accountSection}>
          <Text as='h3' size='lg' bold className={styles.accountTitle}>
            {isRealAccountAvailable ? user?.fullname : <Translate>Demo account</Translate>}
          </Text>
          <Text as='p' size='sm' className={styles.accountEmail}>
            {user?.email}
          </Text>
          {!isRealAccountAvailable && (
            <Button
              className={styles.getRealAccountBtn}
              variant='secondary'
              color='black'
              fullWidth
              onClick={() =>
                window.location.assign(
                  Routes.GET_REAL_ACCOUNT + `&target=${user?.upgradeable_landing_companies?.[0]}`,
                )
              }
            >
              <Translate>Get real account</Translate>
            </Button>
          )}
        </div>
        <div className={styles.menuDivider}></div>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}>
            <a
              href={Routes.DERIV_COM}
              className={styles.menuLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className={styles.derivLogo}>
                <LabelPairedDerivLgIcon fill='var(--core-color-solid-coral-700)' />
              </span>
              <Text as='span' size='md'>
                <Translate>Deriv.com</Translate>
              </Text>
            </a>
          </li>
          <li className={styles.menuItem}>
            <a
              href={hasWalletAccount ? Routes.TRADERS_HUB[0].url : Routes.TRADERS_HUB[1].url}
              className={styles.menuLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <LabelPairedGrid2LgRegularIcon />
              <Text as='span' size='md'>
                <Translate>Trader's hub</Translate>
              </Text>
            </a>
          </li>
          <li className={styles.menuItem}>
            <a
              href={Routes.PARTNERS_HUB}
              className={styles.menuLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <LabelPairedGrid2LgRegularIcon />

              <Text as='span' size='md'>
                <Translate>Partner's hub</Translate>
              </Text>
            </a>
          </li>
          <div className={styles.menuDivider}></div>
          <li
            className={styles.menuItem}
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <a href='#' className={clsx(styles.menuLink, styles.menuLinkLogout)}>
              <StandaloneRightFromBracketRegularIcon fill='#000000' iconSize='md' />
              <Text as='span' size='md'>
                <Translate>Log out</Translate>
              </Text>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  const menuItems = [
    {
      label: customDropdownContent(),
      className: styles.customDropdownItem,
    },
  ];

  const userMenuLabel = useMemo(() => {
    return (
      <div className={styles.userMenuItem}>
        <LabelPairedCircleUserLgRegularIcon />
      </div>
    );
  }, []);

  return deviceType === 'desktop' && is_logged_in ? (
    <div className={clsx(styles.userMenu, styles.user_menu_wrapper)}>
      {siteActive && (
        <DropdownNavbarItem
          label={userMenuLabel}
          items={menuItems}
          className={styles.userMenuButton}
        />
      )}
    </div>
  ) : null;
};

export default UserMenu;
