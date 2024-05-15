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
    '^.+\\.(j|t)sx?$': 'ts-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@docusaurus|swiper|ssr-window|dom7)|@theme|@deriv/quill-design)',
  ],
  moduleNameMapper: {
    '@theme/(.*)': '@docusaurus/theme-classic/src/theme/$1',

    '@docusaurus/(ErrorBoundary|BrowserOnly|ComponentCreator|constants|ExecutionEnvironment|Head|Interpolate|isInternalUrl|Link|Noop|renderRoutes|router|Translate|use.*)':
      '@docusaurus/core/lib/client/exports/$1',

    '@generated/(.*)': '<rootDir>/.docusaurus/$1',

    '@docusaurus/plugin-content-docs/client': '@docusaurus/plugin-content-docs/src/client/index.ts',
    '@site/(.*)': '<rootDir>/$1',
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs', 'json'],
  rootDir: '.',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
