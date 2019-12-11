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
import Socket from '@/components/Chat/chat';
let WS = null;
export default {
	name: 'Chat',
	props: ['userInfo'], // userId phone userName isAdmin
	data() {
		return {
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
			const heartData = {
				uid: this.userInfo.userId,
				seqnum: 0,
				errmsg: '',
				cmd: 21,
				body: '',
				status: 0,
				token: this.$store.getters.token
			};
			WS = new Socket(heartData);
			WS.createWebSocket(this.onopen, this.onmessage, this.onerror);
		}
	},
	destroyed() {
		WS.closeWebSocket(); //断开连接
	},
	watch: {
		userInfo: {
			handler: function(newV, oldV) {
				if (newV.userId && oldV.userId && newV.userId !== oldV.userId) {
					this.hisMsStart = parseInt(new Date() / 1000);
					this.messageList = [];
					this.loadingMore = false;
					this.hasMore = true;
					// if (WS.readyState === 1) {
					// 	// this._getHisMsg();
					// }
				}
			},
			deep: true
		}
	},
	methods: {
		load: _debounce(function(ev) {
			if (ev.target.scrollTop < 20) {
				console.log('load');
				// this._getHisMsg();
			}
		}),
		onopen() {
			console.log('onopen');
			WS.touchWS(this._getData(20), () => {
				this._getHisMsg();
			});
		},
		onmessage(evt) {
			console.log('onmessage');
			console.log(evt);
		},
		onerror(evt) {
			console.log('onerror');
			console.log(evt);
		},
		/*
		 * 发送心跳
		 */
		// _sendPing() {
		// 	// clearInterval(setIntervalWesocketPush);
		// 	// this.sendWS(pingData);
		// 	// setIntervalWesocketPush = setInterval(() => {
		// 	// 	console.log('_sendPing');
		// 	// 	this.sendWS(pingData);
		// 	// }, 30000);
		// },
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
		_getData(cmd = 21, body = '') {
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
			return msgData;
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
		/*
		 * 发送数据
		 * @param eventType
		 */
		sendWS(data) {
			const obj = JSON.stringify(data);
			console.log(obj);
			if (WS !== null && (WS.readyState === 3 || WS.readyState === 2)) {
				console.log('creatWebSocket');
				this.reconnect(); //重连
			} else if (WS.readyState === 1) {
				WS.send(obj);
			} else if (WS.readyState === 0) {
				setTimeout(() => {
					WS.send(obj);
				}, 10000);
			}
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
