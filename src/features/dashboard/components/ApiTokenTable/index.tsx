import React, { HTMLAttributes } from 'react';
import { Column } from 'react-table';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import { LabelPairedCirclePlusMdRegularIcon } from '@deriv/quill-icons';
import Translate from '@docusaurus/Translate';
import { TTokenType } from '@site/src/types';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import Spinner from '@site/src/components/Spinner';
import useApiToken from '@site/src/hooks/useApiToken';
import useDeviceType from '@site/src/hooks/useDeviceType';
import useAppManager from '@site/src/hooks/useAppManager';
import AccountSwitcher from '@site/src/components/AccountSwitcher';
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
    Header: <Translate>Name</Translate>,
    accessor: 'display_name',
  },
  {
    Header: <Translate>Account Type</Translate>,
    Cell: AccountTypeCell,
  },
  {
    Header: <Translate>Token</Translate>,
    accessor: 'token',
    Cell: ApiTokenCell,
  },
  {
    Header: <Translate>Token scopes</Translate>,
    accessor: 'scopes',
    Cell: ScopesCell,
  },
  {
    Header: <Translate>Last used</Translate>,
    accessor: 'last_used',
    Cell: ApiLastUsedCell,
  },
  {
    Header: <Translate>Actions</Translate>,
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
            <Heading.H3>
              <Translate>API token manager</Translate>
            </Heading.H3>
            <Text size='md'>
              <Translate>Access all your API token details here.</Translate>
            </Text>
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
            <span className={styles.api_table__header__button__text}>
              <Translate>Create new token</Translate>
            </span>
          </Button>
        </div>
        <div className={styles.account_switcher}>
          <AccountSwitcher />
        </div>
      </div>

      {tokens?.length ? renderTable() : null}
      {isLoadingTokens && <Spinner />}
    </div>
  );
};

export default ApiTokenTable;
