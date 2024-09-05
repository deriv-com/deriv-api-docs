import React from 'react';
import styles from './scopes.cell.module.scss';

type TScopesCellProps = {
  cell: {
    value: string[];
  };
};

const SCOPES_ORDER = ['admin', 'read', 'payments', 'trade', 'trading_information'];

const ScopesCell: React.FC<TScopesCellProps> = ({ cell }) => (
  <>
    {cell.value
      .sort((a, b) => {
        return SCOPES_ORDER.indexOf(a) - SCOPES_ORDER.indexOf(b);
      })
      .map((scopes: string): React.ReactElement => {
        return (
          <span
            key={scopes}
            className={`${styles.scope} ${scopes === 'admin' ? styles.adminScope : ''}`}
          >
            {scopes.charAt(0).toUpperCase() + scopes.slice(1).replace('_', ' ')}
          </span>
        );
      })}
  </>
);

export default ScopesCell;
