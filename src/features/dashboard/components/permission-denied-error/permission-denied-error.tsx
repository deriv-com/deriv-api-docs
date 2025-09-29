import React from 'react';
import { translate } from '@docusaurus/Translate';
import { Button } from '@deriv-com/quill-ui';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './permission-denied-error.scss';

const PermissionDeniedError = () => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const is_en = currentLocale === 'en';
  const homeUrl = `${!is_en ? `/${currentLocale}` : ''}/`;

  const handleGoHome = () => {
    window.location.href = homeUrl;
  };

  return (
    <div className='permission-denied-container'>
      <div className='permission-denied-content'>
        <h1>{translate({ message: 'Not available in your region' })}</h1>
        <p>
          {translate({
            message: 'You can still use our other products and services.',
          })}
        </p>
        <Button variant='primary' onClick={handleGoHome} size='lg'>
          {translate({ message: 'Go to home' })}
        </Button>
      </div>
    </div>
  );
};

export default PermissionDeniedError;
