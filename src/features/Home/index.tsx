import React from 'react';
import { translate } from '@docusaurus/Translate';
import RenderOfficialContents from '@site/src/components/RenderOfficialContents';
import Footer from '@site/src/components/Footer';
import ProductInfo from './ProductInfo';
import Benefits from './Benefits';
import ClientLibraries from './ClientLibraries';
import HeroHeader from './HeroHeader';
import Features from './Features';
import { derivFixFeatures, webSocketFeatures } from './Features/constant';

import styles from './styles.module.scss';
import { products } from './ProductInfo/constant';
import GetStarted from './GetStarted';
import About from './About';

export default function HomepageFeatures() {
  return (
    <main>
      <RenderOfficialContents>
        <HeroHeader />
      </RenderOfficialContents>
      <RenderOfficialContents>
        <div className={`${styles.features} container`}>
          <Benefits />
          <ProductInfo product={products.Websocket} />
          <Features
            title={translate({ message: 'Key features of Websocket API' })}
            description={translate({
              message: 'Build your dream trading platform with features that put you in control.',
            })}
            features={webSocketFeatures}
          />
          <ClientLibraries />
          <ProductInfo product={products.DerivFIX} reverse />
          <Features
            title={translate({ message: 'Key Features of DerivFIX' })}
            description={translate({
              message: 'Tailored for high-frequency, high-stakes trading.',
            })}
            features={derivFixFeatures}
          />
         <GetStarted />
        </div>
      </RenderOfficialContents>
      {/* <About /> */}
      <div className={`${styles.features} container`}>
        <Footer />
      </div>
    </main>
  );
}
