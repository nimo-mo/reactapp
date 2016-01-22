
module.exports = {
  // cache: true,
  entry: './src/scripts/app.jsx',
  output: {
    path: './src/scripts',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    // Allow require('./blah') to require blah.jsx
    extensions: ['', '.js', '.jsx']
  }
};