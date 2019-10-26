<template>
	<div class="chat-bg">
		<div class="chat-content">
			<el-scrollbar
				class="page-scrollbar"
				:native="false"
				:noresize="true"
				tag="ul"
			>
				<ul>
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
			</el-scrollbar>
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
export default {
	name: 'Chat',
	data() {
		return {
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
	methods: {
		sendMessage: _debounce(function() {
			if (!this.input) {
				return;
			}
			const item = {
				type: 'send',
				photo:
					'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
				message: this.input
			};
			this.$emit('sendMessage', item);
			const sendBox = document.querySelector('.chat-action');
			let loadingInstance = Loading.service({
				target: sendBox,
				fullscreen: false,
				background: 'rgba(0,0,0,0)'
			});
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
	.chat-content {
		height: 460px;
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
