import React from 'react';
import { useForm } from 'react-hook-form';
import { getAppId } from '@site/src/utils';
import { DEFAULT_WS_SERVER } from '@site/src/utils/constants';
import styles from './Endpoint.module.scss';
import Translate, { translate } from '@docusaurus/Translate';
import { getCurrentLanguage } from '@site/src/utils/language-utils';
import { Text, Button, Heading, TextField, CodeText } from '@deriv-com/quill-ui';

interface IEndpointFormValues {
  app_id: string;
  server_url: string;
}
const EndPoint = () => {
  const default_endpoint = {
    app_id: getAppId(),
    server_url: DEFAULT_WS_SERVER,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEndpointFormValues>({
    mode: 'all',
    defaultValues: {
      server_url: localStorage.getItem('config.server_url') ?? default_endpoint.server_url,
      app_id: localStorage.getItem('config.app_id') ?? default_endpoint.app_id,
    },
  });

  const refreshWhenSubmitted = () => window.location.reload();

  const onSubmit = (data: IEndpointFormValues) => {
    localStorage.setItem('config.app_id', data.app_id);
    localStorage.setItem('config.server_url', data.server_url);
    refreshWhenSubmitted();
  };

  const onResetClicked = () => {
    localStorage.removeItem('config.app_id');
    localStorage.removeItem('config.server_url');
    refreshWhenSubmitted();
  };

  const server_url = localStorage.getItem('config.server_url') ?? default_endpoint.server_url;
  const app_id = localStorage.getItem('config.app_id') ?? default_endpoint.app_id;
  const current_url = `wss://${server_url}/websockets/v3?app_id=${app_id}&l=${getCurrentLanguage()}&brand=deriv`;

  return (
    <React.Fragment>
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)} aria-label='form'>
          <div className={styles.pageContent}>
            <Heading.H2 centered>
              <Translate>Change API endpoint</Translate>
            </Heading.H2>
            <div className={styles.content}>
              <div className={styles.customTextInput} id='custom-text-input'>
                <div className={styles.inputField}>
                  <TextField
                    value={server_url}
                    label={<Translate>Server URL</Translate>}
                    {...register('server_url', {
                      required: {
                        value: true,
                        message: translate({ message: 'Server is Required' }),
                      },
                      pattern: {
                        value: /^([\w-]+\.)+[\w-]+(`[\w- ;,./?%&=])*?$/, // TODO: it's better to check if the server url contains qa or not ( for qa box server urls )
                        message: translate({ message: 'Please enter a valid server URL' }),
                      },
                    })}
                    name='server_url'
                    placeholder='e.g. ws.derivws.com'
                    required
                    status={errors.server_url ? 'error' : null}
                  />
                  {errors.server_url && (
                    <div data-testid='server_error' className={styles.errorMessage}>
                      {errors.server_url.message}
                    </div>
                  )}
                </div>
                <div className={styles.inputField}>
                  <TextField
                    value={app_id}
                    label={<Translate>App ID</Translate>}
                    {...register('app_id', {
                      required: {
                        value: true,
                        message: translate({ message: 'App ID is required' }),
                      },
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: translate({ message: 'Please enter a valid app ID' }),
                      },
                    })}
                    name='app_id'
                    placeholder='e.g. 9999'
                    required
                    status={errors.app_id ? 'error' : null}
                  />
                  {errors.app_id && (
                    <div data-testid='app_id_error' className={styles.errorMessage}>
                      {errors.app_id.message}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.currentUrl}>
                <Text bold className={styles.urlLabel}>
                  <Translate>Connected to :</Translate>
                </Text>
                <CodeText>{current_url}</CodeText>
              </div>
              <div className={styles.buttons}>
                <Button
                  type='submit'
                  color='coral'
                  size='md'
                  variant='primary'
                  disabled={Object.keys(errors).length > 0}
                  label={<Translate>Submit</Translate>}
                />
                <Button
                  type='reset'
                  onClick={onResetClicked}
                  label={<Translate>Reset to original settings</Translate>}
                  size='md'
                  variant='secondary'
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default EndPoint;
