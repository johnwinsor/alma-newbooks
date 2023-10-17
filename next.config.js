/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/monitor',
    images: {
        domains: ['covers.openlibrary.org', 'www.googleapis.com','books.google.com'],
    },
}

module.exports = nextConfig
