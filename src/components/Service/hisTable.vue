<template>
	<div class="add-message-table">
		<el-table
			:header-cell-style="_tableHeaderColor"
			:cell-style="_tableCellColor"
			:row-class-name="_tabRowClassName"
			:data="tableData"
			border
			:height="540"
			style="width: 100%;"
		>
			<el-table-column
				type="selection"
				width="50"
				fixed="left"
			></el-table-column>
			<el-table-column
				type="index"
				:label="$t('tableTitle.no')"
				width="50"
				fixed="left"
			></el-table-column>
			<el-table-column
				prop="date"
				:label="$t('tableTitle.devicesID')"
			></el-table-column>
			<el-table-column
				prop="name"
				:label="$t('user.userName')"
			></el-table-column>
			<el-table-column
				prop="name1"
				:label="$t('tableTitle.IMEI')"
			></el-table-column>
			<el-table-column
				prop="address1"
				:label="$t('tableTitle.event')"
			></el-table-column>
			<el-table-column
				prop="address2"
				:label="$t('tableTitle.eventTime')"
			></el-table-column>
			<el-table-column
				width="80"
				prop="address2"
				:label="$t('tableTitle.staff') + ' ID'"
			></el-table-column>
			<el-table-column
				prop="address2"
				:label="$t('tableTitle.staff')"
			></el-table-column>
			<el-table-column
				width="130"
				prop="address2"
				:label="$t('tableTitle.org')"
			></el-table-column>
			<el-table-column
				width="130"
				prop="address2"
				:label="$t('tableTitle.recordsOfActions')"
			></el-table-column>
			<el-table-column
				width="130"
				prop="address2"
				:label="$t('tableTitle.status')"
			></el-table-column>
			<el-table-column
				width="130"
				prop="address2"
				:label="$t('tableTitle.time')"
			></el-table-column>
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
	name: 'HisTable',
	mixins: [mixin],
	components: { Pagination },
	data() {
		return {
			value: '',
			currentPage: 0,
			tableData: [
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					date1: '2016-05-03',
					name1: '王小虎',
					address1: '上海市普陀区金沙江路 1518 弄',
					address2: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					date1: '2016-05-03',
					name1: '王小虎',
					address1: '上海市普陀区金沙江路 1518 弄',
					address2: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					date1: '2016-05-03',
					name1: '王小虎',
					address1: '上海市普陀区金沙江路 1518 弄',
					address2: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					date1: '2016-05-03',
					name1: '王小虎',
					address1: '上海市普陀区金沙江路 1518 弄',
					address2: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					date1: '2016-05-03',
					name1: '王小虎',
					address1: '上海市普陀区金沙江路 1518 弄',
					address2: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					date1: '2016-05-03',
					name1: '王小虎',
					address1: '上海市普陀区金沙江路 1518 弄',
					address2: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					date1: '2016-05-03',
					name1: '王小虎',
					address1: '上海市普陀区金沙江路 1518 弄',
					address2: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					date1: '2016-05-03',
					name1: '王小虎',
					address1: '上海市普陀区金沙江路 1518 弄',
					address2: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					date1: '2016-05-03',
					name1: '王小虎',
					address1: '上海市普陀区金沙江路 1518 弄',
					address2: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					date1: '2016-05-03',
					name1: '王小虎',
					address1: '上海市普陀区金沙江路 1518 弄',
					address2: '上海市普陀区金沙江路 1518 弄'
				}
			]
		};
	},
	methods: {
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
		},
		// 选择用户
		selectUser(command) {
			console.log(command);
			if (typeof command === 'object') {
				this.addNewUser();
			} else {
				console.log('select a User');
			}
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
<style scoped lang="scss">
@import '@/style/mixin.scss';

.add-message-table {
	.el-dropdown-link {
		@include flex-c-c;
	}
}
</style>
<style lang="scss"></style>
