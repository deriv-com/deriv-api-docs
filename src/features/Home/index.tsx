import React from 'react';
import { HeroHeader } from './HeroHeader/HeroHeader';
import Footer from '@site/src/components/Footer';
import styles from './styles.module.scss';
import RenderOfficialContents from '@site/src/components/RenderOfficialContents';

export default function HomepageFeatures() {
  return (
    <main className={styles.features}>
      <RenderOfficialContents>
        <HeroHeader />
      </RenderOfficialContents>
      <RenderOfficialContents>
        <Footer />
      </RenderOfficialContents>
    </main>
  );
}
