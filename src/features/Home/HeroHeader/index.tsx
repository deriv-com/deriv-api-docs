import React from 'react';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import Translate from '@docusaurus/Translate';
import styles from './HeroHeader.module.scss';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const HeroHeader = () => {
  const history = useHistory();

  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const internal_links = React.useMemo(() => {
    const is_en = currentLocale === 'en';
    const get_url = (path: string) => {
      const pathInfo = `${!is_en ? `/${currentLocale}` : ''}/${path}`;
      return pathInfo;
    };
    return {
      webSocketAPI: get_url('#WebsocketAPI'),
      derivFixAPI: get_url('#derivFix'),
    };
  }, [currentLocale]);

  return (
    <div className={`${styles.heroContainer}`} data-testid='hero-header'>
      <div className='container'>
        <div className={styles.heroInfoContainer}>
          <Heading.H1 className={styles.heroTitle}>
            <Translate>Deriv API</Translate>
          </Heading.H1>
          <Text className={styles.description} data-testid='hero-header-description'>
            <Translate>{`Build smarter trading solutions with Deriv’s APIs. Use the WebSocket API for real-time Options trading and the Deriv FIX API for ultra-low latency CFDs trading, ensuring precision, stability, and high performance.`}</Translate>
          </Text>
        </div>
        <div className={styles.heroBtnContainer}>
          <Button
            variant='primary'
            size='lg'
            onClick={() => history.push(internal_links.webSocketAPI)}
          >
            <Translate>WebSocket API</Translate>
          </Button>
          <Button
            variant='secondary'
            color='white-black'
            size='lg'
            onClick={() => history.push(internal_links.derivFixAPI)}
          >
            <Translate>Deriv FIX API</Translate>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
