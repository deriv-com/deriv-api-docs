import React, { useEffect, useState } from 'react';
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

export default function CustomMobileSidebar() {
  const [languageSidebarVisible, setLanguageSidebarVisible] = useState(false);
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems] = splitNavbarItems(items);
  const { pathname } = useLocation();
  const {
    i18n: { locales, localeConfigs },
    siteConfig: { trailingSlash },
  } = useDocusaurusContext();
  const { currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  useEffect(() => {
    const { currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
    setSelectedLocale(currentLocale);
  }, [pathname, locales, trailingSlash]);

  const localeItems = locales.map((locale) => {
    const { newPath } = replaceLocale(pathname, locale, locales, trailingSlash);
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
    </React.Fragment>
  );
}
