<template>
	<div id="devices">
		<header>
			<el-button
				@click="$refs.AddAccount.addAccountVisible = true"
				type="primary"
				>+ {{ $t('action.add') }}</el-button
			>
			<div style="width: 500px;">
				<el-input :placeholder="$t('notice.searchTips')" v-model="value">
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
					prop="date"
					:label="$t('tableTitle.orgID')"
				></el-table-column>
				<el-table-column prop="address2" :label="$t('tableTitle.orgName')">
					<template slot-scope="scope">
						<el-dropdown @command="selectUser">
							<span class="el-dropdown-link">
								<span>
									下拉菜单
									<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="1">黄金糕</el-dropdown-item>
								<el-dropdown-item command="2">狮子头</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
				<el-table-column
					prop="address"
					:label="$t('tableTitle.subOrg')"
					width="114"
				></el-table-column>
				<el-table-column
					prop="date1"
					:label="$t('user.address')"
				></el-table-column>
				<el-table-column
					prop="name1"
					:label="$t('tableTitle.noOfDevices')"
				></el-table-column>
				<el-table-column
					prop="address1"
					:label="$t('tableTitle.admin')"
				></el-table-column>
				<el-table-column prop="address2" :label="$t('user.phone')">
					<template slot-scope="scope">
						<a href="tel:13163735200">13163735200</a>
					</template>
				</el-table-column>
				<el-table-column prop="address2" :label="$t('user.email')">
					<template slot-scope="scope">
						<a href="mailto:505691068@qq.com">505691068@qq.com</a>
					</template>
				</el-table-column>

				<el-table-column
					width="130"
					prop="address2"
					:label="$t('tableTitle.accountID')"
				></el-table-column>

				<el-table-column
					prop="address2"
					:label="$t('action.settings')"
					width="80"
				>
					<template slot-scope="scope">
						<i
							@click.stop="openSettings(scope)"
							style="padding:10px;"
							class="el-icon-setting"
						></i>
					</template>
				</el-table-column>
			</el-table>
			<Pagination
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</main>
		<!-- 新增用户-->
		<AddAccount ref="AddAccount"></AddAccount>
		<!--message 弹窗-->
		<Message ref="Message"></Message>
		<!--settings 弹窗-->
		<Settings ref="Settings"></Settings>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import AddAccount from '@/components/Account/AddAccount.vue';
import Message from '@/components/Devices/Message.vue';
import Settings from '@/components/Account/Settings.vue';
import Pagination from '@/components/Pagination/index.vue';
export default {
	name: 'Devices',
	mixins: [mixin],
	components: { AddAccount, Message, Pagination, Settings },
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
		// 选择用户
		selectUser(command) {
			console.log('select a User');
		},
		// // 新增用户
		// saveNewUser() {
		//   this.$refs.AddUser.addUserVisible = true;
		// },
		// // 打开新增用户弹窗
		// addNewUser() {
		//   this.$refs.AddUser.addUserVisible = true;
		// },
		openSettings({ row }) {
			this.$refs.Settings.settingsData = row;
			this.$refs.Settings.settingsVisible = true;
		},

		_tableCellColor({ columnIndex }) {
			if (columnIndex === 4 || columnIndex === 6 || columnIndex === 7) {
				// 蓝色字体
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			} else if (columnIndex === 9) {
				// 图标
				return 'color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;';
			}
			return 'color: #666666;text-align: center;cursor: pointer;';
		}
	}
};
</script>
<style scoped lang="scss">
@import '@/style/mixin.scss';
#devices {
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
<style lang="scss"></style>
