/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Auto-serve AVIF/WebP for <Image> components
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // cache 7 hari
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cbzjanjnysigrtilzmze.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Kompres semua response dengan gzip/brotli
  compress: true,
  // Hilangkan header X-Powered-By (minor security)
  poweredByHeader: false,
};

export default nextConfig;
