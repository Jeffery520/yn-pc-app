7<template>
	<div class="alerts-bg">
		<header class="table-header-tools" style="margin-bottom: 15px !important;">
			<div class="d-header-title">
				<span>{{ $t('alerts.tableTitle') }}</span>
				<span>{{ total }}</span>
			</div>
			<span></span>
			<!-- 如果是机构下的alert不可搜索-->
			<div v-if="!$route.params.id" style="width: 620px;">
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
					@keyup.enter.native="searchAlerts"
				>
					<el-button slot="append" @click="searchAlerts">{{
						$t('action.search')
					}}</el-button>
				</el-input>
			</div>
		</header>
		<div class="d-header-filter">
			<span style="font-weight: 600;">{{ $t('action.filter') }}:</span>
			<div class="filter-item" style="margin-left:40px">
				<!--  警告类型， 1-SOS; 2-围栏; 3-心率; 4-血压; 5-血糖; 6-体温; 15-低电-->
				<el-checkbox-group v-model="filterType" @change="filterTypeChange">
					<el-checkbox label="">{{
						$store.getters.language == 'en' ? 'All' : '全部'
					}}</el-checkbox>
					<el-checkbox label="1">{{
						$store.getters.language == 'en' ? '1 days' : '1天'
					}}</el-checkbox>
					<el-checkbox label="3">{{
						$store.getters.language == 'en' ? '3 days' : '3天'
					}}</el-checkbox>
					<el-checkbox label="30">{{
						$store.getters.language == 'en' ? '30 days' : '30天'
					}}</el-checkbox>
					<el-checkbox label="90">{{
						$store.getters.language == 'en' ? '90 days' : '90天'
					}}</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>
		<el-table
			ref="table"
			:show-header="false"
			:cell-style="_tableCellColor"
			:header-cell-style="_tableHeaderColor"
			:row-class-name="_tabRowClassName"
			highlight-current-row
			:data="tableData"
			style="width: 100%;cursor: pointer"
			height="65vh"
			@row-click="showDetailInfo"
		>
			<el-table-column :resizable="false" width="80" align="center">
				<template slot-scope="scope">
					<span>{{
						parseInt(pageSize * (currentPage - 1) + scope.$index + 1)
					}}</span>
				</template>
			</el-table-column>
			<el-table-column :resizable="false" prop="fMsgContent">
				<template slot-scope="scope">
					<!-- 机构和姓名 todo-->
					<span style="margin-right: 5px;font-weight: 600;">
						{{
							`${
								scope.row.fOrgName ? scope.row.fOrgName : $t('user.unknownName')
							}, ${
								scope.row.fFullname
									? scope.row.fFullname
									: $t('user.unknownName')
							}`
						}}
					</span>
					<span style="font-size: 14px;">
						<span
							v-if="scope.row.fAlertType == 30"
							style="margin-right: 5px;font-size: 16px;color: rgb(255,169,172)"
							>{{ scope.row.fMsgContent }}</span
						>
						<span
							v-else-if="scope.row.fAlertType == 3"
							style="margin-right: 5px;font-size: 16px;color: rgb(255,144,0)"
							>{{ scope.row.fMsgContent }}</span
						>
						<span
							v-else-if="scope.row.fAlertType == 1"
							style="margin-right: 5px;font-size: 16px;color: rgb(255,73,33)"
							>{{ scope.row.fMsgContent }}</span
						>
						<span v-else style="margin-right: 5px;font-size: 16px;">{{
							scope.row.fMsgContent
						}}</span>
					</span>

					<!-- 日期-->
					<span style="font-weight: 600;display: inline-block">{{
						scope.row.fAlertTime
					}}</span>
				</template>
			</el-table-column>

			<el-table-column :resizable="false" prop="fAlertStaus" width="180">
				<template slot-scope="scope">
					<span @click.stop="showStatus(scope.row)"
						><span
							style="width:76px;display:inline-block;color: #3aca75;font-weight: 600"
							v-if="scope.row.fAlertStaus == 4"
							>{{ $store.getters.language == 'en' ? 'Served' : '已服务' }}</span
						>
						<span
							style="width:76px;display:inline-block;color: #ff4848;font-weight: 600"
							v-else
							>{{
								$store.getters.language == 'en' ? 'Unserved' : '未服务'
							}}</span
						>
						<i class="el-icon-caret-bottom"></i
					></span>
				</template>
			</el-table-column>
			<el-table-column :resizable="false" width="60" align="left">
				<template>
					<i class="el-icon-arrow-right"></i>
				</template>
			</el-table-column>
		</el-table>
		<!--分页组件-->
		<pagination
			ref="Pagination"
			:currentPage="currentPage"
			@currentChange="pageChange"
		></pagination>
		<!--Detail弹窗-->
		<alert-detail
			ref="alertDetail"
			@change="statusChange"
			:detail="currentDetail"
		></alert-detail>
		<AlertStatus
			ref="AlertStatus"
			@change="statusChange"
			:detail="currentDetail"
		></AlertStatus>
	</div>
</template>

<script>
import Pagination from '@/components/Pagination/index.vue';
const AlertDetail = () => import('@/components/AlertsLy/AlertDetail.vue');
const AlertStatus = () => import('@/components/AlertsLy/status.vue');

import mixin from '@/views/mixin';
import { formatDateToStr, _debounce } from '@/utils/validate';
import { getRickAlertList, getDeviceRickAlertList } from '@/api/alert';

export default {
	name: 'Alerts',
	mixins: [mixin],
	components: { Pagination, AlertDetail, AlertStatus },
	data() {
		return {
			language: this.$store.getters.language,
			filterType: [''],
			search: '',
			total: 0,
			tableData: [],
			pageSize: 10,
			currentPage: 1,
			currentDetail: {}
		};
	},
	mounted() {
		console.dir(Vue);
		if (this.$route.params.search) {
			let search = this.$route.params.search.split('|')[0] || '';
			let filterType = this.$route.params.search.split('|')[1].split(',') || [
				''
			];
			this.search = search;
			this.filterType = filterType;
		}

		this.currentPage = 1;
		// $route.params.id
		if (!this.$route.params.id) {
			this._getRickAlertList(this.currentPage, this.search);
		} else {
			this._getDeviceRickAlertList(this.currentPage, this.search);
		}
	},
	methods: {
		filterTypeChange: _debounce(function(value) {
			this.currentPage = 1;
			// 去掉空项
			if (value[value.length - 1]) {
				if (value.indexOf('') >= 0) {
					value.splice(value.indexOf(''), 1);
				}
				this.filterType = [value[value.length - 1]];
			} else {
				this.filterType = [''];
			}

			if (!this.$route.params.id) {
				this._getRickAlertList(this.currentPage, this.search);
			} else {
				this._getDeviceRickAlertList(this.currentPage, this.search);
			}
		}),
		// 搜索
		searchAlerts: _debounce(function() {
			if (this.$route.params.search) {
				if (!this.$route.params.id) {
					this._getRickAlertList(this.currentPage, this.search);
				} else {
					this._getDeviceRickAlertList(this.currentPage, this.search);
				}
			} else {
				if (!this.$route.params.id) {
					this.$router.push({
						name: 'AlertsSearch',
						params: { search: this.search + '|' + this.filterType.join(',') }
					});
				} else {
					this.$router.push({
						name: 'DeviceAlertsSearch',
						params: {
							search: this.search + '|' + this.filterType.join(','),
							id: this.$route.params.id
						}
					});
				}
				this.search = '';
			}
		}),
		showStatus(row) {
			this.$refs.AlertStatus.AlertstatusFormVisible = true;
			this.currentDetail = row;
		},
		statusChange: _debounce(function() {
			if (!this.$route.params.id) {
				this._getRickAlertList(this.currentPage, this.search);
			} else {
				this._getDeviceRickAlertList(this.currentPage, this.search);
			}
		}),
		// 显示详情弹窗
		showDetailInfo(row) {
			this.$refs.table.setCurrentRow(row);
			this.$refs.alertDetail.detailVisible = true;
			this.currentDetail = row;
		},

		pageChange(page) {
			this.currentPage = page;
			if (!this.$route.params.id) {
				this._getRickAlertList(page, this.search);
			} else {
				this._getDeviceRickAlertList(page, this.search);
			}
		},
		// 请求alerts消息列表
		_getRickAlertList(page, search) {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getRickAlertList({
				page: page,
				search: search,
				types: this.filterType.join(',')
			})
				.then((data) => {
					let { total, pageNum, pageSize, list = [] } = data;
					this.total = total;
					this.tableData = list.map((item) => {
						if (item.fAlertTime) {
							item.fAlertTime = formatDateToStr(
								item.fAlertTime * 1000,
								this.$store.getters.language,
								'YYMMDD'
							);
						}
						if (item.fAlertType == 1) {
							if (
								item.fMsgContent.indexOf('https://www.google.com/maps') ||
								item.fMsgContent.indexOf('http://www.google.com/maps')
							) {
								item.fMsgContent = 'Location: ' + item.fLocationTitle;
								item.sosHttp =
									this.$store.getters.language == 'zh'
										? `./htmlPage/baiduMap.html?query=${item.fLongitude},${
												item.fLatitude
										  }&address=${encodeURI(item.fMsgContent)}`
										: `https://ditu.google.com/maps/search/?api=1&query=${item.fLatitude},${item.fLongitude}`;
							}
						}
						if (item.fAlertType == 2) {
							item.fMsgContent = 'Location: ' + item.fLocationTitle;
							item.sosHttp =
								this.$store.getters.language == 'zh'
									? `./htmlPage/baiduMap.html?query=${item.fLongitude},${item.fLatitude}&address=${item.fMsgContent}`
									: `https://ditu.google.com/maps/search/?api=1&query=${item.fLatitude},${item.fLongitude}`;
						}
						return item;
					});
					if (this.$refs.Pagination) {
						this.$refs.Pagination.currentPage = pageNum;
						this.$refs.Pagination.pageSize = pageSize;
						this.$refs.Pagination.total = total;
					}

					this.pageSize = pageSize;
					this.loading.close();
				})
				.catch((error) => {
					this.loading.close();
					// this.$message({
					// 	showClose: true,
					// 	message:
					// 		error.message || `Request failed with status code${error.status}`,
					// 	type: 'error'
					// });
				});
		},
		// 请求该设备下的所有alerts消息列表
		_getDeviceRickAlertList(page, search) {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getDeviceRickAlertList({
				page: page,
				search: search,
				types: this.filterType.join(','),
				did: this.$route.params.id
			})
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.total = total;

					this.tableData = list.map((item) => {
						if (item.fAlertTime) {
							item.fAlertTime = formatDateToStr(
								item.fAlertTime * 1000,
								this.$store.getters.language
							);
						}
						if (item.fAlertType == 1) {
							if (
								item.fMsgContent.indexOf('https://www.google.com/maps') ||
								item.fMsgContent.indexOf('http://www.google.com/maps')
							) {
								item.fMsgContent = 'Location: ' + item.fLocationTitle;
								item.sosHttp =
									this.$store.getters.language == 'zh'
										? `./htmlPage/baiduMap.html?query=${item.fLongitude},${
												item.fLatitude
										  }&address=${encodeURI(item.fMsgContent)}`
										: `https://ditu.google.com/maps/search/?api=1&query=${item.fLatitude},${item.fLongitude}`;
							}
						}
						if (item.fAlertType == 2) {
							item.fMsgContent = 'Location: ' + item.fLocationTitle;
							item.sosHttp =
								this.$store.getters.language == 'zh'
									? `./htmlPage/baiduMap.html?query=${item.fLongitude},${item.fLatitude}&address=${item.fMsgContent}`
									: `https://ditu.google.com/maps/search/?api=1&query=${item.fLatitude},${item.fLongitude}`;
						}
						return item;
					});
					if (this.$refs.Pagination) {
						this.$refs.Pagination.currentPage = pageNum;
						this.$refs.Pagination.pageSize = pageSize;
						this.$refs.Pagination.total = total;
					}

					this.pageSize = pageSize;
					this.loading.close();
				})
				.catch((error) => {
					this.loading.close();
					// this.$message({
					// 	showClose: true,
					// 	message:
					// 		error.message || `Request failed with status code${error.status}`,
					// 	type: 'error'
					// });
				});
		},
		_tableCellColor({ row, columnIndex }) {
			// if (row.fAlertType == 30) {
			// 	return 'color: #333;font-size:16px;word-wrap: break-word;word-break: break-word;background: rgba(255, 219, 226, 0.78);';
			// }
			// if (row.fAlertType == 3) {
			// 	return 'color: #333;font-size:16px;word-wrap: break-word;word-break: break-word;background: rgba(255, 179, 111, 0.78);';
			// }
			// if (row.fAlertType == 1) {
			// 	return 'color: #333;font-size:16px;word-wrap: break-word;word-break: break-word;background: rgba(255, 101, 93, 0.69);';
			// }
			return 'color: #333;font-size:16px;word-wrap: break-word;word-break: break-word;';
		}
	}
};
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.alerts-bg {
	@include table-bg;
	color: #2a2a2a;
	a:hover {
		color: #075db3;
		text-decoration: underline;
	}

	.el-table {
		border-top: 1px solid $baseBorderColor;
		.el-table--medium td,
		.el-table--medium th {
			padding: 10px 0;
		}
		.el-icon-info {
			width: 40px;
			line-height: 40px;
			text-align: center;
			font-size: 30px;
			color: #aaa;
			cursor: pointer;
		}
		.el-icon-arrow-right {
			width: 40px;
			line-height: 40px;
			font-size: 18px;
			color: #c1c1c1;
			text-align: center;
			cursor: pointer;
		}
		.el-icon-caret-bottom {
			line-height: 40px;
			font-size: 16px;
			color: #c1c1c1;
			text-align: center;
			cursor: pointer;
		}
	}
}
.alert-popover-bg {
	padding: 30px 40px;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
	border-radius: 10px;
}

.bm-view {
	width: 100%;
	height: 300px;
}
</style>
