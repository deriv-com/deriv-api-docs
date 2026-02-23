import React from 'react';
import Translate from '@docusaurus/Translate';
import {
  StandaloneShieldCheckBoldIcon,
  StandaloneLightbulbBoldIcon,
  StandaloneBookCircleQuestionBoldIcon,
  StandaloneGearBoldIcon,
  StandaloneChartLineBoldIcon,
  StandaloneStarBoldIcon,
} from '@deriv/quill-icons';
import styles from './WhatsNew.module.scss';

type TCard = {
  iconBg: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
};

const CARDS: TCard[] = [
  {
    iconBg: '#ffeef0',
    icon: <StandaloneShieldCheckBoldIcon iconSize='sm' fill='#c7313a' />,
    title: 'OAuth 2.0 authentication',
    description:
      'Industry-standard secure authentication that gives developers fine-grained access control and eliminates the need to share credentials.',
  },
  {
    iconBg: '#f3eeff',
    icon: <StandaloneLightbulbBoldIcon iconSize='sm' fill='#7c3aed' />,
    title: 'AI-powered features',
    description:
      'Built-in AI tools including an AI chatbot, LLMs.txt support, and MCP Server integration to supercharge your development workflow.',
  },
  {
    iconBg: '#e8f4ff',
    icon: <StandaloneBookCircleQuestionBoldIcon iconSize='sm' fill='#1d6fa4' />,
    title: 'Better documentation',
    description:
      'Fully redesigned docs with interactive examples, clearer guides, and improved search to help you build faster.',
  },
  {
    iconBg: '#eefff5',
    icon: <StandaloneGearBoldIcon iconSize='sm' fill='#0d7a4a' />,
    title: 'Your existing apps still work',
    description:
      'All your current integrations continue to function on the legacy platform. No action required on your part.',
  },
  {
    iconBg: '#e8f0ff',
    icon: <StandaloneChartLineBoldIcon iconSize='sm' fill='#1d4fa4' />,
    title: 'Analytics dashboard',
    description:
      'Track API usage, monitor app performance, and gain insights into how users interact with your applications.',
    comingSoon: true,
  },
  {
    iconBg: '#e8fff3',
    icon: <StandaloneStarBoldIcon iconSize='sm' fill='#0d6a3a' />,
    title: 'And much more',
    description:
      'From improved rate limits to new endpoint capabilities, the new Deriv APIs are built for the next generation of developers.',
  },
];

const FeatureCard = ({ card }: { card: TCard }) => (
  <article className={styles.card}>
    <div className={styles.iconWrapper} style={{ backgroundColor: card.iconBg }}>
      {card.icon}
    </div>
    {card.comingSoon && (
      <span className={styles.badge}>
        <Translate>COMING SOON</Translate>
      </span>
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
