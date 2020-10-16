const path = require('path');
//const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const webpack = require('webpack')
module.exports = {
  entry: {
    app: './src/index.jsx',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new MiniCssExtractPlugin(),
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: './template/index.html',
    }),
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.ExtendedAPIPlugin(),
    new WebpackPwaManifest({
      filename: "manifest.webmanifest",
      orientation: 'omit',
      short_name: "MI",
      name: "MI page",
      start_url: "./index.html",
      display: "standalone",
      background_color: "#000000",
      theme_color: "#000000",
      description: "MI's homepage",
      categories: ["tech", "coding", "community"],
      icons: [/*
        {
          src: path.resolve("./icon/logo008b.svg"),
          sizes: [256],
          type: "image/svg+xml"
        },*/
        {
          src: path.resolve("./icon/icon.png"),
          sizes: [96,192,512],
          type: "image/png"
        },
      ],
      //below is just an copy-and-paste of an document sample,
      //can be used for making app shortcut
      //https://web.dev/app-shortcuts/
      shortcuts: [
        {
          name: "shortcut 1",
          short_name: "shortcut 1",
          description: "hello",
          url: "./index.html?call=shortcut&content=shortcut1",
        },
        {
          name: "shortcut 2",
          short_name: "shortcut 2",
          description: "what's up boy",
          url: "./index.html?call=shortcut&content=shortcut2",
        }
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['file-loader',MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'file-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            /*options: {
              sourceMap: true
            }*/
          }
        ]
      },
      { test: /\.svg$/,
        use: [
          'file-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeOffCanvasPaths: true},
                {removeDimensions: true},
                {reusePaths: true}
              ]
            }
          },
        ]
      },
      
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'srcset',
                type: 'srcset',
              },
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'data-srcset',
                type: 'srcset',
              },
              {
                tag: 'link',
                attribute: 'href',
                type: 'src',
                /*
                filter: (tag, attribute, attributes) => {
                  if (!/stylesheet/i.test(attributes.rel)) {
                    return false;
                  }

                  if (
                    attributes.type &&
                    attributes.type.trim().toLowerCase() !== 'text/css'
                  ) {
                    return false;
                  }

                  return true;
                },*/
              },
            ]
          }
        }
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
  },
};