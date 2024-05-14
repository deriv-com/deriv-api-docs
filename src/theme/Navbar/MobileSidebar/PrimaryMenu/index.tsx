import React from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import './primary-menu.scss';

export function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}

export default function CustomMobileSidebar() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems] = splitNavbarItems(items);

  return (
    <React.Fragment>
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
      <div className='navbar__item navbar__link'>Language Switcher Placeholder</div>
    </React.Fragment>
  );
}
