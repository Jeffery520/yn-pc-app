<template>
	<div class="chat-bg">
		<el-alert
			:title="
				'ID:' +
					userInfo.userId +
					' ' +
					(userInfo.userName || '') +
					' ' +
					(userInfo.phone || '')
			"
			:type="connectError || socketLoading ? 'info' : 'success'"
			center
			:closable="false"
		>
		</el-alert>
		<el-alert
			v-if="connectError && !socketLoading"
			:title="language == 'zh' ? '连线失败' : 'Connection failed'"
			:description="
				language == 'zh'
					? '连线失败,请检查网络或刷新重试'
					: 'Connection failed, please check the network or refresh and try again'
			"
			type="error"
			show-icon
		>
		</el-alert>
		<div
			v-show="(loadingMore && hasMore) || socketLoading"
			style="text-align: center;font-size: 14px;color: #999999;"
		>
			<i class="el-icon-loading"></i>
			{{ language == 'zh' ? '加载中...' : 'loading...' }}
		</div>

		<div class="chat-content">
			<ul
				class="infinite-list"
				@scroll="load"
				style="height: 100%;overflow-y:auto;padding: 10px 0"
			>
				<li v-for="(item, index) in messageList" :key="index">
					<p
						v-if="index % 10 == 0"
						style="text-align: center;font-size: 12px;color: #999999;"
					>
						{{ item.senddate }}
					</p>
					<div v-if="item.msgType == 'receive'" class="receive-item">
						<el-avatar
							:style="photoStyle"
							fit="fill"
							:size="30"
							:src="item.fUserFaceUrl"
						></el-avatar>
						<div class="message-text receive-message">{{ item.content }}</div>
					</div>
					<div v-if="item.msgType == 'send'" class="send-item">
						<i
							v-if="item.sendFaild"
							class="el-icon-warning"
							style="color:#ff0101;padding: 12px 5px; "
						></i>
						<div class="message-text send-message">{{ item.content }}</div>
						<el-avatar
							:style="photoStyle"
							:size="30"
							fit="fill"
							:src="$store.getters.userInfo.fFaceUrl"
						></el-avatar>
					</div>
				</li>
			</ul>
		</div>
		<div class="chat-action">
			<el-input
				:placeholder="$t('notice.chat.sendTips')"
				v-model="message"
				@keyup.native.enter="sendMessage"
			>
				<template slot="append">
					<svg-icon @click.stop="sendMessage" icon-class="chat-send"></svg-icon>
				</template>
			</el-input>
		</div>
	</div>
</template>

<script>
import { Loading } from 'element-ui';
import { _debounce } from '@/utils/validate';
import photo from '@/assets/images/logo_white.png';
import { formatDate } from '@/utils/validate';

/* ----------websocket相关变量----------- */
import ReconnectingWebSocket from '@/utils/reconnecting-websocket.min.js'; // 插件|当websocket断开自动重连
let WS_URL = 'ws://192.168.31.108:10422/ws';
// let WS_URL = '/ws';
let ws = null;
let heartTimout = 20000;
let reconnectTimout = 30000;
let reconnectCount = 0;
let setIntervalWesocketPush = null;
let lockReconnect = false; // 避免重复连接
let sendMsgTimeout = 30000; // 发送消息超时时间
let TimeRanges = null; // 发送消息超时检测
export default {
	name: 'Chat',
	props: ['userInfo'], // userId phone userName isAdmin
	data() {
		return {
			isTouch: false, // 是否已进行touch连接验证
			socketLoading: false, // 是否正在开启加载动画
			connectError: false, // 连接失败
			loadingMore: false, // 加载更多
			hasMore: true, // 历史消息加载
			hisMsStart: parseInt(new Date() / 1000), // 历史消息加载初始日期
			message: '', // 输入的消息内容
			messageList: [], // 所有消息列表
			currntSentMsg: {}, // 当前正在发送的消息数据
			language: this.$store.getters.language,
			photoStyle: {
				background: `#4b96ef url(${photo}) no-repeat center`,
				'background-size': '90%'
			}
		};
	},
	mounted() {
		if (this.userInfo.userId) {
			this.creatWebSocket();
		}
	},
	destroyed() {
		this.closeWS();
	},
	watch: {
		userInfo: {
			handler: function(newV, oldV) {
				if (newV.userId && oldV.userId && newV.userId !== oldV.userId) {
					this.hisMsStart = parseInt(new Date() / 1000);
					this.messageList = [];
					this.loadingMore = false;
					this.hasMore = true;
					if (
						ws.readyState === 1 &&
						!this.socketLoading &&
						!this.connectError
					) {
						this._getHisMsg();
					}
				}
			},
			deep: true
		}
	},
	methods: {
		/* 下拉加载事件 */
		load: _debounce(function(ev) {
			if (ev.target.scrollTop < 20) {
				console.log('load');
				this._getHisMsg();
			}
		}),
		/* 发送message事件 */
		sendMessage: _debounce(function() {
			if (!this.message.trim() || this.connectError || this.socketLoading) {
				return;
			}
			const item = {
				type: 4,
				mid: new Date().getTime().toString(),
				senddate: this._formatDate(new Date().getTime()),
				content: this.message,
				status: 0 // 0 发送中  1 成功  2 失败
			};
			// 向父组件发送事件行为
			this.$emit('sendMessage', item);

			this.loadingSendMs = Loading.service({
				target: document.querySelector('.chat-action'),
				fullscreen: false,
				background: 'rgba(0,0,0,0)'
			});
			// 发送消息
			const msgBody = {
				category: 0,
				content: item.content,
				did: this.userInfo.Did,
				filesize: 0,
				length: 0,
				mid: item.mid,
				rcvId: this.userInfo.userId,
				sendtime: parseInt(new Date() / 1000)
			};

			this._sendMsg(260, msgBody);

			this.currntSentMsg = item;

			// 处理消息超时情况
			const timeoutDate =
				parseInt(new Date().getTime()) + parseInt(sendMsgTimeout);

			clearInterval(TimeRanges);

			TimeRanges = setInterval(() => {
				const nowDate = parseInt(new Date().getTime());
				if (nowDate >= timeoutDate) {
					clearInterval(TimeRanges);
					this.$notify.error({
						title: this.language == 'zh' ? '发送失败' : 'Failed to send',
						message:
							this.language == 'zh'
								? `消息发送失败，请检查网络或稍后再试！`
								: `Message sending failed, please check the network or try again later!`
					});
					this.loadingSendMs.close();
				}
			}, sendMsgTimeout);
		}),
		/* 建立websocket连接 */
		creatWebSocket() {
			this.socketLoading = true;

			if (ws) {
				this.onopenWS();
				return;
			}
			this.isTouch = false;
			console.log('初始化WebSocket对象');
			clearInterval(setIntervalWesocketPush);
			// 新建连接
			ws = new ReconnectingWebSocket(WS_URL);
			ws.debug = true;
			ws.timeoutInterval = reconnectTimout;
			// 监听打开连接
			ws.onopen = this.onopenWS;
			// 监听连接错误
			ws.onerror = this.onerrorWS;

			// 监听关闭连接
			ws.onclose = this.oncloseWS;
			// 接收消息行为
			ws.onmessage = this.onmessageWS;
		},
		/* 断开重连 */
		reconnect() {
			if (lockReconnect) return;
			lockReconnect = true;
			console.log(reconnectCount);
			if (reconnectCount >= 3) {
				this.connectError = true;
				this.socketLoading = false;
				return;
			}
			setTimeout(() => {
				// 没连接上会一直重连，设置延迟避免请求过多
				this.creatWebSocket();
				lockReconnect = false;
				reconnectCount += 1;
			}, reconnectTimout);
		},
		/* WS开启统一处理 */
		onopenWS() {
			console.log('onopenWS', ws.readyState);

			if (ws.readyState === 1) {
				this.connectError = false;
				this.socketLoading = false;
				reconnectCount = 0;
				// 发送touch验证
				if (!this.isTouch) {
					this._sendMsg(20);
					this.isTouch = true;
				}

				setTimeout(() => {
					this._sendPing();
				}, 1000);

				this._getHisMsg();
			} else {
				if (this.connectError || this.socketLoading) {
					setTimeout(() => {
						this.onopenWS();
					}, 6000);
				}
			}
		},
		/* WS错误统一处理 */
		onerrorWS(ev) {
			console.log('onerrorWS', ev);
			this.connectError = true;
			clearInterval(setIntervalWesocketPush);
			this.reconnect();
		},
		/* WS关闭统一处理 */
		oncloseWS() {
			console.log('onclose');
			this.connectError = true;
			clearInterval(setIntervalWesocketPush);
		},
		/* WS数据接收统一处理 */
		onmessageWS(ev) {
			const msg = JSON.parse(ev.data);
			// console.log(ev);

			// 连接断开处理
			if (msg.cmd == 214) {
				this.reconnect();
			}

			// 提取发送成功的消息
			if (msg.cmd == 260) {
				if (msg.body.mid == this.currntSentMsg.mid) {
					this.currntSentMsg.msgType = 'send';
					// 遍历历史消息查找是否存在该消息
					let hasInList = false;

					for (let i = 0; i < this.messageList.length; i++) {
						if (this.messageList[i].mid == msg.body.mid) {
							this.messageList[i] = this.currntSentMsg;
							hasInList = true;
							break;
						}
					}

					if (!hasInList) {
						this.messageList.push(this.currntSentMsg);
					}

					this.message = '';
					this.$nextTick(() => {
						this.loadingSendMs.close();
						clearInterval(TimeRanges);
					});
					setTimeout(() => {
						// 滚动到最底部
						document.querySelector(
							'.infinite-list'
						).scrollTop = document.querySelector('.infinite-list').scrollHeight;
					}, 200);
				}
			}

			// 提取历史消息
			if (msg.cmd == 261) {
				if (msg.body.list.length == 0) {
					this.hasMore = false;
				}
				let list = msg.body.list.map((item) => {
					item.status = 1;
					item.msgType =
						item.sendId == this.userInfo.userId ? 'receive' : 'send';
					item.senddate = this._formatDate(item.senddate * 1000);
					return item;
				});
				if (list.length > 0) this.hisMsStart = list[list.length - 1].savedate;
				this.messageList = list.concat(this.messageList);
				this.loadingMore = false;
				setTimeout(() => {
					// 滚动到最底部
					document.querySelector('.infinite-list').scrollTop = 500;
				}, 200);

				// savedate
				console.log(this.messageList);
			}
		},
		/* 发送WS */
		sendWS(data) {
			const obj = JSON.stringify(data);
			console.log(obj);
			if (ws !== null && (ws.readyState === 3 || ws.readyState === 2)) {
				console.log('creatWebSocket');
				this.reconnect(); //重连
			} else if (ws.readyState === 1) {
				ws.send(obj);
			} else if (ws.readyState === 0) {
				//  表示连接尚未建立，正在连接
				setTimeout(() => {
					ws.send(obj);
				}, 6000);
			}
		},
		/* 关闭WS */
		closeWS() {
			clearInterval(setIntervalWesocketPush);
			clearInterval(TimeRanges);
			if (ws) {
				ws.close();
				ws = null;
			}
		},

		/*------------私有方法-------------*/
		/* 发送心跳 */
		_sendPing() {
			const pingData = {
				uid: this.userInfo.userId,
				seqnum: 0,
				errmsg: '',
				cmd: 21,
				body: '',
				status: 0,
				token: this.$store.getters.token
			};
			clearInterval(setIntervalWesocketPush);
			this.sendWS(pingData);
			setIntervalWesocketPush = setInterval(() => {
				console.log('_sendPing');
				this.sendWS(pingData);
			}, heartTimout);
		},
		/* 发送消息模板 */
		_sendMsg(cmd = 21, body = '') {
			// cmd:20 21 260 261
			let msgData = {
				uid: this.userInfo.userId,
				seqnum: 0,
				errmsg: '',
				cmd: cmd,
				body: body,
				status: 0,
				token: this.$store.getters.token
			};
			this.sendWS(msgData);
		},
		/* 获取历史消息 */
		_getHisMsg() {
			console.log('_getHisMsg');
			if (!this.hasMore) {
				return false;
			}
			this.loadingMore = true;
			const msgBody = {
				did: this.userInfo.Did,
				direction: 0,
				size: 10,
				start: this.hisMsStart,
				uid: this.userInfo.userId
			};
			// 获取历史消息
			setTimeout(() => {
				this._sendMsg(261, msgBody);
			}, 500);

			// 处理消息超时情况
			setTimeout(() => {
				this.loadingMore = false;
			}, 20000);
		},
		_formatDate(timestamp) {
			let date = timestamp ? formatDate(timestamp) : '';
			return date
				? `${date.year}${this.language == 'zh' ? '年' : ' '}${date.month}${
						this.language == 'zh' ? '月' : ' '
				  }${date.day}${this.language == 'zh' ? '日' : ''}`
				: '';
		}
	}
};
</script>

<style lang="scss">
.chat-bg {
	width: 380px;
	border: 1px solid $baseBorderColor;
	/*<!--.user-info {-->*/
	/*<!--	padding: 15px 0;-->*/
	/*<!--	font-size: 16px;-->*/
	/*<!--	font-weight: 600;-->*/
	/*<!--	background: #fff;-->*/
	/*<!--	border-bottom: 1px solid $baseBorderColor;-->*/
	/*<!--}-->*/
	.chat-content {
		height: 480px;
	}
	ul {
		padding-inline-start: 0px !important;
		list-style: none;
		li > div {
			display: flex;
			align-items: flex-start;
			margin: 20px;
		}
		.receive-item {
			justify-content: flex-start;
			.el-avatar {
				flex-shrink: 0;
				margin-right: 10px;
			}
		}
		.send-item {
			justify-content: flex-end;
			.el-avatar {
				flex-shrink: 0;
				margin-left: 10px;
			}
		}
		.message-text {
			word-wrap: break-word;
			word-break: break-all;
			text-align: left;
			max-width: 248px;
			background-color: $greenColor;
			color: #fff;
			padding: 10px 15px;
			border-radius: 8px;
			position: relative;
			line-height: 20px;
			&.receive-message {
				background-color: #999999;
			}
			&.receive-message::after {
				content: ' ';
				width: 0;
				height: 0;
				border-top: 10px solid #999999;
				border-right: 10px solid rgba(0, 0, 0, 0);
				border-bottom: 10px solid rgba(0, 0, 0, 0);
				border-left: 10px solid rgba(0, 0, 0, 0);
				position: absolute;
				left: -5px;
				top: 12px;
				transform: rotate(-20deg);
			}
			&.send-message::after {
				content: ' ';
				width: 0;
				height: 0;
				border-top: 10px solid $greenColor;
				border-right: 10px solid rgba(0, 0, 0, 0);
				border-bottom: 10px solid rgba(0, 0, 0, 0);
				border-left: 10px solid rgba(0, 0, 0, 0);
				position: absolute;
				right: -5px;
				top: 0px;
				transform: rotate(-200deg);
			}
		}
	}
	.chat-action {
		border-top: 1px solid $baseBorderColor;
		.el-input-group,
		.el-input__inner {
			border: none;
			height: 56px;
			line-height: 56px;
			font-size: 16px;
		}
		.el-input-group__append {
			color: #3aca75;
			background-color: #fff;
			font-size: 22px;
			border: none;
			cursor: pointer;
		}
	}
}
</style>
