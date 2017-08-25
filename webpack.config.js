const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
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
        new CleanWebpackPlugin(['build']),
        new HtmlWebPackPlugin(),
        new ExtractTextPlugin('styles.css'),
        new CssoWebpackPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                var context = module.context;
                return context && (context.indexOf('node_modules') > 0);
            }
        })
    ],
    output: {
        filename: '[name].bundle.min.js',
        path: path.resolve(__dirname, 'build')
    }
};
