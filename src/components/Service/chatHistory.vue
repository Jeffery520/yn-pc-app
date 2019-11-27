<template>
	<el-dialog
		top="8vh"
		custom-class="add-account-dialog"
		width="1000px"
		:title="$t('others.chatHistory')"
		:visible.sync="chatHistoryVisible"
	>
		<header>
			<div style="width: 600px;">
				<el-input
					:placeholder="
						$t('notice.searchTipsStart') + '/' + $t('notice.searchTipsEnd')
					"
					v-model="value"
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
				:data="gridData"
				height="500"
				border
			>
				<el-table-column
					:resizable="false"
					type="index"
					:label="$t('tableTitle.no')"
					width="50"
					fixed="left"
				></el-table-column>
				<el-table-column
					:resizable="false"
					property="date"
					:label="$t('tableTitle.devicesID')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					property="address"
					:label="$t('user.userName')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					property="address"
					:label="$t('tableTitle.IMEI')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					property="address"
					:label="$t('tableTitle.staff') + ' ID'"
				></el-table-column>

				<el-table-column
					:resizable="false"
					property="address"
					:label="$t('tableTitle.staff')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					property="address"
					:label="$t('tableTitle.org')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					property="address"
					:label="$t('others.lastChatTime')"
				></el-table-column>
			</el-table>
			<div class="Pagination-bg">
				<Pagination ref="Pagination" @currentChange="pageChange"></Pagination>
			</div>
		</main>
	</el-dialog>
</template>

<script>
import mixin from '@/views/mixin';
const Pagination = () => import('@/components/Pagination/index.vue');
export default {
	name: 'ChatHistory',
	mixins: [mixin],
	components: { Pagination },
	data() {
		return {
			value: '',
			chatHistoryVisible: false,
			gridData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}
			]
		};
	},
	methods: {
		// 切换页码
		pageChange(page) {
			this.$refs.Pagination.currentPage = page;
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
.add-account-dialog {
	header {
		@include flex-c-c;
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
			@include flex-c-c;
		}
	}
}
</style>

<style lang="scss">
.add-account-dialog {
	.el-dialog__body {
		padding: 0 20px 20px !important;
	}
}
</style>
