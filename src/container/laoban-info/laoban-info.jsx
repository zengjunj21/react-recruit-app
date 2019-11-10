/*
    老板信息完善的路由容器组件

*/

import React,{Component} from 'react';
import {connect} from 'react-redux';

import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import HeaderSelector from './../../components/header-selector/header-selector';
class LaobanInfo extends Component{
    
    state = {
    	header:'',   //头像
    	post:'',     //职位
    	info:'',     //信息
    	company:'',  //公司
    	salary:''    //月薪
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
            	<NavBar>老板信息完善</NavBar>
            	<HeaderSelector setHeader = {this.setHeader}/>
            	<InputItem placeholder = "请输入职位" onChange = {val =>{this.handleChange('post',val)}}>招聘职位</InputItem>
            	<InputItem placeholder = "请输入名称" onChange = {val =>{this.handleChange('company',val)}}>公司名称</InputItem>
            	<InputItem placeholder = "请输入薪资" onChange = {val =>{this.handleChange('salary',val)}}>职位薪资</InputItem>
            	<TextareaItem title = "职位需求" 
            	              rows ={3}
            	              onChange = {val =>{this.handleChange('info',val)}}/>
            	<Button type = "primary" onClick = {this.save}>保存</Button>
            </div>

			)
	}
}

export default connect(
    state =>({}),
    {} //用于放置action 函数	

	)(LaobanInfo);