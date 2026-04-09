import React from 'react';
import Translate from '@docusaurus/Translate';
import CustomAccordion from '@site/src/components/CustomAccordion';
import styles from './FAQ.module.scss';
import Link from '@docusaurus/Link';

const FAQ_ITEMS = [
  {
    header: 'Will my existing apps still work?',
    content: (
      <>
        <p>
          <Translate>
            Yes, for now. Your app continues running on the legacy APIs until your clients are
            migrated to the new APIs. Ensure your app is compatible with the new Deriv APIs now so
            it&apos;s ready when they get there and the transition is seamless for them.
          </Translate>
        </p>
        <p>
          <Translate>
            When all users are migrated, the legacy APIs will be decommissioned.
          </Translate>
        </p>
      </>
    ),
  },
  {
    header: 'What happens to my users during the transition?',
    content: (
      <p>
        <Translate>
          Your users can continue using your app for now. As they are moved to the new system, they
          will only be able to use apps built on the new APIs.
        </Translate>
      </p>
    ),
  },
  {
    header: 'When will my app stop working?',
    content: (
      <p>
        <Translate>
          Your app will stop working for users once they are moved to the new APIs. At that point,
          they won&apos;t be able to use apps built on the legacy APIs. Getting your app compatible
          with the new Deriv APIs now means you&apos;ll be ready when that happens.
        </Translate>
      </p>
    ),
  },
  {
    header: 'Can I migrate my existing app or reuse my data?',
    content: (
      <p>
        <Translate>
          No. App data, configurations, tokens, and IDs do not carry over. The new Deriv APIs are a
          separate platform, so existing app configurations, tokens, app IDs, and credentials
          won&apos;t migrate automatically. You&apos;ll be starting fresh on a significantly more
          capable system.
        </Translate>
      </p>
    ),
  },
  {
    header: "What if my new app isn't ready when my clients migrate?",
    content: (
      <p>
        <Translate
          values={{
            email: (
              <Link to='mailto:api-support@deriv.com' className={styles.noticeLink}>
                api-support@deriv.com
              </Link>
            ),
          }}
        >
          {
            'Your clients will only be able to trade on apps built on the new platform — so the sooner your app is ready, the better. If you need support getting there, reach out to {email}.'
          }
        </Translate>
      </p>
    ),
  },
  {
    header: 'Can I use the same email to sign up on the new Deriv APIs?',
    content: (
      <p>
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
            "No, you'll need to use a different email. If you want the same email, change the email on your legacy account first, then sign up at {link} with your preferred email."
          }
        </Translate>
      </p>
    ),
  },
  {
    header: "I'm a new developer. Where do I start?",
    content: (
      <p>
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
            "Go to {link}, create an account, and start building. You don't need this legacy platform."
          }
        </Translate>
      </p>
    ),
  },
];

export const FAQ = () => {
  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <Translate>Frequently asked questions</Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate>Common questions about the new Deriv APIs and the transition.</Translate>
        </p>
        <CustomAccordion items={FAQ_ITEMS} />
      </div>
    </section>
  );
};
