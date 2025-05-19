import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com", 'upload.wikimedia.org', // necesario para imágenes de Wikipedia
    ],
  },
}

export default nextConfig
