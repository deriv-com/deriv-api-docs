import { useHistory, useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import { TInfo } from '@site/src/types';
import { playground_requests } from '@site/src/utils/playground_requests';
import { useCallback, useEffect, useState } from 'react';

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

  useEffect(() => {
    if (hash) {
      const hash_value = hash.split('#')[1];
      const find_select_value = playground_requests.find((el) => el.name === hash_value);
      const hash_text_data = {
        ...text_data,
        request: JSON.stringify(find_select_value?.body, null, 2),
        selected_value: find_select_value?.title,
        name: hash_value,
      };
      setTextData(hash_text_data);
    }
  }, [hash]);

  const handleTextAreaInput = useCallback((e) =>
    setTextData({ ...text_data, request: e.target.value, name: hash.split('#')[1] }),
    [hash, text_data],
  );

  const handleSelectChange = useCallback((name: string) => {
    history.push(`${pathname}#${name}`);
    const request_body = playground_requests.find((el) => el.name === name);
    const new_text_data = {
      ...text_data,
      selected_value: request_body?.title,
      request: JSON.stringify(request_body?.body, null, 4),
    };
    setTextData({ ...new_text_data });
  },
    [history, pathname, text_data],
  );
  const dynamicImportJSON = useCallback((selected_value: string) => {
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
