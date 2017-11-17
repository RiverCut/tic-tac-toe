
const dotenvPlugin = require('dotenv-webpack');

module.exports = {
  context: __dirname,
  entry: './src/client/index.ts',
  output: {
    path: require('path').resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules|server/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    progress: false,
    watchContentBase: true,
    contentBase: require('path').join(__dirname, 'src', 'client')
  },
  plugins: [
    new dotenvPlugin()
  ]
};
