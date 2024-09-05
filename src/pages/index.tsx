import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import HomepageFeatures from '@site/src/features/Home';

export default function Home(): JSX.Element {
  return (
    <Layout title='Home' description='Deriv API documentation' wrapperClassName='home_page_wrapper'>
      <Head>
        <title>Deriv API | Customise your trading app</title>
        <meta
          name='description'
          content='Use our trading API to build a trading app that offers comprehensive trading functionalities similar to the Deriv Trader platform.'
        />
      </Head>
      <HomepageFeatures />
    </Layout>
  );
}
