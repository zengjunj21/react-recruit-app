import React,{Component} from 'react'
//路由
import { Switch,Route,Link,Redirect} from 'react-router-dom';
//容器
import {connect} from 'react-redux';
//cookies（操作前端cookie的对象）set() get() remove
import Cookies from 'js-cookie'
//页面
import LaobanInfo from './../laoban-info/laoban-info'
import DashenInfo from './../dashen-info/dashen-info'

//工具函数
import {getRedirectTo} from '../../utils'
//引入图标组件
import Logo from './../../components/logo/logo'
//获取异步action
import {getUser} from '../../redux/actions'

 class Main extends Component{

 
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
        
 
	      return (
		      <div>
		      	<Switch>
		      		<Route path = '/laobaninfo' component = {LaobanInfo}></Route>
		      		<Route path = '/dasheninfo' component = {DashenInfo}></Route>
		      	</Switch>
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