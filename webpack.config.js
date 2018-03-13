const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('styles.css'),
        new CssoWebpackPlugin()
    ],
    output: {
        filename: '[name].bundle.min.js',
        path: path.resolve(__dirname, 'build')
    }
};
