import React from 'react';
import { Badge, Text } from '@deriv/ui';
import styles from './WaysToEarn.module.scss';

const CheckIcon = () => {
  return <img src='/img/checklist-icon-red.svg' className={styles.WaysImg} />;
};

export const WaysToEarn = () => {
  return (
    <article className={styles.WaysContainer} data-testid='ways-to-earn'>
      <section className={styles.WaysWrapper}>
        <header>
          <Text type='heading-2' as={'h2'} align='center' bold className={styles.WaysHeading}>
            Ways to earn with Deriv API
          </Text>
        </header>
        <section>
          <article className={styles.Ways}>
            <Badge
              prefix_icon={<CheckIcon />}
              label='regular'
              size='large'
              spacing='loose'
              visibility='icon-and-label'
            >
              <Text type='paragraph-1' className={styles.Margin}>
                Register your app with Deriv, and add a percentage markup to the contract prices to
                profit from every purchased contract.
              </Text>
            </Badge>
          </article>
          <article className={styles.Ways}>
            <Badge
              prefix_icon={<CheckIcon />}
              label='regular'
              size='large'
              spacing='loose'
              visibility='icon-and-label'
            >
              <Text type='paragraph-1' className={styles.Margin}>
                Sign up as an affiliate, build your app, and get commissions on trades completed via
                your app and the affiliate plan you select.
              </Text>
            </Badge>
          </article>
          <article className={styles.Ways}>
            <Badge
              prefix_icon={<CheckIcon />}
              label='regular'
              size='large'
              spacing='loose'
              visibility='icon-and-label'
            >
              <Text type='paragraph-1' className={styles.Margin}>
                Sign up as a payment agent, build your own custom payment website, and use our API
                to earn commission on every payment you process for Deriv&apos;s clients.
              </Text>
            </Badge>
          </article>
        </section>
      </section>
    </article>
  );
};
