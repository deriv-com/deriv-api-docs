import React from 'react';
import AppsTable from '../components/AppsTable';
import LoadingTable from '../components/LoadingTable';
import { ApplicationObject } from '@deriv/api-types';

const AppManagePage: React.FC<{ apps: ApplicationObject[] }> = ({ apps }) => {
  return (
    <div className='manageApps'>
      {apps ? <AppsTable apps={apps} /> : <LoadingTable rowCount={5} />}
    </div>
  );
};

export default AppManagePage;
