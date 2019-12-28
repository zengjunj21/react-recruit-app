/*  包含n个action type名称常量*/

// 注册，登入的action
export const AUTH_SUCCESS = 'aitj_success';
// 错误提示信息的action 请求前、请求后
export const ERROR_MSG = 'error_msg';

export const RECEIVE_USER = 'receive_user';//接收用户
export const RESET_USER = 'reset_user';//重置用户信息

export const RECEIVE_USER_LIST = 'receive_user_list';//接收用户列表数据

export const RECEIVE_MSG_LIST = 'receive_msg_list';//接收所有相关消息列表
export const RECEIVE_MSG = 'receive_msg'; // 接收一条消息
export const MSG_READ = 'msg_read' //已读某一个聊天消息