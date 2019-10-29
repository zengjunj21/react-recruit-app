//redux 最核心的管理对象模块
import {createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
//import thunk from 'react-thunk'
//工具函数
import {composeWithDevTools} from 'redux-devtools-extension';

import reducers from './reducers';


//增强函数
/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducers,enhancer); //创建数据存储仓库
*/

//向外暴露store对象
const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
export default store;


