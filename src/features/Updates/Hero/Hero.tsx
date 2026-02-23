import React from 'react';
import Translate from '@docusaurus/Translate';
import { Button } from '@deriv-com/quill-ui';
import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.headline}>
          <Translate>We bring you </Translate>
          <span className={styles.coral}>
            <Translate>new Deriv APIs</Translate>
          </span>
        </h1>
        <p className={styles.subtitle}>
          <Translate>
            Far more secure, powered by OAuth 2.0, and a streamlined developer experience.
          </Translate>
          <br />
          <Translate>Create a new account on the new Deriv APIs to get started.</Translate>
        </p>
        <div className={styles.ctaRow}>
          <Button
            variant='primary'
            color='coral'
            className={styles.primaryBtn}
            onClick={() => window.open('https://beta-api.deriv.com', '_blank')}
          >
            <Translate>Go to new Deriv APIs →</Translate>
          </Button>
        </div>
      </div>
    </section>
  );
};
