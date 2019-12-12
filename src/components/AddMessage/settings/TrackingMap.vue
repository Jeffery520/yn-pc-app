<template>
	<el-dialog
		custom-class="map-dialog-pop"
		top="4vh"
		:width="clientWidth"
		:title="$t('others.trackingMode')"
		:visible.sync="trackingMapVisible"
		:modal="false"
		destroy-on-close
	>
		<tracking-mode
			:formData="formData"
			:isOnelyShowTrackingTools="true"
		></tracking-mode>
	</el-dialog>
</template>

<script>
import { _debounce } from '@/utils/validate';
import TrackingMode from '@/components/Maps/TrackingMode';
export default {
	name: 'TrackingMap',
	components: { TrackingMode },
	props: {
		formData: Object
	},
	data() {
		return {
			trackingMapVisible: false,
			clientWidth: ''
		};
	},
	mounted() {
		console.log('map mounted');
		// 获取窗口宽高
		this.clientWidth = document.body.offsetWidth - 400 + 'px';
	},
	methods: {}
};
</script>

<style lang="scss">
.map-dialog-pop {
	padding-bottom: 30px;
}
</style>
