// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // 入口文件改为 TypeScript
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',  // 打包后的文件名
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],  // 添加 TypeScript 文件支持
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,  // 处理 TypeScript 文件
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,  // 处理 JS 和 JSX 文件
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // 处理 CSS 文件
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'], // 使用 style-loader 和 css-loader
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // 指定 HTML 模板
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
  mode: 'development',  // 开发模式
};
