import React from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import useOfficialContentsContext from '@site/src/hooks/useOfficialContentsContext';
import styles from './styles.module.css';
function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({ items }) {
  let unofficial_domain_item;
  const { is_official_domain } = useOfficialContentsContext();

  for (const value of Object.values(items)) {
    if (value.label === 'Documentation') {
      unofficial_domain_item = value;
      break;
    }
  }

  return (
    <>
      {is_official_domain ? (
        <React.Fragment>
          {items.map((item, i) => (
            <ErrorCauseBoundary
              key={i}
              onError={(error) =>
                new Error(
                  `A theme navbar item failed to render.
    Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
    ${JSON.stringify(item, null, 2)}`,
                  { cause: error },
                )
              }
            >
              <NavbarItem {...item} />
            </ErrorCauseBoundary>
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ErrorCauseBoundary
            key={unofficial_domain_item?.label}
            onError={(error) =>
              new Error(
                `A theme navbar item failed to render.
      Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
      ${JSON.stringify(unofficial_domain_item, null, 2)}`,
                { cause: error },
              )
            }
          >
            <NavbarItem {...unofficial_domain_item} />
          </ErrorCauseBoundary>
        </React.Fragment>
      )}
    </>
  );
}
function NavbarContentLayout({ left, right }) {
  return (
    <div className='navbar__inner'>
      <div className='navbar__items'>{left}</div>
      <div className='navbar__items navbar__items--right'>{right}</div>
    </div>
  );
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  return (
    <div className='container'>
      <NavbarContentLayout
        left={
          <>
            <NavbarLogo />
            <NavbarItems items={leftItems} />
          </>
        }
        right={
          <>
            <NavbarItems items={rightItems} />
            <NavbarColorModeToggle className={styles.colorModeToggle} />
            {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          </>
        }
      />
    </div>
  );
}
