<template>
	<el-form ref="HeartRate" :model="form" label-suffix="：" label-width="120px">
		<el-form-item class="form-inline" label="Low Limit">
			<el-input type="number" v-model="form.hrlowerlimit"></el-input>
		</el-form-item>
		<span class="line-to">~~</span>
		<el-form-item class="form-inline" label="High Limit">
			<el-input type="number" v-model="form.hrupperlimit"></el-input>
		</el-form-item>
		<!--时间选择-->
		<el-form-item class="form-inline" label="startTime">
			<el-time-picker
				v-model="form.hrs"
				value-format="HH:mm:ss"
				format="HH:mm A"
				:picker-options="{
					selectableRange: '00:00:00 - 23:59:59'
				}"
			>
			</el-time-picker>
		</el-form-item>
		<span class="line-to">~~</span>
		<el-form-item class="form-inline" label="End Time">
			<el-time-picker
				v-model="form.hre"
				value-format="HH:mm:ss"
				format="HH:mm A"
				:picker-options="{
					selectableRange: form.hre + ' - 23:59:59'
				}"
			>
			</el-time-picker>
		</el-form-item>
		<!-- 时间选择-->
		<el-form-item label="Interval">
			<el-input type="number" v-model="form.hri"></el-input>
			<span class="form-unit">minutes</span>
		</el-form-item>
	</el-form>
</template>

<script>
import mixin from '@/components/Devices/SettingOptions/mixin';
export default {
	name: 'HeartRate',
	mixins: [mixin],
	props: {
		form: Object
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style scoped></style>
