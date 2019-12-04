<template>
	<div id="message-bg">
		<el-tabs v-model="activeTabName" @tab-click="selectHandler">
			<el-tab-pane
				:label="language == 'zh' ? '系统' : 'System'"
				name="0"
			></el-tab-pane>
			<el-tab-pane
				:label="language == 'zh' ? '手机' : 'App'"
				name="1"
			></el-tab-pane>
			<el-tab-pane
				:label="language == 'zh' ? '机构管理员' : 'Org.Admin'"
				name="4"
			></el-tab-pane>
		</el-tabs>
		<header>
			<el-button
				@click="$refs.AddMessage.addMessageVisible = true"
				type="primary"
				>+ {{ $t('action.add') }}</el-button
			>
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
		<main>
			<el-table
				:cell-style="_tableCellColor"
				:header-cell-style="_tableHeaderColor"
				:row-class-name="_tabRowClassName"
				:data="filterTableData"
				border
				style="width: 100%"
			>
				<el-table-column
					:resizable="false"
					type="selection"
					width="55"
				></el-table-column>
				<el-table-column
					:resizable="false"
					type="index"
					width="50"
					:label="$t('tableTitle.no')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="userType"
					:label="$t('tableTitle.origin')"
					width="114"
					:filters="[
						{ text: language == 'zh' ? '系统' : 'System', value: 0 },
						{ text: language == 'zh' ? '手机' : 'App', value: 1 },
						{ text: language == 'zh' ? '管理员' : 'Admin', value: 4 }
					]"
					:filter-method="filterHandler"
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
					<!--					<template slot-scope="scope">-->
					<!--						<a href="tel:13163735200">13163735200</a>-->
					<!--					</template>-->
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="msgContent"
					:label="$t('tableTitle.content')"
				>
				</el-table-column>

				<el-table-column
					:resizable="false"
					width="130"
					prop="resultCode"
					:label="$t('tableTitle.status')"
				>
					<template slot-scope="scope">
						<span
							v-if="scope.row.resultCode == 1"
							style="color: #5f9de9;font-weight: 600;"
							>{{ language == 'zh' ? '待发送' : 'To be sent' }}</span
						>
						<span
							v-if="scope.row.resultCode == 0"
							style="color: #39c973;font-weight: 600;"
							>{{ language == 'zh' ? '发送成功' : 'Sent successfully' }}</span
						>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					width="130"
					prop="saveTime"
					:label="$t('tableTitle.time')"
				></el-table-column>
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
import { getDevicesMsgList } from '@/api/message';
import { _debounce, formatDate } from '@/utils/validate';

export default {
	name: 'Messages',
	mixins: [mixin],
	components: { AddMessage, Pagination },
	data() {
		return {
			activeTabName: '0',
			search: '',
			pageSize: 10,
			total: 0,
			currentPage: 1,
			language: this.$store.getters.language,
			tableData: [],
			filterTableData: []
		};
	},
	mounted() {
		if (!this.$route.params.id) {
			console.log('this.$route.params.id null');
		} else {
			this._getDevicesMsgList();
		}
	},
	methods: {
		selectHandler(tab) {
			this.activeTabName = tab.name;
			this.filterTableData = this.tableData.filter((item) => {
				return item.userType == this.activeTabName;
			});
		},
		// 消息来源过滤
		filterHandler(value, row, column) {
			const property = column['property'];
			return row[property] === value;
		},
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
		},
		_getDevicesMsgList() {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getDevicesMsgList({
				did: this.$route.params.id,
				page: this.currentPage,
				search: this.search
			})
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.pageSize = pageSize;
					this.total = total;
					this.$refs.Pagination.currentPage = pageNum;
					this.$refs.Pagination.pageSize = pageSize;
					this.$refs.Pagination.total = total;
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
					this.filterTableData = this.tableData.filter((item) => {
						return item.userType == this.activeTabName;
					});
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
		// // 打开新增消息弹窗
		// addMessage() {
		//   this.$refs.AddMessage.addMessageVisible = true;
		// },

		_tableCellColor({ columnIndex }) {
			// if (columnIndex === 4 || columnIndex === 6 || columnIndex === 7) {
			//   // 蓝色字体
			//   return "color: #60b8f7;text-align: center;cursor: pointer;";
			// } else if (columnIndex === 9) {
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
		margin-bottom: 25px;
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
