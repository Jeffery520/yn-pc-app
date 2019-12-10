var lockReconnect = false; //避免ws重复连接
var ws = null; //判断当前浏览器是否支持WebSocket
var wsUrl = 'ws://xxx.xxxxx.xxx.xxxx';

// createWebSocket(wsUrl); //连接ws

function createWebSocket(url) {
	try {
		if ('WebSocket' in window) {
			ws = new WebSocket(url);
		} else if ('MozWebSocket' in window) {
			ws = new MozWebSocket(url);
		} else {
			alert(
				'您的浏览器不支持websocket协议,建议使用新版谷歌、火狐等浏览器，请勿使用IE10以下浏览器，360浏览器请使用极速模式，不要使用兼容模式！'
			);
		}
		initEventHandle();
	} catch (e) {
		reconnect(url);
		console.log(e);
	}
}

function initEventHandle() {
	ws.onclose = function() {
		console.log('llws连接关闭！' + new Date().toUTCString());
		// reconnect(wsUrl);
	};
	ws.onerror = function() {
		console.log('llws连接错误！');
		reconnect(wsUrl);
	};

	ws.onopen = function() {
		heartCheck.reset().start(); //心跳检测重置
		console.log('llws连接成功！' + new Date().toUTCString());
	};
	ws.onmessage = function(event) {
		//如果获取到消息，心跳检测重置
		heartCheck.reset().start(); //拿到任何消息都说明当前连接是正常的
		var eventData = event.data;
		handMsg(eventData);
	};
}

function reconnect(url) {
	if (lockReconnect) return;
	lockReconnect = true;
	setTimeout(function() {
		//没连接上会一直重连，设置延迟避免请求过多
		createWebSocket(url);
		lockReconnect = false;
	}, 2000);
}

//心跳检测
var heartCheck = {
	timeout: 6000, //1分钟发一次心跳
	timeoutobj: null,
	serverTimeoutObj: null,
	reset: function() {
		clearTimeout(this.timeoutObj);
		clearTimeout(this.TimeoutObj);
		return this;
	},
	start: function() {
		var self = this;
		this.timeoutObj = setTimeout(function() {
			//这里发送一个心跳，后端收到后，返回一个心跳信息
			//onmessage拿到返回的心跳就说明连接正常
			ws.send('ping');
			console.log('ping!');
			self.serverTimeoutObj = setTimeout(function() {
				//如果超过一定时间还没重置，说明后端主动断开了
				//如果onclose会执行reconnect，我们执行ws.close()就行了，如果直接执行reconnect会触发onclose导致重连两次
				ws.close();
			}, self.timeout);
		}, this.timeout);
	}
};

// ======================================心跳包重连code end===============================

//处理消息
function handMsg(evtdata) {}
