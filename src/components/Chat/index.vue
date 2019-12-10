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
			type="success"
			center
			:closable="false"
		>
		</el-alert>
		<el-alert
			v-if="connectError && !loading"
			:title="language == 'zh' ? '未接通' : 'Not connected'"
			type="info"
			center
			show-icon
			:closable="false"
		>
		</el-alert>
		<div
			v-show="(loadingMore && hasMore) || loading"
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
				v-model="input"
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
import ReconnectingWebSocket from '@/utils/reconnecting-websocket.min.js';
let WS_URL = 'ws://192.168.31.108:10422/ws';
// let WS_URL = '/ws';

let setIntervalWesocketPush = null;
let lockReconnect = false; // 避免重复连接

export default {
	name: 'Chat',
	props: ['userInfo'], // userId phone userName isAdmin
	data() {
		return {
			ws: null,
			isTouch: false,
			loading: false,
			connectError: false,
			loadingMore: false,
			hasMore: true,
			hisMsStart: parseInt(new Date() / 1000),
			photoStyle: {
				background: `#4b96ef url(${photo}) no-repeat center`,
				'background-size': '90%'
			},
			language: this.$store.getters.language,
			messageList: [],
			currntSentMsg: {}, // 正在发送的消息
			input: ''
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
					if (this.ws.readyState === 1) {
						this._getHisMsg();
					}
				}
			},
			deep: true
		}
	},
	methods: {
		load: _debounce(function(ev) {
			if (ev.target.scrollTop < 20) {
				console.log('load');
				this._getHisMsg();
			}
		}),
		sendMessage: _debounce(function() {
			if (!this.input || this.connectError || this.loading) {
				return;
			}
			const item = {
				type: 4,
				mid: new Date().getTime().toString(),
				senddate: this._formatDate(new Date().getTime()),
				content: this.input,
				status: 0 // 0 发送中  1 成功  2 失败
			};

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
		}),
		/*
		 * 建立websocket连接
		 */
		creatWebSocket() {
			this.loading = true;

			if (this.ws) {
				this.onopenWS();
				return;
			}
			this.isTouch = false;
			console.log('初始化WebSocket对象');
			clearInterval(setIntervalWesocketPush);
			// 新建连接
			this.ws = new ReconnectingWebSocket(WS_URL);
			this.ws.debug = true;
			this.ws.timeoutInterval = 60000;
			// 监听打开连接
			this.ws.onopen = this.onopenWS;
			// 监听连接错误
			this.ws.onerror = this.onerrorWS;

			// 监听关闭连接
			this.ws.onclose = this.oncloseWS;
			// 接收消息行为
			this.ws.onmessage = this.onmessageWS;
		},
		/*
		 * 断开重连
		 */
		reconnect() {
			if (lockReconnect) return;
			lockReconnect = true;

			setTimeout(() => {
				// 没连接上会一直重连，设置延迟避免请求过多
				this.creatWebSocket();
				lockReconnect = false;
			}, 6000);
		},
		/*
		 * WS开启
		 */
		onopenWS(ev) {
			console.log(ev);
			console.log('onopenWS', this.ws.readyState);

			if (this.ws.readyState === 1) {
				this.connectError = false;
				this.loading = false;
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
				if (this.connectError || this.loading) {
					setTimeout(() => {
						this.onopenWS();
					}, 5000);
				}
			}
		},
		/*
		 * WS错误
		 */
		onerrorWS(ev) {
			console.log('onerrorWS', ev);
			this.connectError = true;
			clearInterval(setIntervalWesocketPush);
			this.reconnect();
		},
		/*
		 * WS关闭
		 */
		oncloseWS() {
			console.log('onclose');
			this.connectError = true;
			clearInterval(setIntervalWesocketPush);
		},
		/*
		 * WS数据接收统一处理
		 */
		onmessageWS(ev) {
			const msg = JSON.parse(ev.data);
			console.log(ev);
			if (msg.cmd == 214) {
				// 连接断开处理
				this.reconnect();
			}
			if (msg.cmd == 260) {
				// 提取成功的消息
				if (msg.body.mid == this.currntSentMsg.mid) {
					this.currntSentMsg.msgType = 'send';
					this.messageList.push(this.currntSentMsg);

					this.input = '';
					this.$nextTick(() => {
						this.loadingSendMs.close();
					});

					setTimeout(() => {
						// 滚动到最底部
						document.querySelector(
							'.infinite-list'
						).scrollTop = document.querySelector('.infinite-list').scrollHeight;
					}, 200);
				}
			}

			if (msg.cmd == 261) {
				// 提取历史消息
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

		/*
		 * 发送数据
		 * @param eventType
		 */
		sendWS(data) {
			const obj = JSON.stringify(data);
			console.log(obj);
			if (
				this.ws !== null &&
				(this.ws.readyState === 3 || this.ws.readyState === 2)
			) {
				console.log('creatWebSocket');
				this.reconnect(); //重连
			} else if (this.ws.readyState === 1) {
				this.ws.send(obj);
			} else if (this.ws.readyState === 0) {
				setTimeout(() => {
					this.ws.send(obj);
				}, 10000);
			}
		},
		/*
		 * 关闭WS
		 */
		closeWS() {
			clearInterval(setIntervalWesocketPush);
			if (this.ws) {
				this.ws.close();
				this.ws = null;
			}
		},
		/*
		 * 发送心跳
		 */
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
			}, 30000);
		},
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
