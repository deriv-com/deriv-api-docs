import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { StandaloneCircleExclamationBoldIcon } from '@deriv/quill-icons';
import styles from './ImportantNotice.module.scss';

export const ImportantNotice = () => {
  return (
    <section className={styles.noticeSection}>
      <div className={styles.noticeCard}>
        <div className={styles.noticeHeader}>
          <StandaloneCircleExclamationBoldIcon iconSize='md' className={styles.noticeIcon} />
          <h4 className={styles.noticeTitle}>
            <Translate>Important: Update your app with the new Deriv API</Translate>
          </h4>
        </div>
        <p className={styles.noticeBody}>
          <strong>
            <Translate>What&apos;s happening:</Translate>
          </strong>{' '}
          <Translate>
            We&apos;re retiring the Legacy API and moving users to the new Deriv API. To keep
            serving your clients, your app needs to work on the new platform.
          </Translate>
        </p>
        <p className={styles.noticeBody}>
          <strong>
            <Translate>What you need to do:</Translate>
          </strong>{' '}
          <Translate>
            Update your app to work with the new Deriv API. The new API isn&apos;t compatible with
            the Legacy API, so you&apos;ll need to adapt your integration.
          </Translate>
        </p>
        <p className={styles.noticeBody}>
          <strong>
            <Translate>Getting started:</Translate>
          </strong>{' '}
          <Translate
            values={{
              link: (
                <Link to='https://developers.deriv.com' className={styles.noticeLink}>
                  developers.deriv.com
                </Link>
              ),
            }}
          >
            {
              "Create a new account at {link} with an email address that isn't linked to a Legacy API account. To use your current email, change the email on your Legacy API account first, then sign up again with your preferred email."
            }
          </Translate>
        </p>
        <p className={styles.noticeBody}>
          <Translate
            values={{
              link: (
                <Link to='mailto:api-support@deriv.com' className={styles.noticeLink}>
                  api-support@deriv.com
                </Link>
              ),
            }}
          >
            {'Need help? Reach out via {link}.'}
          </Translate>
        </p>
      </div>
    </section>
  );
};
