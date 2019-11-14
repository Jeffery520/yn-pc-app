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
			:style="{ width: clientWidth, height: clientHeight }"
		>
			<img
				src="@/assets/images/static_map.png"
				alt="static map"
				height="100%"
				style="display: block"
			/>
		</div>
	</div>
</template>

<script>
import mixin from '@/components/Maps/mixin';
import mapTable from '@/components/Maps/marksMap/mapTable';
import { _debounce } from '@/utils/validate';
export default {
	name: 'marksMap',
	mixins: [mixin],
	components: { mapTable },
	data() {
		return {
			showTableList: false,
			language: this.$store.getters.language
		};
	},
	mounted() {
		document
			.querySelector('.el-main')
			.addEventListener('scroll', this.handleFun);
	},
	methods: {
		handleFun: _debounce(function(ev) {
			if (this.map && ev.target.scrollTop > 1000) {
				document
					.querySelector('.el-main')
					.removeEventListener('scroll', this.handleFun);
				return;
			}
			if (ev.target.scrollTop > 1000) {
				this._createGmapScript();
			}
		})
	}
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
#googleMap {
	height: 100%;
}
</style>
