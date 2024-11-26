import React from 'react';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import Translate from '@docusaurus/Translate';
import styles from './HeroHeader.module.scss';
import { useHistory } from '@docusaurus/router';

const HeroHeader = () => {
  const history = useHistory();

  return (
    <div className={`${styles.heroContainer}`} data-testid='hero-header'>
      <div className='container'>
        <div className={styles.heroInfoContainer}>
          <Heading.H1 className={styles.heroTitle}>
            <Translate>Deriv API</Translate>
          </Heading.H1>
          <Text className={styles.description} data-testid='hero-header-description'>
            <Translate>{`Leverage Deriv's powerful API suite to enhance your trading solutions. Our Websocket API delivers real-time data for options, multipliers, and accumulators, ensuring a smooth trading experience. For high-frequency CFD trading, our DerivFIX API offers ultra-low latency and institutional-grade reliability.`}</Translate>
          </Text>
        </div>
        <div className={styles.heroBtnContainer}>
          <Button variant='primary' size='lg' onClick={() => history.push('/#WebsocketAPI')}>
            <Translate>WebSocket API</Translate>
          </Button>
          <Button variant='secondary' color='white-black' size='lg' onClick={() => history.push('/#derivFix')}>
            <Translate>DerivFIX API</Translate>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
