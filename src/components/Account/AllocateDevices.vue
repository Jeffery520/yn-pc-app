<template>
	<el-dialog
		top="8vh"
		custom-class="allocate-dev-dialog"
		width="1000px"
		:visible.sync="allocateDevicesVisible"
		destroy-on-close
		@close="dialogClose"
	>
		<header>
			<div class="selected-num">
				<span>{{
					$store.getters.language == 'zh' ? '已选数量' : 'Selected'
				}}</span>
				{{ reqDids.length }}
			</div>
			<div style="width: 580px;">
				<el-input
					:placeholder="
						$t('notice.searchTipsStart') +
							' ' +
							$t('user.userName') +
							' / ' +
							$t('user.phoneNumber') +
							' ' +
							$t('notice.searchTipsEnd')
					"
					v-model="search"
					@keyup.enter.native="searchUser"
				>
					<el-button slot="append" @click="searchUser">
						{{ $t('action.search') }}
					</el-button>
				</el-input>
			</div>
			<i class="el-icon-close" @click="allocateDevicesVisible = false"></i>
		</header>
		<main id="allocate-dev-dialog">
			<el-table
				@selection-change="handleSelectionChange"
				:cell-style="_tableCellColor"
				:header-cell-style="_tableHeaderColor"
				:row-class-name="_tabRowClassName"
				:data="tableData"
				height="500"
				border
			>
				<el-table-column
					:resizable="false"
					type="selection"
					width="60"
				></el-table-column>
				<el-table-column
					:resizable="false"
					width="60"
					:label="$t('tableTitle.no')"
				>
					<template slot-scope="scope">
						<span>
							{{ parseInt(pageSize * (currentPage - 1) + scope.$index + 1) }}
						</span>
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					property="fFullname"
					:label="$t('user.userName')"
				></el-table-column>
				<!--				<el-table-column-->
				<!--					:resizable="false"-->
				<!--					property="fDid"-->
				<!--					:label="$t('user.userId')"-->
				<!--				></el-table-column>-->
				<el-table-column
					:resizable="false"
					property="fOrgName"
					:label="$t('tableTitle.org')"
				></el-table-column>

				<el-table-column
					:resizable="false"
					property="fDeviceType"
					:label="$t('tableTitle.modelNo')"
				>
					<template slot-scope="scope">
						<span>
							{{
								scope.row.fDeviceType == 1
									? 'T9'
									: scope.row.fDeviceType == 4097
									? 'T9S'
									: scope.row.fDeviceType == 4098
									? 'R02'
									: scope.row.fDeviceType == 4099
									? 'R03'
									: scope.row.fDeviceType == 4100
									? 'R02T'
									: ''
							}}
						</span>
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					property="fPhone"
					:label="$t('user.phoneNumber')"
				>
					<template slot-scope="scope">
						<span
							@click="
								$store.getters.userInfo.resource.indexOf(8) > -1
									? callPhone(scope.row.fPhone)
									: ''
							"
							>{{ scope.row.fPhone }}</span
						>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					property="fAddress"
					:label="$t('user.address')"
				></el-table-column>

				<el-table-column
					:resizable="false"
					property="fDeviceImei"
					:label="$t('tableTitle.IMEI')"
				></el-table-column>
				<el-table-column
					:resizable="false"
					property="fDeviceImsi"
					:label="$t('tableTitle.IMSI')"
				></el-table-column>
			</el-table>
			<div class="Pagination-bg">
				<Pagination ref="Pagination" @currentChange="pageChange"></Pagination>
				<div style="margin-top: 30px;">
					<el-button @click="allocateDevicesVisible = false">
						{{ $t('action.cancel') }}
					</el-button>
					<el-button
						type="primary"
						:disabled="reqDids.length <= 0"
						@click.prevent="submitAllocateDevices"
						>{{ $t('action.confirm') }}</el-button
					>
				</div>
			</div>
			<phone-call ref="phoneCall"></phone-call>
		</main>
	</el-dialog>
</template>

<script>
import mixin from '@/views/mixin';
import { getOrgDevList, devAssignOrg } from '@/api/account';
import Pagination from '@/components/Pagination/index.vue';
import { _debounce } from '@/utils/validate';

export default {
	name: 'AllocateDevices',
	mixins: [mixin],
	components: { Pagination },
	data() {
		return {
			search: '',
			orgId: 0,
			reqDids: [], // 已选择设备
			currentPage: 1,
			pageSize: 10,
			allocateDevicesVisible: false,
			tableData: []
		};
	},
	watch: {
		orgId() {
			this.tableData = [];
			setTimeout(() => {
				this._getOrgDevList();
			}, 100);
		}
	},
	methods: {
		dialogClose() {
			if (this.loading) this.loading.close();
		},
		callPhone(phone) {
			if (!this.$refs.phoneCall.isHangUp) {
				this.$alert(
					this.$store.getters.language == 'zh'
						? '还有通话进行中'
						: 'There are calls in progress',
					this.$store.getters.language == 'zh' ? '提示' : 'Prompt',
					{
						type: 'error'
					}
				);
				return;
			}
			if (phone) {
				this.$refs.phoneCall.phone = phone;
				this.$refs.phoneCall.callDisplay = true;
			}
		},
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			this._getOrgDevList();
		},
		handleSelectionChange(val) {
			this.reqDids = val.map((item) => {
				return item.fDid;
			});
		},
		searchUser: _debounce(function() {
			this.currentPage = 1;
			this._getOrgDevList();
		}),
		submitAllocateDevices() {
			if (this.reqDids.length <= 0) {
				this.$error(
					this.$store.getters.language == 'en'
						? `Please select a device`
						: `请选择设备`
				);
				return false;
			}
			this.loading = this.$loading({
				target: document.querySelector('#allocate-dev-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			let params = { orgId: this.orgId, didList: this.reqDids };
			devAssignOrg(params)
				.then(() => {
					this.$message({
						message: 'submit Success',
						type: 'success'
					});
					this.loading.close();
					this.reqDids = [];
					this._getOrgDevList();
					setTimeout(() => {
						this.$emit('change');
					}, 1000);
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_getOrgDevList() {
			this.loading = this.$loading({
				target: document.querySelector('#allocate-dev-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getOrgDevList({
				page: this.currentPage,
				orgId: this.orgId,
				search: this.search
			})
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.tableData = list;
					this.pageSize = pageSize;
					if (this.$refs.Pagination) {
						this.$refs.Pagination.currentPage = pageNum;
						this.$refs.Pagination.pageSize = pageSize;
						this.$refs.Pagination.total = total;
					}
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		_addAccount() {
			this.gridData.push({
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			});
		},
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 5) {
				// 蓝色字体
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			}
			return 'color: #666666;text-align: center;';
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.allocate-dev-dialog {
	header {
		@include flex-b-c;
		.selected-num {
			font-size: 16px;
			font-weight: 600;
			span {
				font-size: 16px;
				font-weight: 600;
				color: #fff;
				padding: 5px 8px;
				background: $greenColor;
				margin-right: 5px;
			}
		}

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
.allocate-dev-dialog {
	.el-dialog__header {
		display: none;
	}
	.el-dialog__body {
		padding: 0 20px 20px !important;
	}
}
</style>
