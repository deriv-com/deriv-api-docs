import React from 'react';
import { Text, Heading, Button } from '@deriv-com/quill-ui';
import styles from '../styles.module.scss';
import Translate, { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import useDeviceType from '@site/src/hooks/useDeviceType';

type ProductInfoProps = {
  product: {
    id: string;
    title: string;
    description: string[];
    imgName: string;
    redirectUrl?: string;
  };
  reverse?: boolean;
};

const ProductInfo = (props: ProductInfoProps) => {
  const { product, reverse = false } = props;
  const { id, title, description, imgName, redirectUrl } = product;

  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';

  return (
    <div
      className={`${clsx({
        [styles.flexReverse]: isMobile || reverse,
        [styles.spaceEvenContent]: isMobile || !reverse,
      })} ${styles.productInfo}`}
      data-testid='product-info'
      id={id}
    >
      <img
        src={`/img/${imgName}.svg`}
        data-testid='product-info-img'
        alt={translate({
          message: title,
        })}
      />
      <div className={styles.mv5}>
        <Heading.H2 className={styles.mh3}>{title}</Heading.H2>
        {description.map((desc, idx) => (
          <Text key={idx}>{desc}</Text>
        ))}
        <div className={`${styles.contentFlex} ${styles.gap1}`}>
          <Button
            variant='primary'
            size='lg'
            className={styles.mh3}
            fullWidth={isMobile}
            onClick={() => location.assign('https://deriv.com/signup/')}
          >
            <Translate>Get started</Translate>
          </Button>
          <Button
            variant='secondary'
            size='lg'
            color='black-white'
            className={`${styles.mh3}`}
            fullWidth={isMobile}
            onClick={() => location.assign(redirectUrl)}
          >
            <Translate>Learn more</Translate>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
