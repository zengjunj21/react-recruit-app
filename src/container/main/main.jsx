import React,{Component} from 'react'
import { Switch,Route,Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


import LaobanInfo from './../laoban-info/laoban-info'
import DashenInfo from './../dashen-info/dashen-info'

//引入图标组件
import Logo from './../../components/logo/logo'


 class Main extends Component{
      render(){
      	//检查用户是否登入，如果没有，自动重定向到登入界面
	    const {user} = this.props;
	    if(!user._id){
           return <Redirect to='/login'/>
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
      state =>({user:state.user})
  	)(Main)
