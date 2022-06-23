module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',

    'storybook-css-modules',
  ],
  framework: '@storybook/react',
  staticDirs: ['../public'],

  core: {
    builder: '@storybook/builder-webpack5',
  },
};