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
				label="No."
				width="50"
				fixed="left"
			></el-table-column>
			<el-table-column prop="date" :label="$t('user.userId')"></el-table-column>
			<el-table-column prop="name" :label="$t('user.userName')">
				<template slot-scope="scope">
					<el-popover
						placement="right"
						trigger="hover"
						popper-class="user-photo-popover"
					>
						<div slot="reference">{{ scope.row.name }}</div>
						<el-avatar
							class="user-photo"
							:size="100"
							src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
						></el-avatar>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column
				prop="address"
				:label="$t('user.phoneNumber')"
				width="114"
			></el-table-column>
			<el-table-column
				prop="date1"
				:label="$t('user.address')"
			></el-table-column>
			<el-table-column prop="name1" label="Model No."></el-table-column>
			<el-table-column prop="address1" label="Org."></el-table-column>
			<el-table-column prop="address2" label="IMEI"></el-table-column>
			<el-table-column prop="address2" label="IMSI"></el-table-column>
			<el-table-column
				width="80"
				prop="address2"
				label="SIM Status"
			></el-table-column>
			<el-table-column
				width="130"
				prop="address2"
				label="Subscription of Services"
			></el-table-column>
			<el-table-column
				width="100"
				prop="address2"
				label="Authorised Personnels"
			>
				<template slot-scope="scope">
					<el-dropdown @command="selectUser">
						<span class="el-dropdown-link">
							<span>
								<span>下拉菜单</span>
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="1">黄金糕</el-dropdown-item>
							<el-dropdown-item command="2">狮子头</el-dropdown-item>
							<el-dropdown-item :command="scope.row"
								>Add a new one</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
			<el-table-column label="Message" width="85">
				<template slot-scope="scope">
					<i
						@click.stop="openMseeages(scope)"
						style="padding:10px; "
						class="el-icon-message"
					></i>
				</template>
			</el-table-column>
			<el-table-column label="Alerts" width="80">
				<template slot-scope="scope">
					<i
						@click.stop="openMseeages(scope)"
						style="padding:10px;"
						class="el-icon-bell"
					></i>
				</template>
			</el-table-column>
			<el-table-column prop="address2" label="Settings" width="80">
				<template slot-scope="scope">
					<i
						@click.stop="openSettings(scope)"
						style="padding:10px;"
						class="el-icon-setting"
					></i>
				</template>
			</el-table-column>
		</el-table>
		<div style="display: flex;justify-content: flex-end;">
			<Pagination
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</div>
		<!-- 新增用户-->
		<AddUser ref="AddUser" @saveNewUser="saveNewUser"></AddUser>
		<!--message 弹窗-->
		<Message ref="Message"></Message>
		<!--settings 弹窗-->
		<Settings ref="Settings"></Settings>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import AddUser from '@/components/Devices/AddUser.vue';
import Message from '@/components/Devices/Message.vue';
import Settings from '@/components/Devices/Settings.vue';
import Pagination from '@/components/Pagination/index.vue';

export default {
	name: 'Devices',
	mixins: [mixin],
	components: { AddUser, Message, Pagination, Settings },
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
		// 新增用户
		saveNewUser() {
			this.$refs.AddUser.addUserVisible = true;
		},
		// 打开新增用户弹窗
		addNewUser() {
			this.$refs.AddUser.addUserVisible = true;
		},
		openMseeages({ row }) {
			console.log(this.$refs.Message);
			this.$refs.Message.messageVisible = true;
			this.$refs.Message.messageData = [row];
		},
		openSettings({ row }) {
			this.$refs.Settings.settingsData = row;
			this.$refs.Settings.settingsVisible = true;
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
