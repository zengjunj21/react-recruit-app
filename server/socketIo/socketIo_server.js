
const {ChatModel} = require('../db/models');
module.exports = function(server){
	//得到IO对象
	const io = require('socket.io')(server);
	//监视连接（当有一个客户连接上时回调）
	io.on('connection',function(socket){
        console.log('有一个客户端连接上了服务器');
        //绑定时sendMsg监听，接收客户端发送的消息
        socket.on('sendMsg',function(data){
            console.log('服务器接收到浏览器的消息',data)
            let {from,to,content} = data;
            // 准备消息对象的相关数据
            const chat_id = [from,to].sort().join('_'); // from_to to_from
            const create_time = Date.now();

            // 处理数据(保存数据)
            new ChatModel({from,to,content,chat_id,create_time}).save(function(err,chatMsg){
                // 向所有连接上的客户端发消息（这种方式不友好，服务端需要特殊处理）
                io.emit('receiveMsg',chatMsg);
            })
            
            
        })
	})
}