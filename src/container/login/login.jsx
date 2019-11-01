//登陆路由组件
import React,{Component} from 'react'

import  Logo from './../../components/logo/logo'
//antd-mobile
import { NavBar,
         WingBlank,
         List,
         InputItem,
         WhiteSpace,
         Button } from 'antd-mobile';

const ListItem = List.Item

export default class Login extends Component {
 
   state = {
      username:'',//用户名
      password:'',
   }
   //点击注册
   login = () =>{
      console.log(this.state)
   }
   //处理输入数据的改变，更新对应的状态
   handleChange (name,value) {
       //更新状态 ,放在中括号中就是一个变量了，不然是一个字符串（当前状态也没有name这个串）
       this.setState({
           [name]:value //属性名不是name，而是name的值
       })
   }

   //去登入页面
   toRegisterPage =()=>{
      this.props.history.replace('/register')
   }


   /*
        toLoginPage =()=>{}
        toLoginPage(){}
        这两种语法有区别？

    */


	render(){
      const {type} = this.state;
		return (
            <div>
               <NavBar>Boss直聘</NavBar>
               <Logo/>
               <WingBlank>
                  <List>
                     <InputItem onChange = {(val) =>{this.handleChange('username',val)}} placeholder = '请输入用户名'>用户名:</InputItem>
                     <WhiteSpace/>
                     <InputItem onChange = {val =>{this.handleChange('password',val)}} placeholder = '请输入密码' type="password">密&nbsp;&nbsp;&nbsp;码:</InputItem>
                   
                     <WhiteSpace/>        
                     <Button type = "primary" onClick = {this.login}>登陆</Button> 
                      <WhiteSpace/>    
                     <Button onClick = {this.toRegisterPage}>还没有账户？去注册</Button>   
                  </List>
               </WingBlank>
            </div>

			)
	}
}