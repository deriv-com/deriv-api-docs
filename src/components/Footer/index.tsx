import React from 'react';
import { Text, Button, Heading } from '@deriv-com/quill-ui';
import styles from './Footer.module.scss';
import { LabelPairedArrowUpRightSmRegularIcon } from '@deriv/quill-icons';
import { SocialTelegramBlackIcon } from '@deriv/quill-icons';
import { LabelPairedEnvelopeMdBoldIcon } from '@deriv/quill-icons';
import CustomAccordion from '../CustomAccordion';

const Footer = () => {
  const accordionItems = [
    {
      header: 'API',
      content: (
        <ul className={styles.List}>
          <li>
            <a href='/docs/intro' className={styles.Link}>
              Documentation
            </a>
          </li>
          <li>
            <a href='/dashboard' className={styles.Link}>
              Dashboard
            </a>
          </li>
          <li>
            <a href='/api-explorer' className={styles.Link}>
              API explorer
            </a>
          </li>
          <li>
            <a href='https://deriv.com/derivtech' target='blank' className={styles.Link}>
              Deriv tech <LabelPairedArrowUpRightSmRegularIcon />
            </a>
          </li>
          <li>
            <a href='https://hackerone.com/deriv?type=team' target='blank' className={styles.Link}>
              Bug bounty <LabelPairedArrowUpRightSmRegularIcon />
            </a>
          </li>
        </ul>
      ),
    },
    {
      header: 'Deriv.com',
      content: (
        <ul className={styles.List}>
          <li>
            <a href='https://deriv.com/' target='blank' className={styles.Link}>
              Homepage <LabelPairedArrowUpRightSmRegularIcon />
            </a>
          </li>
          <li>
            <a href='https://deriv.com/who-we-are/' target='blank' className={styles.Link}>
              Who we are <LabelPairedArrowUpRightSmRegularIcon />
            </a>
          </li>
          <li>
            <a href='https://deriv.com/contact-us/' target='blank' className={styles.Link}>
              Contact us <LabelPairedArrowUpRightSmRegularIcon />
            </a>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <section className={styles.FooterContainer} data-testid='footer-text'>
      <div className={styles.FooterBody}>
        <div className={styles.LogoWrapper}>
          <img src='img/gray-logo.svg' alt='Deriv API Logo' className={styles.FooterLogo} />
        </div>
        <div className={styles.FooterSection}>
          <section className={styles.Section1} data-testid='API-section'>
            <Heading.H6 className={styles.SectionTitle} data-testid='API-section'>
              API
            </Heading.H6>
            <ul className={styles.List}>
              <li>
                <a href='/docs/intro' className={styles.Link}>
                  <Text className={styles.labelcolor} size='sm'>
                    Documentation
                  </Text>
                </a>
              </li>
              <li>
                <a href='/dashboard' className={styles.Link}>
                  <Text size='sm' className={styles.labelcolor}>
                    Dashboard
                  </Text>
                </a>
              </li>
              <li>
                <a href='/api-explorer' className={styles.Link}>
                  <Text size='sm' className={styles.labelcolor}>
                    API explorer
                  </Text>
                </a>
              </li>
              <li>
                <a href='https://deriv.com/derivtech' target='blank' className={styles.Link}>
                  <Text size='sm' className={styles.labelcolor}>
                    Deriv tech
                  </Text>
                  <LabelPairedArrowUpRightSmRegularIcon />
                </a>
              </li>
              <li>
                <a
                  href='https://hackerone.com/deriv?type=team'
                  target='blank'
                  className={styles.Link}
                >
                  <Text size='sm' className={styles.labelcolor}>
                    Bug bounty
                  </Text>{' '}
                  <LabelPairedArrowUpRightSmRegularIcon />
                </a>
              </li>
            </ul>
          </section>
          <section className={styles.Section1}>
            <Heading.H6 className={styles.SectionTitle}>Deriv.com</Heading.H6>
            <ul className={styles.List}>
              <li>
                <a href='https://deriv.com/' target='blank' className={styles.Link}>
                  <Text size='sm' className={styles.labelcolor}>
                    Homepage
                  </Text>{' '}
                  <LabelPairedArrowUpRightSmRegularIcon />
                </a>
              </li>
              <li>
                <a href='https://deriv.com/who-we-are/' target='blank' className={styles.Link}>
                  <Text size='sm' className={styles.labelcolor}>
                    Who we are
                  </Text>{' '}
                  <LabelPairedArrowUpRightSmRegularIcon />
                </a>
              </li>
              <li>
                <a href='https://deriv.com/contact-us/' target='blank' className={styles.Link}>
                  <Text
                    size='sm'
                    color='var(--component-textIcon-normal-prominent)'
                    className={styles.labelcolor}
                  >
                    Contact us
                  </Text>{' '}
                  <LabelPairedArrowUpRightSmRegularIcon />
                </a>
              </li>
            </ul>
          </section>
          <div className={styles.MobileAccordion}>
            <CustomAccordion items={accordionItems} />
          </div>
          <div className={styles.Box} data-testid='get-connected'>
            <Heading.H6 className={styles.SectionTitle2}>Get connected</Heading.H6>
            <p className={styles.SectionContent}>
              <Text size='sm'>Discuss ideas and share solutions with developers worldwide.</Text>
            </p>
            <div className={styles.CommunityButton} data-testid='community-button'>
              <Button
                variant='secondary'
                color='black'
                size='md'
                onClick={() => {
                  window.open('https://deriv.vanillacommunity.com/', '_blank');
                }}
              >
                Join our community
              </Button>
              <Button
                variant='secondary'
                color='black'
                size='md'
                onClick={() => {
                  window.open('https://t.me/derivdotcomofficial', '_blank');
                }}
              >
                <SocialTelegramBlackIcon fill='#000000' iconSize='xs' /> Telegram
              </Button>
            </div>
          </div>
          <div className={styles.Box}>
            <Heading.H6 className={styles.SectionTitle2}>We&apos;re here to help</Heading.H6>
            <p className={styles.SectionContent}>
              <Text size='sm'>
                Email us at <a href={'mailto:api-support@deriv.com'}>api-support@deriv.com</a> if
                you need any assistance or support.
              </Text>
            </p>
            <div className={styles.EmailButton}>
              <Button
                color='black'
                size='md'
                variant='secondary'
                fullWidth
                onClick={() => {
                  window.open('mailto:api-support@deriv.com', '_blank');
                }}
              >
                <LabelPairedEnvelopeMdBoldIcon /> Send an email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
