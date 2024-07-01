import React from 'react';
import styles from './GetStarted.module.scss';
import { Text } from '@deriv/ui';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

export const GetStarted = () => {
  return (
    <article className={`${styles.mainPageRow} ${styles.withPattern}`}>
      <section className={styles.columnContainer}>
        <Text
          className={styles.getStartedHeading}
          type='heading-2'
          bold
          data-testid='started-header'
          role='heading'
          as='h2'
        >
          <Translate>Get started with our API in 3 simple steps:</Translate>
        </Text>
        <nav className={styles.cardContainer}>
          <Link to='/docs/category/guides' className={styles.mainPageCard} data-testid='guide'>
            <img src='/img/guide.svg' className={styles.cardIcon} />
            <section>
              <Text type='subtitle-1' bold className={`${styles.dark} ${styles.header}`} as='h3'>
                <Translate> 1. Learn about our API</Translate>
              </Text>
              <p>
                <Translate>Understand basic concepts and terminologies</Translate>
              </p>
            </section>
            <figure className={styles.arrowIcon}>
              <img src='img/home-arrow.svg' />
            </figure>
          </Link>
          <Link
            target='_blank'
            to='https://deriv.com/signup/'
            rel='noopener noreferrer'
            className={styles.mainPageCard}
            data-testid='signUp'
          >
            <img src='/img/sign-up.svg' className={styles.cardIcon} />
            <section>
              <Text type='subtitle-1' bold className={`${styles.dark} ${styles.header}`} as='h3'>
                <Translate>2. Sign up</Translate>
              </Text>
              <p>
                <Translate>Create a free Deriv account to access our API</Translate>
              </p>
            </section>
            <figure className={styles.arrowIcon}>
              <img src='img/home-arrow.svg' />
            </figure>
          </Link>
          <Link to='/dashboard' className={styles.mainPageCard} data-testid='register'>
            <img src='/img/register-your-app.svg' className={styles.cardIcon} />
            <section>
              <Text type='subtitle-1' bold className={`${styles.dark} ${styles.header}`} as='h3'>
                <Translate>3. Register your app</Translate>
              </Text>
              <p>
                <Translate>Fill out the registration form to start using Deriv API</Translate>
              </p>
            </section>
            <figure className={styles.arrowIcon}>
              <img src='img/home-arrow.svg' />
            </figure>
          </Link>
        </nav>
        <span className={styles.termConditions}>
          <Translate>By using our API, you confirm that you have read and agreed to our</Translate>
          <Link
            to='https://deriv.com/tnc/business-partners-api-user.pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            <Translate>terms and conditions.</Translate>
          </Link>
        </span>
      </section>
    </article>
  );
};
