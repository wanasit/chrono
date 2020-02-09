const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'chrono': path.resolve(__dirname, 'src/chrono.js'),
        'chrono.min': path.resolve(__dirname, 'src/chrono.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'chrono',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            include: /\.min\.js$/
          })
        ],
    },
};