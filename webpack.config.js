
const dotenvPlugin = require('dotenv-webpack');

module.exports = {
  context: __dirname,
  entry: './src/client/index.js',
  output: {
    path: require('path').resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
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
