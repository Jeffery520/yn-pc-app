<template>
	<div id="devices">
		<header class="table-header-tools">
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
				>
					<el-button slot="append" @click="searchUser">{{
						$t('action.search')
					}}</el-button>
				</el-input>
			</div>
		</header>
		<main>
			<el-table
				ref="table"
				:header-cell-style="_tableHeaderColor"
				:cell-style="_tableCellColor"
				:row-class-name="_tabRowClassName"
				highlight-current-row
				:data="tableData"
				height="68vh"
				border
				style="width: 100%"
			>
				<el-table-column
					:resizable="false"
					width="80"
					:label="$t('tableTitle.no')"
				>
					<template slot-scope="scope">
						<span>
							{{ parseInt(pageSize * (currentPage - 1) + scope.$index + 1) }}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="fUserAlias"
					width="140"
					:label="$t('user.userName')"
				>
					<template slot-scope="scope">
						<el-popover
							placement="right"
							trigger="hover"
							popper-class="user-photo-popover"
						>
							<div slot="reference">{{ scope.row.fUserAlias || '—' }}</div>
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
				>
					<template slot-scope="scope">
						<span @click="callPhone(scope.row.fUin)">{{ scope.row.fUin }}</span>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="fLastLoginTime"
					min-width="200"
					:label="$t('user.lastLoginTime')"
				></el-table-column>
				<el-table-column :resizable="false" :label="$t('notice.chat.chat')">
					<template slot-scope="scope">
						<svg-icon
							@click.stop="openChat(scope)"
							style="font-size: 28px;"
							icon-class="weixin-icon"
						></svg-icon>
					</template>
				</el-table-column>
				<!--				<el-table-column-->
				<!--					:resizable="false"-->
				<!--					:label="$t('action.messages')"-->
				<!--					width="80"-->
				<!--				>-->
				<!--					<template slot-scope="scope">-->
				<!--						<i-->
				<!--							@click.stop="openMseeages(scope)"-->
				<!--							style="padding:10px; "-->
				<!--							class="el-icon-message"-->
				<!--						></i>-->
				<!--					</template>-->
				<!--				</el-table-column>-->

				<el-table-column :resizable="false" :label="$t('others.devicesPaired')">
					<el-table-column
						:resizable="false"
						:label="$t('others.nickNameOfTheDevice')"
						width="160"
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
												.fMemo || '—'
										}}
									</span>
									<i class="el-icon-arrow-down"></i>
								</div>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item
										v-for="(item, index) in scope.row.bindWearerList"
										:key="index"
										:command="scope.$index + ',' + index"
										>{{ item.fMemo || '—' }}</el-dropdown-item
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
						width="100"
					>
						<template slot-scope="scope" v-if="scope.row.bindWearerList.length">
							<span
								v-if="
									scope.row.bindWearerList[scope.row.currentDeviceIndex].fAdmin
								"
								style="color:#008C23"
							>
								{{ language == 'zh' ? '是' : 'Yes' }}
							</span>
							<span v-else style="color: #ff0101;">
								{{ language == 'zh' ? '否' : 'No' }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						:resizable="false"
						:label="$t('tableTitle.modelNo')"
						width="100"
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
										: '—'
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
			@close="closeChat"
		>
			<Chat v-if="chatVisible" :userInfo="chatInfo || ''" ref="Chat"></Chat>
		</el-dialog>
		<phone-call ref="phoneCall"></phone-call>
		<!--message 弹窗-->
		<!--		<Message ref="Message"></Message>-->
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import Pagination from '@/components/Pagination/index.vue';
const Chat = () => import('@/components/Chat/index.vue');
import { formatDateToStr, _debounce } from '@/utils/validate';
import { getAllAppUser } from '@/api/appUser';
export default {
	name: 'Devices',
	mixins: [mixin],
	components: { Pagination, Chat },
	data() {
		return {
			language: this.$store.getters.language,
			chatVisible: false,
			chatInfo: '',
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
		callPhone(phone) {
			if (phone) {
				this.$refs.phoneCall.phone = phone;
				this.$refs.phoneCall.callDisplay = true;
			}
		},
		selectDevice(command) {
			let index = command.split(',');
			this.tableData[index[0]].currentDeviceIndex = index[1];
		},
		_getAllAppUser() {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
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
								date = formatDateToStr(
									item.fLastLoginTime * 1000,
									this.$store.getters.language
								);
							} else {
								date = formatDateToStr(
									item.fLastLoginTime,
									this.$store.getters.language
								);
							}
							item.fLastLoginTime = date;
						}
						item.currentDeviceIndex = 0;
						return item;
					});
					// this._tableLayout('userTable');
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		searchUser: _debounce(function() {
			this.currentPage = 1;
			this._getAllAppUser();
		}),
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
		// openChat({ row }) {
		// 	this.$refs.table.setCurrentRow(row);
		// 	this.chatVisible = true;
		// },
		openChat({ row }) {
			this.$refs.table.setCurrentRow(row);
			this.chatVisible = true;

			this.chatInfo = {
				userId: row.fUid,
				phone: row.fUin,
				userName: row.fUserAlias,
				Did: row.bindWearerList[0].fDid,
				fUserFaceUrl: row.fUserFaceUrl,
				isAdmin: 1
			};
		},
		closeChat() {
			this.chatVisible = false;
		},
		openMseeages({ row }) {
			this.$refs.table.setCurrentRow(row);
			// this.$refs.Message.messageVisible = true;
			// this.$refs.Message.messageData = [row];
			this.$router.push({
				name: 'AppuserMessage',
				params: { id: row.fUid }
			});
		},
		// 重置表单样式
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 1 || columnIndex === 10) {
				// 可点击文字
				return 'color: #666666;text-align: center;cursor: pointer;';
			} else if (columnIndex === 4 || columnIndex === 5) {
				// 图标
				return ' color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;';
			} else if (columnIndex === 2) {
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			}
			return 'color: #666666;text-align: center;';
		}
	}
};
</script>
<style scoped lang="scss">
@import '@/style/mixin.scss';
#devices {
	@include table-bg;
	main {
		.el-dropdown-link {
			@include flex-c-c;
		}
	}
}
</style>
<style lang="scss">
.chat-dialog {
	.el-dialog__body {
		padding: 0 !important;
	}
	.chat-bg {
		border-top: none !important;
	}
}
</style>
