<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="add-account-dialog"
			width="1500px"
			:visible.sync="addAccountVisible"
		>
			<header>
				<el-button type="primary" @click="_addAccount"
					>+ {{ $t('action.add') }}</el-button
				>
				<i class="el-icon-close" @click="addAccountVisible = false"></i>
			</header>
			<main>
				<el-table
					:cell-style="_tableCellColor"
					:header-cell-style="_tableHeaderColor"
					:row-class-name="_tabRowClassName"
					:data="gridData"
					height="600"
					border
				>
					<el-table-column
						property="date"
						:label="$t('tableTitle.orgID')"
					></el-table-column>
					<el-table-column
						property="address"
						:label="$t('tableTitle.orgName')"
						width="120"
					>
						<template slot-scope="scope">
							<el-input
								v-if="currentEditIndex == scope.$index"
								type="textarea"
								v-model="scope.row.name"
							></el-input>
							<span v-else>{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
						property="address"
						:label="$t('tableTitle.subOrg')"
					></el-table-column>
					<el-table-column
						property="address"
						:label="$t('user.address')"
						width="250"
					>
						<template slot-scope="scope">
							<el-input
								v-if="currentEditIndex == scope.$index"
								type="textarea"
								v-model="scope.row.name"
							></el-input>
							<span v-else>{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
						property="address"
						:label="$t('tableTitle.noOfDevices')"
					></el-table-column>
					<el-table-column
						property="address"
						:label="$t('tableTitle.admin')"
						width="120"
					>
						<template slot-scope="scope">
							<el-input
								v-if="currentEditIndex == scope.$index"
								type="textarea"
								v-model="scope.row.name"
							></el-input>
							<span v-else>{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
						property="address"
						:label="$t('user.phone')"
						width="150"
					>
						<template slot-scope="scope">
							<el-input
								v-if="currentEditIndex == scope.$index"
								type="textarea"
								v-model="scope.row.name"
							></el-input>
							<span v-else>{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
						property="address"
						:label="$t('user.email')"
						width="150"
					>
						<template slot-scope="scope">
							<el-input
								v-if="currentEditIndex == scope.$index"
								type="textarea"
								v-model="scope.row.name"
							></el-input>
							<span v-else>{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
						property="address"
						:label="$t('tableTitle.accountID')"
						width="120"
					>
						<template slot-scope="scope">
							<el-input
								v-if="currentEditIndex == scope.$index"
								type="textarea"
								v-model="scope.row.name"
							></el-input>
							<span v-else>{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
						property="address"
						:label="$t('tableTitle.password')"
						width="150"
					>
						<template slot-scope="scope">
							<el-input
								v-if="currentEditIndex == scope.$index"
								type="textarea"
								v-model="scope.row.name"
							></el-input>
							<span v-else>{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
						property="address"
						:label="$t('tableTitle.allocateDevices')"
						width="110"
					>
						<template slot-scope="scope">
							<el-button
								type="info"
								size="small"
								@click="$refs.AllocateDevices.allocateDevicesVisible = true"
								>+ {{ $t('tableTitle.allocate') }}</el-button
							>
						</template>
					</el-table-column>
				</el-table>
				<div class="Pagination-bg">
					<Pagination ref="Pagination" @currentChange="pageChange"></Pagination>
					<div style="margin-top: 30px;">
						<el-button @click="addAccountVisible = false">
							{{ $t('action.cancel') }}
						</el-button>
						<el-button type="primary" @click="addAccountVisible = false">
							{{ $t('action.confirm') }}
						</el-button>
					</div>
				</div>
			</main>
		</el-dialog>
		<AllocateDevices ref="AllocateDevices"></AllocateDevices>
	</div>
</template>

<script>
import mixin from '@/views/mixin';
import AllocateDevices from '@/components/Account/AllocateDevices';
import Pagination from '@/components/Pagination/index.vue';
export default {
	name: 'AddAccount',
	mixins: [mixin],
	components: { AllocateDevices, Pagination },
	data() {
		return {
			addAccountVisible: false,
			currentEditIndex: -1,
			gridData: [
				{
					date: '王小虎',
					name: '王小虎',
					address: '王小虎'
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
				date: '王小虎',
				name: '王小虎',
				address: '王小虎'
			});
			this.currentEditIndex = this.gridData.length - 1;
		},
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 4 || columnIndex === 6 || columnIndex === 7) {
				// 蓝色字体
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			}
			return 'color: #666666;text-align: center;cursor: pointer;';
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.add-account-dialog {
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
.add-account-dialog {
	.el-dialog__header {
		display: none;
	}
	.el-dialog__body {
		padding: 0 20px 20px !important;
	}
	.el-checkbox__label {
		display: none;
	}
	.el-checkbox__inner,
	.el-checkbox__input {
		transform: scale(1.1);
		line-height: 18px;
	}
}
</style>
