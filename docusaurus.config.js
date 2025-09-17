// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const { themes } = require('prism-react-renderer');
const lightTheme = themes.nightOwlLight;
const darkTheme = themes.vsDark;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Deriv API',
  tagline: 'Create your own apps',
  url: 'https://api.deriv.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'deriv-com', // Usually your GitHub org/user name.
  projectName: 'deriv-api-docs', // Usually your repo name.

  // Add scripts to be loaded in the head
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@deriv-com/marketing-utils@2.0.7/dist/cookie.js',
      async: true,
    },
  ],

  customFields: {
    trackJsToken: process.env.TRACKJS_TOKEN,
    rudderstackKey: process.env.RUDDERSTACK_KEY,
    growthbookClientKey: process.env.GROWTHBOOK_CLIENT_KEY,
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    localeConfigs: {
      en: {
        label: 'English',
      },
    },
  },

  plugins: [
    '@docusaurus/theme-live-codeblock',
    'docusaurus-plugin-sass',
    require.resolve('./plugins/custom-webpack-plugin'),
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: [require.resolve('./src/styles/index.scss')],
        },
        googleTagManager: {
          containerId: 'GTM-NF7884S',
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Deriv API logo',
          src: 'img/derivlogo.svg',
        },
        items: [
          {
            to: 'https://deriv.com',
            position: 'left',
            label: 'Deriv.com',
            className: 'mobile-only-menu-item deriv-com-link',
          },
          {
            to: '#',
            position: 'left',
            label: "Trader's hub",
            className: 'mobile-only-menu-item traders-hub-link',
          },
          {
            to: '#',
            position: 'left',
            label: "Partner's hub",
            className: 'mobile-only-menu-item partners-hub-link',
          },
          {
            to: '/dashboard',
            position: 'left',
            label: 'Dashboard',
            className: 'mobile-only-menu-item',
          },
          {
            to: 'api-explorer',
            position: 'left',
            label: 'API explorer',
          },
          {
            to: 'https://developers.deriv.com',
            label: 'Documentation',
            position: 'left',
            className: 'external-nav-link',
          },
          {
            to: 'https://tech.deriv.com/',
            label: 'Deriv tech',
            position: 'left',
            className: 'external-nav-link',
          },
          {
            to: 'https://hackerone.com/deriv?type=team',
            label: 'Bug bounty',
            position: 'left',
            className: 'external-nav-link bug-bounty-link',
          },
          {
            type: 'custom-user-navbar-item',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'custom-user-menu',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['bash', 'diff', 'json'],
      },
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: 'bottom',
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
};

module.exports = config;
