module.exports = {
  stories: [
    '../src/**/**/*.stories.mdx',
    '../src/**/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-css-modules',
  ],
  framework: '@storybook/react',
  
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      os: require.resolve('os-browserify/browser'),
    };

    return config;
  },
  statciDirs: ["../public"],
  core: {
    builder: '@storybook/builder-webpack5',
  },
};