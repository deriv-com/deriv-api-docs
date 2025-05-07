import React from 'react';
import { Callback } from '@deriv-com/auth-client';
import { transformAccountsFromResponseBody } from '@site/src/utils';
import useAuthContext from '@site/src/hooks/useAuthContext';
import { useHistory } from '@docusaurus/router';

const CallbackPage = () => {
  const { updateLoginAccounts } = useAuthContext();
  const history = useHistory();

  return (
    <Callback
      onSignInSuccess={(tokens) => {
        const accounts = transformAccountsFromResponseBody(tokens);
        updateLoginAccounts(accounts);
        history.push('/');
      }}
    />
  );
};
export default CallbackPage;