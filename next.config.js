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
  async redirects(){
    return [
      {
        source: "/",
        destination: "/users/login",
        permanent: false
      }
    ]
  }
};
