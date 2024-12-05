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
  Endpoints: Method[];
};

const useEndpoints = (): TUseEndpoints => {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    getEndpointInfo();
  }, []);

  const getEndpointInfo = async () => {
    try {
      const filePath = '/_data/v3.yml';

      const fileContents = await fetch(filePath)
        .then((response) => response.text())
        .then((result) => result)
        .catch((e) => {
          console.error(e);
          return '';
        });

      // Step 2: Parse the YAML content
      const yamlContent: YamlContent = parse(fileContents) as YamlContent;

      // Step 3: Extract methods and convert to JSON object array
      const endpoints = yamlContent.groups.flatMap((group) => group.methods);
      
      setEndpoints(endpoints);
    } catch (error) {
      console.log(error);
      setEndpoints([]);
    }
  };

  return { Endpoints: endpoints };
};

export default useEndpoints;
