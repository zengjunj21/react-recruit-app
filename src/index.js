import React from 'react';
import ReactDOM from 'react-dom';
//路由
import {HashRouter,Route,Switch} from 'react-router-dom'
//注册
import Register from './container/register/register'
//登入
import Login from './container/login/login'
//主界面
import Main from './container/main/main'

//antd-mobile
import { Button } from 'antd-mobile';



ReactDOM.render( 
	<HashRouter>
	    <Switch>
	        <Route path = "/" component = {Main}/>
	    	<Route path = "./register" 	component = {Register}/>
	    	<Route path = "./login" component = {Login}/>
	    </Switch>
	</HashRouter>
	, document.getElementById('root'));


























// import * as serviceWorker from './serviceWorker';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
