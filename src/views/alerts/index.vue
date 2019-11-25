<template>
	<div class="alerts-bg">
		<header>
			<div style="width: 600px;">
				<el-input
					:placeholder="$t('notice.searchTips')"
					v-model="search"
					@keyup.enter.native="searchAlerts"
					@blur="searchAlerts"
				>
					<el-button slot="append" @click="searchAlerts">{{
						$t('action.search')
					}}</el-button>
				</el-input>
			</div>
		</header>
		<el-table
			:cell-style="_tableCellColor"
			:header-cell-style="_tableHeaderColor"
			:row-class-name="_tabRowClassName"
			:show-header="false"
			:data="tableData"
			style="width: 100%"
			@row-click="showDetailInfo"
		>
			<el-table-column type="index" width="80" align="center"></el-table-column>
			<el-table-column prop="fMsgContent">
				<template slot-scope="scope">
					<!-- 1-SOS -->
					<span v-if="scope.row.fAlertType == 1">
						<span
							style="font-size: 18px;color:#E65945;margin-right:10px;font-weight: 600;"
							>SOS</span
						>
						<a
							@click.stop=""
							target="_blank"
							:href="scope.row.sosHttp"
							style="margin-right: 5px;"
							>{{ scope.row.fMsgContent }}
						</a>
					</span>
					<!-- 2-围栏 -->
					<span v-if="scope.row.fAlertType == 2">
						<span
							style="font-size: 18px;color:#E65945;margin-right: 5px;font-weight: 600;"
							>{{
								$store.getters.language == 'zh'
									? '走出地理围栏'
									: 'Out of Geo-fence'
							}}</span
						>
						<a
							@click.stop=""
							target="_blank"
							:href="scope.row.sosHttp"
							style="margin-right: 5px;"
							>{{ scope.row.fMsgContent }}
						</a>
					</span>

					<!-- 3-心率 -->
					<span v-if="scope.row.fAlertType == 3">
						<span style="font-size: 18px;margin-right: 5px;font-weight: 600;"
							>{{
								$store.getters.language == 'zh' ? '心率' : 'Heart Rate'
							}}:</span
						>
						<span
							style="font-size: 18px;color:#E65945;margin-right: 5px;font-weight: 600;"
							>{{ scope.row.fHrstatus }} BPM</span
						>
					</span>
					<!-- 4-血压 -->
					<span v-if="scope.row.fAlertType == 4">
						<span style="font-size: 18px;margin-right: 5px;font-weight: 600;">{{
							$store.getters.language == 'zh' ? '血压' : 'Blood Pressure'
						}}</span>
						<span
							style="font-size: 18px;color:#E65945;margin-right: 5px;font-weight: 600;"
							>{{ scope.row.fDiastolic }}</span
						>
					</span>
					<!-- 4-血糖 -->
					<span v-if="scope.row.fAlertType == 5">
						<span style="font-size: 18px;margin-right: 5px;font-weight: 600;">{{
							$store.getters.language == 'zh' ? '血糖' : 'Blood Glucose'
						}}</span>
						<span
							style="font-size: 18px;color:#E65945;margin-right: 5px;font-weight: 600;"
							>{{ scope.row.fBloodsugar }} mmol/L</span
						>
					</span>

					<!-- 6-体温 -->
					<span v-if="scope.row.fAlertType == 6">
						<span style="font-size: 18px;margin-right: 5px;font-weight: 600;">{{
							$store.getters.language == 'zh' ? '体温' : 'Temper'
						}}</span>
						<span
							style="font-size: 18px;color:#E65945;margin-right: 5px;font-weight: 600;"
							>{{ scope.row.fTemper }} ℃</span
						>
					</span>

					<!-- 15-低电量 -->
					<span v-if="scope.row.fAlertType == 15">
						<span style="font-size: 18px;margin-right: 5px;font-weight: 600;">{{
							$store.getters.language == 'zh' ? '电量过低' : 'Low Power'
						}}</span>
					</span>

					<!--  姓名和日期-->
					<span style="margin-left: 10px;">
						<span v-if="scope.row.fFullname">
							{{ `- ${scope.row.fFullname} -` }}
						</span>
						<span style="margin-left: 10px;color: #075db3;">{{
							scope.row.fAlertTime
						}}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column width="140">
				<template slot-scope="scope">
					<i
						slot="reference"
						@click.stop="showAlertInfo(scope)"
						class="el-icon-info"
					></i>
				</template>
			</el-table-column>
			<el-table-column prop="fAlertStaus" width="140">
				<template slot-scope="scope">
					<span
						v-if="scope.row.fAlertStaus == 1"
						style="font-size: 20px;color:#E65945;"
						>Open</span
					>
					<span
						v-if="scope.row.fAlertStaus == 2"
						style="font-size: 20px;color:#E65945;"
						>Skip</span
					>
					<span
						v-if="scope.row.fAlertStaus == 3"
						style="font-size: 20px;color:#666;"
						>Follow up</span
					>
					<span
						v-if="scope.row.fAlertStaus == 4"
						style="font-size: 20px;color:#629EE7;"
						>Completed</span
					>
				</template>
			</el-table-column>
			<el-table-column width="60" align="left">
				<template slot-scope="scope">
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
		<!--简要Info弹窗-->
		<alert-info
			ref="alertInfo"
			alertType="2"
			@openDetail="openDetail"
			:dataInfo="currentInfo"
		></alert-info>
		<!--Detail弹窗-->
		<alert-detail ref="alertDetail" :detail="currentDetail"></alert-detail>
	</div>
</template>

<script>
import mixin from '@/views/mixin';
import { formatDate, _debounce } from '@/utils/validate';
import { getAlertList } from '@/api/alert';
const Pagination = () => import('@/components/Pagination/index.vue');
const AlertInfo = () => import('@/components/Alerts/AlertInfo.vue');
const AlertDetail = () => import('@/components/Alerts/AlertDetail.vue');

export default {
	name: 'Alerts',
	mixins: [mixin],
	components: { Pagination, AlertInfo, AlertDetail },
	data() {
		return {
			search: '',
			tableData: [],
			currentPage: 1,
			currentInfo: {},
			currentDetail: {}
		};
	},
	mounted() {
		this._getAlertList(this.currentPage, this.search);
	},
	methods: {
		// 搜索
		searchAlerts: _debounce(function() {
			this._getAlertList(1, this.search);
		}),
		// 显示alerts信息弹窗
		showAlertInfo: _debounce(function({ row }) {
			this.$refs.alertInfo.infoVisible = true;
			this.$refs.alertInfo.alertType = row.fAlertType || '';
			this.currentInfo = row;
		}),
		// 显示详情弹窗
		showDetailInfo(row) {
			this.$refs.alertDetail.detailVisible = true;
			this.currentDetail = row;
		},
		// 通过AlertInfo组件触发
		openDetail(options) {
			this.showDetailInfo(options);
		},
		pageChange(page) {
			this.$refs.Pagination.currentPage = page;
			this._getAlertList(page, this.search);
		},
		// 请求alerts消息列表
		_getAlertList(page, search) {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, .6)'
			});
			getAlertList({ page: page, search: search })
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.tableData = list.map((item) => {
						let date = '';
						if (item.fAlertTime) {
							if (!isNaN(item.fAlertTime)) {
								date = formatDate(
									item.fAlertTime * 1000,
									this.$store.getters.language
								);
							} else {
								date = formatDate(
									item.fAlertTime,
									this.$store.getters.language
								);
							}
							item.fAlertTime = `${date.ampm} ${date.hour}:${date.minute}, ${date.year}-${date.month}-${date.day}`;
						}
						if (item.fAlertType == 1) {
							if (
								item.fMsgContent.indexOf('https://www.google.com/maps') ||
								item.fMsgContent.indexOf('http://www.google.com/maps')
							) {
								let str = item.fMsgContent;
								str = str.split('http');
								item.fMsgContent = str[0].replace('SOS!', '');
								item.sosHttp =
									this.$store.getters.language == 'zh'
										? `./htmlPage/baiduMap.html?query=${item.fLongitude},${
												item.fLatitude
										  }&address=${encodeURI(item.fMsgContent)}`
										: `https://ditu.google.com/maps/search/?api=1&query=${item.fLatitude},${item.fLongitude}`;
							}
						}
						if (item.fAlertType == 2) {
							let str = item.fMsgContent;
							str = str.split('http');
							item.fMsgContent = str[0].replace('Out of the set e-fence!', '');
							item.sosHttp =
								this.$store.getters.language == 'zh'
									? `./htmlPage/baiduMap.html?query=${item.fLongitude},${item.fLatitude}&address=${item.fMsgContent}`
									: `https://ditu.google.com/maps/search/?api=1&query=${item.fLatitude},${item.fLongitude}`;
						}
						return item;
					});
					this.$refs.Pagination.currentPage = pageNum;
					this.$refs.Pagination.pageSize = pageSize;
					this.$refs.Pagination.total = total;
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
		_tableCellColor() {
			return 'color: #333;font-size:16px';
		}
	}
};
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.alerts-bg {
	@include table-bg;
	color: #2a2a2a;
	& > header {
		@include flex-e-c;
		flex-wrap: wrap;
		margin-bottom: 25px;
	}
	a:hover {
		color: #075db3;
		text-decoration: underline;
	}
	.el-table {
		.el-table--medium td,
		.el-table--medium th {
			padding: 10px 0;
		}
		.el-icon-info {
			width: 40px;
			line-height: 40px;
			text-align: center;
			font-size: 24px;
			color: #c1c1c1;
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
