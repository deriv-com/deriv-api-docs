import React from 'react';
import { Button } from '@deriv-com/quill-ui';
import { useHistory, useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import styles from './LegacyBanner.module.scss';

export const LegacyBanner = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const is_en = currentLocale === 'en';
  const updates_path = `${!is_en ? `/${currentLocale}` : ''}/updates`;

  if (pathname === updates_path) return null;

  return (
    <div className={styles.banner}>
      <span className={styles.text}>
        <Translate>
          You&apos;re on the Legacy Deriv API. We&apos;ve launched a new and improved version.
        </Translate>
      </span>
      <Button color='black' variant='secondary' size='sm' onClick={() => history.push(updates_path)}>
        <Translate>{`What's New`}</Translate>
      </Button>
    </div>
  );
};
