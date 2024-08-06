import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useLoginUrl from '@site/src/hooks/useLoginUrl';
import useLogout from '@site/src/hooks/useLogout';
import React, { useEffect, useState } from 'react';
import UserNavbarDesktopItem from './item.desktop';

interface IProps {
  mobile?: boolean;
}

const UserNavbarItem = ({ mobile }: IProps) => {
  const [authUrl, setAuthUrl] = useState<string>('');
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { is_logged_in } = useAuthContext();
  const { logout } = useLogout();
  const { getUrl } = useLoginUrl();

  useEffect(() => {
    const url = getUrl(currentLocale);
    setAuthUrl(url);
  }, [getUrl]);

  return (
    !mobile && (
      <UserNavbarDesktopItem authUrl={authUrl} is_logged_in={is_logged_in} logout={logout} />
    )
  );
};

export default UserNavbarItem;
