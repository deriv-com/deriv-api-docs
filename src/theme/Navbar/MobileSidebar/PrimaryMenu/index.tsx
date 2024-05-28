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

  const replaceLocaleInPath = (path, newLocale) => {
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

  const localeItems = locales.map((locale) => {
    const newPathname = replaceLocaleInPath(pathname, locale);
    return {
      label: localeConfigs[locale].label,
      lang: locale,
      to: `${newPathname}${search}${hash}`,
      className: classnames({ 'dropdown__link--active': locale === currentLocale }),
      onClick: () => handleLocaleChange(locale),
    };
  });

  const handleLocaleChange = (newLocale) => {
    const newPathname = replaceLocaleInPath(pathname, newLocale);
    window.history.pushState(null, '', newPathname);
  };

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
