const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  devIndicators: {
    buildActivity: false
  },
  env: {},
  images: {
    unoptimized: true,
  }
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);

