<template>
	<div class="setting-optings-bg" style="position: relative;">
		<el-form ref="Steps" :model="form" label-suffix=":" label-width="auto">
			<el-form-item class="form-inline" :label="$t('others.startTime')">
				<el-time-picker
					v-model="form.timing.start"
					value-format="HH:mm:ss"
					format="h:mm A"
					:picker-options="{
						selectableRange: '00:00:00 - 23:59:59'
					}"
				></el-time-picker>
			</el-form-item>
			<span class="line-to">~~</span>
			<el-form-item class="form-inline" :label="$t('others.endTime')">
				<el-time-picker
					v-model="form.timing.end"
					value-format="HH:mm:ss"
					format="h:mm A"
					:picker-options="{
						selectableRange: form.timing.start + ' - 23:59:59'
					}"
				></el-time-picker>
			</el-form-item>
			<el-form-item class="form-inline" :label="$t('others.interval')">
				<el-input type="number" v-model="form.timing.span" :min="0"></el-input>
				<span class="form-unit">{{ $t('others.minutes') }}</span>
			</el-form-item>
		</el-form>
		<el-button
			@click="submit"
			style="width: 100px;margin-left: 0;"
			type="primary"
			>{{ $t('action.save') }}</el-button
		>
	</div>
</template>

<script>
export default {
	name: 'Location',
	data() {
		return {
			language: this.$store.getters.language,
			form: {
				cmd: 203,
				did: 0,
				timing: {
					start: '00:00:00',
					end: '23:59:59',
					span: 0
				}
			}
		};
	},
	methods: {
		submit() {
			console.log(this.form);
			if (
				this.form.timing.start &&
				this.form.timing.end &&
				this.form.timing.span
			) {
				let data = {
					didList: [],
					wSettings: this.form
				};
				this.$emit('submit', data);
			} else {
				console.log('error submit!!');
				this.$alert(
					this.language == 'zh'
						? '请填写完整信息'
						: 'Please complete the information'
				);
			}
		}
	}
};
</script>

<style scoped></style>
