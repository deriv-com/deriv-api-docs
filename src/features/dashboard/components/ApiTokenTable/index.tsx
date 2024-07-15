import React, { HTMLAttributes, useEffect, useState } from 'react';
import Spinner from '@site/src/components/Spinner';
import styles from './api-table.module.scss';
import useApiToken from '@site/src/hooks/useApiToken';
import { Column } from 'react-table';
import ApiTokenCell from './table.token.cell';
import ApiLastUsedCell from './table.lastused.cell';
import { TTokenType } from '@site/src/types';
import ScopesCell from '../Table/scopes.cell';
import TokenActionsCell from './delete.token.cell';
import AccountTypeCell from './account.type.cell';
import Table from '../Table';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import { LabelPairedCirclePlusMdRegularIcon } from '@deriv/quill-icons';
import ResponsiveTable from './responsive-table';
import useDeviceType from '@site/src/hooks/useDeviceType';

export type TTokenColumn = Column<TTokenType>;

const tokenTableColumns = (): TTokenColumn[] => [
  {
    Header: 'Name',
    accessor: 'display_name',
  },
  {
    Header: 'Account Type',
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
    accessor: (originalRow) => originalRow.token,
    Cell: ({ row }) => <TokenActionsCell tokenId={row.original.token} flex_end />,
  },
];

const ApiTokenTable = (props: HTMLAttributes<HTMLDivElement>) => {
  const { tokens, isLoadingTokens } = useApiToken();
  const { deviceType } = useDeviceType();
  const [tableHeight, setTableHeight] = useState(0);

  const renderTable = () => {
    return deviceType === 'desktop' ? (
      <Table data={tokens} columns={tokenTableColumns()} parentClass='api_token_table' />
    ) : (
      <ResponsiveTable tokens={tokens} />
    );
  };

  const ResponsiveDevice = () => {
    if (deviceType === 'tablet') return `${styles.api_table} ${styles.tablet}`;
    if (deviceType === 'mobile') return `${styles.api_table} ${styles.mobile}`;
    return styles.api_table;
  };

  return (
    <div className={ResponsiveDevice()}>
      <div style={{ height: `auto` }} className={styles.api_table_container}>
        <div {...props}>
          <div className={styles.api_table__header}>
            <div className={styles.api_table__header__texts}>
              <Heading.H3>API token manager</Heading.H3>
              <Text size='md'>Access all your API token details here.</Text>
            </div>
            <div className='button-wrap'>
              <Button
                color='coral'
                size='lg'
                variant='primary'
                role='submit'
                iconPosition='start'
                icon={<LabelPairedCirclePlusMdRegularIcon />}
                className={styles.api_table__header__button}
                data-testid='create-new-token-button'
                onClick={() => {
                  //
                }}
              >
                Create new token
              </Button>
            </div>
          </div>

          {tokens?.length ? renderTable() : null}
          {isLoadingTokens && <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default ApiTokenTable;
