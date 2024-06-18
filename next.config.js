// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // This will override the default option for video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|ogv)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[ext]',
          esModule: false,
        },
      },
    });

    return config;
  },
};