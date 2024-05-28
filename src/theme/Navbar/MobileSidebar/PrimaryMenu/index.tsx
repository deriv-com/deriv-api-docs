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

export default function CustomMobileSidebar() {
  const [languageSidebarVisible, setLanguageSidebarVisible] = React.useState(false);
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems] = splitNavbarItems(items);
  const { pathname, search, hash } = useLocation();

  const {
    i18n: { currentLocale: currentLocaleCtx, locales, localeConfigs },
  } = useDocusaurusContext();

  const replaceLocale = (path, newLocale) => {
    const segments = path.split('/').filter(Boolean);
    if (locales.includes(segments[0])) {
      if (newLocale === 'en') {
        segments.shift();
      } else {
        segments[0] = newLocale;
      }
    } else if (newLocale !== 'en') {
      segments.unshift(newLocale);
    }
    return '/' + segments.join('/');
  };

  const [selectedLocale, setSelectedLocale] = React.useState('en');

  useEffect(() => {
    if (pathname) {
      pathname.split('/').forEach((path) => {
        if (locales.includes(path)) {
          setSelectedLocale(path);
        }
      });
    }
  }, [pathname]);

  const localeItems = locales.map((locale) => {
    const newPathname = replaceLocale(pathname, locale);
    return {
      label: localeConfigs[locale].label,
      lang: locale,
      to: `${newPathname}${search}${hash}`,
      className: classnames({ 'dropdown__link--active': locale === selectedLocale }),
      onClick: () => {
        window.history.pushState(null, '', `${newPathname}${search}${hash}`);
        setSelectedLocale(locale);
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
