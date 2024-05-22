import React from 'react';
import { Text } from '@deriv/ui';
import styles from './ApiFeatures.module.scss';
import Translate from '@docusaurus/Translate';

export const ApiFeatures = () => {
  return (
    <article className={styles.FeaturesContainer} data-testid='api-features'>
      <section className={styles.FeatureText}>
        <header>
          <Text type='heading-2' as={'h2'} bold aria-level={1}>
            <Translate>Deriv API features</Translate>
          </Text>
          <Text type='paragraph-1' className={styles.FeatureParagraph} role='definition'>
            <Translate>
              Deriv API gives you full access to all the trading functionalities of DTrader and
              allows you to build your own comprehensive trading systems and analysis tools.
            </Translate>
          </Text>
          <Text type='paragraph-1' className={styles.FeatureParagraph} role={'note'}>
            {"With our API, you'll be able to:"}
          </Text>
        </header>
        <section>
          <ul className={styles.FeatureList}>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>
                <Translate>Trade digital options and multipliers</Translate>
              </div>
            </li>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>
                <Translate>Monitor real-time pricing</Translate>
              </div>
            </li>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>
                <Translate>Buy/sell contracts</Translate>
              </div>
            </li>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>
                <Translate>{"Manage user's accounts"}</Translate>
              </div>
            </li>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>
                <Translate>Monitor existing contracts</Translate>
              </div>
            </li>
            <li className={styles.FeatureOptions}>
              <img src='/img/checklist-icon-grey.svg'></img>
              <div className={styles.FeatureContent}>
                <Translate>{"View user's historical transactions"}</Translate>
              </div>
            </li>
          </ul>
        </section>
      </section>
      <img
        src='/img/api-featutes.png'
        className={styles.ApiFeaturesImage}
        data-testid='api-features-img'
        alt='Using Deriv API to build a trading app with features like real-time pricing charts available on Dtrader.'
      />
    </article>
  );
};
