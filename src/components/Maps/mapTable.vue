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
			<el-table-column label="No." type="index" width="50"> </el-table-column>
			<el-table-column prop="location" label="Address"> </el-table-column>
			<el-table-column prop="measuredate" label="Time" width="180">
			</el-table-column>
			<el-table-column prop="loctype" label="Geo-fence" width="180">
			</el-table-column>
		</el-table>
		<div style="display: flex;justify-content: flex-end;">
			<Pagination
				:currentPage="currentPage"
				@currentChange="pageChange"
			></Pagination>
		</div>
	</div>
</template>
<script>
import Pagination from '@/components/Pagination/index.vue';
import mixin from '@/views/mixin';
import { devicePosOfList } from '@/api/devices';
import { formatDate } from '@/utils/validate';

export default {
	name: 'mapTable',
	components: { Pagination },
	mixins: [mixin],
	props: { devicesID: Number },
	data() {
		return {
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
				did: this.devicesID
			})
				.then((data) => {
					console.log(data);
					let { list } = data;
					this.tableData = list.map((item) => {
						const date = formatDate(
							item.measuredate,
							this.$store.getters.language
						);
						item.measuredate = `${date.month}-${date.day}, ${
							date.hour < 10 ? '0' + date.hour : date.hour
						}:${date.minute < 10 ? '0' + date.minute : date.minute} ${
							date.ampm
						}`;
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
				return 'color: #60b8f7;text-align: center;cursor: pointer;font-size:24px;';
			}
			return 'color: #666666;text-align: center;cursor: pointer;position: relative;';
		}
	}
};
</script>

<style scoped></style>
