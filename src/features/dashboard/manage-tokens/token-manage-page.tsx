import React from 'react';
import ApiTokenTable from '../components/ApiTokenTable';

const TokenManagePage: React.FC = () => {
  return (
    <div className='manageApps'>
      <ApiTokenTable />
    </div>
  );
};

export default TokenManagePage;
