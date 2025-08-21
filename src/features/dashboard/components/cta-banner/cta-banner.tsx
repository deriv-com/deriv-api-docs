import React from 'react';
import { Text, Button, Heading } from '@deriv-com/quill-ui';
import Translate from '@docusaurus/Translate';
import './cta-banner.scss';
import Routes from '@site/src/utils/routes';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { useLandingCompany } from '@site/src/hooks/useLandingCompany';

const CtaBanner: React.FC = () => {
  const { is_authorized } = useAuthContext();
  const { data: landingCompanyData, isLoading: landingCompanyLoading } =
    useLandingCompany(is_authorized);

  return (
    <div className='cta-banner'>
      <div className='cta-banner__content'>
        <Heading.H2 className='cta-banner__title'>
          <Translate>Earn from your app</Translate>
        </Heading.H2>
        <Text size='md' className='cta-banner__description'>
          <Translate>
            With a real Deriv account, you can earn commissions when users trade on your app.
          </Translate>
        </Text>
        <Button
          className='cta-banner__button'
          disabled={landingCompanyLoading}
          onClick={() =>
            window.location.assign(
              Routes.GET_REAL_ACCOUNT +
                `&target=${
                  landingCompanyData?.financial_company?.shortcode ||
                  landingCompanyData?.gaming_company?.shortcode
                }`,
            )
          }
        >
          <Translate>Get real account</Translate>
        </Button>
      </div>
      <div className='cta-banner__illustration'>
        <img src='/img/machine.svg' alt='Computer monitor' className='cta-banner__machine' />
        <img src='/img/Commission.svg' alt='Commission' className='cta-banner__commission' />
      </div>
    </div>
  );
};

export default CtaBanner;
