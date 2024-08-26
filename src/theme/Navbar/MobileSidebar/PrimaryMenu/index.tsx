import React from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { StandaloneRightFromBracketBoldIcon } from '@deriv/quill-icons';
import { Button } from '@deriv-com/quill-ui';
import NavbarItem from '@theme/NavbarItem';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useLogout from '@site/src/hooks/useLogout';
import './primary-menu.scss';

export function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

interface IActionProps {
  mobileSidebar: {
    toggle: () => void;
  };
}

const SidebarBottomAction: React.FC<IActionProps> = ({ mobileSidebar }) => {
  const { is_logged_in } = useAuthContext();
  const { logout } = useLogout();

  return (
    <div className='navbar-sidebar__item__bottomActionBtn'>
      {!is_logged_in ? (
        <Button variant='primary' onClick={() => location.assign('https://deriv.com/signup/')}>
          Sign up
        </Button>
      ) : (
        <Button
          onClick={() => {
            logout();
            mobileSidebar.toggle();
          }}
          type='button'
          className={'logoutButton'}
          variant='tertiary'
          color='black'
          icon={<StandaloneRightFromBracketBoldIcon fill='#000000' iconSize='md' />}
        >
          Log out
        </Button>
      )}
    </div>
  );
};

export default function CustomMobileSidebar() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();

  const [leftItems] = splitNavbarItems(items);

  return (
    <React.Fragment>
      <div>
        {leftItems.map((item, index) => (
          <ErrorCauseBoundary
            key={index}
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
      <SidebarBottomAction mobileSidebar={mobileSidebar} />
    </React.Fragment>
  );
}
