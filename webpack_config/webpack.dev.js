const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge( common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        // publicPath: '',
        contentBase: path.join(__dirname, '/.././src/'),
        overlay: {
            warnings: true,
            errors: true
        }
    },
});