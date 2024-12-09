import { useEffect, useState } from 'react';
import { parse } from 'yaml';

interface Method {
  name: string;
  title: string;
}

interface Group {
  label: string;
  methods: Method[];
}

interface YamlContent {
  groups: Group[];
}

type TUseEndpoints = {
  playground_request: Method[];
};

const useEndpoints = (): TUseEndpoints => {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    getEndpointInfo();
  }, []);

  const getEndpointInfo = async () => {
    try {
      const filePath = '/data/v3.yml';

      const fileContents = await fetch(filePath)
        .then((response) => response.text())
        .then((result) => result);

      const yamlContent: YamlContent = parse(fileContents) as YamlContent;

      const endpoints = yamlContent.groups.flatMap((group) => group.methods);

      setEndpoints(endpoints);
    } catch (error) {
      console.log(error);
      setEndpoints([]);
    }
  };

  return { playground_request: endpoints };
};

export default useEndpoints;
