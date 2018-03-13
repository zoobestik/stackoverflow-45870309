const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

module.exports = {
    entry: {
        app: './src/index.js'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    ExtractTextPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        }),
        new CssoWebpackPlugin()
    ],
    output: {
        filename: '[name].bundle.min.js',
        path: path.resolve(__dirname, 'build')
    }
};
