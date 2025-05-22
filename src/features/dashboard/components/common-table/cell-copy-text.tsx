import React from 'react';
import { LabelPairedCopyLgRegularIcon } from '@deriv/quill-icons';
import { Text } from '@deriv-com/quill-ui';
import { translate } from '@docusaurus/Translate';
import CustomTooltip from '@site/src/components/CustomTooltip';
import styles from './cell-copy-text.module.scss';

const CopyTextCell: React.FC<{
  cell: {
    value: React.ReactNode;
  };
}> = ({ cell: { value } }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(value.toString());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  }, [value]);

  return (
    <React.Fragment>
      {value && (
        <div className={styles.copyText} onClick={handleCopy}>
          <Text>{value}</Text>
          <CustomTooltip
            text={translate({ message: isCopied ? 'Copied' : 'Copy' })}
            open={isCopied || undefined}
          >
            <span className={styles.copyTextIcon}>
              <LabelPairedCopyLgRegularIcon />
            </span>
          </CustomTooltip>
        </div>
      )}
    </React.Fragment>
  );
};

export default CopyTextCell;