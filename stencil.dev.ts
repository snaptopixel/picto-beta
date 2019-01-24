import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'picto',
  outputTargets: [{ type: 'www', dir: 'docs' }],
  copy: [
    {
      src: 'pages',
      dest: 'build/picto/pages',
    },
    {
      src: 'pages',
      dest: '../install/pages',
    },
  ],
  devServer: {
    port: 3333,
    historyApiFallback: {
      index: '/index.html',
    },
  },
};
