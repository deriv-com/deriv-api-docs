import React, { useState } from 'react';
import { LabelPairedTrashMdRegularIcon } from '@deriv/quill-icons';
import CustomTooltip from '@site/src/components/CustomTooltip';
import useApiToken from '@site/src/hooks/useApiToken';
import DeleteTokenDialog from './DeleteTokenDialog';
import styles from './cells.module.scss';

type TTokenActionsCellProps = {
  tokenId: string;
  flex_end?: boolean;
};

const TokenActionsCell = ({ tokenId }: TTokenActionsCellProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentToken, setCurrentToken] = useState(null);
  const { tokens } = useApiToken();

  const handleDeleteButtonClick = () => {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].token === tokenId) {
        setCurrentToken(tokens[i]);
        setIsDeleteDialogOpen(true);
        break;
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false);
    setCurrentToken(null);
  };

  return (
    <>
      <div className={styles.tokenActions} data-testid={'token-action-cell'}>
        <span
          onClick={handleDeleteButtonClick}
          data-testid={'delete-token-button'}
          className='tooltip-wrapper'
        >
          <CustomTooltip text='Delete token'>
            <LabelPairedTrashMdRegularIcon />
          </CustomTooltip>
        </span>
      </div>
      <DeleteTokenDialog
        token={currentToken}
        onClose={handleCloseDialog}
        isOpen={isDeleteDialogOpen}
      />
    </>
  );
};

export default TokenActionsCell;
