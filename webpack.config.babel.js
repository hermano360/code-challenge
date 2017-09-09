import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {HotModuleReplacementPlugin} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// ...
const defaultEnv = {
    dev: true,
    production: false,
};

const scssLoader = [
  { loader: 'style-loader' },
  { loader: 'css-loader' },
  { loader: 'sass-loader' }
];

const postcssLoader = [
  { loader: 'style-loader' },
  { loader: 'css-loader', options: { modules: true } },
  { loader: 'postcss-loader', options: { plugins: () => [...postcssPlugins] } }
];


export default (env = defaultEnv) => ({
  entry: [
    ...env.dev ? [
      'react-hot-loader/patch', // Needed to preserve state
      'webpack-dev-server/client?http://localhost:8080', // webpack dev server host and port
    ] : [],
    path.join(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    ...env.dev ? [
      // Webpack Development Plugins
      new HotModuleReplacementPlugin(),
    ] : [
      // Webpack Production Plugins
      new ExtractTextPlugin('[name].css'),
    ],
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel',
            options: {
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'react',
              ],
              plugins: ['react-hot-loader/babel'],
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        loader: scssLoader,
        include: [__dirname]
      },
      { test: /\.css$/,
        loader: postcssLoader,
        include: [__dirname]
      },
    ]
  },
  devServer: {
    hot: true,
  },
});
