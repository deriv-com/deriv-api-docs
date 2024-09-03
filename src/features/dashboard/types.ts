import { translate } from '@docusaurus/Translate';
import * as yup from 'yup';

const markupPercentageRegex = /^((([0-2]\.([0-9]([0-9])?)?))||([3]\.([0]([0])?)?)||([0-3]))$/;
const urlRegex = /^[a-z][a-z0-9.+-]*:\/\/[0-9a-zA-Z.-]+[%/\w .-]*$/;

const base_schema = {
  name: yup
    .string()
    .required('Enter your app name.')
    .max(48, 'Your app name cannot exceed 48 characters.')
    .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9_ ]*$/, {
      message: translate({
        message:
          'Only alphanumeric characters with spaces and underscores are allowed. (Example: my_application)',
      }),
      excludeEmptyString: true,
    })
    .matches(
      /^(?!.*deriv|.*d3r1v|.*der1v|.*d3riv|.*b1nary|.*binary|.*b1n4ry|.*bin4ry|.*blnary|.*b\|nary).*$/i,
      {
        message: translate({
          message: 'The name cannot contain “Binary”, “Deriv”, or similar words.',
        }),
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
    .string()
    .max(
      4,
      translate({
        message: 'Your markup value cannot be more than 4 characters.',
      }),
    )
    .matches(
      markupPercentageRegex,
      translate({
        message: 'Your markup value must be equal to or above 0.00 and no more than 3.00.',
      }),
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
