import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'http',
        hostname:process.env.LOCAL_DOMAIN!
      },
      {
        protocol:'https',
        hostname:process.env.DOMAIN!
      }
    ]
  },
  crossOrigin: 'use-credentials'

};

export default nextConfig;
