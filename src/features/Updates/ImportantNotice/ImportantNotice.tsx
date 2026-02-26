import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { StandaloneCircleInfoBoldIcon } from '@deriv/quill-icons';
import styles from './ImportantNotice.module.scss';

export const ImportantNotice = () => {
  return (
    <section className={styles.noticeSection}>
      <div className={styles.noticeCard}>
        <div className={styles.noticeHeader}>
          <StandaloneCircleInfoBoldIcon iconSize='md' className={styles.noticeIcon} />
          <h4 className={styles.noticeTitle}>
            <Translate>Important notice for existing developers</Translate>
          </h4>
        </div>
        <p className={styles.noticeBody}>
          <Translate>
            Your existing apps and integrations will continue to work on this legacy platform, and
            your current setup remains functional. Your existing users will continue using your app
            without any issue.
          </Translate>
        </p>
        <p className={styles.noticeBold}>
          <Translate
            values={{
              link: (
                <Link to='https://developers.deriv.com' className={styles.noticeLink}>
                  developers.deriv.com
                </Link>
              ),
              breakline: <br />,
            }}
          >
            {
              'However, in order to onboard and support new users, you should migrate to the new Deriv APIs. {breakline}{breakline} To access the new Deriv APIs, you will need to create a new account on {link}. Your existing legacy credentials will not work there. Please use a different email address when signing up.'
            }
          </Translate>
        </p>
        <p className={styles.noticeSmall}>
          <Translate>
            If you&apos;d like to use the same
            email, you will need to change the email on your legacy account first.
          </Translate>
        </p>
        <p className={styles.noticeSmall}>
          <Translate> New users do not need to take any action.</Translate>
        </p>
      </div>
    </section>
  );
};
