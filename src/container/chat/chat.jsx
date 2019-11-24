/*
    对话聊天路由组件
*/
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { NavBar,List,InputItem } from 'antd-mobile'
import { sendMsg } from '../../redux/actions'
const Item = List.Item;
class Chat extends Component{
	state = {
		content:''
	}
    //发送
    handleSend = () =>{
    	// 我的id
        const from = this.props.user._id; 
        // 他的id
        const to  = this.props.match.params.userid; 
        // 内容
        const content = this.state.content.trim();
        // 发送请求
        if(content){
            //调用异步action
            this.props.sendMsg({from,to,content})
        }

        //清除输入数据
        this.setState({content:''})
       
    }

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
	                <InputItem 
	                    placeholder = "请输入"
	                    value = { this.state.content }
	                    onChange = {(val) => this.setState({content:val})}
                        extra = {
                        	<span onClick = {this.handleSend}>发送</span>
                        }
	                /> 
	            	
	            </div>
            </div>

			)
	}
}

export default connect(
    state=>({user:state.user}),
    {sendMsg}
	)(Chat)