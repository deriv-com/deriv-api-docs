import React from 'react';
import { LabelPairedCopyLgRegularIcon } from '@deriv/quill-icons';
import { Text } from '@deriv-com/quill-ui';
import styles from './cell-copy-text.module.scss';

const CopyTextCell: React.FC<{
  cell: {
    value: React.ReactNode;
  };
}> = ({ cell }) => {
  return (
    <React.Fragment>
      {cell.value ? (
        <div
          className={styles.copyText}
          onClick={() => {
            navigator.clipboard.writeText(cell.value.toString());
          }}
        >
          <Text>{cell.value}</Text>
          <span className={styles.copyTextIcon}>
            <LabelPairedCopyLgRegularIcon />
          </span>
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default CopyTextCell;
