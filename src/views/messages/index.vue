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
			<el-button @click="addMsg" type="primary"
				>+ {{ $t('action.add') }}</el-button
			>
			<span></span>
			<div style="width: 500px;">
				<el-input
					:placeholder="
						$t('notice.searchTipsStart') + '/' + $t('notice.searchTipsEnd')
					"
					v-model="search"
				>
					<template slot="append">{{ $t('action.search') }}</template>
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
				:cell-style="_tableCellColor"
				:header-cell-style="_tableHeaderColor"
				:row-class-name="_tabRowClassName"
				:data="tableData"
				border
				height="55vh"
				style="width: 100%"
			>
				<!--				<el-table-column-->
				<!--					:resizable="false"-->
				<!--					type="selection"-->
				<!--					width="55"-->
				<!--				></el-table-column>-->
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
									? 'Admin'
									: '管理员'
								: '—'
						}}
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					prop="username"
					:label="$t('user.userName')"
				></el-table-column>
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
					:label="$t('tableTitle.time')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					width="160"
					prop="resultCode"
					:label="$t('tableTitle.status')"
				>
					<template slot-scope="scope">
						<span
							v-if="scope.row.resultCode == -1"
							style="color:#E65945;font-weight: 600;"
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
const Pagination = () => import('@/components/Pagination/index.vue');
const AddMessage = () => import('@/components/AddMessage/AddMessage.vue');
import { getMsgList, getDevicesMsgList } from '@/api/message';
import { _debounce, formatDate } from '@/utils/validate';
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
				console.log(1111111);
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
		},
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
								date = formatDate(
									item.saveTime * 1000,
									this.$store.getters.language
								);
							} else {
								date = formatDate(item.saveTime, this.$store.getters.language);
							}
							item.saveTime = `${date.ampm} ${date.hour}:${date.minute}, ${date.year}-${date.month}-${date.day}`;
						} else {
							item.saveTime = '';
						}
						return item;
					});
					this.$refs.Pagination.currentPage = pageNum;
					this.$refs.Pagination.pageSize = pageSize;
					this.$refs.Pagination.total = total;
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
								date = formatDate(
									item.saveTime * 1000,
									this.$store.getters.language
								);
							} else {
								date = formatDate(item.saveTime, this.$store.getters.language);
							}
							item.saveTime = `${date.ampm} ${date.hour}:${date.minute}, ${date.year}-${date.month}-${date.day}`;
						} else {
							item.saveTime = '';
						}
						return item;
					});
					this.$refs.Pagination.currentPage = pageNum;
					this.$refs.Pagination.pageSize = pageSize;
					this.$refs.Pagination.total = total;
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
			if (columnIndex === 5) {
				// 黄色字体
				return 'font-weight:600';
			}

			if (columnIndex === 3) {
				// 蓝色字体
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			}
			// else if (columnIndex === 9) {
			//   // 图标
			//   return "color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;";
			// }
			return 'color: #666666;text-align: center;cursor: pointer;';
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
		margin-bottom: 20px;
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
		margin: 0 0 25px;
	}
}
</style>
