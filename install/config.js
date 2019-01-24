//////////////////////////////////////////////////////
// The code above was copied from stencil.config.ts //
// the following overrides are necessary for picto  //
//////////////////////////////////////////////////////

config.outputTargets = [{
  dir: 'docs',
  type: 'www',
}];

config.devServer = {
  historyApiFallback: {
    index: '/index.html',
  },
  port: 3333,
};

config.copy = [
  ...config.copy,
  {
    dest: 'build/picto',
    src: '../node_modules/@snaptopixel/picto-beta/dist',
  },
  {
    dest: 'build/picto/picto/pages',
    src: 'picto/pages',
  },
];

config.srcIndexHtml = 'src/picto/index.html';