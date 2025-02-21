import { Button, Text } from '@deriv/ui';
import React from 'react';
import styles from './Login.module.scss';
import useLoginUrl from '@site/src/hooks/useLoginUrl';
import Footer from '@site/src/components/Footer';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHandleLogin } from '@site/src/hooks/useHandleLogin';

export const Login = () => {
  const { getUrl } = useLoginUrl();
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const handleClick = () => {
    window.location.assign(getUrl(currentLocale));
  };

  const { handleLogin } = useHandleLogin({
    onClickLogin: handleClick,
  });

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
          <div className={styles.action}>
            <Button color='primary' onClick={handleLogin}>
              <Translate>Log In</Translate>
            </Button>
          </div>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};
