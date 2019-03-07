const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        index: './index.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname),
        libraryTarget: 'commonjs'
    }
};