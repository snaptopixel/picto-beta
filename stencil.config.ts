import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'picto',
  copy: [{ src: 'picto', dest: '../../lib' }],
  outputTargets: [{ type: 'dist' }],
};
