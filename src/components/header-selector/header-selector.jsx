/*
    选择用户头像的ui组件
*/

import React,{Component} from 'react';
import {List,Grid} from 'antd-mobile';

import PropTypes from 'prop-types'
class HeaderSelector extends Component{
    static propTypes = {
    	setHeader:PropTypes.func.isRequired
    }

    state = {
    	icon:null // 图片对象，默认没有值
    }

	constructor(props){
        super(props);
        //准备需要显示的列表数据
        this.headerList = [];
        for(let i = 0;i<9;i++){
        	this.headerList.push({
        		text:'header'+(i+1),
        		icon: require(`../../assets/images/header${i+1}.png`) //不能使用inport，只能require动态加载头像
        	})
        }
	}

	//handleClick = (el,index)=>{ //el 当前的对象，通过结构的方式拿到属性
    handleClick = ({text,icon},index)=>{
        console.log(text,icon,index)
        //更新当前组件状态
        this.setState({
        	icon:icon
        })
        //调用函数更新父组件状态
        this.props.setHeader(text)
	}
	render(){
		const {icon} = this.state;
		//头部界面
		const listHeader = !icon ? '请选择头像' : (
                <div>
                	已选择头像：<img src = {icon}/>
                </div>
			);

		return (

              <List renderHeader = {()=>listHeader}>
              	  <Grid data = {this.headerList}
              	        columnNum = {3}
              	        onClick = {this.handleClick}/>
              </List>

			)
	}
}

export default HeaderSelector