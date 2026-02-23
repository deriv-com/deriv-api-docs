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
  comingSoon?: boolean;
};

const CARDS: TCard[] = [
  {
    iconBg: '#ffeef0',
    icon: <StandaloneShieldCheckBoldIcon iconSize='sm' fill='#c7313a' />,
    title: 'OAuth 2.0 authentication',
  },
  {
    iconBg: '#f3eeff',
    icon: <StandaloneLightbulbBoldIcon iconSize='sm' fill='#7c3aed' />,
    title: 'AI-powered features',
  },
  {
    iconBg: '#e8f4ff',
    icon: <StandaloneBookCircleQuestionBoldIcon iconSize='sm' fill='#1d6fa4' />,
    title: 'Better documentation',
  },
  {
    iconBg: '#eefff5',
    icon: <StandaloneGearBoldIcon iconSize='sm' fill='#0d7a4a' />,
    title: 'Your existing apps still work',
  },
  {
    iconBg: '#e8f0ff',
    icon: <StandaloneChartLineBoldIcon iconSize='sm' fill='#1d4fa4' />,
    title: 'Analytics dashboard',
    comingSoon: true,
  },
  {
    iconBg: '#e8fff3',
    icon: <StandaloneStarBoldIcon iconSize='sm' fill='#0d6a3a' />,
    title: 'And much more',
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
