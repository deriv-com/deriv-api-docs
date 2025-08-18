import useWS from '@site/src/hooks/useWs';
import { useEffect, useState } from 'react';
import { useGetSettings } from '../useGetSettings';

export const useLandingCompany = (is_authorized: boolean) => {
  const { getSettings, data: settingsData } = useGetSettings();
  const { data, send } = useWS('landing_company');
  const [hasRequestedLandingCompany, setHasRequestedLandingCompany] = useState(false);

  // First, always call getSettings on mount
  useEffect(() => {
    is_authorized && getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_authorized]);

  // When settingsData.country_code is available, call landing_company
  useEffect(() => {
    if (settingsData?.country_code && !hasRequestedLandingCompany) {
      send({ landing_company: settingsData.country_code });
      setHasRequestedLandingCompany(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsData?.country_code, send]);

  // isLoading should be false until landing_company is actually called
  const isLoading = !data;

  return {
    isLoading,
    data,
  };
};
