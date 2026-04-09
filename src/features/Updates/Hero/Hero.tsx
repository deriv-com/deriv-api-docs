import React from 'react';
import Translate from '@docusaurus/Translate';
import { Button } from '@deriv-com/quill-ui';
import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.headline}>
          <Translate>The </Translate>
          <span className={styles.coral}>
            <Translate>new Deriv APIs</Translate>
          </span>
          <Translate> are here. Is your app ready?</Translate>
        </h1>
        <p className={styles.subtitle}>
          <Translate>
            Your users are moving to the new Deriv APIs. Now&apos;s the time to move with them.
            Build your new app now to keep your users connected.
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
            <Translate>Go to new Deriv APIs →</Translate>
          </Button>
        </div>
      </div>
    </section>
  );
};
