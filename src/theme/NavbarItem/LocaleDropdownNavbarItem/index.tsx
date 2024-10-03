import React, { useEffect, useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { LabelPairedGlobeLgRegularIcon } from '@deriv/quill-icons';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem';
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import clsx from 'clsx';
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
  const { currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  useEffect(() => {
    const { currentLocale } = replaceLocale(pathname, null, locales, trailingSlash);
    setSelectedLocale(currentLocale);
  }, [pathname, locales, trailingSlash]);

  const localeItems: LinkLikeNavbarItemProps[] = [];
  for (const locale of locales) {
    localeItems.push({
      label: localeConfigs[locale].label,
      lang: localeConfigs[locale].htmlLang,
      target: '_self',
      autoAddBaseUrl: false,
      className: clsx({ 'dropdown__link--active': locale === selectedLocale }),
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

  const localeDropdownLabel = useMemo(() => {
    return (
      <div className='localeItem'>
        <LabelPairedGlobeLgRegularIcon />
        {dropdownLabel}
      </div>
    );
  }, [selectedLocale]);

  return (
    <div className={clsx('language_switcher', 'test')}>
      <DropdownNavbarItem {...props} label={localeDropdownLabel} items={items} />
    </div>
  );
}
