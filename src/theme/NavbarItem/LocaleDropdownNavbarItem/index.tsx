import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import classnames from 'classnames';
import './locale-dropdown-navbar-item.scss';

export default function LocaleDropdownNavbarItem({
  dropdownItemsBefore = [],
  dropdownItemsAfter = [],
  ...props
}) {
  const {
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const { pathname } = useLocation();

  const constructHref = (locale) => {
    if (pathname === '/') {
      return locale === 'en' ? '/' : `/${locale}`;
    } else {
      const firstSlashIndex = pathname.indexOf('/');
      const secondSlashIndex = pathname.indexOf('/', firstSlashIndex + 1);

      if (secondSlashIndex === -1) {
        // Only one slash
        return locale === 'en' ? pathname.substring(firstSlashIndex) : `/${locale}${pathname}`; // Correct for single slash case
      } else {
        const currentLocaleInPath = pathname.substring(1, secondSlashIndex);
        const isValidLocale = locales.includes(currentLocaleInPath);

        if (isValidLocale && locale === 'en') {
          // Switch to 'en' when valid locale exists
          return pathname.substring(secondSlashIndex); // Remove the locale prefix
        } else if (isValidLocale) {
          // Switch between valid locales
          return pathname.replace(`/${currentLocaleInPath}`, `/${locale}`);
        } else if (locale !== 'en') {
          // Add locale prefix if no valid locale and not switching to 'en'
          return `/${locale}${pathname}`;
        } else {
          // Switch to 'en' with no valid locale in path
          return pathname; // Return the original path
        }
      }
    }
  };

  const handleLocaleChange = (newLocale) => {
    const newPathname = constructHref(newLocale);
    window.history.pushState({ path: newPathname }, '', newPathname);
  };

  const localeItems = locales.map((locale) => ({
    label: localeConfigs[locale].label,
    lang: localeConfigs[locale].htmlLang,
    onClick: () => handleLocaleChange(locale),
    className: classnames({ 'dropdown__link--active': locale === currentLocale }),
    href: constructHref(locale),
  }));

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

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];
  const dropdownLabel = getShortNames(currentLocale);

  return (
    <div className='language_switcher'>
      <DropdownNavbarItem {...props} label={<>{dropdownLabel}</>} items={items} />
    </div>
  );
}
