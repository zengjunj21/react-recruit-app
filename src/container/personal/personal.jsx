/*
    个人中心路由容器组件

*/
import React,{Component} from 'react'
//容器
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile';
import Cookies from 'js-cookie';
//引入action 为了登出重置
import {resetUser} from './../../redux/actions'
const Item = List.Item;
const Brief = Item.Brief;
//个人中心
class Personal extends Component{

    //登出
    logOut =()=>{
       Modal.alert('退出','确认退出登录吗？',[
            {
           	   text:'取消'
           	},
            {
           	    text:'确定',
           	    onPress:()=>{
           	    	//干掉cookie中userid
                    Cookies.remove('userid')
           	    	//干掉redux管理的user（调用同步action，因为不用与后台通信）
           	    	this.props.resetUser("已退出，请登陆");
           	    }
           	}

       	])
    }


	render(){

		const {username,info,header,company,post,salary} = this.props.user;
		//console.log(this.props.user)
		return(
            <div style = {{marginBottom:'50px',marginTop:'50px'}}>
            	<Result
                   img = {<img src = {require(`./../../assets/images/${header}.png`)} style = {{width:'50px'}} alt = "header"/>}
            	   title = {username}
            	   message = {company}
            	/>
            	<List renderHeader = {()=>'相关信息'}>
            	    <Item multipleLine>  {/*multipleLine 代表多行*/}
            	        <Brief>职位：{post}</Brief>
            	        <Brief>简介：{info}</Brief>
            	        {
            	        	salary ?  <Brief>薪资：{salary}k</Brief> : null
            	        }
            	    	
            	    </Item>
            	</List>
            	<WhiteSpace/>
            	<List>
            		<Button type = "warning" onClick = {this.logOut}>退出登入</Button>
            	</List>
            </div>
			)
	}
}

export default connect(
     state =>({user:state.user}),
     {resetUser}
	)(Personal);