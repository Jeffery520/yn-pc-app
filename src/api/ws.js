let WS_URL = 'ws://192.168.31.108:10422/ws';
let ws = null;
let setIntervalWesocketPush = null;
let reconnectTimes = 0;
/*
 * 建立websocket连接
 */
function creatWebSocket() {
	console.log('初始化WebSocket对象');
	closeWS();
	ws = new WebSocket(WS_URL);
	return new Promise((resolve, reject) => {
		// 监听打开连接
		ws.onopen = (ev) => {
			console.log('onopen');
			resolve({ status: 'onopen', event: ev });
		};
		// 监听连接错误
		ws.onerror = (ev) => {
			if (reconnectTimes <= 2) {
				reconnect();
			} else {
				// 尝试进行2次重连，如果失败返回
				reconnectTimes = 0;
				reject({ status: 'onerror', event: ev });
			}
		};
		// 监听关闭连接
		ws.onclose = () => {
			console.log('oncloseWS');
			clearInterval(setIntervalWesocketPush);
		};
		// 接收消息行为
		ws.onmessage = onmessageWS;
	});
}

/*
 * 断开重连
 */
function reconnect() {
	setTimeout(function() {
		//没连接上会一直重连，设置延迟避免请求过多
		creatWebSocket();
	}, 2000);
}

/*
 * WS数据接收统一处理
 */
function onmessageWS(ev) {
	console.log('onmessageWS');
	window.dispatchEvent(
		new CustomEvent('onmessageWS', {
			detail: ev
		})
	);
}

/*
 * 发送数据
 * @param eventType
 */
function sendWS(data) {
	console.log('sendWS');
	const obj = data;
	if (ws !== null && ws.readyState === 3) {
		console.log('creatWebSocket');
		ws.close();
		creatWebSocket(); //重连
	} else if (ws.readyState === 1) {
		ws.send(JSON.stringify(obj));
	} else if (ws.readyState === 0) {
		setTimeout(() => {
			ws.send(JSON.stringify(obj));
		}, 3000);
	}
}
/*
 * 关闭WS
 */
function closeWS() {
	reconnectTimes = 0;
	clearInterval(setIntervalWesocketPush);
	if (ws) {
		ws.close();
	}
}
/*
 * 发送心跳
 */
function sendPing(pingData) {
	clearInterval(setIntervalWesocketPush);
	pingData = JSON.stringify(pingData);
	console.log(pingData);
	ws.send(pingData);
	setIntervalWesocketPush = setInterval(() => {
		ws.send(pingData);
	}, 10000);
}

export default {
	creatWebSocket,
	onmessageWS,
	sendWS,
	closeWS,
	sendPing
};
