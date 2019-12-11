export default class Socket {
	constructor(heartData) {
		this.WS_UIL = 'ws://192.168.31.108:10422/ws';
		this.heartData = heartData;
		this.intro = '';
		this.isTouch = false;
		this.connectError = false;
		this.connecting = false;
		this.lockReconnect = false; //避免重复连接
		this.timeoutFlag = true;
		this.timeoutSet = null;
		this.reconectNum = 0;
		this.timeout = 30000; //超时重连间隔
		this.ws = null;
	}

	// 当open时需要发送touch数据
	touchWS(touchData, callback) {
		if (this.ws.readyState === 1) {
			this.connectError = false;
			this.loading = false;
			// 发送touch验证
			if (!this.isTouch) {
				this.ws.send(JSON.stringify(touchData));
				this.isTouch = true;
			}
			setTimeout(() => {
				this.heartCheck()
					.reset()
					.start();
			}, 1000);
			callback();
		} else {
			if (this.connectError || this.connecting) {
				setTimeout(() => {
					this.onopenWS();
				}, 5000);
			}
		}
	}

	createWebSocket(onopen, onmessage, onerror) {
		console.info(`${this.intro}创建11`);
		this.timeoutSet = setTimeout(() => {
			if (this.timeoutFlag && this.reconectNum < 3) {
				console.info(`${this.intro}重连22`);
				this.reconectNum++;
				this.createWebSocket();
			}
		}, this.timeout);
		this.ws = new WebSocket(this.WS_UIL);
		this.ws.onopen = (evt) => {
			this.reconectNum = 0;
			this.timeoutFlag = false;
			clearTimeout(this.timeoutSet);
			onopen(evt);
		};
		this.ws.onmessage = (evt) => {
			this.heartCheck()
				.reset()
				.start();
			if (evt.data === 'HeartBeat') return;
			onmessage(evt, this.ws);
		};
		this.ws.onclose = (evt) => {
			console.log(evt);
			console.info(`${this.intro}关闭11`, evt.code);
			if (evt.code !== 1000) {
				this.timeoutFlag = false;
				clearTimeout(this.timeoutSet);
				this.reconnect(evt);
			} else {
				clearInterval(this.heartCheck().timeoutObj);
				clearTimeout(this.heartCheck().serverTimeoutObj);
			}
		};
		this.ws.onerror = function(evt) {
			console.info(`${this.intro}错误11`);
			this.reconnect(evt); //重连
			onerror(evt);
		};
	}
	reconnect(evt) {
		if (this.lockReconnect) return;
		this.lockReconnect = true;
		//没连接上会一直重连，设置延迟避免请求过多
		if (this.reconectNum < 3) {
			setTimeout(() => {
				this.timeoutFlag = true;
				this.createWebSocket();
				console.info(`${this.intro}正在重连第${this.reconectNum + 1}次`);
				this.reconectNum++;
				this.lockReconnect = false;
			}, 10000); //这里设置重连间隔(ms)
		} else {
			onerror(evt);
		}
	}

	closeWebSocket() {
		this.ws.close();
	}
	//心跳检测
	heartCheck() {
		const that = this;
		return {
			timeout: 30000, //毫秒
			timeoutObj: null,
			serverTimeoutObj: null,
			reset: function() {
				clearInterval(this.timeoutObj);
				clearTimeout(this.serverTimeoutObj);
				return this;
			},
			start: function() {
				let count = 0;
				this.timeoutObj = setInterval(() => {
					if (count < 3) {
						if (that.ws.readyState === 1) {
							that.ws.send(JSON.stringify(that.heartData));
							console.info(`${that.intro}HeartBeat第${count + 1}次`);
						}
						count++;
					} else {
						clearInterval(this.timeoutObj);
						count = 0;
						if (that.ws.readyState === 0 && that.ws.readyState === 1) {
							that.ws.close();
						}
					}
				}, this.timeout);
			}
		};
	}
}

// function Socket(url, onopen, onmessage, onerror, heartData, intro = '') {
// 	let isTouch = false;
// 	let lockReconnect = false; //避免重复连接
// 	let timeoutFlag = true;
// 	let timeoutSet = null;
// 	let reconectNum = 0;
// 	const timeout = 30000; //超时重连间隔
// 	let ws;
// 	function reconnect(evt) {
// 		if (lockReconnect) return;
// 		lockReconnect = true;
// 		//没连接上会一直重连，设置延迟避免请求过多
// 		if (reconectNum < 3) {
// 			setTimeout(function() {
// 				timeoutFlag = true;
// 				createWebSocket();
// 				console.info(`${intro}正在重连第${reconectNum + 1}次`);
// 				reconectNum++;
// 				lockReconnect = false;
// 			}, 10000); //这里设置重连间隔(ms)
// 		} else {
// 			onerror(evt);
// 		}
// 	}
// 	// 当open时需要发送touch数据
// 	this.touchWS = function(touchData, callback) {
// 		if (ws.readyState === 1) {
// 			this.connectError = false;
// 			this.loading = false;
// 			// 发送touch验证
// 			if (!isTouch) {
// 				ws.send(JSON.stringify(touchData));
// 				isTouch = true;
// 			}
// 			setTimeout(() => {
// 				heartCheck.reset().start();
// 			}, 1000);
// 			callback();
// 		} else {
// 			if (this.connectError || this.loading) {
// 				setTimeout(() => {
// 					this.onopenWS();
// 				}, 5000);
// 			}
// 		}
// 	};
//
// 	//心跳检测
// 	const heartCheck = {
// 		timeout: 30000, //毫秒
// 		timeoutObj: null,
// 		serverTimeoutObj: null,
// 		reset: function() {
// 			clearInterval(this.timeoutObj);
// 			clearTimeout(this.serverTimeoutObj);
// 			return this;
// 		},
// 		start: function() {
// 			const self = this;
// 			let count = 0;
// 			this.timeoutObj = setInterval(() => {
// 				if (count < 3) {
// 					if (ws.readyState === 1) {
// 						ws.send(JSON.stringify(heartData));
// 						console.info(`${intro}HeartBeat第${count + 1}次`);
// 					}
// 					count++;
// 				} else {
// 					clearInterval(this.timeoutObj);
// 					count = 0;
// 					if (ws.readyState === 0 && ws.readyState === 1) {
// 						ws.close();
// 					}
// 				}
// 			}, self.timeout);
// 		}
// 	};
//
// 	const createWebSocket = () => {
// 		console.info(`${intro}创建11`);
// 		timeoutSet = setTimeout(() => {
// 			if (timeoutFlag && reconectNum < 3) {
// 				console.info(`${intro}重连22`);
// 				reconectNum++;
// 				createWebSocket();
// 			}
// 		}, timeout);
// 		ws = new WebSocket(url);
//
// 		ws.onopen = (evt) => {
// 			reconectNum = 0;
// 			timeoutFlag = false;
// 			clearTimeout(timeoutSet);
// 			onopen(evt);
// 		};
// 		ws.onmessage = (evt) => {
// 			heartCheck.reset().start();
// 			if (evt.data === 'HeartBeat') return;
// 			onmessage(evt, ws);
// 		};
// 		ws.onclose = (evt) => {
// 			console.log(evt);
// 			console.info(`${intro}关闭11`, evt.code);
// 			if (evt.code !== 1000) {
// 				timeoutFlag = false;
// 				clearTimeout(timeoutSet);
// 				reconnect(evt);
// 			} else {
// 				clearInterval(heartCheck.timeoutObj);
// 				clearTimeout(heartCheck.serverTimeoutObj);
// 			}
// 		};
// 		ws.onerror = function(evt) {
// 			console.info(`${intro}错误11`);
// 			reconnect(evt); //重连
// 		};
// 	};
// 	createWebSocket();
// 	return ws;
// }
// export default Socket;
