import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem';
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import classnames from 'classnames';
import './locale-dropdown-navbar-item.scss';

const replaceLocale = (path, newLocale, locales) => {
  const segments = path.split('/').filter(Boolean);
  if (locales.includes(segments[0])) {
    segments.shift();
  }
  if (newLocale && newLocale !== 'en') {
    segments.unshift(newLocale);
  }
  return {
    newPath: '/' + segments.join('/'),
    currentLocale: newLocale || 'en',
  };
};

export default function LocaleDropdownNavbarItem({
  dropdownItemsBefore = [],
  dropdownItemsAfter = [],
  ...props
}: Props): JSX.Element {
  const {
    i18n: { locales, localeConfigs },
  } = useDocusaurusContext();
  const { pathname, search, hash } = useLocation();
  const { newPath, currentLocale } = replaceLocale(pathname, null, locales);
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const { currentLocale } = replaceLocale(pathname, null, locales);
    setSelectedLocale(currentLocale);
    const currentUrl = window.location.href;
    const hasSlash = currentUrl.endsWith('/');
    if (!hasSlash) {
      window.location.href = currentUrl + '/';
    }
  }, [pathname]);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    document.body.style.overflow = 'auto';
  };

  const localeItems = locales.map((locale): LinkLikeNavbarItemProps => {
    const { newPath } = replaceLocale(pathname, locale, locales);
    return {
      label: localeConfigs[locale].label,
      lang: localeConfigs[locale].htmlLang,
      to: `${newPath}${search}${hash}`,
      target: '_self',
      autoAddBaseUrl: false,
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
