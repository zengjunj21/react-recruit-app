var express = require('express');
var router = express.Router();

/* GET home page. 
    配置路由
    渲染index页面，并传递了一个title,在index中可以看到有接收title

*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express,哈哈' });
});

//注册一个路由：用户注册
/*
    1.path:register
    2.请求方式：POST
    3.接收username与password参数
    4.admin为已注册用户
    5.注册成功返回{code:0,data:{id:'abc',username:'',password:'123'}}
    6.注册失败{code:1,msg:'此用户已存在'}
 */
/*
    1.处理请求参数
    2.处理
    3.返回响应数据
*/
router.post('/register',function(req,res,next){//req 请求，res响应
	//获取请求参数
	const {username,password} = req.body;
	//2.处理
	if(username === 'admin'){//注册失败
        //返回响应
        res.send({
        	code:1,
        	msg:'此用户已存在'
        })
	}else{ //注册成功
		//返回响应
        res.send({
        	code:0,
        	data:{
        		id:'abc',
        		username:'',
        		password:''
        	}
        })
	}
	

})

module.exports = router;
