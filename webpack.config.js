
module.exports = {
  cache: true,
  entry: './src/js/app.jsx',
  output: {
    path: './src/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/,  loader: 'style!css' },
      { test: /\.jsx$/,  loader: 'jsx-loader?harmony' },
      { test: /\.ttf$/,  loader: 'file-loader?prefix=font/' },
      { test: /\.eot$/,  loader: 'file-loader?prefix=font/' },
      { test: /\.svg$/,  loader: 'file-loader?prefix=font/' },
      { test: /\.woff$/, loader: 'url-loader?prefix=font/&limit=5000&mimetype=application/font-woff' }
    ]
  },
  resolve: {
    // Allow require('./blah') to require blah.jsx
    extensions: ['', '.js', '.jsx']
  }
};