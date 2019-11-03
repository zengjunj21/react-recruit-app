/*
    包含了n个接口请求的函数的模块
    函数返回值为：promise
*/

// 引入ajax
import ajax from './ajax';

// 暴露函数两种写法，普通写法与es6写法
export function test(){

}

// es6写法
// 注册接口

// 简单写法
//export const reqRegister = () => ajax('/register',user,'POST');
export const reqRegister = (user) => {
    return ajax('/register',user,'POST');
}
// 登入接口
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST');

// 更新用户
export const reqUpdateUser = (user) => ajax('/update',user,'POSY');