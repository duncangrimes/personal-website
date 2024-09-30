import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: `${process.env.VERCEL_BLOB_HOSTNAME}`,
          port: '',
        },
      ],
    },
  };
export default nextConfig;