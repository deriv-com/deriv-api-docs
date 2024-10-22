import { translate } from '@docusaurus/Translate';
import { UseFormRegisterReturn } from 'react-hook-form';
import * as yup from 'yup';

export const app_name_error_map = {
  error_code_1: translate({
    message: 'Only alphanumeric characters with spaces and underscores are allowed.',
  }),
  error_code_2: translate({ message: 'The name can contain up to 48 characters.' }),
  error_code_3: translate({
    message: 'The name cannot contain “Binary”, “Deriv”, or similar words.',
  }),
};

export const base_registration_schema = {
  name: yup
    .string()
    .required(translate({ message: 'Enter your app name.' }))
    .max(48, app_name_error_map.error_code_2)
    .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_ ]*$/, {
      message: app_name_error_map.error_code_1,
      excludeEmptyString: true,
    })
    .matches(
      /^(?!.*deriv|.*d3r1v|.*der1v|.*d3riv|.*b1nary|.*binary|.*b1n4ry|.*bin4ry|.*blnary|.*b\|nary).*$/i,
      {
        message: app_name_error_map.error_code_3,
        excludeEmptyString: true,
      },
    ),
  tnc_approval: yup
    .boolean()
    .oneOf([true], translate({ message: 'You must accept the terms and conditions.' })),
};

export type TTermsAndConditionsProps = {
  register: UseFormRegisterReturn<'tnc_approval'>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const baseAppRegisterSchema = yup.object({
  ...base_registration_schema,
});

export type IBaseRegisterAppForm = yup.InferType<typeof baseAppRegisterSchema>;

export type TRestrictionsComponentProps = {
  error: string;
};
