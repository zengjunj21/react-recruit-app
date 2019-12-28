/* 包含n个action creator
		  异步action
		  同步action*/

// 引入action_types（对象赋值解构的方式拿到属性直接使用）
import {
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_USER,
	RESET_USER,
	RECEIVE_USER_LIST,
	RECEIVE_MSG_LIST,
	RECEIVE_MSG,MSG_READ
} from './action-types';

// 引入接口
import {reqRegister,
	    reqLogin,
	    reqUpdateUser,
	    reqUser,
		reqUserList,
		reqChatMsgList,
		reqReadMsg
} from '../api' //默认加载index.js文件

// 引入客户端io
import io  from 'socket.io-client';



// 授权成功的同步action
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user});
// 错误提示信息的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});
//接收用户的同步action
const receiveUser = (user) => ({type:RECEIVE_USER,data:user});
//重置用户的同步action
//const resetUser = (msg) =>()
export function resetUser(msg){
	return {
		type:RESET_USER,
		data:msg
	}
}

// 接收用户列表的同步action
const receiveUserList = (userList)=>({type:RECEIVE_USER_LIST,data:userList});

// 接收消息列表的同步action
const receiveMsgList = ({users,chatMsgs,userid})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}})
// 接收一个消息的同步action
const receiveMsg = (chatMsg,userid) =>({type:RECEIVE_MSG,data:{chatMsg,userid}})
// 读取某个聊天消息的同步action
const msgRead = (count,from,to) => ({type:MSG_READ,data:{count,from,to}})

// 注册异步action（一旦写上了await，这条语句所在的函数就必须声明成async）
export const register = (user)=>{
	const {username,password,password2,type} = user;
    //表单验证，如果不通过，返回一个errorMsg的同步action
    if(!username){
    	return errorMsg('用户名不能为空');
    }else if(password !== password2){
    	return errorMsg('密码输入不一致');
    }
    //表单数据合法，返回一个发ajax请求的异步action
	return async dispatch =>{
		/*
           const responce = reqRegister(user);
           responce.then(res=>{
	           const result = res.data;
           })
		*/
		//发送注册的异步ajax await马上能得到结果，不加则返回的是一个promise
		const response = await reqRegister({username,password,type});
		const result = response.data; //{code:0,data:user,msg:''}
		//不管是成功还是失败都要分发同步的action
		if(result.code === 0){//成功

			getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))
		}else{//失败
            dispatch(errorMsg(result.msg))
		} 
	}
}



// 登入异步action（一旦写上了await，这条语句所在的函数就必须声明成async）
export const login = (user)=>{
	const {username,password} = user;
    //表单验证，如果不通过，返回一个errorMsg的同步action
    if(!username){
    	return errorMsg('用户名不能为空');
    }else if(!password){
    	return errorMsg('密码不能为空');
    }
    //表单数据合法，返回一个发ajax请求的异步action
	return async (dispatch) =>{
		//发送注册的异步ajax await马上能得到结果，不加则返回的是一个promise
		const response = await reqLogin({username,password});
		const result = response.data;
		//不管是成功还是失败都要分发同步的action
		if(result.code === 0){//成功
			getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))
		}else{//失败
            dispatch(errorMsg(result.msg))
		} 
	}
}

//更新用户异步action
export const updateUser = (user)=>{
	return async function (dispatch){
        const response = await reqUpdateUser(user);
        const result = response.data;
        if(result.code == 0){//更新成功 data
           dispatch(receiveUser(result.data))
        }else{//更新失败 msg
           dispatch(resetUser(result.msg));
        }
	}
}


//获取用户异步action
export const getUser = () =>{
	return async function(dispatch){
		//执行异步ajax请求
		const response = await reqUser();
		const result = response.data;
		if(result.code === 0){
			getMsgList(dispatch,result.data._id)
			dispatch(receiveUser(result.data)) //同步action
		}else{
            dispatch(resetUser(result.msg));
		} 

	}
}

//获取用户列表异步action
export const getUserList = (type)=>{
	return async function (dispatch){
		//执行异步action请求
        const response = await reqUserList(type);
        const result = response.data;

		//得到结果后，分发一个同步action
		if(result.code == 0){
           dispatch(receiveUserList(result.data))
	    }
	}
}

// 获取异步消息列表数据
async function getMsgList(dispatch,userid){
	// 初始化Io
	initIO(dispatch,userid);
	const responce = await reqChatMsgList();
	const result = responce.data;
	console.log("------------",result)
	if(result.code == 0){
		// 获取数据
		const {users,chatMsgs} = result.data;
		// 分发同步action
		dispatch(receiveMsgList({users,chatMsgs,userid}))
		
	}
}

/*
	单例对象（单一的实例，整个内存里面只有一个socket对象）
	1. 创建对象之前：判断对象是否已经存在，只有不存在才去创建
	2. 创建对象之后：保存对象
*/

function initIO(dispatch,userid){
	// 1. 创建对象之前：判断对象是否已经存在，只有不存在才去创建
	if(!io.socket){
        // 连接服务器，得到代表连接的socket对象
	    io.socket = io('ws://localhost:3003');
		// 绑定 receiveMsg 的监听，来接收服务器发送的消息
		io.socket.on('receiveMsg',function(chatMsg){
		   // 只有chatMsg是当前用户相关的消息，才会分发同步action保存消息
		   if(userid == chatMsg.from || userid == chatMsg.to){
			   dispatch(receiveMsg(chatMsg,userid))

		   }
			console.log('客户端接收服务器发送的消息',chatMsg)
		})
	}

}


// 异步发送消息的action
export const sendMsg = ({from,to,content}) =>{
	return dispatch =>{
		console.log("客户端向服务器发送消息",{from,to,content})
		
		// 发消息
		io.socket.emit('sendMsg',{from,to,content})
		
	}
}

// 读取消息的异步action
export const readMsg = (from,to)=>{
	return async function (dispatch){
		const response = await reqReadMsg(from);
		const result = response.data;
		if(result.code === 0){
			const count = result.data;
			// 调用同步action
			dispatch(msgRead(count,from,to))
		}
		
	}
}