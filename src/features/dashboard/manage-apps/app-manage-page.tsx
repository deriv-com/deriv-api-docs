import React from 'react';
import AppsTable from '../components/AppsTable';
import LoadingTable from '../components/LoadingTable';
import { ApplicationObject } from '@deriv/api-types';

const AppManagePage: React.FC<{ apps: ApplicationObject[] }> = ({ apps }) => {
  return apps ? <AppsTable apps={apps} /> : <LoadingTable rowCount={5} />;
};
export default AppManagePage;
