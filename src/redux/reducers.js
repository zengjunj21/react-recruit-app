/* 包含多个用于生成state的reduces函数的模块，根据老的state 和指定的action返回一个新的state*/
    import { combineReducers } from 'redux'
    
    // 引入action_types
	import {
		AUTH_SUCCESS,
		ERROR_MSG,
		RECEIVE_USER,
		RESET_USER,
		RECEIVE_USER_LIST,
		RECEIVE_MSG_LIST,
		RECEIVE_MSG,
		MSG_READ

	} from './action-types';
    //工具函数
    import {getRedirectTo} from '../utils';
    //用户
    const initUser = {
        username:'', //用户名
        type:'',     //用户类型
        msg:'',      //错误提示信息
        redirectTo:'',//需要自动重定向的路由路径
    } 

    //产生user状态的reducer（注册，登入返回的是一个user（对象），将返回的值存储起来好管理）
	function user(state = initUser,action){ //action 中有type 与data
        switch(action.type){
        	case AUTH_SUCCESS:

        	    const {type,header} = action.data;
        	    //return action.data
        	   // return {...state,...action.data} // 先把原本的状态解构出来，接着用action.data把以前的数据给覆盖掉
        	    return {...action.data,redirectTo:getRedirectTo(type,header)} //state 中保留了原来的state，所以不要了，用最新的，因为注册成功之后可以直接去主页面了或者去信息完善页面。
        	case ERROR_MSG:
        	    return {...state,msg:action.data}// 先把原来的msg解构出来，接着用action.data替换msg
        	case RECEIVE_USER:
        	    return action.data
    	    case RESET_USER:
    	    return {...initUser,msg:action.data}

        	default:
        	    return state
        }
	}

    const initUserList = [];

    //产生userlist状态的reducer
    function userList(state = initUserList,action){
        switch(action.type){
            case RECEIVE_USER_LIST:
            return action.data;       //data为用户的列表
            default :
            return state

        }

	}
	
    const initChat = {
		users:{}, // 包含所有的用户的信息的对象
		chatMsgs:[],// 当前用户所有相关msg的数量
		unReadCount:0 // 总的未读数量
	}
	// 产生聊天状态的reduce
	function chat (state = initChat,action){
		switch(action.type){
			case RECEIVE_MSG_LIST: // {users,chatMsgs}
			    const {users,chatMsgs,userid} = action.data
				return {
					users,
					chatMsgs,
					unReadCount:chatMsgs.reduce((preTotal,msg)=>preTotal + (!msg.read && msg.to === userid ? 1:0),0)
				}
			case RECEIVE_MSG: // {chatMsg}
			    const  {chatMsg}  = action.data;  
				return {
					users:state.users,
					chatMsgs:[...state.chatMsgs,chatMsg],
					unReadCount:state.unReadCount + (!chatMsg.read && chatMsg.to ===  action.data.userid ? 1:0)
				}
			case MSG_READ:
				const {from ,to ,count } = action.data
				return {
					users:state.users,
					chatMsgs:state.chatMsgs.map(msg=>{
						// 需要更新
						if(msg.from == from && msg.to == to && !msg.read){
							return {...msg,read:true}
						}else{ // 不需要更新
							return msg
						}
					}),
					unReadCount:state.unReadCount - count
				}
			default:
				return state
		}

	}


	export default combineReducers({
	  user,
	  userList,
	  chat
	})

	//向外暴露的状态的结构 ：{user:{},userList:[],chat：{}}
	/*
	
	    redux的 combineReducers方法 用于Reducer的拆分，只要定义各个子Reducer函数，然后用这个方法将他合成一个大的reducer
	*/



	