import React from 'react';
import { Breadcrumbs, Heading } from '@deriv-com/quill-ui';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useDynamicImportJSON from '@site/src/hooks/useDynamicImportJSON';
import Footer from '@site/src/components/Footer';
import { Dropdown } from './Dropdown/Dropdown';
import SchemaWrapper from './Schema/SchemaWrapper';
import RequestJSONBox from './RequestJSONBox';
import styles from './styles.module.scss';
import AccountSwitcher from '@site/src/components/AccountSwitcher';
import useAuthContext from '@site/src/hooks/useAuthContext';
import useEndpoints from '@site/src/hooks/useEndpoints';

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
  const { is_logged_in } = useAuthContext();

  const { Endpoints } = useEndpoints();
  console.log(Endpoints);

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
      <div className='container'>
        <div className='breadcrumbs-wrapper'>
          <Breadcrumbs
            links={[
              {
                content: translate({ message: 'Home' }),
                href: locale_Links.root,
                target: '_self',
              },
              {
                content: translate({ message: 'API explorer' }),
                href: '/api-explorer',
                target: '_self',
              },
            ]}
            size='md'
          />
        </div>
        <div className={styles.playgroundContent}>
          <Heading.H2 centered><Translate>API Explorer</Translate></Heading.H2>
          <div className={styles.pageWrapper}>
            <div className={styles.playground}>
              <div className={styles.playgroundPageWrapper}>
                <div className={styles.playgroundApiJson}>
                  <div className={styles.playgroundSelectionWrapper}>
                    <Dropdown
                      selected_value={text_data.selected_value}
                      handleChange={handleSelectChange}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    {is_logged_in && <AccountSwitcher />}
                  </div>
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
        </div>
      </div>
      <Footer />
    </>
  );
}
