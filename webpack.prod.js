const merge = require('webpack-merge');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const webpack = require('webpack')
const { plugins } = require('./webpack.common.js');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: './',
  },/*
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },*/
  plugins: [
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
    }),
  ]
});