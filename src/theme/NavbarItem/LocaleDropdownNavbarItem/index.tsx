import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem';
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import classnames from 'classnames';
import './locale-dropdown-navbar-item.scss';

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

export default function LocaleDropdownNavbarItem({
  dropdownItemsBefore = [],
  dropdownItemsAfter = [],
  ...props
}: Props): JSX.Element {
  const {
    i18n: { locales, localeConfigs },
    siteConfig: { trailingSlash },
  } = useDocusaurusContext();
  const { pathname } = useLocation();
  const { newPath, currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const { currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
    setSelectedLocale(currentLocale);
  }, [pathname, locales, trailingSlash]);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    document.body.style.overflow = 'auto';
  };

  const localeItems: LinkLikeNavbarItemProps[] = [];
  for (const locale of locales) {
    localeItems.push({
      label: localeConfigs[locale].label,
      lang: localeConfigs[locale].htmlLang,
      target: '_self',
      autoAddBaseUrl: false,
      className: classnames({ 'dropdown__link--active': locale === selectedLocale }),
      onClick: (e) => {
        e.preventDefault();
        changeLocale(locale, locales, trailingSlash);
      },
    });
  }

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
  const dropdownLabel = getShortNames(selectedLocale);

  return (
    <div
      className={classnames('language_switcher', { 'dropdown-open': isDropdownOpen })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownNavbarItem {...props} label={<>{dropdownLabel}</>} items={items} />
    </div>
  );
}
