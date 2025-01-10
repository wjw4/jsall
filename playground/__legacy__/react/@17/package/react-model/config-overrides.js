const {override, addWebpackAlias, disableEsLint} = require('customize-cra');
const path = require('path')
//https://zhuanlan.zhihu.com/p/85839264
module.exports = override(
  disableEsLint(),
  addWebpackAlias({
    "@react-model": path.resolve(__dirname, 'src/@react-model'),
    "src": path.resolve(__dirname, 'src'),
    "assets": path.resolve(__dirname, 'src/assets'),
    "component": path.resolve(__dirname, 'src/component'),
    "@model": path.resolve(__dirname, 'src/model'),
    "service": path.resolve(__dirname, 'src/service'),
    "style": path.resolve(__dirname, 'src/style'),
    "test": path.resolve(__dirname, 'src/test'),
    "util": path.resolve(__dirname, 'src/util'),
    "view": path.resolve(__dirname, 'src/view'),
  }),
);