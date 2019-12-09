let WS_URL = 'ws://192.168.31.108:10422/ws';
let setIntervalWesocketPush = null;
// let ws = null;
// let reconnectTimes = 0;
export default {
	methods: {
		data() {
			return {
				ws: null,
				reconnectTimes: 0
			};
		},
		/*
		 * 建立websocket连接
		 */
		creatWebSocket() {
			console.log('初始化WebSocket对象');
			return new Promise((resolve, reject) => {
				this.ws = new WebSocket(WS_URL);

				// 监听打开连接
				this.ws.onopen = (ev) => {
					console.log('onopen', ev);
					resolve({ status: 'onopen', event: ev });
				};
				// 监听连接错误
				this.ws.onerror = (ev) => {
					console.log('onerror');
					console.log(JSON.stringify(ev));
					if (this.reconnectTimes <= 2) {
						this.reconnect();
					} else {
						// 尝试进行2次重连，如果失败返回
						window.dispatchEvent(
							new CustomEvent('onerrorWS', {
								detail: ev
							})
						);
						reject({ status: 'onerror', event: ev });
					}
				};

				// 监听关闭连接
				this.ws.onclose = (ev) => {
					console.log('oncloseWS');
					window.dispatchEvent(
						new CustomEvent('oncloseWS', {
							detail: ev
						})
					);
					clearInterval(setIntervalWesocketPush);
				};
				// 接收消息行为
				this.ws.onmessage = this.onmessageWS;
			});
		},

		/*
		 * 断开重连
		 */
		reconnect() {
			this.reconnectTimes++;
			if (this.reconnectTimes >= 2) {
				return false;
			}
			setTimeout(() => {
				//没连接上会一直重连，设置延迟避免请求过多
				this.creatWebSocket();
			}, 2000);
		},

		/*
		 * WS数据接收统一处理
		 */
		onmessageWS(ev) {
			console.log('onmessageWS');
			window.dispatchEvent(
				new CustomEvent('onmessageWS', {
					detail: ev
				})
			);
		},

		/*
		 * 发送数据
		 * @param eventType
		 */
		sendWS(data) {
			const obj = data;
			if (
				this.ws !== null &&
				(this.ws.readyState === 3 || this.ws.readyState === 2)
			) {
				console.log('creatWebSocket');
				this.ws.close();
				this.creatWebSocket(); //重连
			} else if (this.ws.readyState === 1) {
				this.ws.send(JSON.stringify(obj));
			} else if (this.ws.readyState === 0) {
				setTimeout(() => {
					this.ws.send(JSON.stringify(obj));
				}, 3000);
			}
		},

		/*
		 * 关闭WS
		 */
		closeWS() {
			this.reconnectTimes = 0;
			clearInterval(setIntervalWesocketPush);
			if (this.ws) {
				this.ws.close();
			}
		},
		/*
		 * 发送心跳
		 */
		sendPing(pingData) {
			clearInterval(setIntervalWesocketPush);
			pingData = JSON.stringify(pingData);
			this.ws.send(pingData);
			setIntervalWesocketPush = setInterval(() => {
				console.log('sendPing');
				this.ws.send(pingData);
			}, 30000);
		}
	}
};

// /*
//  * 建立websocket连接
//  */
// function creatWebSocket() {
// 	if (ws) {
// 		console.log('关闭旧WebSocket对象');
// 		closeWS();
// 	}
// 	// console.log(ws);
// 	console.log('初始化WebSocket对象');
// 	ws = new WebSocket(WS_URL);
//
// 	return new Promise((resolve, reject) => {
// 		// 监听打开连接
// 		ws.onopen = (ev) => {
// 			console.log('onopen');
// 			resolve({ status: 'onopen', event: ev });
// 		};
// 		// 监听连接错误
// 		ws.onerror = (ev) => {
// 			console.log('onerror');
// 			console.log(JSON.stringify(ev));
// 			if (reconnectTimes <= 2) {
// 				reconnect();
// 			} else {
// 				// 尝试进行2次重连，如果失败返回
// 				window.dispatchEvent(
// 					new CustomEvent('onerrorWS', {
// 						detail: ev
// 					})
// 				);
// 				reject({ status: 'onerror', event: ev });
// 			}
// 		};
// 		// 监听关闭连接
// 		ws.onclose = (ev) => {
// 			console.log('oncloseWS');
// 			window.dispatchEvent(
// 				new CustomEvent('oncloseWS', {
// 					detail: ev
// 				})
// 			);
// 			clearInterval(setIntervalWesocketPush);
// 		};
// 		// 接收消息行为
// 		ws.onmessage = onmessageWS;
// 	});
// }
//
// /*
//  * 断开重连
//  */
// function reconnect() {
// 	reconnectTimes++;
// 	if (reconnectTimes >= 2) {
// 		return false;
// 	}
// 	setTimeout(function() {
// 		//没连接上会一直重连，设置延迟避免请求过多
// 		creatWebSocket();
// 	}, 2000);
// }
//
// /*
//  * WS数据接收统一处理
//  */
// function onmessageWS(ev) {
// 	console.log('onmessageWS');
// 	window.dispatchEvent(
// 		new CustomEvent('onmessageWS', {
// 			detail: ev
// 		})
// 	);
// }
//
// /*
//  * 发送数据
//  * @param eventType
//  */
// function sendWS(data) {
// 	console.log('sendWS', data);
// 	const obj = data;
// 	if (ws !== null && ws.readyState === 3) {
// 		console.log('creatWebSocket');
// 		ws.close();
// 		creatWebSocket(); //重连
// 	} else if (ws.readyState === 1) {
// 		ws.send(JSON.stringify(obj));
// 	} else if (ws.readyState === 0) {
// 		setTimeout(() => {
// 			ws.send(JSON.stringify(obj));
// 		}, 3000);
// 	}
// }
//
// /*
//  * 关闭WS
//  */
// function closeWS() {
// 	reconnectTimes = 0;
// 	clearInterval(setIntervalWesocketPush);
// 	if (ws) {
// 		ws.close();
// 	}
// }
// /*
//  * 发送心跳
//  */
// function sendPing(pingData) {
// 	clearInterval(setIntervalWesocketPush);
// 	pingData = JSON.stringify(pingData);
// 	ws.send(pingData);
// 	setIntervalWesocketPush = setInterval(() => {
// 		console.log('sendPing');
// 		ws.send(pingData);
// 	}, 30000);
// }
//
// export default {
// 	creatWebSocket,
// 	onmessageWS,
// 	sendWS,
// 	closeWS,
// 	sendPing
// };
