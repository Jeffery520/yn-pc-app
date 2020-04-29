<template>
	<div id="devices">
		<main>
			<el-table
				ref="table"
				:header-cell-style="_tableHeaderColor"
				:cell-style="_tableCellColor"
				:row-class-name="_tabRowClassName"
				highlight-current-row
				:data="tableData"
				height="68vh"
				border
				style="width: 100%"
			>
				<el-table-column
					:resizable="false"
					width="80"
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
					prop="fPercent"
					:label="$store.getters.language == 'en' ? 'Power' : '电量'"
				>
					<template slot-scope="scope">
						<span>{{ scope.row.fPercent }}%</span>
					</template>
				</el-table-column>
				<el-table-column
					:resizable="false"
					prop="fCharging"
					:label="
						$store.getters.language == 'en' ? 'Battery Status' : '电池状态'
					"
				>
					<template slot-scope="scope">
						<span style="color: #3aca75" v-if="scope.row.fCharging == 1">{{
							$store.getters.language == 'en' ? 'Charging' : '正在充电'
						}}</span>
						<span v-else>{{
							$store.getters.language == 'en' ? 'Not Charging' : '未充电'
						}}</span>
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					prop="fVoltage"
					:label="
						$store.getters.language == 'en'
							? 'Decice Voltage(V)'
							: '设备电压(V)'
					"
				>
				</el-table-column>

				<el-table-column
					:resizable="false"
					prop="fTraceMode"
					:label="
						$store.getters.language == 'en' ? 'Tracking Mode' : '跟踪模式'
					"
				>
					<template slot-scope="scope">
						<span style="color: #3aca75" v-if="scope.row.fTraceMode == 1">{{
							$store.getters.language == 'en' ? 'Yes' : '是'
						}}</span>
						<span v-else>{{
							$store.getters.language == 'en' ? 'No' : '否'
						}}</span>
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					prop="fTimeZone"
					:label="$store.getters.language == 'en' ? 'Time Zone' : '设备时区'"
				>
					<template slot-scope="scope">
						<span
							>GMT
							{{
								(scope.row.fTimeZone * 15) / 60 > 0
									? '+' + parseInt((scope.row.fTimeZone * 15) / 60)
									: parseInt((scope.row.fTimeZone * 15) / 60)
							}}</span
						>
					</template>
				</el-table-column>

				<el-table-column
					:resizable="false"
					prop="savedate"
					:label="$store.getters.language == 'en' ? 'Time' : '时间'"
				>
					<template slot-scope="scope">
						<span v-html="scope.row.savedate"></span>
					</template>
				</el-table-column>
			</el-table>
			<Pagination
				ref="Pagination"
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</main>

		<phone-call ref="phoneCall"></phone-call>
		<!--message 弹窗-->
		<!--		<Message ref="Message"></Message>-->
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import Pagination from '@/components/Pagination/index.vue';
const Chat = () => import('@/components/Chat/index.vue');
import { formatDateToStr, _debounce, formatPhone } from '@/utils/validate';
import { DevStatusList } from '@/api/devices';

export default {
	name: 'Devices',
	mixins: [mixin],
	components: { Pagination, Chat },
	data() {
		return {
			language: this.$store.getters.language,
			showfHead: '',
			total: 0,
			search: '',
			pageSize: 10,
			currentPage: 1,
			tableData: []
		};
	},
	mounted() {
		console.log(this.$route.params.id);
		this.search = this.$route.params.search || '';
		this.currentPage = 1;
		this._DevStatusList();
	},
	methods: {
		_DevStatusList() {
			this.loading = this.$loading({
				target: document.querySelector('.app-main'),
				background: 'rgba(225, 225, 225, 0)'
			});
			DevStatusList({
				did: this.$route.params.id,
				page: this.currentPage,
				search: this.search
			})
				.then((data) => {
					let { total, pageNum, pageSize, list } = data;
					this.total = total;
					this.pageSize = pageSize;
					if (this.$refs.Pagination) {
						this.$refs.Pagination.currentPage = pageNum;
						this.$refs.Pagination.pageSize = pageSize;
						this.$refs.Pagination.total = total;
					}

					this.tableData = list.map((item) => {
						let date = '';
						if (item.savedate) {
							if (!isNaN(item.savedate)) {
								date = formatDateToStr(
									item.savedate * 1000,
									this.$store.getters.language,
									'YYMMDDHHmm',
									true
								);
							} else {
								date = formatDateToStr(
									item.savedate,
									this.$store.getters.language,
									'YYMMDDHHmm',
									true
								);
							}
							item.savedate = date;
						}
						item.currentDeviceIndex = 0;
						return item;
					});
					// this._tableLayout('userTable');
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			this._DevStatusList();
		},
		// 重置表单样式
		_tableCellColor({ columnIndex }) {
			return 'color: #666666;text-align: center;';
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
			@include flex-c-c;
		}
	}
}
</style>
<style lang="scss">
.chat-dialog {
	.el-dialog__body {
		padding: 0 !important;
	}
	.chat-bg {
		border-top: none !important;
	}
}
</style>
