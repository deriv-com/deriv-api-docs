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
    btnString?: string;
  };
  reverse?: boolean;
};

const ProductInfo = (props: ProductInfoProps) => {
  const { product, reverse = false } = props;
  const { id, title, description, imgName, btnString } = product;

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
        <Heading.H2 className={styles.mh3}>
          <Translate>{title}</Translate>
        </Heading.H2>
        {description.map((desc, idx) => (
          <Text key={idx}>
            <Translate>{desc}</Translate>
          </Text>
        ))}
        <Button variant='primary' size='lg' className={styles.mh3} fullWidth={isMobile}>
          {btnString || 'Get Started'}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
