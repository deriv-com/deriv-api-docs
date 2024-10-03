import React from 'react';
import Layout from '@theme/Layout';
import Dashboard from '../features/dashboard';

const _Dashboard = () => {
  return (
    <Layout title='Dashboard' description='Manage your apps and api tokens'>
      <main>
        <Dashboard />
      </main>
    </Layout>
  );
}

export default _Dashboard;
