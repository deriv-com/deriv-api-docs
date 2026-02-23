import React from 'react';
import { Button } from '@deriv-com/quill-ui';
import { useHistory } from '@docusaurus/router';
import Translate from '@docusaurus/Translate';
import styles from './LegacyBanner.module.scss';

export const LegacyBanner = () => {
  const history = useHistory();

  return (
    <div className={styles.banner}>
      <span className={styles.text}>
        <Translate>
          You&apos;re on the Legacy Deriv API. We&apos;ve launched a new and improved version.
        </Translate>
      </span>
      <Button color='black' variant='secondary' size='sm' onClick={() => history.push('/updates')}>
        <Translate>{`What's New`}</Translate>
      </Button>
    </div>
  );
};
