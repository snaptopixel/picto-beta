export const config = {
  namespace: 'picto',
  copy: [
    {
      src: '../picto/pages',
      dest: 'build/picto/picto/pages'
    },
    {
      src: '../node_modules/@snaptopixel/picto/dist/picto.js',
      dest: 'build/picto/picto/picto.js'
    }
  ],
  devServer: {
    port: 3333,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  outputTargets: [
    {
      type: 'www',
      dir: 'docs'
    }
  ],
  srcIndexHtml: 'picto/picto.html'
}