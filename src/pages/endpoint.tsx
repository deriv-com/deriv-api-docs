import React from 'react';
import Layout from '@theme/Layout';
import EndpointPage from '../features/Endpoint/Endpoint';
import BrowserOnly from '@docusaurus/BrowserOnly';

const Endpoint = () => {
  return (
    <Layout title='Endpoint' description='Deriv API documentation'>
      <main>
        <BrowserOnly>{() => <EndpointPage />}</BrowserOnly>
      </main>
    </Layout>
  );
}

export default Endpoint;
