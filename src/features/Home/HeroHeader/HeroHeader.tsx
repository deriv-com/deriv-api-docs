import React from 'react';
import { Button, Text } from '@deriv/ui';
import styles from './HeroHeader.module.scss';
import Translate from '@docusaurus/Translate';

export const HeroHeader = () => {
  return (
    <header className={styles.HeroImageStyle} data-testid='hero-header'>
      <div className={styles.HeroContainerStyle}>
        <span className={styles.Badge}>
          <Translate>All-new</Translate>
        </span>
        <Text type='hero' as={'h1'} bold className={styles.heading} aria-level={2}>
          <Translate>Build with the new Deriv API</Translate>
        </Text>
        <Text
          type='subtitle-1'
          align='center'
          as={'p'}
          aria-level={7}
          className={styles.SubHeading}
          data-testid='hero-header-subtitle'
        >
          <Translate>
            It&apos;s faster to integrate, comes with OAuth 2.0 authentication, and built around how
            developers actually work. Legacy API remains available as the same old dashboard while
            you migrate to the new Deriv API.
          </Translate>
        </Text>
        <div className={styles.ButtonGroup}>
          <a href='https://developers.deriv.com'>
            <Button type='button' className={styles.HeroButton}>
              <Translate>Explore new API</Translate>
            </Button>
          </a>
          <a href='https://legacy-api.deriv.com/api-explorer'>
            <Button type='button' className={styles.HeroButtonOutline}>
              <Translate>Go to legacy API</Translate>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
