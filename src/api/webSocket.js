// ps: await 后面若是跟的Promise,则接受Promise resolve的值。Promise reject的值需要try...catch住，或者await 后面的表达式跟着.catch()

const options = Symbol('options');
const intUniqueId = Symbol('intUniqueId');
const arrQueueRequest = Symbol('arrQueueRequest');
const arrQueueNotice = Symbol('arrQueueNotice');

export default class Socket {
	/**
	 * 构造函数，初始化数据
	 * @param {*} objOption
	 */
	constructor(objOption = {}) {
		this[options] = {
			WS: null, // Websocket实例
			// secure: objOption.secure || 'ws',
			hostName: objOption.hostName || 'ws://192.168.31.108/ws',
			portNo: objOption.portNo || '10422',
			user: objOption.user,
			password: objOption.password
		};
		this[intUniqueId] = 0; //请求的id，也是请求的key值（在请求序列里根据id找对应的包）
		this[arrQueueRequest] = {}; //请求序列
		this[arrQueueNotice] = {}; //server的通知序列
		this.setIntervalWesocketPush = null;
	}

	/***************私有函数start*********** */
	/**
	 * 处理请求对应的响应
	 */
	// 处理请求
	_onRequestMessage = (objResp) => {
		let { id } = objResp; //从响应里获取id
		this[arrQueueRequest][id].resolve(objResp); //只返回resolve函数，不reject，可以在外面捕获
		delete this[arrQueueRequest][id]; //删除序列id对应数据包
	};
	// 处理通知
	_onResponseMessage = (objResp) => {
		window.dispatchEvent(
			new CustomEvent('onmessageWS', {
				detail: {
					data: objResp
				}
			})
		);
	};

	// 定时发送心跳
	_sendPing() {
		this.WS.send('ping');
		this.setIntervalWesocketPush = setInterval(() => {
			this.WS.send('{"event": "ping"}');
		}, 5000);
	}
	/***************私有函数end*********** */

	/***************公开函数start*********** */
	//公开函数
	open = (wsClose) => {
		//await只能接收resolve的值，reject的值需要在外面catch
		return new Promise((resolve, reject) => {
			let _private = this[options],
				url = '' + _private.secure + '://' + _private.hostName;
			if (_private.portNo) {
				url += ':' + _private.portNo;
			}
			url += '?';
			url += 'user=' + _private.user;
			url += '&password=' + _private.password;

			// 创建WebSocket实例
			_private.WS = new WebSocket(url);
			// 成功连接onopen回调
			_private.WS.onopen = (event) => {
				console.log('onopen');
				//成功连接上
				event.status = 'onopen';
				this._sendPing();
				resolve(event);
			};

			// 触发onerror回调
			_private.WS.onerror = (event) => {
				console.log('onerror');
				clearInterval(this.setIntervalWesocketPush);
				_private.WS.close();
				event.status = 'onerror';
				reject(event);
			};

			// 传入wsClose回调，以便于server主动断开时触发
			_private.WS.onclose = (event) => {
				console.log('onclose');
				clearInterval(this.setIntervalWesocketPush);
				wsClose(event);
			};

			// 接收消息onmessage回调
			_private.WS.onmessage = (event) => {
				let objResp = JSON.parse(event.data);
				if (objResp.packet_type === 'response') {
					// 如果是我们发送的请求
					this._onRequestMessage(objResp);
				} else {
					// 如果是server的通知
					this._onResponseMessage(objResp);
				}
			};
		});
	};

	/**
	 * 外部调用的发送方法
	 */
	send = (serviceName, methodName, objData, dataFormat, timeout) => {
		return new Promise((resolve, reject) => {
			let objPkg, objPkgSendReq;
			this[intUniqueId] += 1;

			//构建发送包
			objData = JSON.stringify(objData); //先序列化
			// objData = Base64.encode(objData); //加密
			objPkg = {
				id: this[intUniqueId],
				packet_type: 'request',
				service: serviceName,
				method: methodName,
				data: objData
			};

			objPkgSendReq = JSON.stringify(objPkg);
			this[arrQueueRequest][objPkg.id] = {
				id: objPkg.id,
				strReq: objPkgSendReq,
				reject: reject,
				resolve: resolve,
				dataFormat: dataFormat,
				timeoutId: null
			};
			this[options].WS.send(this[arrQueueRequest][objPkg.id].strReq);
		});
	};

	//主动关闭连接，并且重置数据
	closeSocketAndResetVar = () => {
		clearInterval(this.setIntervalWesocketPush);
		if (this[options].WS) {
			this[options].WS.close();
			this[options].WS = null;
		}
	};
	/***************公开函数end*********** */
}
