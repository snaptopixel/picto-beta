import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'picto',
  outputTargets: [{ type: 'www', dir: 'docs' }],
  copy: [
    {
      src: 'pages',
      dest: 'build/picto/picto/pages',
    },
  ],
  devServer: {
    port: 3333,
    historyApiFallback: {
      index: '/index.html',
    },
  },
};
