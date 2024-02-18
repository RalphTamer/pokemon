/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns:[
        {
          protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
        }
      ]
      },
      // reactStrictMode: false,
};

export default nextConfig;
