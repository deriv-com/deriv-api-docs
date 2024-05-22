import React from 'react';
import { Badge, Text } from '@deriv/ui';
import styles from './WaysToEarn.module.scss';
import Translate from '@docusaurus/Translate';

export const WaysToEarn = () => {
  return (
    <article className={styles.WaysContainer} data-testid='ways-to-earn'>
      <section className={styles.WaysWrapper}>
        <header>
          <Text type='heading-2' as={'h2'} align='center' bold className={styles.WaysHeading}>
            <Translate>Ways to earn with Deriv API</Translate>
          </Text>
        </header>
        <section>
          <article className={styles.Ways}>
            <Badge
              icon_src='/img/checklist-icon-red.svg'
              label='regular'
              size='large'
              spacing='loose'
              visiblity='icon-and-label'
            >
              <Text type='paragraph-1' className={styles.Margin}>
                <Translate>
                  Register your app with Deriv, and add a percentage markup to the contract prices
                  to profit from every purchased contract.
                </Translate>
              </Text>
            </Badge>
          </article>
          <article className={styles.Ways}>
            <Badge
              icon_src='/img/checklist-icon-red.svg'
              label='regular'
              size='large'
              spacing='loose'
              visiblity='icon-and-label'
            >
              <Text type='paragraph-1' className={styles.Margin}>
                <Translate>
                  Sign up as an affiliate, build your app, and get commissions on trades completed
                  via your app and the affiliate plan you select.
                </Translate>
              </Text>
            </Badge>
          </article>
          <article className={styles.Ways}>
            <Badge
              icon_src='/img/checklist-icon-red.svg'
              label='regular'
              size='large'
              spacing='loose'
              visiblity='icon-and-label'
            >
              <Text type='paragraph-1' className={styles.Margin}>
                <Translate>
                  Sign up as a payment agent, build your own custom payment website, and use our API
                  to earn commission on every payment you process for Deriv&apos;s clients.
                </Translate>
              </Text>
            </Badge>
          </article>
        </section>
      </section>
    </article>
  );
};
