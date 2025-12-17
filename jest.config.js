/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!src/configs/**',
    '!src/pages/**', // TODO: Fix the docusuarus module naming
    '!src/theme/**', // TODO: Fix the docusuarus module naming
    '!src/test-utils.tsx',
  ],
  coverageDirectory: './coverage/',
  coverageReporters: ['lcov'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)sx?$': [
      'ts-jest',
      {
        diagnostics: false,
      },
    ],
    '^.+\\.mjs$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@docusaurus|swiper|ssr-window|dom7)|@theme|@deriv-com/quill-ui|@deriv-com/auth-client)',
  ],
  moduleNameMapper: {
    '@theme/(.*)': '@docusaurus/theme-classic/src/theme/$1',

    '@docusaurus/(ErrorBoundary|BrowserOnly|ComponentCreator|constants|ExecutionEnvironment|Head|Interpolate|isInternalUrl|Link|Noop|renderRoutes|router|Translate|use.*)':
      '@docusaurus/core/lib/client/exports/$1',

    '@generated/(.*)': '<rootDir>/__mocks__/@generated/$1',

    '@docusaurus/plugin-content-docs/client': '@docusaurus/plugin-content-docs/src/client/index.ts',
    '@site/(.*)': '<rootDir>/$1',
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    '@deriv-com/quill-ui': 'node_modules/@deriv-com/quill-ui/dist/main.js',
    '\\.(svg)$': '<rootDir>/src/__mocks__/file.mock.ts',
  },

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs', 'json'],
  rootDir: '.',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
