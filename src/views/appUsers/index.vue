<template>
	<div id="devices">
		<header>
			<div class="d-header-title">
				<span>{{ $t('appUsers.tableTitle') }}</span>
				<span>{{ total }}</span>
			</div>
			<div style="width:620px;">
				<el-input
					:placeholder="
						$t('notice.searchTipsStart') +
							' ' +
							$t('user.userName') +
							' / ' +
							$t('user.phoneNumber') +
							' ' +
							$t('notice.searchTipsEnd')
					"
					v-model="search"
					@keyup.enter.native="searchUser"
					@blur="searchUser"
				>
					<el-button slot="append" @click="searchUser">
						{{ $t('action.search') }}
					</el-button>
				</el-input>
			</div>
		</header>
		<main>
			<el-table
				:header-cell-style="_tableHeaderColor"
				:cell-style="_tableCellColor"
				:row-class-name="_tabRowClassName"
				:data="tableData"
				height="65vh"
				border
				style="width: 100%"
			>
				<el-table-column
					:resizable="false"
					width="50"
					:label="$t('tableTitle.no')"
				>
					<template slot-scope="scope">
						<span>{{
							parseInt(pageSize * (currentPage - 1) + scope.$index + 1)
						}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="fUserAlias"
					:label="$t('user.userName')"
				>
					<template slot-scope="scope">
						<el-popover
							placement="right"
							trigger="hover"
							popper-class="user-photo-popover"
						>
							<div slot="reference">{{ scope.row.fUserAlias || '--' }}</div>
							<el-avatar
								class="user-photo"
								:size="100"
								:src="scope.row.fUserFaceUrl"
							></el-avatar>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="fUin"
					:label="$t('user.phoneNumber')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="fLastLoginTime"
					:label="$t('user.lastLoginTime')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					:label="$t('notice.chat.chat')"
					width="120"
				>
					<template slot-scope="scope">
						<svg-icon
							@click.stop="openChat(scope)"
							style="font-size: 28px;"
							icon-class="weixin-icon"
						></svg-icon>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					:label="$t('action.messages')"
					width="120"
				>
					<template slot-scope="scope">
						<i
							@click.stop="openMseeages(scope)"
							style="padding:10px; "
							class="el-icon-message"
						></i>
					</template>
				</el-table-column>

				<el-table-column :resizable="false" :label="$t('others.devicesPaired')">
					<el-table-column
						:resizable="false"
						:label="$t('others.nickNameOfTheDevice')"
						width="180"
					>
						<template slot-scope="scope">
							<el-dropdown @command="selectDevice" placement="bottom">
								<div
									v-if="scope.row.bindWearerList.length"
									style="width:120px;display:flex;justify-content: space-between;align-items: center;"
								>
									<span style="flex-grow:1">
										{{
											scope.row.bindWearerList[scope.row.currentDeviceIndex]
												.fMemo || '--'
										}}
									</span>
									<i class="el-icon-arrow-down"></i>
								</div>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item
										v-for="(item, index) in scope.row.bindWearerList"
										:key="index"
										:command="scope.$index + ',' + index"
										>{{ item.fMemo || '--' }}</el-dropdown-item
									>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
					<el-table-column
						:resizable="false"
						:label="$t('others.IMEIofTheDevice')"
						width="180"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.bindWearerList.length">
								{{
									scope.row.bindWearerList[scope.row.currentDeviceIndex]
										.fDeviceImei
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						:resizable="false"
						:label="$t('tableTitle.admin')"
						width="120"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.bindWearerList.length">
								{{
									scope.row.bindWearerList[scope.row.currentDeviceIndex].fAdmin
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						:resizable="false"
						:label="$t('tableTitle.modelNo')"
						width="120"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.bindWearerList.length">
								{{
									scope.row.bindWearerList[scope.row.currentDeviceIndex]
										.fDeviceType == 1
										? 'T9'
										: scope.row.bindWearerList[scope.row.currentDeviceIndex]
												.fDeviceType == 4097
										? 'T9S'
										: scope.row.bindWearerList[scope.row.currentDeviceIndex]
												.fDeviceType == 4098
										? 'R02'
										: scope.row.bindWearerList[scope.row.currentDeviceIndex]
												.fDeviceType == 4099
										? 'R03'
										: '--'
								}}
							</span>
						</template>
					</el-table-column>
				</el-table-column>
			</el-table>
			<Pagination
				ref="Pagination"
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</main>
		<!--chat 弹窗-->
		<el-dialog
			:visible.sync="chatVisible"
			width="380px"
			custom-class="chat-dialog"
		>
			<Chat ref="Chat"></Chat>
		</el-dialog>
		<!--message 弹窗-->
		<Message ref="Message"></Message>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
const Pagination = () => import('@/components/Pagination/index.vue');
const Message = () => import('@/components/Devices/Message.vue');
const Chat = () => import('@/components/Chat/index.vue');

import { formatDate } from '@/utils/validate';
import { getAllAppUser } from '@/api/appUser';
export default {
	name: 'Devices',
	mixins: [mixin],
	components: { Message, Pagination, Chat },
	data() {
		return {
			chatVisible: false,
			total: 0,
			search: '',
			pageSize: 10,
			currentPage: 1,
			tableData: []
		};
	},
	mounted() {
		this._getAllAppUser();
	},
	methods: {
		selectDevice(command) {
			let index = command.split(',');
			this.tableData[index[0]].currentDeviceIndex = index[1];
		},
		_getAllAppUser() {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, .6)'
			});
			getAllAppUser({ page: this.currentPage, search: this.search })
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.total = total;
					this.pageSize = pageSize;

					this.$refs.Pagination.currentPage = pageNum;
					this.$refs.Pagination.pageSize = pageSize;
					this.$refs.Pagination.total = total;
					this.tableData = list.map((item) => {
						let date = '';
						if (item.fLastLoginTime) {
							if (!isNaN(item.fLastLoginTime)) {
								date = formatDate(
									item.fLastLoginTime * 1000,
									this.$store.getters.language
								);
							} else {
								date = formatDate(
									item.fLastLoginTime,
									this.$store.getters.language
								);
							}
							item.fLastLoginTime = `${date.ampm} ${date.hour}:${date.minute}, ${date.year}-${date.month}-${date.day}`;
						}
						item.currentDeviceIndex = 0;
						return item;
					});

					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		searchUser() {
			this._getAllAppUser();
		},
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			this._getAllAppUser();
		},
		// 选择用户
		selectUser(command) {
			console.log(command);
			console.log('select a User');
		},
		openChat() {
			this.chatVisible = true;
		},
		openMseeages({ row }) {
			console.log(this.$refs.Message);
			this.$refs.Message.messageVisible = true;
			this.$refs.Message.messageData = [row];
		},
		// 重置表单样式
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 1 || columnIndex === 10) {
				// 可点击文字
				return 'color: #666666;text-align: center;cursor: pointer;';
			} else if (columnIndex === 4 || columnIndex === 5) {
				// 图标
				return ' color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;';
			} else if (columnIndex === 2 || columnIndex === 7) {
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			}
			return 'color: #666666;text-align: center;cursor: pointer;';
		}
	}
};
</script>
<style scoped lang="scss">
@import '@/style/mixin.scss';
#devices {
	@include table-bg;
	header {
		@include flex-b-c;
		flex-wrap: wrap;
		margin-bottom: 25px;
		.d-header-title {
			line-height: 35px;
			color: #fff;
			& > span:first-child {
				display: inline-block;
				padding: 0 20px;
				background-color: $lightColor;
				font-size: 16px;
			}
			& > span:last-child {
				display: inline-block;
				padding: 0 20px;
				background-color: $normalColor;
				font-size: 18px;
				font-weight: 600;
			}
		}
	}
	main {
		.el-dropdown-link {
			@include flex-c-c;
		}
	}
}
</style>
<style lang="scss">
.chat-dialog {
	.el-dialog__header {
		height: 40px;
		line-height: 40px;
		background-color: #ffffff !important;
		border-bottom: none !important;
	}
	.el-dialog__body {
		padding: 0 !important;
	}
	.chat-bg {
		border-top: none !important;
	}
}
</style>
