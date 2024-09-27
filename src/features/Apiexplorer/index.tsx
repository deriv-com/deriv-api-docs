import { Text } from '@deriv/ui';
import { Breadcrumbs } from '@deriv-com/quill-ui';
import React from 'react';
import { Dropdown } from './Dropdown/Dropdown';
import styles from './styles.module.scss';
import SchemaWrapper from './Schema/SchemaWrapper';
import RequestJSONBox from './RequestJSONBox';
import useDynamicImportJSON from '@site/src/hooks/useDynamicImportJSON';
import Footer from '@site/src/components/Footer';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
export default function ApiExplorerFeatures() {
  const {
    text_data,
    selected,
    setSelected,
    handleSelectChange,
    request_info,
    response_info,
    handleTextAreaInput,
  } = useDynamicImportJSON();
  const has_info = Object.keys(request_info).length === 0;
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const locale_Links = React.useMemo(() => {
    const is_en = currentLocale === 'en';
    const get_url = (path: string) => {
      const pathInfo = `${!is_en ? `/${currentLocale}` : ''}/${path}`;
      return pathInfo;
    };
    return {
      root: get_url(''),
    };
  }, [currentLocale]);

  return (
    <>
      <div className='breadcrumbs_wrapper'>
        <Breadcrumbs
          links={[
            {
              content: <Translate>Home</Translate>,
              href: locale_Links.root,
              target: '_self',
            },
            {
              content: <Translate>API explorer</Translate>,
              href: '/api-explorer',
              target: '_self',
            },
          ]}
          size='md'
        />
      </div>
      <div className={styles.playgroundContent}>
        <Text type='heading-2' as='h1' className={styles.heading}>
          <Translate>API Explorer</Translate>
        </Text>
        <div className={styles.pageWrapper}>
          <div className={styles.playground}>
            <div className={styles.playgroundPageWrapper}>
              <div className={styles.playgroundApiJson}>
                <Dropdown
                  selected_value={text_data.selected_value}
                  handleChange={handleSelectChange}
                  selected={selected}
                  setSelected={setSelected}
                />
                <RequestJSONBox
                  request_example={text_data.request}
                  handleChange={handleTextAreaInput}
                  name={text_data.name}
                  auth={request_info.auth_required}
                />
              </div>
              {!has_info && (
                <div
                  id='playground'
                  data-testid='playgroundDocs'
                  className={styles.playgroundApiDocs}
                >
                  <div className={styles.schemaContainer}>
                    <SchemaWrapper info={request_info} />
                  </div>
                  <div className={styles.schemaContainer}>
                    <SchemaWrapper info={response_info} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
