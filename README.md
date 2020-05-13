#招聘app

-- 环境配置
	- 安装依赖 npm install 
	- 启动 npm run start
	- 发布 npm run build


-- antd-mobile 组件库
	- 安装 npm install --save antd-mobile
	- 配置
		- 按需加载 
			- 安装 npm install react-app-rewired customize-cra --save-dev

			- 修改 package.json 里的启动配置

			 	"start": "react-app-rewired start",
			    "build": "react-app-rewired build",
			    "test": "react-scripts test --env=jsdom",		

			- 安装  babel-plugin-import 用于按需加载组件代码和样式 npm install babel-plugin-import --save-dev

			- 创建 config-overrides.js 用于修改默认配置
				 const { override, fixBabelImports } = require('customize-cra');
				 module.exports = override(
				   fixBabelImports('import', {
				     libraryName: 'antd-mobile',
				     style: 'css',
				   }),
				 );

-- axios 
	- 安装 npm install --save axios
	- 封装axios 返回promise对象

-- js-cookie 
	- 安装 npm install --save js-cookie 
	- 获取本地存储




