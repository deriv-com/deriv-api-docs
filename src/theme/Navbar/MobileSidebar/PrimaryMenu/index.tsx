import React, { useEffect } from 'react';
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
  const segments = path.split('/').filter(Boolean);
  const currentLocale = locales.includes(segments[0]) ? segments[0] : 'en';
  if (newLocale) {
    if (locales.includes(segments[0])) {
      if (newLocale === 'en') {
        segments.shift();
      } else {
        segments[0] = newLocale;
      }
    } else if (newLocale !== 'en') {
      segments.unshift(newLocale);
    }
  }

  let newPath = '/' + segments.join('/');
  if (trailingSlash && !newPath.endsWith('/')) {
    newPath += '/';
  }

  return {
    newPath,
    currentLocale,
  };
};

export default function CustomMobileSidebar() {
  const [languageSidebarVisible, setLanguageSidebarVisible] = React.useState(false);
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems] = splitNavbarItems(items);
  const { pathname, search, hash } = useLocation();
  const {
    i18n: { locales, localeConfigs },
    siteConfig: { trailingSlash },
  } = useDocusaurusContext();
  const { currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
  const [selectedLocale, setSelectedLocale] = React.useState(currentLocale);

  useEffect(() => {
    const { currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
    setSelectedLocale(currentLocale);
  }, [pathname, locales, trailingSlash]);

  const localeItems = locales.map((locale) => {
    const { newPath } = replaceLocale(pathname, locale, locales, trailingSlash);
    return {
      label: localeConfigs[locale].label,
      lang: locale,
      to: `${newPath}${search}${hash}`,
      className: classnames({ 'dropdown__link--active': locale === selectedLocale }),
      onClick: () => {
        window.history.pushState(null, '', `${newPath}${search}${hash}`);
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
