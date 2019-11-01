import React,{Component} from 'react'

import  Logo from './../../components/logo/logo'
//antd-mobile
import { NavBar,
         WingBlank,
         List,
         InputItem,
         WhiteSpace,
         Radio,
         Button } from 'antd-mobile';

const ListItem = List.Item

export default class Register extends Component {
	render(){
		return (
            <div>
               <NavBar>Boss直聘</NavBar>
               <Logo/>
            </div>

			)
	}
}