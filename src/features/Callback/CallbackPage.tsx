import React from 'react';
import { Callback } from '@deriv-com/auth-client';
import { transformAccountsFromResponseBody } from '@site/src/utils';
import useAuthContext from '@site/src/hooks/useAuthContext';

const CallbackPage = () => {
  const { updateLoginAccounts } = useAuthContext();

  return (
    <Callback
      onSignInSuccess={(tokens) => {
        const accounts = transformAccountsFromResponseBody(tokens);

        updateLoginAccounts(accounts);

        window.location.href = '/';
      }}
    />
  );
};

export default CallbackPage;
