import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { LinkLikeNavbarItemProps } from '@theme/NavbarItem';
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import classnames from 'classnames';
import './locale-dropdown-navbar-item.scss';
export default function LocaleDropdownNavbarItem({
  dropdownItemsBefore = [],
  dropdownItemsAfter = [],
  ...props
}: Props): JSX.Element {
  const {
    i18n: { locales, localeConfigs },
  } = useDocusaurusContext();
  const { pathname, search, hash } = useLocation();
  const [selectedLocale, setSelectedLocale] = React.useState('en');

  useEffect(() => {
    if (pathname) {
      pathname.split('/').forEach((path) => {
        if (locales.includes(path)) {
          setSelectedLocale(path);
        }
      });
    }
  }, [pathname, selectedLocale]);

  const replaceLocale = (path, newLocale) => {
    const segments = path.split('/');
    if (locales.includes(segments[1])) {
      if (newLocale === 'en') {
        segments.splice(1, 1);
      } else {
        segments[1] = newLocale;
      }
    } else if (newLocale !== 'en') {
      segments.splice(1, 0, newLocale);
    }
    return segments.join('/');
  };

  const localeItems = locales.map((locale): LinkLikeNavbarItemProps => {
    const newPath = replaceLocale(pathname, locale);
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
    <div className='language_switcher'>
      <DropdownNavbarItem {...props} label={<>{dropdownLabel}</>} items={items} />
    </div>
  );
}
