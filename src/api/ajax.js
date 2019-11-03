/*
    能发送ajax请求的函数模块
    函数的返回值是promise对象

*/
// axios
import axios from 'axios';


export default function ajax(url ,data={},method = "GET"){
    //大部分请求都是get所以默认为get
    if(method === "GET"){
    	/*
            data:{username:pkq,password:123}
            paramStr:username=qkq&password=123
    	*/
    	var paramStr = '';
        Object.keys(data).forEach(key =>{
        	 paramStr += key +"="+ data[key] + "&";
        })

       // if(paramStr){
           paramStr = paramStr && paramStr.substring(0,paramStr.length-1);
       // }

         /*if(data){
             for(var key in data){
               paramStr += key +"="+ data[key] + "&"
             }
         }*/


    	// 使用axios发get请求，返回的是promise对象
        return axios.get(url + "?" +paramStr);
    }else{
    	// 使用axios发get请求，返回的是promise对象
    	return axios.post(url,data)
    }
}