import { UseFormRegisterReturn } from 'react-hook-form';
import * as yup from 'yup';

export const error_map = {
  error_code_1: 'Only alphanumeric characters with spaces and underscores are allowed.',
  error_code_2: 'The name can contain up to 48 characters.',
  error_code_3: 'The name cannot contain “Binary”, “Deriv”, or similar words.',
};

export const base_registration_schema = {
  name: yup
    .string()
    .required('Enter your app name.')
    .max(48, error_map.error_code_2)
    .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_ ]*$/, {
      message: error_map.error_code_1,
      excludeEmptyString: true,
    })
    .matches(
      /^(?!.*deriv|.*d3r1v|.*der1v|.*d3riv|.*b1nary|.*binary|.*b1n4ry|.*bin4ry|.*blnary|.*b\|nary).*$/i,
      {
        message: error_map.error_code_3,
        excludeEmptyString: true,
      },
    ),
  tnc_approval: yup.boolean().oneOf([true], 'You must accept the terms and conditions.'),
};

export type TTermsAndConditionsProps = {
  register: UseFormRegisterReturn<'tnc_approval'>;
};

export const baseAppRegisterSchema = yup.object({
  ...base_registration_schema,
});

export type IBaseRegisterAppForm = yup.InferType<typeof baseAppRegisterSchema>;

export type TAppRegisterProps = {
  submit: (data: IBaseRegisterAppForm) => void;
};

export type TRestrictionsComponentProps = {
  error: string;
};
