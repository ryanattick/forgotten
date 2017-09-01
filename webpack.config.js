import webpack from 'webpack';
import path from 'path';

const config = {
  entry: {
    app: './client/src/app',
    view: './client/src/components/view'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'public/dist')
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    ]
  }
};

export default config;
