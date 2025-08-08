import React, { useEffect, useState } from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import {
  StandaloneRightFromBracketBoldIcon,
  LabelPairedDerivLgIcon,
  LabelPairedGrid2LgRegularIcon,
  LabelPairedGlobeMdRegularIcon,
  StandaloneChevronLeftRegularIcon,
} from '@deriv/quill-icons';
import { Button, Text } from '@deriv-com/quill-ui';
import NavbarItem from '@theme/NavbarItem';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useLogout from '@site/src/hooks/useLogout';
import useSignUp from '@site/src/hooks/useSignUp';
import './primary-menu.scss';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import classnames from 'classnames';
import Translate from '@docusaurus/Translate';
import Routes from '@site/src/utils/routes';
import { useIsAffiliate } from '@site/src/hooks/useIsAffiliate';

// Utility function to get icons for menu items
const getMenuItemIcons = (item) => {
  let icon = null;

  // Check for class names added in docusaurus.config.js
  if (item.className?.includes('deriv-com-link')) {
    icon = (
      <span className='deriv-logo'>
        <LabelPairedDerivLgIcon fill='var(--core-color-solid-coral-700)' />
      </span>
    );
  } else if (
    item.className?.includes('traders-hub-link') ||
    item.className?.includes('partners-hub-link')
  ) {
    icon = <LabelPairedGrid2LgRegularIcon />;
  }

  return { icon };
};

export function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

const replaceLocale = (path, newLocale, locales, trailingSlash) => {
  let newPath = path;
  let currentLocale = 'en';
  for (const locale of locales) {
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
      currentLocale = locale;
      newPath = path.replace(`/${locale}`, '');
      break;
    }
  }
  if (newLocale && newLocale !== 'en') {
    newPath = `/${newLocale}${newPath}`;
  }
  if (trailingSlash && !newPath.endsWith('/')) {
    newPath += '/';
  }
  return {
    newPath,
    currentLocale,
  };
};

const changeLocale = (newLocale, locales, trailingSlash) => {
  const { pathname } = window.location;
  const { newPath } = replaceLocale(pathname, newLocale, locales, trailingSlash);
  window.location.replace(`${newPath}`);
};

interface IActionProps {
  mobileSidebar: {
    toggle: () => void;
  };
}

const SidebarBottomAction: React.FC<IActionProps> = ({ mobileSidebar }) => {
  const { is_logged_in } = useAuthContext();
  const { handleSignUp } = useSignUp();

  return (
    <div className='navbar-sidebar__item__bottomActionBtn'>
      {!is_logged_in && (
        <Button variant='primary' onClick={handleSignUp}>
          <Translate>Sign up</Translate>
        </Button>
      )}
    </div>
  );
};

export default function CustomMobileSidebar() {
  const [languageSidebarVisible, setLanguageSidebarVisible] = useState(false);
  const mobileSidebar = useNavbarMobileSidebar();
  const { is_authorized } = useAuthContext();
  const items = useNavbarItems();
  const [leftItems] = splitNavbarItems(items);
  const { pathname } = useLocation();

  const { isAffiliate, data, isLoading } = useIsAffiliate();

  useEffect(() => {
    if (is_authorized) {
      isAffiliate();
    }
  }, [isAffiliate, is_authorized]);
  const {
    i18n: { locales, localeConfigs },
    siteConfig: { trailingSlash },
  } = useDocusaurusContext();
  const { currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);
  const { is_logged_in, user, userAccounts } = useAuthContext();
  const { logout } = useLogout();

  const isRealAccountAvailable = userAccounts?.some((account) => account.is_virtual === 0);
  const hasWalletAccount = userAccounts?.some((account) => account.loginid?.includes('VRW'));

  useEffect(() => {
    const { currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
    setSelectedLocale(currentLocale);
  }, [pathname, locales, trailingSlash]);

  const localeItems = locales.map((locale) => {
    return {
      label: localeConfigs[locale].label,
      lang: locale,
      className: classnames({ 'dropdown__link--active': locale === selectedLocale }),
      onClick: (e) => {
        e.preventDefault();
        changeLocale(locale, locales, trailingSlash);
      },
    };
  });

  const getShortNames = (locale) => {
    switch (locale) {
      case 'en':
        return 'EN';
      case 'es':
        return 'ES';
      case 'fr':
        return 'FR';
      case 'pt':
        return 'PT';
      default:
        return 'EN';
    }
  };

  const dropdownLabel = getShortNames(selectedLocale);

  const toggleLanguageSidebar = () => {
    setLanguageSidebarVisible(!languageSidebarVisible);
  };

  return (
    <React.Fragment>
      {is_logged_in && (
        <>
          <div className='mobile-account-section'>
            <Text as='h3' size='lg' bold className='account-title'>
              {isRealAccountAvailable ? user?.fullname : <Translate>Demo account</Translate>}
            </Text>
            <Text as='p' size='sm' className='account-email'>
              {user?.email}
            </Text>
            {!isRealAccountAvailable && (
              <Button
                className='get-real-account-btn'
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
          <div className='menu-divider'></div>
        </>
      )}
      <div>
        {leftItems.map((item, i) => {
          // Skip mobile-only menu items if user is not logged in
          if (!is_logged_in && item.className?.includes('mobile-only-menu-item')) {
            return null;
          }

          const { icon } = getMenuItemIcons(item);

          // Update the URL for Trader's hub based on wallet account
          if (item.className?.includes('traders-hub-link')) {
            item = {
              ...item,
              to: hasWalletAccount ? Routes.TRADERS_HUB[0].url : Routes.TRADERS_HUB[1].url,
            };
          }
          if (item.className?.includes('partners-hub-link')) {
            item = {
              ...item,
              to:
                data?.partner_settings?.length > 0
                  ? Routes.PARTNERS_HUB_LOGIN
                  : Routes.PARTNERS_HUB_SIGNUP,
            };
          }

          return (
            <ErrorCauseBoundary
              key={i}
              onError={(error) =>
                new Error(
                  `A theme navbar item failed to render.
                  Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
                  ${JSON.stringify(item, null, 2)}`,
                )
              }
            >
              <div className='navbar__item navbar__link mobile-menu-link'>
                {icon}
                <NavbarItem
                  {...item}
                  onClick={() => {
                    mobileSidebar.toggle();
                  }}
                />
              </div>
              {is_logged_in &&
                (item.className?.includes('partners-hub-link') ||
                  item.className?.includes('bug-bounty-link')) && (
                  <div className='menu-divider'></div>
                )}
            </ErrorCauseBoundary>
          );
        })}
      </div>
      <div className='navbar__item navbar__link language-selector' onClick={toggleLanguageSidebar}>
        <LabelPairedGlobeMdRegularIcon />
        {dropdownLabel}
      </div>

      <div className={`language_sidebar ${languageSidebarVisible ? 'visible' : ''}`}>
        <StandaloneChevronLeftRegularIcon iconSize='md' onClick={toggleLanguageSidebar} />

        <div className='language_sidebar__items'>
          {localeItems.map((localeItem) => (
            <a
              key={localeItem.lang}
              href='#'
              className={localeItem.className}
              onClick={(e) => {
                e.preventDefault();
                localeItem.onClick(e);
                mobileSidebar.toggle();
              }}
            >
              {localeItem.label}
            </a>
          ))}
        </div>
      </div>

      {is_logged_in && (
        <div className='navbar__item navbar__link mobile-menu-link log-out-link'>
          <StandaloneRightFromBracketBoldIcon fill='#000000' iconSize='md' />
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault();
              logout();
              mobileSidebar.toggle();
            }}
            className='navbar__item navbar__link mobile-menu-link'
          >
            <Translate>Log out</Translate>
          </a>
        </div>
      )}

      <SidebarBottomAction mobileSidebar={mobileSidebar} />
    </React.Fragment>
  );
}
