import React from 'react';
import LoadingTable from '../components/LoadingTable';
import { ApplicationObject } from '@deriv/api-types';
import ApiTokenTable from '../components/ApiTokenTable';

const TokenManagePage: React.FC<{ tokens: ApplicationObject[] }> = ({ tokens }) => {
  return (
    <div className='manageApps'>
      {tokens ? <ApiTokenTable tokens={tokens} /> : <LoadingTable rowCount={6} />}
    </div>
  );
};

export default TokenManagePage;
