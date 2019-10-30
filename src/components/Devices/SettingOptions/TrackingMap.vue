<template>
	<el-dialog
		custom-class="map-dialog-pop"
		top="4vh"
		:width="clientWidth"
		:title="$t('others.trackingMode')"
		:visible.sync="trackingMapVisible"
		:modal="false"
	>
		<tracking-mode
			:data="mapDta"
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
		mapDta: Object
	},
	data() {
		return {
			trackingMapVisible: false,
			clientWidth: ''
		};
	},
	created() {},
	mounted() {
		this.clientWidth = document.body.offsetWidth - 160 + 'px';
	},
	methods: {}
};
</script>

<style lang="scss" scoped></style>
