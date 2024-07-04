import React, { HTMLAttributes, useEffect, useState, useCallback } from 'react';
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
import ResponsiveTable from './responsive-table';
import DeleteAppDialog from '../Dialogs/DeleteAppDialog';
import useAppManager from '@site/src/hooks/useAppManager';
import useDeviceType from '@site/src/hooks/useDeviceType';

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
  const { deviceType } = useDeviceType();
  const is_desktop = deviceType === 'desktop';
  const [tableHeight, setTableHeight] = useState<number>(0);

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

  const renderTable = () => {
    return is_desktop ? (
      <Table data={tokens} columns={tokenTableColumns} parentClass='api_token_table' />
    ) : (
      <ResponsiveTable tokens={tokens} accordionActions={getActionObject} />
    );
  };

  return (
    <div
      className={clsx('api_table', {
        mobile: !is_desktop,
      })}
    >
      <div style={{ height: `auto` }} className={styles.api_table_container}>
        <div className={styles.api_table} {...props}>
          <div className={styles.api_table__header}>
            <div className={styles.api_table__header__texts}>
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

          {isDeleteOpen && <DeleteAppDialog appId={actionToken.app_id} onClose={onCloseDelete} />}
          {tokens?.length ? renderTable() : null}
          {isLoadingTokens && <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default ApiTokenTable;
