import React from 'react';
import { LabelPairedCopyLgRegularIcon } from '@deriv/quill-icons';
import { Text } from '@deriv-com/quill-ui';
import Translate from '@docusaurus/Translate';
import styles from './cell-copy-text.module.scss';

const CopyTextCell: React.FC<{
  cell: {
    value: React.ReactNode;
  };
}> = ({ cell: { value } }) => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(value.toString());
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 1000);
  }, [value]);

  return (
    <React.Fragment>
      {value && (
        <div className={styles.copyText} onClick={handleCopy}>
          <Text>{value}</Text>
          <span className={styles.copyTextIcon}>
            <LabelPairedCopyLgRegularIcon />
            {tooltipVisible && (
              <div className={`${styles.tooltip} ${tooltipVisible ? styles.visible : ''}`}>
                <Translate>Copied</Translate>
              </div>
            )}
          </span>
        </div>
      )}
    </React.Fragment>
  );
};

export default CopyTextCell;
