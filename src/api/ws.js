var websocket;
function connect() {
	var msg = document.getElementById('message');
	try {
		var readyState = new Array(
			'正在连接',
			'已建立连接',
			'正在关闭连接',
			'已关闭连接'
		);
		var url = 'ws://192.168.31.108:10422/ws';
		websocket = new WebSocket(url);
		msg.innerHTML +=
			'<p>Socket状态为:' + readyState[websocket.readyState] + '</p>';
		websocket.onopen = function() {
			msg.innerHTML +=
				'<p>Socket状态为' + readyState[websocket.readyState] + '</p>';
		};
		websocket.onmessage = function(msg) {
			msg.innerHTML += '<p>接收信息：' + msg.data + '</p>';
		};
		websocket.onclose = function() {
			msg.innerHTML +=
				'<p>Socket状态为:' + readyState[websocket.readyState] + '</p>';
		};
	} catch (e) {
		msg.innerHTML += '<p>发生异常了</p>';
	}
}
function send() {
	var text = document.getElementById('text').value;
	var msg = document.getElementById('message');
	if (text == '') {
		msg.innerHTML += '<p>请输入一些文字</p>';
		return;
	}
	try {
		websocket.send(text);
		msg.innerHTML += '<p>发送数据:' + text + '</p>';
	} catch (e) {
		msg.innerHTML += '<p>发送数据异常了</p>';
	}
	document.getElementById('text').value = '';
}
function disconnect() {
	websocket.close();
}

// todo
// const str = { title: 'hello service' };
// var ws = new WebSocket('ws://192.168.31.108:10422/ws');
// ws.onopen = function(event) {
//   // 开始通信时的处理
//   console.log(event);
//   console.log('Connection open ...');
//   ws.send(JSON.stringify(str));
// };
// ws.onmessage = function(event) {
//   console.log('WebSocket message received:');
//   console.log(event);
// };
