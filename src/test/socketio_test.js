// 引入客户端io
import io  from 'socket.io-client';

// 连接服务器，得到代表连接的socket对象
const socket = io('ws://localhost:3003');

// 绑定 receiveMsg 的监听，来接收服务器发送的消息
socket.on('receiveMsg',function(data){
	console.log('浏览器接收到消息',data)
})

socket.emit('sendMsg',{name:'pkq',data:Date.now()});
console.log('浏览器向服务器发送消息',{name:'pkq',data:Date.now()})