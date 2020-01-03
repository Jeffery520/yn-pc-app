<template>
	<div class="tracking-mode">
		<el-button
			@click="openTracking"
			type="primary"
			icon="el-icon-position"
			round
			style="width: auto"
			>{{ $t('others.trackingMode') }}</el-button
		>
		<tracking-map
			ref="TrackingMap"
			:formData="{ Did: this.formData.did }"
		></tracking-map>
	</div>
</template>

<script>
import TrackingMap from '@/components/Devices/SettingOptions/TrackingMap';
import mixin from '@/components/Devices/SettingOptions/mixin';

export default {
	name: 'TrackMode',
	mixins: [mixin],
	components: { TrackingMap },
	methods: {
		openTracking() {
			this.$refs.TrackingMap.trackingMapVisible = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.tracking-mode {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 40px;
}
</style>
