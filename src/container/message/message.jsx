/*
    消息界面路由容器组件

*/
import React,{Component} from 'react'
//容器
import {connect} from 'react-redux'
import { List,Badge} from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;
// 对chatMsgs 按chat_id进行分组(只取最后一条)

function getLastMsgs(chatMsgs,userid){
// 1.找到每个聊天的lastMsg,并用一个对象容器来保存
	const lastMsgObjs = {};
	chatMsgs.forEach((msg) =>{
		// 对msg进行个体统计（自己统计自己）
		if(msg.to == userid && !msg.read){
			msg.unReadCount = 1
		}else{
			msg.unReadCount = 0
		}
        
		// 得到msg的聊天id
		const chatId = msg.chat_id
		// 获取已保存的当前组件的lastMsg
		const lastMsg = lastMsgObjs[chatId];
		if(!lastMsg){ // 没有就是说明，当前msg就是所在组的lastMsg
			lastMsgObjs[chatId] = msg;
           
		}else{
			// 累计 unREadCount = 已经统计的 + 当前msg的
			const unReadCount = lastMsg.unReadCount +  msg.unReadCount
			// 如果msg比lastMsg晚，那就保存为lastMsg
			if(msg.create_time > lastMsg.create_time){
				lastMsgObjs[chatId] = msg;
			}
            // 保存在最新的lastMsg上
			lastMsgObjs[chatId].unReadCount = unReadCount;

		}
	})
// 2.得到所有lastMsg数组
    const lastMsgs = Object.values(lastMsgObjs)

// 3.对数组进行排序（按create_time降序）
    lastMsgs.sort(function(a,b){
        return b.create_time - a.create_time ;
	})

	return lastMsgs;
}
class Message extends Component{
	render(){
		const { user } = this.props;
		const { users,chatMsgs } = this.props.chat;
		// 对chatMsgs 按chat_id进行分组(只取最后一条)
		const lastMsgs = getLastMsgs(chatMsgs,user._id);
		console.log('lastMsgs',lastMsgs)
		return(
            <div style = {{marginBottom:'50px',marginTop:'50px'}}>
                <List>
					{
						lastMsgs.map(msg=>{
							// 得到目标用户的id
							const targetUserId = msg.to == user._id ? msg.from : msg.to;
							// 得到目标用户的信息
							const targetUser = users[targetUserId];
							return (
								<Item extra = {<Badge text = {msg.unReadCount}/>}
									  key = {msg._id}
										thumb = {targetUser.header ?  require(`../../assets/images/${targetUser.header}.png`):null}
										arrow = 'horizontal'
										onClick = {()=>{this.props.history.push(`/chat/${targetUserId}`)}}>
									{msg.content}
									 <Brief>{targetUser.username}</Brief>
								</Item>
							)
						})
					}
					
				</List>
			</div>
			)
	}
}

export default connect(
     state =>({user:state.user,chat:state.chat}),
     {}
	)(Message);