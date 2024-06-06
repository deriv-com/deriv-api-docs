import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem';
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import classnames from 'classnames';
import './locale-dropdown-navbar-item.scss';

const replaceLocale = (path, newLocale, locales, trailingSlash) => {
  const segments = path.split('/').filter(Boolean);
  console.log('segments', segments);
  const currentLocale = locales.includes(segments[0]) ? segments[0] : 'en';
  console.log('currentLocale', currentLocale);

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
    console.log('newLocale', newLocale);
  }

  let newPath = '/' + segments.join('/');
  if (trailingSlash && !newPath.endsWith('/')) {
    newPath += '/';
    console.log('newPath1', newPath);
  }

  return {
    newPath,
    currentLocale,
  };
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
  const { pathname, search, hash } = useLocation();
  const { newPath, currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const { currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
    setSelectedLocale((new_local) => currentLocale);
  }, [pathname, locales, trailingSlash]);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    document.body.style.overflow = 'auto';
  };

  const localeItems = locales.map((locale): LinkLikeNavbarItemProps => {
    const { newPath } = replaceLocale(pathname, locale, locales, trailingSlash);
    console.log('newPath2', newPath);
    return {
      label: localeConfigs[locale].label,
      lang: localeConfigs[locale].htmlLang,
      to: `${newPath}${search}${hash}`,
      target: '_self',
      autoAddBaseUrl: false,
      className: classnames({ 'dropdown__link--active': locale === selectedLocale }),
      onClick: () => {
        console.log('sdd', `${newPath}${search}${hash}`);
        window.location.replace(`${newPath}${search}${hash}`);
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
