const path = require('path');

module.exports = {
    mode: 'production',
    entry: './frontend/main.js',
    output: {
        path : path.resolve(__dirname, 'public', 'assets', 'js'), 
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            exclude: /node_modules/,   //    <= Pedindo para ignorar o node_modules
            test: /\.js$/,  // <= Teste a extensão de arquivo, 
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }]
    }, 
    devtool: 'source-map'
}