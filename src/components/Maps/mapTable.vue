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
			<el-table-column label="No." type="index" width="50"> </el-table-column>
			<el-table-column prop="location" label="Address" width="180">
			</el-table-column>
			<el-table-column prop="measuredate" label="Time" width="180">
			</el-table-column>
			<el-table-column prop="loctype" label="Geo-fence"> </el-table-column>
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
import Pagination from '@/components/Pagination/index.vue';
import mixin from '@/views/mixin';
export default {
	name: 'mapTable',
	components: { Pagination },
	mixins: [mixin],
	data() {
		return {
			currentPage: 0,
			tableData: []
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
