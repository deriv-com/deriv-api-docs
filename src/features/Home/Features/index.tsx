import React from 'react';
import { Heading, Text } from '@deriv-com/quill-ui';
import styles from '../styles.module.scss';

type FeaturesProps = {
  title: string;
  description: string;
  features?: {
    title: string;
    description: string;
  }[];
};

const Features = (props: FeaturesProps) => {
  const { title, description } = props;

  return (
    <div data-testid='feature_section'>
      <Heading.H2 centered>{title}</Heading.H2>
      <Text centered>{description}</Text>

      <div
        className={`${styles.spaceEvenContent} ${styles.featuresContainer} ${styles.mh5}`}
      >
        {props.features?.map((feature, idx) => (
          <div key={idx} className={`${styles.mh3}`}>
            <Heading.H3>{feature.title}</Heading.H3>
            <Text>{feature.description}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
