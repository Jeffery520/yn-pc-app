<template>
	<div id="devices">
		<header class="table-header-tools">
			<el-button
				v-if="$store.getters.userInfo.resource.indexOf(23) > -1"
				@click="$refs.RescueDetails.rescueDetailsVisible = true"
				type="primary"
				>+ {{ $t('action.add') }}</el-button
			>
			<span></span>
			<div style="width: 620px;">
				<el-input
					:placeholder="
						$t('notice.searchTipsStart') +
							' ' +
							$t('user.userName') +
							' / ' +
							$t('user.phoneNumber') +
							' / ' +
							$t('tableTitle.IMEI') +
							' ' +
							$t('notice.searchTipsEnd')
					"
					v-model="search"
					@keyup.enter.native="searchDevices"
				>
					<el-button slot="append" @click="searchDevices">{{
						$t('action.search')
					}}</el-button>
				</el-input>
			</div>
		</header>
		<div class="d-header-filter">
			<span style="font-weight: 600;flex-shrink: 0;"
				>{{ language == 'en' ? 'Order Status' : '订单状态' }}:</span
			>
			<div class="filter-item" style="margin-left:40px;">
				<!--  用户类型 0-系统，1-app, 4-web管理用户-->
				<el-checkbox-group v-model="filterType" @change="filterTypeChange">
					<el-checkbox :label="''">{{ $t('action.all') }}</el-checkbox>
					<el-checkbox v-for="item in filterList" :label="item.value">{{
						item.lable
					}}</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>

		<main>
			<el-table
				ref="table"
				highlight-current-row
				:header-cell-style="_tableHeaderColor"
				:cell-style="_tableCellColor"
				:row-class-name="_tabRowClassName"
				:data="tableData"
				height="65vh"
				border
				style="width: 100%;"
			>
				<el-table-column
					:resizable="false"
					:label="$t('tableTitle.no')"
					width="80"
				>
					<template slot-scope="scope">
						<span>{{
							parseInt(pageSize * (currentPage - 1) + scope.$index + 1)
						}}</span>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="subject"
					width="170"
					:label="language == 'en' ? 'Service Name' : '服务名称'"
				></el-table-column>
				<el-table-column
					:resizable="false"
					prop="fFullname"
					:label="$t('user.userName')"
					width="120"
				>
					<template slot-scope="scope">
						<el-popover
							placement="right"
							trigger="hover"
							popper-class="user-photo-popover"
						>
							<div slot="reference">
								<span v-if="scope.row.fFullname">{{
									scope.row.fFullname
								}}</span>
								<span v-else style="color: #aaa;">—</span>
							</div>
							<el-avatar
								class="user-photo"
								:size="100"
								:src="scope.row.fHead"
							></el-avatar>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="idnumber"
					width="170"
					:label="language == 'en' ? 'Identity Number' : '身份证号'"
				></el-table-column>

				<!--				<el-table-column-->
				<!--					:resizable="false"-->
				<!--					prop="fAddress"-->
				<!--					:label="$t('user.address')"-->
				<!--				></el-table-column>-->
				<el-table-column
					:resizable="false"
					prop="fPhone"
					:label="$t('user.phoneNumber')"
					width="120"
				>
					<template slot-scope="scope">
						<span
							@click="
								$store.getters.userInfo.resource.indexOf(8) > -1
									? callPhone(_formatPhone(scope.row.phone))
									: ''
							"
							>{{ _formatPhone(scope.row.phone) }}</span
						>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="email"
					:label="language == 'en' ? 'Email' : '邮箱'"
				></el-table-column>

				<el-table-column
					:resizable="false"
					prop="startDate"
					:label="language == 'en' ? 'Opening date' : '开通日期'"
					width="100"
				>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="endDate"
					:label="language == 'en' ? 'End date' : '结束日期'"
					width="100"
				></el-table-column>

				<el-table-column
					:resizable="false"
					prop="orderId"
					:label="language == 'en' ? 'Order Number' : '订单号'"
					width="160 "
				></el-table-column>

				<el-table-column
					:resizable="false"
					prop="status"
					:label="language == 'en' ? 'Service Status' : '服务状态'"
					width="160 "
				>
					<template slot-scope="scope">
						<span>{{ status[scope.row.status] }}</span>
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					label="处理"
					width="80"
					fixed="right"
				>
					<template slot-scope="scope">
						<i
							@click.stop="showDetailEdit(scope)"
							style="padding:10px;"
							class="el-icon-edit-outline"
						></i>
					</template>
				</el-table-column>
			</el-table>
			<Pagination
				ref="Pagination"
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</main>
		<rescue-details ref="RescueDetails"></rescue-details>
		<phone-call ref="phoneCall"></phone-call>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import Pagination from '@/components/Pagination/index.vue';
import RescueDetails from '@/components/Service/rescueDetails.vue';

import { getMallList } from '@/api/mall';
import { _debounce, formatDateToStr, formatPhone } from '@/utils/validate';
export default {
	name: 'EmergencyRescue',
	mixins: [mixin],
	components: {
		Pagination,
		RescueDetails
	},
	data() {
		return {
			filterType: [''],
			search: '',
			pageSize: 10,
			currentPage: 1,
			total: 0,
			language: this.$store.getters.language,
			tableData: [],
			filterList: [
				{
					lable:
						this.$store.getters.language == 'en' ? 'Pending review' : '待审核',
					value: '0'
				},
				{
					lable:
						this.$store.getters.language == 'en'
							? 'Service started'
							: '已开始服务',
					value: '1'
				},
				{
					lable:
						this.$store.getters.language == 'en' ? 'Review failed' : '审核失败',
					value: '2'
				},
				{
					lable:
						this.$store.getters.language == 'en'
							? 'Service has ended'
							: '服务结束',
					value: '3'
				},
				{
					lable:
						this.$store.getters.language == 'en'
							? 'Order cancelled'
							: '订单取消',
					value: '4'
				},
				{
					lable:
						this.$store.getters.language == 'en'
							? 'Received forward service'
							: '已接收远期服务',
					value: '5'
				},
				{
					lable:
						this.$store.getters.language == 'en'
							? 'The order has been terminated'
							: '订单终止',
					value: '6'
				},
				{
					lable: this.$store.getters.language == 'en' ? 'Unpaid' : '未支付',
					value: '7'
				},
				{
					lable: this.$store.getters.language == 'en' ? 'Over' : '已结束',
					value: '8'
				}
			],
			status: {
				'0': this.$store.getters.language == 'en' ? 'Pending review' : '待审核',
				'1':
					this.$store.getters.language == 'en'
						? 'Service started'
						: '已开始服务',
				'2':
					this.$store.getters.language == 'en' ? 'Review failed' : '审核失败',
				'3':
					this.$store.getters.language == 'en'
						? 'Service has ended'
						: '服务结束',
				'4':
					this.$store.getters.language == 'en' ? 'Order cancelled' : '订单取消',
				'5':
					this.$store.getters.language == 'en'
						? 'Received forward service'
						: '已接收远期服务',
				'6':
					this.$store.getters.language == 'en'
						? 'The order has been terminated'
						: '订单终止',
				'7': this.$store.getters.language == 'en' ? 'Unpaid' : '未支付',
				'8': this.$store.getters.language == 'en' ? 'Over' : '已结束'
			}
		};
	},
	mounted() {
		this._getRescueList(1, '');
	},
	methods: {
		filterTypeChange: _debounce(function(value) {
			this.currentPage = 1;
			// 去掉空项
			if (value[value.length - 1]) {
				if (value.indexOf('') >= 0) {
					value.splice(value.indexOf(''), 1);
				}
				this.filterType = value;
			} else {
				this.filterType = [''];
			}

			this._getRescueList(this.currentPage, this.search);
		}),
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
		showDetailEdit({ row }) {
			this.$refs.RescueDetails.rescueDetailsVisible = true;
			this.$refs.RescueDetails.form = row;
		},
		searchDevices: _debounce(function() {
			this.currentPage = 1;
			this._getRescueList(this.currentPage, this.search);
		}),
		// 显示alerts信息弹窗
		showAlertInfo: _debounce(function({ row }) {
			this.$refs.table.setCurrentRow(row);
			this.$router.push({
				name: 'DeviceDataAlerts',
				params: { id: row.fDid }
			});
		}),
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			this._getRescueList(page, this.search);
		},

		_getRescueList(page, search) {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getMallList({
				page: page,
				search: search,
				status: this.filterType.join(',')
			})
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.pageSize = pageSize;
					this.total = total;
					this.tableData = list.map((item) => {
						let date = '';
						if (item.startDate) {
							if (!isNaN(item.startDate)) {
								date = formatDateToStr(
									item.startDate * 1000,
									this.$store.getters.language
								);
							} else {
								date = formatDateToStr(
									item.startDate,
									this.$store.getters.language
								);
							}
							item.startDate = date;
						} else {
							item.startDate = '';
						}

						if (item.endDate) {
							if (!isNaN(item.endDate)) {
								date = formatDateToStr(
									item.endDate * 1000,
									this.$store.getters.language
								);
							} else {
								date = formatDateToStr(
									item.endDate,
									this.$store.getters.language
								);
							}
							item.endDate = date;
						} else {
							item.endDate = '';
						}

						return item;
					});
					if (this.$refs.Pagination) {
						this.$refs.Pagination.currentPage = pageNum;
						this.$refs.Pagination.pageSize = pageSize;
						this.$refs.Pagination.total = total;
					}

					this.loading.close();
				})
				.catch((error) => {
					this.loading.close();
					this.$message({
						showClose: true,
						message:
							error.message || `Request failed with status code${error.status}`,
						type: 'error'
					});
				});
		},
		_formatPhone(phone) {
			return formatPhone(phone);
		},
		// 重置表单样式
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 2 || columnIndex === 3) {
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			} else if (columnIndex === 10) {
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
#devices {
	@include table-bg;

	main {
		.el-dropdown-link {
			width: 70px;
			& > span {
				flex-grow: 1;
			}
			@include flex-c-c;
		}
	}
}
</style>
<style lang="scss"></style>
