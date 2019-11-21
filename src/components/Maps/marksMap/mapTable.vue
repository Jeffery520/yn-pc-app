<template>
	<div>
		<el-table
			:header-cell-style="_tableHeaderColor"
			:cell-style="_tableCellColor"
			:row-class-name="_tabRowClassName"
			:data="tableData"
			border
			style="width: 100%;"
		>
			<el-table-column prop="date" label="State Name"> </el-table-column>
			<el-table-column prop="date" label="Quantity"></el-table-column>
			<el-table-column prop="date" label="State Name"> </el-table-column>
			<el-table-column prop="date" label="Quantity"></el-table-column>
			<el-table-column prop="date" label="State Name"> </el-table-column>
			<el-table-column prop="date" label="Quantity"></el-table-column>
			<el-table-column prop="date" label="State Name"> </el-table-column>
			<el-table-column prop="date" label="Quantity"></el-table-column>
		</el-table>
		<div style="display: flex;justify-content: flex-end;">
			<Pagination
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</div>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
const Pagination = () => import('@/components/Pagination/index.vue');
export default {
	name: 'mapTable',
	components: { Pagination },
	mixins: [mixin],
	data() {
		return {
			currentPage: 0,
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			]
		};
	},
	methods: {
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
		},
		// 重置表单样式
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 13 || columnIndex === 14 || columnIndex === 15) {
				// 图标
				return 'color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;';
			}
			return 'color: #666666;text-align: center;cursor: pointer;position: relative;';
		}
	}
};
</script>

<style scoped></style>
