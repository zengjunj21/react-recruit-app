/* 包含n个action creator
		  异步action
		  同步action*/

// 引入action_types（对象赋值解构的方式拿到属性直接使用）
import {
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_USER,
	RESET_USER,
	RECEIVE_USER_LIST
} from './action-types';

// 引入接口
import {reqRegister,
	    reqLogin,
	    reqUpdateUser,
	    reqUser,
	    reqUserList
} from '../api' //默认加载index.js文件

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
export const receiveUserList = (userList)=>({type:RECEIVE_USER_LIST,data:userList});

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