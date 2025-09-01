/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Enable typescript
    ignoreBuildErrors: false,
  },
  eslint: {
    // Enable ESLint
    ignoreDuringBuilds: false,
  },
  env: {
    // Pass environment variables to the frontend
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
  // Configure to work with separate Express backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Backend running on port 5000
      },
    ];
  },
};

export default nextConfig;