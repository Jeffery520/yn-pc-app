<template>
	<div id="message-bg">
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
				:data="tableData"
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
					prop="address"
					:label="$t('tableTitle.origin')"
					width="114"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="date1"
					:label="$t('user.userName')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="name1"
					:label="$t('tableTitle.IMEI')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="address1"
					:label="$t('tableTitle.org')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="address2"
					:label="$t('tableTitle.type')"
				>
					<template slot-scope="scope">
						<a href="tel:13163735200">13163735200</a>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="address2"
					:label="$t('tableTitle.content')"
				>
					<template slot-scope="scope">
						<a href="mailto:505691068@qq.com">505691068@qq.com</a>
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					width="130"
					prop="address2"
					:label="$t('tableTitle.status')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					width="130"
					prop="address2"
					:label="$t('tableTitle.time')"
				></el-table-column>
			</el-table>
			<Pagination
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

export default {
	name: 'Messages',
	mixins: [mixin],
	components: { AddMessage, Pagination },
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
				}
			]
		};
	},
	methods: {
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
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
