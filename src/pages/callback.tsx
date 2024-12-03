import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import CallbackPage from '../features/Callback';

const Callback = () => {
  useEffect(() => {
    const navbar = document.getElementsByClassName('navbar navbar--fixed-top')[0] as HTMLElement;
    if (navbar) {
      navbar.style.display = 'none';
    }
  }, []);
  return (
    <Layout title='Callback' description=''>
      <main>
        <CallbackPage />
      </main>
    </Layout>
  );
};

export default Callback;
