import { useEffect, useState } from 'react';
import useWS from '@site/src/hooks/useWs';

const useServerInfo = () => {
  const [isSiteActive, setSiteActive] = useState(true);

  const { send, data } = useWS('website_status');

  useEffect(() => {
    send();
  }, [send]);

  useEffect(() => {
    if (data) {
      const { site_status } = data;
      if (site_status === 'down') {
        setSiteActive(false);
      }
    }
  }, [data]);

  const serverInfo = {
    siteActive: isSiteActive,
  };
  return serverInfo;
};

export default useServerInfo;
