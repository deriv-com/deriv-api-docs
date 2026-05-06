import React from 'react';
import { Button, Text } from '@deriv/ui';
import styles from './HeroHeader.module.scss';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const HeroHeader = () => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const updates_path = `${currentLocale !== 'en' ? `/${currentLocale}` : ''}/updates`;

  return (
    <header className={styles.HeroImageStyle} data-testid='hero-header'>
      <div className={styles.HeroContainerStyle}>
        <span className={styles.Badge}>
          <Translate>Legacy API retirement</Translate>
        </span>
        <Text type='hero' as={'h1'} bold className={styles.heading}>
          <Translate>Legacy API is being retired.</Translate>
          <br />
          <Translate>Move to the new Deriv API.</Translate>
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
            We&apos;re retiring the Legacy API and moving users to the new Deriv API. Update your
            apps to keep supporting your clients.
          </Translate>
        </Text>
        <div className={styles.ButtonGroup}>
          <a href='https://developers.deriv.com'>
            <Button type='button' className={styles.HeroButton}>
              <Translate>Go to new Deriv API</Translate>
            </Button>
          </a>
          <a href={updates_path}>
            <Button type='button' className={styles.HeroButtonOutline}>
              <Translate>Read the update</Translate>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
