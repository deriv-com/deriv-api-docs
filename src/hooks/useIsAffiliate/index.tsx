import useWS from '@site/src/hooks/useWs';
import { useCallback } from 'react';

export const useIsAffiliate = () => {
  const { data, send, is_loading } = useWS('partner_accounts');

  const isAffiliate = useCallback(async () => {
    await send({ partner_accounts: 1 });
  }, [send]);

  return {
    isLoading: is_loading,
    isAffiliate,
    data,
  };
};
