import React, { HTMLAttributes } from 'react';
import { Column } from 'react-table';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import { LabelPairedCirclePlusMdRegularIcon } from '@deriv/quill-icons';
import { TTokenType } from '@site/src/types';
import Spinner from '@site/src/components/Spinner';
import useApiToken from '@site/src/hooks/useApiToken';
import useDeviceType from '@site/src/hooks/useDeviceType';
import ScopesCell from '../Table/scopes.cell';
import Table from '../Table';
import ApiTokenCell from './table.token.cell';
import ApiLastUsedCell from './table.lastused.cell';
import TokenActionsCell from './delete.token.cell';
import AccountTypeCell from './account.type.cell';
import ResponsiveTable from './responsive-table';
import styles from './api-table.module.scss';

export type TTokenColumn = Column<TTokenType>;

const tableColumns: TTokenColumn[] = [
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
    Header: 'Token scopes',
    accessor: 'scopes',
    Cell: ScopesCell,
  },
  {
    Header: 'Last used',
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
  const is_desktop = deviceType === 'desktop';

  const renderTable = () => {
    return is_desktop ? (
      <Table data={tokens} columns={tableColumns} parentClass='api_token_table' />
    ) : (
      <ResponsiveTable tokens={tokens} />
    );
  };

  return (
    <div className={styles.api_table}>
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
          data-testid='create-new-token-button'
          onClick={() => {
            //
          }}
        >
          <span className={styles.api_table__header__button__text}>Create new token</span>
        </Button>
      </div>

      {tokens?.length ? renderTable() : null}
      {isLoadingTokens && <Spinner />}
    </div>
  );
};

export default ApiTokenTable;
