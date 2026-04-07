import React from 'react';
import Layout from '@theme/Layout';
import UpdatesFeature from '../features/Updates';

export default function Updates(): JSX.Element {
  return (
    <Layout
      title="What's New"
      description='Far more secure, powered by OAuth 2.0, and a streamlined developer experience.'
      noFooter={true}
      wrapperClassName='updates_page_wrapper'
    >
      <UpdatesFeature />
    </Layout>
  );
}
