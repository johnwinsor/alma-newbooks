/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/alma-newbooks',
    images: {
        domains: ['covers.openlibrary.org', 'www.googleapis.com','books.google.com','picsum.photos'],
    },
}

module.exports = nextConfig
