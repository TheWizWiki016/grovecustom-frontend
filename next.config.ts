import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com", 'upload.wikimedia.org', // necesario para imágenes de Wikipedia
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 👈 esto evita que ESLint detenga el build
  },
}

export default nextConfig
