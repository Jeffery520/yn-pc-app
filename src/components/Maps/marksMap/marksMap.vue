<template>
	<div id="g-maps">
		<div class="g-map-tools">
			<div class="swich-tab" @click="showTableList = !showTableList">
				<i class="el-icon-arrow-left"></i
				><span> {{ showTableList ? 'Back' : 'List' }}</span>
			</div>
		</div>

		<map-table v-show="showTableList"></map-table>
		<!--  显示地图-->
		<div
			v-show="!showTableList"
			id="googleMap"
			:style="{ width: clientWidth, height: '500px' }"
		></div>
	</div>
</template>

<script>
import mixin from '@/components/Maps/mixin';
import mapTable from '@/components/Maps/marksMap/mapTable';
export default {
	name: 'marksMap',
	mixins: [mixin],
	components: { mapTable },
	data() {
		return {
			showTableList: false,
			clientWidth: '',
			language: this.$store.getters.language
		};
	},

	methods: {}
};
</script>

<style lang="scss" scoped>
@import '~@/style/mixin.scss';
.g-map-tools {
	@include flex-e-c;
	.swich-tab {
		font-size: 22px;
		cursor: pointer;
		padding: 20px 0 20px 20px;
	}
}
</style>
