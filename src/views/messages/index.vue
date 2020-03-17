<template>
	<div id="message-bg">
		<el-tabs
			v-if="!$route.params.id"
			v-model="activeTabName"
			@tab-click="selectHandler"
		>
			<el-tab-pane
				:label="language == 'zh' ? '设备' : 'Devices'"
				name="0"
			></el-tab-pane>
			<!--			<el-tab-pane-->
			<!--				:label="language == 'zh' ? '用户' : 'App user'"-->
			<!--				name="1"-->
			<!--			></el-tab-pane>-->
		</el-tabs>

		<header>
			<el-button
				v-if="$store.getters.userInfo.resource.indexOf(23) > -1"
				@click="addMsg"
				type="primary"
				>+ {{ $t('action.add') }}</el-button
			>
			<span></span>
			<div style="width: 620px;">
				<el-input
					:placeholder="
						$t('notice.searchTipsStart') +
							' ' +
							$t('user.userName') +
							' / ' +
							$t('user.phoneNumber') +
							' / ' +
							$t('tableTitle.IMEI') +
							' ' +
							$t('notice.searchTipsEnd')
					"
					v-model="search"
					@keyup.enter.native="searchMessages"
				>
					<el-button slot="append" @click="searchMessages">{{
						$t('action.search')
					}}</el-button>
				</el-input>
			</div>
		</header>

		<div class="d-header-filter">
			<span style="font-weight: 600;"
				>{{ $t('route.messages') + ' ' + $t('tableTitle.origin') }}:</span
			>
			<div class="filter-item" style="margin-left:40px">
				<!--  用户类型 0-系统，1-app, 4-web管理用户-->
				<el-checkbox-group v-model="filterType" @change="filterTypeChange">
					<el-checkbox label="">{{ $t('action.all') }}</el-checkbox>
					<el-checkbox label="0">{{
						language == 'zh' ? '系统' : 'System'
					}}</el-checkbox>
					<el-checkbox label="1">{{
						language == 'zh' ? '手机' : 'App'
					}}</el-checkbox>
					<el-checkbox label="4">{{
						language == 'zh' ? '管理员' : 'Admin'
					}}</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>

		<main>
			<el-table
				ref="table"
				:header-cell-style="_tableHeaderColor"
				:cell-style="_tableCellColor"
				:row-class-name="_tabRowClassName"
				highlight-current-row
				:data="tableData"
				border
				height="58vh"
				style="width: 100%"
			>
				<!--				<el-table-column-->
				<!--					:resizable="false"-->
				<!--					type="selection"-->
				<!--					width="55"-->
				<!--				></el-table-column>-->
				<el-table-column
					:resizable="false"
					width="80"
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
					prop="userType"
					:label="$t('tableTitle.origin')"
					width="114"
				>
					<template slot-scope="scope">
						{{
							scope.row.userType == 0
								? language == 'zh'
									? '系统'
									: 'System'
								: scope.row.userType == 1
								? language == 'zh'
									? '手机'
									: 'App'
								: scope.row.userType == 4
								? language == 'zh'
									? '管理员'
									: 'Admin'
								: '—'
						}}
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					prop="username"
					:label="$t('user.userName')"
				>
					<template slot-scope="scope">
						<span v-if="scope.row.userName">{{ scope.row.userName }}</span>
						<span style="color: #bbb;" v-else>{{
							$t('user.unknownName')
						}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="imei"
					width="160"
					:label="$t('tableTitle.IMEI')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="orgName"
					:label="$t('tableTitle.org')"
				></el-table-column>

				<el-table-column
					:resizable="false"
					prop="msgType"
					:label="$t('tableTitle.type')"
				>
					<template slot-scope="scope">
						{{ $t(`msgType[${scope.row.msgType}]`) }}
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					prop="msgContent"
					width="260"
					:label="$t('tableTitle.content')"
				>
				</el-table-column>

				<el-table-column
					:resizable="false"
					prop="saveTime"
					:label="$t('others.dateTime')"
				>
					<template slot-scope="scope"
						><div v-html="scope.row.saveTime"></div
					></template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					width="160"
					prop="resultCode"
					:label="$t('tableTitle.status')"
				>
					<template slot-scope="scope">
						<span
							v-if="scope.row.resultCode == -1"
							style="color:#FF4848;font-weight: 600;"
							>{{ language == 'zh' ? '待发送' : 'To be sent' }}</span
						>
						<span
							v-if="scope.row.resultCode == 0"
							style="color: #39c973;font-weight: 600;"
							>{{ language == 'zh' ? '发送成功' : 'Sent successfully' }}</span
						>
					</template>
				</el-table-column>
			</el-table>
			<Pagination
				ref="Pagination"
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</main>
		<!-- 新增用户-->
		<add-message ref="AddMessage"></add-message>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import Pagination from '@/components/Pagination/index.vue';
const AddMessage = () => import('@/components/AddMessage/AddMessage.vue');
import { getMsgList, getDevicesMsgList } from '@/api/message';
import { _debounce, formatDateToStr } from '@/utils/validate';
import eventBus from '@/utils/eventBus.js';

export default {
	name: 'Messages',
	mixins: [mixin],
	components: { Pagination, AddMessage },
	data() {
		return {
			activeTabName: '0',
			filterType: [''],
			search: '',
			pageSize: 10,
			total: 0,
			currentPage: 1,
			language: this.$store.getters.language,
			tableData: []
		};
	},
	mounted() {
		if (this.$route.params.search) {
			let search = this.$route.params.search.split('|')[0] || '';
			let filterType = this.$route.params.search.split('|')[1].split(',') || [
				''
			];
			this.search = search;
			this.filterType = filterType;
		}

		this.currentPage = 1;
		if (!this.$route.params.id) {
			this._getMsgList();
		} else {
			this._getDevicesMsgList();
		}
	},
	destroyed() {
		eventBus.$off('updateMessageList');
	},
	methods: {
		selectHandler(tab) {
			this.currentPage = 1;
			if (tab.name == 0) {
				this.activeTabName = tab.name;
				if (this.$route.params.id) {
					this._getDevicesMsgList();
				} else {
					this._getMsgList();
				}
			}
		},
		filterTypeChange: _debounce(function(value) {
			this.currentPage = 1;
			// 去掉空项
			if (value[value.length - 1]) {
				if (value.indexOf('') >= 0) {
					value.splice(value.indexOf(''), 1);
				}
				this.filterType = value;
			} else {
				this.filterType = [''];
			}

			if (this.$route.params.id) {
				this._getDevicesMsgList();
			} else {
				this._getMsgList();
			}
		}),
		addMsg() {
			this.$refs.AddMessage.addMessageVisible = true;
			eventBus.$on('updateMessageList', () => {
				this.currentPage = 1;
				if (!this.$route.params.id) {
					this._getMsgList();
				} else {
					this._getDevicesMsgList();
				}
			});
		},

		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			if (!this.$route.params.id) {
				this._getMsgList();
			} else {
				this._getDevicesMsgList();
			}
		},
		searchMessages: _debounce(function() {
			if (this.$route.params.search) {
				if (this.$route.params.id) {
					this._getDevicesMsgList();
				} else {
					this._getMsgList();
				}

				// if (!this.$route.params.id) {
				// 	this.$router.replace({
				// 		name: 'MessagesSearch',
				// 		params: { search: this.search + '|' + this.filterType.join(',') }
				// 	});
				// } else {
				// 	this.$router.replace({
				// 		name: 'DeviceMessageSearch',
				// 		params: {
				// 			search: this.search + '|' + this.filterType.join(','),
				// 			id: this.$route.params.id
				// 		}
				// 	});
				// }
			} else {
				if (!this.$route.params.id) {
					this.$router.push({
						name: 'MessagesSearch',
						params: { search: this.search + '|' + this.filterType.join(',') }
					});
				} else {
					this.$router.push({
						name: 'DeviceMessageSearch',
						params: {
							search: this.search + '|' + this.filterType.join(','),
							id: this.$route.params.id
						}
					});
				}
				this.search = '';
			}
			// this.currentPage = 1;
			// if (!this.$route.params.id) {
			// 	this._getMsgList();
			// } else {
			// 	this._getDevicesMsgList();
			// }
		}),
		_getMsgList() {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getMsgList({
				page: this.currentPage,
				search: this.search,
				types: this.filterType.join(',')
			})
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.pageSize = pageSize;
					this.total = total;
					this.tableData = list.map((item) => {
						let date = '';
						if (item.saveTime) {
							if (!isNaN(item.saveTime)) {
								date = formatDateToStr(
									item.saveTime * 1000,
									this.$store.getters.language,
									'YYMMDDHHmm',
									true
								);
							} else {
								date = formatDateToStr(
									item.saveTime,
									this.$store.getters.language,
									'YYMMDDHHmm',
									true
								);
							}
							item.saveTime = date;
						} else {
							item.saveTime = '';
						}
						return item;
					});
					if (this.$refs.Pagination) {
						this.$refs.Pagination.currentPage = pageNum;
						this.$refs.Pagination.pageSize = pageSize;
						this.$refs.Pagination.total = total;
					}

					this.loading.close();
				})
				.catch((error) => {
					this.loading.close();
					this.$message({
						showClose: true,
						message:
							error.message || `Request failed with status code${error.status}`,
						type: 'error'
					});
				});
		},
		_getDevicesMsgList() {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getDevicesMsgList({
				did: this.$route.params.id,
				page: this.currentPage,
				search: this.search,
				types: this.filterType.join(',')
			})
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.pageSize = pageSize;
					this.total = total;
					this.tableData = list.map((item) => {
						let date = '';
						if (item.saveTime) {
							if (!isNaN(item.saveTime)) {
								date = formatDateToStr(
									item.saveTime * 1000,
									this.$store.getters.language,
									'YYMMDDHHmm',
									true
								);
							} else {
								date = formatDateToStr(
									item.saveTime,
									this.$store.getters.language,
									'YYMMDDHHmm',
									true
								);
							}
							item.saveTime = date;
						} else {
							item.saveTime = '';
						}
						return item;
					});
					if (this.$refs.Pagination) {
						this.$refs.Pagination.currentPage = pageNum;
						this.$refs.Pagination.pageSize = pageSize;
						this.$refs.Pagination.total = total;
					}

					this.loading.close();
				})
				.catch((error) => {
					this.loading.close();
					this.$message({
						showClose: true,
						message:
							error.message || `Request failed with status code${error.status}`,
						type: 'error'
					});
				});
		},
		_tableCellColor({ columnIndex }) {
			return 'color: #666666;text-align: center;';
		}
	}
};
</script>

<style lang="scss" scoped>
@import '~@/style/mixin.scss';
#message-bg {
	@include table-bg;
	header {
		@include flex-b-c;
		flex-wrap: wrap;
		margin-bottom: 15px;
	}
	main {
		.el-dropdown-link {
			@include flex-c-c;
		}
	}
}
</style>
<style lang="scss">
#message-bg {
	padding-top: 0 !important;
	.el-tabs__nav-wrap::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1px;
		background-color: #ddd;
		z-index: 1;
	}
	.el-tabs__item {
		width: 100px;
		font-weight: 600;
	}
	.el-tabs__header {
		margin: 0 0 20px;
	}
}
</style>
