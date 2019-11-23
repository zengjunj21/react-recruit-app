/*
    大神主界面路由容器组件

*/
import React,{Component} from 'react'
//容器
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
//获取异步action
import { getUserList } from '../../redux/actions'
class Dashen extends Component{
	componentDidMount(){
        //获取userList
        this.props.getUserList('dasheng')
	}
	render(){
		return(
            <div>
            	<UserList userList = {this.props.userList}/>
            </div>
			)
	}
}

export default connect(
     state =>({userList:state.userList}),
     {getUserList}
	)(Dashen);