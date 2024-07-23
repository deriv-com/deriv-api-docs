import React from 'react';
import { ApiFeatures } from './ApiFeatures/ApiFeatures';
import { Benefits } from './Benefits/Benefits';
import { ClientLibraries } from './ClientLibraries/ClientLibraries';
import { HeroHeader } from './HeroHeader/HeroHeader';
import { WaysToEarn } from './WaysToEarn/WaysToEarn';
// import { Carousel } from './Carousel/Carousel';
import Footer from '@site/src/components/Footer';
import styles from './styles.module.scss';
import { GetStarted } from './GetStarted/GetStarted';
import RenderOfficialContents from '@site/src/components/RenderOfficialContents';

export default function HomepageFeatures() {
  return (
    <main className={styles.features}>
      <RenderOfficialContents>
        <HeroHeader />
      </RenderOfficialContents>
      <ClientLibraries />
      <RenderOfficialContents>
        <React.Fragment>
          <Benefits />
          <WaysToEarn />
          <GetStarted />
          <ApiFeatures />
          {/* Carousel requires new quote's before it should be enabled again */}
          {/* <Carousel /> */}
          <Footer />
        </React.Fragment>
      </RenderOfficialContents>
    </main>
  );
}
