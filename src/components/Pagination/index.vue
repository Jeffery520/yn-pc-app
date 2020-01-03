<template>
	<div class="yn-pagination">
		<el-pagination
			v-if="total"
			background
			layout="total, prev, pager, next,jumper"
			:total="total"
			:page-size="pageSize"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
		>
		</el-pagination>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	data() {
		return {
			currentPage: 1,
			total: 1,
			pageSize: 1
		};
	},
	methods: {
		handleCurrentChange(val) {
			this.$emit('currentChange', val);
			window.scrollTo(0, 0);
		}
	}
};
</script>

<style lang="scss" scoped>
.yn-pagination {
	margin-top: 20px;
}
</style>
