/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/monitor',
    images: {
        domains: ['covers.openlibrary.org', 'www.googleapis.com','books.google.com','pictures.abebooks.com'],
    },
}

module.exports = nextConfig
