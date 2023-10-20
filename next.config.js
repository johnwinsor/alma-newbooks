/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/monitor',
    images: {
        domains: ['covers.openlibrary.org', 'www.googleapis.com','books.google.com','pictures.abebooks.com','m.media-amazon.com'],
    },
}

module.exports = nextConfig
