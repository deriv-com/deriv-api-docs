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
            <Translate>Important: Update your app with the new Deriv APIs</Translate>
          </h4>
        </div>
        <p className={styles.noticeBody}>
          <strong>
            <Translate>What&apos;s happening:</Translate>
          </strong>{' '}
          <Translate>
            Your users are being moved to the new Deriv APIs. Once they move, your app needs to be
            on the new platform to keep serving them.
          </Translate>
        </p>
        <p className={styles.noticeBody}>
          <strong>
            <Translate>What you need to do:</Translate>
          </strong>{' '}
          <Translate>
            Update your app to work with the new Deriv APIs. The new APIs are not compatible with
            the legacy APIs, so your app will need to be adapted to the new system.
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
              "Create a new account on {link}. You'll need to sign up with a different email address. If you want to use your current one, change the email on your legacy account first, then sign up with your preferred email."
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
