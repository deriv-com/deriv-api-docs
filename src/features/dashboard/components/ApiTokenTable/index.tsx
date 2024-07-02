import React, { HTMLAttributes, useCallback, useState, useEffect } from 'react';
import Spinner from '@site/src/components/Spinner';
import styles from './api-table.module.scss';
import useApiToken from '@site/src/hooks/useApiToken';
import { Column } from 'react-table';
import ApiTokenCell from './table.token.cell';
import ApiLastUsedCell from './table.lastused.cell';
import TTokenType from '@site/src/types';
import ScopesCell from '../Table/scopes.cell';
import TokenActionsCell from './delete.token.cell';
import AccountTypeCell from './account.type.cell';
import Table from '../Table';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import { LabelPairedCirclePlusMdRegularIcon } from '@deriv/quill-icons';
import clsx from 'clsx';
import DeleteTokenDialog from './DeleteTokenDialog';

export type TTokenColumn = Column<TTokenType>;

const tokenTableColumns: TTokenColumn[] = [
  {
    Header: 'Name',
    accessor: 'display_name',
  },
  {
    Header: 'Account Type',
    accessor: 'account',
    Cell: AccountTypeCell,
  },
  {
    Header: 'Token',
    accessor: 'token',
    Cell: ApiTokenCell,
  },
  {
    Header: 'Scopes',
    accessor: 'scopes',
    Cell: ScopesCell,
  },
  {
    Header: 'Last Used',
    accessor: 'last_used',
    Cell: ApiLastUsedCell,
  },
  {
    Header: 'Actions',
    id: 'actions',
    accessor: (originalRow) => originalRow.app_id,
    Cell: TokenActionsCell,
  },
];

const ApiTokenTable = (props: HTMLAttributes<HTMLDivElement>) => {
  const ROW_HEIGHT = 125;
  const { tokens, isLoadingTokens } = useApiToken();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [actionToken, setActionToken] = useState<TTokenType>();
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    if (tokens.length > 0) {
      setTableHeight(ROW_HEIGHT * tokens.length);
    }
  }, [tokens]);

  const getActionObject = useCallback((token: TTokenType) => {
    return {
      openDeleteDialog: () => {
        setActionToken(token);
        setIsDeleteOpen(true);
      },
    };
  }, []);

  const onCloseDelete = () => {
    setActionToken(null);
    setIsDeleteOpen(false);
  };

  const onDeleteToken = () => {
    onCloseDelete();
  };

  const renderTable = () => {
    return <Table data={tokens} columns={tokenTableColumns} parentClass='api_token_table' />;
  };

  return (
    <div style={{ height: `auto` }} className={styles.api_table_container}>
      <div className={styles.api_table} {...props}>
        <div className={styles.api_table__header}>
          <div className={clsx(styles.api_table__header__texts, 'api_table__header__texts')}>
            <Heading.H3>API token manager</Heading.H3>
            <Text size='md'>Access all your API token details here.</Text>
          </div>
          <Button
            color='coral'
            size='lg'
            variant='primary'
            role='submit'
            iconPosition='start'
            icon={<LabelPairedCirclePlusMdRegularIcon />}
            className={styles.api_table__header__button}
            onClick={() => {
              //
            }}
          >
            Create new token
          </Button>
        </div>

        {isDeleteOpen && (
          <DeleteTokenDialog onDelete={onDeleteToken} setToggleModal={setIsDeleteOpen} />
        )}
        {tokens?.length ? renderTable() : null}
        {isLoadingTokens && <Spinner />}
      </div>
    </div>
  );
};

export default ApiTokenTable;
