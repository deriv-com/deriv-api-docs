import React from 'react';
import { Text } from '@deriv/ui';
import styles from './Footer.module.scss';
import Translate from '@docusaurus/Translate';

const Footer = () => {
  return (
    <footer className={styles.FooterContainer} data-testid='footer-text'>
      <section className={styles.FooterBody}>
        <Text type='subtitle-1' as='h3' align='center' className={styles.FooterContent}>
          <Translate>Get connected</Translate>
        </Text>
        <p className={styles.FooterBodyContent}>
          <Translate>Discuss ideas and share solutions with developers worldwide.</Translate>
        </p>
        <div className={styles.Communities}>
          <a
            href='https://deriv.vanillacommunity.com/'
            target='_blank'
            rel='noreferrer'
            className={styles.communityButton}
          >
            <span>
              <Translate>Join our community</Translate>
            </span>
          </a>
        </div>
      </section>
      <section className={styles.FooterBody}>
        <Text type='subtitle-1' as='h3' align='center' className={styles.FooterContent}>
          <Translate>We&apos;re here to help</Translate>
        </Text>
        <Text type='paragraph-1' align='center' className={styles.FooterBodyContentEmail}>
          <Translate>Email us at</Translate>{' '}
          <a className={styles.Email} href={'mailto:api-support@deriv.com'}>
            api-support@deriv.com
          </a>
        </Text>
        <Text type='paragraph-1' align='center' className={styles.FooterBodyContentEmail}>
          <Translate>if you have any questions.</Translate>
        </Text>
      </section>

      {/* This script is only for enabling crowdin in context tool. Should be removed once translation is ready! */}
      <script type='text/javascript'>
        var _jipt = []; _jipt.push([`project`, `deriv-api-documentation`]);
      </script>
      <script type='text/javascript' src='//cdn.crowdin.com/jipt/jipt.js'></script>
    </footer>
  );
};
export default Footer;
