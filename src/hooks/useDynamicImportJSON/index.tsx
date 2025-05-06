import { useHistory, useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import { TInfo } from '@site/src/types';
import { useCallback, useEffect, useState } from 'react';
import useEndpoints from '../useEndpoints';

const useDynamicImportJSON = () => {
  const [text_data, setTextData] = useState({
    request: '',
    selected_value: translate({ message: 'Select API Call - Version 3' }),
    name: null,
  });
  const [selected, setSelected] = useState(translate({ message: 'Select API Call - Version 3' }));
  const [response_info, setResponseInfo] = useState({});
  const [request_info, setRequestInfo] = useState<TInfo>({});
  const history = useHistory();
  const { hash, pathname } = useLocation();
  const { playground_request } = useEndpoints();

  const handleTextAreaInput = useCallback(
    (e) => setTextData({ ...text_data, request: e.target.value, name: hash.split('#')[1] }),
    [hash, text_data],
  );

  const handleSelectChange = useCallback(
    (name: string) => history.push(`${pathname}#${name}`),
    [history, pathname],
  );

  const onHashChange = useCallback(() => {
    if (hash) {
      const hash_value = hash.split('#')[1];
      const find_select_value = playground_request.find((el) => el.name === hash_value);
      if (find_select_value?.name) {
        getSelectedEndpointRequest(find_select_value.name).then((data) => {
          const hash_text_data = {
            ...text_data,
            request: JSON.stringify(data, null, 4),
            selected_value: find_select_value.title,
            name: hash_value,
          };
          setTextData(hash_text_data);
        });
      }
    }
  }, [hash, playground_request]);

  const getSelectedEndpointRequest = async (selected_value: string) => {
    try {
      const module = await import(`../../../config/v3/${selected_value}/example.json`);
      const data = module.default;
      return data;
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const dynamicImportJSON = useCallback(
    (selected_value: string) => {
      import(`../../../config/v3/${selected_value}/send.json`)
        .then((data) => {
          setRequestInfo(data);
        })
        .catch(() => {
          setRequestInfo({});
        });
      import(`../../../config/v3/${selected_value}/receive.json`)
        .then((data) => {
          setResponseInfo(data);
        })
        .catch(() => {
          setResponseInfo({});
        });
    },
    [setRequestInfo, setResponseInfo],
  );

  useEffect(() => {
    onHashChange();
  }, [hash, playground_request]);

  useEffect(() => {
    const hash_value = hash.split('#')[1];
    if (hash_value) {
      dynamicImportJSON(hash_value);
    }
  }, [dynamicImportJSON, hash]);

  return {
    dynamicImportJSON,
    handleSelectChange,
    handleTextAreaInput,
    request_info,
    response_info,
    selected,
    setSelected,
    text_data,
  };
};

export default useDynamicImportJSON;
