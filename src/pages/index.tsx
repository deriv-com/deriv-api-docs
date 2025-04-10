import React from 'react';
import Layout from '@theme/Layout';
import CustomLayout from '../components/Layout/CustomLayout';

export default function Home(): JSX.Element {
  return (
    <>
      <Layout
        title={'Home'}
        description='Deriv API documentation'
        wrapperClassName={`home_page_wrapper`}
      >
        <CustomLayout />
      </Layout>
    </>
  );
}
