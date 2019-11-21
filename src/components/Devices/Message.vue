<template>
	<el-dialog
		top="14vh"
		custom-class="message-dialog"
		width="80vw"
		:title="$t('action.messages')"
		:visible.sync="messageVisible"
		append-to-body
	>
		<el-table
			:row-class-name="tabRowClassName"
			:header-cell-style="tableHeaderColor"
			:cell-style="tableCellColor"
			:data="messageData"
			height="600"
			border
			style="width: 100%"
		>
			<el-table-column prop="date1" label="Adress"></el-table-column>
			<el-table-column prop="name1" label="Model No."></el-table-column>
			<el-table-column prop="address1" label="Org."></el-table-column>
			<el-table-column prop="address2" label="IMEI"></el-table-column>
			<el-table-column prop="address2" label="IMSI"></el-table-column>
		</el-table>
		<!--分页组件-->
		<pagination
			ref="Pagination"
			:currentPage="currentPage"
			@currentChange="pageChange"
		></pagination>
	</el-dialog>
</template>

<script>
import { getDeviceAlertList } from '@/api/alert';
const Pagination = () => import('@/components/Pagination/index.vue');
export default {
	name: 'Message',
	components: { Pagination },
	data() {
		return {
			currentPage: 0,
			messageVisible: false,
			messageInfo: Object,
			messageData: []
		};
	},
	watch: {
		messageInfo() {
			this._getDeviceAlertList(1);
		}
	},
	methods: {
		pageChange(page) {
			this.$refs.Pagination.currentPage = page;
			this._getDeviceAlertList(page);
		},
		_getDeviceAlertList(page) {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, .6)'
			});
			getDeviceAlertList({ page: page, did: this.messageInfo.fDid })
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.messageData = list;
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
		// 重置表单样式
		tabRowClassName({ row, rowIndex }) {
			let index = rowIndex + 1;
			if (index % 2 !== 0) {
				return 'yn-row-zebra-bg';
			}
		},
		tableHeaderColor() {
			return 'color: #000000;text-align:center;font-size:14px;';
		},
		tableCellColor({ columnIndex }) {
			if (columnIndex === 1 || columnIndex === 10) {
				return 'color: #666666;text-align: center;cursor: pointer;';
			} else if (
				columnIndex === 11 ||
				columnIndex === 12 ||
				columnIndex === 13
			) {
				return 'color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;';
			} else if (columnIndex === 14) {
				return 'color: #cccccc;text-align: center;cursor: pointer;font-size:24px;';
			}
			return 'color: #60b8f7;text-align: center;cursor: pointer;';
		}
	}
};
</script>

<style scoped></style>
