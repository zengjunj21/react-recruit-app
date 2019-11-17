/*
    个人中心路由容器组件

*/
import React,{Component} from 'react'
//容器
import {connect} from 'react-redux'
class Personal extends Component{
	render(){
		return(
            <div>Personal</div>
			)
	}
}

export default connect(
     state =>({}),
     {}
	)(Personal);