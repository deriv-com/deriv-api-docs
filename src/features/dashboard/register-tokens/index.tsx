import React, { useCallback, useState } from 'react';
import useWS from '@site/src/hooks/useWs';
import { scopesObjectToArray } from '@site/src/utils';
import { RegisterAppDialogError } from '../components/Dialogs/RegisterAppDialogError';
import { RegisterAppDialogSuccess } from '../components/Dialogs/RegisterAppDialogSuccess';
import TokenRegister from '../components/TokenRegister';

const TokenRegistration: React.FC = () => {
  return <TokenRegister />;
};

export default TokenRegistration;
