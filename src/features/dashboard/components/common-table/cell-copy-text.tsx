import React, { useState } from 'react';
import { LabelPairedCopyLgRegularIcon } from '@deriv/quill-icons';
import { Text } from '@deriv-com/quill-ui';
import styles from './cell-copy-text.module.scss';

const CopyTextCell: React.FC<{
  cell: {
    value: React.ReactNode;
  };
}> = ({ cell }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cell.value.toString());
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 1000);
  };

  return (
    <React.Fragment>
      {cell.value ? (
        <div className={styles.copyText} onClick={handleCopy}>
          <Text>{cell.value}</Text>
          <span className={styles.copyTextIcon}>
            <LabelPairedCopyLgRegularIcon />
            {tooltipVisible && <div className={`${styles.tooltip} ${tooltipVisible ? styles.visible : ''}`}>Copied</div>}
          </span>
        </div>
      ) : ''}
    </React.Fragment>
  );
};

export default CopyTextCell;
