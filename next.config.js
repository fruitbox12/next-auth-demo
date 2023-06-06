/** @type {import('next').NextConfig} */
const nextConfig = {	reactStrictMode: false,
	typescript: {
	  ignoreBuildErrors: true,
	},
	eslint: {
        ignoreDuringBuilds: true,
    },
  };
  
  experimental: {
    appDir: true
  },
  images: {
    domains: ['github.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
