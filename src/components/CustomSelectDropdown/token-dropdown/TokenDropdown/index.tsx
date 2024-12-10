import React from 'react';
import useApiToken from '@site/src/hooks/useApiToken';
import useTokenSelector from '@site/src/hooks/useTokenSelector';
import { TTokenType } from '@site/src/types';
import styles from './token_dropdown.module.scss';

const TokenDropdown = ({ admin_only = false }: { admin_only?: boolean }) => {
  const { currentToken, tokens } = useApiToken();
  const { onSelectToken } = useTokenSelector();

  const isAdmin = (token_item: TTokenType) => token_item?.scopes.includes('admin');

  const isNotCurrentToken = (token_item: TTokenType) => {
    const is_not_admin_token = token_item?.token !== currentToken?.token;
    return is_not_admin_token;
  };

  const adminOrAllTokens = (token_item: TTokenType) =>
    admin_only
      ? isNotCurrentToken(token_item) && isAdmin(token_item)
      : isNotCurrentToken(token_item);

  const AdminTokens = ({ item }: { item: TTokenType }) => {
    return (
      <React.Fragment key={item.display_name}>
        {adminOrAllTokens(item) && (
          <div
            tabIndex={0}
            className={styles.customSelectItem}
            role='menuitem'
            onClick={() => onSelectToken(item)}
            onKeyDown={(e) => e.key === 'Enter' && onSelectToken(item)}
          >
            {item.display_name}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {tokens.map((item: TTokenType) => (
        <AdminTokens key={item.token} item={item} />
      ))}
    </React.Fragment>
  );
};

export default TokenDropdown;
