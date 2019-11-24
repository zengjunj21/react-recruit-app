/*
    定义包含n个操作数据库集合数据的Model模块

    1.连接数据库
       1.1 引入mongoose
       1.2 连接指定数据库（url只有数据看是变化的）
       1.3 获取连接对象
       1.4 绑定连接完成的监听（用来提示连接成功）

    2.定义出对应特定集合的Model并向外暴露
       2.1 定义Schema(描述文档结构)
       2.2 定义Model（与集合对应，可以操作集合）
       2.3 向外暴露Model

*/
  const url = 'mongodb://localhost:27017/react_recruit_app';
   //1.连接数据库
  // 1.1 引入mongoose
  const mongoose = require("mongoose");
  // 1.2 连接指定数据库（url只有数据看是变化的）
  mongoose.connect(url)
  // 1.3 获取连接对象
  const coon = mongoose.connection;
  // 1.4 绑定连接完成的监听（用来提示连接成功）
  coon.on('connected',() =>{
  	console.log('连接数据库成功！！！')
  })


  // 2.定义出对应特定集合的Model并向外暴露
  // 2.1 定义Schema(描述文档结构)
  const userSchema = mongoose.Schema({
    	username:{type:String,require:true},//用户名
    	password:{type:String,require:true},//密码
    	type:{type:String,require:true},//用户类型：dashen/laoban
      header:{type:String}, //头像
      post:{type:String},//职位
      info:{type:String},//简介
      company:{type:String},//公司名称
      salary:{type:String},//薪水
  })
  // 2.2 定义Model（与集合对应，可以操作集合）
  const UserModel = mongoose.model('user',userSchema); //数据库中是users
  // 2.3 向外暴露Model
  //module.exports 一次性暴露
  //exports.xxx = value 分别暴露
  exports.UserModel = UserModel;

  // 定义chats集合的文档结构
  const chatSchema = mongoose.Schema({
      from:{type:String,required:true}, // 发送用户的id(别人)
      to:{type:String,required:true},   // 接收用户的id（我）
      chat_id:{type:String,required:true}, // from和to组成的字符串
      content:{type:String,required:true}, // 内容
      read:{type:Boolean,default:false},   // 标识是否已读
      create_time:{type:Number}            // 创建时间
  })

  // 定义能操作chats集合数据的Model
  const ChatModel = mongoose.model('chat',userSchema);
  //向外暴露Model
  exports.ChatModel = ChatModel;
