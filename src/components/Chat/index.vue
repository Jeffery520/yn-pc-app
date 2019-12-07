<template>
	<div class="chat-bg">
		<el-alert
			:title="
				'ID:' +
					userInfo.userId +
					' | ' +
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
			v-if="connectError"
			:title="
				language == 'zh'
					? '连线失败，请稍后再试 ！'
					: 'Connection failed, please try again later !'
			"
			type="error"
			center
			show-icon
			:closable="false"
		>
		</el-alert>
		<el-alert
			v-if="disconnected"
			:title="language == 'zh' ? '未接通 ！' : 'Not connected ！'"
			type="info"
			center
			show-icon
			:closable="false"
		>
		</el-alert>

		<!--		<div class="user-info"></div>-->
		<!--    v-infinite-scroll="load"-->
		<div class="chat-content">
			<ul
				class="infinite-list"
				@scroll="load"
				style="height: 100%;overflow-y:auto;"
			>
				<li v-for="item in messageList" :key="item.index">
					<div v-if="item.type == 'receive'" class="receive-item">
						<el-avatar :size="30" :src="item.photo"></el-avatar>
						<div class="message-text receive-message">{{ item.message }}</div>
					</div>
					<div v-else class="send-item">
						<div class="message-text send-message">{{ item.message }}</div>
						<el-avatar :size="30" :src="item.photo"></el-avatar>
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
import ws from '@/api/ws';

export default {
	name: 'Chat',
	props: ['userInfo'], // userId phone userName isAdmin
	data() {
		return {
			language: this.$store.getters.language,
			connectError: false,
			disconnected: true,
			messageList: [
				{
					type: 'receive',
					photo:
						'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
					message: '1166656655+'
				}
			],
			input: ''
		};
	},
	mounted() {
		if (this.userInfo.userId) {
			this._creatWebSocket();
		}
	},
	destroyed() {
		ws.closeWS();
		window.removeEventListener('onmessageWS', this.onmessageHandel);
		window.removeEventListener('onerrorWS', this.onmessageHandel);
		window.removeEventListener('oncloseWS', this.onmessageHandel);
	},
	watch: {
		userInfo: {
			handler: function(newV, oldV) {
				if (newV.userId && oldV.userId && newV.userId !== oldV.userId) {
					this._creatWebSocket();
				}
			},
			deep: true
		}
	},
	methods: {
		load: _debounce(function(ev) {
			console.log(ev);
			if (ev.target.scrollTop <= 50) {
				console.log('load');
			}
		}),
		// 建立WebSocket链接
		// cmd: 20 链接校验  21 心跳  260 发送消息  261 获取历史消息
		_creatWebSocket() {
			let loading = Loading.service({
				target: document.querySelector('.chat-bg'),
				fullscreen: false,
				background: 'rgba(255,255,255,0.4)'
			});
			this.disconnected = false;
			ws.creatWebSocket()
				.then(() => {
					this.disconnected = false;
					// 发送touch验证
					this._sendMsg(20);
					const pingData = {
						uid: this.$store.getters.userInfo.fId,
						seqnum: 0,
						errmsg: '',
						cmd: 21,
						body: '',
						status: 0,
						token: this.$store.getters.token
					};
					ws.sendPing(pingData);
					loading.close();
					window.addEventListener('onmessageWS', this.onmessageHandel);
					window.addEventListener('onerrorWS', this.onerrorHandel);
					window.addEventListener('oncloseWS', this.oncloseHandel);
				})
				.catch((error) => {
					this.connectError = true;
					this.$alert(
						this.language == 'zh'
							? '连线异常，请稍后再试！'
							: 'Connection is abnormal, please try again later!'
					);
					loading.close();
					console.log(error);
				});
		},
		_sendMsg(cmd = 21, body = '') {
			console.log(body);
			// cmd:20 21 260 261
			let msgData = {
				uid: this.$store.getters.userInfo.fId,
				seqnum: 0,
				errmsg: '',
				cmd: cmd,
				body: body,
				status: 0,
				token: this.$store.getters.token
			};
			ws.sendWS(msgData);
		},
		onmessageHandel(ev) {
			const msg = JSON.parse(ev.detail.data);
			console.log(msg);

			// 滚动到最底部
			document.querySelector(
				'.infinite-list'
			).scrollTop = document.querySelector('.infinite-list').scrollHeight;

			if (msg.cmd == 20) {
				const msgBody = {
					did: this.userInfo.Did,
					direction: 0,
					size: 10,
					start: parseInt(new Date() / 1000)
				};

				setTimeout(() => {
					// 获取历史消息
					this._sendMsg(261, msgBody);
				}, 200);
			}
		},
		onerrorHandel(ev) {
			console.log(ev);
			this.connectError = true;
		},
		oncloseHandel(ev) {
			console.log(ev);
			this.disconnected = true;
		},
		sendMessage: _debounce(function() {
			if (!this.input) {
				return;
			}
			if (this.disconnected) {
				this.$alert(
					this.language == 'zh'
						? '连线失败，请稍后重试 ！'
						: 'Connection failed, please try again later!'
				);
				return;
			}
			const item = {
				type: 'send',
				photo:
					'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
				message: this.input
			};
			this.$emit('sendMessage', item);

			let loadingInstance = Loading.service({
				target: document.querySelector('.chat-action'),
				fullscreen: false,
				background: 'rgba(0,0,0,0)'
			});
			// 发送消息
			const msgBody = {
				category: 0,
				content: item.message,
				did: this.userInfo.Did,
				filesize: 0,
				length: 0,
				mid: 'string',
				rcvId: this.userInfo.userId,
				sendtime: 0,
				usertype: 0
			};
			this._sendMsg(260, msgBody);

			this.messageList = this.messageList.concat(item);

			this.input = '';

			setTimeout(() => {
				this.$nextTick(() => {
					// 以服务的方式调用的 Loading 需要异步关闭
					loadingInstance.close();
				});
			}, 300);
		})
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
