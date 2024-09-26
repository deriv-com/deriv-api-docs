import { translate } from '@docusaurus/Translate';
import * as yup from 'yup';
import { app_name_error_map } from './components/app-register/types';

const urlRegex = /^[a-z][a-z0-9.+-]*:\/\/[0-9a-zA-Z.-]+[%/\w .-]*$/;

const base_schema = {
  name: yup
    .string()
    .required('Enter your app name.')
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
  read: yup.boolean(),
  trade: yup.boolean(),
  payments: yup.boolean(),
  trading_information: yup.boolean(),
  admin: yup.boolean(),
  redirect_uri: yup
    .string()
    .max(
      255,
      translate({
        message: 'Your website URL cannot exceed 255 characters.',
      }),
    )
    .notRequired()
    .matches(urlRegex, {
      message: translate({
        message: 'Enter a valid URL. (Example: https://www.[YourDomainName].com)',
      }),
      excludeEmptyString: true,
    }),
  verification_uri: yup
    .string()
    .max(
      255,
      translate({
        message: 'Your website URL cannot exceed 255 characters.',
      }),
    )
    .notRequired()
    .matches(urlRegex, {
      message: translate({
        message: 'Enter a valid URL. (Example: https://www.[YourDomainName].com)',
      }),
      excludeEmptyString: true,
    }),
  app_markup_percentage: yup
    .number()
    .required()
    .min(0, 'Your markup value must be equal to or above 0.00')
    .max(3, 'Your markup value must be no more than 3.00.')
    .test('is-decimal', 'Your markup value cannot be more than 4 characters.', (value) =>
      value ? /^\d+(\.\d{1,2})?$/.test(value.toString()) : true,
    ),
  app_id: yup.number(),
};

export const appEditSchema = yup.object(base_schema);

export const appRegisterSchema = yup.object({
  ...base_schema,
  currency_account: yup.string(),
  api_token: yup.string(),
});

export type IRegisterAppForm = yup.InferType<typeof appRegisterSchema>;
