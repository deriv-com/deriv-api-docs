import React from 'react';
import Translate from '@docusaurus/Translate';
import { Button } from '@deriv-com/quill-ui';
import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.headline}>
          <Translate>Important update about the Legacy API</Translate>
        </h1>
        <p className={styles.subtitle}>
          <Translate>
            We&apos;re retiring the Legacy API and moving users to the new Deriv API. Update your
            integration now.
          </Translate>
        </p>
        <div className={styles.ctaRow}>
          <Button
            variant='primary'
            color='coral'
            size='lg'
            className={styles.primaryBtn}
            onClick={() => window.open('https://developers.deriv.com', '_blank')}
          >
            <Translate>Go to new Deriv API →</Translate>
          </Button>
        </div>
      </div>
    </section>
  );
};
