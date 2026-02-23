import React from 'react';
import Translate from '@docusaurus/Translate';
import { Button } from '@deriv-com/quill-ui';
import styles from './CTAFooter.module.scss';

export const CTAFooter = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>
          <Translate>Ready to explore the new Deriv APIs?</Translate>
        </h2>
        <p className={styles.ctaSubtitle}>
          <Translate>
            Create your account and start building with OAuth 2.0 security and improved
            documentation.
          </Translate>
        </p>
        <Button
          variant='primary'
          color='coral'
          className={styles.ctaButton}
          onClick={() => window.open('https://developer.deriv.com', '_blank')}
        >
          <Translate>Sign up on developer.deriv.com →</Translate>
        </Button>
      </div>
    </section>
  );
};
