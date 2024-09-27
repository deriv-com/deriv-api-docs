import React from 'react';
import Layout from '@theme/Layout';
import { AppManager } from '@site/src/features/dashboard';

export default function AppRegistrationPage() {
  return (
    <Layout title='Dashboard' description='Manage your apps and api tokens'>
      <main>
        <AppManager />
      </main>
    </Layout>
  );
}
