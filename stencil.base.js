const aliasPlugin = require('rollup-plugin-alias');

module.exports = {
  namespace: 'picto',
  plugins: [
    aliasPlugin({
      '@': 'src',
    })
  ]
};