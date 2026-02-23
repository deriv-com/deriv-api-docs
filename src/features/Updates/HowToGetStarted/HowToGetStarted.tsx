import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './HowToGetStarted.module.scss';

type TStep = {
  number: number;
  title: string;
  description: React.ReactNode;
};

const STEPS: TStep[] = [
  {
    number: 1,
    title: 'Visit developer.deriv.com',
    description: (
      <Translate
        values={{
          link: (
            <Link to='https://developer.deriv.com' className={styles.link}>
              developer.deriv.com
            </Link>
          ),
        }}
      >
        {'Go to {link} to access the new Deriv APIs.'}
      </Translate>
    ),
  },
  {
    number: 2,
    title: 'Create a new account',
    description:
      "Click Sign up and register. Your existing legacy credentials won't work here — a new account is required.",
  },
  {
    number: 3,
    title: 'Start building',
    description:
      'Explore the APIs, create applications, generate tokens, and use the AI tools and documentation.',
  },
];

const Step = ({ step }: { step: TStep }) => (
  <div className={styles.step}>
    <div className={styles.stepNumber}>{step.number}</div>
    <div className={styles.stepContent}>
      <h5 className={styles.stepTitle}>{step.title}</h5>
      <p className={styles.stepDescription}>{step.description}</p>
    </div>
  </div>
);

export const HowToGetStarted = () => {
  return (
    <section className={styles.stepsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <Translate>How to get started</Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate>Three steps to set up your account on the new Deriv APIs.</Translate>
        </p>
        <div className={styles.stepsWrapper}>
          {STEPS.map((step) => (
            <Step key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};
