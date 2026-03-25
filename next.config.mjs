import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60 * 60 * 24 * 30,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion']
    }
};

export default withNextIntl(nextConfig);
