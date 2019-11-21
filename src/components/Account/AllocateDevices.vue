<template>
	<el-dialog
		top="8vh"
		custom-class="add-dev-dialog"
		width="1000px"
		:visible.sync="allocateDevicesVisible"
		destroy-on-close
	>
		<header>
			<span></span>
			<div style="width: 600px;">
				<el-input :placeholder="$t('notice.searchTips')" v-model="search">
					<template slot="append">{{ $t('action.search') }}</template>
				</el-input>
			</div>
			<i class="el-icon-close" @click="allocateDevicesVisible = false"></i>
		</header>
		<main>
			<el-table
				:cell-style="_tableCellColor"
				:header-cell-style="_tableHeaderColor"
				:row-class-name="_tabRowClassName"
				:data="tableData"
				height="500"
				border
			>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column
					property="fUid"
					:label="$t('user.userId')"
				></el-table-column>
				<el-table-column
					property="fFullname"
					:label="$t('user.userName')"
				></el-table-column>
				<el-table-column
					property="fPhone"
					:label="$t('user.phoneNumber')"
				></el-table-column>
				<el-table-column
					property="fAddress"
					:label="$t('user.address')"
				></el-table-column>

				<el-table-column
					property="address"
					:label="$t('tableTitle.modelNo')"
				></el-table-column>
				<el-table-column
					property="fDeviceType"
					:label="$t('tableTitle.accountID')"
				></el-table-column>
				<el-table-column
					property="address"
					:label="$t('tableTitle.org')"
				></el-table-column>
				<el-table-column
					property="address"
					:label="$t('tableTitle.IMEI')"
				></el-table-column>
				<el-table-column
					property="address"
					:label="$t('tableTitle.IMSI')"
				></el-table-column>
			</el-table>
			<div class="Pagination-bg">
				<Pagination ref="Pagination" @currentChange="pageChange"></Pagination>
				<div style="margin-top: 30px;">
					<el-button @click="allocateDevicesVisible = false">
						{{ $t('action.cancel') }}
					</el-button>
					<el-button type="primary" @click="allocateDevicesVisible = false">
						{{ $t('action.confirm') }}
					</el-button>
				</div>
			</div>
		</main>
	</el-dialog>
</template>

<script>
import mixin from '@/views/mixin';
import { getDevicesList } from '@/api/devices';
const Pagination = () => import('@/components/Pagination/index.vue');

export default {
	name: 'AllocateDevices',
	mixins: [mixin],
	components: { Pagination },
	data() {
		return {
			search: '',
			currentPage: 1,
			allocateDevicesVisible: false,
			tableData: []
		};
	},
	watch: {
		allocateDevicesVisible() {
			if (this.allocateDevicesVisible) this._getDevicesList();
		}
	},
	methods: {
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			this._getDevicesList();
		},
		_getDevicesList() {
			this.loading = this.$loading({
				target: document.querySelector('.add-dev-dialog'),
				background: 'rgba(225, 225, 225, .6)'
			});
			getDevicesList({ page: this.currentPage, search: this.search })
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.tableData = list;
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
		_addAccount() {
			this.gridData.push({
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			});
		},
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 2) {
				return 'color: #666666;text-align: center;cursor: pointer;';
			}
			// 蓝色字体
			return 'color: #60b8f7;text-align: center;cursor: pointer;';
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.add-dev-dialog {
	header {
		@include flex-b-c;
		height: 80px;
		i {
			font-size: 28px;
			padding: 20px 0 20px 20px;
			cursor: pointer;
		}
	}
	main {
		padding: 0 0 20px 0;
		.Pagination-bg {
			@include flex-b-c;
		}
	}
}
</style>

<style lang="scss">
.add-dev-dialog {
	.el-dialog__header {
		display: none;
	}
	.el-dialog__body {
		padding: 0 20px 20px !important;
	}
}
</style>
