import React from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import './primary-menu.scss';
import { Button } from '@deriv/ui';
import {
  LabelPairedGlobeCaptionRegularIcon,
  StandaloneChevronLeftRegularIcon,
} from '@deriv/quill-icons';

export function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}

export default function CustomMobileSidebar() {
  const [languageSidebarVisible, setLanguageSidebarVisible] = React.useState(false);
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems] = splitNavbarItems(items);

  React.useEffect(() => {
    if (!mobileSidebar?.shown) {
      setLanguageSidebarVisible(false);
    }
  }, [mobileSidebar]);

  const toggleLanguageSidebar = () => {
    setLanguageSidebarVisible(!languageSidebarVisible);
  };

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
        <LabelPairedGlobeCaptionRegularIcon /> EN
      </div>

      {/* Conditionally render the language sidebar */}
      <div className={`language_sidebar ${languageSidebarVisible ? 'visible' : ''}`}>
        <Button onClick={toggleLanguageSidebar} className='language_sidebar__buttons'>
          <StandaloneChevronLeftRegularIcon iconSize='md' />
        </Button>
        <div className='language_sidebar__items'>
          <div>English</div>
          <div>Español</div>
          <div>Français</div>
          <div>Português</div>
        </div>
      </div>
    </React.Fragment>
  );
}
