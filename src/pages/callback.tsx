import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CallbackComponent from '../features/Callback';

export default function LoginCallback(): JSX.Element {
  return (
    <Layout title='Login' description='Login to your Deriv account'>
      <main>
        <BrowserOnly>{() => <CallbackComponent />}</BrowserOnly>
      </main>
    </Layout>
  );
}
