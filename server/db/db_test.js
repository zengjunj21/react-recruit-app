/*
    测试使用Mongoose 操作数据库

    1.连接数据库
        - 引入mongoose
        - 连接指定数据库（url只有数据库是变化的）
        - 绑定连接完成的监听（用来提示连接成功）

    2.得到对应特定集合的Model
        - 定义Schema(描述文档结构)
        - 定义Model(与集合对应，可以操作集合)

    3.通过model实例或其实例对集合数据进行 CRUD 操作
        - 通过Model实例的save()添加数据
        - 通过Model的find()/findOne() 查询多个或一个数据
        - 通过Model的findByIdAndUpdate() 更新某个数据
        - 通过Model的remove()删除匹配的数据

*/
const md5 =  require("blueimp-md5"); //md5加密函数
var url = 'mongodb://localhost:27017/react_recruit_app';
// 1.连接数据库
// 1.1 引入mongoose
const mongoose = require("mongoose");
// 1.2 连接指定数据库（url只有数据库是变化的）
mongoose.connect(url);
// 1.3获取连接对象
const conn = mongoose.connection
// 1.4绑定连接完成的监听（用来提示连接成功）
conn.on('connected',function(){
	console.log("连接数据库成功，yes！！！")
})
 //测试是否连接成功
 //node server/db/db_test.js 可直接进入当前文件夹目录进行node

/*conn.on("error",function(){
	console.log('连接失败')
});
conn.on("disconnected",function(){
	console.log('断开连接')
});*/

// 2.得到对应特定集合的Model，用来操作集合数据的（在mogodb中有两个概念，一个是文档一个是集合）
//什么是文档什么是集合
//文档为对象类型（我们存进去的数据对象）
//集合为数组类型（多个文档存放在一起叫集合，多个文档的数组）
// 2.1定义Schema(描述文档结构)
const userSchema = mongoose.Schema({//指定文档的结构，属性名，属性值的的类型，是否是必须的，默认值是多少
	username:{type:String,require:true},//用户名
	password:{type:String,require:true},//密码
	type:{type:String,require:true},//用户类型：dashen/laoban
    header:{type:String} //头像
})
// 2.2定义Model(与集合对应，可以操作集合)
const UserModel = mongoose.model('user',userSchema);//数据库集合名users

// 3.通过model实例或其实例对集合数据进行 CRUD 操作
// 3.1通过Model实例的save()添加数据
function testSave(){
    //创建UserModel的实例
    const userModel = new UserModel({
    	username:'admin',
    	password:md5('admin'),
    	type:'laoban'
    })
    //调用数据保存
    userModel.save(function(err,userDoc){
        console.log("save()",err,userDoc);
       
    })
}

//testSave()

// 3.2通过Model的find()/findOne() 查询多个或一个数据(find()/findOne()是函数对象的方法)
function testFind(){
    //查询多个(得到的是包含所有匹配文档对象的数组，如果没有匹配的结果为空数组)
    UserModel.find(function(err,users){
        console.log("find()",err,users)

    })
    console.log("-------------------")
    //查询一个（得到是匹配的文档对象，如果没有匹配的就是 null）
    UserModel.findOne({_id:'5dbd1ee99a7bd224343c4371'},function(err,user){
        console.log("findOne()",err,user)
    })
    console.log("-------------------")

}
//testFind()
// 3.3通过Model的findByIdAndUpdate() 更新某个数据
function testUpdate(){
    UserModel.findByIdAndUpdate({_id:'5dbd1ee99a7bd224343c4371'},{username:'pikaqiu'},function(err,user){//user 返回的是老的对象
        console.log("findByIdAndUpdate()",err,user)
    })
}
//testUpdate()
// 3.4通过Model的remove()删除匹配的数据
function testRemove(){
    UserModel.remove({_id:'5dbd1ee99a7bd224343c4371'},function(err,user){
        console.log("remove",err,user) //{ n: 1, ok: 1, deletedCount: 1 }
    })
}
//testRemove()