/*
    对话聊天路由组件
*/
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { NavBar,List,InputItem } from 'antd-mobile'
const Item = List.Item;
class Chat extends Component{
	render(){
		return(
            <div id = "chat-page">
            <NavBar>xxxx</NavBar>
                <List>
	            	<Item
	                    thumb = {require('../../assets/images/header1.png')}>
	            	
	            	    你好
	            	</Item>
	            	<Item
	            	    className = "chat-me"
	                    extra = '我'>
	            	
	            	    你好
	            	</Item>
	            </List>
	            <div className = "am-tab-bar">
	                <InputItem placeholder = "请输入"
                        extra = {
                        	<span>发送</span>
                        }
	                /> 
	            	
	            </div>
            </div>

			)
	}
}

export default connect(
    state=>({}),
    {}
	)(Chat)