import React from 'react';
import AppsTable from '../components/apps-table';
import LoadingTable from '../components/loading-table';
import { ApplicationObject } from '@deriv/api-types';

const AppManagePage: React.FC<{ apps: ApplicationObject[] }> = ({ apps }) => {
  return apps ? <AppsTable apps={apps} /> : <LoadingTable rowCount={5} />;
};
export default AppManagePage;
