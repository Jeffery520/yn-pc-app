<template>
	<div class="setting-optings-bg" style="position: relative;">
		<el-form
			ref="ReportFrequency"
			:model="form"
			label-suffix=":"
			label-width="auto"
		>
			<el-form-item :label="$t('others.interval')">
				<el-input type="number" v-model="form.reportSpan" :min="0"></el-input>
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
	name: 'ReportFrequency',
	data() {
		return {
			language: this.$store.getters.language,
			form: {
				cmd: 232,
				did: 0,
				reportSpan: 0
			}
		};
	},
	methods: {
		submit() {
			console.log(this.form);
			if (this.form.reportSpan) {
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
