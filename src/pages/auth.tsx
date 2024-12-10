import React from 'react';
import Layout from '@theme/Layout';
import { Login } from '../features/Login/Login';
import useAuthParams from '../hooks/useAuthParams';
import { useEffect } from 'react';
import { Redirect, useLocation } from '@docusaurus/router';
import useAuthContext from '../hooks/useAuthContext';

export default function Auth(): JSX.Element {
  const { search } = useLocation(); // to get the search params
  const { is_logged_in } = useAuthContext();
  const { checkUrlParams } = useAuthParams();
  const [redirect_route, setRedirectRoute] = React.useState<string | null>(null);

  useEffect(() => {
    checkUrlParams(search);
  }, [checkUrlParams, search]);

  useEffect(() => {
    if (is_logged_in) {
      const params = new URLSearchParams(search);
      const redirect_route = params.get('route')?.replace(/%2F/g, '/') || '/'; 
      setRedirectRoute(redirect_route);
    }
  }, [is_logged_in, search]);

  if (redirect_route) {
    return <Redirect to={redirect_route} />;
  }

  return (
    <Layout title='Auth' description='Deriv API documentation'>
      <main>
        <Login />
      </main>
    </Layout>
  );
}
