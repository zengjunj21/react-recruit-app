import React,{Component} from 'react'
import { Link } from 'react-router-dom';
//引入图标组件
import Logo from './../../components/logo/logo'


export default class Main extends Component{
      render(){
	  
	      return (
		      <div>主页面：<Link to = "/login">les go login</Link>{/*<Logo/>*/}</div>
		  )
	  
	  }
  
  }
