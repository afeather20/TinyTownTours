const path = require('path');

module.exports = {
  entry: './routes/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'views'),
  },
};