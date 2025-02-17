module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
          pathname: '/**', // Match any path under this domain
        },
      ],
    },
  }
  