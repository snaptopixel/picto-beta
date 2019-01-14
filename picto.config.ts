export const config = {
  namespace: 'somefoo',
  plugins: [],
  copy: [
    {
      src: 'pages',
      dest: 'build/somefoo/picto/pages'
    },
    {
      src: '../node_modules/@snaptopixel/picto/dist/picto.js',
      dest: 'build/somefoo/picto/picto.js'
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
  ]
}