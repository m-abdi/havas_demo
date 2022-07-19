/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error'],
          }
        : false,
  },
  experimental: {
    output: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/users/login',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</fonts/Vazir.woff2>; rel=preload; as=font',
          },
          {
            key: 'Link',
            value: '</fonts/Vazir_Bold.woff2>; rel=preload; as=font',
          },
        ],
      },
      {
        source: '/users/login',
        headers: [
          {
            key: 'Link',
            value: '</images/login-bg.svg>; rel=preload; as=image',
          },
        ],
      },
    ];
  },
};
