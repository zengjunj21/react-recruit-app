import React,{Component} from 'react'
//路由
import { Switch,Route,Link,Redirect} from 'react-router-dom';
//容器
import {connect} from 'react-redux';
//cookies（操作前端cookie的对象）set() get() remove
import Cookies from 'js-cookie'
//ui
import { NavBar } from 'antd-mobile'
//页面
import LaobanInfo from './../laoban-info/laoban-info'
import DashenInfo from './../dashen-info/dashen-info'
import Laoban from './../laoban/laoban'
import Dashen from './../dashen/dashen'
import Personal from './../personal/personal'
import Message from './../message/message'
import NotFound from './../../components/not-found/not-found'
import NavFooter from './../../components/nav-footer/nav-footer'
import Chat from './../chat/chat'
//工具函数
import {getRedirectTo} from '../../utils'
//引入图标组件
import Logo from './../../components/logo/logo'
//获取异步action
import {getUser} from '../../redux/actions'

 class Main extends Component{
    //给组件对象添加属性
    //包含所有导航组件的相关信息数据
    navList = [
        {
          path:'/laoban', //路由路径
          component:Laoban,
          title:'老板列表',
          icon:'laoban',
          text:'老板'
        },
        {
          path:'/dashen', //路由路径
          component:Dashen,
          title:'大神列表',
          icon:'dashen',
          text:'大神'
        },
        {
          path:'/message', //路由路径
          component:Message,
          title:'消息列表',
          icon:'message',
          text:'消息'
        },
        {
          path:'/personal', //路由路径
          component:Personal,
          title:'用户中心',
          icon:'personal',
          text:'个人'
        }


    ]

 
    componentDidMount(){
    	//登陆过（cookie中有userid），但没有登陆（redux管理的user中没有_id），发请求获取对应的user，暂时不做任何显示
    	// 读取cookie中userid
        const userid = Cookies.get("userid")
        const { _id } = this.props.user;
        if(userid && !_id){
           //发送异步请求，获取user
           console.log("发送ajax请求获取user")
           //获取用户信息
           this.props.getUser()
        }
    } 

      render(){
        // 读取cookie中userid
        const userid = Cookies.get("userid")
        // 如果没有，自动重定向到登入界面
        if(!userid){
        	return <Redirect to='/login'/>
        }
        // 如果有，读取redux中的user状态
        const { user } = this.props;
        // 如果user没有_id，返回一个null（不做任何显示）
        if(!user._id){
            return null
        }else{
         // 如果有_id，显示对应的界面
         // 请求根路径,根据user的type和header来计算出一个重定向的路由路径，并自动重定向
         let path = this.props.location.pathname;
         if(path === '/'){
         	 //得到一个重定向的路由路径
             path = getRedirectTo(user.type,user.header);
             return <Redirect to={path}/>
         }

        }
        
        const {navList} = this;
        //请求的路径
        const path = this.props.location.pathname;
        //得到当前的nav,可能没有
        const currentNav = navList.find(nav => nav.path == path);
        if(currentNav){
          //决定哪个路由需要隐藏
          if(user.type === 'laoban'){
             //隐藏大神（数组的第二个）
             navList[1].hide = true;
          }else{
             //隐藏老板（数组的第一个）
             navList[0].hide = true;
          }
        }
	      return (
		      <div>
            {currentNav ? <NavBar className = "fixed-header">{currentNav.title}</NavBar> : null}
		      	<Switch>
              {
                //遍历路由(渲染)
                navList.map((nav,index)=><Route key = {index} path = {nav.path}  component = {nav.component}></Route>)
              }
		      		<Route path = '/laobaninfo' component = {LaobanInfo}></Route>
              <Route path = '/dasheninfo' component = {DashenInfo}></Route>
		      		<Route path = '/chat/:userid' component = {Chat}></Route>
              <Route component = {NotFound}/>
		      	</Switch>
            {currentNav ? <NavFooter navList = {navList}/> : null}
		      </div>
		  )
	  
	  }
  
  }

  export default connect(
      state =>({user:state.user}),
      {getUser}
  	)(Main)


/*
    1.实现自动登陆
       --componentDitMount()
          -- 登陆过（cookie中有userid），但没有登陆（redux管理的user中没有_id），发请求获取对应的user，
       -- render()
	       -- 如果cookie中没有userid，直接重定向到login 
	       -- 判断redux管理的user中是否有_id,如果没有，暂时不做任何显示
	       -- 如果有，说明当前已经登陆，显示对应的界面
	       -- 如果cookie中没有userid，自动进入login界面
	       -- 如果请求根路径：根据user的type和header来计算出一个重定向的路由路径，并自动重定向


*/