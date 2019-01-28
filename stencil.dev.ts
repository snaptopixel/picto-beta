import { Config } from '@stencil/core';

import docsRenderer from './src/picto/renderer';

export const config: Config = {
  namespace: 'picto',
  outputTargets: [
    { type: 'docs-custom', generator: docsRenderer },
    { type: 'www', dir: 'docs' },
  ],
  devServer: {
    port: 3333,
    historyApiFallback: {
      index: '/index.html',
    },
  },
};
