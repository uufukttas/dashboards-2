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
  generateStaticParams: async () => {
    return [
      {
        params: {},
        path: '/'
      },
    ];
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);

