import React,{Component} from 'react';
//路由
import {Redirect} from 'react-router-dom';

//antd-mobile
import { NavBar,
         WingBlank,
         List,
         InputItem,
         WhiteSpace,
         Radio,
         Button } from 'antd-mobile';

import {connect} from 'react-redux';
import {register} from '../../redux/actions';
// 组件
import Logo from './../../components/logo/logo';
// Item 组件
const ListItem = List.Item;


class Register extends Component {
 
   state = {
      username:'',//用户名
      password:'',
      password2:'',
      type:'dasheng',   //用户类型   大神/老板
   }
   //点击注册
   register = () =>{
     // console.log(this.state)
     const {register} = this.props;
     register(this.state);
   }
   //处理输入数据的改变，更新对应的状态
   handleChange (name,value) {
       //更新状态 ,放在中括号中就是一个变量了，不然是一个字符串（当前状态也没有name这个串）
       this.setState({
           [name]:value //属性名不是name，而是name的值
       })
   }

   //去登入页面
   toLoginPage =()=>{
      this.props.history.replace('/login')
   }


   /*
        toLoginPage =()=>{}
        toLoginPage(){}
        这两种语法有区别？

    */


	render(){
      const {type} = this.state;
      const {msg,redirectTo} = this.props.user;
      //如果这个有值，说明注册成功了，需要重定向到指定路由
      if(redirectTo){
         return <Redirect to = {redirectTo}></Redirect>
      }
		return (
            <div>
               <NavBar>App</NavBar>
               <Logo/>
               <WingBlank>
                  <List>
                     <WhiteSpace/>
                     {msg ? <div className = "err-msg">{msg}</div> : null}
                     <WhiteSpace/>
                     <InputItem onChange = {(val) =>{this.handleChange('username',val)}} placeholder = '请输入用户名'>用户名:</InputItem>
                     <WhiteSpace/>
                     <InputItem onChange = {val =>{this.handleChange('password',val)}} placeholder = '请输入密码' type="password">密&nbsp;&nbsp;&nbsp;码:</InputItem>
                     <WhiteSpace/>
                     <InputItem onChange = {val =>{this.handleChange('password2',val)}} placeholder = '请确认密码' type="password">确认密码:</InputItem>   
                     <ListItem>
                        <span>用户类型</span>
                        &nbsp;&nbsp;&nbsp;
                        <Radio checked = {type == 'dasheng'} onChange = {()=>this.handleChange('type','dasheng')}>大神</Radio>
                        &nbsp;&nbsp;&nbsp;
                        <Radio checked = {type == 'laoban'} onChange = {()=>this.handleChange('type','laoban')}>老板</Radio>
                     </ListItem>       
                     <WhiteSpace/>        
                     <Button type = "primary" onClick = {this.register}>注册</Button> 
                      <WhiteSpace/>    
                     <Button onClick = {this.toLoginPage}>已有账户</Button>   
                  </List>
               </WingBlank>
            </div>

			)
	}
}

export default connect(
    state =>({user:state.user}),
    {register} //注册异步action

  )(Register)