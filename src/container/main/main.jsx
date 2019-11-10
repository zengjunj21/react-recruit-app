import React,{Component} from 'react'
import { Switch,Route,Link } from 'react-router-dom';

import LaobanInfo from './../laoban-info/laoban-info'
import DashenInfo from './../dashen-info/dashen-info'

//引入图标组件
import Logo from './../../components/logo/logo'


export default class Main extends Component{
      render(){
	  
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
