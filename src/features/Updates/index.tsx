import React from 'react';
import { Hero } from './Hero/Hero';
import { ImportantNotice } from './ImportantNotice/ImportantNotice';
import { WhatsNew } from './WhatsNew/WhatsNew';
import { HowToGetStarted } from './HowToGetStarted/HowToGetStarted';
import { FAQ } from './FAQ/FAQ';
import { CTAFooter } from './CTAFooter/CTAFooter';
import { PageFooter } from './PageFooter/PageFooter';
import styles from './styles.module.scss';

export default function UpdatesFeature() {
  return (
    <main className={styles.updates}>
      <Hero />
      <ImportantNotice />
      <WhatsNew />
      <HowToGetStarted />
      <FAQ />
      <CTAFooter />
      <PageFooter />
    </main>
  );
}
