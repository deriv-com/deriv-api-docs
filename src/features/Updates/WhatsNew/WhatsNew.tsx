import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import {
  StandaloneLockBoldIcon,
  StandaloneDesktopBoldIcon,
  StandaloneBookCircleQuestionBoldIcon,
} from '@deriv/quill-icons';
import styles from './WhatsNew.module.scss';

type TBadge = 'new' | 'comingSoon' | 'limitedTime';

type TCard = {
  iconBg?: string;
  icon?: React.ReactNode;
  badge?: TBadge;
  title: string;
  description: string;
};

const CARDS: TCard[] = [
  {
    iconBg: '#ffeef0',
    icon: <StandaloneLockBoldIcon iconSize='md' fill='#c7313a' />,
    title: translate({ message: 'OAuth 2.0 authentication' }),
    description: translate({
      message: 'Industry-standard security with token-based authentication and granular scopes.',
    }),
  },
  {
    iconBg: '#f3eeff',
    icon: <StandaloneDesktopBoldIcon iconSize='md' fill='#7c3aed' />,
    title: translate({ message: 'AI-powered features' }),
    description: translate({
      message:
        'Build faster with AI to generate code, test endpoints, and explore APIs in natural language.',
    }),
  },
  {
    iconBg: '#e8f4ff',
    icon: <StandaloneBookCircleQuestionBoldIcon iconSize='md' fill='#1d6fa4' />,
    title: translate({ message: 'Better documentation' }),
    description: translate({
      message: 'Comprehensive guides, code examples, and interactive API references.',
    }),
  },
  {
    badge: 'new',
    title: translate({ message: 'Getting started guides' }),
    description: translate({
      message: 'Step-by-step documentation to help you create your new app on the new APIs.',
    }),
  },
  {
    badge: 'comingSoon',
    title: translate({ message: 'Analytics dashboard' }),
    description: translate({
      message: "Track your app's performance, usage, and user metrics in real time.",
    }),
  },
  {
    badge: 'limitedTime',
    title: translate({ message: 'Markup commissions up to 5%' }),
    description: translate({
      message: 'Earn commissions on trades made through your applications.',
    }),
  },
];

const BADGE_CONFIG: Record<TBadge, { label: string; className: string }> = {
  new: { label: translate({ message: 'New' }), className: styles.badgeNew },
  comingSoon: { label: translate({ message: 'Coming soon' }), className: styles.badgeComingSoon },
  limitedTime: {
    label: translate({ message: 'Limited time' }),
    className: styles.badgeLimitedTime,
  },
};

const FeatureCard = ({ card }: { card: TCard }) => (
  <article className={styles.card}>
    {card.icon && <div>{card.icon}</div>}
    {card.badge && (
      <span className={BADGE_CONFIG[card.badge].className}>{BADGE_CONFIG[card.badge].label}</span>
    )}
    <h5 className={styles.cardTitle}>{card.title}</h5>
    <p className={styles.cardDescription}>{card.description}</p>
  </article>
);

export const WhatsNew = () => {
  return (
    <section className={styles.whatsNewSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <Translate>What&apos;s new in the Deriv APIs</Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate>
            Everything you get when you move to the new platform — built for security, speed, and
            the future.
          </Translate>
        </p>
        <div className={styles.cardGrid}>
          {CARDS.map((card) => (
            <FeatureCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};
