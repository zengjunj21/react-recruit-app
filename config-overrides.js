/*module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
*/

//按需加载
const { override, fixBabelImports } = require('customize-cra');
 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd-mobile',
     style: 'css',
   }),
);


//以下为antd的使用

/*const { override, fixBabelImports } = require('customize-cra');
 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: 'css',
   }),
 );*/

//自定义主题
/*const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
 addLessLoader({
   javascriptEnabled: true,
   modifyVars: { '@primary-color': '#1DA57A' },
 }),
);*/
