/*
    对话聊天路由组件
*/
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { NavBar,List,InputItem,Grid ,Icon} from 'antd-mobile'
import { sendMsg } from '../../redux/actions'
const Item = List.Item;
class Chat extends Component{
	state = {
		content:'',
		isShow:false, // 是否显示表情列表
	}
    // 在第一次render（渲染）之前回调
	componentWillMount(){
		// 初始化表情列表数据
		const emojis = ['❤','☂','☝','☠','☹','❣️','☘','☀','☺'];
		this.emojis = emojis.map(item=>({text:item}))

	}

	componentDidMount(){
		// 初始显示列表
		window.scrollTo(0,document.body.scrollHeight);
	}

	componentDidUpdate(){
		// 更新显示列表
		window.scrollTo(0,document.body.scrollHeight);
	}

	// 切换
	toggle = () =>{
		const isShow = !this.state.isShow
		this.setState({isShow})
		// 异步手动派发resize事件，解决表情列表显示的bug
		setTimeout(()=>{
			window.dispatchEvent(new Event('resize')) // 分发resize事件
		},0)
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

        //清除输入数据并隐藏表情
        this.setState({
			content:'',
			isShow:false
		})
       
    }

	render(){
		const { user } = this.props;
		const { users,chatMsgs } = this.props.chat
		//console.log(this.props.chat)
		// 计算当前聊天的chatId
		const meId = user._id;
		// 如果还没有获取数据，直接不做任何显示
		if(!users[meId]){
			return null;
		}
		const targetId = this.props.match.params.userid; 
		const chatId = [meId,targetId].sort().join('_');
		// 对chatMsgs进行过滤
		const msgs = chatMsgs.filter(msg=>msg.chat_id === chatId);
		// 得到目标用户的头像
		const targetHeader = users[targetId].header;
		const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null ;
		return(
            <div id = "chat-page">
			   <NavBar icon = {<Icon type = 'left'/>} 
			   className = "fixed-header"
			   onLeftClick = {()=>{this.props.history.goBack()}}>
				   {users[targetId].username}
			   </NavBar>
                <List style = {{marginTop:50,marginBottom:50}}>
					{
						msgs.map(msg=>{
							// 对方发给我的(目标id相等则为对方发送给我的)
							if(targetId === msg.from){
								return (
									<Item
									   key = {msg._id}
										thumb = {targetIcon}>
									
									    {msg.content}
									</Item>
								)
							}else { // 我发给对方的消息
								return (
								    <Item
									    key = {msg._id}
										className = "chat-me"
										extra = '我'>
									
									    {msg.content}
									</Item>
								)
							}
						})
					}
	            	
	            	
	            </List>
	            <div className = "am-tab-bar">
	                <InputItem 
	                    placeholder = "请输入"
	                    value = { this.state.content }
	                    onChange = {(val) => this.setState({content:val})}
						onFocus = {() =>this.setState({isShow:false})}
						extra = {
							<span>
							   <span onClick = {this.toggle} style = {{'marginRight':'15px'}}>☺</span>
                        	   <span onClick = {this.handleSend}>发送</span>
							</span>
                        }
	                /> 
					{
						this.state.isShow
						 ? 
						 (
							<Grid
								data = {this.emojis}
								columnNum = {8}
								carouselMaxRow = {4}
								isCarousel = { true }
								onClick = {(item)=>{
									this.setState({content:this.state.content + item.text})
								}}
							/>
						):null
					}
						            	
	            </div>
            </div>

			)
	}
}

export default connect(
    state=>({user:state.user,chat:state.chat}), // 这些属性来自reduce
    {sendMsg}
	)(Chat)