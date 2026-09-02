import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack(config) {
    const assetRule = config.module.rules.find((rule: {test?: RegExp}) =>
      rule.test?.test?.('.svg')
    );

    if (assetRule && typeof assetRule === 'object') {
      assetRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
