import React from 'react';
import Translate from '@docusaurus/Translate';

type TCustomErrors = {
  token_name_exists: boolean;
  tokens_limit_reached: boolean;
  input_value: string;
};

const CustomErrors = ({ token_name_exists, tokens_limit_reached, input_value }: TCustomErrors) => {
  if (token_name_exists) {
    return (
      <div className='error-message'>
        <p>
          <Translate>That name is taken. Choose another.</Translate>
        </p>
      </div>
    );
  }
  if (tokens_limit_reached && input_value !== '') {
    return (
      <div className='error-message'>
        <p>
          <Translate>You&apos;ve created the maximum number of tokens.</Translate>
        </p>
      </div>
    );
  }

  return <></>;
};

export default CustomErrors;
