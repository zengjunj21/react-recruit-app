/*
    大神信息完善的路由容器组件

*/

import React,{Component} from 'react';
import {connect} from 'react-redux';

import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import HeaderSelector from './../../components/header-selector/header-selector';
class DashenInfo extends Component{

	state = {
    	header:'',   //头像
    	post:'',     //岗位
    	info:'',     //个人介绍
    }

    handleChange = (name,value)=>{
    	this.setState({
    		[name]:value
    	})
    }
    //保存
    save = () =>{
    	console.log(this.state)
    }

    //更新头像header
    setHeader = (header)=>{
        this.setState({
    		header:header
    	})
    }

	render(){
		return(
            <div>
            	<NavBar>大神信息完善</NavBar>
            	<HeaderSelector setHeader = {this.setHeader} />
            	<InputItem placeholder = "请输入岗位" onChange = {val =>{this.handleChange('post',val)}} >求职岗位</InputItem>
            	
            	<TextareaItem title = "个人介绍" 
            	              rows ={3}
            	              onChange = {val =>{this.handleChange('info',val)}} />
            	<Button type = "primary" onClick = {this.save} >保存</Button>
            </div>

			)
	}
}

export default connect(
    state =>({}),
    {} //用于放置action 函数	

	)(DashenInfo);