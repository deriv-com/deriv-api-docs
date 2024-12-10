import React from 'react';
import useApiToken from '@site/src/hooks/useApiToken';

const SelectedToken = () => {
  const { currentToken } = useApiToken();

  return (
    <React.Fragment>
      {currentToken?.scopes?.includes('admin') && <label>{currentToken.display_name}</label>}
    </React.Fragment>
  );
};

export default SelectedToken;
