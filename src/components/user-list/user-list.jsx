/*
    显示指定用户的UI组件
*/
import React,{Component} from 'react';
import PropType from 'prop-types'
import { Card , WingBlank , WhiteSpace } from 'antd-mobile';
const Header = Card.Header;
const Body = Card.Body;
class UserList extends Component{
	static propType = {
		userList:PropType.array.isReqired
	}

	render(){

		const  {userList} = this.props;
        console.log(userList)
		return(
            <div style = {{marginBottom:'50px',marginTop:'50px'}}>
            	<WingBlank >
            	{
            		userList.map((user,index)=>(
	                        <div index ={index} key = {index}>
		            			<WhiteSpace/>
		            			<Card>
		            				<Header
		                                thumb = {require(`../../assets/images/${user.header}.png`)}
		            				    extra = {user.username}
		            				/>
		            				<Body>
		            					<div>职位：{user.post}</div>
		            					{user.company? <div>公司：{user.company}</div> : null}
		            					{user.salary ? <div>月薪：{user.salary}</div> : null}
		            					<div>描述：{user.info}</div>
		            				</Body>
		            			</Card>
		            		</div>

            			))
            	}
            		
            	</WingBlank>
            </div>

			)
	}
}

export default UserList;