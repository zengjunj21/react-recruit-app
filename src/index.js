import React from 'react';
import ReactDOM from 'react-dom';
//路由
import {HashRouter,Route,Switch} from 'react-router-dom';
//antd-mobile
import { Button } from 'antd-mobile';

//redux
import { Provider } from 'react-redux';
import store  from './redux/store';



//主界面
import Main from './container/main/main'
//注册
import Register from './container/register/register'
//登入
import Login from './container/login/login'

ReactDOM.render((
	    <Provider store = {store}>
			 <HashRouter>
			      <Switch>

					  <Route path = "/register" component = {Register}></Route>
					  <Route path = "/login" component = {Login}></Route>
					  <Route path = "/" component = {Main}></Route>

				  </Switch>
			  </HashRouter>
		</Provider>
	), document.getElementById('root'));


























// import * as serviceWorker from './serviceWorker';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
