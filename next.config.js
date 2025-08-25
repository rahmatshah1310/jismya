/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  images: {
    domains: ["res.cloudinary.com"], // ✅ must be inside images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // ✅ allow all Cloudinary images
      },
    ],
  },
}

module.exports = nextConfig
