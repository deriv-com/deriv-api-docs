import React from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import './primary-menu.scss';
import {
  LabelPairedGlobeCaptionRegularIcon,
  StandaloneChevronLeftRegularIcon,
} from '@deriv/quill-icons';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import classnames from 'classnames';

export function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

export default function CustomMobileSidebar() {
  const [languageSidebarVisible, setLanguageSidebarVisible] = React.useState(false);
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems] = splitNavbarItems(items);
  const { pathname, search, hash } = useLocation();
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentLocale = pathSegments[0];

  React.useEffect(() => {
    if (!mobileSidebar?.shown) {
      setLanguageSidebarVisible(false);
    }
  }, [mobileSidebar]);

  const toggleLanguageSidebar = () => {
    setLanguageSidebarVisible(!languageSidebarVisible);
  };

  const {
    i18n: { currentLocale: currentLocaleCtx, locales, localeConfigs },
  } = useDocusaurusContext();

  const constructHref = (locale) => {
    if (pathname === '/') {
      return locale === 'en' ? '/' : `/${locale}`;
    } else {
      const firstSlashIndex = pathname.indexOf('/');
      const secondSlashIndex = pathname.indexOf('/', firstSlashIndex + 1);
      let newPathname = pathname;

      if (secondSlashIndex === -1) {
        newPathname =
          locale === 'en' || pathname === '/en'
            ? pathname.substring(firstSlashIndex)
            : `/${locale}${pathname}`;
      } else {
        const currentLocaleInPath = pathname.substring(1, secondSlashIndex);
        const isValidLocale = locales.includes(currentLocaleInPath);

        if (isValidLocale && locale === 'en') {
          return pathname.substring(secondSlashIndex);
        } else if (isValidLocale) {
          return pathname.replace(`/${currentLocaleInPath}`, `/${locale}`);
        } else if (locale !== 'en') {
          return `/${locale}${pathname}`;
        } else {
          return pathname;
        }
      }

      return newPathname;
    }
  };

  const handleLocaleChange = (newLocale) => {
    const newPathname = constructHref(newLocale);
    window.history.pushState(null, '', newPathname);
  };

  const localeItems = locales.map((locale) => {
    const newPathname = constructHref(locale);

    return {
      label: localeConfigs[locale].label,
      lang: locale,
      to: newPathname,
      className: classnames({ 'dropdown__link--active': locale === currentLocale }),
      onClick: () => handleLocaleChange(locale),
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

  const dropdownLabel = getShortNames(currentLocaleCtx);

  return (
    <React.Fragment>
      <div>
        {leftItems.map((item, i) => (
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
            <NavbarItem
              {...item}
              onClick={() => {
                mobileSidebar.toggle();
              }}
            />
          </ErrorCauseBoundary>
        ))}
      </div>
      <div className='navbar__item navbar__link' onClick={toggleLanguageSidebar}>
        <LabelPairedGlobeCaptionRegularIcon /> {dropdownLabel}
      </div>

      <div className={`language_sidebar ${languageSidebarVisible ? 'visible' : ''}`}>
        <StandaloneChevronLeftRegularIcon iconSize='md' onClick={toggleLanguageSidebar} />

        <div className='language_sidebar__items'>
          {localeItems.map((localeItem) => (
            <a
              key={localeItem.lang}
              href={localeItem.to}
              className={localeItem.className}
              onClick={() => {
                localeItem.onClick();
                mobileSidebar.toggle();
              }}
            >
              {localeItem.label}
            </a>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
