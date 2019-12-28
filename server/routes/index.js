var express = require('express');
var router = express.Router();

//引入模型
const {UserModel,ChatModel} = require("../db/models");
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

// 更新用户信息的路由
router.post('/update',function(req,res){

    //从请求的cookie中得到userid
    const userid = req.cookies.userid;
    //const userid = '5dbd20f6937f4d29c4004bf4';
    //如果不存在，返回一个提示信息的结果
    if(!userid){
        return res.send({code:1,msg:'请先登入'});
    }
    //存在，根据userid更新对应的user文档数据
    //得到提交的用户数据
    const user = req.body;
    UserModel.findByIdAndUpdate({_id:userid},user,function(err,oldUser){//先查询在更新
        //
        if(!oldUser){
           //通知浏览器删除userid cookie
           res.clearCookie('userid');
           //返回一个提示信息
           res.send({code:1,msg:'请先登入'});
        }else {
            //准备一个返回用户数据的对象
            const {_id,username,type} = oldUser;
            const data = Object.assign({_id,username,type},user);//将多个对象合并成一个对象并返回
            console.log("------------------------");
            console.log(oldUser);
            console.log("------------------------");
            console.log(data);
            console.log("------------------------");
            res.send({code:0,data});
        }

    })

})

//获取用户信息的路由（根据cookie中的userid）
router.get('/user',function(req,res){
    //从请求的cookie中得到userid
    const userid = req.cookies.userid;
    //如果不存在，返回一个提示信息的结果
    if(!userid){
        return res.send({code:1,msg:'请先登入'});
    }
    //根据userid查询对于的user
    UserModel.findOne({_id:userid},filter,function(err,user){
        res.send({code:0,data:user})
    })
})

//获取用户列表（根据类型）
router.get('/userList',function(req,res){
    const { type } = req.query ;
    UserModel.find({type},filter,function(err,users){
       res.send({code:0,data:users})
    })
})



//获取当前用户所有相关聊天信息列表
router.get('/msgList',function(req,res){
    // 获取cookie中的userid
    const userid = req.cookies.userid;
    UserModel.find(function(err,userDoc){ //{userid},
        // 用对象存储所有的user信息，key为user的_id,value为name和header组成的user对象
        const users = {};
        userDoc.forEach((doc)=>{
            users[doc.id] = {
                username:doc.username,
                header:doc.header
            }
        })
        // 高大上方法
       /* const users = userDoc.reduce((users,user)=>{
            users.[doc.id] = {
                username:doc.username,
                header:doc.header
            }

            return users

        },{})*/

        /*
            查询userid 相关的所有聊天信息
            参数1：查询条件
            参数2：过滤条件
            参数3：回调函数

            $or 或者 （查询条件是from:userid或者to:userid）
        */

        ChatModel.find({'$or':[{from:userid},{to:userid}]},filter,function(err,chatMsgs){
            // 返回包含所有用户和当前用户相关的所有聊天消息的数据
            res.send({code:0,data:{users,chatMsgs}})

        })

    })

})

//修改制定消息为已读
router.post('/readmsg',function(req,res){
   
    // 得到请求中的from和to
    const from = req.body.from; //（别人）
    const to = req.cookies.userid; //(我)
    console.log('----------------------')
    console.log(from)
    console.log(to)
    console.log('----------------------')
    /*
        更新数据库中的chat数据
        参数1：查询条件
        参数2：更新为指定的数据对象
        参数3：是否1次更新多条，默认只会更新一条
        参数4：更新完成的回调函数
        multi 一次更新多条
    */

    ChatModel.update({from,to,read:false},{read:true},{multi:true},function(err,doc){
        console.log('/readmsg',doc)
        res.send({code:0,data:doc.nModified}); // 更新的数量
    })
})


module.exports = router;
