/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images: {
        domains: ['agricart-admin-strapi.onrender.com'],
    }
};

module.exports = {
    async redirects() {
        return [
            {
                source: '/(routes)/checkout/page',
                destination: '/checkout',
                permanent: true,
            },
            {
                source: '/(routes)/my-order/page',
                destination: '/my-order',
                permanent: true,
            },
            {
                source: '/(routes)/order-confermation/page',
                destination: '/order-confermation',
                permanent: true,
            },
            {
                source: '/_not-found/page',
                destination: '/_not-found',
                permanent: true,
            },
            {
                source: '/page',
                destination: '/',
                permanent: true,
            },
        ];
    },
};


export default nextConfig;
