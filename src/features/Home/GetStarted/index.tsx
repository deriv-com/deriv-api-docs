import React from 'react';
import { Text, Heading, Button } from '@deriv-com/quill-ui';
import styles from '../styles.module.scss';
import Translate, { translate } from '@docusaurus/Translate';
import useDeviceType from '@site/src/hooks/useDeviceType';

const GetStarted = () => {
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const getStartedSteps = {
    websocket: [
      {
        title: `${translate({ message: 'Sign up' })}`,
        description: `${translate({
          message: 'Create your Deriv account and get instant access to our API suite.',
        })}`,
      },
      {
        title: `${translate({ message: 'Integrate your platform' })}`,
        description: `${translate({
          message: 'Connect your tech stack using our API documentation.',
        })}`,
      },
      {
        title: `${translate({ message: 'Deploy your solution' })}`,
        description: `${translate({
          message:
            'Launch your application and explore ways to monetise it by sharing it with the trading community.',
        })}`,
      },
    ],
  };

  const renderSteps = () => {
    return (
      <React.Fragment>
        {getStartedSteps.websocket.map((step, idx) => (
          <div key={idx} className={styles.getStartedStepContainer}>
            <div className={styles.stepIconContainer}>
              <img
                src={`/img/number_${idx + 1}.svg`}
                data-testid='get-started-step'
                alt={translate({
                  message: 'Get Started',
                })}
              />
              {idx != 2 && <div className={styles.stepCenterOutline} />}
            </div>
            <div>
              <Heading.H3>{step.title}</Heading.H3>
              <Text className={`${styles.description}`}>{step.description}</Text>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  };

  return (
    <div
      className={`${styles.spaceAroundContent} ${styles.getStarted}`}
      data-testid='get_started_section'
    >
      <img
        src={`/img/getStarted.png`}
        data-testid='product-info-img'
        alt={translate({
          message: 'Get Started',
        })}
        className={styles.getStartedImg}
      />
      <div className={`${styles.mv5}`}>
        <Heading.H2 className={styles.mh3}>
          <Translate>How to get started</Translate>
        </Heading.H2>
        {renderSteps()}
      </div>
    </div>
  );
};

export default GetStarted;
