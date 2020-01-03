<template>
	<div class="setting-optings-bg" style="position: relative;">
		<el-form
			ref="BloodGlucose"
			:model="form"
			label-suffix=":"
			label-width="auto"
		>
			<el-form-item class="form-inline" :label="$t('others.low_limit')">
				<el-input
					type="number"
					v-model="form.bslimit.lowbs"
					:min="0"
				></el-input>
				<span class="form-unit">mmol/L</span>
			</el-form-item>
			<el-form-item class="form-inline" :label="$t('others.High_limit')">
				<el-input
					type="number"
					v-model="form.bslimit.highbs"
					:min="0"
				></el-input>
				<span class="form-unit">mmol/L</span>
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
	name: 'BloodGlucose',
	data() {
		return {
			language: this.$store.getters.language,
			form: {
				cmd: 111,
				did: 0,
				bslimit: {
					lowbs: 0,
					highbs: 0
				}
			}
		};
	},
	methods: {
		submit() {
			console.log(this.form);
			if (this.form.bslimit.lowbs && this.form.bslimit.highbs) {
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
