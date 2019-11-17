/*
    老板主界面路由容器组件

*/
import React,{Component} from 'react'
//容器
import {connect} from 'react-redux'
class Laoban extends Component{
	render(){
		return(
            <div>laoban</div>
			)
	}
}

export default connect(
     state =>({}),
     {}
	)(Laoban);