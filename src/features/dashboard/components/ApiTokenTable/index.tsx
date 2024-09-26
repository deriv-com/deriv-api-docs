import React, { HTMLAttributes, useState, useEffect } from 'react';
import { Column } from 'react-table';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import { LabelPairedCirclePlusMdRegularIcon } from '@deriv/quill-icons';
import { TTokenType } from '@site/src/types';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import Spinner from '@site/src/components/Spinner';
import useApiToken from '@site/src/hooks/useApiToken';
import useDeviceType from '@site/src/hooks/useDeviceType';
import AccountSwitcher from '@site/src/components/AccountSwitcher';
import ScopesCell from '../Table/scopes.cell';
import Table from '../Table';
import ApiTokenCell from './table.token.cell';
import ApiLastUsedCell from './table.lastused.cell';
import TokenActionsCell from './delete.token.cell';
import AccountTypeCell from './account.type.cell';
import ResponsiveTable from './responsive-table';
import useAppManager from '@site/src/hooks/useAppManager';
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
    minWidth: 300,
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
  const { updateCurrentTab } = useAppManager();
  const [loading, setLoading] = useState(false);

  const handleChange = (accountName: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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
        <div className={styles.api_table__header__wrapper}>
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
              updateCurrentTab(TDashboardTab.REGISTER_TOKENS);
            }}
          >
            <span className={styles.api_table__header__button__text}>Create new token</span>
          </Button>
        </div>
        <div className={styles.account_switcher}>
          <AccountSwitcher onChange={handleChange} />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : isLoadingTokens ? (
        <Spinner />
      ) : tokens?.length ? (
        renderTable()
      ) : null}
    </div>
  );
};

export default ApiTokenTable;
