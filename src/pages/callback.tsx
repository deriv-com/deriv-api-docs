import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import CallbackPage from '../features/Callback';
const Callback = () => {
  useEffect(() => {
    const navbar = document.getElementsByClassName('navbar navbar--fixed-top')[0] as HTMLElement;
    if (navbar) {
      navbar.style.display = 'none';
    }
    const metaTag = document.createElement('meta');
    metaTag.name = 'robots';
    metaTag.content = 'noindex, nofollow';
    document.head.appendChild(metaTag);
    return () => {
      document.head.removeChild(metaTag);
    };
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
