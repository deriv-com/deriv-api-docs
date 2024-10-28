import { CmsBackend } from 'netlify-cms-core';

const cms_backend: CmsBackend = {
  name: 'github',
  repo: 'deriv-com/deriv-api-docs',
  branch: 'master',
  base_url: 'https://deriv-cms-external-oauth.binary.sx',
  auth_endpoint: 'api/begin',
  auth_scope: 'repo',
  open_authoring: true,
  cms_label_prefix: 'content/',
};

export default cms_backend;
