import React from 'react';
import styles from './cell-scopes.module.scss';
import { translate } from '@docusaurus/Translate';

type TScopesCellProps = {
  cell: {
    value: string[];
  };
};

const SCOPES_ORDER = ['admin', 'read', 'payments', 'trade', 'trading_information'];

const Scopes = {
  admin: translate({ message: 'Admin' }),
  read: translate({ message: 'Read' }),
  payments: translate({ message: 'Payments' }),
  trade: translate({ message: 'Trade' }),
  trading_information: translate({ message: 'Trading Information' }),
};

const ScopesCell: React.FC<TScopesCellProps> = ({ cell }) => (
  <>
    {cell.value
      .sort((a, b) => {
        return SCOPES_ORDER.indexOf(a) - SCOPES_ORDER.indexOf(b);
      })
      .map((item: string): React.ReactElement => {
        return (
          <span
            key={Scopes[item]}
            className={`${styles.scope} ${item === 'admin' ? styles.adminScope : ''}`}
          >
            {Scopes[item]}
          </span>
        );
      })}
  </>
);

export default ScopesCell;
