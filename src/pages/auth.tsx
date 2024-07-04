import React from 'react';
import Layout from '@theme/Layout';
import { Login } from '../features/Auth/Login/Login';
import useAuthParams from '../hooks/useAuthParams';
import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import useAuthContext from '../hooks/useAuthContext';

export default function Auth(): JSX.Element {
  const { search } = useLocation(); // to get the search params
  const { is_logged_in } = useAuthContext();
  const { checkUrlParams } = useAuthParams();

  useEffect(() => {
    checkUrlParams(search);
  }, [checkUrlParams, search]);

  useEffect(() => {
    if (is_logged_in) {
      const params = new URLSearchParams(search);
      const redirect_route = params.get('route')?.replace(/%2F/g, '/') || '/';
      window.location.assign(window.location.origin + redirect_route);
    }
  }, [is_logged_in, search]);

  return (
    <Layout title='Auth' description='Deriv API documentation'>
      <main>
        <Login />
      </main>
    </Layout>
  );
}
