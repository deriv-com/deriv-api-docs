import React from 'react';
import Translate from '@docusaurus/Translate';
import CustomAccordion from '@site/src/components/CustomAccordion';
import styles from './FAQ.module.scss';

const FAQ_ITEMS = [
  {
    header: 'Will my existing apps still work?',
    content: (
      <p>
        <Translate>
          Yes. Your existing applications, tokens, and integrations will continue to work on the
          legacy Deriv APIs. Your current users can keep using your apps as normal. Nothing changes
          for them.
        </Translate>
      </p>
    ),
  },
  {
    header: 'Can my existing apps sign in new users?',
    content: (
      <p>
        <Translate>
          No. New users can only sign up through apps built on the new Deriv APIs. Your legacy apps
          will continue serving your existing users, but to onboard new users, you will need to
          create a new application on developers.deriv.com.
        </Translate>
      </p>
    ),
  },
  {
    header: 'What happens to my current traders?',
    content: (
      <p>
        <Translate>
          Nothing changes for your current traders. They can continue using your apps on the legacy
          Deriv APIs as they do today.
        </Translate>
      </p>
    ),
  },
  {
    header: "I'm a new developer. Where do I start?",
    content: (
      <p>
        <Translate>
          Head straight to developers.deriv.com and create an account. The new Deriv APIs offer
          OAuth 2.0 security, improved documentation, a playground to test your integrations, and
          AI-powered tools to help you build faster. (edited)
        </Translate>
      </p>
    ),
  },
  {
    header: 'Why does the URL say "legacy-api.deriv.com"?',
    content: (
      <p>
        <Translate>
          We've moved these APIs to legacy-api.deriv.com to clearly separate them from the new Deriv
          APIs at developer.deriv.com. If you had api.deriv.com bookmarked, it now redirects here
          automatically.
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
