/** @type {import('next').NextConfig} */

const nextConfig = {
	experimental: {
    appDir: true
  },
	reactStrictMode: false,
	typescript: {
	  ignoreBuildErrors: true,
	},
	eslint: {
        ignoreDuringBuilds: true,
    },
  };
  
  module.exports = {
	env: {
	},
  };
  
  module.exports = nextConfig;
  
