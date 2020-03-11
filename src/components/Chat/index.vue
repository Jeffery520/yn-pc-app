<template>
	<drag-dialog
		:title="$store.getters.language == 'en' ? 'Chat' : '聊天'"
		:id="new Date().getTime()"
		height="630"
		width="625"
		:dialogVisible="$store.getters.chatShow"
		ref="dragDialog"
		@closeDialog="$store.dispatch('user/setChatShow', false)"
		@refresh="refreshWs"
	>
		<div class="chat-bg">
			<transition name="fade">
				<div
					v-if="connectError && !socketLoading"
					class="chat-alerts-bg"
					style="z-index: 999"
				>
					<el-alert
						v-if="closedWSNum >= 3 || wsOpenCount > 3 || connectionIsOccupied"
						:title="
							language == 'zh' ? '连线已被关闭' : 'Connection has been closed'
						"
						:description="
							language == 'zh'
								? '连线关闭或已被其他人占用,请联系管理员或点击右上角刷新重试'
								: 'The connection is closed or occupied by someone else, please contact the administrator or click on the upper right corner to refresh and try again'
						"
						type="error"
						show-icon
						:closable="false"
					>
					</el-alert>

					<el-alert
						v-else
						:title="language == 'zh' ? '连线失败' : 'Connection failed'"
						:description="
							language == 'zh'
								? '连线失败,请检查网络或点击右上角刷新重试'
								: 'The connection failed, please check the network or click on the upper right corner to refresh and try again'
						"
						type="error"
						show-icon
						:closable="false"
					>
					</el-alert>
				</div>
			</transition>
			<div v-loading="socketLoading" class="chat-main">
				<div class="chat_contact_list">
					<el-input
						:placeholder="
							$store.getters.language == 'en'
								? 'Enter name / mobile number to search'
								: '输入姓名、手机号进行搜索'
						"
						v-model="filterText"
						style="border-radius:0 !important; "
						><i slot="prefix" class="el-input__icon el-icon-search"></i>
					</el-input>
					<div
						style="height: 100%;overflow-y: scroll"
						v-loading="userListLoading"
					>
						<transition name="fade">
							<el-tree
								ref="userTree"
								class="filter-tree"
								:data="userList"
								:props="{ children: 'children', label: 'label' }"
								node-key="uid"
								:indent="0"
								default-expand-all
								highlight-current
								accordion
								icon-class="el-icon-arrow-right"
								:filter-node-method="filterNode"
								@node-click="selectUser"
							>
								<!--      userInfo.uid      node-click-->
								<template slot-scope="{ node, data }">
									<div
										:class="[
											'user-item-inner',
											userInfo.uid == data.uid && !data.children ? 'active' : ''
										]"
									>
										<el-avatar
											v-if="!data.children"
											:size="30"
											:src="
												data.fUserFaceUrl ||
													'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
											"
											style="margin-right:10px;"
										></el-avatar>
										<div v-if="data.children" style="margin-left:5px"></div>
										<div v-html="data.label"></div>
										<div
											class="has_new_msg"
											v-if="data.adminRead && userInfo.uid != data.uid"
										>
											{{ data.adminRead > 99 ? '99+' : data.adminRead }}
										</div>
									</div>
								</template>
							</el-tree>
						</transition>
					</div>
				</div>
				<transition name="fade">
					<div class="chat_contact_content">
						<div class="chat-alerts-bg">
							<el-alert
								v-if="userInfo && (userInfo.fUserAlias || userInfo.fUin)"
								:title="
									(userInfo.fUserAlias || '') +
										' ' +
										_formatPhone(userInfo.fUin || '')
								"
								:type="connectError || socketLoading ? 'info' : 'success'"
								style="border-bottom: 1px solid #dddddd;"
								center
								:closable="false"
							>
							</el-alert>
						</div>
						<div class="chat-content">
							<div
								v-show="loadingMore && hasMore"
								style="text-align: center;font-size: 14px;color: #999999;margin-right: 20px;padding: 5px 0;"
							>
								<i class="el-icon-loading"></i>
								{{ language == 'zh' ? '加载中...' : 'loading...' }}
							</div>
							<ul
								class="infinite-list"
								@scroll="load"
								style="height: 100%;overflow-y:auto;padding: 10px 0;"
							>
								<li v-for="(item, index) in messageList" :key="index">
									<p
										v-if="item.showSenddate"
										style="text-align: center;font-size: 12px;color: #999999;"
									>
										{{ item.senddate }}
									</p>
									<div
										v-if="item.msgType == 'receive' && item.content"
										class="receive-item"
									>
										<el-avatar
											class="user-photo"
											fit="fill"
											:size="30"
											:src="item.fUserFaceUrl"
										></el-avatar>
										<div class="message-text receive-message">
											{{ item.content }}
										</div>
									</div>
									<div
										v-if="item.msgType == 'send' && item.content"
										class="send-item"
									>
										<i
											v-if="item.sendFaild"
											class="el-icon-warning"
											style="color:#ff0101;padding: 12px 5px; "
										></i>
										<div class="message-text send-message">
											{{ item.content }}
										</div>
										<el-avatar
											class="user-photo"
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
									<svg-icon
										@click.stop="sendMessage"
										icon-class="chat-send"
									></svg-icon>
								</template>
							</el-input>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</drag-dialog>
</template>

<script>
import { Loading } from 'element-ui';
import { _debounce, uniqueObjArr } from '@/utils/validate';
import photo from '@/assets/images/logo_white.png';
import { formatDateToStr, formatPhone } from '@/utils/validate';
import DragDialog from '@/components/DragDialog/index.vue';

/* ----------websocket相关变量----------- */
import ReconnectingWebSocket from '@/utils/reconnecting-websocket.min.js';
import UserInfo from '../UserInfo/UserInfo'; // 插件|当websocket断开自动重连
// 服务器1 onecare
let WS_URL = 'wss://aws.yinuocare.com/ws';
// 服务器2 聆医
// let WS_URL = 'ws://47.103.199.79:10422/ws';
// let WS_URL = '/ws';
let ws = null;
let heartTimout = 60000;
let reconnectTimout = 60000;
let reconnectCount = 0;
let setIntervalWesocketPush = null;
let lockReconnect = false; // 避免重复连接
let sendMsgTimeout = 30000; // 发送消息超时时间
let TimeRanges = null; // 发送消息超时检测
export default {
	name: 'Chat',
	// props: ['userInfo'], // uid fUin fUserAlias isAdmin
	components: { DragDialog },
	props: { userInfo: Object },
	data() {
		return {
			dragStyle: { right: '10px', top: '70px' },
			isTouch: false, // 是否已进行touch连接验证
			socketLoading: false, // 是否正在开启加载动画
			userListLoading: false, // 加载用户列表
			connectError: false, // 连接失败
			hisMsgInit: false, // 初始化历史消息
			loadingMore: false, // 加载更多
			hasMore: true, // 历史消息加载
			connectionIsOccupied: false, // 链接被占用
			closedWSNum: 0,
			wsOpenCount: 0,
			userList: [], // 聊天用户列表
			filterText: '', // 关键字进行过滤
			hisMsStart: new Date().getTime(), // 历史消息加载初始日期
			message: '', // 输入的消息内容
			messageList: [], // 所有消息列表
			currntSentMsgNum: 0,
			currntSentMsg: {}, // 当前正在发送的消息数据
			language: this.$store.getters.language,
			photoStyle: {
				background: `#4b96ef url(${photo}) no-repeat center`,
				'background-size': '90%'
			}
		};
	},
	mounted() {
		this.creatWebSocket();
	},
	beforeDestroy() {
		this.closeWS();
	},
	watch: {
		'$store.getters.chatShow'() {
			if (
				this.$store.getters.chatShow &&
				ws &&
				ws.readyState === 1 &&
				!this.socketLoading &&
				!this.connectError
			) {
				// 清除未读消息
				if (this.userInfo && this.userInfo.uid) {
					this._sendMsg(271, { appUid: this.userInfo.uid });
					if (this.userList.length > 0) {
						this._umReadMsgNum(this.userList, this.userInfo.uid, (data) => {
							const { cIndex, pIndex, umReadMsgNum } = data;
							this.userList[pIndex].children[cIndex].adminRead = 0;
							this.userList = this.userList;
							this.$store.dispatch(
								'user/setUnreadMsg',
								this.$store.getters.hasUnreadMsg - umReadMsgNum
							);
						});
					}
				}
			}
		},
		'$store.getters.hasUnreadMsg'() {
			if (this.$store.getters.hasUnreadMsg) {
				setTimeout(() => {
					this._init(false, true, false, true);
				}, 100);
			}
		},
		userInfo: {
			handler: function(newV, oldV) {
				console.log(newV);
				this.closedWSNum = 0;
				// 如果是与新用户聊天，进行数据初始化
				if (newV && newV.uid) {
					setTimeout(() => {
						this._init(true, true, true, true);
					}, 100);
				}
			},
			deep: true
		},
		filterText(val) {
			this.$refs.userTree.filter(val);
		}
	},

	methods: {
		// 聊天状态初始化
		_init(
			initUserList = false, // 初始化用户列表
			initHisMsg = false, // 初始化历史消息
			userInit = false, // 初始化用户列表显示加载效果
			hisMsgInit = false // 初始化消息列表
		) {
			if (initUserList && initHisMsg) {
				this.connectionIsOccupied = false;
				this.isTouch = false; // 是否已进行touch连接验证
				this.socketLoading = false; // 是否正在开启加载动画
				this.connectError = false; // 连接失败
			}
			// todo
			if (!ws) {
				this.creatWebSocket();
			} else {
				if (ws.readyState === 1 && !this.socketLoading && !this.connectError) {
					if (initUserList) {
						// 获取好友列表
						if (userInit) {
							this.userListLoading = true;
							setTimeout(() => {
								this.userListLoading = false;
							}, 600);
						}
						this._sendMsg(266, { statusStr: '0,1,2,3' });
					}
					if (initHisMsg && this.userInfo && this.userInfo.uid) {
						this.hisMsStart = new Date().getTime();
						this.loadingMore = false;
						this.hasMore = true;
						this.hisMsgInit = hisMsgInit;
						// 获取历史消息
						this._getHisMsg();
					}
				}
			}
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		selectUser(data) {
			console.log(data);
			if (!data.children) {
				this.$store.dispatch('user/setChatInfo', {
					adminId: data.adminId,
					logoUrl: data.logoUrl,
					orgId: data.orgId,
					simpleName: data.simpleName,
					uid: data.uid,
					fUin: formatPhone(data.fUin || ''),
					fUserAlias: data.fUserAlias,
					fUserFaceUrl: data.fUserFaceUrl,
					status: 1,
					updateTime: new Date().getTime()
				});
			}
		},
		/* 下拉加载事件 */
		load: _debounce(
			function(ev) {
				if (ev.target.scrollTop < 60) {
					console.log('load');
					this._getHisMsg();
				}
			},
			300,
			{}
		),
		refreshWs() {
			this.wsOpenCount = 0;
			this.closedWSNum = 0;
			this._init(true, true, true, true);
		},
		/* 发送message事件 */
		sendMessage: _debounce(function() {
			if (!this.message.trim() || this.connectError || this.socketLoading) {
				return;
			}
			const item = {
				type: 4,
				mid: new Date().getTime().toString(),
				senddate: this._formatDateToStr(new Date().getTime()),
				showSenddate: this.currntSentMsgNum == 0 ? true : false,
				content: this.message,
				status: 0 // 0 发送中  1 成功  2 失败
			};
			this.currntSentMsgNum += 1;
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
				rcvId: this.userInfo.uid,
				sendtime: parseInt(new Date())
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
			if (reconnectCount >= 2) {
				this.closeWS();
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
			this.wsOpenCount++;
			console.log('onopenWS', ws.readyState);
			console.log('onopenWSNum', this.wsOpenCount);
			console.log('isTouched', this.isTouch);

			if (this.wsOpenCount > 3) {
				this.connectError = true;
				this.closeWS();
				return;
			} else {
				if (ws.readyState === 1) {
					this.connectError = false;
					this.socketLoading = false;
					// 发送touch验证
					if (!this.isTouch) {
						this._sendMsg(20);
						this.isTouch = true;
					}
				} else {
					if (this.connectError || this.socketLoading) {
						setTimeout(() => {
							this.onopenWS();
						}, 60000);
					}
				}
			}
		},
		/* WS错误统一处理 */
		onerrorWS(ev) {
			console.log('onerrorWS', ev);
			if (reconnectCount >= 2) {
				this.connectError = true;
			}
			clearInterval(setIntervalWesocketPush);
			this.reconnect();
		},
		/* WS关闭统一处理 */
		oncloseWS() {
			console.log('onclose');
			if (reconnectCount >= 2) {
				this.connectError = true;
			}
			this.closedWSNum++;
			clearInterval(setIntervalWesocketPush);
		},
		/* WS数据接收统一处理 */
		onmessageWS(ev) {
			const msg = JSON.parse(ev.data);
			console.log(msg);
			// 20连接成功处理：1.获取好友列表  2.发送历史消息
			if (msg.cmd == 20) {
				if (msg.status == 0) {
					this.connectionIsOccupied = false;
					this.connectError = false;

					this.isTouch = true;
					if (
						reconnectCount >= 2 ||
						this.connectError ||
						this.closedWSNum >= 3
					) {
						return;
					}
					setTimeout(() => {
						this._init(true, true, true, true);
					}, 500);
					setTimeout(() => {
						this._sendPing();
					}, 1000);
				} else {
					this.isTouch = false;
				}
			}
			// 214连接断开处理
			if (msg.cmd == 214) {
				this.connectionIsOccupied = true;
				this.connectError = true;
				this.closedWSNum = 3;
				this.closeWS();
			}

			// 266获取好友列表
			if (msg.cmd == 266) {
				if (msg.status == 0) {
					let userList = msg.body.list || [];
					// 插入并去重
					if (this.userInfo && this.userInfo.fUin) {
						userList.push(this.userInfo);
						userList = uniqueObjArr(userList, ['uid']);
					} else {
						this.$store.dispatch('user/setChatInfo', userList[0]);
					}

					let map = {},
						dest = [],
						unRead = 0;

					for (let i = 0; i < userList.length; i++) {
						let ai = userList[i];

						if (ai.adminRead && ai.adminRead > 0) {
							unRead += ai.adminRead;
						}

						ai.label = `<span style="color: #000;font-weight: 600;">${
							ai.fUserAlias
								? ai.fUserAlias
								: this.$store.getters.language == 'zh'
								? '未命名'
								: 'Unknown name'
						}</span></br><span style="display:inline-block; padding-top: 5px">${formatPhone(
							ai.fUin
						)}</span>`;
						if (!map[ai.orgId]) {
							dest.push({
								label: ai.orgId
									? ai.simpleName
									: this.$store.getters.language == 'zh'
									? '未命名'
									: 'Unknown name',
								logoUrl: ai.logoUrl,
								orgId: ai.orgId,
								status: ai.status,
								children: [ai]
							});
							map[ai.orgId] = ai;
						} else {
							for (var j = 0; j < dest.length; j++) {
								let dj = dest[j];
								if (dj.orgId == ai.orgId) {
									dj.children.push(ai);
									break;
								}
							}
						}
					}
					this.userList = dest.reverse();
					this.$store.dispatch('user/setUnreadMsg', unRead);
					console.log(this.userList);
				}
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

					$('.infinite-list')
						.delay(500)
						.animate({ scrollTop: 600 + 'px' }, 500);
				}
			}

			// 收到的的消息
			if (msg.cmd == 265) {
				if (msg.body.type == 1 && msg.status == 0) {
					// 如果是当前用户聊天窗口则直接插入
					if (msg.body.sendId == this.userInfo.uid) {
						let message = msg.body;
						message.msgType = 'receive';
						this.messageList.push(message);

						if (this.$store.getters.chatShow) {
							// 清除未读消息
							this._sendMsg(271, { appUid: this.userInfo.uid });
						} else {
							this._umReadMsgNum(this.userList, msg.body.sendId, (data) => {
								const { cIndex, pIndex, umReadMsgNum } = data;
								this.userList[pIndex].children[cIndex].adminRead =
									umReadMsgNum + 1;
								this.userList = this.userList;
							});
							this.$store.dispatch(
								'user/setUnreadMsg',
								this.$store.getters.hasUnreadMsg + 1
							);
						}

						$('.infinite-list')
							.delay(500)
							.animate(
								{
									scrollTop:
										document.querySelector('.infinite-list').scrollHeight + 'px'
								},
								500
							);
					} else {
						// 不然则去循环当前好友列表，并显示小红点 todo
						this._umReadMsgNum(this.userList, msg.body.sendId, (data) => {
							const { cIndex, pIndex, umReadMsgNum } = data;
							this.userList[pIndex].children[cIndex].adminRead =
								umReadMsgNum + 1;
							this.userList = this.userList;
						});
						this.$store.dispatch(
							'user/setUnreadMsg',
							this.$store.getters.hasUnreadMsg + 1
						);
					}
				}
			}

			// 提取历史消息
			if (msg.cmd == 261) {
				// 清除未读消息
				if (this.$store.getters.chatShow) {
					this._sendMsg(271, { appUid: this.userInfo.uid });
					this._umReadMsgNum(this.userList, this.userInfo.uid, (data) => {
						const { cIndex, pIndex, umReadMsgNum } = data;
						this.userList[pIndex].children[cIndex].adminRead = 0;
						this.userList = this.userList;
						this.$store.dispatch(
							'user/setUnreadMsg',
							this.$store.getters.hasUnreadMsg - umReadMsgNum
						);
					});
				}

				if (msg.body.list.length == 0) {
					this.hasMore = false;
				}
				// 消息时间倒序排列
				let list = msg.body.list.reverse();

				// 处理消息的时间数据，按60分钟为单位计算，只显示第一个
				list = list.reduce((cur, next) => {
					if (cur.length > 0) {
						next.senddate - cur[cur.length - 1].senddate >= 60 * 60
							? (next.showSenddate = true)
							: (next.showSenddate = false);
					} else {
						next.showSenddate = true;
					}
					cur.push(next);
					return cur;
				}, []);

				list = list.map((item) => {
					item.status = 1;
					item.msgType = item.type == 1 ? 'receive' : 'send';
					item.senddate = this._formatDateToStr(item.savedate);
					return item;
				});
				this.messageList = this.hisMsgInit
					? list
					: list.concat(this.messageList);
				// 重置消息开始时间
				this.hisMsStart =
					this.messageList.length > 0
						? this.messageList[0].savedate
						: new Date().getTime();

				this.loadingMore = false;
				if (this.hisMsgInit) {
					this.hisMsgInit = false;
					$('.infinite-list')
						.delay(500)
						.animate(
							{
								scrollTop:
									document.querySelector('.infinite-list').scrollHeight + 'px'
							},
							500
						);
				} else {
					$('.infinite-list')
						.delay(500)
						.animate({ scrollTop: 100 + 'px' }, 500);
				}
			}
		},
		/* 发送WS */
		sendWS(data) {
			const obj = JSON.stringify(data);
			console.log(obj);
			if (ws !== null) {
				if (ws.readyState === 3 || ws.readyState === 2) {
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
			} else {
				console.log('creatWebSocket');
				this.reconnect(); //重连
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
				uid: this.$store.getters.userInfo.fId,
				seqnum: 0,
				errmsg: '',
				cmd: 21,
				body: '',
				status: 0,
				token: this.$store.getters.token.split('bearer ')[1].trim()
			};
			clearInterval(setIntervalWesocketPush);
			setIntervalWesocketPush = setInterval(() => {
				console.log('_sendPing');
				if (reconnectCount >= 2 && this.connectError) {
					return;
				}
				this.sendWS(pingData);
			}, heartTimout);
		},
		/* 发送消息模板 */
		_sendMsg(cmd = 21, body = '') {
			// cmd:20 21 260 261
			let msgData = {
				uid: this.$store.getters.userInfo.fId,
				seqnum: 0,
				errmsg: '',
				cmd: cmd,
				body: body,
				status: 0,
				token: this.$store.getters.token.split('bearer ')[1].trim()
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
				id: this.userInfo.orgId || 0,
				direction: 0,
				size: 10,
				start: this.hisMsStart,
				uid: this.userInfo.uid
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
		_formatDateToStr(timestamp) {
			let date = timestamp ? formatDateToStr(timestamp) : '';
			return date;
		},
		_umReadMsgNum(list, uid, fn) {
			let userList = list;
			let umReadMsgNum = 0;
			let pIndex = 0;
			let cIndex = 0;
			for (var i = 0; i < userList.length; i++) {
				for (var j = 0; j < userList[i].children.length; j++) {
					if (uid == userList[i].children[j].uid) {
						umReadMsgNum = userList[i].children[j].adminRead;
						pIndex = i;
						cIndex = j;
						break;
					}
				}
			}
			return fn({ umReadMsgNum, pIndex, cIndex });
		},
		_formatPhone(phone) {
			return formatPhone(phone);
		}
	}
};
</script>

<style lang="scss">
.chat-bg {
	background: #fff;
	border: 1px solid $baseBorderColor;
	position: relative;
	overflow: hidden;
	position: fixed;
	.chat-alerts-bg {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 99;
	}
	.chat-main {
		width: 600px;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		.chat_contact_list {
			width: 230px;
			height: 556px;
			border-right: 1px solid #ddd;
			flex-shrink: 0;
			.el-input,
			.el-input__inner {
				border-radius: 0px !important;
				border: 0;
				background: #e9e9e9;
			}
			.user-item-inner {
				width: 100%;
				height: 100%;
				animation: delay 1s;
				position: absolute;
				padding-left: 15px;
				top: 0;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.has_new_msg {
					display: block;
					flex-shrink: 0;
					position: absolute;
					right: 5px;
					top: 5px;
					line-height: 12px;
					padding: 3px 4px;
					box-sizing: border-box;
					color: #fff;
					font-size: 12px;
					border-radius: 80px;
					text-align: center;
					background: #f56c6c;
				}
			}
			.user-item-inner.active {
				background: #ddd;
			}
		}
		.chat_contact_content {
			flex-grow: 1;
			overflow: hidden;
			position: relative;
		}
	}
	.chat-content {
		height: 500px;
		padding-top: 34px;
	}
	ul {
		padding-inline-start: 0px !important;
		list-style: none;
		li > div {
			display: flex;
			align-items: flex-start;
			margin: 15px 5px;
		}
		.receive-item {
			justify-content: flex-start;
			animation: delay 1s;
			.el-avatar {
				flex-shrink: 0;
				margin-right: 6px;
			}
		}
		.send-item {
			justify-content: flex-end;
			animation: delay 1s;
			.el-avatar {
				flex-shrink: 0;
				margin-left: 6px;
			}
		}
		@keyframes delay {
			from {
				transform: translateY(5%);
				opacity: 0.4;
			}
			to {
				transform: translateY(0);
				opacity: 1;
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
				left: -3px;
				top: 12px;
				transform: rotate(-18deg);
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
				right: -3px;
				top: 0px;
				transform: rotate(-202deg);
			}
		}
	}
	.chat-action {
		overflow: hidden;
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
	.el-tree-node__content {
		height: 50px;
		border-bottom: 1px solid #ddd;
		position: relative;
	}
	.el-tree-node__content > .el-tree-node__expand-icon {
		padding: 2px;
	}
}
</style>
