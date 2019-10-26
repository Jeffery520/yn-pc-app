<template>
	<el-dialog
		top="14vh"
		custom-class="message-dialog"
		width="1300px"
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
	</el-dialog>
</template>

<script>
export default {
	name: 'Message',
	data() {
		return {
			messageVisible: false,
			messageData: []
		};
	},
	methods: {
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
