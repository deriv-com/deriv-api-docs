import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem';
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import classnames from 'classnames';
import './locale-dropdown-navbar-item.scss';

function normalizePath(path) {
  return path.replace(/\/{2,}/g, '/');
}

export default function LocaleDropdownNavbarItem({
  dropdownItemsBefore = [],
  dropdownItemsAfter = [],
  ...props
}: Props): JSX.Element {
  const {
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const { pathname, search, hash } = useLocation();

  const localeItems = locales.map((locale): LinkLikeNavbarItemProps => {
    const baseTo = alternatePageUtils.createUrl({
      locale,
      fullyQualified: false,
    });

    const localePath = normalizePath(`${baseTo}${pathname}`);
    const to = `${localePath}${search}${hash}`;

    return {
      label: localeConfigs[locale].label,
      lang: localeConfigs[locale].htmlLang,
      to,
      target: '_self',
      autoAddBaseUrl: false,
      className: classnames({ 'dropdown__link--active': locale === currentLocale }),
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
  const dropdownLabel = getShortNames(currentLocale);

  return (
    <div className='language_switcher'>
      <DropdownNavbarItem {...props} label={<>{dropdownLabel}</>} items={items} />
    </div>
  );
}
