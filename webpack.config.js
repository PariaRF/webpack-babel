const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "/src/js/app.js",
    output:{
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    module:{
        rules: [
            {
              test: /\.(?:js|mjs|cjs)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['@babel/preset-env']
                  ]
                }
              }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
          ]
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
        open: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
              },
            }),
          ],
    },
}