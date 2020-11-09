'use strict'
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 多页面打包
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}
const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  // //默认 false，也就是不开启
  // watch: true,
  // //只有开启监听模式时，watchOptions才有意义
  // wathcOptions: {
  //   //默认为空，不监听的文件或者文件夹，支持正则匹配
  //   ignored: /node_modules/,
  //   //监听到变化发生后会等300ms再去执行，默认300ms
  //   aggregateTimeout: 300,
  //   //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
  //   poll: 1000
  // },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    ...htmlWebpackPlugins
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  devtool: 'cheap-source-map'
}