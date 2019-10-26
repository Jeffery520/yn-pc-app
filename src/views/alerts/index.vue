<template>
	<div class="alerts-bg">
		<header>
			<div style="width: 600px;">
				<el-input :placeholder="$t('notice.searchTips')" v-model="search">
					<template slot="append" style="background:#5F9DE9;">
						{{ $t('action.search') }}
					</template>
				</el-input>
			</div>
		</header>
		<el-table
			:cell-style="_tableCellColor"
			:header-cell-style="_tableHeaderColor"
			:row-class-name="_tabRowClassName"
			:show-header="false"
			:data="
				tableData.filter(
					(data) =>
						!search ||
						data.fFullname.toLowerCase().includes(search.toLowerCase())
				)
			"
			style="width: 100%"
		>
			<el-table-column type="index" width="80" align="center"></el-table-column>
			<el-table-column prop="fMsgContent">
				<template slot-scope="scope">
					<!-- 1-SOS -->
					<span v-if="scope.row.fAlertType == 1">
						<span
							style="font-size: 20px;color:#E65945;margin-right:10px;font-weight: 600;"
							>SOS</span
						>
					</span>
					<!-- 2-围栏 -->
					<span v-if="scope.row.fAlertType == 2">
						<span
							style="font-size: 20px;color:#E65945;margin-right: 5px;font-weight: 600;"
							>Out of Geo-fence</span
						>
						<span style="color:#5F9DE9; margin-right: 5px;">{{
							scope.row.fLocationTitle
						}}</span>
					</span>

					<!-- 3-心率 -->
					<span v-if="scope.row.fAlertType == 3">
						<span style="margin-right: 5px;">Heart Rate</span>
						<span
							style="font-size: 20px;color:#E65945;margin-right: 5px;font-weight: 600;"
							>{{ scope.row.fHrstatus }} BPM</span
						>
					</span>
					<!-- 4-血压 -->
					<span v-if="scope.row.fAlertType == 4">
						<span style="margin-right: 5px;">Blood Pressure</span>
						<span
							style="font-size: 20px;color:#E65945;margin-right: 5px;font-weight: 600;"
							>{{ scope.row.fDiastolic }}</span
						>
					</span>
					<!-- 4-血糖 -->
					<span v-if="scope.row.fAlertType == 5">
						<span style="margin-right: 5px;">Blood Glucose</span>
						<span
							style="font-size: 18px;color:#E65945;margin-right: 5px;font-weight: 600;"
							>{{ scope.row.fBloodsugar }} mmol/L</span
						>
					</span>

					<!-- 6-体温 -->
					<span v-if="scope.row.fAlertType == 6">
						<span style="margin-right: 5px;">Temper</span>
						<span
							style="font-size: 18px;color:#E65945;margin-right: 5px;font-weight: 600;"
							>{{ scope.row.fTemper }} ℃</span
						>
					</span>

					<!--  姓名和日期-->
					<span>
						{{
							`-${scope.row.fFullname ||
								'no WearerName'}-&nbsp&nbsp${formatTime(scope.row.fAlertTime)}`
						}}
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
						style="font-size: 20px;color:#38CB73;"
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
					<i @click="showDetailInfo(scope.row)" class="el-icon-arrow-right"></i>
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
			@openDetail="openDetail"
			:dataInfo="currentInfo"
		></alert-info>
		<!--Detail弹窗-->
		<alert-detail ref="alertDetail" :detail="currentDetail"></alert-detail>
	</div>
</template>

<script>
import mixin from '@/views/mixin';
import { formatDate } from '@/utils/validate';
import { getCsdn } from '@/api/user';
import { getAlertList } from '@/api/alert';
import Pagination from '@/components/Pagination/index.vue';
import AlertInfo from '@/components/Alerts/AlertInfo.vue';
import AlertDetail from '@/components/Alerts/AlertDetail.vue';
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
	created() {
		// 请求alerts消息列表
		getAlertList()
			.then((data) => {
				let { total, pageNum, pageSize, list } = data;
				this.tableData = list;
				this.$refs.Pagination.currentPage = pageNum;
				this.$refs.Pagination.pageSize = pageSize;
				this.$refs.Pagination.total = total;
			})
			.catch((error) => {
				this.$message({
					showClose: true,
					message:
						error.message || `Request failed with status code${error.status}`,
					type: 'error'
				});
			});
		// 请求getCsdn测试接口
		getCsdn()
			.then((data) => {})
			.catch((error) => {
				this.$message({
					showClose: true,
					message:
						error.message || `Request failed with status code${error.status}`,
					type: 'error'
				});
			});
	},
	methods: {
		// 显示alerts信息弹窗
		showAlertInfo({ row }) {
			this.$refs.alertInfo.infoVisible = true;
			this.currentInfo = row;
		},
		// 显示详情弹窗
		showDetailInfo(row) {
			console.log(row, '显示detail弹窗');
			// 显示detail弹窗
			this.$refs.alertDetail.detailVisible = true;
			this.currentDetail = row;
		},
		// 通过AlertInfo组件触发
		openDetail(options) {
			this.showDetailInfo(options);
		},
		pageChange(ev) {
			console.log(ev);
			this.$refs.Pagination.currentPage = ev;
		},
		formatTime(timestamp) {
			const dateObj = formatDate(timestamp, 'en');
			return `${dateObj.month} ${dateObj.day}-${
				dateObj.hour < 10 ? '0' + dateObj.hour : dateObj.hour
			}:${dateObj.minute < 10 ? '0' + dateObj.minute : dateObj.minute} ${
				dateObj.ampm
			} `;
		},
		_tableCellColor({ columnIndex }) {
			return 'color: #666666;font-size:16px';
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
