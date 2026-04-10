import React from 'react';
import Translate from '@docusaurus/Translate';
import { Button } from '@deriv-com/quill-ui';
import styles from './CTAFooter.module.scss';

export const CTAFooter = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          <Translate>Get your app ready</Translate>
        </h2>
        <p className={styles.ctaSubtitle}>
          <Translate>
            Create your account on developers.deriv.com and start building your new app today.
          </Translate>
        </p>
        <Button
          size='lg'
          variant='primary'
          className={styles.ctaButton}
          onClick={() => window.open('https://developers.deriv.com', '_blank')}
        >
          <Translate>Go to new Deriv APIs →</Translate>
        </Button>
      </div>
    </section>
  );
};
