const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    context: ROOT,
    mode: 'development',
    entry: {
        'main': './index.ts'
    },

    output: {
        path: DESTINATION,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: pkg.name,
        filename: pkg.name + ".js",
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },

    plugins: [
    //    new BundleAnalyzerPlugin()
    ],

    resolve: {
        extensions: ['.ts', 'tsx', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },

    externals: [{
        "lodash": "_",
        "d3": "d3",
        "@youwol/logging": "window['@youwol/logging']",
        'rxjs': "rxjs",
        'rxjs/operators': {
            commonjs:'rxjs/operators',
            commonjs2:'rxjs/operators',
            root:['rxjs','operators']
        },
        '@youwol/flux-core': "@youwol/flux-core",
        '@youwol/cdn-client': '@youwol/cdn-client',
        '@youwol/flux-view': "@youwol/flux-view",
    }],

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'ts-loader' },
                  ],
                  exclude: /node_modules/,
            }
        ],
    },
    devtool: 'source-map',

};



/*const webpack = require("webpack");
const path = require("path");

let config = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "./bundle.js"
    },
    plugins: [
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        historyApiFallback: true,
        inline: true,
        open: false,
        hot: true,
        port:3009,
    },
    module: {
        rules: [
          {
            test: /\.(html|css|png)$/i,
            use: [
              {
                loader: 'file-loader',options: {
                    name: '[name].[ext]',
                  },
              },
            ],
          },
        ],
      },
    //devtool: "eval-source-map"
}

module.exports = config;
*/
