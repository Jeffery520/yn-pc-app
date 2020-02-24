7<template>
	<div class="alerts-bg">
		<header class="table-header-tools" style="margin-bottom: 15px !important;">
			<div class="d-header-title">
				<span>{{ $t('alerts.tableTitle') }}</span>
				<span>{{ total }}</span>
			</div>
			<span></span>
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
					<el-checkbox label="">{{ $t('action.all') }}</el-checkbox>
					<el-checkbox label="4">{{ $t('others.bloodPressure') }}</el-checkbox>
					<el-checkbox label="5">{{ $t('others.bloodGlucose') }}</el-checkbox>
					<el-checkbox label="1">SOS</el-checkbox>
					<el-checkbox label="3">{{ $t('others.heartRate') }}</el-checkbox>
					<el-checkbox label="2">{{ $t('others.geoFence') }}</el-checkbox>
					<el-checkbox label="6">{{ $t('others.temper') }}</el-checkbox>
					<el-checkbox label="15">{{ $t('others.lowPower') }}</el-checkbox>
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
					<!-- 1-SOS -->
					<span v-if="scope.row.fAlertType == 1">
						<span
							style="font-size: 16px;color:#FF4848;margin-right:5px;font-weight: 600;"
							>SOS</span
						>
						<a
							@click.stop="$refs.table.setCurrentRow(scope.row)"
							target="_blank"
							:href="scope.row.sosHttp"
							style="margin-right: 5px;cursor: help"
							>{{ scope.row.fMsgContent }}
						</a>
					</span>
					<!-- 2-围栏 -->
					<span v-if="scope.row.fAlertType == 2">
						<span
							style="font-size: 16px;color:#FF4848;margin-right: 5px;font-weight: 600;"
							>{{
								$store.getters.language == 'zh'
									? '走出地理围栏'
									: 'Out of Geo-fence'
							}}</span
						>
						<a
							@click.stop="$refs.table.setCurrentRow(scope.row)"
							target="_blank"
							:href="scope.row.sosHttp"
							style="margin-right: 5px;cursor: help"
							>{{ scope.row.fMsgContent }}
						</a>
					</span>

					<!-- 3-心率 -->
					<span
						v-if="scope.row.fAlertType == 3"
						style="font-size: 16px;color:#FF4848;margin-right: 5px;font-weight: 600;"
					>
						<span>{{
							$store.getters.language == 'zh' ? '心率' : 'Heart Rate Alert'
						}}</span>
						<span>{{ scope.row.fHrstatus }} BPM</span>
					</span>
					<!-- 4-血压 -->
					<span
						v-if="scope.row.fAlertType == 4"
						style="font-size: 16px;color:#FF4848;margin-right: 5px;font-weight: 600;"
					>
						<span>{{
							$store.getters.language == 'zh' ? '血压' : 'Blood Pressure Alert'
						}}</span>
						<span
							>{{ $store.getters.language == 'zh' ? '舒张压' : 'Diastolic' }}
							{{ scope.row.fDiastolic }} mmHg</span
						>,
						<span
							>{{ $store.getters.language == 'zh' ? '收缩压' : 'Systolic' }}
							{{ scope.row.fSystolic }} mmHg</span
						>
						<span
							>,{{ $store.getters.language == 'zh' ? '心率' : 'Heart Rate' }}
							{{ scope.row.fHrstatus }} BPM</span
						>
					</span>
					<!-- 4-血糖 -->
					<span
						v-if="scope.row.fAlertType == 5"
						style="font-size: 16px;color:#FF4848;margin-right: 5px;font-weight: 600;"
					>
						<span>{{
							$store.getters.language == 'zh' ? '血糖' : 'Blood Glucose Alert'
						}}</span>
						<span>{{ scope.row.fBloodsugar }} mmol/L</span>
					</span>

					<!-- 6-体温 -->
					<span
						v-if="scope.row.fAlertType == 6"
						style="font-size: 16px;color:#FF4848;margin-right: 5px;font-weight: 600;"
					>
						<span>{{
							$store.getters.language == 'zh' ? '体温' : 'Temperature Alert'
						}}</span>
						<span>{{ scope.row.fTemper }} ℃</span>
					</span>

					<!-- 15-低电量 -->
					<span v-if="scope.row.fAlertType == 15">
						<span
							style="font-size: 16px;color:#FF4848;margin-right: 5px;font-weight: 600;"
							>{{
								$store.getters.language == 'zh' ? '电量过低' : 'Low Battery'
							}}</span
						>
						<span style="margin-right: 5px;">{{ scope.row.fMsgContent }}</span>
					</span>

					<!-- 日期-->
					<span style="font-weight: 600;display: inline-block">{{
						scope.row.fAlertTime
					}}</span>
				</template>
			</el-table-column>

			<el-table-column :resizable="false" prop="fAlertStaus" width="140">
				<template slot-scope="scope">
					<span
						v-if="scope.row.fAlertStaus == 1"
						style="font-size: 18px;color:#FF4848;"
						>{{ language == 'zh' ? '开启' : 'Open' }}</span
					>
					<span
						v-if="scope.row.fAlertStaus == 2"
						style="font-size: 18px;color:#666666;"
						>{{ language == 'zh' ? '跳过' : 'Skip' }}</span
					>
					<span
						v-if="scope.row.fAlertStaus == 3"
						style="font-size: 18px;color:#39c973;"
						>{{ language == 'zh' ? '跟进' : 'Follow up' }}</span
					>
					<span
						v-if="scope.row.fAlertStaus == 4"
						style="font-size: 18px;color:#629EE7;"
						>{{ language == 'zh' ? '完成' : 'Completed' }}</span
					>
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
	</div>
</template>

<script>
import Pagination from '@/components/Pagination/index.vue';
const AlertDetail = () => import('@/components/Alerts/AlertDetail.vue');
import mixin from '@/views/mixin';
import { formatDateToStr, _debounce } from '@/utils/validate';
import { getAlertList, getDeviceAlertList } from '@/api/alert';

export default {
	name: 'Alerts',
	mixins: [mixin],
	components: { Pagination, AlertDetail },
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
		// $route.params.id
		if (!this.$route.params.id) {
			this._getAlertList(this.currentPage, this.search);
		} else {
			this._getDeviceAlertList(this.currentPage, this.search);
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
				this.filterType = value;
			} else {
				this.filterType = [''];
			}

			if (!this.$route.params.id) {
				this._getAlertList(this.currentPage, this.search);
			} else {
				this._getDeviceAlertList(this.currentPage, this.search);
			}
		}),
		// 搜索
		searchAlerts: _debounce(function() {
			this.currentPage = 1;
			if (!this.$route.params.id) {
				this._getAlertList(this.currentPage, this.search);
			} else {
				this._getDeviceAlertList(this.currentPage, this.search);
			}
		}),

		statusChange: _debounce(function() {
			if (!this.$route.params.id) {
				this._getAlertList(this.currentPage, this.search);
			} else {
				this._getDeviceAlertList(this.currentPage, this.search);
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
				this._getAlertList(page, this.search);
			} else {
				this._getDeviceAlertList(page, this.search);
			}
		},
		// 请求alerts消息列表
		_getAlertList(page, search) {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getAlertList({
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
					this.$message({
						showClose: true,
						message:
							error.message || `Request failed with status code${error.status}`,
						type: 'error'
					});
				});
		},
		// 请求该设备下的所有alerts消息列表
		_getDeviceAlertList(page, search) {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});
			getDeviceAlertList({
				page: page,
				search: search,
				types: this.filterType.join(','),
				did: this.$route.params.id
			})
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
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
					this.$message({
						showClose: true,
						message:
							error.message || `Request failed with status code${error.status}`,
						type: 'error'
					});
				});
		},
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 2) {
				return 'color: #333;font-size:16px;text-align: center;';
			}
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
			font-size: 20px;
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
