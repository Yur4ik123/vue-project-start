const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const PATHS = require("./paths");

// todo DEBUG
console.log(`*** ENV_MODE = ${process.env.NODE_ENV} ***`);

// Check for mode
let isProd = process.env.NODE_ENV === 'production';

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: `${PATHS.src}/main.js`,
  output: {
    path: PATHS.dist,
    filename: isProd ? `scripts/[name].[contenthash].js` : `scripts/[name].[hash].js`,
    publicPath: "/"
  },
  optimization: {
/*     minimizer: [

        new TerserPlugin({
             sourceMap: true, // change for prod
     })],*/
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          enforce: true
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: !isProd,
              config: {
                path: `${PATHS.root}/postcss.config.js`
              }
            }
          }
        ]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: !isProd,
              config: {
                path: `${PATHS.root}/postcss.config.js`
              }

            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !isProd
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: `[name].[ext]`,
        }
      },
      {
        test: /\.(ttf|eot|svg|png|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]',
            },
          }
        ],
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     template: `./index.html`,
    //     filename: `./index.html`,
    //     inject: true
    // }),
    new HtmlWebpackPlugin({
      filename:'index.html',
      template: `${PATHS.root}/index.html`,
    }),
    new HtmlWebpackPlugin({
      filename:'about.html',
      template: `${PATHS.root}/about.html`,
    }),
    new HtmlWebpackPlugin({
      filename:'services.html',
      template: `${PATHS.root}/services.html`,
    }),
    new HtmlWebpackPlugin({
      filename:'service-page.html',
      template: `${PATHS.root}/service-page.html`,
    }),
  new HtmlWebpackPlugin({
      filename:'contacts.html',
      template: `${PATHS.root}/contacts.html`,
    }),

    new MiniCssExtractPlugin({
      filename: isProd ? `styles/[name].[contenthash].css` : `styles/[name].[hash].css`
    }),
    new CopyWebpackPlugin([
      {from: './src/assets', to: './assets'},
      /*{ from: './src/fonts', to: './fonts'},*/
    ]),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
};
