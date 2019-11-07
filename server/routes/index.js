var express = require('express');
var router = express.Router();

//引入模型
const {UserModel} = require("../db/models");
//md5加密函数
const md5 =  require("blueimp-md5"); 


//指定过滤的属性（过滤掉password与__v）
const filter = {password:0,__v:0}

/* GET home page. 
    配置路由
    渲染index页面，并传递了一个title,在index中可以看到有接收title

*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express,哈哈' });
});

//注册一个路由：用户注册  test
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

/*router.post('/register',function(req,res,next){//req 请求，res响应
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
*/

//注册路由 
router.post('/register',function(req,res){
    // 读取请求参数 （post请求从body中取数据）
    const {username,password,type} = req.body;

    // 处理(先查询在入库)
    // 判断用户是否已经存在，如果存在，返回提示错误的提示信息，如果不存在进行保存
    // 查询（根据username）
    UserModel.findOne({username},(err,userDoc)=>{
        //如果user有值说明已存在
        if(userDoc){
            //存在返回提示信息
            res.send({
                code:1,
                msg:'此用户已存在'
            })
 
        }else{
            //没有值说明不存在
            const userModel = new UserModel({username,type,password:md5(password)});
            userModel.save((err,user)=>{
                //返回包含user的json数据
                const data = {username,type,_id:user._id}
                //生成一个cookie（userid:user._id）,并交给浏览器保存
                res.cookie('userid',user._id,{maxAge:1000*60*60*24*7});
                //响应数据中不要携带密码password
                res.send({code:0,data:data})
            })

        }
    })

    // 返回响应数据
})


//登入路由
router.post('/login',(req,res)=>{
    //获取参数
    const {username,password} = req.body;
    //处理
    //根据username和password查询数据库users,如果没有返回提示错误的信息，如果有返回登入成功的信息（包含user）
    //filter:用于查询时过滤不需要的属性，比如：下面我不想把密码返回回来
    UserModel.findOne({username,password:md5(password)},filter,(err,user)=>{
        if(user){//登入成功
            res.cookie('userid',user._id,{maxAge:1000*60*60*24});
            //返回登入成功的信息
            res.send({code:0,data:user})
        }else{//登入失败
            res.send({code:1,msg:'用户名或密码不正确！'})
        }
    })
    //返回数据
})



module.exports = router;
