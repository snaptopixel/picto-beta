const baseConfig = require('./stencil.base.js');

module.exports.config = {...baseConfig, ...{
  devServer: {
    port: 3333,
    historyApiFallback: {index: '/index.html'}
  },
  outputTargets: [{
    type: 'www',
    dir: 'docs'
  }],
  copy: [{
    src: 'pages',
    dest: 'build/picto/pages'
}, {
    src: 'assets',
    dest: 'build/picto/assets'
  }]
}};
