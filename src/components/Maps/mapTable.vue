<template>
	<div class="map-table-bg">
		<el-table
			:header-cell-style="_tableHeaderColor"
			:cell-style="_tableCellColor"
			:row-class-name="_tabRowClassName"
			:data="tableData"
			border
			style="width: 100%;"
		>
			<el-table-column :resizable="false" label="No." type="index" width="50">
			</el-table-column>
			<el-table-column
				:resizable="false"
				prop="location"
				:label="$t('user.address')"
			></el-table-column>
			<el-table-column
				:resizable="false"
				prop="measuredate"
				:label="$t('tableTitle.time')"
				width="180"
			>
			</el-table-column>
			<el-table-column
				:resizable="false"
				prop="warning"
				:label="$t('tableTitle.status')"
				width="180"
			>
				<template slot-scope="scope">
					<span style="color: #39c973" v-if="scope.row.warning == 0">{{
						language == 'en' ? 'Regular' : '正常'
					}}</span>
					<span style="color: #ff0101" v-if="scope.row.warning !== 0">{{
						language == 'en' ? 'Warning' : '警报'
					}}</span>
				</template>
			</el-table-column>
			<!--      <el-table-column :resizable="false" prop="loctype" label="Geo-fence" width="180">-->
			<!--      </el-table-column>-->
		</el-table>
		<div style="display: flex;justify-content: flex-end;">
			<Pagination
				ref="Pagination"
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</div>
	</div>
</template>
<script>
import mixin from '@/views/mixin';
import { devicePosOfList } from '@/api/devices';
import { formatDateToStr } from '@/utils/validate';
import Pagination from '@/components/Pagination/index.vue';
export default {
	name: 'mapTable',
	components: { Pagination },
	mixins: [mixin],
	props: { devicesID: Number, date: Array },
	data() {
		return {
			language: this.$store.getters.language,
			currentPage: 1,
			tableData: []
		};
	},
	mounted() {
		this._devicePosOfList();
	},
	methods: {
		// 切换页码
		pageChange(page) {
			this.currentPage = page;
			this._devicePosOfList();
		},
		_devicePosOfList() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.map-table-bg'),
				background: 'rgba(225, 225, 225, 0)'
			});

			devicePosOfList({
				page: this.currentPage,
				did: this.devicesID,
				startTime: parseInt(this.date[0] / 1000),
				endTime: parseInt(this.date[1] / 1000)
			})
				.then((data) => {
					let { list } = data;
					this.tableData = list.map((item) => {
						const date = formatDateToStr(
							item.measuredate * 1000,
							this.$store.getters.language
						);
						item.measuredate = date;
						return item;
					});
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// 重置表单样式
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 13 || columnIndex === 14 || columnIndex === 15) {
				// 图标
				return 'color: #60b8f7;text-align: center;font-size:24px;';
			}
			return 'color: #666666;text-align: center;position: relative;';
		}
	}
};
</script>

<style lang="scss" scoped>
.map-table-bg {
	min-height: 400px;
}
</style>
