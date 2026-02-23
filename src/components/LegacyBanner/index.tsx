import React from 'react';
import { Button } from '@deriv-com/quill-ui';
import Translate from '@docusaurus/Translate';
import styles from './LegacyBanner.module.scss';

export const LegacyBanner = () => {
  return (
    <div className={styles.banner}>
      <span className={styles.text}>
        <Translate>
          You&apos;re on the Legacy Deriv API. We&apos;ve launched a new and improved version.
        </Translate>
      </span>
      <Button
        color='black'
        variant='secondary'
        size='sm'
        onClick={() => window.open('https://legacy-api.deriv.com', '_blank')}
      >
        <Translate>Go to Deriv API V2</Translate>
      </Button>
    </div>
  );
};
