import React from 'react';
import { Text, Heading, Button } from '@deriv-com/quill-ui';
import styles from '../styles.module.scss';
import Translate, { translate } from '@docusaurus/Translate';

const GetStarted = () => {
  const [isWebsocket, setIsWebsocket] = React.useState(true);

  const handleBtnClick = (is_websocket) => setIsWebsocket(is_websocket);

  const getStartedSteps = {
    websocket: [
      {
        title: `${translate({ message: 'Sign up and explore' })}`,
        description: `${translate({
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        })}`,
      },
      {
        title: `${translate({ message: 'Sign up and explore' })}`,
        description: `${translate({
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        })}`,
      },
      {
        title: `${translate({ message: 'Sign up and explore' })}`,
        description: `${translate({
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        })}`,
      },
    ],
    derivFIX: [
      {
        title: `${translate({ message: 'Sign up and explore' })}`,
        description: `${translate({
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        })}`,
      },
      {
        title: `${translate({ message: 'Sign up and explore' })}`,
        description: `${translate({
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        })}`,
      },
      {
        title: `${translate({ message: 'Sign up and explore' })}`,
        description: `${translate({
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        })}`,
      },
    ],
  };

  const renderSteps = () => {
    const steps = isWebsocket ? getStartedSteps.websocket : getStartedSteps.derivFIX;

    return (
      <React.Fragment>
        {steps.map((step, idx) => (
          <div key={idx} className={styles.getStartedStepContainer}>
            <div className={styles.stepIconContainer}>
              <img
                src={`/img/number_${idx + 1}.svg`}
                data-testid='get-started-step'
                alt={translate({
                  message: 'Get Started',
                })}
              />
              <div className={styles.stepCenterOutline} />
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
    <div className={`${styles.spaceAroundContent} ${styles.getStarted}`} data-testid='get_started_section'>
      <img
        src={`/img/getStarted.png`}
        data-testid='product-info-img'
        alt={translate({
          message: 'Get Started',
        })}
        className={styles.getStartedImg}
      />
      <div className={`${styles.mv5}`}>
        <div className={`${styles.centerContent} ${styles.gap1} ${styles.getStartedBtnContainer}`}>
          <Button
            variant={isWebsocket ? 'primary' : 'secondary'}
            size='lg'
            color={'black'}
            onClick={() => handleBtnClick(true)}
          >
            Websocket API
          </Button>
          <Button
            variant={!isWebsocket ? 'primary' : 'secondary'}
            size='lg'
            color={'black'}
            onClick={() => handleBtnClick(false)}
          >
            DerivFIX API
          </Button>
        </div>
        <Heading.H2>
          <Translate>How to get started</Translate>
        </Heading.H2>
        {renderSteps()}
        <div className={styles.spaceEvenContent}>
          <Button variant='primary' size='lg'>
            <Translate>Sign up</Translate>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
