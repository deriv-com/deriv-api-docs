import { Button, Text } from '@deriv/ui';
import React from 'react';
import styles from './Login.module.scss';
import useLoginUrl from '@site/src/hooks/useLoginUrl';
import Footer from '@site/src/components/Footer';
import Translate from '@docusaurus/Translate';

export const Login = () => {
  const { getUrl } = useLoginUrl();

  const handleClick = () => {
    window.location.assign(getUrl('en'));
  };
  return (
    <div>
      <div className={styles.login} data-testid='login'>
        <div className={styles.loginsection}>
          <div className={styles.loginImage} role='image' />
          <Text type='paragraph-1' as={'h1'} align='center' bold role='heading'>
            <Translate>
              Log in to your Deriv account to get the API token and start using our API.
            </Translate>
          </Text>
          <Button color='primary' onClick={handleClick}>
            <Translate>Log In</Translate>
          </Button>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};
