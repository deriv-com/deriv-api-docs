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
          Yes. All existing apps and integrations on the legacy Deriv API will continue to function
          as before. You do not need to migrate immediately.
        </Translate>
      </p>
    ),
  },
  {
    header: 'Can my existing apps sign in new users?',
    content: (
      <p>
        <Translate>
          Yes, your existing apps can still authenticate users through the legacy platform. However,
          new sign-ups on the new platform will require accounts created on developers.deriv.com.
        </Translate>
      </p>
    ),
  },
  {
    header: 'What happens to my current traders?',
    content: (
      <p>
        <Translate>
          Your current traders are not affected. They can continue using your app without any
          changes. The migration only concerns developer accounts and API access.
        </Translate>
      </p>
    ),
  },
  {
    header: 'Can I still sign up on the legacy Deriv APIs?',
    content: (
      <p>
        <Translate>
          The legacy platform remains accessible, but we encourage new developers to start on the
          new Deriv APIs at developers.deriv.com to take advantage of OAuth 2.0 and all the new
          features.
        </Translate>
      </p>
    ),
  },
  {
    header: "I'm a new developer. Where do I start?",
    content: (
      <p>
        <Translate>
          Head to developers.deriv.com to create your account and explore the new APIs. The new
          platform offers better documentation, AI tools, and a more secure authentication system.
        </Translate>
      </p>
    ),
  },
  {
    header: 'Why does the URL say "legacy-api.deriv.com"?',
    content: (
      <p>
        <Translate>
          This site has been updated to reflect that it is the legacy version of the Deriv API
          documentation. The new platform is available at developers.deriv.com.
        </Translate>
      </p>
    ),
  },
  {
    header: 'How do I get help?',
    content: (
      <p>
        <Translate>
          You can reach our support team through the Help centre at deriv.com/help-centre or contact
          us directly at developers.deriv.com.
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
