/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_WEBSITE_URL: "http://localhost:3005",
  },
};

export default nextConfig;