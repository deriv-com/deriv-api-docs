import React from 'react';
import { Text } from '@deriv-com/quill-ui';
import Translate from '@docusaurus/Translate';
import './cta-banner.scss';

const CtaBanner: React.FC = () => {
  return (
    <div className='cta-banner'>
      <div className='cta-banner__content'>
        <h2 className='cta-banner__title'>
          <Translate>Earn from your app</Translate>
        </h2>
        <Text size='md' className='cta-banner__description'>
          <Translate>
            With a real Deriv account, you can earn commissions when users trade on your app.
          </Translate>
        </Text>
        <a href='#' className='cta-banner__button'>
          <Translate>Get real account</Translate>
        </a>
      </div>
      <div className='cta-banner__illustration'>
        <img src='/img/machine.svg' alt='Computer monitor' className='cta-banner__machine' />
        <img src='/img/Commission.svg' alt='Commission' className='cta-banner__commission' />
        <div className='cta-banner__dot'></div>
      </div>
    </div>
  );
};

export default CtaBanner;
