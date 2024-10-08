import React, { useEffect, useState } from 'react';
import { Column } from 'react-table';
import { Button, Heading, Text } from '@deriv-com/quill-ui';
import { LabelPairedCirclePlusMdRegularIcon } from '@deriv/quill-icons';
import Translate, { translate } from '@docusaurus/Translate';
import { TTokenType } from '@site/src/types';
import { TDashboardTab } from '@site/src/contexts/app-manager/app-manager.context';
import Spinner from '@site/src/components/Spinner';
import useApiToken from '@site/src/hooks/useApiToken';
import useDeviceType from '@site/src/hooks/useDeviceType';
import useAppManager from '@site/src/hooks/useAppManager';
import AccountSwitcher from '@site/src/components/AccountSwitcher';
import ScopesCell from '../common-table/cell-scopes';
import Table from '../common-table';
import ApiTokenCell from './cell-token';
import ApiLastUsedCell from './cell-last-used';
import TokenActionsCell from './cell-delete-token';
import AccountTypeCell from './cell-account-type';
import ResponsiveTable from './responsive-table';
import styles from './api-table.module.scss';

export type TTokenColumn = Column<TTokenType>;

const tableColumns: TTokenColumn[] = [
  {
    Header: translate({ message: 'Name' }),
    accessor: 'display_name',
    width: '25%',
    minWidth: 200,
  },
  {
    Header: translate({ message: 'Account Type' }),
    Cell: AccountTypeCell,
    width: '15%',
  },
  {
    Header: translate({ message: 'Token' }),
    accessor: 'token',
    Cell: ApiTokenCell,
    width: '15%',
  },
  {
    Header: translate({ message: 'Token scopes' }),
    accessor: 'scopes',
    Cell: ScopesCell,
    width: '20%',
    maxWidth: 300,
  },
  {
    Header: translate({ message: 'Last used' }),
    accessor: 'last_used',
    Cell: ApiLastUsedCell,
    width: '15%',
  },
  {
    Header: translate({ message: 'Actions' }),
    id: 'actions',
    accessor: (originalRow) => originalRow.token,
    Cell: ({ row }) => <TokenActionsCell tokenId={row.original.token} flex_end />,
    width: '5%',
  },
];

const ApiTokenTable = () => {
  const { tokens, isLoadingTokens } = useApiToken();
  const [isAccountChange, setAccountChange] = useState(false);
  const { deviceType } = useDeviceType();
  const is_desktop = deviceType === 'desktop';
  const { updateCurrentTab } = useAppManager();

  const onChange = () => {
    setAccountChange(true);
  }

  useEffect(() => {
    setAccountChange(false);
  }, [tokens]);

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
          <AccountSwitcher onChange={onChange}/>
        </div>
      </div>

      {isAccountChange || isLoadingTokens ? ( <Spinner /> ) 
      : tokens.length > 0 && ( renderTable() )}
    </div>
  );
};

export default ApiTokenTable;
